CREATE TABLE `diagnostic_applications` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`name` text NOT NULL,
	`company` text NOT NULL,
	`contact` text NOT NULL,
	`role` text NOT NULL,
	`industry` text NOT NULL,
	`problem` text NOT NULL,
	`diagnostic_score` integer,
	`decision` text,
	`source` text DEFAULT 'website' NOT NULL,
	`status` text DEFAULT 'new' NOT NULL
);
