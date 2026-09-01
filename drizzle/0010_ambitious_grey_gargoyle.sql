CREATE TABLE `funnel_events` (
	`event_date` text NOT NULL,
	`event_name` text NOT NULL,
	`source` text DEFAULT 'website' NOT NULL,
	`landing_path` text DEFAULT '/' NOT NULL,
	`count` integer DEFAULT 0 NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_funnel_events_daily_source_path` ON `funnel_events` (`event_date`,`event_name`,`source`,`landing_path`);