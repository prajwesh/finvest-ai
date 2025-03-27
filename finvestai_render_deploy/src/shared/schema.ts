import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  role: text("role").notNull(), // 'user' or 'assistant'
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const mutualFunds = pgTable("mutual_funds", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  type: text("type").notNull(),
  risk: text("risk").notNull(),
  returns1Y: text("returns_1y"),
  returns3Y: text("returns_3y"),
  returns5Y: text("returns_5y"),
  minSIP: integer("min_sip").notNull(),
  description: text("description"),
});

export const glossaryTerms = pgTable("glossary_terms", {
  id: serial("id").primaryKey(),
  term: text("term").notNull().unique(),
  definition: text("definition").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).pick({
  userId: true,
  role: true,
  content: true,
});

export const insertMutualFundSchema = createInsertSchema(mutualFunds).omit({
  id: true,
});

export const insertGlossaryTermSchema = createInsertSchema(glossaryTerms).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

export type InsertMutualFund = z.infer<typeof insertMutualFundSchema>;
export type MutualFund = typeof mutualFunds.$inferSelect;

export type InsertGlossaryTerm = z.infer<typeof insertGlossaryTermSchema>;
export type GlossaryTerm = typeof glossaryTerms.$inferSelect;
