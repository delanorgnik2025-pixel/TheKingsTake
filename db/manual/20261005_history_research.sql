-- Utah was an illustrative example, not the intended research focus.
UPDATE research_agent_settings SET topics='["Seminole War","Black Seminole"]' WHERE id=1 AND topics='["Utah","Salt Lake City"]';
-- Expired runs can resume next hour without permanently stranding a slot.
UPDATE agent_worker_runs SET status='failed',notes='Earlier map run exceeded its processing window; later hourly slots will continue.' WHERE kind='map' AND status='running' AND started_at<DATE_SUB(CURRENT_TIMESTAMP,INTERVAL 1 HOUR);
