import { sql } from 'drizzle-orm';
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const diagnosticApplications = sqliteTable('diagnostic_applications', {
  id: text('id').primaryKey(),
  createdAt: integer('created_at').notNull(),
  name: text('name').notNull(),
  company: text('company').notNull(),
  contact: text('contact').notNull(),
  role: text('role').notNull(),
  industry: text('industry').notNull(),
  problem: text('problem').notNull(),
  diagnosticScore: integer('diagnostic_score'),
  decision: text('decision'),
  source: text('source').notNull().default('website'),
  status: text('status').notNull().default('new'),
},(table)=>[
  index('idx_diagnostic_applications_created_at').on(table.createdAt),
  index('idx_diagnostic_applications_open_status').on(table.status).where(sql`${table.status} != 'closed'`),
]);
