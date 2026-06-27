import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import {
  createTree, getTree, getTreeByShareToken, listTreesByUser,
  updateTree, deleteTree, addPerson, updatePerson, deletePerson,
  addRecordSearch, getRecordSearches, getTreeStats,
} from "../genealogy-router";

export const genealogyRouter = createRouter({
  // ─── Trees ───────────────────────────────────────────
  createTree: publicQuery
    .input(z.object({
      userId: z.string().optional(),
      userEmail: z.string().email().optional(),
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
    .mutation(async ({ input }) => createTree(input)),

  getTree: publicQuery
    .input(z.object({ treeId: z.number() }))
    .query(async ({ input }) => getTree(input.treeId)),

  getTreeByShare: publicQuery
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => getTreeByShareToken(input.token)),

  listTrees: publicQuery
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => listTreesByUser(input.userId)),

  updateTree: publicQuery
    .input(z.object({
      treeId: z.number(),
      treeName: z.string().optional(),
      isPublic: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => updateTree(input.treeId, {
      treeName: input.treeName,
      isPublic: input.isPublic,
    })),

  deleteTree: publicQuery
    .input(z.object({ treeId: z.number() }))
    .mutation(async ({ input }) => deleteTree(input.treeId)),

  // ─── People ──────────────────────────────────────────
  addPerson: publicQuery
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
      recordsChecked: z.record(z.boolean()).optional(),
    }))
    .mutation(async ({ input }) => addPerson(input)),

  updatePerson: publicQuery
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
    .mutation(async ({ input }) => updatePerson(input.personId, input.data)),

  deletePerson: publicQuery
    .input(z.object({ personId: z.number(), treeId: z.number() }))
    .mutation(async ({ input }) => deletePerson(input.personId, input.treeId)),

  // ─── Record Searches ─────────────────────────────────
  addRecordSearch: publicQuery
    .input(z.object({
      personId: z.number(),
      recordType: z.string(),
      sourceUrl: z.string().optional(),
      result: z.string().optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ input }) => addRecordSearch(input)),

  getRecordSearches: publicQuery
    .input(z.object({ personId: z.number() }))
    .query(async ({ input }) => getRecordSearches(input.personId)),

  // ─── Stats ───────────────────────────────────────────
  getStats: publicQuery
    .input(z.object({ treeId: z.number() }))
    .query(async ({ input }) => getTreeStats(input.treeId)),
});
