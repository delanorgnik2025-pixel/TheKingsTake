ALTER TABLE newsletter_campaigns
  ADD COLUMN delivery_started_at timestamp NULL AFTER scheduled_at,
  ADD COLUMN last_delivery_error text NULL AFTER delivery_started_at;

CREATE TABLE IF NOT EXISTS newsletter_deliveries (
  id bigint unsigned NOT NULL AUTO_INCREMENT,
  campaign_id bigint unsigned NOT NULL,
  subscriber_id bigint unsigned NOT NULL,
  status enum('sent','failed') NOT NULL,
  provider_message varchar(500) NULL,
  sent_at timestamp NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY newsletter_delivery_campaign_subscriber_unique (campaign_id, subscriber_id),
  KEY newsletter_deliveries_campaign_status_idx (campaign_id, status)
);
