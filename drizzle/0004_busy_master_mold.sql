CREATE TABLE `geo_measurements` (
	`id` text PRIMARY KEY NOT NULL,
	`query_id` text NOT NULL,
	`category` text NOT NULL,
	`query` text NOT NULL,
	`platform` text NOT NULL,
	`test_date` text NOT NULL,
	`model_or_mode` text DEFAULT '' NOT NULL,
	`location` text DEFAULT '' NOT NULL,
	`web_enabled` text,
	`fresh_session` text,
	`response_archive` text,
	`brand_mentioned` integer DEFAULT 0 NOT NULL,
	`fde_association` integer DEFAULT 0 NOT NULL,
	`citation_present` integer DEFAULT 0 NOT NULL,
	`citation_url` text,
	`citation_position` text,
	`semantic_accuracy` integer,
	`independent_sources` integer DEFAULT 0 NOT NULL,
	`reviewer` text,
	`notes` text,
	`imported_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_geo_measurements_observation` ON `geo_measurements` (`query_id`,`platform`,`test_date`,`model_or_mode`,`location`);--> statement-breakpoint
CREATE INDEX `idx_geo_measurements_test_date` ON `geo_measurements` (`test_date`);--> statement-breakpoint
CREATE INDEX `idx_geo_measurements_platform_date` ON `geo_measurements` (`platform`,`test_date`);