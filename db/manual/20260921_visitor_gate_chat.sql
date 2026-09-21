CREATE TABLE IF NOT EXISTS `visitor_contacts` (
  `id` serial PRIMARY KEY,
  `email` varchar(320) NOT NULL UNIQUE,
  `last_session_id` varchar(64) NOT NULL,
  `interests` text NOT NULL,
  `looking_for` varchar(500),
  `facebook_subscriber` enum('yes','no','unsure') NOT NULL,
  `newsletter_consent` boolean NOT NULL DEFAULT false,
  `first_seen_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_seen_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `visitor_messages` (
  `id` serial PRIMARY KEY,
  `contact_id` bigint unsigned NOT NULL,
  `session_id` varchar(64) NOT NULL,
  `sender` enum('visitor','owner') NOT NULL,
  `body` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `visitor_messages_contact_idx` (`contact_id`, `id`),
  INDEX `visitor_messages_session_idx` (`session_id`, `id`)
);
