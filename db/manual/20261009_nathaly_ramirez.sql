INSERT INTO posts (title,slug,excerpt,content,category,coverImage,news_beat,news_edition,published,featured,createdAt,updatedAt,story_updates)
SELECT 'NATHALY RAMIREZ: MOTHER''S DEATH SPARKS OUTRAGE AS DOMESTIC VIOLENCE ALLEGATIONS EMERGE',
'nathaly-ramirez-mother-domestic-violence-case',
'A Bronx mother died and her infant survived a balcony fall. Police allege a push; Angel Carrasco faces charges. The verified record and domestic violence support resources.',
'**BREAKING / DEVELOPING**

**Bronx, New York · October 9, 2026**

**By AASOTU Media Group LLC | #TheKingsTake**

Nathaly Ramirez, 23, died after a fall from a Bronx apartment balcony on October 6. Her eight-month-old daughter survived. Police allege that Angel Carrasco, 31, pushed Ramirez while she held the child; he was arrested late October 7, according to reporting by WABC and NBC New York.

## What is verified

ABC News, citing the NYPD, reported that officers answering an early-morning emergency call found Ramirez and an infant with injuries consistent with a fall. Both went to Jacobi Hospital, where Ramirez was pronounced dead. Authorities subsequently treated the fall as an alleged push.

WABC places the balcony on the fifteenth floor in Allerton. Carrasco faces murder, attempted murder, manslaughter, attempted manslaughter and assault charges, according to the NYPD account reported by ABC News. Charges remain allegations. Carrasco is presumed innocent unless proven guilty in court.

## The child and the developing record

The infant remains under medical care. ABC News reported critical condition on October 8; a later WABC update described her as stable Thursday and transferred for specialized treatment. Those are dated accounts, not a current clinical assessment.

We have not established from medical records how the infant survived. We are not presenting a deliberate protective action during the fall as a proven fact. No arraignment result or plea is asserted here without a verified court record.

## Domestic violence awareness

NBC New York reported, citing sources, a history of domestic violence at the address. This report keeps that account separate from judicial findings. Ramirez and her daughter deserve reporting centered on their lives and the evidence, rather than speculative motives or invented quotations.

For confidential support, call the National Domestic Violence Hotline at **800-799-7233**, text **START to 88788**, or visit [thehotline.org](https://www.thehotline.org/). The service can discuss support and safety planning. Call 911 if there is immediate danger.

## Sources and verification

- [ABC News — October 8: NYPD account of the response and charges](https://abcnews.com/US/woman-dies-infant-critical-condition-after-pushed-bronx/story?id=137065934)
- [WABC — updated October 9: arrest and infant treatment update](https://abc7ny.com/post/ex-boyfriend-arrested-bronx-balcony-death-nathaly-ramirez/19920519/)
- [NBC New York — updated October 8: arrest and attributed domestic violence history](https://www.nbcnewyork.com/bronx/nathaly-ramirez-bronx-push-suspect-arrested/6557039/)
- [National Domestic Violence Hotline](https://www.thehotline.org/)

_Developing report. Essential facts were independently checked against the cited reporting on October 9, 2026. We have not obtained the police case file or court charging documents directly. Further updates require new attributable evidence._',
'DAILY NEWS',
NULL,
'crime-justice',
'2026-10-09-nathaly',
TRUE,
TRUE,
'2026-10-09 14:30:00',
'2026-10-09 14:30:00',
'[{"date": "2026-10-06T07:30:00Z", "text": "October 6: Emergency response in the Bronx. ABC News, citing NYPD, reports Ramirez died at Jacobi Hospital; her infant survived."}, {"date": "2026-10-08T02:30:00Z", "text": "October 7, late evening: Carrasco arrested, according to WABC and NBC New York."}, {"date": "2026-10-09T14:30:00Z", "text": "October 9 verification: NYPD charges reported by ABC News and WABC checked. Medical condition remains described through dated reporting; no court disposition asserted."}]'
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE slug='nathaly-ramirez-mother-domestic-violence-case');
