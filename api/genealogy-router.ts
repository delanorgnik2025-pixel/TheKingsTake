import { z } from "zod";
import { eq, and, sql } from "drizzle-orm";
import { getDb } from "./queries/connection";
import { familyTrees, genealogyPeople, recordSearches } from "@db/schema";
import { randomBytes } from "crypto";

// Helper to generate share token
function generateToken(): string {
  return randomBytes(32).toString("hex");
}

// ─── TREE OPERATIONS ──────────────────────────────────────

export const createTree = async (input: {
  userId?: string;
  userEmail?: string;
  treeName: string;
  rootPerson: {
    firstName: string;
    lastName: string;
    birthDate?: string;
    birthPlace?: string;
    birthState?: string;
    birthCounty?: string;
    notes?: string;
  };
}) => {
  const [tree] = await getDb().insert(familyTrees).values({
    userId: input.userId || null,
    userEmail: input.userEmail || null,
    treeName: input.treeName,
    shareToken: generateToken(),
    totalPeople: 1,
  }).$returningId();

  const treeId = tree.id;

  // Create root person (generation 0)
  const [person] = await getDb().insert(genealogyPeople).values({
    treeId,
    firstName: input.rootPerson.firstName,
    lastName: input.rootPerson.lastName,
    birthDate: input.rootPerson.birthDate || null,
    birthPlace: input.rootPerson.birthPlace || null,
    birthState: input.rootPerson.birthState || null,
    birthCounty: input.rootPerson.birthCounty || null,
    notes: input.rootPerson.notes || null,
    generation: 0,
    position: "0",
    status: "confirmed",
    recordsChecked: JSON.stringify({}),
  }).$returningId();

  return { tree, personId: person.id };
};

export const getTree = async (treeId: number) => {
  const [tree] = await getDb().select().from(familyTrees).where(eq(familyTrees.id, treeId)).limit(1);
  if (!tree) return null;

  const people = await getDb().select().from(genealogyPeople).where(eq(genealogyPeople.treeId, treeId));

  return { ...tree, people };
};

export const getTreeByShareToken = async (token: string) => {
  const [tree] = await getDb().select().from(familyTrees)
    .where(and(eq(familyTrees.shareToken, token), eq(familyTrees.isPublic, true)))
    .limit(1);
  if (!tree) return null;

  const people = await getDb().select().from(genealogyPeople).where(eq(genealogyPeople.treeId, tree.id));
  return { ...tree, people };
};

export const listTreesByUser = async (userId: string) => {
  return getDb().select().from(familyTrees).where(eq(familyTrees.userId, userId));
};

export const updateTree = async (treeId: number, data: { treeName?: string; isPublic?: boolean }) => {
  await getDb().update(familyTrees).set(data).where(eq(familyTrees.id, treeId));
  return getTree(treeId);
};

export const deleteTree = async (treeId: number) => {
  // Delete all people first
  await getDb().delete(genealogyPeople).where(eq(genealogyPeople.treeId, treeId));
  // Delete tree
  await getDb().delete(familyTrees).where(eq(familyTrees.id, treeId));
};

// ─── PERSON OPERATIONS ────────────────────────────────────

export const addPerson = async (input: {
  treeId: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  nicknames?: string;
  birthDate?: string;
  birthPlace?: string;
  birthCounty?: string;
  birthState?: string;
  deathDate?: string;
  deathPlace?: string;
  deathCounty?: string;
  deathState?: string;
  spouseName?: string;
  marriageDate?: string;
  marriagePlace?: string;
  occupation?: string;
  militaryService?: string;
  church?: string;
  cemetery?: string;
  notes?: string;
  oralHistory?: string;
  tribalAffiliation?: string;
  censusRace?: string;
  enrollmentNumber?: string;
  generation: number;
  position: string;
  parentPosition?: string;
  status?: string;
  recordsChecked?: Record<string, boolean>;
}) => {
  const [person] = await getDb().insert(genealogyPeople).values({
    treeId: input.treeId,
    firstName: input.firstName,
    lastName: input.lastName,
    middleName: input.middleName || null,
    nicknames: input.nicknames || null,
    birthDate: input.birthDate || null,
    birthPlace: input.birthPlace || null,
    birthCounty: input.birthCounty || null,
    birthState: input.birthState || null,
    deathDate: input.deathDate || null,
    deathPlace: input.deathPlace || null,
    deathCounty: input.deathCounty || null,
    deathState: input.deathState || null,
    spouseName: input.spouseName || null,
    marriageDate: input.marriageDate || null,
    marriagePlace: input.marriagePlace || null,
    occupation: input.occupation || null,
    militaryService: input.militaryService || null,
    church: input.church || null,
    cemetery: input.cemetery || null,
    notes: input.notes || null,
    oralHistory: input.oralHistory || null,
    tribalAffiliation: input.tribalAffiliation || null,
    censusRace: input.censusRace || null,
    enrollmentNumber: input.enrollmentNumber || null,
    generation: input.generation,
    position: input.position,
    parentPosition: input.parentPosition || null,
    status: (input.status as any) || "unknown",
    recordsChecked: input.recordsChecked ? JSON.stringify(input.recordsChecked) : JSON.stringify({}),
  }).$returningId();

  // Update tree person count
  await getDb().update(familyTrees)
    .set({ totalPeople: sql`${familyTrees.totalPeople} + 1` })
    .where(eq(familyTrees.id, input.treeId));

  return person;
};

export const updatePerson = async (personId: number, data: Partial<{
  firstName: string;
  lastName: string;
  middleName: string;
  nicknames: string;
  birthDate: string;
  birthPlace: string;
  birthCounty: string;
  birthState: string;
  deathDate: string;
  deathPlace: string;
  deathCounty: string;
  deathState: string;
  spouseName: string;
  marriageDate: string;
  marriagePlace: string;
  occupation: string;
  militaryService: string;
  church: string;
  cemetery: string;
  notes: string;
  oralHistory: string;
  tribalAffiliation: string;
  censusRace: string;
  enrollmentNumber: string;
  status: string;
  recordsChecked: string;
}>) => {
  await getDb().update(genealogyPeople).set(data).where(eq(genealogyPeople.id, personId));

  const [person] = await getDb().select().from(genealogyPeople).where(eq(genealogyPeople.id, personId)).limit(1);
  return person;
};

export const deletePerson = async (personId: number, treeId: number) => {
  await getDb().delete(genealogyPeople).where(eq(genealogyPeople.id, personId));
  await getDb().update(familyTrees)
    .set({ totalPeople: sql`${familyTrees.totalPeople} - 1` })
    .where(eq(familyTrees.id, treeId));
};

// ─── RECORD SEARCH OPERATIONS ─────────────────────────────

export const addRecordSearch = async (input: {
  personId: number;
  recordType: string;
  sourceUrl?: string;
  result?: string;
  notes?: string;
}) => {
  const [search] = await getDb().insert(recordSearches).values({
    personId: input.personId,
    recordType: input.recordType as any,
    sourceUrl: input.sourceUrl || null,
    result: (input.result as any) || "pending",
    notes: input.notes || null,
  }).$returningId();

  // Update tree records count
  const [person] = await getDb().select().from(genealogyPeople).where(eq(genealogyPeople.id, input.personId)).limit(1);
  if (person) {
    await getDb().update(familyTrees)
      .set({ totalRecordsFound: sql`${familyTrees.totalRecordsFound} + 1` })
      .where(eq(familyTrees.id, person.treeId));
  }

  return search;
};

export const getRecordSearches = async (personId: number) => {
  return getDb().select().from(recordSearches).where(eq(recordSearches.personId, personId));
};

export const updateRecordSearch = async (searchId: number, data: { result?: string; notes?: string }) => {
  await getDb().update(recordSearches).set(data).where(eq(recordSearches.id, searchId));
};

// ─── TREE STATS ───────────────────────────────────────────

export const getTreeStats = async (treeId: number) => {
  const [tree] = await getDb().select().from(familyTrees).where(eq(familyTrees.id, treeId)).limit(1);
  if (!tree) return null;

  const people = await getDb().select().from(genealogyPeople).where(eq(genealogyPeople.treeId, treeId));

  const stats = {
    totalPeople: people.length,
    confirmed: people.filter(p => p.status === "confirmed").length,
    researching: people.filter(p => p.status === "researching").length,
    unknown: people.filter(p => p.status === "unknown").length,
    verified: people.filter(p => p.status === "verified").length,
    recordsFound: tree.totalRecordsFound,
    generations: Math.max(...people.map(p => p.generation), 0) + 1,
    canAddMore: people.length < 15, // Free tier limit
  };

  return stats;
};
