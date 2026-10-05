-- One explicit deployment retry for the first withheld noon slot, preserving its history.
UPDATE agent_worker_runs SET status='retry' WHERE kind='feed' AND slot_key='2026-10-05-12' AND status='failed';
