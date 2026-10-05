# AASOTU Research Agent

Runs inside the existing Railway website service. No additional agent platform or database is provisioned.

## Operating controls
- Admin dashboard → Research Agent: configure up to two topics, pause, verify connections, run today's batch, review records.
- Starts one minute after production boot; checks hourly. A persistent Eastern-date claim allows at most one batch per day, including manual runs. No backlog or automatic same-day retries.
- Maximum two National Archives searches, five returned records per search, ten AI calls per day; duplicate NAIDs are skipped. Provider charges are usage-based, not covered by ChatGPT subscriptions. Each AI call has a 350-token output cap and a bounded input.
- Connection verification is a separate diagnostic: database SELECT, a small NARA query, OpenAI models authentication, Mapbox style access. It does not prove geocoding permissions or all model capabilities.
- No geocoding calls. Mapbox displays manually reviewed locations; no permanent geocoding results are stored.
- AI suggests place names only when its exact evidence quote is in the catalog title/description. The existing normalizer's `locations` can be repository addresses and is deliberately excluded.
- External text is untrusted input. The agent has no email, payment, authentication, code-deployment or archive-write tools.

## Review and display
All results enter private drafts. Approval requires place, latitude/longitude, evidence, exact/approximate label, and explicit rights/sensitive-location review. Review originals; public catalog availability alone does not establish unrestricted image use or precise geography. Approved matches appear on an additional clustered map in Archives. Original heritage map remains unchanged. Photos load upon selection.

Source identifiers, original catalog URL, descriptions, dates, image availability, restriction notes and search topic are retained. Records with unknown locations remain drafts. Human reviewers must avoid publishing sensitive burial coordinates or treating repository location as depicted location.

## Persistence and failures
`research_agent_settings`, `research_agent_runs`, `research_agent_records` are additive controlled migrations. Database advisory lock serializes manual/scheduled execution; durable daily claims prevent reprocessing across restarts. Each network request has a timeout. Connection errors retain source-grounded metadata where possible and show partial status. An interrupted run consumes that day's slot; it does not repeatedly incur model charges.

Initial topics are Utah and Salt Lake City. Expand topics through admin settings once initial quality has been reviewed. This is the first archive-research agent, not a complete geospatial overhaul or an MCP server. Narrow MCP tools can be added separately.
