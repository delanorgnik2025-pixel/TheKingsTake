START TRANSACTION;
INSERT INTO posts (title,slug,excerpt,content,category,coverImage,news_beat,news_edition,published,featured,story_updates)
SELECT 'Erie shooting leaves multiple dead; nine reported, including two children','erie-pennsylvania-perry-street-shooting-2026-10-09','Police confirm multiple deaths after Friday’s Perry Street shooting in Erie, Pennsylvania. Nine deaths are reported, but the final count awaits clarification.','**BREAKING · CRIME & JUSTICE · October 10, 2026**

**By AASOTU Media Group LLC | #TheKingsTake**

Multiple people were killed in a shooting on Erie’s east side Friday, October 9. The incident occurred in **Erie, Pennsylvania**, on the 700 block of Perry Street near East 7th Street.

## The death toll: reported and confirmed

CBS Pittsburgh and WPXI report nine deaths, including two children, citing Erie News Now. CBS says it is unclear whether that reported total includes the suspected gunman. We are therefore distinguishing the reported toll from an official final count.

Erie Times-News reporter Tim Hahn’s account says Police Chief Rick Lorah confirmed multiple deaths, including the suspected shooter, but did not release a total late Friday.

## What police have said

Hahn reports that the first call reached police at 4:52 p.m. Officers found two women fatally injured outside the residence. Additional people, including the suspected shooter, were found dead inside. Investigators and the Erie County Coroner’s Office continued working at the scene late Friday.

Fox News reports that the city said the incident was contained and there was no ongoing danger to the public. That assurance reflects the city’s statement, rather than a new independent assessment by this newsroom.

## Questions still unanswered

The motive, the relationships among those involved and a reconciled official death toll are not established in the reporting reviewed for this brief. We are withholding victim and suspect names pending authoritative identification. Early accounts also conflict about gunfire during the police response; this report does not resolve that sequence by speculation.

## Sources and original coverage

- [Erie Times-News / Tim Hahn — police chief’s account, republished by AOL](https://www.aol.com/articles/multiple-people-dead-including-suspected-033531000.html)
- [CBS Pittsburgh — reported toll and uncertainty about the suspect’s inclusion](https://www.cbsnews.com/pittsburgh/news/erie-pennsylvania-mass-shooting-perry-street/)
- [WPXI — local affiliate reporting](https://www.wpxi.com/news/local/9-people-including-2-children-dead-after-shooting-erie/HGHK5UW2MZGPTOK3BGGDVQHS5M/)
- [Fox News — police and city statements](https://www.foxnews.com/us/multiple-people-killed-pennsylvania-shooting-suspected-gunman-found-dead-report)
- [Erie News Now — original local video report](https://www.facebook.com/erienewsnow/videos/nine-dead-in-east-erie-shooting/1623684959207582/)

**Developing report:** The images accompanying this brief are symbolic editorial illustrations, not photographs of the shooting or an actual vigil. Source video remains on its original publisher’s page; no footage has been copied or represented as our own.
','DAILY NEWS','/images/erie-memorial-20261010.webp','crime-justice','20261010-erie-breaking',TRUE,TRUE,'[{"date": "2026-10-09T16:52:00-04:00", "text": "Erie Times-News reports the first police call at 4:52 p.m. Friday."}, {"date": "2026-10-09", "text": "Police confirm multiple deaths. The city says the shooter is dead and the incident is contained, according to published local reporting."}, {"date": "2026-10-10", "text": "Nine deaths, including two children, are reported by local affiliates. CBS flags uncertainty about whether the suspect is included; an official final count remains unresolved in this brief."}]' WHERE NOT EXISTS (SELECT 1 FROM posts WHERE slug='erie-pennsylvania-perry-street-shooting-2026-10-09');
INSERT INTO feed_posts (body,link_url,link_title,image_url) SELECT 'Breaking · Erie, Pennsylvania

Multiple deaths confirmed after Friday’s Perry Street shooting. Nine are reported, including two children; the final count remains under clarification.

Read the sourced report and timeline on The King’s Take.',CONCAT('https://thekingstake.com/blog/',p.slug),p.title,CONCAT('https://thekingstake.com',p.coverImage) FROM posts p WHERE p.slug='erie-pennsylvania-perry-street-shooting-2026-10-09' AND p.published=1 AND NOT EXISTS (SELECT 1 FROM feed_posts WHERE link_url=CONCAT('https://thekingstake.com/blog/',p.slug));
COMMIT;
