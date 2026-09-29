SET @add_beat = IF((SELECT COUNT(*) FROM information_schema.columns WHERE table_schema=DATABASE() AND table_name='posts' AND column_name='news_beat')=0, 'ALTER TABLE posts ADD COLUMN news_beat varchar(32) NULL', 'SELECT 1');
PREPARE migration_stmt FROM @add_beat; EXECUTE migration_stmt; DEALLOCATE PREPARE migration_stmt;
SET @add_edition = IF((SELECT COUNT(*) FROM information_schema.columns WHERE table_schema=DATABASE() AND table_name='posts' AND column_name='news_edition')=0, 'ALTER TABLE posts ADD COLUMN news_edition varchar(32) NULL', 'SELECT 1');
PREPARE migration_stmt FROM @add_edition; EXECUTE migration_stmt; DEALLOCATE PREPARE migration_stmt;
