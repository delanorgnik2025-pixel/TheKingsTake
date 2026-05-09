import { trpc } from "@/providers/trpc";
import { Link, useParams } from "react-router";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { useMemo } from "react";

// Static fallback posts keyed by slug — render immediately even if API/database is empty
const FALLBACK_POSTS: Record<string, { title: string; slug: string; category: string; excerpt: string; coverImage: string; content: string; createdAt: Date }> = {
  "upl-law-traps-black-families": {
    title: "The UPL Law: How It Traps Black Families in the Justice System",
    slug: "upl-law-traps-black-families",
    category: "ADVOCACY",
    excerpt: "The Unauthorized Practice of Law was designed to protect consumers from unqualified legal advice. But in practice, it has become a weapon used against our communities — preventing well-meaning advocates from helping families navigate a system that was never built for them.",
    coverImage: "/images/blog-post-1.jpg",
    createdAt: new Date("2025-01-15"),
    content: `The Unauthorized Practice of Law (UPL) statutes were originally created with good intentions. The idea was simple: protect the public from people who pretend to be lawyers but lack the training, ethics, and accountability that come with a law license.

But somewhere along the way, these laws stopped protecting people and started protecting the legal profession's monopoly on justice.

## What UPL Actually Means

UPL laws make it a crime for anyone who is not a licensed attorney to perform certain legal tasks. In most states, this includes:
- Representing someone in court
- Giving legal advice specific to someone's case
- Drafting legal documents for another person
- Holding yourself out as qualified to practice law

On paper, this makes sense. You don't want someone pretending to be a doctor giving medical advice, and you don't want someone pretending to be a lawyer handling your freedom.

## Where It Goes Wrong

The problem is that UPL is enforced so broadly that it criminalizes basic community support. Consider these scenarios:

A grandmother helps her grandson fill out a simple form to contest an eviction. Under strict UPL interpretation, she could be prosecuted for practicing law without a license.

A community organizer who has been through the system dozens of times shares what he learned with a neighbor facing the same charges. UPL says that's illegal if it crosses into "legal advice."

A social worker explains court procedures to a frightened mother trying to get her children back from foster care. That's borderline UPL in many jurisdictions.

## The Economic Reality

Let's be honest about what's really happening. The legal system is designed to be so complex that you need a lawyer for almost everything. But lawyers cost $200-$500 per hour. The median Black household in America has $24,000 in wealth. A single criminal case can cost $10,000-$50,000 in legal fees.

Most people in our communities simply cannot afford an attorney. So they have three choices:

1. Go into debt trying to pay for one
2. Represent themselves (pro se) with zero guidance
3. Get help from someone who knows the system but isn't a lawyer

Option 3 is what UPL criminalizes.

## The Numbers Don't Lie

According to the Legal Services Corporation, 86% of civil legal problems reported by low-income Americans receive inadequate or no legal help. In criminal courts, public defenders carry caseloads of 500-1,000 cases per year — meaning they can spend an average of 7 minutes per case.

The system is overwhelmed. The people who need help the most get it the least. And UPL laws make it illegal for the community to fill that gap.

## What's Really Happening

When a district attorney's office prosecutes a community advocate for UPL, they're not protecting consumers. They're protecting market share.

The legal industry generates $437 billion annually in the United States. There are 1.3 million licensed attorneys. Every person who helps themselves or their neighbor without paying an attorney is potential revenue lost.

UPL enforcement has been used to shut down:
- Legal self-help clinics in churches
- Community workshops on court procedures
- Online platforms offering legal information
- Non-profits providing basic document assistance
- Advocates helping families with guardianship cases

## A Different Way Forward

This isn't about eliminating UPL entirely. We need standards to protect people from fraud. But we need a system that:

1. Allows trained non-attorney advocates to help with basic legal tasks
2. Creates a licensing pathway for legal technicians (like nurse practitioners in medicine)
3. Permits limited legal services in underserved communities
4. Protects free speech and educational activities
5. Focuses enforcement on actual fraud, not community support

## The Bottom Line

The UPL law, as currently enforced, is not protecting Black families. It's preventing us from helping each other. It's creating a vacuum where the only legal help available is unaffordable, and criminalizing the people who try to step into that gap.

This isn't about replacing lawyers. It's about recognizing that justice shouldn't be a luxury good.

## Disclaimer

This article is for educational and informational purposes only. It does not constitute legal advice and does not create an attorney-client relationship. The views expressed are those of the author and are intended to promote understanding of legal system issues affecting underserved communities. For specific legal matters, consult a licensed attorney in your jurisdiction.`,
  },
  "5-criminal-motions-to-know": {
    title: "5 Criminal Motions Every Defendant Should Know About",
    slug: "5-criminal-motions-to-know",
    category: "LEGAL",
    excerpt: "Knowledge is power in the courtroom. These five motions can be the difference between conviction and dismissal. Understanding them gives you a fighting chance.",
    coverImage: "/images/blog-post-2.jpg",
    createdAt: new Date("2025-02-01"),
    content: `When you're facing criminal charges, the prosecution holds most of the cards. They have the resources of the state behind them, experienced prosecutors, and relationships with judges. But you have one powerful tool: the motion.

A motion is a formal request to the court to take some action. Filed properly, the right motions can suppress evidence, dismiss charges, or completely change the trajectory of your case.

Here are five motions every defendant should know:

## 1. Motion to Dismiss

This is the nuclear option. A Motion to Dismiss asks the court to throw out the charges entirely, usually because the prosecution has failed to state a valid legal claim or because constitutional rights have been violated.

**When to use it:**
- The statute of limitations has expired
- The charges don't actually describe a crime
- Double jeopardy (you've already been tried for this)
- Prosecutorial misconduct
- Lack of jurisdiction

**Why it matters:** If granted, the case is over. No trial, no conviction, no record.

## 2. Motion to Suppress Evidence

This motion asks the court to exclude evidence that was obtained illegally — typically through an unconstitutional search or seizure in violation of the Fourth Amendment.

**When to use it:**
- Evidence was found during an illegal search
- There was no probable cause for the stop
- The warrant was defective or based on false information
- You were questioned without being read your Miranda rights
- Consent to search was coerced

**Why it matters:** If the judge suppresses the key evidence, the prosecution may have no case left. I've seen cases where suppressing a single piece of evidence led to complete dismissal.

## 3. Motion for Discovery

The prosecution is required to turn over all evidence they have — including evidence that helps your case. This motion forces them to comply with their legal obligations.

**What you can demand:**
- All physical evidence
- Witness statements
- Police reports
- Body camera footage
- Lab results
- Expert witness reports
- Brady material (evidence favorable to the defense)

**Why it matters:** Prosecutors sometimes "forget" to disclose exculpatory evidence. This motion puts the court on notice and creates a paper trail if they withhold anything.

## 4. Motion to Compel Evidence

When the prosecution resists turning over discovery materials, this motion asks the court to order them to comply.

**When to use it:**
- The prosecution has missed discovery deadlines
- They've provided incomplete or redacted materials
- They're claiming privileges that don't apply
- They're withholding body camera or surveillance footage

**Why it matters:** This motion shows the court that the prosecution isn't playing fair. Judges don't like it when prosecutors hide the ball.

## 5. Motion for a Continuance

This asks the court to postpone proceedings, usually because you need more time to prepare.

**Valid reasons:**
- Your attorney needs time to investigate
- A key witness is unavailable
- You need time to review discovery materials
- You're seeking alternative counsel
- New evidence has emerged

**Why it matters:** Rushed defenses are losing defenses. Every day of preparation time improves your chances. But use this wisely — judges get annoyed with repeated continuances.

## How These Motions Work Together

The real power comes from combining these motions strategically:

**Example:** File a Motion for Discovery first. When the prosecution finally turns over the evidence, review it carefully. If you find that key evidence was obtained illegally, file a Motion to Suppress. If that evidence is the foundation of their case, follow up with a Motion to Dismiss.

**Example 2:** File a Motion for Discovery and find that the prosecution has withheld Brady material (evidence that helps your case). File a Motion to Compel. If they still don't comply, the judge may dismiss the case for prosecutorial misconduct.

## Filing Pro Se

If you're representing yourself, these motions can still be filed. Most courts have fill-in-the-blank motion forms. The clerk's office can tell you what format to use.

**Tips for pro se defendants:**
- Be specific about what you're asking for
- Cite the constitutional provision or statute that supports your motion
- Attach any supporting documents or affidavits
- File a copy with the clerk and serve a copy on the prosecutor
- Be prepared to argue the motion at the hearing

## The Bottom Line

You might not win every motion. But filing the right motions forces the prosecution to prove every element of their case, follows proper procedures, and respects your constitutional rights. Even motions that are denied create a record for appeal.

Knowledge is power. These five motions are your weapons in a system that wasn't designed for you to win.

## Disclaimer

This article is for educational and informational purposes only. It does not constitute legal advice and does not create an attorney-client relationship. Court procedures vary by jurisdiction. For specific legal matters, consult a licensed attorney in your jurisdiction.`,
  },
  "building-networks-protect-our-own": {
    title: "Building Networks: Why We Must Connect to Protect Our Own",
    slug: "building-networks-protect-our-own",
    category: "COMMUNITY",
    excerpt: "The system works against us when we're divided. Here's why community networks are our strongest defense — and how to start building them in your neighborhood.",
    coverImage: "/images/blog-post-3.jpg",
    createdAt: new Date("2025-02-20"),
    content: `I've seen it happen too many times. A family member gets arrested. The community is shocked. Everyone talks about how "they came out of nowhere" and how "we never saw it coming." And then we all go back to our lives until it happens to the next family.

This cycle has to stop. The only way we survive a system designed to process us is by building networks that protect our own.

## What Is a Community Legal Network?

A community legal network is a group of people in a neighborhood or community who:
- Share information about legal rights and procedures
- Support families going through the justice system
- Connect people with resources (legal aid, bond funds, social services)
- Document police activity and court proceedings
- Advocate for policy changes

Think of it as a neighborhood watch, but for the legal system.

## Why Networks Matter

The justice system is designed to process people in isolation. When you're arrested, you're separated from your family, your job, your support system. The system expects you to navigate complex procedures alone while everything you know is falling apart.

Networks change this dynamic. When a community is organized:
- Someone knows what to do within the first hour of an arrest
- Families have support while their loved one is in custody
- Court dates are monitored so people don't miss them
- Resources are pooled for bonds and legal fees
- Patterns of over-policing are documented

## The Numbers Are Staggering

Consider these facts:
- Black people are incarcerated at 5 times the rate of white people
- 1 in 3 Black men will be incarcerated in their lifetime
- Black defendants receive sentences 20% longer than white defendants for the same crimes
- Public defenders handle 500-1,000 cases per year (impossible caseloads)
- 80% of criminal defendants cannot afford an attorney

These aren't statistics. These are our families, our neighbors, our children.

## How to Start Building Your Network

You don't need a nonprofit status or grant funding to start. Here's what you actually need:

**1. Identify Your Core Team (3-5 people)**
Find people in your community who are:
- Trusted and respected
- Available to respond to emergencies
- Willing to learn about legal procedures
- Connected to different parts of the community

**2. Create a Rapid Response System**
When someone is arrested, time is critical. Your network needs:
- A phone tree or group chat for alerts
- Someone who knows how to find out where the person was taken
- Contact information for bond agents
- A list of legal aid organizations
- Someone who can notify family members and employers

**3. Build a Resource Directory**
Create a shared document with:
- Local legal aid organizations and their specialties
- Pro bono attorney referral services
- Bond fund organizations
- Court navigator programs
- Social services (housing, employment, mental health)
- Community centers that host legal clinics

**4. Host Regular Information Sessions**
Bring speakers to your community:
- Criminal defense attorneys explaining procedures
- Former defendants sharing their experiences
- Legal aid representatives discussing services
- Policy advocates explaining proposed reforms

**5. Document Everything**
Create systems to track:
- Police stops and arrests in your community
- Court outcomes
- Patterns of enforcement
- Treatment by different judges and prosecutors

This data becomes powerful when advocating for policy changes.

## Real-World Examples

The Chicago Community Bond Fund has raised millions to bond people out of pretrial detention. Their work has kept thousands of people out of jail while awaiting trial, preventing the job loss, housing loss, and family disruption that comes with even short periods of incarceration.

The Brooklyn Community Bail Fund operates similarly, focusing on misdemeanor cases where bail is set at amounts families can't afford ($500-$2,000). Their intervention keeps people from pleading guilty just to get out of jail.

## The King's Take

I've been through the system. I've watched families destroyed by it. And I've learned that the only thing that protects us is each other.

The system wants you isolated, confused, and dependent. Networks make you connected, informed, and empowered.

Start small. Three people who trust each other and are willing to answer a phone at 2 AM. That's enough to begin. Build from there.

The African American State of the Union starts in your living room, at your kitchen table, with the people you already know. From the loins of the beast, we build something that cannot be destroyed.

## Disclaimer

This article is for educational and informational purposes only. It does not constitute legal advice and does not create an attorney-client relationship. The views expressed are those of the author and are intended to promote community empowerment. For specific legal matters, consult a licensed attorney in your jurisdiction.`,
  },
  "from-the-loins-of-the-beast": {
    title: "From the Loins of the Beast: My Journey to #TheKingsTake",
    slug: "from-the-loins-of-the-beast",
    category: "VOICE",
    excerpt: "How writing 'The African American State of the Union: From the Loins of the Beast' transformed my understanding of our struggle and led to the creation of this platform.",
    coverImage: "/images/blog-post-4.jpg",
    createdAt: new Date("2025-03-01"),
    content: `I never set out to be a writer. I never set out to build a platform. I set out to understand why the system kept destroying the people I loved.

The African American State of the Union: From the Loins of the Beast started as a journal. I was watching the justice system consume people in my community — people who made mistakes, people who were in the wrong place at the wrong time, people who simply couldn't afford to fight.

## Where It Began

The title comes from a conversation I had with my grandfather. He told me, "Son, we came from the loins of the beast. This system was built on our backs, and now it turns around and devours our children."

He was talking about the paradox of America. A nation that built its wealth through the labor of enslaved Africans now operates a criminal justice system that incarcerates their descendants at unprecedented rates. The beast that our ancestors fed now feeds on us.

## What I Discovered

As I researched and wrote, patterns emerged that I couldn't ignore:

The justice system isn't broken. It's working exactly as designed. It was never meant to deliver justice equally. It was meant to maintain social control, and it does that brilliantly.

The legal system isn't complex by accident. It's complex by design. The more complicated the rules, the more you need a lawyer. The more you need a lawyer, the more money the system extracts from your community.

The public defender system isn't underfunded by accident. It's underfunded by design. If every defendant had adequate representation, the system would collapse under its own weight.

## The Book Took Shape

What started as a journal became a book. What started as a book became a mission. The African American State of the Union isn't just about documenting problems — it's about building solutions.

The book covers:
- The history of how UPL laws evolved to protect the legal profession
- How the court system systematically disadvantages Black defendants
- The economics of incarceration and who profits from it
- Practical strategies for navigating the system
- How to build community networks for mutual protection
- The power of pro se representation when done with knowledge

## Why I Created #TheKingsTake

The book was the beginning, but I realized that information alone isn't enough. People need tools. They need community. They need a platform that brings together legal education, practical resources, and collective action.

#TheKingsTake was born from that need. This platform is designed to:
- Make legal knowledge accessible to everyone
- Provide practical tools for self-advocacy
- Build community networks across the country
- Create economic opportunities through media and publishing
- Develop technology that democratizes legal education

## What's Coming Next

The AI Courtroom Simulator is the next evolution. I've watched too many people walk into courtrooms completely unprepared because they've never seen the inside of one. The simulator changes that. It lets you experience a courtroom — with realistic personalities, real procedures, and real stakes — before you ever face the real thing.

This isn't a game. It's training. And in a system that processes 10 million criminal cases per year, training is survival.

## The Bottom Line

From the loins of the beast, we build what cannot be destroyed. The system was built to consume us. We're building something to protect us.

This book, this platform, this community — it's all part of the same mission. Justice isn't something you receive. It's something you build, together, with the people who understand what's at stake.

Because they can't lock up all of us. They can't silence all of us. And they can't stop what we build together.

## About the Author

Ronald Lee King is the founder of AASOTU Media Group LLC and creator of #TheKingsTake platform. He is the author of The African American State of the Union: From the Loins of the Beast. Through writing, media, and technology, he works to democratize legal knowledge and build community resilience.

## Disclaimer

This article is for educational and informational purposes only. It does not constitute legal advice and does not create an attorney-client relationship. The views expressed are those of the author. For specific legal matters, consult a licensed attorney in your jurisdiction.`,
  },
  "know-your-rights-police-encounters": {
    title: "Know Your Rights: What to Do During a Police Encounter",
    slug: "know-your-rights-police-encounters",
    category: "LEGAL",
    excerpt: "Your constitutional rights don't disappear when a police officer approaches you. Here's exactly what to say, what not to say, and how to protect yourself legally during any police encounter.",
    coverImage: "/images/blog-post-2.jpg",
    createdAt: new Date("2025-03-15"),
    content: `The first time I was stopped by police, I was 16 years old. Walking home from school. I didn't know my rights. I didn't know what to say. I didn't know that I could say no.

By the time that encounter ended, I was in handcuffs on the sidewalk, surrounded by three police cars, while neighbors watched from their porches. The charge? Resisting arrest. The real reason? I asked why I was being stopped.

That experience taught me that knowing your rights isn't optional. It's survival.

## The Fundamental Rule

You have constitutional rights. They don't disappear because a police officer is standing in front of you. But exercising those rights requires knowing what they are and how to use them without escalating the situation.

## When Police Approach You on the Street

**Police can approach you and ask questions at any time.** But you are not legally required to answer.

**What to say:**
"Officer, I don't wish to speak with you. Am I free to go?"

This is the magic question. If the officer says YES, walk away calmly. Don't run. Don't argue. Just leave.

If the officer says NO, you are being detained. Now the rules change.

## When You Are Being Detained

Police can detain you if they have "reasonable suspicion" that you're involved in criminal activity. This is a lower standard than "probable cause" (which is needed for arrest).

**During detention, you must:**
- Provide your name and address (in some states, you must show ID)
- Stay calm and keep your hands visible
- Not physically resist

**During detention, you do NOT have to:**
- Answer any other questions
- Consent to a search
- Explain where you're going or where you've been
- Let them search your phone

**What to say:**
"Officer, I am going to remain silent. I want to speak with a lawyer."

## When Police Want to Search You

This is critical: **Police cannot search you without your consent, a warrant, or probable cause.** If they ask to search you, they are asking because they NEED your consent.

**What to say:**
"Officer, I do not consent to any searches."

Say this clearly. Say it calmly. Say it every time they ask. If they search you anyway, do not physically resist. Your lawyer will challenge the search later.

## When Police Want to Search Your Car

Police need probable cause to search your car without consent. But they often claim they smell marijuana or see something suspicious. These claims are frequently fabricated.

**What to say:**
"Officer, I do not consent to any searches of my vehicle."

If they search anyway, stay calm. Document everything. Get the officer's name and badge number.

## When Police Come to Your Home

Police generally need a warrant to enter your home. There are exceptions (emergency situations, hot pursuit, consent), but the default rule is: no warrant, no entry.

**What to say:**
"Officer, I do not consent to any searches. Please show me your warrant."

If they have a warrant, read it. Make sure it's signed by a judge and has your correct address. You have the right to review it before they enter.

## When You Are Arrested

If you are placed under arrest, the officer must read you your Miranda rights:
- You have the right to remain silent
- Anything you say can be used against you in court
- You have the right to an attorney
- If you cannot afford an attorney, one will be appointed

**The most important thing: REMAIN SILENT.**

Police are trained to get you talking. They'll say things like:
- "If you just tell me what happened, I can help you"
- "Your friend already told us everything"
- "This will go easier if you cooperate"

These are tactics. They are not your friends in that moment. They are building a case.

**What to say:**
"I am invoking my right to remain silent and my right to an attorney. I will not answer any questions without my lawyer present."

Then say NOTHING else. Not "I didn't do anything." Not "This is a mistake." Nothing.

## Recording Police Encounters

In all 50 states, you have the right to record police officers performing their duties in public. This is protected by the First Amendment.

**Tips for recording:**
- Announce that you are recording (not required, but recommended)
- Keep a safe distance
- Do not interfere with the police activity
- If police tell you to stop, you can legally continue
- If police seize your phone, they need a warrant to view the contents

## What to Do After the Encounter

**Document everything immediately:**
- Officer names and badge numbers
- Patrol car numbers
- Location, date, and time
- Names of witnesses
- What was said
- Whether you were searched or detained

**File a complaint if your rights were violated:**
- Internal Affairs at the police department
- Civilian Complaint Review Board (in some cities)
- Your local ACLU chapter
- The Department of Justice Civil Rights Division

## The Bottom Line

Knowing your rights doesn't make you immune to police misconduct. Racism exists. Bias exists. Bad cops exist. But knowing your rights gives you the best chance to:
- Avoid arrest when possible
- Protect the legal integrity of your case
- Hold officers accountable for misconduct
- Survive the encounter

The system wasn't designed for us. But our constitutional rights were written for everyone. Use them.

## Disclaimer

This article is for educational and informational purposes only. It does not constitute legal advice and does not create an attorney-client relationship. Laws vary by jurisdiction and change over time. For specific legal advice regarding a police encounter, consult a licensed attorney in your jurisdiction immediately.`,
  },
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: apiPost } = trpc.blog.bySlug.useQuery({ slug: slug ?? "" });

  // Use API data if available, otherwise show static fallback immediately
  const post = useMemo(() => {
    if (apiPost) return apiPost;
    if (slug && FALLBACK_POSTS[slug]) return FALLBACK_POSTS[slug];
    return null;
  }, [apiPost, slug]);

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-6 md:px-12 overflow-hidden">
      {post.coverImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${post.coverImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-[#1B2838]/85" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <div className="flex items-center gap-4 mb-4">
          <span className="flex items-center gap-1 text-xs text-[#FF9500] uppercase tracking-[0.08em]">
            <Tag size={12} />
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-dimmed">
            <Calendar size={12} />
            {post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
          </span>
          <span className="flex items-center gap-1 text-xs text-dimmed">
            <User size={12} />
            Ronald Lee King
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl text-[#F0EBE1] tracking-[-0.02em] text-shadow-hero mb-6">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-lg text-[#C9B99A] italic mb-8 border-l-2 border-[#FF9500] pl-4">
            {post.excerpt}
          </p>
        )}

        <div className="bg-[rgba(27,40,56,0.9)] backdrop-blur-lg rounded-lg border border-[rgba(255,149,0,0.2)] p-8">
          <div
            className="prose prose-invert max-w-none text-[#C9B99A] leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/\n\n/g, "</p><p>")
                .replace(/\n/g, "<br />")
                .replace(/^/, "<p>")
                .replace(/$/, "</p>")
                .replace(/<p><\/p>/g, "")
                .replace(/## (.*?)<\/p>/g, "<h2 class=\"text-2xl text-[#F0EBE1] mt-8 mb-4\">$1</h2>")
                .replace(/<h2.*?>(.*?)<\/h2>/g, "<h2 class=\"text-2xl text-[#F0EBE1] mt-8 mb-4\">$1</h2>"),
            }}
          />
        </div>

        <div className="mt-12 p-6 bg-[rgba(42,58,74,0.7)] rounded-lg border border-[rgba(255,149,0,0.2)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FF9500] flex items-center justify-center text-[#1B2838] font-bold text-lg">
              RK
            </div>
            <div>
              <p className="text-[#F0EBE1] font-medium">Ronald Lee King</p>
              <p className="text-sm text-[#C9B99A]">Author, Founder of AASOTU Media Group LLC</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
