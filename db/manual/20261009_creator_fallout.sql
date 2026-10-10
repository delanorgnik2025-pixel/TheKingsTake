START TRANSACTION;
INSERT INTO posts (title,slug,excerpt,content,category,coverImage,news_beat,news_edition,published,featured,story_updates)
SELECT 'Reggie renews allegations, Kai denies them as Adrien Broner joins the fallout','reggie-kai-cenat-adrien-broner-creator-fallout-2026-10-09','Reggie’s latest video and Broner’s livestream comments bring fresh attention to the creator dispute. Kai has denied the allegations, which remain unproven.','**CREATOR CULTURE · October 9, 2026**

**By AASOTU Media Group LLC | #TheKingsTake**

Reggie’s fallout with Kai Cenat has moved beyond the Clover Boys, with Adrien Broner adding his own commentary to a dispute now playing out across creator videos and livestreams.

## Reggie renews his claims; Kai has denied them

In an October 8 YouTube video, Reggie, known as Lil Rodney Son, repeated his allegations against Cenat and said he was retaining material for a possible court confrontation, according to The Times of India’s latest report. His assertion that he has evidence does not establish that the allegations are true.

The dispute includes Reggie’s allegation that Cenat groomed fellow streamer RaKai. Cenat denied the accusations and threatened legal action, NDTV reported on October 1. RaKai had separately denied an earlier claim that he had experienced childhood abuse; that statement preceded the later grooming allegation and should not be treated as a response to every subsequent claim.

## Adrien Broner enters the conversation

Baller Alert reported on October 7 that Broner criticized Cenat during a livestream alongside Ray J and DeenTheGreat. Broner said he did not need Cenat’s support and referred to allegations circulating around the creator circle. StreetAddictz also covered his comments that day.

Broner’s commentary adds another public voice to the fallout. It supplies no independent corroboration of the misconduct allegations. Cenat’s denial remains central to the story.

## Where the dispute stands

Reggie’s newest comments renew an existing accusation; they do not establish a new finding of wrongdoing. The cited reporting does not establish that Cenat’s threatened lawsuit has been filed. The disagreement, the allegations and the public responses are distinct parts of this developing story.

## Sources

- [The Times of India — October 8 video and latest claims](https://timesofindia.indiatimes.com/world/us-streamers/kai-cenat-faces-fresh-allegations-from-reggie-as-lil-rodney-son-claims-twitch-power-imbalance/articleshow/134842540.cms)
- [NDTV — allegations, Cenat’s denial and timing of RaKai’s statement, October 1](https://sports.ndtv.com/us/us-streamers/kai-cenat-vs-reggie-feud-explained-everything-that-has-happened-so-far-12124779)
- [Baller Alert — Broner’s livestream commentary, October 7](https://balleralert.com/adrien-broner-kai-cenat-streaming-crew-allegations/)
- [StreetAddictz — Broner’s comments, October 7](https://streetaddictz.net/adrien-broner-goes-of-on-kai-cenat/)
','DAILY NEWS','/images/creator-fallout-20261009.webp','creator-culture','20261009-creator-fallout',TRUE,FALSE,'[{"date": "2026-09-30", "text": "NDTV’s October 1 account describes Reggie’s allegations and Cenat’s denial and threat of legal action on September 30."}, {"date": "2026-10-07", "text": "Baller Alert and StreetAddictz publish accounts of Adrien Broner’s livestream comments about Cenat and the creator fallout."}, {"date": "2026-10-08", "text": "Reggie repeats his claims in a new YouTube video, according to The Times of India’s subsequent report. The allegations remain unproven."}]' WHERE NOT EXISTS (SELECT 1 FROM posts WHERE slug='reggie-kai-cenat-adrien-broner-creator-fallout-2026-10-09');
INSERT INTO feed_posts (body,link_url,link_title,image_url) SELECT 'Creator fallout · October 9, 2026

Reggie renews allegations, Kai has denied them, and Adrien Broner adds livestream commentary. The allegations remain unproven.

Read the latest reporting and timeline on The King’s Take.',CONCAT('https://thekingstake.com/blog/',p.slug),p.title,CONCAT('https://thekingstake.com',p.coverImage) FROM posts p WHERE p.slug='reggie-kai-cenat-adrien-broner-creator-fallout-2026-10-09' AND p.published=1 AND NOT EXISTS (SELECT 1 FROM feed_posts WHERE link_url=CONCAT('https://thekingstake.com/blog/',p.slug));
COMMIT;
