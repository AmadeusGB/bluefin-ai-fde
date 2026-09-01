DROP INDEX `idx_geo_measurements_test_date`;--> statement-breakpoint
DROP INDEX `idx_geo_measurements_platform_date`;--> statement-breakpoint
CREATE INDEX `idx_geo_measurements_date_platform` ON `geo_measurements` (`test_date`,`platform`);