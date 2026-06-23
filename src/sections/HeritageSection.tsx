import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Map, ChevronUp, ChevronDown, ExternalLink, Phone, Globe, FileText, Landmark, Dna, Scroll, BookOpen, Users, MapPin, AlertTriangle } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || ''

// ============================================
// TRIBE DATABASE — Clickable detailed info
// ============================================
interface TribeDetail {
  name: string
  alsoKnownAs: string[]
  location: string
  status: string
  population: string
  language: string
  history: string
  currentStatus: string
  resources: { label: string; url: string }[]
}

const TRIBE_DB: Record<string, TribeDetail> = {
  'Muscogee (Creek) Nation': {
    name: 'Muscogee (Creek) Nation',
    alsoKnownAs: ['Creek', 'Muscogee', 'Mvskoke'],
    location: 'Oklahoma (historically Alabama, Georgia, Florida)',
    status: 'Federally Recognized',
    population: 'Approximately 90,000 enrolled citizens',
    language: 'Mvskoke (Creek/Muskogee) — classified as endangered',
    history: 'The Muscogee people are descendants of the Mississippian culture that built mound cities throughout the Southeast. They formed the Creek Confederacy — a union of multiple towns (talwa) speaking related languages. During the 18th century, they became known as "Creek" by British traders due to the Ocmulgee River\'s network of streams. The Muscogee were one of the "Five Civilized Tribes" forcibly removed to Indian Territory (Oklahoma) on the Trail of Tears between 1836-1837. Today they are the fourth-largest federally recognized tribe in the United States.',
    currentStatus: 'Headquartered in Okmulgee, Oklahoma. Operates their own government, court system, healthcare facilities, and educational programs. The Muscogee Nation v. Oklahoma Supreme Court decision in 2020 reaffirmed their reservation boundaries covering most of eastern Oklahoma.',
    resources: [
      { label: 'Official Website', url: 'https://www.muscogee.nation' },
      { label: 'Tribal Enrollment', url: 'https://www.muscogee.nation/services/citizenship' },
    ],
  },
  'Cherokee Nation': {
    name: 'Cherokee Nation',
    alsoKnownAs: ['Tsalagi', 'Ani-Yun-Wiya', 'Principal Cherokee'],
    location: 'Oklahoma (historically Georgia, North Carolina, Tennessee, Alabama, South Carolina)',
    status: 'Federally Recognized — Largest tribal government in the United States',
    population: 'Over 450,000 enrolled citizens',
    language: 'Cherokee (Tsalagi) — written syllabary invented by Sequoyah in 1821',
    history: 'The Cherokee are an Iroquoian-speaking people who inhabited the southeastern United States for thousands of years. They developed one of the most advanced Indigenous nations — with a written constitution, bilingual newspaper (Cherokee Phoenix), and a sophisticated political system. The discovery of gold on Cherokee land in Georgia in 1829 led to intense pressure for removal. Despite winning in the Supreme Court (Worcester v. Georgia, 1832), President Andrew Jackson refused to enforce the ruling. The Treaty of New Echota (1835), signed by an unauthorized minority faction, led to the Trail of Tears (1838-1839), during which approximately 4,000 Cherokee died. The Eastern Band of Cherokee Indians remained in North Carolina.',
    currentStatus: 'Headquartered in Tahlequah, Oklahoma. The Cherokee Nation operates the largest tribal health system in the country, multiple casinos, and extensive cultural preservation programs. They have their own constitutional government with executive, legislative, and judicial branches.',
    resources: [
      { label: 'Official Website', url: 'https://www.cherokee.org' },
      { label: 'Tribal Enrollment', url: 'https://www.cherokee.org/government/citizenship' },
      { label: 'Cherokee Phoenix Newspaper', url: 'https://www.cherokeephoenix.org' },
    ],
  },
  'Yuchi': {
    name: 'Yuchi',
    alsoKnownAs: ['Euchee', 'Tsoyaha ("Children of the Sun")'],
    location: 'Oklahoma (historically Georgia, Alabama, Tennessee)',
    status: 'Not federally recognized independently; some enrolled with Muscogee Creek Nation',
    population: 'Estimated 1,000-2,000 descendants',
    language: 'Yuchi — language isolate (not related to any other known language). Critically endangered with fewer than 5 fluent speakers.',
    history: 'The Yuchi are one of the most ancient peoples of the Southeast, predating both Creek and Cherokee presence in the region. Their oral history claims they "came from the sun" — a reference to their southeastern origins. They maintained a distinct identity even while living among Creek towns. The Yuchi language is a linguistic isolate, meaning it has no known relation to any other language family in the world. During removal, Yuchi people were scattered. Many were forcibly relocated to Oklahoma with the Creek Nation, while some remained in Georgia and Tennessee, assimilating into local populations.',
    currentStatus: 'The Yuchi people continue their fight for federal recognition. The Euchee/Yuchi Language Project works to revitalize their critically endangered language. They maintain ceremonial grounds in both Oklahoma and Florida.',
    resources: [
      { label: 'Euchee/Yuchi Language Project', url: 'https://yuchilanguage.org' },
    ],
  },
  'Hitchiti': {
    name: 'Hitchiti',
    alsoKnownAs: ['Atcik-háta', 'Mikasuki'],
    location: 'Florida, Oklahoma (historically Georgia, Alabama)',
    status: 'Not federally recognized independently',
    population: 'Unknown; merged with Seminole and Miccosukee peoples',
    language: 'Hitchiti-Mikasuki — Muskogean language, critically endangered',
    history: 'The Hitchiti were a Muskogean-speaking people closely related to the Muscogee (Creek). They inhabited central Georgia before European contact. Many Hitchiti people migrated to Florida during the Creek Wars and became founding members of the Seminole and Miccosukee tribes. Their language, Hitchiti-Mikasuki, is still spoken by some Seminole and Miccosukee elders in Florida.',
    currentStatus: 'The Hitchiti people are primarily represented through the Seminole Tribe of Florida and the Miccosukee Tribe of Indians. The Hitchiti-Mikasuki language is still spoken by a small number of elders and is the subject of active preservation efforts.',
    resources: [
      { label: 'Seminole Tribe of Florida', url: 'https://www.seminoletribe.com' },
    ],
  },
  'Shawnee': {
    name: 'Shawnee',
    alsoKnownAs: ['Shaawanwaki', 'Shawanese', 'Lenni Shawnee'],
    location: 'Oklahoma (historically Ohio, Pennsylvania, West Virginia, Kentucky, Tennessee, Georgia)',
    status: 'Federally Recognized (three separate tribes)',
    population: 'Approximately 15,000 enrolled across all Shawnee tribes',
    language: 'Shawnee (Algonquian) — severely endangered with few fluent speakers',
    history: 'The Shawnee are an Algonquian-speaking people who originally inhabited the Ohio River Valley. Known as fierce warriors and respected diplomats, they were frequently displaced by expanding colonial settlements. The Shawnee leader Tecumseh organized a massive pan-Indian confederacy to resist American expansion. Some Shawnee bands migrated south to Georgia and Florida, becoming part of the Seminole nation. Most Shawnee were removed to Indian Territory (Oklahoma) in the 1830s.',
    currentStatus: 'Three federally recognized Shawnee tribes exist today: the Absentee Shawnee Tribe, the Eastern Shawnee Tribe of Oklahoma, and the Shawnee Tribe. Each operates its own government in Oklahoma.',
    resources: [
      { label: 'Shawnee Tribe', url: 'https://www.shawnee-tribe.com' },
      { label: 'Absentee Shawnee Tribe', url: 'https://astribe.com' },
    ],
  },
  'Yamasee': {
    name: 'Yamasee',
    alsoKnownAs: ['Yemassee', 'Yamassee Nation of the South', 'Yamasi'],
    location: 'South Carolina, Georgia, Florida',
    status: 'Not federally recognized; state-recognized by South Carolina in 2023',
    population: 'Unknown; descendants scattered across the Southeast',
    language: 'Extinct — possibly Muskogean or a distinct language',
    history: 'The Yamasee were a multi-ethnic confederation of peoples who inhabited coastal Georgia and South Carolina. They were central players in the Yamasee War of 1715 — one of the most significant Indigenous uprisings against British colonists. After the war, Yamasee peoples scattered. Some joined the Seminole in Florida, some relocated to Louisiana, and others remained in South Carolina, where they gradually intermarried with African-American and European populations. In 2023, the Yemassee people received state recognition from South Carolina.',
    currentStatus: 'The Yamassee Nation in South Carolina received state recognition in 2023. Descendants continue to work toward federal recognition. The Yamasee War is considered a pivotal moment in southern Indigenous history.',
    resources: [
      { label: 'Yamassee Nation', url: 'https://www.yamasseenation.com' },
    ],
  },
}

// ============================================
// EXPANDABLE TREATY DATABASE
// ============================================
interface TreatyDetail {
  name: string
  year: string
  fullText: string
  signatories: string[]
  impact: string
}

const TREATY_DB: Record<string, TreatyDetail[]> = {
  'Georgia': [
    {
      name: 'Treaty of New York (Creek)',
      year: '1790',
      fullText: 'Signed on August 7, 1790, at New York City between the United States and the Creek Nation. This was the first treaty between the Creek and the U.S. federal government under the new Constitution. Alexander McGillivray, a Creek leader of Scottish-Creek descent, negotiated on behalf of the Creeks.\n\nKEY TERMS:\n- The Creek Nation acknowledged themselves to be under the protection of the United States\n- Boundaries were defined between Creek territory and the United States\n- The Creeks agreed to deliver up any criminals who committed offenses against U.S. citizens\n- The U.S. agreed to regulate trade and prevent unauthorized settlement on Creek lands\n- The Creeks were promised annual supplies worth $1,500\n\nHISTORICAL SIGNIFICANCE:\nThis treaty established the framework for Creek-U.S. relations and set the precedent for all subsequent southeastern Indian treaties. McGillivray received a commission as a brigadier general in the U.S. Army — the first Native American to hold that rank.',
      signatories: ['United States', 'Creek Nation (Muscogee)'],
      impact: 'Established federal authority over Creek affairs and set precedent for all southeastern Indian treaties.',
    },
    {
      name: 'Treaty of Indian Springs',
      year: '1825',
      fullText: 'Signed on February 12, 1825, at Indian Springs, Georgia. This was one of the most controversial treaties in American history.\n\nKEY TERMS:\n- William McIntosh and a small faction of Creek leaders ceded ALL remaining Creek lands in Georgia\n- The cession included approximately 22 million acres\n- In exchange, the signers received personal financial compensation\n- The treaty violated Creek law which required National Council approval for land cessions\n\nTHE CONTROVERSY:\nMcIntosh was the cousin of Georgia Governor George Troup and had significant personal debts. The treaty was negotiated in secret and signed by only a fraction of Creek leadership — without approval of the Creek National Council.\n\nCONSEQUENCES:\n- The Creek National Council declared the treaty void\n- McIntosh was charged with treason under Creek law\n- On April 30, 1825, a war party led by Menawa burned McIntosh\'s house and executed him\n- His son-in-law, Samuel Hawkins, was also killed\n- The U.S. Senate narrowly ratified the treaty despite protests\n- President John Quincy Adams initially opposed ratification but eventually acquiesced\n\nHISTORICAL SIGNIFICANCE:\nThe Treaty of Indian Springs demonstrates how treaty negotiations were often manipulated through bribery, personal debts, and manipulation of individual leaders — bypassing the democratic processes of tribal nations.',
      signatories: ['United States', 'William McIntosh (unauthorized Creek faction)'],
      impact: 'Led to the execution of William McIntosh by the Creek National Council. Demonstrated how treaties were manipulated through bribery.',
    },
  ],
}

// ============================================
// STATE DATA (abbreviated for file size)
// ============================================
interface StateData {
  tribes: string[]
  laws: { name: string; year: string; desc: string }[]
  treaties: { name: string; year: string; desc: string }[]
  vitalRecords: {
    office: string
    address: string
    phone: string
    website: string
    deathCertProcess: string
    birthCertProcess: string
    indianAffairs?: string
  }
}

const STATE_DATA: Record<string, StateData> = {
  'Georgia': {
    tribes: ['Muscogee (Creek) Nation', 'Cherokee Nation', 'Yuchi', 'Hitchiti', 'Shawnee', 'Yamasee'],
    laws: [
      { name: 'Georgia Cherokee Laws', year: '1829-1831', desc: 'Georgia passed laws extending state jurisdiction over Cherokee territory, making Cherokee laws illegal and Cherokee government powers void within the state.' },
      { name: 'Indian Removal Act', year: '1830', desc: 'Authorized forced removal of Cherokee, Creek, and other southeastern tribes west of the Mississippi River.' },
    ],
    treaties: [
      { name: 'Treaty of New York (Creek)', year: '1790', desc: 'First treaty between U.S. and Creek Nation. Established peace and defined boundaries.' },
      { name: 'Treaty of Indian Springs', year: '1825', desc: 'Controversial treaty where McIntosh faction ceded all Creek lands in Georgia. McIntosh was executed by Creek National Council.' },
    ],
    vitalRecords: {
      office: 'Georgia Department of Public Health, Vital Records',
      address: '1680 Phoenix Boulevard, Suite 100, Atlanta, GA 30349',
      phone: '(404) 679-4701',
      website: 'https://dph.georgia.gov/vital-records',
      deathCertProcess: 'Mail, online via ROVER, or in-person. $25 per copy. Processing 8-10 weeks.',
      birthCertProcess: 'Same process. Online ordering available. Must show valid ID.',
      indianAffairs: 'Georgia Council on American Indian Concerns: (404) 656-3883',
    },
  },
  'Oklahoma': {
    tribes: ['Cherokee Nation', 'Choctaw Nation', 'Chickasaw Nation', 'Muscogee (Creek) Nation', 'Seminole Nation', 'Osage Nation', 'Kiowa Tribe', 'Comanche Nation'],
    laws: [
      { name: 'Dawes Act', year: '1887', desc: 'Divided tribal lands into individual plots. Oklahoma tribes lost millions of acres.' },
      { name: 'Curtis Act', year: '1898', desc: 'Abolished tribal courts in Indian Territory. Forced allotment on Five Civilized Tribes.' },
    ],
    treaties: [
      { name: 'Reconstruction Treaties', year: '1866', desc: 'Five Civilized Tribes forced to sign after Civil War. Freedmen granted tribal citizenship.' },
    ],
    vitalRecords: {
      office: 'Oklahoma State Department of Health, Vital Records',
      address: '1000 NE 10th Street, Oklahoma City, OK 73117',
      phone: '(405) 426-8782',
      website: 'https://oklahoma.gov/health/records.html',
      deathCertProcess: 'Mail or online via VitalChek. $15 per copy. 6-8 weeks.',
      birthCertProcess: 'Same process. Online ordering available.',
      indianAffairs: 'Oklahoma Indian Affairs Commission: (405) 521-4211',
    },
  },
  'North Carolina': {
    tribes: ['Eastern Band of Cherokee Indians', 'Lumbee Tribe', 'Coharie', 'Haliwa-Saponi', 'Occaneechi Band'],
    laws: [
      { name: 'North Carolina Recognition Act', year: '1971', desc: 'First state to officially recognize Native American tribes through legislative action.' },
      { name: 'Lumbee Recognition Efforts', year: '1885-Present', desc: 'Lumbee have sought federal recognition for over 130 years.' },
    ],
    treaties: [
      { name: 'Treaty of Hopewell (Cherokee)', year: '1785', desc: 'First treaty between U.S. and Cherokee. Defined boundaries and established peace.' },
      { name: 'Treaty of New Echota', year: '1835', desc: 'Signed by unauthorized Cherokee faction. Led to Trail of Tears. Eastern Band remained in NC.' },
    ],
    vitalRecords: {
      office: 'North Carolina Vital Records',
      address: '1903 Mail Service Center, Raleigh, NC 27699-1903',
      phone: '(919) 733-3000',
      website: 'https://www.ncdhhs.gov/divisions/public-health/vital-records',
      deathCertProcess: 'Mail or online via VitalChek. $10 per copy. 6-8 weeks.',
      birthCertProcess: 'Same process. Online ordering available.',
      indianAffairs: 'NC Commission of Indian Affairs: (919) 733-5998',
    },
  },
  'Alabama': {
    tribes: ['Poarch Band of Creek Indians', 'Muscogee Creek Nation (historical)', 'Cherokee (historical)'],
    laws: [
      { name: 'Indian Removal Act Impact', year: '1830', desc: 'Forced removal of Creek and Cherokee from Alabama.' },
    ],
    treaties: [
      { name: 'Treaty of Fort Jackson', year: '1814', desc: 'Ceded 23 million acres of Creek land after Creek War.' },
    ],
    vitalRecords: {
      office: 'Alabama Center for Health Statistics',
      address: 'RSA Tower, 201 Monroe Street, Suite 1150, Montgomery, AL 36104',
      phone: '(334) 206-5418',
      website: 'https://www.alabamapublichealth.gov/vitalrecords/',
      deathCertProcess: 'Mail-in with valid ID. $15 per copy. 5-10 business days.',
      birthCertProcess: 'Same as death certificates.',
      indianAffairs: 'Alabama Indian Affairs Commission: (334) 242-2835',
    },
  },
  'Virginia': {
    tribes: ['Pamunkey Indian Tribe', 'Chickahominy', 'Mattaponi', 'Upper Mattaponi', 'Monacan Indian Nation'],
    laws: [
      { name: 'Racial Integrity Act of 1924', year: '1924', desc: 'Classified all Virginians as "white" or "colored." Erased Native American identity from records.' },
      { name: 'Virginia Tribal Recognition', year: '1980s-Present', desc: 'State began recognizing tribes. Federal recognition granted to 6 tribes in 2018.' },
    ],
    treaties: [
      { name: 'Treaty of Middle Plantation', year: '1677', desc: 'Established peace between Virginia colony and Powhatan Confederacy tribes.' },
    ],
    vitalRecords: {
      office: 'Virginia Department of Health, Vital Records',
      address: 'P.O. Box 1000, Richmond, VA 23218',
      phone: '(804) 662-6200',
      website: 'https://www.vdh.virginia.gov/vital-records/',
      deathCertProcess: 'Mail, online, or in-person. $12 per copy. 2-4 weeks.',
      birthCertProcess: 'Same process.',
      indianAffairs: 'Virginia Council on Indians: (804) 225-2098',
    },
  },
  'South Carolina': {
    tribes: ['Catawba Indian Nation', 'Pee Dee Indian Tribe', 'Waccamaw Indian People', 'Yamasee (state-recognized 2023)'],
    laws: [
      { name: 'SC Termination Policy', year: '1962', desc: 'State terminated recognition of Catawba. Federal recognition restored 1993.' },
    ],
    treaties: [
      { name: 'Treaty of Pine Tree Hill', year: '1760', desc: 'Catawba ceded large tracts to South Carolina colony.' },
    ],
    vitalRecords: {
      office: 'South Carolina Department of Health, Vital Records',
      address: '2600 Bull Street, Columbia, SC 29201',
      phone: '(803) 898-3630',
      website: 'https://www.sc.gov/dhec/VitalRecords',
      deathCertProcess: 'Mail or online via VitalChek. $12 per copy. 4-6 weeks.',
      birthCertProcess: 'Same process.',
      indianAffairs: 'SC Commission for Minority Affairs: (803) 333-9621',
    },
  },
  'Florida': {
    tribes: ['Seminole Tribe of Florida', 'Miccosukee Tribe', 'Poarch Creek (related)'],
    laws: [
      { name: 'Seminole Wars', year: '1817-1858', desc: 'Three wars resulting in forced removal of most Seminoles to Indian Territory.' },
    ],
    treaties: [
      { name: 'Treaty of Payne\'s Landing', year: '1832', desc: 'Seminole agreed to removal west. Signed under duress.' },
    ],
    vitalRecords: {
      office: 'Florida Bureau of Vital Statistics',
      address: '1217 Pearl Street, Jacksonville, FL 32202',
      phone: '(904) 359-6900',
      website: 'https://www.floridahealth.gov/certificates/',
      deathCertProcess: 'Online via VitalChek or mail. $9 per copy + local fee. 3-5 days.',
      birthCertProcess: 'Same process.',
      indianAffairs: 'Florida Governor\'s Council on Indian Affairs: (850) 487-0914',
    },
  },
  'Texas': {
    tribes: ['Alabama-Coushatta Tribe', 'Kickapoo Traditional Tribe', 'Ysleta del Sur Pueblo (Tigua)'],
    laws: [
      { name: 'Texas Indian Commission Abolished', year: '1989', desc: 'State eliminated Texas Indian Commission.' },
    ],
    treaties: [
      { name: 'Cherokee Treaty of 1836', year: '1836', desc: 'Sam Houston negotiated with Cherokee. Republic of Texas later violated it.' },
    ],
    vitalRecords: {
      office: 'Texas Vital Statistics',
      address: '1100 W. 49th Street, Austin, TX 78756',
      phone: '(888) 963-7111',
      website: 'https://www.dshs.texas.gov/vs/',
      deathCertProcess: 'Online via Texas.gov or mail. $20 per copy. 10-15 days.',
      birthCertProcess: 'Same process.',
      indianAffairs: 'Texas Historical Commission: (512) 463-6100',
    },
  },
  'New York': {
    tribes: ['Seneca Nation', 'Oneida', 'Onondaga', 'Cayuga', 'Mohawk', 'Tuscarora', 'Shinnecock'],
    laws: [
      { name: 'Treaty of Canandaigua Implementation', year: '1794-Present', desc: 'Treaty guaranteeing Six Nations lands. Still active and contested.' },
    ],
    treaties: [
      { name: 'Treaty of Canandaigua', year: '1794', desc: 'Recognized sovereignty of Six Nations. One of the few treaties still honored.' },
      { name: 'Treaty of Big Tree (Seneca)', year: '1797', desc: 'Seneca retained 4 reservations. Corruption in process widely documented.' },
    ],
    vitalRecords: {
      office: 'New York State Department of Health, Vital Records',
      address: '800 North Pearl Street, Menands, NY 12204',
      phone: '(855) 322-1022',
      website: 'https://www.health.ny.gov/vital_records/',
      deathCertProcess: 'Mail or online via VitalChek. $30 per copy. 8-10 weeks.',
      birthCertProcess: 'Same process.',
      indianAffairs: 'New York State Indian Affairs: (518) 474-0510',
    },
  },
  'New Mexico': {
    tribes: ['Navajo Nation (Diné)', '19 Pueblo Nations', 'Mescalero Apache', 'Jicarilla Apache'],
    laws: [
      { name: 'Pueblo Lands Act', year: '1924', desc: 'Confirmed Pueblo land titles disputed since Mexican-American War.' },
    ],
    treaties: [
      { name: 'Treaty of Guadalupe Hidalgo', year: '1848', desc: 'Ended Mexican-American War. Guaranteed Pueblo property rights under U.S. law.' },
      { name: 'Navajo-Bosque Redondo Treaty', year: '1868', desc: 'Navajo returned to homeland from internment.' },
    ],
    vitalRecords: {
      office: 'New Mexico Department of Health, Vital Records',
      address: '1190 St. Francis Drive, Santa Fe, NM 87505',
      phone: '(505) 827-2338',
      website: 'https://www.nmhealth.org/about/vital_records/',
      deathCertProcess: 'Mail or in-person. $10 per copy. Same-day if in-person.',
      birthCertProcess: 'Same process.',
      indianAffairs: 'NM Indian Affairs Department: (505) 476-1600',
    },
  },
}

const POPULAR_STATES = ['Georgia', 'Oklahoma', 'North Carolina', 'Virginia', 'South Carolina', 'Alabama', 'Florida', 'Texas', 'New York', 'New Mexico']

// ============================================
// TRIBE DETAIL COMPONENT
// ============================================
function TribeDetailPanel({ tribeName, onClose }: { tribeName: string; onClose: () => void }) {
  const tribe = TRIBE_DB[tribeName]
  if (!tribe) return (
    <div className="bg-[rgba(27,40,56,0.7)] rounded border border-[rgba(255,149,0,0.15)] p-5">
      <p className="text-sm text-[#C9B99A]">Detailed information for {tribeName} is being compiled. Check back soon.</p>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.3)] p-5 md:p-6 space-y-4"
      style={{ borderLeft: '3px solid #FF9500' }}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-lg text-[#F0EBE1]">{tribe.name}</h4>
        <button onClick={onClose} className="text-[#C9B99A] hover:text-[#FF9500] transition-colors">
          <ChevronUp size={18} />
        </button>
      </div>

      {tribe.alsoKnownAs.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tribe.alsoKnownAs.map((aka) => (
            <span key={aka} className="text-xs bg-[rgba(255,149,0,0.1)] text-[#FFB840] rounded px-2 py-0.5">
              Also: {aka}
            </span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <div className="flex items-start gap-2">
          <MapPin size={14} className="text-[#FF9500] shrink-0 mt-1" />
          <div><span className="text-[#C9B99A]">Location:</span> <span className="text-[#F0EBE1]">{tribe.location}</span></div>
        </div>
        <div className="flex items-start gap-2">
          <FileText size={14} className="text-[#FF9500] shrink-0 mt-1" />
          <div><span className="text-[#C9B99A]">Status:</span> <span className="text-[#F0EBE1]">{tribe.status}</span></div>
        </div>
        <div className="flex items-start gap-2">
          <Users size={14} className="text-[#FF9500] shrink-0 mt-1" />
          <div><span className="text-[#C9B99A]">Population:</span> <span className="text-[#F0EBE1]">{tribe.population}</span></div>
        </div>
        <div className="flex items-start gap-2">
          <BookOpen size={14} className="text-[#FF9500] shrink-0 mt-1" />
          <div><span className="text-[#C9B99A]">Language:</span> <span className="text-[#F0EBE1]">{tribe.language}</span></div>
        </div>
      </div>

      <div>
        <h5 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-2">History</h5>
        <p className="text-sm text-[#C9B99A] leading-relaxed">{tribe.history}</p>
      </div>

      <div>
        <h5 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-2">Current Status</h5>
        <p className="text-sm text-[#C9B99A] leading-relaxed">{tribe.currentStatus}</p>
      </div>

      {tribe.resources.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[rgba(255,149,0,0.1)]">
          {tribe.resources.map((r) => (
            <a key={r.label} href={r.url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-[#FF9500] border border-[rgba(255,149,0,0.3)] rounded px-3 py-1.5 hover:bg-[rgba(255,149,0,0.1)] transition-colors">
              <ExternalLink size={10} /> {r.label}
            </a>
          ))}
        </div>
      )}
    </motion.div>
  )
}

// ============================================
// TREATY EXPAND COMPONENT
// ============================================
function TreatyExpand({ treatyKey, treatyIndex }: { treatyKey: string; treatyIndex: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const treaties = TREATY_DB[treatyKey]
  if (!treaties || !treaties[treatyIndex]) return null
  const treaty = treaties[treatyIndex]

  return (
    <div className="border-l-2 border-[rgba(201,185,154,0.3)] pl-3">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 text-left w-full group">
        <span className="text-xs text-[#C9B99A]">{treaty.year}</span>
        <span className="text-sm text-[#F0EBE1] group-hover:text-[#FF9500] transition-colors">{treaty.name}</span>
        {isOpen ? <ChevronUp size={14} className="text-[#FF9500]" /> : <ChevronDown size={14} className="text-[#C9B99A]" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 space-y-2 overflow-hidden"
          >
            <p className="text-xs text-[#FF9500] uppercase tracking-[0.04em]">Full Details</p>
            <div className="bg-[rgba(12,21,32,0.6)] rounded p-3 border border-[rgba(255,149,0,0.1)]">
              <p className="text-sm text-[#C9B99A] leading-relaxed whitespace-pre-line">{treaty.fullText}</p>
            </div>
            {treaty.signatories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-[#C9B99A]">Signatories:</span>
                {treaty.signatories.map((s) => (
                  <span key={s} className="text-xs bg-[rgba(255,149,0,0.1)] text-[#F0EBE1] rounded px-2 py-0.5">{s}</span>
                ))}
              </div>
            )}
            <p className="text-xs text-[#FFB840] italic">{treaty.impact}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================
// MAP + STATE SELECTOR + DETAIL PANEL
// ============================================
function HeritageMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [selectedTribe, setSelectedTribe] = useState<string | null>(null)
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    const token = MAPBOX_TOKEN
    if (!token) {
      setMapError('Mapbox token not configured.')
      return
    }
    let cancelled = false
    import('mapbox-gl').then((mb) => {
      if (cancelled) return
      const mapboxgl = mb.default
      mapboxgl.accessToken = token
      const map = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [-95, 38],
        zoom: 3.5,
        interactive: true,
        attributionControl: false,
        cooperativeGestures: true,
        scrollZoom: { around: 'center' },
      })
      mapRef.current = map

      map.on('load', () => {
        map.setFog({
          color: 'rgb(12, 21, 32)',
          'high-color': 'rgb(27, 40, 56)',
          'horizon-blend': 0.4,
          'space-color': 'rgb(12, 21, 32)',
          'star-intensity': 0.3,
        })
        map.setPaintProperty('satellite', 'raster-opacity', 0.7)

        map.on('click', (e: any) => {
          const lng = e.lngLat.lng
          const lat = e.lngLat.lat
          fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=region&access_token=${token}`)
            .then(r => r.json())
            .then(data => {
              if (data.features?.length > 0) {
                const placeName = data.features[0].place_name
                const stateMatch = Object.keys(STATE_DATA).find(s => placeName.includes(s))
                if (stateMatch) {
                  setSelectedState(stateMatch)
                  setSelectedTribe(null)
                }
              }
            })
            .catch(() => {})
        })

        map.on('mouseenter', () => { map.getCanvas().style.cursor = 'pointer' })
        map.on('mouseleave', () => { map.getCanvas().style.cursor = '' })
      })
    }).catch(() => setMapError('Failed to load Mapbox.'))
    return () => { cancelled = true }
  }, [])

  // Fly to state
  useEffect(() => {
    if (selectedState && mapRef.current && STATE_COORDS[selectedState]) {
      const [lng, lat, zoom] = STATE_COORDS[selectedState]
      mapRef.current.flyTo({ center: [lng, lat], zoom, duration: 2000 })
      setTimeout(() => {
        document.getElementById('heritage-info')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 600)
    }
  }, [selectedState])

  const stateData = selectedState ? STATE_DATA[selectedState] : null

  return (
    <div className="space-y-6">
      {/* Map */}
      <div className="relative rounded border border-[rgba(255,149,0,0.2)] overflow-hidden" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
        {mapError ? (
          <div className="bg-[#1B2838] h-[300px] md:h-[400px] flex items-center justify-center p-6 text-center rounded">
            <div>
              <Map size={48} className="text-[#FF9500] mx-auto mb-4" />
              <p className="text-lg text-[#F0EBE1] mb-2">Tribal Land Map</p>
              <p className="text-sm text-[#C9B99A] max-w-md">{mapError}</p>
              <p className="text-xs text-[#C9B99A]/50 mt-4">Select a state below to explore tribal nations.</p>
            </div>
          </div>
        ) : (
          <div ref={mapContainerRef} className="h-[300px] md:h-[400px] w-full" />
        )}
      </div>

      {/* Popular States */}
      <div>
        <p className="text-xs uppercase tracking-[0.08em] text-[#FF9500] mb-3">Most Searched States</p>
        <div className="flex flex-wrap gap-2">
          {POPULAR_STATES.filter(s => STATE_DATA[s]).map((state) => (
            <button
              key={state}
              onClick={() => { setSelectedState(state); setSelectedTribe(null) }}
              className={`text-xs py-2 px-4 rounded-full border transition-all ${
                selectedState === state
                  ? 'bg-[rgba(255,149,0,0.2)] border-[rgba(255,149,0,0.5)] text-[#FF9500]'
                  : 'bg-[rgba(27,40,56,0.6)] border-[rgba(255,149,0,0.15)] text-[#C9B99A] hover:border-[rgba(255,149,0,0.3)]'
              }`}
            >
              {state}
            </button>
          ))}
        </div>
      </div>

      {/* All States */}
      <div>
        <p className="text-xs uppercase tracking-[0.08em] text-[#C9B99A] mb-3">All States with Data</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {Object.keys(STATE_DATA).sort().map((state) => (
            <button
              key={state}
              onClick={() => { setSelectedState(state); setSelectedTribe(null) }}
              className={`text-xs py-2 px-3 rounded border transition-all text-left ${
                selectedState === state
                  ? 'bg-[rgba(255,149,0,0.2)] border-[rgba(255,149,0,0.5)] text-[#FF9500]'
                  : 'bg-[rgba(27,40,56,0.5)] border-[rgba(255,149,0,0.1)] text-[#C9B99A] hover:border-[rgba(255,149,0,0.3)]'
              }`}
            >
              {state}
            </button>
          ))}
        </div>
      </div>

      {/* State Detail Panel */}
      <AnimatePresence>
        {stateData && selectedState && (
          <motion.div
            id="heritage-info"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Header */}
            <div className="bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.3)] p-5" style={{ borderLeft: '3px solid #FF9500' }}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xl md:text-2xl text-[#F0EBE1]">{selectedState}</h3>
                <button onClick={() => { setSelectedState(null); setSelectedTribe(null) }} className="text-[#C9B99A] hover:text-[#FF9500]">
                  <ChevronUp size={20} />
                </button>
              </div>
              <p className="text-sm text-[#C9B99A]">{stateData.tribes.length} Indigenous Nations Documented</p>
            </div>

            {/* Clickable Tribes */}
            <div className="bg-[rgba(27,40,56,0.7)] rounded border border-[rgba(255,149,0,0.15)] p-4">
              <h4 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-3 flex items-center gap-2">
                <Dna size={14} /> Indigenous Nations — Click to Explore
              </h4>
              <div className="flex flex-wrap gap-2">
                {stateData.tribes.map((tribe) => (
                  <button
                    key={tribe}
                    onClick={() => setSelectedTribe(selectedTribe === tribe ? null : tribe)}
                    className={`text-xs rounded px-3 py-1.5 border transition-all ${
                      selectedTribe === tribe
                        ? 'bg-[rgba(255,149,0,0.25)] border-[rgba(255,149,0,0.5)] text-[#FF9500]'
                        : 'bg-[rgba(255,149,0,0.08)] border-[rgba(255,149,0,0.2)] text-[#F0EBE1] hover:bg-[rgba(255,149,0,0.15)]'
                    }`}
                  >
                    {tribe}
                  </button>
                ))}
              </div>

              {/* Tribe Detail Panel */}
              <AnimatePresence>
                {selectedTribe && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <TribeDetailPanel tribeName={selectedTribe} onClose={() => setSelectedTribe(null)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Laws */}
            {stateData.laws.length > 0 && (
              <div className="bg-[rgba(27,40,56,0.7)] rounded border border-[rgba(255,149,0,0.15)] p-4">
                <h4 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-3 flex items-center gap-2">
                  <Landmark size={14} /> Laws & Policies
                </h4>
                <div className="space-y-3">
                  {stateData.laws.map((law, i) => (
                    <div key={i} className="border-l-2 border-[rgba(255,149,0,0.3)] pl-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#FF9500] font-medium">{law.year}</span>
                        <span className="text-sm text-[#F0EBE1]">{law.name}</span>
                      </div>
                      <p className="text-xs text-[#C9B99A] mt-1 leading-relaxed">{law.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Treaties — Expandable with Full Text */}
            {stateData.treaties.length > 0 && (
              <div className="bg-[rgba(27,40,56,0.7)] rounded border border-[rgba(255,149,0,0.15)] p-4">
                <h4 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-3 flex items-center gap-2">
                  <Scroll size={14} /> Treaties & Agreements — Click to Read
                </h4>
                <div className="space-y-3">
                  {stateData.treaties.map((treaty, i) => (
                    <TreatyExpand key={i} treatyKey={selectedState} treatyIndex={i} />
                  ))}
                </div>
              </div>
            )}

            {/* Vital Records */}
            <div className="bg-[rgba(27,40,56,0.7)] rounded border border-[rgba(255,149,0,0.15)] p-4">
              <h4 className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-3 flex items-center gap-2">
                <FileText size={14} /> Vital Records & Genealogy Resources
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Landmark size={14} className="text-[#C9B99A] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#F0EBE1]">{stateData.vitalRecords.office}</p>
                    <p className="text-xs text-[#C9B99A]">{stateData.vitalRecords.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-[#C9B99A] shrink-0" />
                  <span className="text-[#C9B99A]">{stateData.vitalRecords.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={14} className="text-[#C9B99A] shrink-0" />
                  <a href={stateData.vitalRecords.website} target="_blank" rel="noopener noreferrer" className="text-xs text-[#FF9500] hover:underline">
                    Vital Records Website <ExternalLink size={10} className="inline" />
                  </a>
                </div>
                <div className="border-t border-[rgba(255,149,0,0.1)] pt-2 mt-2">
                  <p className="text-xs text-[#FF9500] uppercase mb-1">Death Certificates</p>
                  <p className="text-xs text-[#C9B99A]">{stateData.vitalRecords.deathCertProcess}</p>
                </div>
                <div>
                  <p className="text-xs text-[#FF9500] uppercase mb-1">Birth Certificates</p>
                  <p className="text-xs text-[#C9B99A]">{stateData.vitalRecords.birthCertProcess}</p>
                </div>
                {stateData.vitalRecords.indianAffairs && (
                  <div className="border-t border-[rgba(255,149,0,0.1)] pt-2">
                    <p className="text-xs text-[#FF9500] uppercase mb-1">Indian Affairs Contact</p>
                    <p className="text-xs text-[#C9B99A]">{stateData.vitalRecords.indianAffairs}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No state selected */}
      {!selectedState && (
        <div id="heritage-info" className="bg-[rgba(27,40,56,0.5)] rounded border border-[rgba(255,149,0,0.15)] border-dashed p-6 text-center">
          <Dna size={32} className="text-[#FF9500] mx-auto mb-3" />
          <p className="text-sm text-[#F0EBE1] mb-1">Select a State Above</p>
          <p className="text-xs text-[#C9B99A]">Click any state to see Indigenous nations, laws, treaties with full text, and vital records.</p>
        </div>
      )}
    </div>
  )
}

// ============================================
// STATE COORDINATES FOR MAP FLY-TO
// ============================================
const STATE_COORDS: Record<string, [number, number, number]> = {
  'Alabama': [-86.7, 32.8, 6.5], 'Alaska': [-152, 64, 3], 'Arizona': [-111.5, 34.2, 6],
  'Arkansas': [-92.3, 34.9, 6.5], 'California': [-119.4, 37.2, 5], 'Colorado': [-105.5, 39.0, 6],
  'Connecticut': [-72.7, 41.6, 7.5], 'Delaware': [-75.5, 39.0, 7.5], 'Florida': [-81.5, 27.8, 6],
  'Georgia': [-83.2, 32.6, 6.5], 'Idaho': [-114.0, 44.2, 6], 'Illinois': [-89.2, 40.0, 6],
  'Indiana': [-86.3, 39.9, 6.5], 'Iowa': [-93.2, 42.0, 6.5], 'Kansas': [-98.4, 38.5, 6.5],
  'Kentucky': [-84.9, 37.5, 6.5], 'Louisiana': [-91.9, 30.9, 6.5], 'Maine': [-69.2, 45.3, 6],
  'Maryland': [-76.8, 39.0, 7], 'Massachusetts': [-71.8, 42.3, 7], 'Michigan': [-84.6, 43.3, 6],
  'Minnesota': [-94.6, 46.4, 6], 'Mississippi': [-89.6, 32.7, 6.5], 'Missouri': [-92.5, 38.3, 6.5],
  'Montana': [-109.6, 47.0, 6], 'Nebraska': [-99.8, 41.5, 6.5], 'Nevada': [-117.0, 39.3, 6],
  'New Hampshire': [-71.5, 43.9, 7], 'New Jersey': [-74.4, 40.1, 7], 'New Mexico': [-106.1, 34.4, 6],
  'New York': [-75.5, 43.0, 6], 'North Carolina': [-79.0, 35.5, 6.5], 'North Dakota': [-100.3, 47.5, 6.5],
  'Ohio': [-82.6, 40.3, 6.5], 'Oklahoma': [-96.9, 35.6, 6.5], 'Oregon': [-120.6, 43.9, 6],
  'Pennsylvania': [-77.6, 40.9, 6.5], 'Rhode Island': [-71.5, 41.7, 7.5], 'South Carolina': [-80.9, 33.8, 6.5],
  'South Dakota': [-100.2, 44.4, 6.5], 'Tennessee': [-86.3, 35.9, 6.5], 'Texas': [-99.3, 31.0, 5.5],
  'Utah': [-111.7, 39.3, 6], 'Vermont': [-72.7, 44.0, 6.5], 'Virginia': [-78.7, 37.5, 6.5],
  'Washington': [-120.4, 47.4, 6], 'West Virginia': [-80.6, 38.6, 6.5], 'Wisconsin': [-89.5, 44.6, 6],
  'Wyoming': [-107.3, 43.0, 6],
}

// ============================================
// MAIN EXPORT
// ============================================
export default function HeritageSection() {
  return (
    <section id="heritage" className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/bg-services.jpg)' }} />
      <div className="absolute inset-0 bg-[#1B2838]/90" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex gap-1">
              {[0, 1, 2].map(i => <div key={i} className="w-[3px] h-[3px] rounded-full bg-[#FF9500]" />)}
            </div>
            <p className="text-xs uppercase tracking-[0.08em] text-[#FF9500]">AASOTU Media Group Presents</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] text-[#F0EBE1] tracking-[-0.02em] leading-[1.08] mb-4 text-shadow-hero">
            Who Was Here Before You
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <p className="text-lg text-[#C9B99A] max-w-3xl mb-4 leading-relaxed">
            Click any state to discover the Indigenous nations who called that land home. Then click each nation to explore their full history. Expand treaties to read the complete text.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap gap-4 mb-12">
            <button onClick={() => document.getElementById('heritage-info')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2 text-xs text-[#FF9500] bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.2)] rounded px-3 py-1.5 hover:bg-[rgba(255,149,0,0.15)] transition-colors cursor-pointer">
              <Dna size={12} /> 574 Sovereign Nations
            </button>
            <button onClick={() => document.getElementById('heritage-info')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2 text-xs text-[#C9B99A] bg-[rgba(27,40,56,0.6)] border border-[rgba(201,185,154,0.15)] rounded px-3 py-1.5 hover:bg-[rgba(201,185,154,0.1)] transition-colors cursor-pointer">
              <FileText size={12} /> Vital Records Access
            </button>
            <button onClick={() => document.getElementById('heritage-info')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2 text-xs text-[#C9B99A] bg-[rgba(27,40,56,0.6)] border border-[rgba(201,185,154,0.15)] rounded px-3 py-1.5 hover:bg-[rgba(201,185,154,0.1)] transition-colors cursor-pointer">
              <Landmark size={12} /> Laws & Treaties
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <HeritageMap />
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <div className="mt-8 p-4 bg-[rgba(220,38,38,0.05)] rounded border border-[rgba(220,38,38,0.15)]">
            <div className="flex items-start gap-3">
              <AlertTriangle size={16} className="text-red-400/60 shrink-0 mt-0.5" />
              <p className="text-xs text-[#C9B99A]/50 leading-relaxed">
                Tribal territories overlapped and shifted over time. The nations listed are based on historical research and should be used as a starting point. Always verify using original records and multiple sources.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
