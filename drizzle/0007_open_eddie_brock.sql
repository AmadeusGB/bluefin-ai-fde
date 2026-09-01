CREATE TABLE `evidence_records` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`title` text NOT NULL,
	`client_label` text NOT NULL,
	`industry` text NOT NULL,
	`project_period` text,
	`evidence_level` text NOT NULL,
	`publication_status` text DEFAULT 'draft' NOT NULL,
	`client_authorized` integer DEFAULT 0 NOT NULL,
	`client_background` text,
	`original_process` text,
	`quantified_loss` text,
	`data_scope` text,
	`why_ordinary_failed` text,
	`diagnosis` text,
	`mvd_scope` text,
	`human_system_boundary` text,
	`baseline_results` text,
	`risks_limitations` text,
	`handover` text,
	`reusable_assets` text,
	`source_references` text,
	`reviewer` text,
	`completeness` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_evidence_records_updated_at` ON `evidence_records` (`updated_at`);