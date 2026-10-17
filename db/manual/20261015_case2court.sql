CREATE TABLE IF NOT EXISTS course_attempts (
 id bigint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
 member_id int NOT NULL,
 course_version varchar(40) NOT NULL,
 submission_id varchar(36) NOT NULL UNIQUE,
 kind varchar(16) NOT NULL,
 lesson_index int NULL,
 answers text NOT NULL,
 correct_count int NOT NULL,
 total_count int NOT NULL,
 passed boolean NOT NULL,
 created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 INDEX course_attempt_member_version (member_id,course_version,id)
);
