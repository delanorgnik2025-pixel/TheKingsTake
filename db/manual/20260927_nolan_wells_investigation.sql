-- Publish the first source-limited investigation and a feed card linking to it.
-- The copy intentionally distinguishes the uploaded readable transcript from
-- researcher-supplied claims that are not visible in that extract.
SET @investigation_slug = 'nolan-wells-garrett-discovery-phone-timeline';
SET @investigation_title = 'Garrett Discovery Transcript Raises New Questions About Nolan Wells’s Phone Timeline';
SET @investigation_excerpt = 'A readable transcript records a last attributable phone lock, later Snapchat overlays, and evening GPS presentation events, but the available extract cannot identify who possessed or used the device.';
SET @investigation_content = 'The available Garrett Discovery transcript presents a sequence of phone-related events and later witness messages that deserves careful public review. It also has important limits: the uploaded source is a readable reconstruction from livestream screenshots, not the native searchable Garrett PDF, CSV, or database export.

## What the uploaded transcript documents

- 2:18:10 PM CDT — Garrett labels this as the “Last Phone Lock Attributable to Nolan.”
- Approximately 4:36 PM CDT — A Sea Tow call is described as coming from an independent source, not Nolan Wells’s phone.
- 4:37:59 PM CDT — A Garrett overlay shows Morgan Seymour Snapchat activity with the message “Sit yikes.”
- 4:39:46 PM CDT — A Garrett overlay shows a message about a bilge problem: “Captain pull the bilge.”
- 5:56:21 PM CDT — Back Bay of Biloxi is shown as a recorded visit for the phone.
- 7:21:16–7:29:06 PM CDT — A Washington Avenue ramp visit interval is shown.
- 7:22:47 PM CDT — The Garrett animation says “PHONE CONTINUES BY CAR.”
- 7:29:37 PM CDT — A later segment is shown as illustrated travel.

Taken together, these entries raise questions about the phone’s route after the afternoon gathering and about how early accounts of the day were formed.

## What the readable extract does not establish

The readable transcript supplied for publication does not itself contain the separately reported 4:31 PM Triton departure or the claimed 5:18 PM Snapchat endpoint. Those details may appear in other Garrett presentation material, but they should not be treated as independently verified from this extract alone.

The transcript also does not establish who physically possessed the phone at each event. A phone configured for face recognition does not, by itself, prove that every app view or recorded location was authenticated by or attributable to Nolan Wells. Device events can help build a timeline, but identifying a user requires the underlying forensic records and authentication logs.

For those reasons, this report does not state as a proven fact that Nolan was aboard a particular vessel at a particular time. It reports what the readable source shows and identifies what would require the native forensic export.

## Conflicting accounts on July 5

The next morning’s messages show a search group sorting through uncertain and sometimes contradictory secondhand accounts. At 9:06:44 AM, one message says Nolan was last seen “Walking back to [REDACTED] boat.” At 11:02:03 AM, another relays that someone at DMR said a girl saw a person on a boat “screaming at Nolan to get on before they left.” At 11:43:51 AM, a different account says that around 6 PM Nolan got off a boat with another man and the two started walking back toward their boat.

The messages document what participants were saying during the search. They do not, standing alone, prove that any one account was accurate.

## Analyst’s note

The strongest responsible conclusion from the uploaded extract is that the phone timeline and the next-day witness discussion contain unresolved conflicts worthy of further examination. The native Garrett PDF, CSV, database artifacts, carrier records, device authentication logs, and original vessel GPS records would be needed to determine who used the phone, the exact route it traveled, and how those events relate to Nolan Wells’s disappearance.

## Source and disclaimer

This report is based on the readable transcript extracted from a Garrett Discovery visual framebook and researcher-supplied context. It is a working research document, not a certified forensic export. Some records are redacted, partially visible, or unreadable. Times are CDT where reported. This article presents documented timeline information and open questions only and makes no accusation against any individual.

[Download the readable source transcript](/documents/Garrett_Nolan_Wells_Readable_Transcript.txt)

Tags: Nolan Wells, Horn Island, Garrett Discovery, Missing Person, Gulf Coast, Biloxi, Timeline Research';

UPDATE `posts`
SET `title` = @investigation_title,
    `excerpt` = @investigation_excerpt,
    `content` = @investigation_content,
    `category` = 'INVESTIGATIONS',
    `coverImage` = NULL,
    `published` = true,
    `featured` = true,
    `updatedAt` = CURRENT_TIMESTAMP
WHERE `slug` = @investigation_slug;

INSERT INTO `posts` (`title`, `slug`, `excerpt`, `content`, `category`, `coverImage`, `published`, `featured`)
SELECT @investigation_title, @investigation_slug, @investigation_excerpt, @investigation_content, 'INVESTIGATIONS', NULL, true, true
WHERE NOT EXISTS (SELECT 1 FROM `posts` WHERE `slug` = @investigation_slug);

INSERT INTO `feed_posts` (`member_id`, `body`, `link_url`, `link_title`, `pinned`)
SELECT NULL,
       'New investigation: the Garrett Discovery readable transcript raises important questions about Nolan Wells’s phone timeline. This report separates what the uploaded extract documents from researcher-supplied context and identifies the forensic records still needed.',
       '/blog/nolan-wells-garrett-discovery-phone-timeline',
       @investigation_title,
       true
WHERE NOT EXISTS (
  SELECT 1 FROM `feed_posts` WHERE `link_url` = '/blog/nolan-wells-garrett-discovery-phone-timeline'
);
