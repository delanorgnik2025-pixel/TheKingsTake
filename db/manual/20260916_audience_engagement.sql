-- Additive tables for consent-based newsletter leads, website inquiries,
-- and anonymous active-session counts. No existing data is removed.

CREATE TABLE IF NOT EXISTS `newsletter_subscribers` (
  `id` serial PRIMARY KEY,
  `email` varchar(320) NOT NULL UNIQUE,
  `name` varchar(255), `source_page` varchar(500), `interests` text,
  `status` enum('subscribed','unsubscribed') NOT NULL DEFAULT 'subscribed',
  `consented_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `site_leads` (
  `id` serial PRIMARY KEY, `name` varchar(255), `email` varchar(320) NOT NULL,
  `phone` varchar(50), `interest` varchar(100) NOT NULL, `message` text,
  `source_page` varchar(500), `consented_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `site_leads_created_idx` (`created_at`)
);

CREATE TABLE IF NOT EXISTS `site_visitor_sessions` (
  `id` serial PRIMARY KEY, `session_id` varchar(64) NOT NULL UNIQUE,
  `last_path` varchar(500) NOT NULL, `referrer` varchar(1000),
  `first_seen_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_seen_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `site_visitor_last_seen_idx` (`last_seen_at`)
);
