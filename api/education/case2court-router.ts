import { z } from "zod";
import { and, asc, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { subscriberQuery } from "../middleware";
import { getFeedActorFromRequest } from "../security/member-session";
import { getDb } from "../queries/connection";
import { courseAttempts } from "../../db/schema";
import { caseCompletion, type CaseAttempt } from "../../contracts/case2court";
import {
  CASE_VERSION,
  CASE_LESSONS,
  CASE_FINAL,
  publicCaseCourse,
  gradeCaseAnswers,
} from "./case2court-content";
async function actor(req: Request) {
  const m = await getFeedActorFromRequest(req);
  if (!m)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Sign in with your verified subscriber access code.",
    });
  return m;
}
async function attemptsFor(memberId: number) {
  const rows = await getDb()
    .select()
    .from(courseAttempts)
    .where(
      and(
        eq(courseAttempts.memberId, memberId),
        eq(courseAttempts.courseVersion, CASE_VERSION)
      )
    )
    .orderBy(asc(courseAttempts.id));
  return rows.map(r => ({
    ...r,
    answers: JSON.parse(r.answers) as number[],
  })) as CaseAttempt[];
}
function recordView(attempts: CaseAttempt[]) {
  return {
    ...caseCompletion(attempts, CASE_LESSONS.length),
    attempts: attempts.map(a => ({
      ...a,
      feedback: gradeCaseAnswers(
        a.kind === "final" ? "final" : "checkpoint",
        a.lessonIndex,
        a.answers
      ).feedback,
    })),
  };
}
export const case2courtProcedures = {
  caseCourse: subscriberQuery.query(({ ctx }) => {
    ctx.resHeaders.set("Cache-Control", "private, no-store");
    return publicCaseCourse();
  }),
  caseProgress: subscriberQuery.query(async ({ ctx }) => {
    const m = await actor(ctx.req);
    return recordView(await attemptsFor(m.id));
  }),
  caseSubmit: subscriberQuery
    .input(
      z.object({
        version: z.literal(CASE_VERSION),
        submissionId: z.string().uuid(),
        kind: z.enum(["checkpoint", "final"]),
        lessonIndex: z
          .number()
          .int()
          .min(0)
          .max(CASE_LESSONS.length - 1)
          .nullable(),
        answers: z
          .array(z.number().int().min(0).max(3))
          .min(1)
          .max(CASE_FINAL.length),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const m = await actor(ctx.req);
      const attempts = await attemptsFor(m.id);
      const state = caseCompletion(attempts, CASE_LESSONS.length);
      const existing = await getDb()
        .select()
        .from(courseAttempts)
        .where(
          and(
            eq(courseAttempts.memberId, m.id),
            eq(courseAttempts.submissionId, input.submissionId)
          )
        )
        .limit(1);
      if (existing.length) return recordView(await attemptsFor(m.id));
      if (
        input.kind === "checkpoint" &&
        (input.lessonIndex === null ||
          input.lessonIndex > state.completed.length)
      )
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Complete the earlier lesson checkpoints first.",
        });
      if (
        input.kind === "final" &&
        (input.lessonIndex !== null ||
          state.completed.length !== CASE_LESSONS.length)
      )
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Complete every lesson before the final assessment.",
        });
      let grade;
      try {
        grade = gradeCaseAnswers(input.kind, input.lessonIndex, input.answers);
      } catch {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Complete every question with a valid choice.",
        });
      }
      await getDb()
        .insert(courseAttempts)
        .values({
          memberId: m.id,
          courseVersion: CASE_VERSION,
          submissionId: input.submissionId,
          kind: input.kind,
          lessonIndex: input.lessonIndex,
          answers: JSON.stringify(input.answers),
          correctCount: grade.correctCount,
          totalCount: grade.totalCount,
          passed: grade.correctCount === grade.totalCount,
        })
        .onDuplicateKeyUpdate({ set: { submissionId: input.submissionId } });
      return recordView(await attemptsFor(m.id));
    }),
};
