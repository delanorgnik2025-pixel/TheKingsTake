-- Keep the production article table compatible with the exact write performed
-- when an administrator approves a King's Dispatch edition.
CREATE TABLE IF NOT EXISTS `posts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `excerpt` text NULL,
  `content` longtext NOT NULL,
  `category` varchar(50) NOT NULL,
  `coverImage` varchar(500) NULL,
  `published` boolean NOT NULL DEFAULT true,
  `featured` boolean NOT NULL DEFAULT false,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `posts_slug_unique` (`slug`)
);

SET @column_exists = (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'posts' AND column_name = 'title');
SET @statement = IF(@column_exists = 0, 'ALTER TABLE `posts` ADD COLUMN `title` varchar(255) NULL', 'SELECT 1');
PREPARE migration_statement FROM @statement; EXECUTE migration_statement; DEALLOCATE PREPARE migration_statement;

SET @column_exists = (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'posts' AND column_name = 'slug');
SET @statement = IF(@column_exists = 0, 'ALTER TABLE `posts` ADD COLUMN `slug` varchar(255) NULL', 'SELECT 1');
PREPARE migration_statement FROM @statement; EXECUTE migration_statement; DEALLOCATE PREPARE migration_statement;

SET @column_exists = (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'posts' AND column_name = 'excerpt');
SET @statement = IF(@column_exists = 0, 'ALTER TABLE `posts` ADD COLUMN `excerpt` text NULL', 'SELECT 1');
PREPARE migration_statement FROM @statement; EXECUTE migration_statement; DEALLOCATE PREPARE migration_statement;

SET @column_exists = (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'posts' AND column_name = 'content');
SET @statement = IF(@column_exists = 0, 'ALTER TABLE `posts` ADD COLUMN `content` longtext NULL', 'SELECT 1');
PREPARE migration_statement FROM @statement; EXECUTE migration_statement; DEALLOCATE PREPARE migration_statement;

SET @column_exists = (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'posts' AND column_name = 'category');
SET @statement = IF(@column_exists = 0, 'ALTER TABLE `posts` ADD COLUMN `category` varchar(50) NULL', 'SELECT 1');
PREPARE migration_statement FROM @statement; EXECUTE migration_statement; DEALLOCATE PREPARE migration_statement;

SET @column_exists = (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'posts' AND column_name = 'coverImage');
SET @statement = IF(@column_exists = 0, 'ALTER TABLE `posts` ADD COLUMN `coverImage` varchar(500) NULL', 'SELECT 1');
PREPARE migration_statement FROM @statement; EXECUTE migration_statement; DEALLOCATE PREPARE migration_statement;

SET @column_exists = (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'posts' AND column_name = 'published');
SET @statement = IF(@column_exists = 0, 'ALTER TABLE `posts` ADD COLUMN `published` boolean NOT NULL DEFAULT true', 'SELECT 1');
PREPARE migration_statement FROM @statement; EXECUTE migration_statement; DEALLOCATE PREPARE migration_statement;

SET @column_exists = (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'posts' AND column_name = 'featured');
SET @statement = IF(@column_exists = 0, 'ALTER TABLE `posts` ADD COLUMN `featured` boolean NOT NULL DEFAULT false', 'SELECT 1');
PREPARE migration_statement FROM @statement; EXECUTE migration_statement; DEALLOCATE PREPARE migration_statement;

SET @column_exists = (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'posts' AND column_name = 'createdAt');
SET @statement = IF(@column_exists = 0, 'ALTER TABLE `posts` ADD COLUMN `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP', 'SELECT 1');
PREPARE migration_statement FROM @statement; EXECUTE migration_statement; DEALLOCATE PREPARE migration_statement;

SET @column_exists = (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'posts' AND column_name = 'updatedAt');
SET @statement = IF(@column_exists = 0, 'ALTER TABLE `posts` ADD COLUMN `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', 'SELECT 1');
PREPARE migration_statement FROM @statement; EXECUTE migration_statement; DEALLOCATE PREPARE migration_statement;

-- TEXT can hold only 65,535 bytes. Automated drafts are validated by character
-- count, so use LONGTEXT to safely accommodate Unicode and source citations.
ALTER TABLE `posts` MODIFY COLUMN `content` longtext NULL;
