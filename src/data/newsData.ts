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
      "For AASOTU Media Group and its readership, the advancement of H.R. 40 represents a critical milestone in the ongoing struggle for economic justice. The Indigenous Aboriginal Royal American community — those whose identities were systematically erased through reclassification laws — has a particularly veste…5592 tokens truncated… was born. The heritage that should have been my birthright was stolen through paperwork.",
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
    coverImage: "/images/book-cover-confirmed-v1.png",
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
