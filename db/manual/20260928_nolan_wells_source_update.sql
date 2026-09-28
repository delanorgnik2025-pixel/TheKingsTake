-- Add the commissioned feature image and a public-source update without
-- overstating what the available Garrett materials establish.
SET @investigation_slug = 'nolan-wells-garrett-discovery-phone-timeline';
SET @source_update_marker = '## September 2026 public-source update';
SET @source_update = '

## September 2026 public-source update

Public reporting says representatives for Nolan Wells’s family presented findings attributed to Garrett Discovery concerning phone data, GPS movement and Snapchat records. The Associated Press and The Guardian also reported that the complete message report was not publicly released. That means summaries, screenshots and reconstructions available online should not be represented as the full native forensic production.

The independent [Justice for Nolan Wells account-order timeline](https://justicefornolanwells.com/) is useful as a public research aid because it separates machine records, firsthand accounts, secondhand accounts and unresolved questions. Its reconstruction views also identify scenario assumptions. This report treats that website as a secondary source and research index—not as a substitute for the original Garrett PDF, database export, vessel GPS records or authenticated court exhibits.

### Public reading and source links

- [Justice for Nolan Wells account-order timeline](https://justicefornolanwells.com/)
- [Associated Press reporting on the family’s phone-data presentation](https://apnews.com/article/nolan-wells-grand-jury-cellphone-investigation-f24edbcf0191b7333b31062cf915c826)
- [The Guardian reporting on the phone findings and unreleased full report](https://www.theguardian.com/us-news/2026/sep/25/nolan-wells-ben-crump-cellphone)
- [Download the readable working transcript used for this article](/documents/Garrett_Nolan_Wells_Readable_Transcript.txt)

Readers should distinguish these public materials from a certified, complete forensic export. The King’s Take will update this report if the native report, authenticated exhibits or additional primary records become lawfully available.';

UPDATE `posts`
SET `coverImage` = '/images/nolan-wells-phone-timeline-thekingstake.webp',
    `content` = CASE
      WHEN LOCATE(@source_update_marker, `content`) = 0 THEN CONCAT(`content`, @source_update)
      ELSE `content`
    END,
    `updatedAt` = CURRENT_TIMESTAMP
WHERE BINARY `slug` = BINARY @investigation_slug;
