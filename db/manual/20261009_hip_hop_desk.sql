-- Additive, idempotent desk launch. Existing articles and members are untouched.

START TRANSACTION;

INSERT INTO posts (title,slug,excerpt,content,category,coverImage,news_beat,news_edition,published,featured)
SELECT 'DDG and Deshae Frost on Kick: where to follow the creators','ddg-deshae-frost-kick-creator-watch','A verified channel guide to DDG and Deshae Frost on Kick, with the platform record separated from contract speculation.','**CREATOR WATCH · Verified October 9, 2026**

**By AASOTU Media Group LLC | #TheKingsTake**

DDG and Deshae Frost both have public Kick channels. Their platform pages provide a starting point for readers following Black creators across livestreaming and hip-hop culture.

## What the channel record shows

[DDG’s Kick page](https://kick.com/ddg) identifies the channel as DDG. [Deshae Frost’s video archive](https://kick.com/deshaefrost/videos) lists on-demand broadcasts in categories including Just Chatting and IRL. Channel availability does not mean either creator is broadcasting live at this moment.

Win.gg reported on May 18, 2026 that Frost announced a move from Twitch to Kick. That is a dated account of an announcement; it does not establish the terms of a current contract or ongoing exclusivity.

## What we will track

This desk will follow attributable project announcements, music collaborations and changes in creator platforms. We are not publishing a popularity ranking, earnings estimate or contract valuation from the channel pages.

Readers should use the linked channels to check current schedules. Stream titles and short clips are starting points for reporting, not proof of claims about someone’s private life.

## Sources

- [DDG — public Kick channel](https://kick.com/ddg)
- [Deshae Frost — Kick video archive](https://kick.com/deshaefrost/videos)
- [Win.gg — May 18 platform-move report](https://win.gg/deshaefrost-leaves-twitch-for-kick/)

_Illustration: original AASOTU editorial artwork; not a photograph of either creator._','DAILY NEWS','/images/culture-creators-desk.svg','creator-culture','2026-10-09-culture-launch',TRUE,FALSE
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE slug='ddg-deshae-frost-kick-creator-watch');

INSERT INTO feed_posts (body,link_url,link_title,image_url)
SELECT 'Creator watch · verified October 9, 2026

A verified channel guide to DDG and Deshae Frost on Kick, with the platform record separated from contract speculation.

Read the sourced report on The King’s Take.','https://thekingstake.com/blog/ddg-deshae-frost-kick-creator-watch',p.title,CONCAT('https://thekingstake.com',p.coverImage) FROM posts p WHERE p.slug='ddg-deshae-frost-kick-creator-watch' AND p.published=1 AND NOT EXISTS (SELECT 1 FROM feed_posts WHERE link_url='https://thekingstake.com/blog/ddg-deshae-frost-kick-creator-watch');

INSERT INTO posts (title,slug,excerpt,content,category,coverImage,news_beat,news_edition,published,featured)
SELECT 'Spotify’s Fresh Finds Forward opens a new support lane for independent artists','spotify-fresh-finds-forward-independent-artists','Spotify announced a support program in September for eligible Fresh Finds artists. Here is the stated offer—and what playlist placement does not promise.','**INDUSTRY BRIEF · September 17 announcement reviewed October 9, 2026**

**By AASOTU Media Group LLC | #TheKingsTake**

Spotify announced Fresh Finds Forward on September 17, describing a support program for emerging independent artists featured in its Fresh Finds playlists. The company says eligible artists added from January 1, 2026 onward are invited through Spotify for Artists and can receive benefits for 12 months after onboarding.

## The stated offer

Spotify lists access to studio time for U.S.-based artists, digital production tools, community events and selected partnership opportunities among the benefits. The program spans genres; it is relevant to independent hip-hop artists, rather than being a rap-only initiative.

Spotify says artists hoping for editorial consideration should pitch an upcoming release through Spotify for Artists. A pitch is not a promise of playlist placement, program eligibility or income.

## What remains to be measured

The announcement establishes the company’s stated program, not independently audited results. Its impact on participating artists’ earnings and careers will need follow-up reporting. This brief does not claim a new launch on October 9.

## Source

- [Spotify — Fresh Finds Forward announcement, September 17, 2026](https://newsroom.spotify.com/2026-09-17/fresh-finds-forward/)

_Illustration: original AASOTU editorial artwork, not an image of a program participant._','DAILY NEWS','/images/culture-music-desk.svg','hip-hop','2026-10-09-culture-launch',TRUE,FALSE
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE slug='spotify-fresh-finds-forward-independent-artists');

INSERT INTO feed_posts (body,link_url,link_title,image_url)
SELECT 'Industry context · September 17, 2026 announcement

Spotify announced a support program in September for eligible Fresh Finds artists. Here is the stated offer—and what playlist placement does not promise.

Read the sourced report on The King’s Take.','https://thekingstake.com/blog/spotify-fresh-finds-forward-independent-artists',p.title,CONCAT('https://thekingstake.com',p.coverImage) FROM posts p WHERE p.slug='spotify-fresh-finds-forward-independent-artists' AND p.published=1 AND NOT EXISTS (SELECT 1 FROM feed_posts WHERE link_url='https://thekingstake.com/blog/spotify-fresh-finds-forward-independent-artists');

INSERT INTO posts (title,slug,excerpt,content,category,coverImage,news_beat,news_edition,published,featured)
SELECT 'Zaylevelten’s Fresh Finds Africa story puts Nigerian rap discovery in focus','zaylevelten-fresh-finds-africa-background','A dated background brief on Spotify’s account of Nigerian rapper Zaylevelten’s playlist breakthrough, with platform statistics kept in context.','**BACKGROUND · March 17 report reviewed October 9, 2026**

**By AASOTU Media Group LLC | #TheKingsTake**

Nigerian rapper Zaylevelten was the subject of a March 17 Spotify report about Fresh Finds Africa. The company identifies his song “Maye” as his first Spotify editorial feature, added to that playlist on June 4, 2025.

## The reported pathway

Spotify says placements on Alté Cruise, Internet Famous and regional New Music Friday playlists followed. It reported a 2,017% increase in his monthly listeners since the Fresh Finds debut.

That percentage is Spotify’s own dated measurement, not a current October listener count. The report says its playlist-performance data covers January through December 2025.

## Why this belongs on the desk

The account offers a concrete example of Nigerian rap entering platform discovery channels. It does not prove playlist placement alone caused audience growth, reveal the artist’s earnings or establish his present chart standing. Further coverage will look for artist perspectives alongside platform accounts.

## Source

- [Spotify — Zaylevelten and Fresh Finds Africa, March 17, 2026](https://newsroom.spotify.com/2026-03-17/zaylevelten-fresh-finds-africa-playlist/)

_Illustration: original AASOTU editorial artwork; not a portrait of Zaylevelten._','DAILY NEWS','/images/culture-africa-desk.svg','hip-hop','2026-10-09-culture-launch',TRUE,FALSE
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE slug='zaylevelten-fresh-finds-africa-background');

COMMIT;
