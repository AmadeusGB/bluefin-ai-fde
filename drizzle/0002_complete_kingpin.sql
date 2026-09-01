ALTER TABLE `diagnostic_applications` ADD `landing_path` text;--> statement-breakpoint
ALTER TABLE `diagnostic_applications` ADD `referrer` text;--> statement-breakpoint
ALTER TABLE `diagnostic_applications` ADD `utm_source` text;--> statement-breakpoint
ALTER TABLE `diagnostic_applications` ADD `utm_medium` text;--> statement-breakpoint
ALTER TABLE `diagnostic_applications` ADD `utm_campaign` text;--> statement-breakpoint
ALTER TABLE `diagnostic_applications` ADD `utm_content` text;--> statement-breakpoint
ALTER TABLE `diagnostic_applications` ADD `utm_term` text;--> statement-breakpoint
ALTER TABLE `diagnostic_applications` ADD `acquisition_channel` text DEFAULT 'direct' NOT NULL;