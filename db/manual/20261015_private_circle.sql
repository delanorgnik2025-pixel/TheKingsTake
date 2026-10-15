-- Additive verification boundary. Existing records retained; legacy self-reported flags grant no private access.
SET @exists_col=(SELECT COUNT(*) FROM information_schema.columns WHERE table_schema=DATABASE() AND table_name='members' AND column_name='facebook_verified_until');
SET @ddl=IF(@exists_col=0,'ALTER TABLE `members` ADD COLUMN `facebook_verified_until` TIMESTAMP NULL','SELECT 1');
PREPARE stmt FROM @ddl; EXECUTE stmt; DEALLOCATE PREPARE stmt;
SET @exists_col=(SELECT COUNT(*) FROM information_schema.columns WHERE table_schema=DATABASE() AND table_name='member_access_codes' AND column_name='subscriber_verified_until');
SET @ddl=IF(@exists_col=0,'ALTER TABLE `member_access_codes` ADD COLUMN `subscriber_verified_until` TIMESTAMP NULL','SELECT 1');
PREPARE stmt FROM @ddl; EXECUTE stmt; DEALLOCATE PREPARE stmt;
