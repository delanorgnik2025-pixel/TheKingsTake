ALTER TABLE research_agent_records ADD COLUMN location_checked_at TIMESTAMP NULL, ADD COLUMN location_retry_at TIMESTAMP NULL;
-- Reconsider earlier drafts under the newly authorized general-area policy.
UPDATE research_agent_records SET geo_source=NULL WHERE status='draft';
-- One bounded retry of the current map slot; never retries feed/email delivery.
UPDATE agent_worker_runs SET status='retry' WHERE kind='map' AND slot_key=CONCAT(DATE_FORMAT(CONVERT_TZ(UTC_TIMESTAMP(),'+00:00','-04:00'),'%Y-%m-%d-%H')) AND status IN ('completed','failed');
