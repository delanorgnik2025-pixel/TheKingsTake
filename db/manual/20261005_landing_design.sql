CREATE TABLE IF NOT EXISTS site_design_settings (name VARCHAR(64) PRIMARY KEY, value VARCHAR(64) NOT NULL);
INSERT IGNORE INTO site_design_settings (name, value) VALUES ('landing', 'noir');
