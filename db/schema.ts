import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  int,
  boolean,
  bigint,
} from "drizzle-orm/mysql-core";

// ─── Users (Auth) ──────────────────────────────────────────
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Blog Posts ────────────────────────────────────────────
export const posts = mysqlTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  coverImage: varchar("coverImage", { length: 500 }),
  published: boolean("published").default(true).notNull(),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

export type Post = typeof posts.$inferSelect;
export type InsertPost = typeof posts.$inferInsert;

// ─── Services / Consultations ──────────────────────────────
export const services = mysqlTable("services", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  shortDescription: text("shortDescription").notNull(),
  fullDescription: text("fullDescription"),
  price: int("price").notNull(),
  priceDisplay: varchar("priceDisplay", { length: 50 }),
  duration: varchar("duration", { length: 50 }),
  type: mysqlEnum("type", ["one_time", "subscription", "package"]).notNull(),
  icon: varchar("icon", { length: 50 }),
  features: text("features"),
  stripePriceId: varchar("stripePriceId", { length: 255 }),
  stripeProductId: varchar("stripeProductId", { length: 255 }),
  isActive: boolean("isActive").default(true).notNull(),
  order: int("order").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Service = typeof services.$inferSelect;
export type InsertService = typeof services.$inferInsert;

// ─── Bookings ──────────────────────────────────────────────
export const bookings = mysqlTable("bookings", {
  id: serial("id").primaryKey(),
  serviceId: bigint("serviceId", { mode: "number", unsigned: true }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  message: text("message"),
  status: mysqlEnum("status", ["pending", "confirmed", "completed", "cancelled"]).default("pending").notNull(),
  scheduledAt: timestamp("scheduledAt"),
  stripePaymentId: varchar("stripePaymentId", { length: 255 }),
  amountPaid: int("amountPaid"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;

// ─── Legal Forms ───────────────────────────────────────────
export const legalForms = mysqlTable("legalForms", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  fileUrl: varchar("fileUrl", { length: 500 }),
  fileSize: varchar("fileSize", { length: 20 }),
  downloadCount: int("downloadCount").default(0).notNull(),
  content: text("content"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type LegalForm = typeof legalForms.$inferSelect;
export type InsertLegalForm = typeof legalForms.$inferInsert;

// ─── Subscriptions ─────────────────────────────────────────
export const subscriptions = mysqlTable("subscriptions", {
  id: serial("id").primaryKey(),
  userEmail: varchar("userEmail", { length: 320 }).notNull(),
  serviceId: bigint("serviceId", { mode: "number", unsigned: true }).notNull(),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  status: mysqlEnum("status", ["active", "cancelled", "past_due", "unpaid"]).default("active").notNull(),
  currentPeriodEnd: timestamp("currentPeriodEnd"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;

// ─── Petition Signers ──────────────────────────────────────
export const petitionSigners = mysqlTable("petition_signers", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 50 }),
  message: text("message"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PetitionSigner = typeof petitionSigners.$inferSelect;
export type InsertPetitionSigner = typeof petitionSigners.$inferInsert;

// ─── Videos ────────────────────────────────────────────────
export const videos = mysqlTable("videos", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  youtubeId: varchar("youtubeId", { length: 50 }),
  thumbnail: varchar("thumbnail", { length: 500 }),
  duration: varchar("duration", { length: 20 }),
  category: varchar("category", { length: 50 }).default("talk").notNull(),
  isLive: boolean("isLive").default(false).notNull(),
  isFeatured: boolean("isFeatured").default(false).notNull(),
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

export type Video = typeof videos.$inferSelect;
export type InsertVideo = typeof videos.$inferInsert;

// ─── Story Submissions ─────────────────────────────────────
export const storySubmissions = mysqlTable("story_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  serviceType: varchar("serviceType", { length: 100 }).notNull(),
  status: mysqlEnum("status", ["new", "contacted", "in_progress", "completed"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type StorySubmission = typeof storySubmissions.$inferSelect;
export type InsertStorySubmission = typeof storySubmissions.$inferInsert;

// ─── Genealogy: Family Trees ───────────────────────────────
export const familyTrees = mysqlTable("familyTrees", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 255 }),
  userEmail: varchar("userEmail", { length: 320 }),
  treeName: varchar("treeName", { length: 255 }).notNull(),
  shareToken: varchar("shareToken", { length: 64 }).unique(),
  isPublic: boolean("isPublic").default(false).notNull(),
  generationLimit: int("generationLimit").default(4).notNull(), // 4 = free, 8 = premium
  totalPeople: int("totalPeople").default(1).notNull(),
  totalRecordsFound: int("totalRecordsFound").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

export type FamilyTree = typeof familyTrees.$inferSelect;
export type InsertFamilyTree = typeof familyTrees.$inferInsert;

// ─── Genealogy: People (Ancestors) ─────────────────────────
export const genealogyPeople = mysqlTable("genealogyPeople", {
  id: serial("id").primaryKey(),
  treeId: bigint("treeId", { mode: "number", unsigned: true }).notNull(),
  // Personal info
  firstName: varchar("firstName", { length: 255 }).notNull(),
  middleName: varchar("middleName", { length: 255 }),
  lastName: varchar("lastName", { length: 255 }).notNull(),
  nicknames: varchar("nicknames", { length: 500 }),
  // Birth
  birthDate: varchar("birthDate", { length: 50 }),
  birthPlace: varchar("birthPlace", { length: 255 }),
  birthCounty: varchar("birthCounty", { length: 100 }),
  birthState: varchar("birthState", { length: 50 }),
  // Death
  deathDate: varchar("deathDate", { length: 50 }),
  deathPlace: varchar("deathPlace", { length: 255 }),
  deathCounty: varchar("deathCounty", { length: 100 }),
  deathState: varchar("deathState", { length: 50 }),
  // Marriage
  spouseName: varchar("spouseName", { length: 255 }),
  marriageDate: varchar("marriageDate", { length: 50 }),
  marriagePlace: varchar("marriagePlace", { length: 255 }),
  // Details
  occupation: varchar("occupation", { length: 255 }),
  militaryService: varchar("militaryService", { length: 255 }),
  church: varchar("church", { length: 255 }),
  cemetery: varchar("cemetery", { length: 255 }),
  notes: text("notes"),
  oralHistory: text("oralHistory"),
  // Identity markers
  tribalAffiliation: varchar("tribalAffiliation", { length: 255 }),
  censusRace: varchar("censusRace", { length: 255 }),
  enrollmentNumber: varchar("enrollmentNumber", { length: 100 }),
  // Tree position
  generation: int("generation").default(1).notNull(), // 0 = root, 1 = parents, 2 = grandparents, etc.
  position: varchar("position", { length: 20 }).notNull(), // e.g. "0" for root, "0-0" father's father, "0-1" father's mother
  parentPosition: varchar("parentPosition", { length: 20 }),
  // Record checklist (stored as JSON string)
  recordsChecked: text("recordsChecked"),
  // Status
  status: mysqlEnum("status", ["unknown", "researching", "confirmed", "verified"]).default("unknown").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

export type GenealogyPerson = typeof genealogyPeople.$inferSelect;
export type InsertGenealogyPerson = typeof genealogyPeople.$inferInsert;

// ─── Genealogy: Record Searches ────────────────────────────
export const recordSearches = mysqlTable("recordSearches", {
  id: serial("id").primaryKey(),
  personId: bigint("personId", { mode: "number", unsigned: true }).notNull(),
  recordType: mysqlEnum("recordType", [
    "dawes_rolls",
    "guion_miller",
    "baker_roll",
    "federal_census",
    "state_census",
    "birth_record",
    "death_record",
    "marriage_record",
    "military_record",
    "land_record",
    "freedmen_record",
    "church_record",
    "cemetery_record",
    "probate_record",
    "newspaper_record",
    "other",
  ]).notNull(),
  sourceUrl: varchar("sourceUrl", { length: 500 }),
  result: mysqlEnum("result", ["found", "not_found", "pending", "inconclusive"]).default("pending").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
