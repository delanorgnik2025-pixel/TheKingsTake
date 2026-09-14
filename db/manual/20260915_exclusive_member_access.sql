-- REVIEW AND BACK UP PRODUCTION BEFORE EXECUTION.
-- Idempotent extension for invitation-only accounts and member-attributed posts.

CREATE TABLE IF NOT EXISTS `member_access_codes` (
  `id` serial PRIMARY KEY,
  `code_hash` varchar(64) NOT NULL UNIQUE,
  `code_preview` varchar(16) NOT NULL,
  `label` varchar(255),
  `invited_email` varchar(320),
  `expires_at` timestamp NULL,
  `used_at` timestamp NULL,
  `used_by_member_id` bigint unsigned NULL,
  `revoked_at` timestamp NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `member_access_codes_status_idx` (`used_at`, `revoked_at`, `expires_at`)
);

SET @member_id_exists = (
  SELECT COUNT(*) FROM information_schema.columns
  WHERE table_schema = DATABASE() AND table_name = 'feed_posts' AND column_name = 'member_id'
);
SET @add_member_id = IF(
  @member_id_exists = 0,
  'ALTER TABLE `feed_posts` ADD COLUMN `member_id` bigint unsigned NULL AFTER `id`, ADD INDEX `feed_posts_member_id_idx` (`member_id`)',
  'SELECT 1'
);
PREPARE add_member_id_statement FROM @add_member_id;
EXECUTE add_member_id_statement;
DEALLOCATE PREPARE add_member_id_statement;
