-- REVIEW AND BACK UP PRODUCTION BEFORE EXECUTION.
-- This controlled, idempotent repair is intentionally outside the inconsistent
-- Drizzle journal. It creates missing community tables and enforces one like per
-- member/post without assuming 0000_feed_and_live was applied.

CREATE TABLE IF NOT EXISTS `members` (
  `id` serial PRIMARY KEY,
  `email` varchar(320) NOT NULL UNIQUE,
  `password_hash` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `avatar` text,
  `facebook_subscribed` boolean NOT NULL DEFAULT false,
  `is_active` boolean NOT NULL DEFAULT true,
  `role` enum('member','moderator','admin') NOT NULL DEFAULT 'member',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `feed_comments` (
  `id` serial PRIMARY KEY,
  `post_id` bigint unsigned NOT NULL,
  `member_id` bigint unsigned NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `feed_comments_post_id_idx` (`post_id`),
  INDEX `feed_comments_member_id_idx` (`member_id`)
);

CREATE TABLE IF NOT EXISTS `feed_likes` (
  `id` serial PRIMARY KEY,
  `post_id` bigint unsigned NOT NULL,
  `member_id` bigint unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `feed_likes_member_post_unique` (`member_id`, `post_id`),
  INDEX `feed_likes_post_id_idx` (`post_id`)
);

-- Existing installations may have feed_likes without the unique key. Remove
-- duplicates before adding it; the lowest id is retained for each pair.
DELETE duplicate_like
FROM `feed_likes` AS duplicate_like
JOIN `feed_likes` AS retained_like
  ON duplicate_like.`member_id` = retained_like.`member_id`
 AND duplicate_like.`post_id` = retained_like.`post_id`
 AND duplicate_like.`id` > retained_like.`id`;

SET @like_index_exists = (
  SELECT COUNT(*) FROM information_schema.statistics
  WHERE table_schema = DATABASE()
    AND table_name = 'feed_likes'
    AND index_name = 'feed_likes_member_post_unique'
);
SET @add_like_index = IF(
  @like_index_exists = 0,
  'ALTER TABLE `feed_likes` ADD UNIQUE INDEX `feed_likes_member_post_unique` (`member_id`, `post_id`)',
  'SELECT 1'
);
PREPARE add_like_index_statement FROM @add_like_index;
EXECUTE add_like_index_statement;
DEALLOCATE PREPARE add_like_index_statement;

-- Repair any historical counter drift without allowing negative counts.
UPDATE `feed_posts` AS post
LEFT JOIN (
  SELECT `post_id`, COUNT(*) AS like_count
  FROM `feed_likes`
  GROUP BY `post_id`
) AS counts ON counts.`post_id` = post.`id`
SET post.`likes_count` = COALESCE(counts.like_count, 0);
