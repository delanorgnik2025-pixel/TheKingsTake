export type CaseQuestion = { prompt: string; options: string[] };
export type CaseLesson = {
  title: string;
  chapter: string;
  goal: string;
  reading: string[];
  worked: string;
  task: string;
  model: string;
  sources: string[];
  checkpoint: CaseQuestion;
};
export type CaseCourse = {
  version: string;
  title: string;
  scope: string;
  lessons: CaseLesson[];
  final: CaseQuestion[];
  sources: Record<string, { label: string; url: string }>;
  exhibits: { id: string; title: string; text: string }[];
  workbook: string;
  docket: { id: number; date: string; title: string; body: string }[];
  terms: string[];
};
export type CaseAttempt = {
  id: number;
  kind: string;
  lessonIndex: number | null;
  answers: number[];
  correctCount: number;
  totalCount: number;
  passed: boolean;
  createdAt: Date | string;
};
export function caseCompletion(attempts: CaseAttempt[], count: number) {
  const completed: number[] = [];
  for (let i = 0; i < count; i++) {
    if (
      attempts.some(
        a => a.kind === "checkpoint" && a.lessonIndex === i && a.passed
      )
    )
      completed.push(i);
    else break;
  }
  return {
    completed,
    passed:
      completed.length === count &&
      attempts.some(a => a.kind === "final" && a.passed),
  };
}
