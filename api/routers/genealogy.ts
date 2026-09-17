import { z } from "zod";
import { createRouter, memberQuery, publicQuery } from "../middleware";
import {
  createTree, getTree, getTreeByShareToken, listTreesByUser,
  updateTree, deleteTree, addPerson, updatePerson, deletePerson,
  addRecordSearch, getRecordSearches, getTreeStats,
} from "../genealogy-router";

export const genealogyRouter = createRouter({
  // ─── Trees ───────────────────────────────────────────
  createTree: memberQuery
    .input(z.object({
      treeName: z.string().min(1).max(255),
      rootPerson: z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        birthDate: z.string().optional(),
        birthPlace: z.string().optional(),
        birthState: z.string().optional(),
        birthCounty: z.string().optional(),
        notes: z.string().optional(),
      }),
    }))
    .mutation(async ({ input, ctx }) => createTree({
      ...input,
      userId: String(ctx.member.id),
      userEmail: ctx.member.email,
    })),

  getTree: memberQuery
    .input(z.object({ treeId: z.number() }))
    .query(async ({ input, ctx }) => getTree(input.treeId, String(ctx.member.id))),

  getTreeByShare: publicQuery
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => getTreeByShareToken(input.token)),

  listTrees: memberQuery
    .query(async ({ ctx }) => listTreesByUser(String(ctx.member.id))),

  updateTree: memberQuery
    .input(z.object({
      treeId: z.number(),
      treeName: z.string().optional(),
      isPublic: z.boolean().optional(),
    }))
    .mutation(async ({ input, ctx }) => updateTree(input.treeId, String(ctx.member.id), {
      treeName: input.treeName,
      isPublic: input.isPublic,
    })),

  deleteTree: memberQuery
    .input(z.object({ treeId: z.number() }))
    .mutation(async ({ input, ctx }) => deleteTree(input.treeId, String(ctx.member.id))),

  // ─── People ──────────────────────────────────────────
  addPerson: memberQuery
    .input(z.object({
      treeId: z.number(),
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      middleName: z.string().optional(),
      nicknames: z.string().optional(),
      birthDate: z.string().optional(),
      birthPlace: z.string().optional(),
      birthCounty: z.string().optional(),
      birthState: z.string().optional(),
      deathDate: z.string().optional(),
      deathPlace: z.string().optional(),
      deathCounty: z.string().optional(),
      deathState: z.string().optional(),
      spouseName: z.string().optional(),
      marriageDate: z.string().optional(),
      marriagePlace: z.string().optional(),
      occupation: z.string().optional(),
      militaryService: z.string().optional(),
      church: z.string().optional(),
      cemetery: z.string().optional(),
      notes: z.string().optional(),
      oralHistory: z.string().optional(),
      tribalAffiliation: z.string().optional(),
      censusRace: z.string().optional(),
      enrollmentNumber: z.string().optional(),
      generation: z.number().min(0).max(10),
      position: z.string(),
      parentPosition: z.string().optional(),
      status: z.enum(["unknown", "researching", "confirmed", "verified"]).optional(),
      recordsChecked: z.record(z.string(), z.boolean()).optional(),
    }))
    .mutation(async ({ input, ctx }) => addPerson(input, String(ctx.member.id))),

  updatePerson: memberQuery
    .input(z.object({
      personId: z.number(),
      data: z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        middleName: z.string().optional(),
        nicknames: z.string().optional(),
        birthDate: z.string().optional(),
        birthPlace: z.string().optional(),
        birthCounty: z.string().optional(),
        birthState: z.string().optional(),
        deathDate: z.string().optional(),
        deathPlace: z.string().optional(),
        deathCounty: z.string().optional(),
        deathState: z.string().optional(),
        spouseName: z.string().optional(),
        marriageDate: z.string().optional(),
        marriagePlace: z.string().optional(),
        occupation: z.string().optional(),
        militaryService: z.string().optional(),
        church: z.string().optional(),
        cemetery: z.string().optional(),
        notes: z.string().optional(),
        oralHistory: z.string().optional(),
        tribalAffiliation: z.string().optional(),
        censusRace: z.string().optional(),
        enrollmentNumber: z.string().optional(),
        status: z.enum(["unknown", "researching", "confirmed", "verified"]).optional(),
        recordsChecked: z.string().optional(),
      }),
    }))
    .mutation(async ({ input, ctx }) => updatePerson(input.personId, String(ctx.member.id), input.data)),

  deletePerson: memberQuery
    .input(z.object({ personId: z.number() }))
    .mutation(async ({ input, ctx }) => deletePerson(input.personId, String(ctx.member.id))),

  // ─── Record Searches ─────────────────────────────────
  addRecordSearch: memberQuery
    .input(z.object({
      personId: z.number(),
      recordType: z.enum([
        "dawes_rolls", "guion_miller", "baker_roll", "federal_census", "state_census",
        "birth_record", "death_record", "marriage_record", "military_record", "land_record",
        "freedmen_record", "church_record", "cemetery_record", "probate_record", "newspaper_record", "other",
      ]),
      sourceUrl: z.string().url().max(500).optional(),
      result: z.enum(["found", "not_found", "pending", "inconclusive"]).optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => addRecordSearch(input, String(ctx.member.id))),

  getRecordSearches: memberQuery
    .input(z.object({ personId: z.number() }))
    .query(async ({ input, ctx }) => getRecordSearches(input.personId, String(ctx.member.id))),

  // ─── Stats ───────────────────────────────────────────
  getStats: memberQuery
    .input(z.object({ treeId: z.number() }))
    .query(async ({ input, ctx }) => getTreeStats(input.treeId, String(ctx.member.id))),
});
