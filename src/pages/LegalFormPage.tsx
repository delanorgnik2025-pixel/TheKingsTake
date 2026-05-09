import { trpc } from "@/providers/trpc";
import { Link, useParams } from "react-router";
import { ArrowLeft, Download, AlertTriangle, FileText } from "lucide-react";
import { useMemo } from "react";

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
            {form.fileUrl ? "Download PDF" : form.content ? "Copy Document" : "Download Coming Soon"}
          </button>

          {form.fileSize && (
            <span className="ml-4 text-xs text-dimmed">{form.fileSize}</span>
          )}

          {form.downloadCount ? (
            <p className="text-xs text-dimmed mt-3">Downloaded {form.downloadCount} times</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
