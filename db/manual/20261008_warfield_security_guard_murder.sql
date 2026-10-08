INSERT INTO posts
(title, slug, excerpt, content, category, coverImage, news_beat, news_edition, published, featured, createdAt, updatedAt)
SELECT
'SECURITY GUARD AND FATHER OF SIX KILLED OUTSIDE SAN FRANCISCO''S WARFIELD — WOMAN CHARGED WITH MURDER',
'warfield-security-guard-murder-shakia-vanderbilt',
'A San Francisco security guard and father of six was fatally shot outside the Warfield Theatre. Shakia R. Vanderbilt faces murder and firearm charges. Here is what investigators have disclosed.',
'**BREAKING / DEVELOPING**

**San Francisco, California · October 8, 2026**

**By AASOTU Media Group LLC | #TheKingsTake**

SAN FRANCISCO — A night of entertainment at the historic Warfield Theatre ended in tragedy when 47-year-old security guard Ulysses Tykee Davis, known to loved ones as Bear, was fatally shot outside the venue. Days later, San Francisco authorities arrested Shakia R. Vanderbilt, 32, in connection with his death.

Vanderbilt was booked into custody on October 6, 2026, and prosecutors announced murder and firearm-related charges on October 7. She is presumed innocent unless proven guilty.

## THE NIGHT OF THE SHOOTING

The incident unfolded during the early hours of October 3, following an entertainment event associated with the Zeus Network reality series Baddies USA.

According to local news reporting, disturbances inside the venue included confrontations and reports of a chemical irritant being sprayed. People reportedly rushed toward exits as conditions deteriorated.

Shortly after 1 a.m., police responded to the 900 block of Market Street, where they found Davis suffering from a gunshot wound. Emergency responders transported him to a hospital, where he died.

## A FATHER OF SIX WHO NEVER RETURNED HOME

Davis was 47 years old, a father of six and a grandfather of three. His family described him as a dependable, generous man with deep ties to San Francisco''s Bayview-Hunters Point community.

Family members told local reporters that Davis'' wife and two of his children were present when the shooting occurred. His death has left a family grieving and seeking answers.

## WHAT LED TO THE GUNFIRE?

According to an account attributed to Davis'' brother-in-law, Terrance Cooper, Davis had been helping remove a disruptive woman from the venue when gunfire erupted. Cooper alleged that Davis was shot in the back.

That description remains an attributed family account, not a complete judicial finding. Prosecutors have acknowledged a disturbance and a confrontation outside the venue, but the full sequence of events and the suspect''s alleged motive have not been publicly established.

Authorities are examining evidence, including possible surveillance footage, to reconstruct what occurred.

## THE SUSPECT AND REPORTED PRIOR ARRESTS

The San Francisco Chronicle reported that Vanderbilt had previously been associated with an alleged organized retail theft group called the Rainbow Crew.

Its reporting connected her to a 2014 Daly City robbery investigation involving the stabbing of a security guard and a 2017 Southern California arrest following a vehicle pursuit involving suspected stolen merchandise.

The final legal dispositions of those reported earlier arrests have not been established in the cited reporting. An arrest does not establish guilt, and those allegations should not be described as convictions without supporting court records.

There is also an age discrepancy in public reporting: the district attorney and jail information identify Vanderbilt as 32, while a police announcement identified her as 42. The discrepancy has not been publicly resolved.

## THE CRIMINAL CHARGES

On October 7, the San Francisco District Attorney''s Office announced charges that include:

- **California Penal Code 187(a):** Murder.
- **Penal Code 12022.53(d):** Firearm enhancement alleging intentional discharge causing death.
- **Penal Code 246:** Discharging a firearm at an occupied building.
- **Penal Code 29800(a)(1):** Four counts of possession of a firearm by a felon.

These are criminal allegations that must be proven in court. Prosecutors sought detention without bail pending trial.

Vanderbilt''s arraignment was scheduled for October 8 at 1:30 p.m. This article does not report an outcome for that hearing because the outcome has not been independently verified.

## QUESTIONS SURROUNDING EVENT SECURITY

The shooting has raised questions about security arrangements at the Warfield.

Investigators have examined how the firearm may have entered the venue and whether event operations complied with applicable permit and security requirements.

The existence of an investigation does not establish wrongdoing by the theater, event organizers or Zeus Network. No such legal finding is asserted in this article.

## WHAT HAPPENS NEXT?

Investigators must establish the precise sequence of events, examine available surveillance and witness evidence, and determine what evidence supports the criminal charges.

The court process will also address the prosecution''s allegations and the defendant''s response.

For Davis'' family, the legal proceedings begin against the backdrop of a devastating personal loss: a father and grandfather was killed while working security at a public entertainment event.

## THE KING''S TAKE

This case raises questions that deserve documented answers. How did a firearm allegedly enter an entertainment venue? What happened between the initial disturbance and the fatal gunfire? Were security protocols followed? And what can court records establish about the suspect''s reported earlier encounters with law enforcement?

Accountability requires evidence, not speculation. The public deserves a clear record of what happened, and the accused remains entitled to the presumption of innocence.

This is a developing story. AASOTU Media Group LLC will update this report as verified court records and official information become available.

## SOURCES

- [San Francisco District Attorney — October 7, 2026](https://sfdistrictattorney.org/woman-charged-in-connection-to-fatal-shooting-on-market-street/)
- [San Francisco Police Department](https://www.sanfranciscopolice.org/news/sfpd-arrests-southern-district-homicide-suspect-26-120a)
- [Mission Local](https://missionlocal.org/2026/10/woman-murder-charge-warfield-guards-killing-family-calls-loss-surreal/)
- [San Francisco Chronicle](https://www.sfchronicle.com/crime/article/warfield-theater-suspect-arrest-rainbow-crew-22466054.php)

_This report is based on publicly available official statements and cited news reporting. Criminal charges are allegations unless and until proven in court._',
'DAILY NEWS',
NULL,
'crime-justice',
'2026-10-08-warfield-breaking',
TRUE,
TRUE,
'2026-10-08 06:00:00',
'2026-10-08 06:00:00'
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE slug='warfield-security-guard-murder-shakia-vanderbilt');
