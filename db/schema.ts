import { sql } from 'drizzle-orm';
import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';

export const diagnosticApplications = sqliteTable(
  'diagnostic_applications',
  {
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
    diagnosticProfile: text('diagnostic_profile'),
    source: text('source').notNull().default('website'),
    landingPath: text('landing_path'),
    referrer: text('referrer'),
    utmSource: text('utm_source'),
    utmMedium: text('utm_medium'),
    utmCampaign: text('utm_campaign'),
    utmContent: text('utm_content'),
    utmTerm: text('utm_term'),
    acquisitionChannel: text('acquisition_channel').notNull().default('direct'),
    ownerNotes: text('owner_notes'),
    nextActionAt: integer('next_action_at'),
    updatedAt: integer('updated_at'),
    status: text('status').notNull().default('new'),
  },
  (table) => [
    index('idx_diagnostic_applications_created_at').on(table.createdAt),
    index('idx_diagnostic_applications_open_status')
      .on(table.status)
      .where(sql`${table.status} != 'closed'`),
  ],
);

export const geoMeasurements = sqliteTable(
  'geo_measurements',
  {
    id: text('id').primaryKey(),
    queryId: text('query_id').notNull(),
    category: text('category').notNull(),
    query: text('query').notNull(),
    platform: text('platform').notNull(),
    testDate: text('test_date').notNull(),
    modelOrMode: text('model_or_mode').notNull().default(''),
    location: text('location').notNull().default(''),
    webEnabled: text('web_enabled'),
    freshSession: text('fresh_session'),
    responseArchive: text('response_archive'),
    brandMentioned: integer('brand_mentioned').notNull().default(0),
    fdeAssociation: integer('fde_association').notNull().default(0),
    citationPresent: integer('citation_present').notNull().default(0),
    citationUrl: text('citation_url'),
    citationPosition: text('citation_position'),
    semanticAccuracy: integer('semantic_accuracy'),
    independentSources: integer('independent_sources').notNull().default(0),
    reviewer: text('reviewer'),
    notes: text('notes'),
    importedAt: integer('imported_at').notNull(),
    updatedAt: integer('updated_at').notNull(),
  },
  (table) => [
    uniqueIndex('idx_geo_measurements_observation').on(
      table.queryId,
      table.platform,
      table.testDate,
      table.modelOrMode,
      table.location,
    ),
    index('idx_geo_measurements_date_platform').on(
      table.testDate,
      table.platform,
    ),
  ],
);
