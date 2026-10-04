-- One reviewable lead edition, never scheduled or sent by this migration.
INSERT INTO newsletter_campaigns
(subject, preview_text, content, source_urls, automated, daily_key, research_summary,
 image_url, image_alt, image_credit, image_source_url,
 article_title, article_slug, article_excerpt, article_content, published_post_id, status)
SELECT
'Nolan Wells: what the phone timeline shows—and what remains unresolved',
'Our lead investigation: the reported timeline, source limitations and unresolved questions.',
'# Nolan Wells: what the phone timeline shows—and what remains unresolved

Nolan Wells is the lead story we are following at The King’s Take. Our investigation examines the reported phone activity, vessel timeline and conflicting accounts surrounding Horn Island.

The distinction matters: records describing a phone’s movement or app activity do not, by themselves, establish who physically possessed or operated the device. Claims drawn from reconstructed screenshots also require scrutiny against the underlying forensic records.

Read the investigation, its reported timeline and its source limitations here:
https://thekingstake.com/blog/nolan-wells-garrett-discovery-phone-timeline

We will distinguish documented records, attributed claims and unresolved questions as this coverage develops. This edition does not announce a newly authenticated report release or accuse any individual.
',
JSON_ARRAY('https://thekingstake.com/blog/nolan-wells-garrett-discovery-phone-timeline'),
FALSE,
'20261004-nolan-lead',
'Lead coverage of the existing investigation; no new forensic-release claim. Phone activity alone does not establish physical possession.',
p.coverImage,
'Branded illustration accompanying the Nolan Wells phone-timeline investigation.',
'The King’s Take · AASOTU Media Group LLC · Illustration',
'https://thekingstake.com/blog/nolan-wells-garrett-discovery-phone-timeline',
p.title,
p.slug,
p.excerpt,
p.content,
p.id,
'draft'
FROM posts p
WHERE BINARY p.slug = 'nolan-wells-garrett-discovery-phone-timeline' AND p.published = TRUE
AND NOT EXISTS (SELECT 1 FROM newsletter_campaigns WHERE daily_key = '20261004-nolan-lead');
