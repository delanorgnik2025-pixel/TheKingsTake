CREATE TABLE IF NOT EXISTS `visitor_tool_usage` (
  `id` serial PRIMARY KEY,
  `contact_id` bigint unsigned NOT NULL,
  `tool` enum('globe','archives') NOT NULL,
  `used_seconds` int NOT NULL DEFAULT 0,
  `last_meter_at` timestamp NULL,
  UNIQUE KEY `visitor_tool_contact_tool_unique` (`contact_id`, `tool`)
);
