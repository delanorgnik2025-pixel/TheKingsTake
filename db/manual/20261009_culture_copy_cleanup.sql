START TRANSACTION;
UPDATE posts SET content=REPLACE(REPLACE(content,
'For a newsroom covering hip-hop and Black entertainment, the story extends beyond where a creator presses “go live.” It is about the projects, collaborations and performances that emerge around that audience.',
'The entertainment extends beyond the moment a creator presses “go live.” Music, comedy and audience conversation share the same screen, giving viewers different ways to connect with the work.'),
'DDG and Frost are two entry points into that wider creator scene. This coverage will expand across artists, comedians and streamers, following the work that gives those conversations substance. The King’s Take will bring that reporting together here, with room for the community’s own response.',
'DDG and Frost occupy different creative lanes within that scene. A musician’s performance and a comedian’s conversation offer different experiences, but both make the audience part of the moment.'),updatedAt=CURRENT_TIMESTAMP
WHERE slug='ddg-deshae-frost-kick-creator-watch' AND news_edition='2026-10-09-culture-launch';
COMMIT;
