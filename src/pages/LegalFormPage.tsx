import { trpc } from "@/providers/trpc";
import { Link, useParams } from "react-router";
import { ArrowLeft, Download, AlertTriangle, FileText, Clock, BookOpen, Gavel, FileWarning } from "lucide-react";
import { useMemo } from "react";

// Filing guide data — educational content for each form
const FILING_GUIDES: Record<string, {
  whenToFile: string;
  statuteOfLimitations: string;
  filingProcess: string[];
  importantNotes: string[];
  relevantLaw: string[];
}> = {
  "motion-to-dismiss": {
    whenToFile: "File this motion BEFORE trial, typically at arraignment or as soon as possible after charges are filed. In most jurisdictions, you have 30 days from arraignment to file pretrial motions. Do NOT wait until the last minute — early filing shows the court you are prepared and preserves your rights.",
    statuteOfLimitations: "Criminal statute of limitations vary by state and offense severity. Generally: Misdemeanors: 1-3 years. Felonies: 3-6 years (some states have no limit for murder or sex offenses). Federal crimes: 5 years generally. Check your state specific statutes. If the prosecution filed charges after the statute expired, this is a GROUND for dismissal.",
    filingProcess: [
      "STEP 1: Fill out the motion template with your case information. Replace ALL bracketed placeholders with your actual information.",
      "STEP 2: Make at least 3 copies — one for the court, one for the prosecutor, and one for your records.",
      "STEP 3: File the original with the Clerk of Court in the court where your case is pending. Ask the clerk to stamp your copies as 'filed.'",
      "STEP 4: Serve a copy on the prosecutor/District Attorney. This can usually be done by mail with a certificate of service or by hand delivery.",
      "STEP 5: Request a hearing date. Some courts schedule automatically; others require you to file a separate notice of hearing.",
      "STEP 6: Prepare to argue the motion. Bring copies of any case law, evidence, or documents that support your grounds.",
    ],
    importantNotes: [
      "File EARLY — most courts require pretrial motions 30 days before trial.",
      "Keep proof of filing — the stamped copy from the clerk is your evidence.",
      "Serve the prosecutor — failure to serve can result in your motion being denied.",
      "Be specific in your grounds — vague motions are often denied without hearing.",
      "If you cannot afford filing fees, ask the clerk for a fee waiver form.",
      "This is educational guidance only — always consult a licensed attorney for your specific case.",
    ],
    relevantLaw: [
      "Federal Rule of Criminal Procedure 12(b) — Defenses and objections before trial",
      "Fourth Amendment — Protection against unreasonable searches and seizures",
      "Fifth Amendment — Due process and protection against self-incrimination",
      "Sixth Amendment — Right to counsel and speedy trial",
      "Eighth Amendment — Protection against excessive bail and cruel/unusual punishment",
      "Brady v. Maryland (1963) — Prosecution must disclose exculpatory evidence",
    ],
  },
  "motion-for-bond-reduction": {
    whenToFile: "File this motion as soon as possible after bond is set and you are unable to post it. You can file multiple times if circumstances change — for example, if you get a job, secure housing, or complete a treatment program. Many courts will hold a bond review hearing within 5-10 days of filing.",
    statuteOfLimitations: "There is NO statute of limitations for filing a bond reduction motion. You can file at any stage of the case — pre-trial, during trial, or even post-conviction while awaiting sentencing. However, file AS SOON AS POSSIBLE. Every day you sit in jail is a day you cannot work, care for family, or prepare your defense.",
    filingProcess: [
      "STEP 1: Complete the bond reduction template. Be thorough about your community ties, employment, family responsibilities, and lack of criminal history.",
      "STEP 2: Gather supporting documents — pay stubs, lease agreements, utility bills, letters from employers, family photos, treatment completion certificates.",
      "STEP 3: Make at least 3 copies of the motion and all supporting documents.",
      "STEP 4: File with the Clerk of Court. Ask for a hearing date — many courts have regular bond review days.",
      "STEP 5: Serve the prosecutor immediately after filing.",
      "STEP 6: Prepare for the hearing. Dress appropriately. Bring any witnesses who can vouch for your character.",
      "STEP 7: If denied, ask the judge when you can refile. Circumstances change — you can file again.",
    ],
    importantNotes: [
      "Gather as much documentation of community ties as possible.",
      "Show the court you have a stable life — job, family, residence.",
      "If you have a public defender, ask them to file this motion for you.",
      "Dress appropriately for court hearings — this affects the judge's perception.",
      "If denied, ask the judge what conditions would need to be met for a reduction.",
      "Some jurisdictions offer pretrial services that supervise defendants at no cost.",
    ],
    relevantLaw: [
      "Eighth Amendment — Excessive bail is prohibited",
      "Stack v. Boyle, 342 U.S. 1 (1951) — Bail must be reasonable to ensure appearance",
      "United States v. Salerno, 481 U.S. 739 (1987) — Preventive detention standards",
      "State constitutional provisions on bail (varies by state)",
    ],
  },
  "motion-to-suppress-evidence": {
    whenToFile: "File this motion BEFORE trial, typically within 30 days of arraignment. This motion challenges HOW evidence was obtained — if the search was unconstitutional, the evidence cannot be used at trial. Timing is critical — if you wait too long, the court may rule that you waived this objection.",
    statuteOfLimitations: "The statute of limitations for challenging illegally obtained evidence is tied to your case timeline — NOT a traditional time limit. You must raise Fourth Amendment challenges before trial. Federal Rule of Criminal Procedure 12(b)(3) requires these motions before trial. Waiting until trial to object can result in the objection being waived.",
    filingProcess: [
      "STEP 1: Fill out the motion with specific details about the search/seizure. The more detailed, the stronger your motion.",
      "STEP 2: Include a detailed Statement of Facts — describe everything the officers said, did, wore, and how long the encounter lasted.",
      "STEP 3: Research relevant case law — look for cases with similar facts in your jurisdiction.",
      "STEP 4: File with the Clerk of Court and request a suppression hearing.",
      "STEP 5: Serve the prosecutor. They will have the opportunity to respond.",
      "STEP 6: At the suppression hearing, be prepared to testify about what happened during the search.",
      "STEP 7: If evidence is suppressed, the prosecution may have to dismiss charges if they cannot proceed without that evidence.",
    ],
    importantNotes: [
      "DETAIL IS EVERYTHING — the more specific your description of the search, the stronger your motion.",
      "Identify which search warrant exception the prosecution might claim and argue against it.",
      "If officers did not have a warrant, the burden shifts to the prosecution to justify the search.",
      "Document everything immediately after the search while memory is fresh.",
      "If officers exceeded the scope of a warrant, evidence found beyond that scope may be suppressed.",
      "Suppression hearings often require testimony — prepare to take the stand.",
    ],
    relevantLaw: [
      "Fourth Amendment — Protection against unreasonable searches and seizures",
      "Weeks v. United States (1914) — Exclusionary rule for federal courts",
      "Mapp v. Ohio (1961) — Exclusionary rule applied to state courts",
      "Miranda v. Arizona (1966) — Confessions obtained without warnings are inadmissible",
      "Fruit of the Poisonous Tree Doctrine",
    ],
  },
  "writ-of-habeas-corpus": {
    whenToFile: "File a writ of habeas corpus when you believe you are being held unlawfully. This can be filed: (1) BEFORE charges are filed if you have been held beyond the legal time limit, (2) AFTER conviction to challenge the legality of your detention, (3) In federal court under 28 U.S.C. § 2254 after exhausting state remedies. Federal habeas corpus has a ONE-YEAR deadline from the date your conviction becomes final.",
    statuteOfLimitations: "State habeas corpus: Generally NO strict deadline, but file as soon as possible. Federal habeas corpus (28 U.S.C. § 2254): STRICT ONE-YEAR deadline from when your conviction becomes final. This clock starts when your direct appeal is denied or the time for filing expires. If you miss the one-year federal deadline, you may lose your right to federal review forever.",
    filingProcess: [
      "STEP 1: Determine whether to file in state or federal court. If challenging state custody, exhaust state remedies first.",
      "STEP 2: Complete the petition with ALL grounds for relief. Once filed, you generally cannot add new grounds.",
      "STEP 3: Include a Verification section — this must be notarized or signed under penalty of perjury.",
      "STEP 4: File the original petition with the Clerk of Court.",
      "STEP 5: Serve the petition on the warden, sheriff, or person holding you in custody.",
      "STEP 6: The court will either: grant the writ, hold a hearing, or deny the petition.",
      "STEP 7: If denied, you have the right to appeal. Check deadlines carefully.",
    ],
    importantNotes: [
      "Habeas corpus is one of the oldest and most fundamental protections in American law.",
      "Federal habeas has a ONE-YEAR deadline — do NOT miss it.",
      "You must exhaust state remedies before filing federal habeas (with limited exceptions).",
      "Common grounds: ineffective assistance of counsel, prosecutorial misconduct, newly discovered evidence.",
      "If you cannot afford a lawyer, contact the Innocence Project or regional habeas clinics.",
    ],
    relevantLaw: [
      "Article I, Section 9, Clause 2 — Habeas Corpus Suspension Clause",
      "28 U.S.C. § 2254 — Federal habeas corpus for state prisoners",
      "28 U.S.C. § 2255 — Federal habeas corpus for federal prisoners",
      "Strickland v. Washington (1984) — Ineffective assistance of counsel standard",
    ],
  },
  "motion-for-new-trial": {
    whenToFile: "File this motion WITHIN the time period specified by your state's rules — typically 10-30 days after the verdict is entered. This is a VERY SHORT window. Do NOT delay. If you miss the deadline, you may lose the right to a new trial forever. The motion preserves your right to appeal and can result in a completely fresh trial.",
    statuteOfLimitations: "Most states: 10-30 days after verdict. Federal Rule of Criminal Procedure 33: 14 days after verdict (or 28 days for certain newly discovered evidence). Some states allow motions for newly discovered evidence within 1-2 years. CHECK YOUR STATE'S SPECIFIC RULE IMMEDIATELY. Missing this deadline is one of the most common and devastating mistakes in criminal defense.",
    filingProcess: [
      "STEP 1: File IMMEDIATELY after an unfavorable verdict. The clock starts ticking the moment the verdict is read.",
      "STEP 2: Fill out the motion with all applicable grounds. You can include multiple grounds.",
      "STEP 3: For newly discovered evidence: Include an affidavit explaining when and how you discovered it.",
      "STEP 4: File with the Clerk of Court who handled your trial. Make sure it gets into YOUR case file.",
      "STEP 5: Serve the prosecutor immediately.",
      "STEP 6: Request a hearing. The judge may rule on the papers alone or schedule a hearing.",
      "STEP 7: If granted, a new trial is scheduled. If denied, you can appeal both the verdict and the denial.",
    ],
    importantNotes: [
      "TIME IS CRITICAL — this motion has the shortest deadline of any pretrial/post-trial motion.",
      "Include ALL grounds — once the deadline passes, you cannot add new grounds.",
      "Newly discovered evidence is the most common successful ground.",
      "Juror misconduct is another strong ground — interview jurors lawfully.",
      "Filing this motion is often a prerequisite to filing an appeal — do NOT skip this step.",
    ],
    relevantLaw: [
      "Federal Rule of Criminal Procedure 33 — New trial motions",
      "Brady v. Maryland (1963) — Withheld exculpatory evidence",
      "Strickland v. Washington (1984) — Ineffective assistance of counsel",
      "Giglio v. United States (1972) — Prosecutor's duty to disclose impeachment evidence",
    ],
  },
  "motion-in-limine": {
    whenToFile: "File this motion BEFORE trial begins, typically during pretrial motions practice (within 30 days of arraignment or as ordered by the court). A motion in limine asks the court to exclude prejudicial evidence BEFORE the jury hears it. This prevents the jury from being influenced by evidence that should not be admitted.",
    statuteOfLimitations: "There is no statute of limitations for a motion in limine, but it must be filed BEFORE trial begins. Once evidence is introduced in front of the jury, the damage is done — even if the judge later excludes it, the jury cannot 'un-hear' what they heard. File this motion EARLY in the pretrial process.",
    filingProcess: [
      "STEP 1: Identify the specific evidence you want excluded and the legal basis for exclusion.",
      "STEP 2: Fill out the motion with detailed arguments about why the evidence is prejudicial.",
      "STEP 3: Research case law supporting your position — look for similar cases in your jurisdiction.",
      "STEP 4: File with the Clerk of Court during the pretrial motions period.",
      "STEP 5: Serve the prosecutor. They will likely argue the evidence is admissible.",
      "STEP 6: The court will typically rule at a pretrial conference or separate hearing.",
      "STEP 7: If the judge rules against you, make a timely objection during trial to preserve the issue for appeal.",
    ],
    importantNotes: [
      "The goal is to keep prejudicial evidence away from the jury BEFORE they hear it.",
      "Common grounds: hearsay, character evidence, prior bad acts, prejudicial photos.",
      "Even if the judge denies the motion, filing it preserves the issue for appeal.",
      "If prejudicial evidence comes in despite your motion, object immediately.",
    ],
    relevantLaw: [
      "Federal Rules of Evidence 401-403 — Relevance and prejudicial evidence",
      "Federal Rule of Evidence 404 — Character evidence",
      "Federal Rule of Evidence 802 — Hearsay rule",
      "Federal Rule of Evidence 702 — Expert testimony standards (Daubert)",
    ],
  },
};

// Static fallback forms keyed by slug — render immediately even if API/database is empty
const FALLBACK_FORMS: Record<string, { id: number; title: string; slug: string; description: string; category: string; content: string | null; fileUrl: string | null; fileSize: string | null; downloadCount: number }> = {
  "motion-to-dismiss": {
    id: 1, slug: "motion-to-dismiss", title: "Motion to Dismiss",
    category: "criminal", fileUrl: null, fileSize: null, downloadCount: 0,
    description: "Challenge the charges against you with proper legal grounds such as insufficient evidence, constitutional violations, or statute of limitations.",
    content: `[COURT HEADER]

IN THE [COURT NAME] COURT OF [COUNTY] COUNTY
STATE OF [STATE]

THE PEOPLE OF THE STATE OF [STATE],

Plaintiff,

v.

[DEFENDANT NAME],

Defendant.

Case No.: [CASE NUMBER]

MOTION TO DISMISS

TO THE HONORABLE COURT:

The Defendant, [DEFENDANT NAME], respectfully moves this Honorable Court to dismiss the [charges/indictment/information] filed against the Defendant on the following grounds:

GROUND ONE: INSUFFICIENT EVIDENCE TO ESTABLISH PROBABLE CAUSE

The [charges/indictment/information] fails to establish probable cause for the following reasons:
[Describe specifically why the evidence is insufficient — e.g., no physical evidence, unreliable witnesses, contradictory statements, lack of jurisdiction, etc.]

GROUND TWO: VIOLATION OF CONSTITUTIONAL RIGHTS

The charges should be dismissed because the Defendant's constitutional rights were violated as follows:
[Describe constitutional violations — e.g., Fourth Amendment search/seizure violations, Fifth Amendment Miranda violations, Sixth Amendment right to counsel violations, etc.]

GROUND THREE: STATUTE OF LIMITATIONS

The charges are barred by the applicable statute of limitations. [Describe the relevant time period and why the prosecution is time-barred.]

WHEREFORE, Defendant respectfully requests that this Honorable Court grant this Motion to Dismiss and dismiss all charges with prejudice.

Respectfully submitted,

[Date]

[Defendant Name], Defendant
[Address]
[Phone Number]

CERTIFICATE OF SERVICE

I hereby certify that a true and correct copy of the foregoing Motion to Dismiss was served upon the [Prosecutor/District Attorney] at [address] on [date].

[Defendant Name]`,
  },
  "motion-for-bond-reduction": {
    id: 2, slug: "motion-for-bond-reduction", title: "Motion for Bond Reduction",
    category: "criminal", fileUrl: null, fileSize: null, downloadCount: 0,
    description: "Request a lower bond amount when the current bail is excessive and beyond financial means. This motion argues that the defendant is not a flight risk and that the current bond amount is excessive under the Eighth Amendment.",
    content: `[COURT HEADER]

IN THE [COURT NAME] COURT OF [COUNTY] COUNTY
STATE OF [STATE]

THE PEOPLE OF THE STATE OF [STATE],

Plaintiff,

v.

[DEFENDANT NAME],

Defendant.

Case No.: [CASE NUMBER]

MOTION FOR BOND REDUCTION

TO THE HONORABLE COURT:

The Defendant, [DEFENDANT NAME], by and through [counsel/pro se representation], respectfully moves this Honorable Court to reduce the current bond amount from $[CURRENT AMOUNT] to $[REQUESTED AMOUNT], or in the alternative, to release the Defendant on [own recognizance/supervised release/electronic monitoring].

This Motion is supported by the following:

STATEMENT OF FACTS

1. The Defendant was arrested on [DATE] and charged with [CHARGES].

2. Bond was set at $[AMOUNT], which the Defendant is unable to post.

3. The Defendant has the following ties to the community:
   [List: Length of residence, family in area, employment, community involvement, etc.]

4. The Defendant has [no prior criminal record / minimal criminal history] and has always appeared for court as required.

5. The Defendant is employed at [EMPLOYER] and has been for [DURATION].

6. The Defendant has [number] minor children who depend on the Defendant for support.

ARGUMENT

I. THE CURRENT BOND IS EXCESSIVE AND VIOLATES THE EIGHTH AMENDMENT

The Eighth Amendment to the United States Constitution prohibits excessive bail. Bond should be set at an amount reasonably calculated to assure the Defendant's appearance at future proceedings, not as punishment.

The purpose of bail is to ensure appearance, not to punish or to create wealth-based detention. See Stack v. Boyle, 342 U.S. 1 (1951).

II. THE DEFENDANT IS NOT A FLIGHT RISK

[Detail reasons: strong community ties, stable employment, family responsibilities, willingness to comply with conditions, etc.]

III. THE DEFENDANT PRESENTS NO DANGER TO THE COMMUNITY

[Detail: No history of violence, nature of current charges, character references, etc.]

WHEREFORE, Defendant respectfully requests that this Honorable Court:

(a) Reduce the bond to $[REQUESTED AMOUNT]; or
(b) Release the Defendant on own recognizance; or
(c) Release the Defendant on supervised release with electronic monitoring.

Respectfully submitted,

[Date]

[Defendant Name]
[Address]
[Phone Number]

CERTIFICATE OF SERVICE

I hereby certify that a true and correct copy of the foregoing Motion for Bond Reduction was served upon the [Prosecutor/District Attorney] on [date].`,
  },
  "motion-to-suppress-evidence": {
    id: 3, slug: "motion-to-suppress-evidence", title: "Motion to Suppress Evidence",
    category: "criminal", fileUrl: null, fileSize: null, downloadCount: 0,
    description: "Challenge evidence obtained through unconstitutional search, seizure, or coerced confession. If granted, the prosecution cannot use the suppressed evidence at trial.",
    content: `[COURT HEADER]

IN THE [COURT NAME] COURT OF [COUNTY] COUNTY
STATE OF [STATE]

THE PEOPLE OF THE STATE OF [STATE],

Plaintiff,

v.

[DEFENDANT NAME],

Defendant.

Case No.: [CASE NUMBER]

MOTION TO SUPPRESS EVIDENCE

TO THE HONORABLE COURT:

The Defendant, [DEFENDANT NAME], respectfully moves this Honorable Court to suppress all evidence obtained as a result of the unconstitutional [search/seizure/interrogation] conducted by [AGENCY] on [DATE], including but not limited to: [LIST EVIDENCE TO BE SUPPRESSED].

STATEMENT OF FACTS

1. On [DATE] at approximately [TIME], [Officer Name(s)] of [Department] [conducted a traffic stop / arrived at Defendant's residence / approached Defendant on the street].

2. The officers [did not have a warrant / claimed to have probable cause / claimed to smell marijuana / claimed to observe suspicious activity].

3. [Describe exactly what happened: what the officers said, what they did, whether they asked for consent, whether you gave consent, how long the encounter lasted, etc.]

4. As a result of this [search/seizure], officers discovered [DESCRIBE EVIDENCE].

5. No valid search warrant was presented at any time during the encounter.

ARGUMENT

I. THE SEARCH VIOLATED THE FOURTH AMENDMENT

The Fourth Amendment protects against unreasonable searches and seizures. A search conducted without a warrant is presumptively unreasonable unless it falls within a recognized exception.

[Identify which exception the prosecution might claim and argue against it: consent, plain view, search incident to arrest, automobile exception, exigent circumstances, etc.]

II. THE EVIDENCE WAS THE FRUIT OF AN UNLAWFUL SEARCH

Under the exclusionary rule established in Weeks v. United States and applied to states through Mapp v. Ohio, evidence obtained through unconstitutional means must be excluded from trial. Additionally, under the fruit of the poisonous tree doctrine, any evidence derived from the unconstitutional search must also be suppressed.

III. [IF APPLICABLE] MIRANDA VIOLATION

If any statements were obtained without proper Miranda warnings being given, or if the Defendant invoked the right to counsel and questioning continued, all statements must be suppressed under the Fifth Amendment protections established in Miranda v. Arizona.

WHEREFORE, Defendant respectfully requests that this Honorable Court:

(a) Suppress all evidence obtained as a result of the unconstitutional [search/seizure/interrogation];
(b) Suppress any statements made during the unconstitutional encounter;
(c) Exclude any derivative evidence obtained as a result of the unlawful search; and
(d) Grant such other and further relief as the Court deems just and proper.

Respectfully submitted,

[Date]

[Defendant Name], Defendant
[Address]
[Phone Number]

CERTIFICATE OF SERVICE`,
  },
  "writ-of-habeas-corpus": {
    id: 4, slug: "writ-of-habeas-corpus", title: "Writ of Habeas Corpus",
    category: "criminal", fileUrl: null, fileSize: null, downloadCount: 0,
    description: "Challenge unlawful detention and demand the right to appear before a court. This is one of the most fundamental protections in American law — the right to question why you are being held.",
    content: `[COURT HEADER — WRIT OF HABEAS CORPUS]

IN THE [COURT NAME] COURT OF [COUNTY] COUNTY
STATE OF [STATE]

IN RE: [DEFENDANT NAME]

Case No.: [CASE NUMBER]

PETITION FOR WRIT OF HABEAS CORPUS

TO THE HONORABLE COURT:

Petitioner, [DEFENDANT NAME], respectfully petitions this Honorable Court for a Writ of Habeas Corpus, challenging the lawfulness of Petitioner's detention.

I. PARTIES AND JURISDICTION

1. Petitioner: [Full Name], currently detained at [Facility Name], [Address].

2. Respondent: [Sheriff/Warden/Jail Administrator], [Facility Name].

3. This Court has jurisdiction under [State Statute] and 28 U.S.C. § 2254.

II. STATEMENT OF FACTS

1. Petitioner was taken into custody on [DATE] by [Arresting Agency].

2. Petitioner has been detained for [DURATION] without [a bail hearing / formal charges / access to counsel / a preliminary hearing].

3. [Describe the circumstances of detention and why it is unlawful — e.g., no charges filed within required time, no probable cause hearing, excessive bail, conditions of confinement, etc.]

III. GROUNDS FOR RELIEF

[Select applicable grounds:]

A. NO PROBABLE CAUSE
Petitioner was detained without a finding of probable cause by a neutral magistrate, in violation of the Fourth Amendment and [State Constitution].

B. DELAY IN FILING CHARGES
The prosecution failed to file formal charges within the [HOURS/DAYS] required by [State Statute], making Petitioner's continued detention unlawful.

C. EXCESSIVE BAIL
The bail set in this case ($[AMOUNT]) is excessive under the Eighth Amendment and [State Constitution], as Petitioner is unable to post it and it is not reasonably calculated to assure appearance.

D. DENIAL OF RIGHT TO COUNSEL
Petitioner has been denied access to counsel in violation of the Sixth Amendment and [State Constitution].

IV. PRAYER FOR RELIEF

WHEREFORE, Petitioner respectfully requests that this Honorable Court:

(a) Issue a Writ of Habeas Corpus;
(b) Order Respondent to show cause why Petitioner should not be released;
(c) Release Petitioner from unlawful detention; and
(d) Grant such other relief as the Court deems just and proper.

Respectfully submitted,

[Date]

[Defendant Name], Petitioner
[Address]
[Phone Number]

VERIFICATION

I, [Defendant Name], being duly sworn, state that the facts set forth in this Petition are true and correct to the best of my knowledge and belief.

[Defendant Name]

Subscribed and sworn to before me on [DATE].

[Notary Public]

CERTIFICATE OF SERVICE`,
  },
  "motion-for-new-trial": {
    id: 5, slug: "motion-for-new-trial", title: "Motion for New Trial",
    category: "criminal", fileUrl: null, fileSize: null, downloadCount: 0,
    description: "Request a new trial based on legal errors, newly discovered evidence, or jury misconduct. This preserves your right to appeal and can result in a completely fresh trial.",
    content: `[COURT HEADER]

IN THE [COURT NAME] COURT OF [COUNTY] COUNTY
STATE OF [STATE]

THE PEOPLE OF THE STATE OF [STATE],

Plaintiff,

v.

[DEFENDANT NAME],

Defendant.

Case No.: [CASE NUMBER]

MOTION FOR NEW TRIAL

TO THE HONORABLE COURT:

The Defendant, [DEFENDANT NAME], respectfully moves this Honorable Court for a new trial pursuant to [State Rule of Criminal Procedure], based on the following grounds:

GROUND ONE: NEWLY DISCOVERED EVIDENCE

Since the trial concluded, the Defendant has discovered new evidence that could not have been discovered with due diligence before trial, and this evidence is likely to produce a different result. Specifically:

[Describe the new evidence in detail: what it is, where it was found, why it couldn't have been found earlier, and how it would change the outcome.]

GROUND TWO: JURY MISCONDUCT

During deliberations, the jury engaged in misconduct that violated Defendant's right to a fair trial:

[Describe the misconduct: Did jurors conduct independent investigations? Consult outside sources? Discuss the case before deliberations? Have improper communications?]

GROUND THREE: INSUFFICIENT EVIDENCE

The evidence presented at trial was insufficient to support the verdict. The prosecution failed to prove [specific elements] beyond a reasonable doubt.

GROUND FOUR: LEGAL ERROR BY THE COURT

The Court committed reversible error by [describe the error: improper jury instructions, erroneous evidentiary rulings, improper conduct of proceedings, etc.].

WHEREFORE, Defendant respectfully requests that this Honorable Court grant a new trial.

Respectfully submitted,

[Date]

[Defendant Name]
[Address]
[Phone Number]

CERTIFICATE OF SERVICE`,
  },
  "motion-in-limine": {
    id: 6, slug: "motion-in-limine", title: "Motion In Limine",
    category: "criminal", fileUrl: null, fileSize: null, downloadCount: 0,
    description: "Request the court to exclude certain prejudicial evidence from being presented at trial. This prevents the jury from hearing damaging information that is inadmissible under the rules of evidence.",
    content: `[COURT HEADER]

IN THE [COURT NAME] COURT OF [COUNTY] COUNTY
STATE OF [STATE]

THE PEOPLE OF THE STATE OF [STATE],

Plaintiff,

v.

[DEFENDANT NAME],

Defendant.

Case No.: [CASE NUMBER]

MOTION IN LIMINE

TO THE HONORABLE COURT:

The Defendant, [DEFENDANT NAME], respectfully moves this Honorable Court to enter an order excluding the following evidence from being presented to the jury during trial:

I. MOTION TO EXCLUDE [SPECIFIC EVIDENCE]

The prosecution intends to introduce [DESCRIBE EVIDENCE]. This evidence should be excluded for the following reasons:

A. IRRELEVANT
This evidence is not relevant to any material fact in dispute under [State Evidence Rule 401/402]. It does not make any fact of consequence more or less probable.

B. MORE PREJUDICIAL THAN PROBATIVE
Even if marginally relevant, this evidence is substantially more prejudicial than probative under [State Evidence Rule 403]. Its introduction would create a significant risk of unfair prejudice, confusion of the issues, or misleading the jury.

C. HEARSAY
This evidence constitutes hearsay under [State Evidence Rule 801/802] and does not fall within any applicable exception.

II. MOTION TO EXCLUDE PRIOR BAD ACTS

The prosecution may attempt to introduce evidence of Defendant's prior arrests, charges, or convictions. Such evidence is inadmissible under [State Evidence Rule 404(b)], which prohibits the use of prior bad acts to prove propensity to commit crimes.

III. MOTION TO EXCLUDE CHARACTER EVIDENCE

The prosecution should be prohibited from attacking Defendant's character unless Defendant first opens the door by introducing character evidence under [State Evidence Rule 404(a)].

IV. MOTION TO EXCLUDE UNRELIABLE WITNESS TESTIMONY

Witness [NAME] lacks credibility for the following reasons:
[Detail: prior inconsistent statements, bias, motive to lie, lack of personal knowledge, etc.]

WHEREFORE, Defendant respectfully requests that this Honorable Court:

(a) Exclude the evidence described above from trial;
(b) Prohibit the prosecution from mentioning or alluding to excluded evidence in opening statements or closing arguments;
(c) Order the prosecution to instruct its witnesses not to reference excluded evidence; and
(d) Grant such other relief as the Court deems just and proper.

Respectfully submitted,

[Date]

[Defendant Name]
[Address]
[Phone Number]

CERTIFICATE OF SERVICE`,
  },
};

export default function LegalFormPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: apiForm } = trpc.legal.bySlug.useQuery({ slug: slug ?? "" });
  const trackDownload = trpc.legal.trackDownload.useMutation();

  // Use API data if available, otherwise show static fallback immediately
  const form = useMemo(() => {
    if (apiForm) return apiForm;
    if (slug && FALLBACK_FORMS[slug]) return FALLBACK_FORMS[slug];
    return null;
  }, [apiForm, slug]);

  if (!form) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1B2838]">
        <div className="text-center">
          <h1 className="text-2xl text-[#F0EBE1] mb-2">Form not found</h1>
          <Link to="/legal" className="text-[#FF9500] hover:underline">Back to Legal Hub</Link>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    trackDownload.mutate({ id: form.id });
    if (form.fileUrl) {
      window.open(form.fileUrl, "_blank");
    } else if (form.content) {
      // Create and download a .txt file from the form content
      const blob = new Blob([form.content], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${form.slug}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-6 md:px-12 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/bg-legal.jpg)" }}
      />
      <div className="absolute inset-0 bg-[#1B2838]/85" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <Link to="/legal" className="inline-flex items-center gap-2 text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors mb-8">
          <ArrowLeft size={16} />
          Back to Legal Hub
        </Link>

        <div className="bg-[rgba(27,40,56,0.9)] backdrop-blur-lg rounded-lg border border-[rgba(255,149,0,0.3)] p-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText size={24} className="text-[#FF9500]" />
            <span className="text-xs uppercase tracking-[0.08em] text-[#FFB840]">{form.category}</span>
          </div>

          <h1 className="text-3xl md:text-4xl text-[#F0EBE1] tracking-[-0.02em] text-shadow-hero mb-4">
            {form.title}
          </h1>
          <p className="text-[#C9B99A] mb-6">{form.description}</p>

          <div className="flex items-center gap-1 p-4 bg-[rgba(255,149,0,0.1)] rounded border border-[rgba(255,149,0,0.2)] mb-6">
            <AlertTriangle size={16} className="text-[#FF9500] shrink-0" />
            <p className="text-xs text-[#C9B99A]">
              This form is for informational purposes only and does not constitute legal advice. Consult a licensed attorney for your specific case.
            </p>
          </div>

          {/* If there's AI-generated content, show it */}
          {form.content && (
            <div className="mb-6">
              <h3 className="text-lg text-[#F0EBE1] mb-3">Document Preview</h3>
              <div className="bg-[rgba(42,58,74,0.6)] rounded p-6 border border-[rgba(255,149,0,0.15)] max-h-96 overflow-y-auto">
                <pre className="text-sm text-[#C9B99A] whitespace-pre-wrap font-mono">{form.content}</pre>
              </div>
            </div>
          )}

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-full h-12 px-8 bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-['Newsreader']"
            style={{ boxShadow: "0 4px 16px rgba(255,149,0,0.25)" }}
          >
            <Download size={18} />
            {form.fileUrl ? "Download PDF" : form.content ? "Download as .txt" : "Download Coming Soon"}
          </button>

          {form.fileSize && (
            <span className="ml-4 text-xs text-dimmed">{form.fileSize}</span>
          )}

          {form.downloadCount ? (
            <p className="text-xs text-dimmed mt-3">Downloaded {form.downloadCount} times</p>
          ) : null}

          {/* FILING GUIDE — Educational Content */}
          {slug && FILING_GUIDES[slug] && (
            <div className="mt-10 space-y-6">
              <div className="w-full h-[2px] bg-[#FF9500] mb-8" />

              <h2 className="text-2xl text-[#F0EBE1] tracking-[-0.02em] mb-2" style={{ fontFamily: 'Newsreader, serif' }}>
                Filing Guide & Legal Education
              </h2>
              <p className="text-sm text-[#C9B99A]/70 mb-6">
                Educational guidance for using this document. Always consult a licensed attorney for your specific case.
              </p>

              {/* When to File */}
              <div className="bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.2)] rounded p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={18} className="text-[#FF9500]" />
                  <h3 className="text-lg text-[#F0EBE1] font-medium" style={{ fontFamily: 'Newsreader, serif' }}>When to File This Motion</h3>
                </div>
                <p className="text-sm text-[#C9B99A]/80 leading-relaxed whitespace-pre-line">
                  {FILING_GUIDES[slug].whenToFile}
                </p>
              </div>

              {/* Statute of Limitations */}
              <div className="bg-[rgba(220,38,38,0.08)] border border-[rgba(220,38,38,0.2)] rounded p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FileWarning size={18} className="text-red-400" />
                  <h3 className="text-lg text-[#F0EBE1] font-medium" style={{ fontFamily: 'Newsreader, serif' }}>Statute of Limitations & Deadlines</h3>
                </div>
                <p className="text-sm text-[#C9B99A]/80 leading-relaxed whitespace-pre-line">
                  {FILING_GUIDES[slug].statuteOfLimitations}
                </p>
              </div>

              {/* Filing Process Steps */}
              <div className="bg-[rgba(42,58,74,0.5)] border border-white/[0.08] rounded p-5">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen size={18} className="text-[#FF9500]" />
                  <h3 className="text-lg text-[#F0EBE1] font-medium" style={{ fontFamily: 'Newsreader, serif' }}>How to File — Step by Step</h3>
                </div>
                <div className="space-y-3">
                  {FILING_GUIDES[slug].filingProcess.map((step, i) => (
                    <div key={i} className="flex gap-3 text-sm text-[#C9B99A]/80 leading-relaxed">
                      <span className="text-[#FF9500] font-mono text-xs shrink-0 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-[rgba(42,58,74,0.5)] border border-[rgba(255,149,0,0.15)] rounded p-5">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle size={18} className="text-[#FF9500]" />
                  <h3 className="text-lg text-[#F0EBE1] font-medium" style={{ fontFamily: 'Newsreader, serif' }}>Critical Notes — Read Before Filing</h3>
                </div>
                <ul className="space-y-2">
                  {FILING_GUIDES[slug].importantNotes.map((note, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#C9B99A]/80">
                      <span className="text-[#FF9500] shrink-0">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Relevant Law */}
              <div className="bg-[rgba(42,58,74,0.5)] border border-[rgba(16,185,129,0.2)] rounded p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Gavel size={18} className="text-emerald-400" />
                  <h3 className="text-lg text-[#F0EBE1] font-medium" style={{ fontFamily: 'Newsreader, serif' }}>Relevant Law & Precedents</h3>
                </div>
                <ul className="space-y-2">
                  {FILING_GUIDES[slug].relevantLaw.map((law, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#C9B99A]/80">
                      <span className="text-emerald-400 shrink-0">§</span>
                      <span>{law}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="flex items-start gap-3 p-4 bg-[rgba(255,149,0,0.05)] rounded border border-[rgba(255,149,0,0.1)]">
                <AlertTriangle size={18} className="text-[#FF9500] shrink-0 mt-0.5" />
                <p className="text-xs text-[#C9B99A]/60 leading-relaxed">
                  <strong className="text-[#FF9500]">Educational Information Only:</strong> This filing guide is provided for educational purposes to help you understand legal procedures. AASOTU Media Group LLC is not a law firm and does not provide legal advice. Laws vary by jurisdiction and change over time. Always verify current law in your jurisdiction and consult a licensed attorney for advice specific to your case.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
