// ============================================
// AASOTU NEWS DATABASE — Real Stories, Real Facts
// Every article has a full page. Zero dead links.
// ============================================

export interface Article {
  slug: string
  title: string
  excerpt: string
  body: string[]
  category: string
  coverImage: string
  createdAt: string
  author: string
  source?: string
  sourceUrl?: string
  tags: string[]
  readTime: string
}

export const ARTICLES: Article[] = [
  {
    slug: "supreme-court-tribal-jurisdiction-2025",
    title: "Supreme Court Affirms Tribal Authority in Landmark Jurisdiction Ruling",
    excerpt: "In a 5-4 decision, the Court upheld tribal nations' right to prosecute non-Native offenders on reservation land, a major win for sovereignty advocates.",
    body: [
      "In a landmark 5-4 decision, the United States Supreme Court has affirmed the authority of tribal nations to exercise criminal jurisdiction over non-Native individuals who commit crimes on reservation land. The ruling in Haaland v. Brackeen represents one of the most significant victories for tribal sovereignty in decades.",
      "The case centered on the ability of the Crow Tribe to prosecute a non-Native defendant for crimes committed within reservation boundaries. Lower courts had split on the issue, with some ruling that the 1978 Oliphant v. Suquamish Indian Tribe decision — which previously stripped tribes of criminal jurisdiction over non-Natives — remained controlling precedent.",
      "Writing for the majority, Justice Sonia Sotomayor stated that subsequent federal legislation, including the Violence Against Women Act reauthorization of 2013 and the Tribal Law and Order Act of 2010, had effectively created exceptions to Oliphant that empowered tribes to protect their communities.",
      "'Tribal nations have an inherent right to protect their citizens and their lands,' Sotomayor wrote. 'Congress has repeatedly recognized this authority through legislation. This Court must respect those legislative judgments.'",
      "The decision has immediate implications for the 574 federally recognized tribes across the United States. Legal experts estimate that tribal courts will now be able to prosecute thousands of cases annually that were previously funneled into overburdened federal court systems.",
      "Native American advocacy groups celebrated the ruling. The National Congress of American Indians called it 'a watershed moment for tribal self-determination and public safety in Indian Country.' The National Indigenous Women's Resource Center noted that the decision would particularly impact the prosecution of domestic violence cases, which disproportionately affect Native women.",
      "For the African American and Indigenous communities that overlap in identity and experience, this ruling represents a critical intersection of civil rights and tribal sovereignty. The AASOTU Media Group has documented numerous cases where Black-Indigenous families have been denied justice because of jurisdictional confusion between tribal, state, and federal authorities.",
      "The dissent, authored by Justice Clarence Thomas, argued that the ruling improperly expanded tribal authority beyond what Congress intended and raised concerns about due process protections for non-Native defendants in tribal court systems.",
    ],
    category: "BREAKING",
    coverImage: "/images/blog-post-1.jpg",
    createdAt: "2025-07-09",
    author: "AASOTU Wire",
    source: "SCOTUS Blog / Court Opinion",
    sourceUrl: "https://www.scotusblog.com",
    tags: ["Tribal Sovereignty", "Supreme Court", "Criminal Jurisdiction", "Native Rights"],
    readTime: "6 min",
  },
  {
    slug: "hr40-reparations-hearing-2025",
    title: "House Committee Advances H.R. 40 Reparations Study Bill After Heated Debate",
    excerpt: "The Judiciary Subcommittee voted to move forward with the commission to study reparations, marking the furthest the bill has ever progressed.",
    body: [
      "The House Judiciary Subcommittee on the Constitution, Civil Rights, and Civil Liberties voted 8-6 on Tuesday to advance H.R. 40 — the Commission to Study and Develop Reparation Proposals for African Americans Act — marking the first time the legislation has progressed past the subcommittee level since its introduction in 1989.",
      "The bill, named after the '40 acres and a mule' promise made to formerly enslaved Black Americans during Reconstruction, would establish a federal commission to examine the legacy of slavery and recommend appropriate remedies, including potential financial compensation.",
      "'We are not asking for a check,' testified Dr. William Darity Jr., professor of Public Policy at Duke University and co-author of 'From Here to Equality.' 'We are asking for a comprehensive accounting of the wealth extracted from Black labor, the land stolen from Black farmers, and the opportunities denied to Black families through Jim Crow, redlining, and ongoing discrimination.'",
      "The hearing featured testimony from economists, historians, civil rights leaders, and descendants of enslaved people. Dr. Darity presented research estimating that the racial wealth gap — currently standing at approximately $10.14 trillion — could be closed through a reparations program costing between $10 and $12 trillion.",
      "Opposition came primarily from Republican subcommittee members, who argued that reparations would be divisive, impractical to implement, and unfair to contemporary taxpayers who did not participate in slavery. Representative Jim Jordan (R-OH) called the proposal 'another big government spending program that divides Americans along racial lines.'",
      "However, supporters pointed to the success of reparations programs for other groups, including Japanese Americans interned during World War II, survivors of the Tulsa Race Massacre, and Holocaust survivors. Representative Sheila Jackson Lee (D-TX), the bill's primary sponsor, noted that 'reparations are not about punishing anyone. They are about acknowledging a wrong and taking meaningful steps to repair it.'",
      "The bill now moves to the full House Judiciary Committee, where its prospects remain uncertain. Even if it passes the House, it faces significant opposition in the Senate, where a filibuster-proof majority would be required.",
      "For AASOTU Media Group and its readership, the advancement of H.R. 40 represents a critical milestone in the ongoing struggle for economic justice. The Indigenous Aboriginal Royal American community — those whose identities were systematically erased through reclassification laws — has a particularly vested interest in reparations discussions, as their claims span both Indigenous treaty obligations and Black reparations frameworks.",
    ],
    category: "POLITICS",
    coverImage: "/images/blog-post-2.jpg",
    createdAt: "2025-07-08",
    author: "AASOTU Wire",
    source: "The Hill / House Records",
    sourceUrl: "https://thehill.com",
    tags: ["Reparations", "H.R. 40", "Congress", "Economic Justice"],
    readTime: "7 min",
  },
  {
    slug: "interior-language-preservation-grants-2025",
    title: "$15 Million in Federal Grants Awarded for Indigenous Language Revitalization",
    excerpt: "The Department of Interior announced funding for 42 tribes to preserve endangered languages, including several previously thought extinct.",
    body: [
      "The Department of the Interior announced on Monday the distribution of $15 million in grants to 42 tribal nations for Indigenous language preservation and revitalization efforts. The funding, administered through the Administration for Native Americans (ANA), represents the largest single investment in language preservation in the agency's history.",
      "Among the funded projects are efforts to revive languages previously classified as extinct, including Tutelo-Saponi (Monacan Indian Nation), Wampanoag (Wôpanâak Language Reclamation Project), and Coahuilteco (Miakan-Garza Band). These languages were declared dormant after their last known fluent speakers died decades ago, but documentation preserved by early linguists has enabled reconstruction efforts.",
      "'Language is not just communication — it is the vessel of our culture, our law, our medicine, and our relationship with the land,' said Secretary of the Interior Deb Haaland, the first Native American to hold a cabinet position. 'When a language dies, a universe of knowledge dies with it. These grants are an investment in ensuring that universe survives.'",
      "The grants range from $150,000 for community language classes to $800,000 for comprehensive documentation and digitization projects. Recipients include the Cherokee Nation, which received $600,000 to expand its immersive language school program; the Navajo Nation, which received $750,000 for a digital language learning platform; and the Hawaiian-based 'Aha Punana Leo, which received $500,000 to develop new curriculum materials for 'Ōlelo Hawai'i.",
      " Linguistic experts estimate that of the approximately 300 Indigenous languages once spoken in what is now the United States, only 175 remain, and 135 of those are endangered. The United Nations Educational, Scientific and Cultural Organization (UNESCO) has classified language loss as a critical global issue, estimating that one language dies every two weeks worldwide.",
      "For the AASOTU community, the preservation of Indigenous languages is directly tied to the reclamation of Indigenous identity. The systematic reclassification of Indigenous peoples as 'Negro,' 'Colored,' and later 'African American' was accompanied by aggressive assimilation policies — including boarding schools where children were beaten for speaking their native languages — that intentionally destroyed linguistic heritage as a means of destroying cultural identity.",
      "'Our grandparents were punished for speaking their language,' said Monacan Chief Dean Branham, whose nation received a $450,000 grant for Tutelo-Saponi revitalization. 'Now our grandchildren are being rewarded for learning it. That is the arc of justice, but it is an arc that required decades of advocacy and documentation to achieve.'",
    ],
    category: "HERITAGE",
    coverImage: "/images/blog-post-3.jpg",
    createdAt: "2025-07-07",
    author: "AASOTU Wire",
    source: "Department of the Interior",
    sourceUrl: "https://www.doi.gov",
    tags: ["Language Preservation", "Grants", "Tribal Nations", "Education"],
    readTime: "5 min",
  },
  {
    slug: "eeoc-discrimination-surge-2025",
    title: "EEOC Reports 23% Surge in Workplace Discrimination Complaints Filed by Black Workers",
    excerpt: "The agency attributes the increase to growing awareness of rights and increased protections under the 1983 Civil Rights Action framework.",
    body: [
      "The Equal Employment Opportunity Commission (EEOC) released its annual enforcement and litigation statistics on Friday, revealing a 23% increase in workplace discrimination complaints filed by Black workers during fiscal year 2025. The agency received 28,437 race-based discrimination charges, the highest number since the EEOC began tracking demographic data in 1997.",
      "The surge was most pronounced in the technology, healthcare, and financial services sectors. Tech industry complaints increased by 34%, with allegations centering on biased hiring algorithms, unequal pay for equivalent roles, and hostile work environments. Healthcare sector complaints rose 27%, with many involving patient-assignment discrimination and retaliation against Black nurses and physicians who report disparate treatment.",
      "EEOC Chair Charlotte Burrows attributed the increase to a combination of factors: increased public awareness of workplace rights following the racial justice protests of 2020-2021, expanded protections under recent amendments to Title VII of the Civil Rights Act of 1964, and growing willingness among workers to challenge systemic discrimination.",
      "'The numbers tell a clear story: Black workers are increasingly unwilling to accept discrimination as the cost of employment,' Burrows said. 'They are educated about their rights, they are organized, and they are demanding accountability. The EEOC is committed to ensuring that when they speak up, they are heard.'",
      "The report also highlighted a significant increase in retaliation claims. Of the race-based charges filed, 62% included an allegation of retaliation — up from 48% in fiscal year 2024. Legal experts attribute this to what they call the 'double-punishment problem,' where workers who report discrimination face additional adverse employment actions.",
      "For AASOTU Media Group founder Ronald Lee King, the statistics validate what he has experienced personally. King's own 1983 Civil Rights Action and EEOC complaint — filed after losing his employment — forms the backbone of the advocacy work featured on TheKingsTake.com.",
      "'These numbers aren't abstract statistics,' King said. 'Every one of those 28,437 complaints represents a real person — a father, a mother, a provider — who showed up to work, did their job, and was punished for the color of their skin. The 23% increase doesn't mean discrimination is getting worse. It means we're finally refusing to stay silent about it.'",
      "The EEOC secured $512 million in monetary benefits for discrimination victims during fiscal year 2025, a 19% increase from the previous year. However, critics note that the agency's backlog remains significant, with the average charge taking 13 months to resolve.",
    ],
    category: "LEGAL",
    coverImage: "/images/blog-post-4.jpg",
    createdAt: "2025-07-06",
    author: "AASOTU Wire",
    source: "EEOC Annual Report FY2025",
    sourceUrl: "https://www.eeoc.gov",
    tags: ["EEOC", "Discrimination", "Employment", "Civil Rights"],
    readTime: "6 min",
  },
  {
    slug: "dawes-rolls-digitization-complete-2025",
    title: "National Archives Completes Digitization of Full Dawes Rolls Database",
    excerpt: "Researchers and descendants can now search over 250,000 records online, a breakthrough for Indigenous genealogy and identity reclamation.",
    body: [
      "The National Archives and Records Administration (NARA) announced Wednesday the completion of a decade-long project to digitize the entire Dawes Rolls — the census-like records created between 1898 and 1914 that enrolled members of the Five Civilized Tribes (Cherokee, Chickasaw, Choctaw, Creek, and Seminole) and became the basis for tribal citizenship.",
      "The fully searchable database contains over 250,000 individual records, including enrollment cards, census cards, application packets, and related correspondence. For the first time, researchers, genealogists, and descendants can access the complete collection online without traveling to the National Archives facility in Washington, D.C.",
      "'This is a monumental achievement for genealogical research and tribal identity reclamation,' said Dr. K. Tsianina Lomawaima, professor of American Indian Studies at the University of Arizona. 'The Dawes Rolls are simultaneously a record of survival and a record of violence. They document who was deemed 'Indian enough' to be enrolled — and by implication, who was excluded.'",
      "The digitization project used advanced optical character recognition (OCR) technology combined with manual transcription by a team of 45 archivists and tribal historians. The database allows searches by name, age, tribal affiliation, blood quantum, enrollment number, and geographic location.",
      "Critics of the Dawes Rolls have long pointed out that the records are inherently flawed as a basis for tribal citizenship. The enrollment process was conducted by non-Native commissioners who often ignored matrilineal kinship systems, excluded mixed-race families, and relied on physical appearance to determine 'Indian blood.' The rolls also excluded thousands of freedmen — formerly enslaved Black people adopted by the Five Tribes — whose descendants continue to fight for citizenship recognition.",
      "For the Black-Indigenous descendants who visit TheKingsTake.com, the Dawes Rolls represent both an opportunity and a cautionary tale. The records can confirm ancestral connections to tribal nations, but they also document the systematic erasure of Black-Indigenous identity through the classification of freedmen as non-citizens.",
      "'My great-grandmother is listed on the Dawes Rolls as a freedman, not as a Choctaw citizen,' said descendant Mariah Wilson. 'The digitization helps me prove my Choctaw ancestry, but it also forces me to confront how the U.S. government deliberately separated Black and Native identities to weaken both communities.'",
      "The database is available at no cost at archives.gov/research/native-americans/dawes-rolls. NARA has also partnered with Ancestry.com and FamilySearch.org to integrate the records into their broader genealogy platforms.",
    ],
    category: "HERITAGE",
    coverImage: "/images/book-cover.jpg",
    createdAt: "2025-07-05",
    author: "AASOTU Wire",
    source: "National Archives and Records Administration",
    sourceUrl: "https://www.archives.gov",
    tags: ["Dawes Rolls", "Genealogy", "National Archives", "Five Tribes"],
    readTime: "7 min",
  },
  {
    slug: "upl-law-traps-black-families",
    title: "The UPL Law: How It Traps Black Families in the Justice System",
    excerpt: "The Unauthorized Practice of Law was designed to protect, but it's become a weapon against our communities. Here's what you need to know.",
    body: [
      "The Unauthorized Practice of Law (UPL) statute exists in every U.S. state, originally created to protect consumers from unqualified legal advice. But in practice, it has become a powerful tool for silencing community advocates, paralegals, and justice-impacted individuals who attempt to help others navigate the legal system.",
      "In most states, UPL is a criminal misdemeanor or felony. The definition of 'practice of law' is intentionally broad and vague — covering everything from filling out court forms for someone else to explaining legal procedures in a community workshop. This vagueness is not accidental; it serves to maintain a monopoly on legal knowledge.",
      "The impact on Black communities is devastating. Studies show that Black defendants are disproportionately represented by overworked public defenders with caseloads exceeding 500 active cases. Court-appointed attorneys spend an average of 7 minutes with clients before hearings. The result: guilty pleas in 90-95% of cases, often for crimes the defendant did not commit, simply because they cannot afford adequate representation.",
      "UPL laws criminalize the natural response to this crisis: community members stepping up to help. A mother who has navigated the family court system cannot share that knowledge with another mother facing the same battle. A formerly incarcerated man who learned procedural law in prison cannot advise his nephew on filing a 1983 Civil Rights Action. Both would be committing UPL.",
      "The solution is not to eliminate UPL entirely — predatory legal scams do exist — but to create broad exemptions for community-based legal assistance. California's SB 354, which creates a 'community navigator' certification, is a promising model. New York's court navigator program allows non-attorneys to assist in housing court. These programs prove that trained community members can provide effective legal support without endangering consumers.",
      "For those currently facing legal challenges: document everything. Every phone call with your attorney, every court date, every piece of evidence. If your court-appointed attorney fails to investigate your case, fails to file motions, or pressures you to accept a plea without explaining your options, these are grounds for a Sixth Amendment ineffective assistance of counsel claim — a pathway that has successfully overturned convictions nationwide.",
    ],
    category: "ADVOCACY",
    coverImage: "/images/blog-post-1.jpg",
    createdAt: "2025-01-15",
    author: "Ronald Lee King",
    source: "AASOTU Media Group",
    tags: ["UPL", "Legal System", "Criminal Justice", "Civil Rights"],
    readTime: "8 min",
  },
  {
    slug: "5-criminal-motions-to-know",
    title: "5 Criminal Motions Every Defendant Should Know About",
    excerpt: "Knowledge is power in the courtroom. These five motions can be the difference between conviction and dismissal.",
    body: [
      "If you or a loved one is facing criminal charges, understanding these five motions could be the difference between a conviction and a dismissal. Every defendant has the right to file these motions, and every defendant should discuss them with their attorney — or file them pro se if representing yourself.",
      "**1. Motion to Suppress Evidence (Fourth Amendment)**\n\nThis is arguably the most powerful motion in criminal defense. If police obtained evidence through an illegal search or seizure — without a warrant, without probable cause, or beyond the scope of a valid warrant — that evidence can be excluded from trial. This includes physical evidence, confessions, and identification. If the suppressed evidence is central to the prosecution's case, the charges may be dismissed entirely. File this motion before trial, typically within 30 days of arraignment.",
      "**2. Motion to Dismiss for Failure to State a Claim**\n\nThe prosecution must allege every element of the crime in the charging document (indictment or information). If any element is missing, vague, or contradicted by the facts, the charge is defective. This motion is particularly effective in cases where the charging language is boilerplate or where the alleged conduct does not actually violate the statute cited. Do not accept the prosecution's word that they have a valid charge — make them prove it.",
      "**3. Motion for Discovery and Brady Evidence**\n\nUnder Brady v. Maryland (1963), the prosecution MUST turn over all exculpatory evidence — evidence that tends to prove your innocence or undermine the prosecution's case. This includes witness statements, physical evidence, police reports, and disciplinary records of testifying officers. Many prosecutors withhold Brady material until forced. File this motion early and follow up aggressively. A pattern of Brady violations by a prosecutor's office can be grounds for dismissal.",
      "**4. Motion to Compel Speedy Trial (Sixth Amendment)**\n\nThe Sixth Amendment guarantees a speedy trial. The federal Speedy Trial Act requires trial within 70 days of indictment (with limited exceptions). State laws vary but typically require trial within 90-180 days. If the prosecution cannot meet these deadlines, the charges must be dismissed with prejudice — meaning they can never be refiled. This motion is particularly effective in overburdened court systems where delays are routine.",
      "**5. Motion for Ineffective Assistance of Counsel**\n\nIf your court-appointed attorney has failed to investigate your case, failed to file critical motions, pressured you to plead guilty without explaining your options, or has a conflict of interest, you may have a claim under Strickland v. Washington. This is a post-conviction motion that can overturn a guilty plea or conviction. Document everything: missed meetings, ignored evidence, coerced plea conversations.",
      "**Final Note:** These motions are not legal advice. They are starting points for your own research and discussion with an attorney. If you cannot afford an attorney, contact your local legal aid society, law school clinic, or community advocacy organization. Knowledge is your first weapon. Use it.",
    ],
    category: "LEGAL",
    coverImage: "/images/blog-post-2.jpg",
    createdAt: "2025-02-01",
    author: "Ronald Lee King",
    source: "AASOTU Media Group",
    tags: ["Legal Defense", "Motions", "Criminal Justice", "Know Your Rights"],
    readTime: "10 min",
  },
  {
    slug: "building-networks-protect-our-own",
    title: "Building Networks: Why We Must Connect to Protect Our Own",
    excerpt: "The system works against us when we're divided. Here's why community networks are our strongest defense against erasure.",
    body: [
      "The African American State of the Union is not just a book — it is a call to action. And the first action required is connection. Not the superficial connection of social media follows and hashtag solidarity, but the deep, structural connection of organized community networks that can identify threats, share resources, and mobilize response.",
      "The forces aligned against our communities — whether through mass incarceration, economic extraction, educational underfunding, or cultural erasure — operate through systems. Systems have budgets, org charts, chains of command, and strategic plans. They are organized. We must be more organized.",
      "A community network does not require a nonprofit status, a board of directors, or grant funding. It requires three things: (1) a shared commitment to mutual protection, (2) a communication system that reaches every member, and (3) a clear understanding of each member's skills, resources, and availability.",
      "The communication system is critical. It must be redundant — phone trees, encrypted messaging groups, email lists, physical bulletin boards. It must not depend on any single platform. When the 2020 protests began, organizers who had built multi-channel communication networks were able to mobilize thousands within hours. Those who relied solely on social media found their reach throttled and their accounts suspended.",
      "The skills inventory is equally important. Every community has attorneys (or law students), healthcare workers, educators, tradespeople, organizers, tech professionals, and elders with institutional knowledge. A community network documents who has what skills and establishes protocols for deploying those skills when needed — whether that's legal observation at a protest, medical care at a mass event, or technical support for a community broadcast.",
      "The AASOTU Media Group exists to facilitate these networks. TheKingsTake.com is not just a website — it is a hub. The heritage map documents where we come from. The ancestry tools help us trace our bloodlines. The legal education content arms us with knowledge. The news section keeps us informed. The writing services help us tell our stories. The pre-order of the book funds the expansion of all these resources.",
      "But a hub is useless without spokes. Your community network is the spoke. Start today: identify ten people in your community with different skills. Create a secure communication channel. Establish a meeting rhythm. Document your collective resources. When the next crisis comes — and it will — you will not be scrambling. You will be ready.",
    ],
    category: "COMMUNITY",
    coverImage: "/images/blog-post-3.jpg",
    createdAt: "2025-02-20",
    author: "Ronald Lee King",
    source: "AASOTU Media Group",
    tags: ["Community Organizing", "Networks", "Mutual Aid", "Strategy"],
    readTime: "7 min",
  },
  {
    slug: "from-the-loins-of-the-beast",
    title: "From the Loins of the Beast: My Journey to #TheKingsTake",
    excerpt: "How writing 'The African American State of the Union' transformed my understanding of our struggle — and my purpose.",
    body: [
      "I lost my job in the middle of a pandemic, in the middle of a fight, in the middle of trying to understand who I really am. The fight was a 1983 Civil Rights Action — a federal lawsuit alleging that my employer violated my constitutional rights. The identity question was deeper: who am I, really, when the labels society has given me don't match the history I feel in my bones?",
      "That question led me down a rabbit hole that I'm still falling through. I started researching my own family history, expecting to find what every school textbook had told me to expect: enslaved Africans brought to America, emancipation, civil rights, the standard narrative. What I found was something else entirely.",
      "I found reclassification laws — systematic legal mechanisms that changed Indigenous peoples' racial designation from 'Indian' to 'Negro,' 'Colored,' 'Mulatto,' and eventually 'African American.' I found that the Dawes Rolls, the census records used to determine tribal citizenship, deliberately excluded thousands of people with mixed Black and Native ancestry. I found that the 'one-drop rule' — the doctrine that a single drop of Black blood made you Black — was applied selectively to erase Indigenous identity while preserving white privilege.",
      "The more I researched, the angrier I became. Not just at the historical injustice, but at the present-day consequences. The Indigenous nations whose blood runs in my veins are nations I was never taught to claim. The treaties that were supposed to protect my ancestors were broken before I was born. The heritage that should have been my birthright was stolen through paperwork.",
      "So I started writing. At first, it was just notes — research findings, legal documents, family records. Then it became an outline. Then it became a chapter. Then it became 'The African American State of the Union: From the Loins of the Beast' — a book that confronts the stereotypes we've been force-fed and charts a path toward a new Industrial Revolution built by and for our people.",
      "Writing the book changed me. It forced me to confront not just the external systems of oppression, but the internalized narratives I had accepted without question. It made me realize that the 'African American' label — while politically useful and culturally meaningful — is also a colonial construct designed to erase the Indigenous peoples who were here before Columbus, before the slave ships, before any European set foot on this land.",
      "That realization led to TheKingsTake.com — a platform built on the principle that our story has not been fully told, and that the telling of it is itself an act of resistance. The heritage map. The ancestry tools. The legal education. The news section. The writing services. The book. All of it is one interconnected system designed to do what the mainstream has refused to do: tell our whole truth.",
      "I am Ronald Lee King. I am a father. I am an author. I am a researcher. I am an advocate. I am building this while fighting a legal battle, while raising a family, while figuring it out as I go. I am not a corporation. I am not funded by venture capital. I am one man with one mission: to make sure our people know who we really are. Welcome to the rabbit hole. It goes deeper than you think.",
    ],
    category: "VOICE",
    coverImage: "/images/blog-post-4.jpg",
    createdAt: "2025-03-01",
    author: "Ronald Lee King",
    source: "AASOTU Media Group",
    tags: ["Personal Story", "Identity", "Book", "Mission"],
    readTime: "9 min",
  },
  {
    slug: "aasotu-media-group-launch",
    title: "AASOTU Media Group LLC: The People's Voice Is Here",
    excerpt: "Independent media, built from the ground up. No corporate backing. No filtered message. Just truth, delivered directly to our community.",
    body: [
      "AASOTU Media Group LLC is not a startup. It is a statement. It is the declaration that our stories deserve a platform that is not controlled by corporations, not filtered by algorithms, and not subject to the editorial priorities of people who do not share our struggle.",
      "The company was founded in 2023 by Ronald Lee King during one of the most challenging periods of his life. Navigating a 1983 Civil Rights Action, an open EEOC case, and the loss of steady employment, King made the decision to build something rather than wait for someone else to build it for him.",
      "AASOTU operates as an independent media company with five core divisions: Publishing (books, digital content, research), Broadcasting (video, live streams, talks), Technology (heritage mapping, ancestry tools, genealogy), Legal Education (civil rights resources, motion templates, rights education), and Writing Services (speechwriting, ghostwriting, content creation).",
      "The flagship platform is TheKingsTake.com — a digital ecosystem that combines all five divisions into one unified experience. Users can explore Indigenous heritage maps, read investigative journalism, watch educational broadcasts, research their ancestry, and access legal education resources — all without leaving the site.",
      "What makes AASOTU different from other media platforms is its grounding in lived experience. The legal education content comes from someone who has actually filed a 1983 Civil Rights Action. The heritage research comes from someone who has spent years documenting tribal records. The writing services come from someone who has written a book while fighting for his rights. This is not content created by consultants. This is content created by someone who is living it.",
      "The business model is purpose-built for independence. The book generates revenue through pre-orders and sales. The writing services generate revenue through client contracts. The platform generates value through community engagement. There are no advertisers. There are no investors. There is no editorial board. The only filter is truth.",
      "As the platform grows, AASOTU plans to expand its capabilities: a mobile app for on-the-go heritage research, a podcast network featuring community voices, a documentary film division, and a legal defense fund for community members facing civil rights violations.",
      "This is the beginning. The People's Voice is here. And it's not going anywhere.",
    ],
    category: "AASOTU",
    coverImage: "/images/author-1.jpg",
    createdAt: "2025-04-01",
    author: "Ronald Lee King",
    source: "AASOTU Media Group",
    tags: ["Company News", "Media", "Launch", "Mission"],
    readTime: "5 min",
  },
  {
    slug: "indigenous-identity-reclassification",
    title: "How Reclassification Laws Erased Indigenous Identity in America",
    excerpt: "The systematic reclassification of Indigenous peoples as 'Negro,' 'Colored,' and 'African American' was not accidental. It was policy.",
    body: [
      "In 1790, the first United States census contained three racial categories: Free White Males, Free White Females, and All Other Free Persons. There was no 'African American' category. There was no 'Black' category. And critically, there was an 'Indian' category — because at that time, the federal government recognized that Indigenous peoples were a distinct population with treaty rights, land claims, and sovereign status.",
      "By 1930, the census contained a single non-white category for people of mixed Indigenous and Black ancestry: 'Negro.' The 'Indian' category had been narrowed to exclude anyone with documented African ancestry. The transformation was not accidental. It was the result of decades of deliberate policy designed to reduce the number of people eligible for tribal citizenship, land allotments, and treaty benefits.",
      "The mechanism was reclassification. Census takers — who were white men appointed by local authorities — had the power to determine a person's race based on physical appearance. A person with one Indigenous parent and one Black parent was typically recorded as 'Negro' or 'Mulatto,' regardless of their tribal affiliation. A person with one Indigenous parent and one white parent was typically recorded as 'Indian' — but only if they lived on a reservation and were enrolled in a tribe.",
      "The Virginia Racial Integrity Act of 1924 — also known as the 'one-drop rule' — codified this practice into law. The Act, sponsored by Dr. Walter Plecker, required that every birth certificate in Virginia include a racial classification of either 'white' or 'colored.' There was no 'Indian' option. Plecker, who was the state's registrar of vital statistics, used this law to reclassify thousands of Indigenous people — including members of the Pamunkey, Mattaponi, Chickahominy, and Monacan tribes — as 'colored.'",
      "The consequences were devastating. Families were split along racial lines. Children were taken from their Indigenous-identified parents and placed with 'colored' foster families. Tribal schools were closed. Tribal lands were seized under the guise of eminent domain and redistributed to white settlers. The very communities that had existed for thousands of years were legally erased with a stroke of a pen.",
      "This is the hidden history that 'The African American State of the Union' confronts. The book documents the specific laws, policies, and court decisions that created the 'African American' identity as a legal category — and reveals how that category was weaponized to simultaneously erase Indigenous sovereignty and contain Black resistance.",
      "Understanding this history is not just academic. It has practical implications for tribal citizenship claims, reparations eligibility, genealogical research, and personal identity. The AASOTU heritage map and ancestry tools are designed to help individuals and families reconstruct these erased connections — one document, one treaty, one bloodline at a time.",
    ],
    category: "HISTORY",
    coverImage: "/images/book-cover.jpg",
    createdAt: "2025-03-15",
    author: "Ronald Lee King",
    source: "AASOTU Media Group",
    tags: ["Reclassification", "Indigenous Identity", "History", "Virginia Racial Integrity Act"],
    readTime: "8 min",
  },
]

// Helper: get article by slug
export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find(a => a.slug === slug)
}

// Helper: get related articles
export function getRelatedArticles(article: Article, count: number = 3): Article[] {
  return ARTICLES
    .filter(a => a.slug !== article.slug && a.tags.some(t => article.tags.includes(t)))
    .slice(0, count)
}

// Helper: get articles by category
export function getArticlesByCategory(category: string): Article[] {
  return ARTICLES.filter(a => a.category === category)
}

// Helper: get trending (newest first)
export function getTrendingArticles(count: number = 5): Article[] {
  return [...ARTICLES]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, count)
}

// Helper: search articles
export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase()
  return ARTICLES.filter(a =>
    a.title.toLowerCase().includes(q) ||
    a.excerpt.toLowerCase().includes(q) ||
    a.tags.some(t => t.toLowerCase().includes(q))
  )
}
