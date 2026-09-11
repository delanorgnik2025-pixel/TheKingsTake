import { useState } from 'react'
import { Link } from 'react-router'
import { Crown, Landmark, Users, ChevronDown, ChevronUp, BookOpen, MapPin } from 'lucide-react'
import { STRIPE_LINKS, isPlaceholder } from '@/config/stripe'
import { NewsletterSignup } from '@/components/NewsletterSignup'

const milestones = [
  {
    year: '1619',
    title: 'First Documented Arrival',
    summary: `Twenty-plus enslaved Angolans arrive at Point Comfort, Virginia. They are sold into bondage, marking the beginning of systematic, race-based chattel slavery in the English colonies that would become the United States.`,
    meaning: `This is not the first African presence in North America -- but it is the beginning of the specific, hereditary, race-based system that would define the FBA experience for 246 years.`,
    source: `Horn, James P. P. (2019). 1619: Jamestown and the Forging of American Democracy. Basic Books.`
  },
  {
    year: '1662',
    title: 'Partus Sequitur Ventrem',
    summary: `Virginia passes a law declaring that children born to enslaved mothers are enslaved for life, regardless of the father's status. This overturned English common law, where a child's status followed the father.`,
    meaning: `This law created hereditary slavery and fixed the FBA lineage to the American continent. For the next 200+ years, FBA people were born into bondage on this soil -- making us, by birth, a distinctly American population.`,
    source: `Morgan, Edmund S. (1975). American Slavery, American Freedom. W.W. Norton.`
  },
  {
    year: '1775-1783',
    title: 'Revolutionary War Service',
    summary: `An estimated 5,000 to 9,000 Black men fight in the Revolutionary War, including the legendary 1st Rhode Island Regiment. Many are promised freedom in exchange for service -- promises frequently broken after the war.`,
    meaning: `FBA ancestors fought for a nation that would not grant them citizenship for another 85 years. Their service proves the contradiction at America's heart: a nation built partly by people it refused to claim.`,
    source: `Lanning, Michael Lee (2000). African Americans in the Revolutionary War. Citadel Press.`
  },
  {
    year: '1787',
    title: 'The Three-Fifths Compromise',
    summary: `The Constitutional Convention agrees to count enslaved Black people as three-fifths of a person for purposes of representation and taxation. This compromise gives the South disproportionate political power.`,
    meaning: `The Constitution itself -- the supreme law of the land -- codified the fractional humanity of FBA ancestors. This is not abstract history. It is the legal foundation upon which American governance was built.`,
    source: `Wills, Garry (2003). "Negro President": Jefferson and the Slave Power. Houghton Mifflin.`
  },
  {
    year: '1808',
    title: 'Ban on Transatlantic Slave Trade',
    summary: `Congress bans the importation of enslaved Africans. The domestic slave trade explodes. By 1860, over 4 million enslaved people live in the U.S. -- the vast majority born on American soil, not imported.`,
    meaning: `After 1808, nearly every enslaved person in the United States was born here. FBA ancestors became the first multi-generational, African-descended population in the nation -- distinct from Africa not by choice, but by birth.`,
    source: `Deyle, Steven (2005). Carry Me Back: The Domestic Slave Trade in American Life. Oxford University Press.`
  },
  {
    year: '1863',
    title: 'Emancipation Proclamation',
    summary: `President Lincoln declares enslaved people in Confederate states free. It does not apply to border states loyal to the Union. The proclamation is military, moral, and political -- but legally narrow.`,
    meaning: `Freedom arrived in fragments. FBA people in Texas would not learn of their freedom for another two and a half years. The gap between legal emancipation and lived freedom defines the FBA experience to this day.`,
    source: `Guelzo, Allen C. (2004). Lincoln's Emancipation Proclamation: The End of Slavery in America. Simon & Schuster.`
  },
  {
    year: '1865',
    title: 'Juneteenth & the 13th Amendment',
    summary: `June 19, 1865 -- Union troops arrive in Galveston, Texas, informing the last enslaved FBA people of their freedom. December 1865 -- the 13th Amendment abolishes slavery nationwide.`,
    meaning: `Juneteenth is not just a holiday. It is the moment the last FBA ancestors learned they were no longer property. The 13th Amendment ended chattel slavery but left a loophole -- "except as punishment for crime" -- that would be exploited for the next 160 years.`,
    source: `Gates, Henry Louis Jr. (2019). Stony the Road: Reconstruction, White Supremacy, and the Rise of Jim Crow. Penguin Press.`
  },
  {
    year: '1868',
    title: 'The 14th Amendment',
    summary: `The 14th Amendment grants birthright citizenship to all persons born on U.S. soil. It was written specifically to guarantee citizenship to formerly enslaved FBA people.`,
    meaning: `This is the legal heart of FBA identity. For 200+ years, FBA people were born on this soil but denied citizenship. The Constitution had to be AMENDED to admit what was already true: we were here, we were born here, and we belong here.`,
    source: `Epps, Garrett (2006). Democracy Reborn: The Fourteenth Amendment and the Fight for Equal Rights in Post-Civil War America. Henry Holt.`
  },
  {
    year: '1870',
    title: 'The 15th Amendment & Reconstruction',
    summary: `The 15th Amendment grants Black men the right to vote. Hiram Revels of Mississippi becomes the first Black U.S. Senator. FBA people build schools, churches, businesses, and local governments across the South.`,
    meaning: `For a brief, shining moment, FBA people exercised full citizenship. The backlash -- the Ku Klux Klan, Black Codes, Jim Crow -- was swift and violent. But the Reconstruction experiment proved what FBA people could build when given access.`,
    source: `Foner, Eric (2014). Reconstruction: America's Unfinished Revolution, 1863-1877. Harper Perennial.`
  },
  {
    year: '1921',
    title: 'The Tulsa Race Massacre',
    summary: `Black Wall Street in Tulsa, Oklahoma -- one of the wealthiest Black communities in the nation -- is destroyed by a white mob. Up to 300 FBA people are killed. 35 square blocks are burned.`,
    meaning: `The massacre represents both the heights of FBA economic achievement and the violent suppression of that achievement. The wealth gap that persists today has direct roots in events like Tulsa, where generational wealth was not just lost -- it was stolen by force.`,
    source: `Ellsworth, Scott (2021). The Ground Breaking: An American City and Its Search for Justice. Dutton.`
  },
  {
    year: '1954-1968',
    title: 'The Civil Rights Movement',
    summary: `Brown v. Board (1954), the Montgomery Bus Boycott (1955-56), the Civil Rights Act (1964), the Voting Rights Act (1965), and the Fair Housing Act (1968) -- a multi-generational FBA-led movement to claim the rights promised in 1868.`,
    meaning: `The Civil Rights Movement was led primarily by FBA people -- church networks, local communities, families who had been in the South for generations. It was not imported. It was grown from the soil of FBA experience.`,
    source: `Branch, Taylor (1988). Parting the Waters: America in the King Years, 1954-63. Simon & Schuster.`
  },
  {
    year: '2020-Present',
    title: 'The FBA Identity Movement',
    summary: `The term Foundational Black American gains mainstream traction as a way for descendants of U.S. slavery to distinguish their specific ethnic experience within the broader Black diaspora.`,
    meaning: `FBA is not a rejection of Africa. It is an affirmation of American lineage born of unchosen circumstances. It is a demand to be seen as a distinct ethnic group with a distinct history -- not better than others, but different in experience.`,
    source: `Various -- the term has been popularized through independent media, academic discourse, and social movements since 2020.`
  }
]

export default function FoundationalBlackAmericanPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const bookLink = STRIPE_LINKS.bookPreOrder
  const bookIsPlaceholder = isPlaceholder(bookLink)

  return (
    <div className='min-h-screen bg-[#182635] text-white'>
      {/* Hero */}
      <section className='relative px-6 pt-20 pb-16 md:pt-28 md:pb-24 text-center'>
        <div className='max-w-3xl mx-auto'>
          <Crown className='w-12 h-12 text-[#FF9500] mx-auto mb-6' />
          <h1 className='font-serif text-3xl md:text-5xl font-bold leading-tight mb-4'>
            Dedicated to the Foundational Black American
          </h1>
          <div className='w-24 h-1 bg-[#FF9500] mx-auto mb-6' />
          <p className='text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed'>
            The descendants of those who arrived in bondage, built this nation in blood and labor, and still rose.
            This site -- and this book -- is for you.
          </p>
        </div>
      </section>

      {/* Definition */}
      <section className='px-6 py-12 bg-white/5'>
        <div className='max-w-3xl mx-auto'>
          <div className='flex items-center gap-3 mb-6'>
            <Landmark className='w-6 h-6 text-[#FF9500]' />
            <h2 className='font-serif text-2xl md:text-3xl font-bold'>Who Is the Foundational Black American?</h2>
          </div>
          <blockquote className='border-l-4 border-[#FF9500] pl-6 italic text-lg text-white/90 mb-8'>
            The Foundational Black American (FBA) is the descendant of Africans who were enslaved in what became the United States of America -- primarily arriving between 1619 and 1808, with lineages rooted in the soil of this nation for 400+ years. This is not a claim of nationality over others. It is a statement of lineage, history, and specific experience.
          </blockquote>
          <div className='grid md:grid-cols-3 gap-6'>
            <div className='bg-[#182635] border border-white/10 rounded-lg p-5'>
              <Users className='w-5 h-5 text-[#FF9500] mb-3' />
              <h3 className='font-semibold mb-2'>An Ethnic Identifier</h3>
              <p className='text-sm text-white/70'>Not a racial one. Race is Black. Ethnicity is FBA. Like Irish, Italian, or Jewish -- it describes a specific people with a specific history.</p>
            </div>
            <div className='bg-[#182635] border border-white/10 rounded-lg p-5'>
              <MapPin className='w-5 h-5 text-[#FF9500] mb-3' />
              <h3 className='font-semibold mb-2'>Rooted in American Soil</h3>
              <p className='text-sm text-white/70'>Distinct from recent African immigrants, Caribbean immigrants, and Afro-Latinos -- not better, but different in historical experience and lineage.</p>
            </div>
            <div className='bg-[#182635] border border-white/10 rounded-lg p-5'>
              <BookOpen className='w-5 h-5 text-[#FF9500] mb-3' />
              <h3 className='font-semibold mb-2'>A Specific Experience</h3>
              <p className='text-sm text-white/70'>Defined by chattel slavery, Reconstruction, Jim Crow, the Great Migration, Civil Rights, and the ongoing struggle for full citizenship and repair.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className='px-6 py-16'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='font-serif text-3xl md:text-4xl font-bold mb-4'>Foundational Milestones</h2>
            <p className='text-white/60 max-w-2xl mx-auto'>Twelve moments that define the FBA lineage. These are not just Black history. They are American history -- because we built America.</p>
          </div>
          <div className='space-y-4'>
            {milestones.map((m, i) => (
              <div
                key={i}
                className='border border-white/10 rounded-lg overflow-hidden bg-white/[0.03] hover:bg-white/[0.05] transition-colors'
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className='w-full flex items-center justify-between p-5 text-left'
                >
                  <div className='flex items-center gap-4'>
                    <span className='text-[#FF9500] font-bold text-lg font-serif min-w-[64px]'>{m.year}</span>
                    <span className='font-semibold text-base md:text-lg'>{m.title}</span>
                  </div>
                  {openIndex === i ? <ChevronUp className='w-5 h-5 text-white/50' /> : <ChevronDown className='w-5 h-5 text-white/50' />}
                </button>
                {openIndex === i && (
                  <div className='px-5 pb-5 pt-0 space-y-4'>
                    <p className='text-white/80 leading-relaxed'>{m.summary}</p>
                    <div className='bg-[#182635] border-l-4 border-[#FF9500] p-4 rounded-r-lg'>
                      <p className='text-sm text-white/90 font-medium mb-1'>Why It Matters to FBA Identity</p>
                      <p className='text-sm text-white/70'>{m.meaning}</p>
                    </div>
                    <p className='text-xs text-white/40'>Source: {m.source}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bridge to Book */}
      <section className='px-6 py-16 bg-[#FF9500]/10'>
        <div className='max-w-3xl mx-auto text-center'>
          <BookOpen className='w-10 h-10 text-[#FF9500] mx-auto mb-4' />
          <h2 className='font-serif text-2xl md:text-3xl font-bold mb-6'>
            Why <em>The African American State of the Union</em> Speaks to the FBA
          </h2>
          <div className='text-left space-y-4 text-white/80 leading-relaxed mb-10'>
            <p>
            We did not choose the name African American. It was given to us -- first as a term of dignity by our own leaders in the 1980s, then as a census category, then as a media default. Some wear it with pride. Some reject it entirely. Both are valid.
            </p>
            <p>
            This book uses the term because it is the term the world recognizes. But the content inside is FBA content. It is about the descendants of the enslaved. It is about the people who built the physical infrastructure of this nation, who fought in every American war, who survived Reconstruction and Jim Crow and the Great Migration and the Civil Rights Movement and the War on Drugs and the prison pipeline -- and who are still here.
            </p>
            <p>
            Whether you call yourself African American, Black American, FBA, or simply American -- if your people were here in chains and are still here fighting, this book was written for you.
            </p>
          </div>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a
              href={bookLink}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center justify-center gap-2 bg-[#FF9500] text-[#182635] font-bold px-8 py-3 rounded-full hover:bg-[#FF9500]/90 transition-colors'
            >
              <BookOpen className='w-5 h-5' />
              {bookIsPlaceholder ? 'Pre-Order via Cash App' : 'Pre-Order the Book -- $39.99'}
            </a>
            <Link
              to='/deep-roots'
              className='inline-flex items-center justify-center gap-2 border-2 border-[#FF9500] text-[#FF9500] font-bold px-8 py-3 rounded-full hover:bg-[#FF9500]/10 transition-colors'
            >
              <Crown className='w-5 h-5' />
              Join the Deep Roots Pass
            </Link>
          </div>
        </div>
      </section>

      {/* Email Community */}
      <section className='px-6 py-16'>
        <div className='max-w-xl mx-auto text-center'>
          <Users className='w-10 h-10 text-[#FF9500] mx-auto mb-4' />
          <h2 className='font-serif text-2xl font-bold mb-3'>Join the FBA Community List</h2>
          <p className='text-white/60 mb-8'>Get updates on FBA-focused content, historical deep-dives, and exclusive research drops. No spam.</p>
          <NewsletterSignup />
        </div>
      </section>

      {/* Footer */}
      <div className='px-6 py-8 border-t border-white/10 text-center'>
        <p className='text-white/40 text-sm'>
          The Kings Take -- Built for the Foundational Black American. Since 1619.
        </p>
      </div>
    </div>
  )
}
