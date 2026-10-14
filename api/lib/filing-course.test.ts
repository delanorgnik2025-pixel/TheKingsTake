import {describe,it,expect} from 'vitest';
import {FILING_LESSONS,FINAL_QUIZ,gradeQuiz,readProgress} from '../../contracts/filing-course';
describe('guided filing course progress',()=>{
 it('resets corrupt or old progress without skipping lessons',()=>{expect(readProgress('oops')).toEqual({step:0,completed:[]});expect(readProgress('{"version":1,"step":9}').step).toBe(0);});
 it('only restores a contiguous completed path and clamps future steps',()=>{expect(readProgress(JSON.stringify({version:2,step:99,completed:[0,1,3,4]}))).toEqual({step:2,completed:[0,1]});});
 it('restores final test only after all lesson milestones',()=>{expect(readProgress(JSON.stringify({version:2,step:9,completed:FILING_LESSONS.map((_,i)=>i)})).step).toBe(9);});
 it('grades actual answers and treats missing answers as incorrect',()=>{expect(gradeQuiz(FINAL_QUIZ.map(q=>q.answer))).toBe(8);expect(gradeQuiz(FINAL_QUIZ.map(q=>1-q.answer))).toBe(0);expect(gradeQuiz([])).toBe(0);});
});
