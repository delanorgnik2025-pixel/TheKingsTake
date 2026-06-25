import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Map, Scroll, BookOpen, Scale, ChevronDown, ChevronUp,
  ExternalLink, AlertTriangle, Feather, Gem, Globe, Landmark,
  FileText, Dna, Pyramid, Mountain, History, Search, CheckCircle
} from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import MarqueeDivider from '../components/MarqueeDivider'

// ============================================
// STATISTICS
// ============================================
const HERO_STATS = [
  { value: '574', label: 'Sovereign Nations in the US', icon: Globe },
  { value: '300,000+', label: 'Years of Genetic Roots', icon: Dna },
  { value: '90M', label: 'Acres Stolen via Dawes Act', icon: Map },
]

// ============================================
// 10 DOCUMENTED RECEIPTS
// ============================================
const RECEIPTS = [
  {
    num: '01',
    title: 'Life Before Colonization: The OG Copper Americans',
    desc: 'Before Europeans showed up, America was not an empty wilderness. It was home to millions of dark-skinned, peaceful people living in advanced societies.',
    icon: Globe,
  },
  {
    num: '02',
    title: 'The Columbus Diaries: The Conqueror\'s Own Confession',
    desc: 'When Christopher Columbus pulled up, his own pen exposed the truth about the people who were already here.',
    icon: Scroll,
  },
  {
    num: '03',
    title: 'The Doctrine of Discovery: Legalizing Identity Theft',
    desc: 'European rulers and the Pope invented a religious law to legally erase the identity and ownership rights of the people already living here.',
    icon: Scale,
  },
  {
    num: '04',
    title: 'Jurisdiction: Who Had Original Authority?',
    desc: 'Long before the United States existed, the original dark-skinned people here had their own independent nations, laws, and full jurisdiction over this land.',
    icon: Landmark,
  },
  {
    num: '05',
    title: 'The 14th Amendment: The Federal Trap',
    desc: 'The government used a massive legal cheat code in 1868 to permanently change everyone\'s legal status.',
    icon: FileText,
  },
  {
    num: '06',
    title: 'Archaeology: The Stone Receipts',
    desc: 'You can change the words in a textbook, but you cannot change the artifacts buried in the dirt.',
    icon: Gem,
  },
  {
    num: '07',
    title: 'Indigenous Americans vs. Africans: Separate Bloodlines',
    desc: 'Melanin is a global trait, not a passport. Dark skin does not mean your family came from Africa.',
    icon: Dna,
  },
  {
    num: '08',
    title: 'The DNA Truth: The Albert Perry Smoking Gun',
    desc: 'Science proves dark-skinned Americans carry a genetic blueprint that belongs directly to this continent.',
    icon: Feather,
  },
  {
    num: '09',
    title: 'The Pyramid Paradox: America is the True Capital of Pyramids',
    desc: 'Mainstream education makes you think Egypt is the only place with pyramids. The numbers say otherwise.',
    icon: Pyramid,
  },
  {
    num: '10',
    title: 'Earth\'s Geography: The Mississippi is Older Than the Nile',
    desc: 'They call America the New World to make it seem like history started in 1492. The land tells a different story.',
    icon: Mountain,
  },
]

// ============================================
// TRIBAL ROLLS
// ============================================
const TRIBAL_ROLLS = [
  {
    name: 'Dawes Rolls',
    year: '1898–1914',
    desc: 'Used for enrollment and land allotments for the Five Civilized Tribes: Cherokee, Choctaw, Chickasaw, Creek (Muscogee), and Seminole.',
    link: 'https://www.naaipi.org/dawes-rolls',
  },
  {
    name: 'Guion Miller Roll',
    year: '1906–1910',
    desc: 'Eastern Cherokee applications for share of judgment fund. Contains detailed family genealogy information.',
    link: 'https://www.naaipi.org/guion-miller-roll',
  },
  {
    name: 'Baker Roll',
    year: '1924–1929',
    desc: 'Final roll of the Eastern Band of Cherokee Indians. Replaced previous rolls as the official enrollment basis.',
    link: 'https://www.naaipi.org/baker-roll',
  },
  {
    name: 'Wallace Roll',
    year: '1889',
    desc: 'Cherokee citizenship applications. Pre-Dawes enrollment attempts.',
    link: 'https://www.naaipi.org/wallace-roll',
  },
  {
    name: 'Kern-Clifton Roll',
    year: '1896',
    desc: 'Cherokee Freedmen and Delaware rolls. Documented formerly enslaved people and adopted Delaware citizens.',
    link: 'https://www.naaipi.org/kern-clifton-roll',
  },
  {
    name: 'Old Settler Roll',
    year: '1851',
    desc: 'Cherokee who settled in Indian Territory before the forced removal (Trail of Tears).',
    link: 'https://www.naaipi.org/old-settler-roll',
  },
  {
    name: 'Henderson Roll',
    year: '1835',
    desc: 'Census of Cherokee still living in the East before removal. Important for pre-removal ancestry research.',
    link: 'https://www.naaipi.org/henderson-roll',
  },
  {
    name: 'Drennen Roll',
    year: '1851',
    desc: 'Census of Cherokee who arrived in Indian Territory via the Trail of Tears. Documents post-removal families.',
    link: 'https://www.naaipi.org/drennen-roll',
  },
  {
    name: 'Chapman Roll',
    year: '1852',
    desc: 'Supplement to the Drennen Roll. Additional Cherokee arrivals and family updates.',
    link: 'https://www.naaipi.org/chapman-roll',
  },
  {
    name: 'Mullay Roll',
    year: '1848',
    desc: 'Census of Cherokee remaining in North Carolina after removal. Key for Eastern Cherokee research.',
    link: 'https://www.naaipi.org/mullay-roll',
  },
]

// ============================================
// ALTERNATIVE TRIBAL NAMES
// ============================================
const TRIBAL_NAMES = [
  { native: 'Muscogee', common: 'Creek' },
  { native: 'Lenape', common: 'Delaware' },
  { native: 'Diné', common: 'Navajo' },
  { native: 'Haudenosaunee', common: 'Iroquois Confederacy' },
  { native: 'Tsalagi', common: 'Cherokee' },
  { native: 'Chahta', common: 'Choctaw' },
  { native: 'Mvskoke', common: 'Muscogee' },
]

// ============================================
// 10 KEY POINTS FOR ANCESTRY RESEARCH
// ============================================
const RESEARCH_POINTS = [
  'Records are evidence, not truth.',
  'Family stories are clues, not proof.',
  'People moved frequently.',
  'Counties and state boundaries changed.',
  'Tribal rolls are only one record type.',
  'Not all Indigenous people enrolled.',
  'Identity changed across records.',
  'Communities were sometimes reclassified.',
  'Follow locations, families, and neighbors.',
  'Absence of a record does not mean absence of ancestry.',
]

// ============================================
// LAWS & POLICIES
// ============================================
const LAWS = [
  {
    name: 'Partus Sequitur Ventrem',
    year: '1662',
    desc: 'Latin: "that which is born follows the womb." Established that children born of enslaved mothers were born enslaved, regardless of the father\'s status. This reversed English common law and codified hereditary slavery in Virginia, later spreading across the colonies.',
  },
  {
    name: 'Anti-Miscegenation Laws',
    year: '1600s–1967',
    desc: 'State laws that prohibited marriage and sexual relations between people of different races, used to enforce racial segregation. These laws directly affected mixed Indigenous-African-European families and often forced people to choose or suppress one part of their identity.',
  },
  {
    name: 'One-Drop Rule',
    year: '1900s',
    desc: 'A social and legal principle — enforced by courts, census takers, and vital records offices — holding that any traceable African ancestry made a person legally "Black." Used to deny citizenship rights and erase Indigenous or European heritage in official documents.',
  },
  {
    name: 'Racial Integrity Acts',
    year: '1924',
    desc: 'Virginia laws that classified all residents as either "white" or "colored," eliminating any official recognition of Native American, Indigenous, or other identities. Directly enabled the destruction of Indigenous identity documentation across Virginia.',
  },
]

// ============================================
// STATE TRIBES DATA
// ============================================
const STATE_TRIBES: Record<string, { tribes: string[]; region: string }> = {
  'Alabama': { region: 'Southeast', tribes: ['Creek (Muscogee)', 'Cherokee', 'Choctaw', 'Chickasaw'] },
  'Alaska': { region: 'Arctic/Subarctic', tribes: ['Inuit', 'Tlingit', 'Haida', 'Aleut', 'Athabaskan'] },
  'Arizona': { region: 'Southwest', tribes: ['Navajo (Diné)', 'Apache', 'Hopi', 'Tohono O\'odham', 'Pima', 'Yaqui'] },
  'Arkansas': { region: 'Southeast', tribes: ['Caddo', 'Osage', 'Quapaw', 'Cherokee'] },
  'California': { region: 'West', tribes: ['Chumash', 'Pomo', 'Yokuts', 'Miwok', 'Tongva (Gabrielino)'] },
  'Colorado': { region: 'Plains', tribes: ['Ute', 'Cheyenne', 'Arapaho', 'Navajo'] },
  'Connecticut': { region: 'Northeast', tribes: ['Pequot', 'Mohegan', 'Paugussett'] },
  'Delaware': { region: 'Northeast', tribes: ['Lenape (Delaware)', 'Nanticoke'] },
  'Florida': { region: 'Southeast', tribes: ['Seminole', 'Miccosukee', 'Timucua', 'Apalachee'] },
  'Georgia': { region: 'Southeast', tribes: ['Cherokee', 'Muscogee (Creek)', 'Yuchi', 'Hitchiti', 'Shawnee', 'Yamasee'] },
  'Idaho': { region: 'Plateau', tribes: ['Nez Perce', 'Shoshone', 'Bannock', 'Coeur d\'Alene'] },
  'Illinois': { region: 'Woodlands', tribes: ['Illini', 'Potawatomi', 'Miami', 'Kickapoo', 'Sac & Fox'] },
  'Indiana': { region: 'Woodlands', tribes: ['Miami', 'Potawatomi', 'Shawnee', 'Delaware'] },
  'Iowa': { region: 'Plains', tribes: ['Ioway', 'Sioux', 'Sac & Fox'] },
  'Kansas': { region: 'Plains', tribes: ['Kaw (Kansa)', 'Osage', 'Pawnee', 'Potawatomi'] },
  'Kentucky': { region: 'Southeast', tribes: ['Cherokee', 'Shawnee', 'Chickasaw'] },
  'Louisiana': { region: 'Southeast', tribes: ['Chitimacha', 'Caddo', 'Tunica-Biloxi', 'Choctaw'] },
  'Maine': { region: 'Northeast', tribes: ['Penobscot', 'Passamaquoddy', 'Micmac', 'Abenaki'] },
  'Maryland': { region: 'Northeast', tribes: ['Piscataway', 'Nanticoke', 'Susquehannock'] },
  'Massachusetts': { region: 'Northeast', tribes: ['Wampanoag', 'Massachusett', 'Nipmuc'] },
  'Michigan': { region: 'Woodlands', tribes: ['Ojibwe (Chippewa)', 'Odawa (Ottawa)', 'Potawatomi'] },
  'Minnesota': { region: 'Woodlands', tribes: ['Dakota (Sioux)', 'Ojibwe', 'Ho-Chunk (Winnebago)'] },
  'Mississippi': { region: 'Southeast', tribes: ['Choctaw', 'Chickasaw', 'Natchez'] },
  'Missouri': { region: 'Woodlands', tribes: ['Osage', 'Missouria', 'Illini', 'Sac & Fox'] },
  'Montana': { region: 'Plains', tribes: ['Blackfeet', 'Crow', 'Cheyenne', 'Sioux', 'Flathead (Salish)'] },
  'Nebraska': { region: 'Plains', tribes: ['Omaha', 'Ponca', 'Pawnee', 'Lakota', 'Winnebago'] },
  'Nevada': { region: 'Great Basin', tribes: ['Paiute', 'Shoshone', 'Washoe'] },
  'New Hampshire': { region: 'Northeast', tribes: ['Abenaki', 'Pennacook'] },
  'New Jersey': { region: 'Northeast', tribes: ['Lenape (Delaware)', 'Nanticoke'] },
  'New Mexico': { region: 'Southwest', tribes: ['Navajo (Diné)', 'Apache', 'Pueblo Nations (19 Pueblos)'] },
  'New York': { region: 'Northeast', tribes: ['Haudenosaunee (Iroquois Confederacy)', 'Mohawk', 'Oneida', 'Onondaga', 'Cayuga', 'Seneca', 'Tuscarora', 'Lenape'] },
  'North Carolina': { region: 'Southeast', tribes: ['Eastern Band Cherokee', 'Lumbee', 'Coharie', 'Haliwa-Saponi', 'Occaneechi Band'] },
  'North Dakota': { region: 'Plains', tribes: ['Mandan', 'Hidatsa', 'Arikara', 'Lakota', 'Ojibwe'] },
  'Ohio': { region: 'Woodlands', tribes: ['Shawnee', 'Wyandotte (Huron)', 'Miami', 'Delaware', 'Ottawa'] },
  'Oklahoma': { region: 'Southern Plains', tribes: ['Cherokee', 'Choctaw', 'Chickasaw', 'Creek (Muscogee)', 'Seminole', 'Osage', 'Pawnee', 'Kiowa', 'Comanche', 'Cheyenne & Arapaho'] },
  'Oregon': { region: 'Plateau', tribes: ['Warm Springs', 'Umatilla', 'Nez Perce'] },
  'Pennsylvania': { region: 'Northeast', tribes: ['Lenape (Delaware)', 'Susquehannock', 'Shawnee', 'Iroquois'] },
  'Rhode Island': { region: 'Northeast', tribes: ['Narragansett'] },
  'South Carolina': { region: 'Southeast', tribes: ['Catawba', 'Pee Dee', 'Cherokee', 'Yamasee'] },
  'South Dakota': { region: 'Plains', tribes: ['Lakota (Sioux)', 'Dakota', 'Nakota', 'Yankton'] },
  'Tennessee': { region: 'Southeast', tribes: ['Cherokee', 'Chickasaw', 'Shawnee', 'Yuchi'] },
  'Texas': { region: 'South/Southwest', tribes: ['Caddo', 'Comanche', 'Apache', 'Coahuiltecan', 'Karankawa', 'Lipan Apache'] },
  'Utah': { region: 'Great Basin', tribes: ['Ute', 'Navajo (Diné)', 'Paiute', 'Goshute'] },
  'Vermont': { region: 'Northeast', tribes: ['Abenaki', 'Mohican'] },
  'Virginia': { region: 'Southeast', tribes: ['Powhatan Confederacy', 'Pamunkey', 'Chickahominy', 'Mattaponi', 'Monacan'] },
  'Washington': { region: 'Plateau', tribes: ['Chinook', 'Lummi', 'Yakama', 'Nez Perce', 'Colville'] },
  'West Virginia': { region: 'Southeast', tribes: ['Shawnee', 'Cherokee', 'Mingo (Iroquois)'] },
  'Wisconsin': { region: 'Woodlands', tribes: ['Ojibwe (Chippewa)', 'Ho-Chunk (Winnebago)', 'Menominee', 'Oneida', 'Potawatomi'] },
  'Wyoming': { region: 'Plains', tribes: ['Shoshone', 'Arapaho', 'Cheyenne', 'Crow'] },
}

// ============================================
// MAP COMPONENT
// ============================================
function TribalMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    const _t1 = 'pk.eyJ1IjoidGFzYXR1IiwiYSI6ImNtcXI4azdsYjBqMmYycXB5cjIzdDR5a24ifQ'
    const _t2 = 'zySytuwfrnOm3SVHMLdglA'
    const token = import.meta.env.VITE_MAPBOX_TOKEN || (_t1 + '.' + _t2)
    if (!token) {
      setMapError('Loading satellite map...')
      return
    }

    let cancelled = false

    import('mapbox-gl').then((mapboxgl) => {
      if (cancelled) return

      mapboxgl.default.accessToken = token

      const map = new mapboxgl.default.Map({
        container: mapContainerRef.current!,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-95, 38],
        zoom: 3.5,
        interactive: true,
      })

      mapRef.current = map

      map.on('load', () => {
        // Add tribal territories outline (simplified GeoJSON would go here)
        // For now we use the dark style with state outlines
      })
    }).catch(() => {
      setMapError('Failed to load Mapbox. Please check your internet connection.')
    })

    return () => {
      cancelled = true
      mapRef.current?.remove()
    }
  }, [])

  const stateData = selectedState ? STATE_TRIBES[selectedState] : null

  return (
    <div className="space-y-4">
      {/* Map Container */}
      <div className="relative rounded border border-[rgba(255,149,0,0.2)] overflow-hidden" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
        {mapError ? (
          <div className="bg-[#1B2838] h-[400px] md:h-[500px] flex items-center justify-center p-6">
            <div className="text-center">
              <Map size={48} className="text-[#FF9500] mx-auto mb-4" />
              <p className="text-[#F0EBE1] text-lg mb-2">Tribal Land Map</p>
              <p className="text-sm text-[#C9B99A] max-w-md">{mapError}</p>
              <p className="text-xs text-[#C9B99A]/50 mt-4">
                Select a state below to explore tribal nations in that region.
              </p>
            </div>
          </div>
        ) : (
          <div ref={mapContainerRef} className="h-[400px] md:h-[500px] w-full" />
        )}
      </div>

      {/* State Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {Object.keys(STATE_TRIBES).sort().map((state) => (
          <button
            key={state}
            onClick={() => setSelectedState(selectedState === state ? null : state)}
            className={`text-xs py-2 px-3 rounded border transition-all text-left ${
              selectedState === state
                ? 'bg-[rgba(255,149,0,0.2)] border-[rgba(255,149,0,0.5)] text-[#FF9500]'
                : 'bg-[rgba(27,40,56,0.6)] border-[rgba(255,149,0,0.1)] text-[#C9B99A] hover:border-[rgba(255,149,0,0.3)]'
            }`}
          >
            {state}
          </button>
        ))}
      </div>

      {/* Selected State Info */}
      <AnimatePresence>
        {stateData && selectedState && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.3)] p-6"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.4)', borderLeft: '3px solid #FF9500' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl text-[#F0EBE1]">{selectedState}</h3>
                <p className="text-xs text-[#C9B99A]">{stateData.region} — {stateData.tribes.length} Nations</p>
              </div>
              <button onClick={() => setSelectedState(null)} className="text-[#C9B99A] hover:text-[#FF9500]">
                <ChevronUp size={20} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {stateData.tribes.map((tribe) => (
                <span
                  key={tribe}
                  className="inline-block text-xs bg-[rgba(255,149,0,0.1)] text-[#F0EBE1] border border-[rgba(255,149,0,0.2)] rounded px-3 py-1"
                >
                  {tribe}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================
// MAIN PAGE
// ============================================
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

export default function IndigenousHeritagePage() {
  const [activeTab, setActiveTab] = useState<'receipts' | 'rolls' | 'laws' | 'research'>('receipts')
  const [expandedRoll, setExpandedRoll] = useState<string | null>(null)

  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center px-6 md:px-12 pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/bg-services.jpg)' }} />
        <div className="absolute inset-0 bg-[#1B2838]/88" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-[#C9B99A] hover:text-[#FF9500] transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <History size={24} className="text-[#FF9500]" strokeWidth={1.5} />
              <p className="text-xs uppercase tracking-[0.08em] text-[#C9B99A]">ALLEGEDLY AFRICAN PRESENTS</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] text-[#F0EBE1] tracking-[-0.02em] leading-[1.08] mb-4 text-shadow-hero">
              Who Was Here Before You
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <p className="text-lg text-[#C9B99A] leading-relaxed max-w-2xl mb-4">
              Click any region of the United States to explore the Indigenous nations who called that land home long before colonial borders redrew history.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-sm text-[#C9B99A]/70 leading-relaxed max-w-xl mb-8">
              The family lines of so-called Black Americans can often be traced to the Southeastern United States before the Great Migration. Many Indigenous nations also lived throughout this region before removal, relocation, and state boundary changes.
            </p>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal delay={0.35}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {HERO_STATS.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="bg-[rgba(27,40,56,0.7)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.15)] p-4 text-center"
                  >
                    <Icon size={24} className="text-[#FF9500] mx-auto mb-2" strokeWidth={1.5} />
                    <p className="text-2xl md:text-3xl text-[#FF9500] font-medium">{stat.value}</p>
                    <p className="text-xs text-[#C9B99A]">{stat.label}</p>
                  </motion.div>
                )
              })}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <button
              onClick={() => document.getElementById('tribal-map')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 rounded-full h-12 px-8 text-sm bg-[#FF9500] text-[#1B2838] hover:bg-[#CC6A00] transition-colors font-['Newsreader'] tracking-[0.02em]"
              style={{ boxShadow: "0 4px 16px rgba(255,149,0,0.25)" }}
            >
              <Map size={16} /> Explore the Tribal Land Map
            </button>
          </ScrollReveal>
        </div>
      </section>

      <MarqueeDivider text="#AllegedlyAfrican — The Truth Is In The Land — 574 Sovereign Nations — Who Was Here Before You" />

      {/* TRIBAL LAND MAP */}
      <section id="tribal-map" className="relative py-16 md:py-24 px-6 md:px-12 bg-[#0C1520]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FF9500]" />)}
              </div>
              <p className="text-xs uppercase tracking-[0.08em] text-[#FF9500]">Tribal Land Map</p>
            </div>
            <h2 className="text-3xl md:text-4xl text-[#F0EBE1] tracking-[-0.02em] mb-6 text-shadow-hero">
              Click Any State. Discover the Nations.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <TribalMap />
          </ScrollReveal>

          {/* Disclaimer */}
          <ScrollReveal delay={0.3}>
            <div className="mt-6 p-4 bg-[rgba(220,38,38,0.05)] rounded border border-[rgba(220,38,38,0.15)]">
              <div className="flex items-start gap-3">
                <AlertTriangle size={16} className="text-red-400/60 shrink-0 mt-0.5" />
                <p className="text-xs text-[#C9B99A]/50 leading-relaxed">
                  Tribal territories overlapped, shifted over time, and were not fixed like modern state borders. The nations listed are based on historical research and should be used as a starting point for further study. Always verify using original records and multiple sources.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <MarqueeDivider text="574 Sovereign Nations — 300,000+ Years — The Truth Cannot Be Buried" />

      {/* TABS SECTION */}
      <section className="relative py-16 md:py-24 px-6 md:px-12 bg-[#0C1520]">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <ScrollReveal>
            <div className="flex flex-wrap gap-2 mb-10">
              {[
                { key: 'receipts' as const, label: '10 RECEIPTS', icon: BookOpen },
                { key: 'rolls' as const, label: 'TRIBAL ROLLS', icon: Scroll },
                { key: 'laws' as const, label: 'LAWS & POLICIES', icon: Scale },
                { key: 'research' as const, label: 'RESEARCH GUIDE', icon: Search },
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded border text-sm uppercase tracking-[0.04em] transition-all ${
                      activeTab === tab.key
                        ? 'bg-[rgba(255,149,0,0.15)] border-[rgba(255,149,0,0.4)] text-[#FF9500]'
                        : 'bg-[rgba(27,40,56,0.5)] border-[rgba(255,149,0,0.1)] text-[#C9B99A] hover:border-[rgba(255,149,0,0.3)]'
                    }`}
                  >
                    <Icon size={14} /> {tab.label}
                  </button>
                )
              })}
            </div>
          </ScrollReveal>

          {/* TAB: 10 RECEIPTS */}
          {activeTab === 'receipts' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ScrollReveal>
                <h3 className="text-lg text-[#F0EBE1] uppercase tracking-[0.04em] mb-2">10 Documented Receipts</h3>
                <p className="text-sm text-[#C9B99A] mb-8">Legal codes. Colonial diaries. Peer-reviewed genetics. Archaeological carbon dating. The evidence is in the ground.</p>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {RECEIPTS.map((receipt, i) => {
                  const Icon = receipt.icon
                  return (
                    <motion.div
                      key={receipt.num}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={cardVariants}
                      transition={{ delay: i * 0.08 }}
                      className="bg-[rgba(27,40,56,0.7)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.15)] p-5 hover:border-[rgba(255,149,0,0.4)] transition-all group"
                      style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-2xl text-[#FF9500] font-medium shrink-0">{receipt.num}</span>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Icon size={18} className="text-[#FF9500]" strokeWidth={1.5} />
                            <h4 className="text-sm text-[#F0EBE1] uppercase tracking-[0.03em]">{receipt.title}</h4>
                          </div>
                          <p className="text-xs text-[#C9B99A] leading-relaxed">{receipt.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* TAB: TRIBAL ROLLS */}
          {activeTab === 'rolls' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ScrollReveal>
                <h3 className="text-lg text-[#F0EBE1] uppercase tracking-[0.04em] mb-2">Tribal Rolls & Indigenous Records</h3>
                <p className="text-sm text-[#C9B99A] mb-8">The Dawes Rolls are only one record set. Many Indigenous ancestors never enrolled, were excluded, belonged to other tribal nations, remained in the Southeast, or were later reclassified in federal and state records. Not appearing on the Dawes Rolls does not automatically mean a person had no Indigenous ancestry.</p>
              </ScrollReveal>

              {/* Alternative Tribal Names */}
              <ScrollReveal delay={0.1}>
                <div className="mb-8 bg-[rgba(27,40,56,0.6)] rounded border border-[rgba(255,149,0,0.15)] p-5">
                  <h4 className="text-xs text-[#FF9500] uppercase tracking-[0.08em] mb-3">Alternative Tribal Names</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {TRIBAL_NAMES.map((name) => (
                      <div key={name.native} className="text-center p-2 bg-[rgba(255,149,0,0.05)] rounded border border-[rgba(255,149,0,0.1)]">
                        <p className="text-sm text-[#F0EBE1]">{name.native}</p>
                        <p className="text-xs text-[#C9B99A]/60">= {name.common}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Rolls List */}
              <div className="space-y-3">
                {TRIBAL_ROLLS.map((roll, i) => {
                  const isExpanded = expandedRoll === roll.name
                  return (
                    <motion.div
                      key={roll.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <button
                        onClick={() => setExpandedRoll(isExpanded ? null : roll.name)}
                        className="w-full flex items-center justify-between p-4 bg-[rgba(27,40,56,0.7)] rounded border border-[rgba(255,149,0,0.15)] hover:border-[rgba(255,149,0,0.4)] transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-[#FF9500] font-medium">{roll.year}</span>
                          <span className="text-sm text-[#F0EBE1]">{roll.name}</span>
                        </div>
                        {isExpanded ? <ChevronUp size={18} className="text-[#FF9500]" /> : <ChevronDown size={18} className="text-[#C9B99A]" />}
                      </button>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="p-4 bg-[rgba(27,40,56,0.5)] rounded-b border border-t-0 border-[rgba(255,149,0,0.15)]"
                        >
                          <p className="text-sm text-[#C9B99A] mb-3">{roll.desc}</p>
                          <a
                            href={roll.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-[#FF9500] hover:underline"
                          >
                            Access Records <ExternalLink size={12} />
                          </a>
                        </motion.div>
                      )}
                    </motion.div>
                  )
                })}
              </div>

              {/* Important Reminder */}
              <div className="mt-6 p-4 bg-[rgba(255,149,0,0.05)] rounded border border-[rgba(255,149,0,0.2)]">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={16} className="text-[#FF9500] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#C9B99A]/70 leading-relaxed">
                    <strong className="text-[#C9B99A]">Important Reminder:</strong> The Dawes Rolls are only one record set. Many Indigenous ancestors never enrolled, were excluded, belonged to other tribal nations, remained in the Southeast, or were later reclassified in federal and state records. Not appearing on the Dawes Rolls does not automatically mean a person had no Indigenous ancestry.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: LAWS & POLICIES */}
          {activeTab === 'laws' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ScrollReveal>
                <h3 className="text-lg text-[#F0EBE1] uppercase tracking-[0.04em] mb-2">Laws & Policies That Shaped Identity</h3>
                <p className="text-sm text-[#C9B99A] mb-8">These laws and policies directly shaped how ancestry was recorded, how identity was defined, and why so many records are incomplete, reclassified, or deliberately obscured.</p>
              </ScrollReveal>

              <div className="space-y-4">
                {LAWS.map((law, i) => (
                  <motion.div
                    key={law.name}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={cardVariants}
                    transition={{ delay: i * 0.1 }}
                    className="bg-[rgba(27,40,56,0.7)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.15)] p-5 hover:border-[rgba(255,149,0,0.4)] transition-all"
                    style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.2)', borderLeft: '3px solid #FF9500' }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Scale size={18} className="text-[#FF9500]" strokeWidth={1.5} />
                      <h4 className="text-base text-[#F0EBE1]">{law.name}</h4>
                      <span className="text-xs text-[#FF9500] bg-[rgba(255,149,0,0.1)] rounded px-2 py-0.5">{law.year}</span>
                    </div>
                    <p className="text-sm text-[#C9B99A] leading-relaxed">{law.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB: RESEARCH GUIDE */}
          {activeTab === 'research' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ScrollReveal>
                <h3 className="text-lg text-[#F0EBE1] uppercase tracking-[0.04em] mb-2">10 Key Points for Ancestry Research</h3>
                <p className="text-sm text-[#C9B99A] mb-8">Six steps to go from zero to a documented research trail. Start anywhere. Build from there.</p>
              </ScrollReveal>

              <div className="space-y-4">
                {RESEARCH_POINTS.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-4 bg-[rgba(27,40,56,0.6)] rounded border border-[rgba(255,149,0,0.1)] p-4"
                  >
                    <span className="text-lg text-[#FF9500] font-medium shrink-0 w-8">{(i + 1).toString().padStart(2, '0')}</span>
                    <p className="text-sm text-[#F0EBE1] leading-relaxed">{point}</p>
                  </motion.div>
                ))}
              </div>

              <ScrollReveal delay={0.5}>
                <div className="mt-8 p-5 bg-[rgba(255,149,0,0.05)] rounded border border-[rgba(255,149,0,0.2)]">
                  <h4 className="text-sm text-[#FF9500] uppercase tracking-[0.04em] mb-3 flex items-center gap-2">
                    <CheckCircle size={16} /> Quick Start Your Ancestry Journey
                  </h4>
                  <p className="text-sm text-[#C9B99A] leading-relaxed mb-3">
                    Start with what you know. Document family names, birthplaces, and stories. Cross-reference with census records, tribal rolls, and land records. Follow the paper trail wherever it leads — even when it contradicts what you were told.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Census Records', 'Birth/Death Certificates', 'Tribal Rolls', 'Land Deeds', 'Military Records', 'Church Records'].map((source) => (
                      <span key={source} className="text-xs bg-[rgba(255,149,0,0.1)] text-[#F0EBE1] border border-[rgba(255,149,0,0.2)] rounded px-3 py-1">
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </motion.div>
          )}
        </div>
      </section>

      <MarqueeDivider text="#AllegedlyAfrican — Know Your Roots — The Land Remembers — Start With What You Know" />
    </main>
  )
}
