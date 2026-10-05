CREATE TABLE IF NOT EXISTS research_agent_settings (
 id INT PRIMARY KEY, enabled BOOLEAN NOT NULL DEFAULT TRUE, topics TEXT NOT NULL,
 last_check TEXT NULL, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT IGNORE INTO research_agent_settings (id, enabled, topics) VALUES (1, TRUE, '["Utah","Salt Lake City"]');
CREATE TABLE IF NOT EXISTS research_agent_runs (
 day_key VARCHAR(10) PRIMARY KEY, status VARCHAR(20) NOT NULL, records_added INT DEFAULT 0,
 ai_calls INT DEFAULT 0, notes TEXT NULL, started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 completed_at TIMESTAMP NULL
);
CREATE TABLE IF NOT EXISTS research_agent_records (
 id VARCHAR(64) PRIMARY KEY, title TEXT NOT NULL, record_json LONGTEXT NOT NULL,
 suggestions_json TEXT NULL, status VARCHAR(20) NOT NULL DEFAULT 'draft', query_text VARCHAR(120) NOT NULL,
 place_name VARCHAR(191) NULL, latitude DOUBLE NULL, longitude DOUBLE NULL, evidence TEXT NULL,
 precision_label VARCHAR(20) NULL, rights_reviewed BOOLEAN DEFAULT FALSE,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, reviewed_at TIMESTAMP NULL
);
