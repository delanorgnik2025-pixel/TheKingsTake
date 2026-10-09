# Article Video News
Within existing React/tRPC/MySQL app. No separate publishing service or subscription.

## Editor
Admin dashboard → Articles & Video News (`/admin/articles`). Existing admin session required. New or existing article → Article video → enable → choose YouTube, Vimeo or approved direct media → URL/title/date → horizontal or vertical. Description, poster, transcript, WebVTT captions and ISO duration (e.g. PT1M30S) optional. Save as draft or published. Disabled video has no player and is excluded from `/video-news`.

For Nathaly use title `WATCH: THE NATHALY RAMIREZ CASE — WHAT WE KNOW` when a verified video is supplied. This release does not attach an unverified broadcaster clip. News desk is Crime & Justice. Domestic Violence Awareness remains editorial framing.

Copy article URL from edit screen. Append a dated verified update using the separate timeline control; previous entries and article body are preserved. Updates use atomic MySQL JSON append to avoid concurrent lost updates. Related articles reuse the existing desk-based list. King's Circle uses the existing member modal and invitation/access-code registration; no new account store.

## Media trust boundary
No raw embed HTML. HTTPS only; exact YouTube/Vimeo hosts canonicalized to privacy-enhanced YouTube/player.vimeo.com. Direct MP4/WebM limited to thekingstake.com, established Railway domain, res.cloudinary.com. Additional direct-media hosts require an explicit allowlist update. No server-side fetch of media URLs. No automatic audio playback. Provider contacts begin when reader clicks Watch report. Iframe provider controls remain responsible for caption availability; direct-file caption track and plain-text transcript supported. External provider playback depends on availability, embed settings and viewer network. Vimeo unlisted hash links and live streams are not supported in this version.

## Deployment
Additive, nullable LONGTEXT columns; controlled migrations run via established Railway workflow. Nathaly insert is slug-idempotent and never overwrites existing articles. No user tables or existing member data changed. Existing visitor entrance remains intact. NewsArticle gains VideoObject only for enabled valid video. Existing article canonical and social metadata retained.

## Verification
Client/server TypeScript checks, complete Vitest suite (100 tests), Vite production build. New tests cover unsafe schemes, spoofed hosts, credential URLs, disabled/malformed videos, approved direct files, and unauthorized editor/list/timeline calls. One existing map geography failure was fixed by dropping repository-address sentences from fallback evidence.
