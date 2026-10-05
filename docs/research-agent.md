# Autonomous archive and feed workers

The existing Railway web service hosts the workers; no new service or subscription is provisioned. All controls live in Admin → Research Agent. Payments, visitor entry, book artwork, Dispatch approval and subscriber email delivery are preserved.

## Jobs and limits
- Daily archive discovery: up to two catalog searches, ten records and ten AI place extractions per New York day, with a durable daily claim.
- Hourly map worker: two catalog searches and up to ten new record analyses per hour (240 per day), rotating configured topics plus Gullah, Black Seminole, Prospect Bluff, Apalachicola River and every U.S. state/DC. Progresses result pages; duplicate NAIDs are skipped. Processes up to 25 pending location matches per hour, two candidate places each. No unbounded loop or catch-up burst.
- Feed publisher: four slots, 08:00, 12:00, 16:00, 20:00 America/New_York, polled every five minutes. A late start attempts only its current slot, with a three-hour spacing guard; no back-to-back backlog. Each slot uses one web-research and one writing call, plus a bounded photo search. Failed fresh-news checks can spotlight one already-published on-site article, dated and clearly labeled as archive content; the same article is not spotlighted again within 30 days. If no eligible article exists, the slot is withheld. Failed slots consume their attempt until the next slot unless an explicit deployment repair authorizes one retry. No emails are sent by these workers.

Maximum added model calls: 58 archive extractions and eight feed calls per day, excluding the pre-existing newsroom workflow. API calls and Railway hosting have usage costs; Plus does not include API billing. Pause switches are independent.

## Automatic map rules
A catalog title/description must contain the exact quoted place evidence and the full state name. A USGS GNIS exact-name lookup must return exactly one distinct feature, known WGS84 coordinates and an allowed town/natural-feature class. Broad geometries, conflicting matches and sensitive burial, archaeological or private-home records do not receive precise pins; a supported single-state area may still be shown. Records without supported geography remain private. GNIS repository-office addresses are never used. Location is labeled approximate because a town or river reference point is not a historical event boundary.

Automatic entries expose catalog metadata and coordinate provenance. Images with unreviewed rights are omitted from these cards. Manual review can approve media; approved automatic entries can be hidden. Public metadata is not a claim of image copyright clearance or ancestry. Up to 1,000 recent mapped records are shown with clustering; typed searches query all approved records in the database, returning up to 1,000 matches; this is not the entire National Archives corpus.

The archive map layer is also integrated into the existing heritage map. Gullah Wars is a search alias for a curated related starting point, Prospect Bluff, Florida, not a claim that every event in that history happened there. NPS provides historical context and Open Parks Network's NPS-held archive metadata provides the approximate site coordinate.

## Feed publishing rules
Original on-site articles require at least two independent sources from selected agency, institution or established newsroom domains. Supplied sources come from web-research citations, not invented model links. Failure or duplicate recent headline withholds publication. Descriptions distinguish current reporting from dated context. Photographs carry context/date/license credits; generated storm pictures are not used. Article and feed card publish in one database transaction; card links stay on TheKingsTake.com/blog. Source links are supplemental. This does not guarantee every automated interpretation is correct: publication history remains inspectable, and the owner can remove articles/posts through existing admin controls.

## Reliability
Durable slot keys and MySQL advisory locks prevent duplicate publication across deployments. Transactions roll back partial article/feed writes. Worker histories expose outcomes and failures. Timeouts bound provider calls. Settings and research records survive restarts. No new credentials, MCP servers, external social posting, Artlist purchases, or newsletter sends are created.

General-area policy: try a named USGS feature first, then one state explicitly named in a supported geographical quote. State anchors reuse existing map viewing centers and are labeled “state area”, never exact-site coordinates. Multiple-state quotes and repository addresses do not permit a single-state fallback. Previously held drafts are reconsidered. Provider failures retry after one day; unsupported geography after seven days. The public map currently loads at most 1,000 latest records; the database can accumulate more. Larger collection batches increase metered API usage.
