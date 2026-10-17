import type { CaseCourse, CaseLesson } from "../../contracts/case2court";
type AuthoredLesson = CaseLesson & { answer: number; explanation: string };
export const CASE_VERSION = "2026-10-15.1";
const sources = {
  iqbal: {
    label: "Ashcroft v. Iqbal, 556 U.S. 662 (2009)",
    url: "https://www.govinfo.gov/app/details/USREPORTS-556/USREPORTS-556-662",
  },
  harlow: {
    label: "Harlow v. Fitzgerald, 457 U.S. 800 (1982)",
    url: "https://www.govinfo.gov/app/details/USREPORTS-457/USREPORTS-457-800",
  },
  rights: {
    label: "42 U.S.C. §1983: statutory text",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2024-title42/html/USCODE-2024-title42-chap21-subchapI-sec1983.htm",
  },
  rules: {
    label: "Current Federal Rules of Civil Procedure (official PDF)",
    url: "https://www.uscourts.gov/sites/default/files/document/federal-rules-of-civil-procedure.pdf",
  },
  complaint: {
    label: "Official non-prisoner civil-rights complaint form",
    url: "https://www.uscourts.gov/forms-rules/forms/complaint-violation-civil-rights-non-prisoner",
  },
  courts: {
    label: "Find the correct federal court and its local instructions",
    url: "https://www.uscourts.gov/federal-court-finder/find",
  },
  nj: {
    label: "District of New Jersey: self-represented litigants",
    url: "https://www.njd.uscourts.gov/filing-without-attorney",
  },
  jurisdiction: {
    label: "28 U.S.C. §1331: federal-question jurisdiction",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2024-title28/html/USCODE-2024-title28-partIV-chap85-sec1331.htm",
  },
  venue: {
    label: "28 U.S.C. §1391: venue generally",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2024-title28/html/USCODE-2024-title28-partIV-chap87-sec1391.htm",
  },
  heck: {
    label: "Heck v. Humphrey, 512 U.S. 477 (1994)",
    url: "https://www.govinfo.gov/app/details/USREPORTS-512/USREPORTS-512-477",
  },
  monell: {
    label: "Monell v. Department of Social Services, 436 U.S. 658 (1978)",
    url: "https://www.govinfo.gov/app/details/USREPORTS-436/USREPORTS-436-658",
  },
  ifp: {
    label: "28 U.S.C. §1915: IFP and screening",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2024-title28/html/USCODE-2024-title28-partV-chap123-sec1915.htm",
  },
  fee: {
    label: "28 U.S.C. §1914: statutory fee",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2024-title28/html/USCODE-2024-title28-partV-chap123-sec1914.htm",
  },
  adminfee: {
    label: "District-court miscellaneous fee schedule",
    url: "https://www.uscourts.gov/court-programs/fees/district-court-miscellaneous-fee-schedule",
  },
  js44: {
    label: "Official JS 44 civil cover sheet",
    url: "https://www.uscourts.gov/forms-rules/forms/civil-cover-sheet",
  },
  ifpforms: {
    label: "AO 239 long-form IFP application",
    url: "https://www.uscourts.gov/forms-rules/forms/application-proceed-district-court-without-prepaying-fees-or-costs-long-form",
  },
  representation: {
    label: "Federal court: limits of representing yourself",
    url: "https://www.rid.uscourts.gov/representing-yourself",
  },
  pacer: {
    label: "PACER: account types and registration",
    url: "https://pacer.uscourts.gov/register-account",
  },
  efile: {
    label: "PACER: non-attorney CM/ECF registration and court approval",
    url: "https://pacer.uscourts.gov/register-account/non-attorney-filers-cmecf",
  },
  pricing: {
    label: "PACER: current pricing, exceptions and free access",
    url: "https://pacer.uscourts.gov/pacer-pricing-how-fees-work",
  },
};
export const CASE_EXHIBITS = [
  {
    id: "A",
    title: "Jordan’s first account · fictional",
    text: "Jordan Avery, an adult passenger, writes that a local officer stopped the driver at 18:10 on May 6 in fictional Harbor County. At about 18:18 Jordan showed identification bearing a different date of birth from the warrant the officer mentioned. Jordan recalls saying “that is not me.” Jordan does not know what dispatch said. Jordan was arrested and released the next afternoon. This is Jordan’s account, not an adjudicated finding.",
  },
  {
    id: "B",
    title: "Officer report extract · fictional",
    text: "Officer Vale’s report records a warrant for Jordan Ellis, birth year 1990, and an arrest at 18:27. The report lists the passenger as Jordan Avery, birth year 1993. It says identification was checked but does not explain the different surname and year. The extract does not include the warrant, dispatch audio or complete report. A discrepancy is a research question; this exhibit alone does not establish intent or absence of probable cause.",
  },
  {
    id: "C",
    title: "Video index · fictional",
    text: "A lawfully obtained 40-second clip is indexed as Clip 01, received May 9. It appears to show an identification card being offered. The display time differs from Jordan’s recollection by two minutes. Audio is incomplete. The full recording and information about the device clock are not available. The original file remains unchanged; a separate viewing copy has a written index.",
  },
  {
    id: "D",
    title: "Witness note · fictional",
    text: "Witness Lee says Jordan offered a card and remembers the words “different birthday.” Lee did not see the warrant screen and is unsure whether the officer heard the statement. Lee’s signed note is dated May 11. Lee’s private contact details are intentionally omitted. The note is a statement to evaluate, not a substitute for admissibility, authentication or testimony requirements.",
  },
  {
    id: "E",
    title: "Criminal docket note · fictional",
    text: "The fictional state docket records that a charge was dismissed on June 2. The entry does not state that an officer planted evidence, lied or violated a constitutional right. No conviction is shown in the training materials. Other criminal proceedings, if any, are unknown. A dismissal entry cannot answer every probable-cause, accrual or immunity question.",
  },
  {
    id: "F",
    title: "Records-request acknowledgment · fictional",
    text: "The fictional municipal records office acknowledges a request for an incident report and camera records. No responsive records have yet been produced. The acknowledgment does not promise disclosure, establish preservation, suspend a filing deadline or prove what footage exists. Local exemptions, retention rules and request procedures must be researched separately.",
  },
  {
    id: "G",
    title: "Federal docket simulator · fictional",
    text: "Training case 1:26-cv-00001, Avery v. Vale. Entry 1, October 1: complaint received. Entry 2, October 1: IFP application received. Entry 3, October 3: order directs plaintiff to supply a missing signature by the date specified in the attached order. Entry 4, October 6: signed replacement received. No order granting IFP, issued summons or proof of service appears in this training extract. The case number is invented and must not be searched as a real case.",
  },
  {
    id: "H",
    title: "Practice injury and expense log · fictional",
    text: "Jordan records one missed shift, an uncertain transport expense and anxiety after release. Supporting documents have not been supplied. A worksheet should distinguish documented amount, estimate and missing support. No damages value has been assigned. The exercise does not establish a medical diagnosis, legal causation, recoverable damages or an entitlement to a particular award.",
  },
];
const L = (v: AuthoredLesson) => v;
export const CASE_LESSONS: AuthoredLesson[] = [
  L({
    chapter: "1 · Map the claim",
    title: "Start in the case room",
    goal: "Separate a learning plan from a decision to sue.",
    reading: [
      "Case2Court is a nondegree legal-literacy course by Ronald Lee King and AASOTU Media Group LLC. Ronald shares firsthand filing experience as a nonlawyer. This course does not assess your dispute, choose claims for you, represent you, file documents or promise a result. It is not law-school credit, CLE credit or permission to advise other people. Use invented facts in every exercise; keep your real case records and credentials off this website.",
      "Your practice file contains accounts, extracts and gaps. Those categories matter. An account is what a person says; a document is a source with a date and origin; an inference is a conclusion drawn from something else. A court decides disputed legal issues through its process. Your task here is to produce an organized, truthful practice packet and recognize the questions that need a lawyer or current court instructions.",
      "Work through the lessons in order. Checkpoint submissions are recorded to your member account, including mistakes. A correct retry opens the next lesson but does not erase the earlier answer. Workbook exercises are self-reviewed using fictional model notes; no instructor has evaluated your real facts. Passing the final knowledge check records course learning only.",
    ],
    worked:
      "Open Exhibit A and write “Jordan recalls” before its time estimates. Open Exhibit B and write “the report extract records” before its arrest time. The two sources can disagree without either becoming an established finding. A sound first step is a discrepancy list, not a conclusion that a named person is liable.",
    task: "Create four headings on paper: source, stated fact, uncertainty, next research step. Put one item from A and one from B under each appropriate heading.",
    model:
      "A: Jordan recalls presenting ID at about 18:18. B: report lists arrest at 18:27. Unknown: full dispatch information. Next research: current lawful method to seek the complete record. No conclusion about a real claim is made.",
    sources: ["representation", "complaint"],
    checkpoint: {
      prompt:
        "The practice exhibits contain a conflict. What is the best first response?",
      options: [
        "Declare that the officer committed a constitutional violation.",
        "Record both sources and mark the conflict for investigation.",
        "Delete the source that weakens Jordan’s account.",
        "Treat course completion as a legal opinion.",
      ],
    },
    answer: 1,
    explanation:
      "A source comparison preserves uncertainty. Conflicts require investigation and legal analysis; they are not resolved by selecting a preferred story.",
  }),
  L({
    chapter: "1 · Map the claim",
    title: "What Section 1983 does—and does not do",
    goal: "Identify the statute’s basic questions without turning every wrong into a federal claim.",
    reading: [
      "Section 1983 supplies a civil remedy for a deprivation of rights secured by the Constitution or federal law by a person acting under color of state law. It is not itself a complete list of constitutional rights. Start by distinguishing the source of the asserted right from the statute used to seek relief. An arrest-related allegation may raise a Fourth Amendment question, but facts, legal standards and defenses still determine whether a claim can proceed.",
      "A disappointing result, a rude official, an erroneous record and a constitutional deprivation are different concepts. A private person is not automatically a state actor. Federal officers are not automatically sued under the same Section 1983 path as state or local officers; other routes have distinct restrictions. Do not transplant a course example into a different legal setting simply because both involve government.",
      "Build an issue map: who acted, what they did, when, under what claimed authority, which federal right might be implicated, what source supports the facts, and what remains unknown. Remedies also differ. A demand for money, a request to stop ongoing conduct and an attempt to challenge a conviction raise different questions. This map is a research tool, not an eligibility test for a lawsuit.",
    ],
    worked:
      "In the fictional file, Vale is described as a local officer acting during an arrest, which raises a state-action question suitable for study. The unanswered identity and warrant questions remain important. Exhibit E’s dismissal does not by itself establish an unreasonable seizure or defeat a defense.",
    task: "Write one sentence identifying the possible rights question and a second sentence listing two facts you would need before assessing it.",
    model:
      "Possible study question: whether the seizure was constitutionally unreasonable in light of the information available. Unknowns include the actual warrant and what Vale learned from dispatch. The model does not decide the claim.",
    sources: ["rights", "complaint"],
    checkpoint: {
      prompt: "Which statement about Section 1983 is most accurate?",
      options: [
        "Every wrongful or unfair event creates a claim.",
        "It automatically applies to every federal officer.",
        "It is a remedy tied to a federal-rights deprivation under color of state law.",
        "A dismissed charge automatically proves liability.",
      ],
    },
    answer: 2,
    explanation:
      "The statute requires more than unfairness or dismissal. The federal right, state action, facts and applicable defenses must be analyzed.",
  }),
  L({
    chapter: "2 · Build the record",
    title: "Build a timeline that can survive questions",
    goal: "Separate time, source and inference in a usable chronology.",
    reading: [
      "A timeline is a structured account, not an argument. Give each event its own row: date or time, event, actor, source reference, certainty level and unresolved conflict. Use “approximately” when that is what the source supports. Keep the original wording of a source separate from your summary so another reader can check the summary against it.",
      "Do not collapse several actors into “they.” One person may stop a vehicle, another may check a warrant and a third may book someone. A timeline should reveal those distinctions rather than assume them. If you do not know who did something, write that it is unknown. Later information can be added with its source; do not silently rewrite an earlier recollection to make it agree.",
      "A chronology can expose both supporting and unfavorable information. Keeping both is part of a reliable record. Preserve different clock readings and note that cameras, dispatch systems and memories may use different times. An unexplained difference is a question to resolve, not proof that someone fabricated a record. In litigation, a document’s authenticity and admissibility remain separate issues.",
    ],
    worked:
      "A says the stop began around 18:10 and identification was offered around 18:18. B states an arrest at 18:27. C has a clock two minutes different from Jordan’s memory. The correct table keeps all three references and marks the clock discrepancy. It does not choose a single precise ID-presentation time that no reliable source establishes.",
    task: "Draft five timeline rows from A–E. Include source IDs and at least two explicit uncertainties.",
    model:
      "Rows should distinguish stop, ID presentation, arrest, release and dismissal. A recall time is approximate; B is an extract; C’s clock is uncertain; E records a disposition rather than an officer’s intent.",
    sources: ["rules", "complaint"],
    checkpoint: {
      prompt:
        "A video clock and a recollection differ. How should the timeline handle that?",
      options: [
        "Keep both readings and identify the clock/source uncertainty.",
        "Change the video timestamp in the original file.",
        "Use whichever time helps the claim.",
        "Omit the disagreement from the record.",
      ],
    },
    answer: 0,
    explanation:
      "A reliable chronology preserves conflicting source information and identifies what remains uncertain.",
  }),
  L({
    chapter: "2 · Build the record",
    title: "Preserve sources, witnesses and missing records",
    goal: "Create an evidence index without altering originals or promising access to every record.",
    reading: [
      "An evidence index identifies each item, its source, when and how it was received, where the original is kept, a short description and any limits. Keep original files unchanged and use separate copies for annotation. Record edits made to a working copy. Backups and clear file names can help preserve a record, but this course cannot authenticate evidence or establish a legal chain of custody.",
      "Witness information should separate a person’s own observations from what someone else told them. Avoid coaching a witness to adopt your version. Note uncertainty and the date of a statement. Protect private contact information. A signed note does not automatically become admissible trial evidence; evidentiary rules, personal knowledge, authentication and available testimony can matter.",
      "Public-records requests are not the same thing as civil discovery or a court order. Federal FOIA does not govern every local police record; state and local systems have their own rules, exemptions and appeal procedures. An acknowledgment is not production, a preservation promise or a pause on a lawsuit deadline. Research retention and lawful preservation options promptly with qualified help where needed.",
    ],
    worked:
      "Exhibit F proves only that the training office acknowledged a request. Put “not yet received” beside the full video, warrant and dispatch audio. Exhibit C belongs in the index as a partial clip with incomplete audio; do not describe it as the entire encounter.",
    task: "Create an eight-item source index using A–H. Mark originals, extracts, personal accounts and missing items. Draft a list of records questions without sending a request.",
    model:
      "A is a personal account; B is an extract; C is partial media; D is a witness note; E is a docket note; F is an acknowledgment. The full warrant, report and video remain missing. No acknowledgment suspends a deadline.",
    sources: ["rules", "courts"],
    checkpoint: {
      prompt: "What does Exhibit F establish?",
      options: [
        "The entire video has been preserved indefinitely.",
        "Every requested document must be disclosed.",
        "All filing deadlines have stopped.",
        "A request was acknowledged, while production and other questions remain unresolved.",
      ],
    },
    answer: 3,
    explanation:
      "An acknowledgment does not establish production, preservation or deadline relief.",
  }),
  L({
    chapter: "3 · Choose the procedural path",
    title: "Jurisdiction and venue are different questions",
    goal: "Locate the governing court sources instead of choosing a forum by convenience.",
    reading: [
      "Subject-matter jurisdiction asks whether the court has power to hear the type of dispute. Federal-question jurisdiction under 28 U.S.C. §1331 concerns civil actions arising under federal law. A complaint must state a genuine basis for jurisdiction; typing “federal question” on JS 44 does not supply it. Federal courts are courts of limited jurisdiction, and jurisdiction must be distinguished from whether a claim succeeds.",
      "Venue asks which geographic district is a proper location under the applicable law. Section 1391 includes rules involving defendants’ residence and where a substantial part of the events or omissions occurred, with qualifications. Your current home is not a universal venue rule. Personal jurisdiction over defendants is another separate issue. This lesson teaches the distinctions; it does not select a court for your dispute.",
      "Use the official court finder, then the chosen district’s current self-represented filing instructions, local rules and division information. New Jersey’s state courts are not the same system as the United States District Court for the District of New Jersey. State agency complaints, criminal cases, appeals and federal civil-rights actions also have different paths. Research the particular route before preparing forms.",
    ],
    worked:
      "Harbor County is invented, so the course cannot assign Jordan to a real district. A proper practice answer identifies the information needed: actual location of material events, defendants’ relevant locations, asserted federal basis and the district’s rules. It does not select New Jersey merely because the learner lives there.",
    task: "Complete the forum-research worksheet with source URLs and the facts that would be needed. Keep the fictional court field marked “training only.”",
    model:
      "The worksheet separates subject matter, venue and personal jurisdiction. It contains a link to the official court finder and questions to resolve, not a final venue determination.",
    sources: ["jurisdiction", "venue", "courts", "nj"],
    checkpoint: {
      prompt:
        "A learner lives in New Jersey. Is that fact alone enough to choose a federal district for every dispute?",
      options: [
        "Yes, a plaintiff can always file where they currently live.",
        "No; jurisdiction, venue and other requirements must be researched separately.",
        "Yes, if JS 44 says federal question.",
        "Only the court’s website color matters.",
      ],
    },
    answer: 1,
    explanation:
      "Residence alone is not a universal forum rule, and a cover sheet does not create jurisdiction.",
  }),
  L({
    chapter: "3 · Choose the procedural path",
    title: "Deadlines, custody and urgency",
    goal: "Recognize questions that cannot safely wait for course completion.",
    reading: [
      "Do not treat a course schedule as a legal deadline. Civil-rights timing can involve a borrowed state limitations period, federal accrual rules, tolling questions and claim-specific circumstances. The date of dismissal is not automatically the start date for every constitutional claim. Different claims arising from one incident may require different timing analysis. This course does not calculate your deadline.",
      "Separate at least four categories in a deadline ledger: a possible limitations deadline, a date in a court order, a rule-based response or service period, and a records-retention concern. For each, record its source and the question that needs verification. A records request, waitlist signup, PACER registration or consultation request is not automatically an extension. Seek qualified help promptly when time may matter.",
      "Our main example is an adult who is no longer detained and has no conviction shown in the supplied file. Prisoner cases, exhaustion requirements, ongoing prosecutions, efforts to obtain release and challenges to convictions can follow materially different rules. An imprisoned learner should not assume that a non-prisoner complaint lesson resolves those issues. Identify the special posture before using an ordinary filing checklist.",
    ],
    worked:
      "Exhibit E gives a dismissal date. It does not give a universal limitations deadline. Exhibit G mentions a signature order, whose attached text must be read for the actual instruction and date. Those are two different ledger entries. Neither can be answered by a generic countdown in this course.",
    task: "Create a deadline ledger with four categories. Enter E and G as separate issues and write the source or assistance needed to verify each.",
    model:
      "The model flags claim-specific accrual analysis and the actual signed order. It does not manufacture a filing deadline from the dismissal entry or assume a records request stopped time.",
    sources: ["heck", "ifp", "rules", "courts"],
    checkpoint: {
      prompt:
        "A records request is pending while a possible filing deadline approaches. What should the learner understand?",
      options: [
        "The request automatically tolls every deadline.",
        "They must finish this course before asking for help.",
        "The request does not automatically extend a deadline; timing needs prompt, qualified analysis.",
        "A PACER account restarts the limitations period.",
      ],
    },
    answer: 2,
    explanation:
      "Administrative or learning activity does not automatically preserve a legal claim or extend a deadline.",
  }),
  L({
    chapter: "3 · Choose the procedural path",
    title: "Defendants, capacities and municipal liability",
    goal: "Connect a proposed defendant to an alleged act and a legally relevant theory.",
    reading: [
      "A caption is not a substitute for allegations. For each proposed defendant, a complaint needs facts explaining that person’s relevant conduct and connection to the claimed deprivation. “Everyone at the department” obscures rather than explains responsibility. A supervisor is not automatically liable merely because of rank. Unknown identities and naming conventions require attention to local procedure and the governing law.",
      "Individual-capacity and official-capacity claims raise different questions about the target of relief and defenses. Do not select a capacity solely because it sounds stronger. States, state agencies, local governments and local officers are not interchangeable. Whether an organization can be sued, and under what theory, requires legal research. This course does not decide a defendant’s legal status for you.",
      "Monell explains why local-government liability under Section 1983 is not automatic liability for every employee’s action. A relevant policy or custom and the required connection to the alleged injury are important issues. Adding the city’s name to a caption does not supply those facts. An actor–action–source chart should identify missing support as readily as supporting information.",
    ],
    worked:
      "A–C describe Vale’s alleged role but do not establish who set a municipal policy. The practice chart can name Vale as an actor described in the supplied account while marking municipal-policy evidence “not supplied.” It cannot truthfully invent a citywide policy to fill the gap.",
    task: "Make three rows: Vale, an unidentified dispatch actor and the fictional municipality. List the alleged action, supporting source and missing legal/factual questions for each.",
    model:
      "Vale: alleged arrest, A/B, unanswered information and defenses. Dispatch: identity/actions unknown. Municipality: policy/custom facts not supplied. The model is an issue chart, not advice to name these parties.",
    sources: ["rights", "monell", "complaint"],
    checkpoint: {
      prompt:
        "Does the supplied record automatically support adding the municipality because Vale is described as its officer?",
      options: [
        "No; municipal liability requires a legally supported theory and relevant facts beyond employment alone.",
        "Yes; every employer is automatically liable under Section 1983.",
        "Yes; a city’s name in the caption is enough.",
        "Only if the course gives a completion badge.",
      ],
    },
    answer: 0,
    explanation:
      "Employment alone does not supply a Monell theory. The chart must preserve the absence of supporting policy/custom facts.",
  }),
  L({
    chapter: "3 · Choose the procedural path",
    title: "Defenses and paths that need special care",
    goal: "Recognize major barriers without treating a checklist as legal clearance.",
    reading: [
      "Qualified immunity, sovereign immunity and other defenses can affect claims and remedies. Naming a constitutional right does not dispose of those defenses. Their application can depend on the defendant, capacity, alleged facts, timing and governing precedent. A meaningful course must identify those complications rather than promise that one complaint template defeats them. For individual-capacity damages claims against officials, qualified-immunity analysis commonly asks whether the alleged facts show a constitutional violation and whether the right was clearly established in the relevant circumstances. A broad slogan about rights is not the same as that context-specific inquiry. Immunity and failure to prove a constitutional violation are distinct reasons a claim may fail. Research current controlling authority; this course does not decide either question for Jordan.",
      "Heck v. Humphrey addresses certain damages claims that would necessarily imply the invalidity of an existing conviction or sentence unless the required invalidation has occurred. It does not make every person who was arrested ineligible, and a dismissal is not a universal solution to every issue. Ongoing state criminal proceedings can raise additional federal-court restrictions; challenges seeking release can involve habeas procedures rather than this ordinary civil course.",
      "A proposed class action has another boundary. A self-represented person cannot represent a class. Rule 23 contains certification requirements; filing a document labeled “class action” is not certification. Ronald’s firsthand experience filing a proposed action is presented as experience, not a certified-class victory or authority to represent learners. Seek a qualified attorney for class representation and individualized analysis.",
    ],
    worked:
      "Exhibit E does not show a conviction, but it is only an extract of the training record. A competent practice answer notes the supplied posture and asks whether other proceedings exist. It does not declare all defenses defeated. Nothing in A–H establishes Rule 23 certification or an attorney’s appearance for a class.",
    task: "Write a referral checklist covering conviction/custody, ongoing cases, defendant type/capacity, immunity and a proposed class. Mark what the exhibits do and do not establish.",
    model:
      "The checklist should identify special legal questions, not grade a real claim as valid. A proposed class requires counsel; course completion does not change representation rules.",
    sources: ["heck", "harlow", "rules", "representation", "rights"],
    checkpoint: {
      prompt: "What does filing a proposed class-action complaint establish?",
      options: [
        "Automatic certification of the class.",
        "Permission for a nonlawyer to represent all plaintiffs.",
        "A guaranteed court-appointed lawyer.",
        "Only that a proposed filing was made; certification and representation requirements remain separate.",
      ],
    },
    answer: 3,
    explanation:
      "A filing label does not certify a class or authorize a self-represented person to represent others.",
  }),
  L({
    chapter: "4 · Assemble the practice packet",
    title: "Read the architecture of a complaint",
    goal: "Explain the purpose of each core section before drafting.",
    reading: [
      "Rule 8 generally calls for a short and plain statement of jurisdiction, a statement showing entitlement to relief, and a demand for relief. Rule 10 addresses form, including a caption and numbered paragraphs; separate counts can promote clarity. “Short and plain” is not permission to omit the facts necessary to state a claim. Use the official civil-rights complaint form and local directions as starting references, not as a guarantee of sufficiency.",
      "Separate the building blocks: the caption identifies the case and parties; jurisdiction explains the asserted basis for federal power; facts describe relevant events; claims connect an asserted right and a defendant’s conduct; relief states what is requested; signature and other required portions take responsibility for the submission. Avoid stuffing the entire narrative into the cover sheet or substituting an exhibit pile for readable allegations.",
      "Legal research should verify authority, quotations and the fit between a rule and the issue. A real citation to an unrelated case can still mislead. Do not invent cases, judge quotations or docket numbers, and do not rely on AI-generated citations without checking the originals. The course’s fictional training case number must never be presented as an actual precedent or filing.",
    ],
    worked:
      "A useful outline for Jordan contains placeholders for the proper district, parties and jurisdiction, numbered factual paragraphs sourced to the training record, a separately researched claim theory, a relief section and signature. The outline must leave legal choices unresolved where the file does not support them. Iqbal explains the distinction between factual allegations and legal conclusions and the requirement of a plausible claim. Plausibility is not a requirement to prove the whole case in the complaint, but an unsupported label does not become a sufficient factual allegation simply by appearing in a numbered paragraph. Compare the original authority with the facts alleged rather than treating a word such as conspiracy as proof of an agreement.",
    task: "Draw a complaint outline using headings only. Beside each heading, identify the official rule or form that explains its purpose.",
    model:
      "Expected headings include caption, jurisdiction, parties, facts, claims, requested relief and signature. The model is a learning outline; it does not approve a finished pleading or choose relief for a learner.",
    sources: ["rules", "iqbal", "complaint", "jurisdiction"],
    checkpoint: {
      prompt:
        "Which description best captures the relationship between complaint and exhibits?",
      options: [
        "The complaint can always be replaced by a stack of screenshots.",
        "A readable pleading must state the required allegations; exhibits do not automatically supply a sufficient claim.",
        "JS 44 replaces both.",
        "A long complaint is always legally stronger.",
      ],
    },
    answer: 1,
    explanation:
      "The pleading must perform its own job under the rules. Length and attachments do not guarantee sufficiency.",
  }),
  L({
    chapter: "4 · Assemble the practice packet",
    title: "Draft precise facts and test the support",
    goal: "Replace labels with specific, supportable statements.",
    reading: [
      "Work one event at a time. Identify the actor, act, approximate time, relevant context and the source supporting the statement. Distinguish firsthand knowledge, a quoted record and an inference. Pleading standards require more than conclusory labels; clarity comes from relevant factual allegations rather than adjectives such as “obviously unconstitutional.” Do not assert that a person knew something if your only source shows that a document existed somewhere else.",
      "Rule 11 imposes responsibilities when presenting papers to a court, including reasonable inquiry, proper purpose and support for factual and legal contentions. Some specifically identified factual contentions may be expected to gain support after a reasonable opportunity for investigation or discovery; that is not permission to fabricate facts or use discovery as a substitute for all prefiling inquiry. Review the actual rule and local obligations.",
      "An exhibit index should make attachments understandable: label, date, short description and paragraph references. Consider privacy, relevance and the court’s requirements before attaching anything. This course uses mock exhibits; it does not determine what you should file, whether a document is privileged or whether publication creates another legal risk. Preserve unfavorable material rather than destroying it.",
    ],
    worked:
      "Weak: “Everyone maliciously violated all my rights.” More precise training statement: “Jordan states that at approximately 18:18 a card bearing the surname Avery and birth year 1993 was offered to Vale; report extract B identifies a warrant for Ellis, birth year 1990.” That statement still does not establish what Vale saw, knew or reasonably concluded.",
    task: "Rewrite two vague statements using A–D. Add a source reference and identify the inference you deliberately did not state as fact.",
    model:
      "The revision should identify a particular act and source, use approximate time where warranted, and preserve the missing dispatch/warrant information. It should not invent knowledge, intent, policy or damages.",
    sources: ["rules", "complaint"],
    checkpoint: {
      prompt:
        "The learner has not seen dispatch audio. Which draft is most reliable?",
      options: [
        "Dispatch definitely admitted there was no warrant.",
        "The officer unquestionably heard every word in the incomplete clip.",
        "The dispatch information is not supplied; the draft should not invent its contents.",
        "Delete the report to avoid the question.",
      ],
    },
    answer: 2,
    explanation:
      "Pleading preparation must distinguish missing information from supported facts. Reasonable inquiry does not allow fabricated details.",
  }),
  L({
    chapter: "4 · Assemble the practice packet",
    title: "Fees, IFP, cover sheets and privacy",
    goal: "Assemble the administrative packet without confusing separate documents.",
    reading: [
      "Learn2File covers JS 44 and the long and short IFP applications in detail. This course uses them in a full packet. JS 44 is administrative classification, the complaint states allegations, and an IFP application asks for permission to proceed without prepaying fees. Use the version and any additional documents required by the actual district. The long and short applications are not automatically a mandatory pair.",
      "As checked October 15, 2026, the ordinary district-court civil filing fee is generally $405: the $350 statutory fee plus a $55 administrative fee. Granted IFP status affects prepayment and the administrative fee; prisoner payment and screening rules differ. An IFP application is not automatically granted, does not establish a meritorious claim, and does not necessarily waive every cost or PACER charge. Always check the current court schedule and order.",
      "Rule 5.2 generally limits personal identifiers in public filings: use the last four digits of a Social Security or taxpayer-identification number and financial account number, birth year rather than complete birth date, and initials for a minor, subject to applicable exceptions and court orders. Read the rule and local instructions. Do not assume that adding “confidential” seals a document; financial applications can have particular handling instructions. This site does not accept your financial forms.",
    ],
    worked:
      "Exhibit B intentionally uses birth years. If a real source contained a full birth date, it would require a privacy review before public filing. For the practice packet, list complaint, required cover/local forms and payment or IFP request separately. Do not label Jordan “IFP approved” merely because G shows an application received.",
    task: "Build a packet inventory and a redaction checklist. Use invented identifiers only, and cross-reference the free Learn2File lessons if a cover-sheet or IFP item is unclear.",
    model:
      "The inventory separates documents and marks local checks. The privacy list identifies public-filing identifiers and the need for proper court procedures; it does not upload or publish a learner’s finances.",
    sources: ["js44", "fee", "adminfee", "ifp", "ifpforms", "rules"],
    checkpoint: {
      prompt:
        "Exhibit G shows an IFP application received. What does that mean?",
      options: [
        "The application was received; approval and any service directions require the actual court order.",
        "Every cost, including PACER, is permanently waived.",
        "The court has ruled the constitutional claim valid.",
        "The defendants have already been served.",
      ],
    },
    answer: 0,
    explanation:
      "Receipt of an application is distinct from a grant, merits ruling, fee exemption or service.",
  }),
  L({
    chapter: "5 · Reach the filing stage",
    title: "The filing-readiness conference",
    goal: "Produce a researched checklist rather than treating the course as filing approval.",
    reading: [
      "Before submitting a real action, the filer must resolve procedural and substantive questions appropriate to the actual matter. A learning checklist can organize that inquiry: proper court, researched jurisdiction and venue, timely claim analysis, appropriate defendants, factual/legal support, required forms, signature, privacy, payment or IFP, submission method, copies and a plan to receive notices. A checked box based only on hope is not verification.",
      "Create a “ready / unresolved / needs qualified help” ledger. Record a source beside each resolved item, and describe the exact remaining question beside an unresolved one. The course can show how to organize this ledger, but cannot declare your case ready, valid or timely. Do not postpone urgent help until every lesson is finished. A missing merits issue can be more significant than a perfectly formatted cover sheet.",
      "Use the court’s current instructions for paper delivery, mail or any approved electronic method. Keep a complete copy and proof of what was submitted and when. An upload to a commercial course, email to a reporter or Facebook message is not a filing with a court. Never send this site your PACER password, private evidence or personal financial application for someone here to file on your behalf.",
    ],
    worked:
      "The fictional practice file has no complete warrant, full video or analyzed deadline. Its ledger must show those gaps. The best capstone can still demonstrate organization while explicitly declining to label the fictional claim legally cleared. A polished file with invented “resolved” marks would be the wrong learning outcome.",
    task: "Complete the readiness worksheet. Identify at least five items that cannot be verified from A–H and explain what source or qualified assistance is needed.",
    model:
      "Possible gaps include actual district, complete source records, claim-specific timing, defendant/capacity analysis, signature compliance and an approved submission method. These gaps are not automatically cured by subscription or a test score.",
    sources: ["courts", "complaint", "rules", "representation"],
    checkpoint: {
      prompt: "What does a completed course-readiness worksheet establish?",
      options: [
        "That the court must accept the claim as valid.",
        "That every limitations problem has been resolved.",
        "That the learner may file for someone else.",
        "That the learner organized the checks; unresolved legal questions still require proper resolution.",
      ],
    },
    answer: 3,
    explanation:
      "The worksheet supports organized preparation, not a legal clearance decision.",
  }),
  L({
    chapter: "5 · Reach the filing stage",
    title: "Filing, service and the first court orders",
    goal: "Read what the docket actually says and separate commencement from service.",
    reading: [
      "Under Rule 3 a federal civil action is commenced by filing a complaint. That does not itself establish jurisdiction, valid service or entitlement to relief. Initial review can produce a case number, fee or IFP processing, deficiency notices, screening where applicable, and orders requiring action. Read each actual notice and order, including attachments, rather than relying only on a short docket description.",
      "Rule 4 governs summons and service of the summons and complaint, with different methods and special rules depending on who is served. Rule 4(m) generally sets a 90-day service period after filing, subject to its scope, exceptions and court-ordered extensions; do not apply a generic number without reading the rule and relevant order. A waiver of service has separate requirements. The plaintiff ordinarily cannot personally act as the process server under Rule 4(c)(2).",
      "For a person authorized to proceed IFP, service by the marshal or a specially appointed person can be directed under the applicable rule and order; it is not safe to assume everything has happened without checking. Later service under Rule 5 and electronic notices are different from initial service. Receipt of a PACER account, a clerk’s case number or a Notice of Electronic Filing does not automatically prove initial service on defendants.",
    ],
    worked:
      "G has a complaint entry, an IFP application and a signature order. It has no grant of IFP, issued summons or service return. The next learning action is to read the attached order and track what it directs. The training record does not support telling Jordan that Vale has been served.",
    task: "Annotate each entry in G as a filing, application, order or response. Create separate columns for “summons issued,” “service completed” and “proof checked.”",
    model:
      "Entry 1 is a complaint filing; 2 is an application; 3 is an order; 4 is a response document. All service columns remain “not shown in extract.” A case number does not fill those columns.",
    sources: ["rules", "ifp", "courts"],
    checkpoint: {
      prompt: "A new docket number appears. Which conclusion is justified?",
      options: [
        "Every defendant was served that day.",
        "A case has been opened or assigned a number; service and other requirements must be checked separately.",
        "IFP was granted.",
        "The judge found liability.",
      ],
    },
    answer: 1,
    explanation:
      "Case opening, IFP decisions, service and merits rulings are separate events.",
  }),
  L({
    chapter: "6 · Learn PACER and the docket",
    title: "PACER accounts and electronic-filing permission",
    goal: "Choose the correct account path and understand what registration does not authorize.",
    reading: [
      "PACER is the federal judiciary’s public-access records system. A person can register before filing a lawsuit; registration is not a step that must always wait until after filing. A case-search-only account is for records access. Non-attorney electronic filing has a separate registration and court-approval process. Not every court accepts every category of non-attorney filer, and the local court decides the available procedure.",
      "For a participating NextGen court, the official non-attorney registration process links PACER registration with a request to the selected court for electronic-filing permission. A submission of that request is not approval. Read the court’s response and any additional steps. CurrentGen procedures can differ. If filing in another court later, additional registration may be necessary. Your permission is not a license to represent other people.",
      "Use only official PACER and court pages for registration. Keep credentials private, use available account-security controls and review billing settings. The course never logs in to PACER for you, stores credentials or searches real records on your behalf. Paper or other submission methods may remain available under the district’s rules, so a learner should not assume an account purchase or approval is the only way to begin a case.",
    ],
    worked:
      "Jordan wants to read the docket and has not received electronic-filing permission. The practice answer distinguishes records access from e-filing approval and points to the court’s instructions. It does not tell Jordan to select “attorney,” invent bar information or use someone else’s credentials.",
    task: "Open the official registration information in a separate tab if desired. On the worksheet, compare search-only, non-attorney e-file request and court approval. Do not register or enter billing information merely to pass this exercise.",
    model:
      "Search-only permits records access subject to account status and fees. An e-file request seeks court permission; only approval and completion of required steps permit the relevant electronic filing. No real account is needed for the simulator.",
    sources: ["pacer", "efile", "courts"],
    checkpoint: {
      prompt:
        "A learner has registered for PACER. Can they automatically e-file in every district?",
      options: [
        "Yes, registration grants nationwide filing permission.",
        "Yes, if they call themselves an attorney.",
        "No; e-filing eligibility and approval are court-specific and separate from records access.",
        "Only if they share their password with the course.",
      ],
    },
    answer: 2,
    explanation:
      "PACER registration and court electronic-filing permission are separate. Non-attorney eligibility varies.",
  }),
  L({
    chapter: "6 · Learn PACER and the docket",
    title: "Read the docket and control records costs",
    goal: "Use the fictional docket and a fee exercise before accessing real records.",
    reading: [
      "A docket is a chronological index of activity. Read the case identifier and court, entry number, date, document description and linked order. A short entry is a pointer, not always the complete instruction. Compare G’s “signature missing” order with its later signed replacement: a response appearing on the docket does not prove the court accepted it as sufficient. Track the actual order, any stated date, your response and a follow-up check.",
      "As checked October 15, 2026, PACER generally charges $0.10 per page, with a $3 cap for an ordinary document; important exceptions include transcripts, name-search results and reports that are not case-specific. Searches can generate charges even when they return no match. Accruing $30 or less in a quarter generally results in waived fees; exceeding $30 can make the quarter’s full accrued amount billable, not merely the excess. Verify current official pricing before use.",
      "Court opinions are free, and eligible notices to parties can provide one free electronic copy under the notice’s conditions. Save permitted copies and read the conditions instead of assuming repeat retrieval is free. A court can grant certain fee exemptions; IFP in a lawsuit does not automatically establish a PACER billing exemption. Narrow searches and date-filtered docket reports can reduce unnecessary retrieval. The simulator makes no chargeable PACER calls.",
    ],
    worked:
      "Practice bill: an ordinary 80-page PDF is generally capped at $3, while a 40-page party-name search can generate $4 because the ordinary-document cap does not apply. If a quarter’s accrued charges are exactly $30, the stated waiver threshold applies; $30.10 is not simply a ten-cent bill. These examples assume the published general rules and no separate exemption.",
    task: "Use G to identify the entry that requires opening an order. Then calculate the sample charges for a 5-page document, an ordinary 80-page document and a 40-page name search.",
    model:
      "Open the actual signature order referenced by entry 3. General sample charges are $0.50, $3 and $4 respectively, before quarterly waiver or exemption analysis. A paid retrieval is not needed to complete the task.",
    sources: ["pricing", "efile", "rules"],
    checkpoint: {
      prompt:
        "Under the published general pricing, how should a 40-page name-search result be treated?",
      options: [
        "It may cost $4; the ordinary-document $3 cap does not apply to that search.",
        "It is always capped at $3.",
        "It is always free if no case is found.",
        "A course subscription pays PACER automatically.",
      ],
    },
    answer: 0,
    explanation:
      "Name-search results are an exception to the ordinary document cap. Quarterly waiver and exemptions are separate questions.",
  }),
  L({
    chapter: "6 · Learn PACER and the docket",
    title: "Complete the Case Blueprint capstone",
    goal: "Demonstrate a documented process and identify what remains unresolved.",
    reading: [
      "Assemble the practice deliverables: a source-based timeline; an evidence and missing-record index; an actor–action–source chart; a forum and deadline research ledger; a complaint outline and two carefully attributed factual paragraphs; a packet/privacy checklist; a filing-versus-service map; and a docket/fee worksheet. Each deliverable must label the scenario fictional. Do not sign, submit or present the practice materials as an actual case.",
      "Use the self-review rubric: Can another reader trace each statement to a source? Are recollections and inferences labeled? Are contradictory and unfavorable items preserved? Are unknown legal choices left as questions? Are filing, service and records access separated? Are privacy and account-security steps included? Have you avoided a made-up deadline, invented policy, false citation and guaranteed damages amount?",
      "The final assessment uses new decisions about this same file. All lessons require recorded checkpoint success before the final opens. A final pass requires all answers correct; retries preserve prior mistakes for review. This strict knowledge threshold is an educational design choice, not a validation of your claim or a guarantee of legal competence. The workbook is self-reviewed; no lawyer or instructor has approved its contents or your own case.",
    ],
    worked:
      "A strong final submission says “full warrant not supplied” rather than inventing it; identifies the signature order without assuming service; distinguishes $3 ordinary-document pricing from uncapped searches; and explains why a proposed class is not a certified class. It includes questions for qualified help where the file is insufficient.",
    task: "Finish all eight workbook sections and compare them with the model notes. Then take the final scenario assessment. Keep any real legal matter separate and seek timely qualified help rather than waiting for a course badge.",
    model:
      "The capstone is successful as an exercise when it is traceable, candid about uncertainty and procedurally organized. The learning record reports checkpoint and test results; it does not approve filing, give a law credential or create representation.",
    sources: ["rules", "representation", "pricing", "complaint"],
    checkpoint: {
      prompt: "What should the capstone deliberately preserve?",
      options: [
        "Only facts that support Jordan.",
        "A claim that the workbook was attorney-approved.",
        "A single deadline invented from the dismissal date.",
        "The missing facts, source conflicts and legal questions that still need resolution.",
      ],
    },
    answer: 3,
    explanation:
      "A premium exercise rewards reliable analysis and visible uncertainty, not a manufactured conclusion that the case is cleared.",
  }),
];
const Q = (
  prompt: string,
  options: string[],
  answer: number,
  explanation: string,
  lesson: number
) => ({ prompt, options, answer, explanation, lesson });
export const CASE_FINAL = [
  Q(
    "Jordan asks whether the charge dismissal proves Vale is liable. What should the learner say?",
    [
      "Yes, dismissal is a liability finding.",
      "No; dismissal and the constitutional claim require separate analysis.",
      "Yes, if the city is named.",
      "Only a course score is needed.",
    ],
    1,
    "Exhibit E records a disposition, not a constitutional merits finding.",
    1
  ),
  Q(
    "Which timeline row best handles the video clock?",
    [
      "Replace the original timestamp.",
      "Hide the discrepancy.",
      "Keep the displayed time, the recollection and a note about the difference.",
      "Declare the witness dishonest.",
    ],
    2,
    "Different source times must remain traceable, with uncertainty identified.",
    2
  ),
  Q(
    "The full warrant is absent. Which exhibit-index entry is sound?",
    [
      "Warrant: not supplied; lawful access and contents remain questions.",
      "Warrant: proves identity mismatch beyond dispute.",
      "Warrant: destroyed, because it was not supplied.",
      "Warrant: unnecessary in every case.",
    ],
    0,
    "Absence from the training file does not establish contents, destruction or legal irrelevance.",
    3
  ),
  Q(
    "The learner moved to New Jersey after the event. What follows?",
    [
      "New Jersey is automatically the proper venue.",
      "Every state court is a federal district court.",
      "A cover sheet decides venue.",
      "The proper court requires separate jurisdiction and venue research.",
    ],
    3,
    "Residence is not a universal venue rule.",
    4
  ),
  Q(
    "Jordan is waiting on records. What happens to a possible limitations deadline?",
    [
      "It always pauses.",
      "No automatic pause is established; get the applicable timing question resolved promptly.",
      "It restarts when the course ends.",
      "PACER will calculate it.",
    ],
    1,
    "Neither a records request nor course participation automatically tolls a claim.",
    5
  ),
  Q(
    "Which proposed municipal-liability paragraph is unsupported by the supplied file?",
    [
      "The file does not supply municipal policy evidence.",
      "Municipal theory requires further research.",
      "The city has a proven unconstitutional policy because Vale works there.",
      "The report identifies Vale as an officer.",
    ],
    2,
    "Employment does not establish the required policy/custom facts.",
    6
  ),
  Q(
    "What is a correct class-action statement?",
    [
      "A self-represented person cannot represent a class; a proposed filing is not certification.",
      "Every signed complaint certifies a class.",
      "A subscriber may represent all other subscribers.",
      "The course grants a class-action license.",
    ],
    0,
    "Representation restrictions and Rule 23 remain separate from course participation.",
    7
  ),
  Q(
    "Which complaint-writing practice is best?",
    [
      "Copy every case citation generated by AI.",
      "Substitute screenshots for all factual allegations.",
      "Use labels rather than specific events.",
      "Verify authority and draft specific, supportable factual allegations.",
    ],
    3,
    "Readable factual pleading and verified authority matter; a citation list is not a substitute.",
    8
  ),
  Q(
    "Which statement about dispatch audio is justified?",
    [
      "It proves Vale heard Jordan.",
      "Its contents are not supplied and should not be invented.",
      "Its absence proves an intentional cover-up.",
      "It is always privileged.",
    ],
    1,
    "A missing source must remain a missing source.",
    9
  ),
  Q(
    "What should a public-filing privacy review consider?",
    [
      "Publishing complete identifiers makes a complaint stronger.",
      "Writing confidential automatically seals the record.",
      "Rule 5.2 and applicable local handling rules, including identifier limits.",
      "A private Facebook post authorizes court disclosure.",
    ],
    2,
    "Privacy rules and proper sealing procedures cannot be replaced with a label.",
    10
  ),
  Q(
    "Which learning result is accurate after completing the readiness checklist?",
    [
      "The checks are organized; unresolved merits, timing or forum issues are not legally approved.",
      "The judge must grant relief.",
      "All defenses have been defeated.",
      "The course will sign and file the complaint.",
    ],
    0,
    "The checklist is a preparation tool, not individualized legal clearance.",
    11
  ),
  Q(
    "G shows an IFP application but no grant or service return. What is established?",
    [
      "IFP granted and service complete.",
      "All costs waived.",
      "Liability established.",
      "Only the listed procedural events; approval and service are not shown.",
    ],
    3,
    "Read the actual docket and orders rather than inferring missing events.",
    12
  ),
  Q(
    "A case-search PACER account is active. What additional question matters for e-filing?",
    [
      "Which false bar number to enter.",
      "Whether that court permits the filer and has approved the required registration.",
      "Whether the learner finished a horoscope.",
      "Whether a friend can share credentials.",
    ],
    1,
    "Records access does not itself confer court filing permission.",
    13
  ),
  Q(
    "Under general PACER pricing, an ordinary 80-page PDF and a 40-page name search would accrue what charges before waivers?",
    ["$8 and $3.", "$3 and $3.", "$3 and $4.", "Both always free."],
    2,
    "The ordinary document cap applies to the PDF, not the name search.",
    14
  ),
  Q(
    "A quarter accrues $30.10 without another exemption. What is the correct general warning?",
    [
      "The entire accrued amount may be billed, not merely ten cents.",
      "Only ten cents can ever be billed.",
      "The course pays it.",
      "Registration prevents billing.",
    ],
    0,
    "The $30 quarterly threshold is a waiver rule, not a $30 credit.",
    14
  ),
  Q(
    "Which final learning-record description is truthful?",
    [
      "Attorney-approved federal case.",
      "Certified civil-rights lawyer.",
      "Court-authorized class representative.",
      "Course knowledge checks completed; workbook self-reviewed; no real claim evaluated.",
    ],
    3,
    "The course measures learning, not professional licensing or the merits of a case.",
    15
  ),
];
export const CASE_WORKBOOK = `CASE2COURT · PRACTICE WORKBOOK · ${CASE_VERSION}\nAASOTU Media Group LLC / #TheKingsTake\nUse fictional Exhibits A–H. Not a court form, legal opinion or attorney review.\n\n1. TIMELINE\nDate/time | event | actor | source | certainty/conflict\nCreate at least five rows. Preserve the two-minute video-clock issue.\n\n2. SOURCE INDEX\nItem | origin/date received | original or extract | limits | missing related record\nIndex A–H. Do not invent the warrant or complete recording.\n\n3. ACTOR–ACTION–SOURCE CHART\nActor | alleged act | source | missing facts | legal research question\nDistinguish the officer, an unknown dispatch actor and a municipality.\n\n4. FORUM AND DEADLINE LEDGER\nQuestion | facts needed | official source | unresolved issue | qualified help needed\nSeparate subject matter, venue, personal jurisdiction, limitations and court orders. Do not invent a real deadline.\n\n5. PRACTICE COMPLAINT OUTLINE\nCaption | jurisdiction | parties | numbered facts | separately researched claim | requested relief | signature/privacy review\nWrite two attributed fact paragraphs and identify an inference not established by the file. Do not file this exercise.\n\n6. PACKET REVIEW\nComplaint | required cover/local forms | payment or required IFP request | signature | privacy | submission method | complete copy/proof\nStatus for each: supported / unresolved / needs qualified help. IFP receipt is not approval.\n\n7. FILING AND SERVICE MAP\nComplaint entry | summons | service method/order | proof | follow-up\nUsing G, mark what is shown and what is absent. Filing is not service.\n\n8. PACER / DOCKET LAB\nFind the signature order in G. Explain why an order must be opened.\nCompare search-only registration, non-attorney e-file request and court approval.\nPractice pricing before quarterly waiver: 5-page ordinary document; 80-page ordinary document; 40-page name search. Explain exactly $30 versus $30.10 in a quarter.\n\nSELF-REVIEW RUBRIC\n[ ] Each factual statement has a source or an uncertainty label.\n[ ] Conflicting and unfavorable information is retained.\n[ ] No invented policy, intent, citation, deadline or damages amount.\n[ ] Jurisdiction, venue, filing, service and PACER are distinguished.\n[ ] Privacy and credential protection are addressed.\n[ ] Unresolved real legal issues are directed to qualified help.\n\nMODEL CHECKS\nTiming differences remain visible. Full warrant/audio/video and municipal policy facts are not supplied. Dismissal alone is not liability. G shows no IFP grant or proof of service. General pricing examples: $0.50, $3, $4; $30 or less generally waived, $30.10 can make full accrued quarter billable. No course result authorizes class representation.\n\nYour workbook remains on your device. The website stores checkpoint/test answers and scores, not your private case documents. This material does not establish that a real claim is valid, timely or ready to file.\n`;
export const CASE_TERMS = [
  "Publisher-provided general legal education for adults using a fictional non-prisoner federal civil-rights scenario. Ronald Lee King is not an attorney. No attorney-client relationship, individualized claim review, representation, filing service, law degree, CLE credit or professional license is provided.",
  "Use current official rules and your actual court’s instructions. Law, fees and local procedures can change. Custody, ongoing criminal cases, convictions, class actions and urgent deadlines require particular care. Do not wait for course completion to seek qualified help.",
  "Access uses your existing owner-verified Facebook subscription and website member code. Facebook handles its subscription price, billing and cancellation under its terms. Website access is subject to verification and renewal. No separate course checkout or guaranteed lifetime access is offered here.",
  "Checkpoint and final-test submissions, results, course version and timestamps are stored with your website member account. Retries preserve prior errors. Workbook work is self-reviewed and stays on your device unless you choose to download or print it. Never upload private evidence, financial forms or PACER credentials.",
  "Completion records demonstrate the course’s knowledge checks only. They are not accreditation, court approval, legal clearance, proof of filing readiness or authorization to represent anyone. A case outcome, financial recovery or legal-services career is not promised.",
];
export function publicCaseCourse(): CaseCourse {
  return {
    version: CASE_VERSION,
    title: "Case2Court: The Civil Rights Case Blueprint",
    scope:
      "Six chapters · 16 guided lessons · case-room exhibits · workbook · recorded checkpoints and final assessment. Publisher-provided nondegree legal literacy; no real legal matter is evaluated.",
    lessons: CASE_LESSONS.map(({ answer: _, explanation: __, ...l }) => l),
    final: CASE_FINAL.map(
      ({ answer: _, explanation: __, lesson: ___, ...q }) => q
    ),
    sources,
    exhibits: CASE_EXHIBITS,
    workbook: CASE_WORKBOOK,
    docket: [
      {
        id: 1,
        date: "October 1 · fictional",
        title: "Complaint received",
        body: "The training clerk has received a complaint. This entry does not establish a valid claim, IFP approval, service or a merits ruling.",
      },
      {
        id: 2,
        date: "October 1 · fictional",
        title: "IFP application received",
        body: "An application is on the training docket. No grant appears. Review the actual court order when one is entered; receipt alone does not waive every cost.",
      },
      {
        id: 3,
        date: "October 3 · fictional",
        title: "Order requiring a signature",
        body: "TRAINING ORDER: Supply the missing signature by the date specified in the fictional exercise instructions. This example supplies no real deadline. IFP remains undecided; no summons or service is shown. A docket description is not a substitute for reading an attached order.",
      },
      {
        id: 4,
        date: "October 6 · fictional",
        title: "Signed replacement received",
        body: "The response is received in this training extract. No later order confirms sufficiency. Track the response and check follow-up orders; do not assume that every issue is resolved.",
      },
    ],
    terms: CASE_TERMS,
  };
}
export function gradeCaseAnswers(
  kind: "checkpoint" | "final",
  lessonIndex: number | null,
  answers: number[]
) {
  const questions =
    kind === "final"
      ? CASE_FINAL
      : [CASE_LESSONS[lessonIndex ?? -1]]
          .filter(Boolean)
          .map(l => ({
            ...l.checkpoint,
            answer: l.answer,
            explanation: l.explanation,
            lesson: lessonIndex!,
          }));
  if (
    questions.length === 0 ||
    questions.length !== answers.length ||
    answers.some(
      (a, i) =>
        !Number.isInteger(a) || a < 0 || a >= questions[i].options.length
    )
  )
    throw new Error("Complete every question with a valid choice.");
  return {
    correctCount: questions.filter((q, i) => q.answer === answers[i]).length,
    totalCount: questions.length,
    feedback: questions.map((q, i) => ({
      prompt: q.prompt,
      chosen: answers[i],
      options: q.options,
      answer: q.answer,
      correct: q.answer === answers[i],
      explanation: q.explanation,
      lesson: q.lesson,
    })),
  };
}
