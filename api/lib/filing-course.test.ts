import {describe,it,expect} from 'vitest';
import {FILING_LESSONS,FINAL_QUIZ,gradeQuiz,hasCompleteQuiz,readProgress,emptyProgress,moveToLesson,recordCheckpoint,submitTest,retryTest,restartLessons} from '../../contracts/filing-course';
describe('guided filing course progress',()=>{
 it('resets corrupt or old progress without skipping lessons',()=>{expect(readProgress('oops')).toMatchObject({step:0,completed:[]});expect(readProgress('{"version":1,"step":9}').step).toBe(0);});
 it('only restores a contiguous completed path and clamps future steps',()=>{expect(readProgress(JSON.stringify({version:2,step:99,completed:[0,1,3,4]}))).toMatchObject({step:2,completed:[0,1]});});
 it('restores final test only after all lesson milestones',()=>{expect(readProgress(JSON.stringify({version:2,step:9,completed:FILING_LESSONS.map((_,i)=>i)})).step).toBe(9);});
 it('grades actual answers and treats missing answers as incorrect',()=>{expect(gradeQuiz(FINAL_QUIZ.map(q=>q.answer))).toBe(8);expect(gradeQuiz(FINAL_QUIZ.map(q=>1-q.answer))).toBe(0);expect(gradeQuiz([])).toBe(0);});
 it('keeps wrong checkpoint submissions when the learner corrects and reloads',()=>{
  let p=recordCheckpoint(emptyProgress(),0,1);p=recordCheckpoint(p,0,0);
  const restored=readProgress(JSON.stringify({version:3,...p}));
  expect(restored.checkpointAttempts.map(a=>a.answer)).toEqual([1,0]);
 });
 it('snapshots failed tests and retains original results through retry and restart',()=>{
  let p=emptyProgress();p.quizAnswers=FINAL_QUIZ.map(q=>1-q.answer);p=submitTest(p);
  expect(p.quizGraded).toBe(true);expect(gradeQuiz(p.testAttempts[0].answers)).toBe(0);
  const retry=retryTest(p);retry.quizAnswers=FINAL_QUIZ.map(q=>q.answer);p=submitTest(retry);
  expect(p.testAttempts.map(t=>gradeQuiz(t.answers))).toEqual([0,8]);
  const restarted=restartLessons(p);expect(restarted.testAttempts).toHaveLength(2);expect(restarted.quizGraded).toBe(false);
  expect(readProgress(JSON.stringify({version:3,...p})).quizGraded).toBe(true);
 });
 it('rejects incomplete or duplicate test submissions and unattested completion',()=>{
  const p=emptyProgress();expect(submitTest(p)).toBe(p);
  p.quizAnswers=FINAL_QUIZ.map(q=>q.answer);const submitted=submitTest(p);expect(submitTest(submitted)).toBe(submitted);
  expect(readProgress(JSON.stringify({version:3,...p,quizGraded:true})).quizGraded).toBe(false);
 });
 it('preserves prior lesson positions without inventing old error records',()=>{
  const p=readProgress(JSON.stringify({version:2,step:2,completed:[0,1]}));expect(p.step).toBe(2);expect(p.checkpointAttempts).toEqual([]);
 });
 it('ignores malformed history and restores only matching submitted test answers',()=>{
  const p=readProgress(JSON.stringify({version:3,checkpointAttempts:[null,{lesson:90,answer:0,at:'x'}],testAttempts:[{answers:[0],at:'x'}],quizGraded:true}));
  expect(p.checkpointAttempts).toEqual([]);expect(p.testAttempts).toEqual([]);expect(p.quizGraded).toBe(false);
 });
 it('prevents historical review links from skipping lessons after restart',()=>{
  const p=emptyProgress();p.completed=[0,1];expect(moveToLesson(p,8).step).toBe(2);expect(moveToLesson(restartLessons(p),8).step).toBe(0);
 });
 it('keeps finish disabled for restored unanswered or invalid selections',()=>{
  expect(hasCompleteQuiz(Array(8).fill(-1))).toBe(false);expect(hasCompleteQuiz(Array(8).fill(2))).toBe(false);expect(hasCompleteQuiz(FINAL_QUIZ.map(q=>q.answer))).toBe(true);
 });
});
