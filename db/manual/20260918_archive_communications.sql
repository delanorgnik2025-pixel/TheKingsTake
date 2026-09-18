CREATE TABLE IF NOT EXISTS work_applications (
  id bigint unsigned NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  email varchar(320) NOT NULL,
  role varchar(255) NOT NULL,
  message text NOT NULL,
  status enum('new','reviewing','contacted','accepted','declined') NOT NULL DEFAULT 'new',
  admin_notes text NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY work_applications_status_created_idx (status, created_at)
);

ALTER TABLE newsletter_subscribers
  ADD COLUMN unsubscribe_token varchar(64) NULL,
  ADD UNIQUE KEY newsletter_subscribers_unsubscribe_token_unique (unsubscribe_token);

CREATE TABLE IF NOT EXISTS newsletter_campaigns (
  id bigint unsigned NOT NULL AUTO_INCREMENT,
  subject varchar(255) NOT NULL,
  preview_text varchar(255) NULL,
  content text NOT NULL,
  source_urls text NULL,
  status enum('draft','scheduled','sent') NOT NULL DEFAULT 'draft',
  scheduled_at timestamp NULL,
  sent_at timestamp NULL,
  recipient_count int NOT NULL DEFAULT 0,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY newsletter_campaigns_status_schedule_idx (status, scheduled_at)
);
