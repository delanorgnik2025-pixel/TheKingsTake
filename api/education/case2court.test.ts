import { beforeEach, describe, it, expect, vi } from "vitest";
import { MySqlDialect } from "drizzle-orm/mysql-core";
import { randomUUID } from "node:crypto";
const fixture = vi.hoisted(() => ({
  member: null as null | { id: number },
  rows: [] as any[],
  reads: 0,
}));
vi.mock("../security/member-session", () => ({
  getFeedActorFromRequest: vi.fn(async () => fixture.member),
  getActiveMemberFromRequest: vi.fn(async () => fixture.member),
}));
vi.mock("../queries/connection", () => ({
  getDb: () => ({
    select: () => ({
      from: () => ({
        where: (predicate: any) => {
          fixture.reads++;
          const { params } = new MySqlDialect().sqlToQuery(predicate);
          const rows = () =>
            fixture.rows.filter(
              r =>
                r.memberId === params[0] &&
                (r.courseVersion === params[1] || r.submissionId === params[1])
            );
          return {
            orderBy: async () => rows(),
            limit: async (n: number) => rows().slice(0, n),
          };
        },
      }),
    }),
    insert: () => ({
      values: (value: any) => ({
        onDuplicateKeyUpdate: async () => {
          if (!fixture.rows.some(r => r.submissionId === value.submissionId))
            fixture.rows.push({
              ...value,
              id: fixture.rows.length + 1,
              createdAt: new Date(),
            });
        },
      }),
    }),
  }),
}));
import { createRouter } from "../middleware";
import { case2courtProcedures } from "./case2court-router";
import {
  CASE_VERSION,
  CASE_LESSONS,
  CASE_FINAL,
  publicCaseCourse,
  gradeCaseAnswers,
} from "./case2court-content";
const ctx = () => ({
  req: new Request("https://thekingstake.com/api/trpc"),
  resHeaders: new Headers(),
});
const caller = () => createRouter(case2courtProcedures).createCaller(ctx());
const input = (lessonIndex: number, answer: number) => ({
  version: CASE_VERSION as typeof CASE_VERSION,
  submissionId: randomUUID(),
  kind: "checkpoint" as const,
  lessonIndex,
  answers: [answer],
});
beforeEach(() => {
  fixture.member = { id: 11 };
  fixture.rows = [];
  fixture.reads = 0;
});
describe("Case2Court subscriber classroom and durable learning records", () => {
  it("blocks anonymous content, progress and writes before reading learning records", async () => {
    fixture.member = null;
    const api = caller();
    await expect(api.caseCourse()).rejects.toMatchObject({
      code: "UNAUTHORIZED",
    });
    await expect(api.caseProgress()).rejects.toMatchObject({
      code: "UNAUTHORIZED",
    });
    await expect(api.caseSubmit(input(0, 0))).rejects.toMatchObject({
      code: "UNAUTHORIZED",
    });
    expect(fixture.reads).toBe(0);
    expect(fixture.rows).toHaveLength(0);
  });
  it("returns readings without distributing a checkpoint or final answer key", () => {
    const course = publicCaseCourse();
    expect(course.lessons).toHaveLength(16);
    expect(course.final).toHaveLength(16);
    expect(course.exhibits).toHaveLength(8);
    expect(course.lessons[0]).not.toHaveProperty("answer");
    expect(course.lessons[0]).not.toHaveProperty("explanation");
    expect(
      course.final.every(q => !("answer" in q) && !("explanation" in q))
    ).toBe(true);
  });
  it("retains the first error and feedback after a correct retry and deduplicates a network retry", async () => {
    const api = caller();
    const correct = CASE_LESSONS[0].answer;
    const first = input(0, (correct + 1) % 4);
    let state = await api.caseSubmit(first);
    expect(state.completed).toEqual([]);
    expect(state.attempts[0].feedback[0].correct).toBe(false);
    const retry = input(0, correct);
    state = await api.caseSubmit(retry);
    expect(state.completed).toEqual([0]);
    expect(state.attempts).toHaveLength(2);
    expect(state.attempts[0].answers).toEqual(first.answers);
    expect(state.attempts[0].passed).toBe(false);
    state = await api.caseSubmit(retry);
    expect(state.attempts).toHaveLength(2);
  });
  it("rejects skipped lessons and premature final submissions without recording a pass", async () => {
    const api = caller();
    await expect(
      api.caseSubmit(input(3, CASE_LESSONS[3].answer))
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(
      api.caseSubmit({
        version: CASE_VERSION,
        submissionId: randomUUID(),
        kind: "final",
        lessonIndex: null,
        answers: CASE_FINAL.map(q => q.answer),
      })
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
    expect(fixture.rows).toHaveLength(0);
  });
  it("requires all lessons, records a failed final, and preserves it when the final is passed", async () => {
    const api = caller();
    for (let i = 0; i < CASE_LESSONS.length; i++)
      await api.caseSubmit(input(i, CASE_LESSONS[i].answer));
    const answers = CASE_FINAL.map(q => q.answer);
    const wrong = [...answers];
    wrong[2] = (wrong[2] + 1) % 4;
    let state = await api.caseSubmit({
      version: CASE_VERSION,
      submissionId: randomUUID(),
      kind: "final",
      lessonIndex: null,
      answers: wrong,
    });
    expect(state.passed).toBe(false);
    state = await api.caseSubmit({
      version: CASE_VERSION,
      submissionId: randomUUID(),
      kind: "final",
      lessonIndex: null,
      answers,
    });
    expect(state.passed).toBe(true);
    expect(state.attempts).toHaveLength(18);
    expect(state.attempts[16].correctCount).toBe(15);
  });
  it("isolates member records and blocks access after entitlement is lost", async () => {
    await caller().caseSubmit(input(0, CASE_LESSONS[0].answer));
    fixture.member = { id: 22 };
    expect((await caller().caseProgress()).attempts).toEqual([]);
    fixture.member = null;
    await expect(caller().caseProgress()).rejects.toMatchObject({
      code: "UNAUTHORIZED",
    });
    expect(fixture.rows).toHaveLength(1);
  });
  it("rejects malformed grading and mismatched course versions", async () => {
    expect(() => gradeCaseAnswers("final", null, [0])).toThrow();
    expect(() => gradeCaseAnswers("checkpoint", 0, [4])).toThrow();
    await expect(
      caller().caseSubmit({
        ...input(0, 0),
        version: "old" as typeof CASE_VERSION,
      })
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});
