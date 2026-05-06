import { getDb } from "../api/queries/connection";
import { services, posts, legalForms } from "./schema";

const db = getDb();

async function seed() {
  // ─── Seed Services ───────────────────────────────────────
  console.log("Seeding services...");

  const existingServices = await db.select().from(services);
  if (existingServices.length === 0) {
    await db.insert(services).values([
      {
        name: "The Voice Session",
        slug: "voice-session",
        shortDescription: "30-minute 1-on-1 consultation for book ideas, content strategy, and social media growth.",
        fullDescription: `A focused 30-minute session where we tackle your biggest creative challenge. Perfect for:\n\n- Book idea brainstorming and validation\n- Content strategy overview\n- Social media growth audit\n- Platform building direction\n\nYou leave with clarity and a concrete next step.`,
        price: 4900,
        priceDisplay: "$49",
        duration: "30 minutes",
        type: "one_time",
        icon: "Mic",
        features: JSON.stringify(["30-minute video call", "Book idea validation", "Content strategy overview", "Social media audit", "Written action summary"]),
        order: 1,
      },
      {
        name: "The Blueprint",
        slug: "blueprint",
        shortDescription: "1-hour deep-dive + written action plan. Full manuscript review, chapter feedback, and 30-day content calendar.",
        fullDescription: `A comprehensive 1-hour strategy session plus a detailed written action plan. Includes:\n\n- Full manuscript review (up to 50 pages)\n- Chapter-by-chapter structural feedback\n- Publishing pathway recommendation\n- Custom 30-day content calendar\n- Written action plan delivered within 48 hours\n\nFor writers with a draft who need professional guidance to take it to the next level.`,
        price: 14900,
        priceDisplay: "$149",
        duration: "1 hour + deliverables",
        type: "one_time",
        icon: "FileText",
        features: JSON.stringify(["1-hour deep-dive session", "Manuscript review (50 pages)", "Structural feedback", "Publishing pathway guide", "30-day content calendar", "Written action plan"]),
        order: 2,
      },
      {
        name: "The Movement",
        slug: "movement",
        shortDescription: "Monthly subscription with weekly strategy calls, ghostwriting, web design consultation, and legal form review.",
        fullDescription: `The all-access monthly membership for serious creators building a movement. Everything you need:\n\n- Weekly 1-hour strategy calls\n- Ghostwriting & editing (up to 5,000 words/month)\n- Full web design & branding consultation\n- Social media content creation (15 posts/month)\n- Legal form review & guidance\n- Priority response (24-hour turnaround)\n- Direct access to Ronald Lee King\n\nIndustry value: $800+/month. Your price: $299/month.`,
        price: 29900,
        priceDisplay: "$299/month",
        duration: "Monthly",
        type: "subscription",
        icon: "Zap",
        features: JSON.stringify(["Weekly 1-hour calls", "5,000 words ghostwritten/month", "Web design consultation", "15 social posts/month", "Legal form review", "24-hour priority response", "Direct access"]),
        order: 3,
      },
      {
        name: "The Empire",
        slug: "empire",
        shortDescription: "Full-service book launch package: press kit, website, 30-day campaign, email sequence, and trailer script.",
        fullDescription: `The complete promotional package for authors ready to launch their book into the world. This is everything:\n\n- Complete book launch strategy\n- Professional press kit & media outreach materials\n- Custom website build (up to 5 pages)\n- 30-day social media campaign\n- Email marketing sequence (5 emails)\n- Book trailer script & storyboard\n- Launch timeline & checklist\n- 2 follow-up strategy calls\n\nEverything you need to launch like a major publisher — without the major publisher price tag.`,
        price: 59900,
        priceDisplay: "$599",
        duration: "Full package",
        type: "package",
        icon: "Crown",
        features: JSON.stringify(["Book launch strategy", "Press kit & media materials", "Custom website (5 pages)", "30-day social campaign", "Email sequence (5 emails)", "Book trailer script", "Launch timeline", "2 follow-up calls"]),
        order: 4,
      },
    ]);
    console.log("  ✓ 4 services seeded");
  } else {
    console.log("  ✓ Services already exist, skipping");
  }

  // ─── Seed Blog Posts ─────────────────────────────────────
  console.log("Seeding blog posts...");

  const existingPosts = await db.select().from(posts);
  if (existingPosts.length === 0) {
    await db.insert(posts).values([
      {
        title: "The UPL Law: How It Traps Black Families in the Justice System",
        slug: "upl-law-traps-black-families",
        excerpt: "The Unauthorized Practice of Law was designed to protect, but it's become a weapon against our communities. Here's how it works and what you can do about it.",
        content: `The Unauthorized Practice of Law (UPL) statute was created with good intentions — to ensure that individuals seeking legal help receive counsel from qualified, licensed attorneys. But like many well-meaning laws, it has become a double-edged sword that cuts deepest in communities that can least afford the wound.\n\n## What Is UPL?\n\nUPL laws make it illegal for anyone who is not a licensed attorney to provide legal advice, draft legal documents for others, or represent someone in court. The penalty for violating UPL laws can include fines and even criminal charges.\n\n## The Hidden Cost\n\nHere's what lawmakers didn't account for: the average cost of a criminal defense attorney ranges from $2,000 to $10,000 for a misdemeanor. For a felony? You're looking at $10,000 to $50,000 or more. In communities where the median household income is already stretched thin, these numbers aren't just intimidating — they're impossible.\n\n## The Exploitation Loop\n\nPublic defenders know this reality intimately. They know that most families can't pull together thousands of dollars on short notice. They know that the UPL law prevents anyone — no matter how knowledgeable — from helping these families navigate the system. And some have used this knowledge to maintain prices that keep quality representation out of reach.\n\n## Breaking the Cycle\n\nKnowledge is the first weapon. Understanding your rights, knowing the motions you can file, and having access to properly formatted legal forms — these are the tools that level the playing field. This is why we built the Legal Hub. Not to replace attorneys, but to ensure that no one walks into a courtroom completely defenseless.`,
        category: "ADVOCACY",
        coverImage: "/images/blog-post-1.jpg",
        published: true,
        featured: true,
      },
      {
        title: "5 Criminal Motions Every Defendant Should Know About",
        slug: "5-criminal-motions-to-know",
        excerpt: "Knowledge is power in the courtroom. These five motions can be the difference between conviction and dismissal.",
        content: `When you're facing criminal charges, the legal system can feel like a maze designed to trap you. But there are tools available — motions that can challenge the prosecution's case, protect your rights, and even end your case before trial.\n\n## 1. Motion to Dismiss\n\nA Motion to Dismiss asks the court to throw out the charges against you. Common grounds include insufficient evidence, violation of your constitutional rights, or expiration of the statute of limitations.\n\n## 2. Motion to Suppress Evidence\n\nIf evidence was obtained through an illegal search, coerced confession, or other constitutional violation, a Motion to Suppress can prevent that evidence from being used against you.\n\n## 3. Motion for Bond Reduction\n\nIf your bail is set at an amount you cannot afford, this motion argues that the amount is excessive under the Eighth Amendment and requests a lower amount.\n\n## 4. Writ of Habeas Corpus\n\nThis powerful motion challenges unlawful detention. If you're being held without proper legal authority, a writ of habeas corpus demands that the government justify your detention or release you.\n\n## 5. Motion for a New Trial\n\nIf errors occurred during your trial — whether from the judge, jury, or prosecution — this motion asks the court to set aside the verdict and start fresh.\n\nEach of these motions is available as a downloadable template in our Legal Hub.`,
        category: "LEGAL",
        coverImage: "/images/blog-post-2.jpg",
        published: true,
        featured: false,
      },
      {
        title: "Building Networks: Why We Must Connect to Protect Our Own",
        slug: "building-networks-protect-our-own",
        excerpt: "The system works against us when we're divided. Here's why community networks are our strongest defense.",
        content: `Throughout history, the most powerful movements have been built on networks — connections between people who share a common goal and are willing to work together to achieve it. The civil rights movement wasn't the work of one person. It was the work of thousands of connected individuals, organizations, and communities.\n\n## Why Networks Matter\n\nWhen a family member is arrested, the first call often goes to someone in the network. When a landlord violates tenant rights, the network provides the legal resources to fight back. When a community is underserved, the network organizes the response.\n\n## What a Strong Network Looks Like\n\n- **Legal resource sharing**: Know who to call and what forms to file\n- **Financial solidarity**: Community funds for bail and legal fees\n- **Information flow**: Rapid communication about threats and opportunities\n- **Mentorship**: Experienced members guiding the next generation\n\n## Start Building Today\n\nYour network starts with one conversation. Reach out to your neighbors, your church, your local organizations. Share what you know. Ask what others need. The connections you build today could be the lifeline someone needs tomorrow.`,
        category: "COMMUNITY",
        coverImage: "/images/blog-post-3.jpg",
        published: true,
        featured: false,
      },
      {
        title: "From the Loins of the Beast: My Journey to #TheKingsTake",
        slug: "from-the-loins-of-the-beast",
        excerpt: "How writing 'The African American State of the Union' transformed my understanding of our struggle and led to the creation of this platform.",
        content: `I didn't set out to become the voice of a movement. I set out to write a book that told the truth about what I saw happening in our communities — the legal traps, the systemic exploitation, the ways the system is designed to keep us struggling while others profit.\n\n## The Book That Changed Everything\n\n"The African American State of the Union: From the Loins of the Beast" started as a journal. I was documenting cases I came across — families destroyed by a legal system they couldn't afford to navigate, public defenders who treated their clients like case numbers, and the UPL law that prevented anyone from helping.\n\nThe more I wrote, the clearer the pattern became. This wasn't a series of isolated incidents. This was a system working exactly as designed.\n\n## From Book to Platform\n\nThe response to the book was overwhelming. Messages poured in from people asking for help, for guidance, for resources. I realized that a book alone wasn't enough — we needed a platform. A place where people could find legal forms, connect with services, read about their rights, and build the networks necessary to protect our communities.\n\n## What Comes Next\n\n#TheKingsTake is more than a website. It's a movement. A commitment to being the voice for people who have been silenced by a system that profits from their struggle. Join us.`,
        category: "VOICE",
        coverImage: "/images/blog-post-4.jpg",
        published: true,
        featured: false,
      },
    ]);
    console.log("  ✓ 4 blog posts seeded");
  } else {
    console.log("  ✓ Blog posts already exist, skipping");
  }

  // ─── Seed Legal Forms ────────────────────────────────────
  console.log("Seeding legal forms...");

  const existingForms = await db.select().from(legalForms);
  if (existingForms.length === 0) {
    await db.insert(legalForms).values([
      {
        title: "Motion to Dismiss",
        slug: "motion-to-dismiss",
        description: "Challenge the charges against you with proper legal grounds such as insufficient evidence, constitutional violations, or statute of limitations.",
        category: "criminal",
        fileUrl: null,
        fileSize: null,
        content: null,
      },
      {
        title: "Motion for Bond Reduction",
        slug: "motion-for-bond-reduction",
        description: "Request a lower bond amount when the current bail is excessive and beyond financial means.",
        category: "criminal",
        fileUrl: null,
        fileSize: null,
        content: null,
      },
      {
        title: "Motion to Suppress Evidence",
        slug: "motion-to-suppress-evidence",
        description: "Challenge evidence obtained through unconstitutional search, seizure, or coerced confession.",
        category: "criminal",
        fileUrl: null,
        fileSize: null,
        content: null,
      },
      {
        title: "Writ of Habeas Corpus",
        slug: "writ-of-habeas-corpus",
        description: "Challenge unlawful detention and demand the right to appear before a court.",
        category: "criminal",
        fileUrl: null,
        fileSize: null,
        content: null,
      },
      {
        title: "Motion for New Trial",
        slug: "motion-for-new-trial",
        description: "Request a new trial based on legal errors, newly discovered evidence, or jury misconduct.",
        category: "criminal",
        fileUrl: null,
        fileSize: null,
        content: null,
      },
      {
        title: "Motion In Limine",
        slug: "motion-in-limine",
        description: "Request the court to exclude certain prejudicial evidence from being presented at trial.",
        category: "criminal",
        fileUrl: null,
        fileSize: null,
        content: null,
      },
    ]);
    console.log("  ✓ 6 legal forms seeded");
  } else {
    console.log("  ✓ Legal forms already exist, skipping");
  }

  console.log("\n✅ Seed complete!");
}

seed().catch(console.error);
