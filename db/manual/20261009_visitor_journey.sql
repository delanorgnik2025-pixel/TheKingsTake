CREATE TABLE IF NOT EXISTS visitor_journey_events (
 id bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
 contact_id bigint unsigned NOT NULL,
 session_id varchar(64) NOT NULL,
 event varchar(32) NOT NULL,
 path varchar(100) NOT NULL,
 created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 UNIQUE KEY journey_once (session_id,event,path),
 KEY journey_contact (contact_id),
 KEY journey_event_date (event,created_at)
);
