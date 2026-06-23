import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Map, ChevronDown, ChevronUp, ExternalLink, Phone, Mail, Globe, FileText, Landmark, BookOpen, AlertTriangle, Dna, Scroll, MapPin } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || ''

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
// COMPREHENSIVE STATE DATA: Tribes, Laws, Treaties, Vital Records
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
  researchNotes: string
}

const STATE_DATA: Record<string, StateData> = {
  'Alabama': {
    tribes: ['Poarch Band of Creek Indians', 'Muscogee Creek Nation (historical)', 'Cherokee (historical)', 'Choctaw (historical)', 'Chickasaw (historical)'],
    laws: [
      { name: 'Indian Removal Act Impact', year: '1830', desc: 'Forced removal of Creek, Cherokee, and Choctaw peoples from Alabama territory.' },
      { name: 'Creek Cession Treaties', year: '1814-1832', desc: 'Series of treaties gradually ceding Creek lands to the U.S. government.' },
    ],
    treaties: [
      { name: 'Treaty of Fort Jackson', year: '1814', desc: 'Ceded 23 million acres of Creek land after the Creek War.' },
      { name: 'Treaty of Cusseta', year: '1832', desc: 'Divided Creek territory into allotments, leading to fraudulent land seizures.' },
    ],
    vitalRecords: {
      office: 'Alabama Center for Health Statistics',
      address: 'RSA Tower, 201 Monroe Street, Suite 1150, Montgomery, AL 36104',
      phone: '(334) 206-5418',
      website: 'https://www.alabamapublichealth.gov/vitalrecords/',
      deathCertProcess: 'Mail-in application with valid ID. $15 per copy. Processing time 5-10 business days.',
      birthCertProcess: 'Same as death certificates. Must prove relationship if not your own.',
      indianAffairs: 'Alabama Indian Affairs Commission: (334) 242-2835',
    },
    researchNotes: 'Check Alabama Department of Archives and History for tribal census records and removal documentation.',
  },
  'Alaska': {
    tribes: ['Tlingit & Haida Indian Tribes', 'Inupiat', 'Yupik', 'Aleut', 'Athabaskan (multiple bands)', 'Alaska Native Village Corporations (200+)'],
    laws: [
      { name: 'Alaska Native Claims Settlement Act (ANCSA)', year: '1971', desc: 'Largest land claims settlement in U.S. history. Created Native corporations instead of reservations.' },
      { name: 'Indian Reorganization Act (Alaska Amendment)', year: '1936', desc: 'Extended IRA provisions to Alaska Natives.' },
    ],
    treaties: [
      { name: 'Alaska Native Claims Settlement Act', year: '1971', desc: 'Settled aboriginal land claims for 44 million acres and $963 million.' },
    ],
    vitalRecords: {
      office: 'Alaska Bureau of Vital Statistics',
      address: '5441 Commercial Blvd, Juneau, AK 99801',
      phone: '(907) 465-3391',
      website: 'https://dhss.alaska.gov/dph/VitalStats/Pages/default.aspx',
      deathCertProcess: 'Online or mail-order. $30 per copy. Expedited service available.',
      birthCertProcess: 'Online ordering available. Must prove identity and relationship.',
      indianAffairs: 'Alaska Native Tribal Health Consortium: (907) 729-6000',
    },
    researchNotes: 'Alaska State Archives in Juneau holds ANCSA records, Bureau of Indian Affairs Alaska records, and Native corporation documents.',
  },
  'Arizona': {
    tribes: ['Navajo Nation (Diné)', 'Tohono O\'odham Nation', 'Gila River Indian Community', 'Salt River Pima-Maricopa', 'Hopi Tribe', 'White Mountain Apache', 'San Carlos Apache', 'Colorado River Indian Tribes', 'Havasupai', 'Hualapai', 'Yaqui (Pascua)', 'Quechan (Yuma)'],
    laws: [
      { name: 'Dawes Act (General Allotment)', year: '1887', desc: 'Broke up tribal lands into individual allotments. Arizona tribes lost millions of acres.' },
      { name: 'Indian Reorganization Act', year: '1934', desc: 'Ended allotment. Allowed tribes to reorganize governments and recover some lands.' },
    ],
    treaties: [
      { name: 'Navajo Treaty (Bosque Redondo)', year: '1868', desc: 'Allowed Navajo return to their homeland after the Long Walk internment.' },
      { name: 'Gadsden Purchase', year: '1854', desc: 'U.S. acquired southern Arizona from Mexico, affecting Tohono O\'odham and Yaqui lands.' },
    ],
    vitalRecords: {
      office: 'Arizona Office of Vital Records',
      address: '1818 W. Adams St, Phoenix, AZ 85007',
      phone: '(602) 364-1300',
      website: 'https://www.azdhs.gov/vitalrecords/',
      deathCertProcess: 'Mail or walk-in at county health departments. $20 per copy. 7-10 business days.',
      birthCertProcess: 'Same process. Online ordering through AZDHS website.',
      indianAffairs: 'Inter Tribal Council of Arizona: (602) 258-4822',
    },
    researchNotes: 'Heard Museum in Phoenix has extensive Native American genealogical resources. Navajo Nation Museum in Window Rock for Diné-specific records.',
  },
  'Arkansas': {
    tribes: ['Quapaw Tribe of Oklahoma (historical AR)', 'Caddo Nation (historical)', 'Osage Nation (historical)'],
    laws: [
      { name: 'Arkansas Removal Acts', year: '1820s-1830s', desc: 'Forced removal of Quapaw, Caddo, and Osage from Arkansas territory.' },
    ],
    treaties: [
      { name: 'Quapaw Treaty of 1818', year: '1818', desc: 'Ceded Quapaw lands in Arkansas; tribe relocated to Louisiana, then Oklahoma.' },
      { name: 'Treaty of 1833', year: '1833', desc: 'Final cession of Quapaw lands in Arkansas.' },
    ],
    vitalRecords: {
      office: 'Arkansas Department of Health, Vital Records',
      address: '4815 W. Markham St, Slot 44, Little Rock, AR 72205',
      phone: '(501) 661-2336',
      website: 'https://www.healthy.arkansas.gov/programs-services/topics/vital-records',
      deathCertProcess: 'Mail-in with notarized application. $12 per copy. 10-14 business days.',
      birthCertProcess: 'Same as death certificates. Must provide acceptable identification.',
    },
    researchNotes: 'Arkansas History Commission has Quapaw and early territorial records. Check BIA Southern Superintendency records.',
  },
  'California': {
    tribes: ['Chumash', 'Tongva (Gabrielino)', 'Pomo', 'Yokuts', 'Miwok', 'Kumeyaay', 'Luiseño', 'Cahuilla', 'Karuk', 'Yurok', 'Hoopa'],
    laws: [
      { name: 'California Indian Homestead Act', year: '1850s-1870s', desc: 'Promised land grants to "mission Indians" but rarely honored.' },
      { name: '18 Unratified California Treaties', year: '1851-1852', desc: 'U.S. negotiated then secretly refused to ratify 18 treaties with California tribes, leaving them landless.' },
    ],
    treaties: [
      { name: '18 Treaties of 1851-1852', year: '1851-1852', desc: 'Secretly sealed by U.S. Senate. Not revealed to public until 1905. Would have reserved 8.5 million acres.' },
    ],
    vitalRecords: {
      office: 'California Department of Public Health, Vital Records',
      address: 'MS 5103, P.O. Box 997410, Sacramento, CA 95899-7410',
      phone: '(916) 445-2684',
      website: 'https://www.cdph.ca.gov/Programs/CHSI/Pages/Vital-Records.aspx',
      deathCertProcess: 'Mail or online via VitalChek. $21 per copy. 4-6 weeks processing.',
      birthCertProcess: 'Online through VitalChek or county recorder. Must prove identity.',
      indianAffairs: 'California Native American Heritage Commission: (916) 373-3710',
    },
    researchNotes: 'Check BIA California Agency records and 18 Unratified Treaties documentation at National Archives.',
  },
  'Georgia': {
    tribes: ['Muscogee (Creek) Nation (historical)', 'Cherokee Nation (historical)', 'Yuchi', 'Hitchiti', 'Shawnee (historical)', 'Yamasee (historical)'],
    laws: [
      { name: 'Georgia Cherokee Laws', year: '1829-1831', desc: 'Georgia passed laws extending state jurisdiction over Cherokee territory, making Cherokee laws illegal.' },
      { name: 'Indian Removal Act', year: '1830', desc: 'Authorized forced removal of Cherokee, Creek, and other southeastern tribes.' },
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
    researchNotes: 'Check Georgia Archives for Creek and Cherokee removal records. University of Georgia Hargrett Library has special collections.',
  },
  'Oklahoma': {
    tribes: ['Cherokee Nation', 'Choctaw Nation', 'Chickasaw Nation', 'Muscogee (Creek) Nation', 'Seminole Nation', 'Osage Nation', 'Pawnee Nation', 'Kiowa Tribe', 'Comanche Nation', 'Cheyenne & Arapaho Tribes', 'Otoe-Missouria', 'Iowa Tribe', 'Kaw Nation', 'Miami Tribe', 'Modoc Tribe', 'Ottawa Tribe', 'Peoria Tribe', 'Quapaw Tribe', 'Seneca-Cayuga Nation', 'Tonkawa Tribe', 'Wyandotte Nation'],
    laws: [
      { name: 'Dawes Act (Allotment)', year: '1887', desc: 'Divided tribal lands into individual plots in Indian Territory. Oklahoma tribes lost 90 million acres total.' },
      { name: 'Curtis Act', year: '1898', desc: 'Abolished tribal courts and governments in Indian Territory. Forced allotment on Five Civilized Tribes.' },
      { name: 'Oklahoma Statehood', year: '1907', desc: 'Combined Indian Territory and Oklahoma Territory. Tribal governments were severely weakened.' },
    ],
    treaties: [
      { name: 'Treaty of Doaksville (Choctaw-Chickasaw)', year: '1837', desc: 'Defined Choctaw and Chickasaw boundaries in Indian Territory.' },
      { name: 'Reconstruction Treaties', year: '1866', desc: 'Five Civilized Tribes forced to sign treaties after Civil War. Freedmen granted tribal citizenship.' },
    ],
    vitalRecords: {
      office: 'Oklahoma State Department of Health, Vital Records',
      address: '1000 NE 10th Street, Oklahoma City, OK 73117',
      phone: '(405) 426-8782',
      website: 'https://oklahoma.gov/health/records.html',
      deathCertProcess: 'Mail or online via VitalChek. $15 per copy. 6-8 weeks processing.',
      birthCertProcess: 'Same process. Online ordering available.',
      indianAffairs: 'Oklahoma Indian Affairs Commission: (405) 521-4211',
    },
    researchNotes: 'Oklahoma Historical Society has Dawes Rolls, Guion Miller Rolls, and extensive tribal records. Five Civilized Tribes Museum in Muskogee.',
  },
  'North Carolina': {
    tribes: ['Eastern Band of Cherokee Indians', 'Lumbee Tribe', 'Coharie Intra-Tribal Council', 'Haliwa-Saponi Indian Tribe', 'Occaneechi Band of the Saponi Nation', 'Meherrin Indian Tribe', 'Sappony', 'Waccamaw Siouan'],
    laws: [
      { name: 'North Carolina Recognition Act', year: '1971', desc: 'First state to officially recognize Native American tribes through legislative action.' },
      { name: 'Lumbee Recognition Efforts', year: '1885-Present', desc: 'Lumbee have sought federal recognition for over 130 years. Partial recognition granted in 1956 without full benefits.' },
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
      indianAffairs: 'North Carolina Commission of Indian Affairs: (919) 733-5998',
    },
    researchNotes: 'State Archives of NC has Lumbee, Coharie, and Eastern Cherokee records. UNC Chapel Hill Southern Historical Collection.',
  },
  'South Carolina': {
    tribes: ['Catawba Indian Nation', 'Pee Dee Indian Tribe', 'Waccamaw Indian People', 'Santee Indian Organization', 'Beaver Creek Indians', 'Pee Dee Indian Nation of Upper South Carolina'],
    laws: [
      { name: 'South Carolina Termination Policy', year: '1962', desc: 'State terminated recognition of Catawba and other tribes. Federal recognition restored in 1993.' },
      { name: 'Catawba Land Claims Settlement', year: '1993', desc: 'Federal recognition restored. $50 million settlement for land claims.' },
    ],
    treaties: [
      { name: 'Treaty of Pine Tree Hill', year: '1760', desc: 'Catawba ceded large tracts to South Carolina colony.' },
      { name: 'Treaty of Nations Ford', year: '1840', desc: 'Catawba ceded remaining lands to South Carolina for $2,500. No reservation established.' },
    ],
    vitalRecords: {
      office: 'South Carolina Department of Health, Vital Records',
      address: '2600 Bull Street, Columbia, SC 29201',
      phone: '(803) 898-3630',
      website: 'https://www.sc.gov/dhec/VitalRecords',
      deathCertProcess: 'Mail or online via VitalChek. $12 per copy. 4-6 weeks.',
      birthCertProcess: 'Same process. Online ordering available.',
      indianAffairs: 'South Carolina Commission for Minority Affairs (Native American Affairs): (803) 333-9621',
    },
    researchNotes: 'South Carolina Department of Archives and History has Catawba treaties and colonial records. University of South Carolina has special collections.',
  },
  'Virginia': {
    tribes: ['Pamunkey Indian Tribe', 'Chickahominy Indian Tribe', 'Mattaponi Indian Tribe', 'Upper Mattaponi Indian Tribe', 'Monacan Indian Nation', 'Nansemond Indian Nation', 'Rappahannock Indian Tribe', 'Eastern Chickahominy', 'Cheroenhaka (Nottoway)', 'Nottoway Indian Tribe'],
    laws: [
      { name: 'Racial Integrity Act of 1924', year: '1924', desc: 'Classified all Virginians as "white" or "colored." Erased Native American identity from official records.' },
      { name: 'Pocahontas Exception', year: '1924', desc: 'Allowed those with 1/16th or less "Indian blood" to be classified as white. Used to hide Native ancestry.' },
      { name: 'Virginia Tribal Recognition', year: '1980s-Present', desc: 'State began recognizing tribes. Federal recognition granted to 6 Virginia tribes in 2018.' },
    ],
    treaties: [
      { name: 'Treaty of Middle Plantation', year: '1677', desc: 'Established peace between Virginia colony and Powhatan Confederacy tribes after Bacon\'s Rebellion.' },
      { name: 'Treaty of Fort Pitt (Cherokee)', year: '1778', desc: 'First treaty between U.S. and Cherokee after Declaration of Independence.' },
    ],
    vitalRecords: {
      office: 'Virginia Department of Health, Division of Vital Records',
      address: 'P.O. Box 1000, Richmond, VA 23218',
      phone: '(804) 662-6200',
      website: 'https://www.vdh.virginia.gov/vital-records/',
      deathCertProcess: 'Mail, online via VitalChek, or in-person. $12 per copy. 2-4 weeks.',
      birthCertProcess: 'Same process. Online ordering available.',
      indianAffairs: 'Virginia Council on Indians: (804) 225-2098',
    },
    researchNotes: 'Library of Virginia has extensive records. Check BIA Virginia Agency records and Racial Integrity Act documentation. Pamunkey and Mattaponi tribal offices hold family records.',
  },
  'New York': {
    tribes: ['Seneca Nation', 'Oneida Indian Nation', 'Onondaga Nation', 'Cayuga Nation', 'Mohawk Nation', 'Tuscarora Nation', 'Shinnecock Indian Nation', 'Unkechaug Nation', 'Ramapough Lenape', 'Saint Regis Mohawk Tribe', 'Stockbridge-Munsee'],
    laws: [
      { name: 'Treaty of Canandaigua Implementation', year: '1794-Present', desc: 'Treaty guaranteeing Seneca, Cayuga, Onondaga, Oneida, Mohawk, and Tuscarora lands. Still active and contested.' },
      { name: 'New York Indian Law', year: 'Various', desc: 'State-specific laws governing tribal-state relations, taxation, and jurisdiction.' },
    ],
    treaties: [
      { name: 'Treaty of Canandaigua', year: '1794', desc: 'Recognized sovereignty of Six Nations. Guaranteed their lands. One of the few treaties still honored by the U.S.' },
      { name: 'Treaty of Big Tree (Seneca)', year: '1797', desc: 'Seneca retained 4 reservations in western New York. Corruption in treaty process widely documented.' },
    ],
    vitalRecords: {
      office: 'New York State Department of Health, Vital Records',
      address: '800 North Pearl Street, Menands, NY 12204',
      phone: '(855) 322-1022',
      website: 'https://www.health.ny.gov/vital_records/',
      deathCertProcess: 'Mail or online via VitalChek. $30 per copy (priority mail). 8-10 weeks standard.',
      birthCertProcess: 'Same process. Online ordering available.',
      indianAffairs: 'New York State Indian Affairs: (518) 474-0510',
    },
    researchNotes: 'New York State Archives holds Iroquois treaties and colonial records. Syracuse University has extensive Haudenosaunee collections.',
  },
  'New Mexico': {
    tribes: ['Navajo Nation (Diné)', '19 Pueblo Nations', 'Mescalero Apache Tribe', 'Jicarilla Apache Nation', 'Fort Sill Apache Tribe', 'Ute Mountain Ute (Southwestern Colorado/Southwestern NM)'],
    laws: [
      { name: 'Pueblo Lands Act', year: '1924', desc: 'Confirmed Pueblo land titles that had been disputed since Mexican-American War.' },
      { name: 'Indian Reorganization Act', year: '1934', desc: 'Allowed Pueblo and other tribes to reorganize governments and recover lands.' },
    ],
    treaties: [
      { name: 'Treaty of Guadalupe Hidalgo', year: '1848', desc: 'Ended Mexican-American War. Guaranteed property rights of Pueblo peoples under U.S. law.' },
      { name: 'Navajo-Bosque Redondo Treaty', year: '1868', desc: 'Navajo returned to homeland from internment. Established Navajo reservation boundaries.' },
    ],
    vitalRecords: {
      office: 'New Mexico Department of Health, Vital Records',
      address: '1190 St. Francis Drive, Santa Fe, NM 87505',
      phone: '(505) 827-2338',
      website: 'https://www.nmhealth.org/about/vital_records/',
      deathCertProcess: 'Mail or in-person. $10 per copy. Same-day service if in-person.',
      birthCertProcess: 'Same process. Online ordering not available.',
      indianAffairs: 'New Mexico Indian Affairs Department: (505) 476-1600',
    },
    researchNotes: 'New Mexico State Records Center and Archives has Spanish colonial, Mexican, and U.S. territorial records affecting Pueblo and Navajo lands.',
  },
  'Texas': {
    tribes: ['Alabama-Coushatta Tribe', 'Kickapoo Traditional Tribe', 'Ysleta del Sur Pueblo (Tigua)', 'Lipan Apache ( unrecognized)', 'Tonkawa (historical)', 'Karankawa (historical)', 'Coahuiltecan (historical)'],
    laws: [
      { name: 'Texas Indian Commission Abolishment', year: '1989', desc: 'State eliminated Texas Indian Commission, leaving tribes without state advocacy office.' },
      { name: 'Ysleta del Sur Restoration Act', year: '1987', desc: 'Restored federal recognition to Tigua (Pueblo) after being terminated in 1968.' },
    ],
    treaties: [
      { name: 'Cherokee Treaty of 1836 (Texas)', year: '1836', desc: 'Sam Houston negotiated with Cherokee. Republic of Texas later violated treaty.' },
      { name: 'Comanche Treaties', year: '1830s-1840s', desc: 'Series of treaties between Republic of Texas and Comanche. All eventually broken.' },
    ],
    vitalRecords: {
      office: 'Texas Vital Statistics',
      address: '1100 W. 49th Street, Austin, TX 78756',
      phone: '(888) 963-7111',
      website: 'https://www.dshs.texas.gov/vs/',
      deathCertProcess: 'Online via Texas.gov or mail. $20 per copy. 10-15 business days.',
      birthCertProcess: 'Same process. Online ordering available.',
      indianAffairs: 'Texas Historical Commission (Indian Affairs): (512) 463-6100',
    },
    researchNotes: 'Texas State Library and Archives Commission has Republic of Texas Indian records. UT Austin Benson Latin American Collection.',
  },
  'Louisiana': {
    tribes: ['Chitimacha Tribe', 'Coushatta Tribe', 'Jena Band of Choctaw', 'Tunica-Biloxi Indian Tribe', 'Houma Tribe (Bayou Dorcheat, United Houma Nation - partially recognized)', 'Clifton Choctaw', 'Louisiana Band of Choctaw'],
    laws: [
      { name: 'Louisiana Native American Commission', year: '1983', desc: 'Established state commission to address Native American concerns in Louisiana.' },
      { name: 'Coushatta Federal Recognition', year: '1973', desc: 'Coushatta regained federal recognition after being terminated in 1953.' },
    ],
    treaties: [
      { name: 'Treaty of 1803 (Chitimacha)', year: '1803', desc: 'Chitimacha ceded lands to U.S. Retained small reservation near Charenton.' },
      { name: 'Tunica-Biloxi Land Claim Settlement', year: '1981', desc: 'Federal recognition restored. $1.9 million settlement for land claims.' },
    ],
    vitalRecords: {
      office: 'Louisiana Vital Records Registry',
      address: '1450 Poydras Street, Suite 400, New Orleans, LA 70112',
      phone: '(504) 593-5100',
      website: 'https://ldh.la.gov/vital-records/',
      deathCertProcess: 'Mail or walk-in. $9 per copy. 8-10 weeks by mail.',
      birthCertProcess: 'Same process. Walk-in service available at New Orleans office.',
      indianAffairs: 'Louisiana Governor\'s Office of Indian Affairs: (225) 342-1887',
    },
    researchNotes: 'Louisiana State Archives has French colonial, Spanish colonial, and territorial records affecting tribal lands. LSU special collections.',
  },
  'Florida': {
    tribes: ['Seminole Tribe of Florida', 'Miccosukee Tribe of Indians', 'Poarch Band of Creek Indians (not FL but related)', 'Seminole Nation of Oklahoma (historical FL)'],
    laws: [
      { name: 'Seminole Wars', year: '1817-1858', desc: 'Three wars resulting in forced removal of most Seminoles to Indian Territory (Oklahoma).' },
      { name: 'Indian Removal Act - Florida', year: '1830', desc: 'Applied to Seminole, Miccosukee, and Creek peoples in Florida.' },
    ],
    treaties: [
      { name: 'Treaty of Payne\'s Landing', year: '1832', desc: 'Seminole agreed to removal west. Treaty signed under duress.' },
      { name: 'Treaty of Fort Gibson', year: '1833', desc: 'Seminole inspection of western lands. Led to breakdown of Payne\'s Landing agreement.' },
    ],
    vitalRecords: {
      office: 'Florida Bureau of Vital Statistics',
      address: '1217 Pearl Street, Jacksonville, FL 32202',
      phone: '(904) 359-6900',
      website: 'https://www.floridahealth.gov/certificates/',
      deathCertProcess: 'Online via VitalChek or mail. $9 per copy (state fee) + local fee. 3-5 business days.',
      birthCertProcess: 'Same process. Online ordering available.',
      indianAffairs: 'Florida Governor\'s Council on Indian Affairs: (850) 487-0914',
    },
    researchNotes: 'State Archives of Florida has Seminole Wars records, BIA Florida Agency records, and Spanish colonial mission records.',
  },
}

const POPULAR_STATES = ['Georgia', 'Oklahoma', 'North Carolina', 'Virginia', 'South Carolina', 'Alabama', 'Florida', 'Texas', 'New York', 'New Mexico']

function HeritageMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [selectedState, setSelectedState] = useState<string | null>(null)
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
      })
      mapRef.current = map

      map.on('load', () => {
        // Add atmosphere for cinematic look
        map.setFog({
          color: 'rgb(12, 21, 32)',
          'high-color': 'rgb(27, 40, 56)',
          'horizon-blend': 0.4,
          'space-color': 'rgb(12, 21, 32)',
          'star-intensity': 0.3,
        })
        // Darken the map to match site aesthetic
        map.setPaintProperty('satellite', 'raster-opacity', 0.7)
      })

      // Fly to selected state
      const stateCoordinates: Record<string, [number, number]> = {
        'Alabama': [-86.7, 32.8], 'Alaska': [-152, 64], 'Arizona': [-111.5, 34.2],
        'Arkansas': [-92.3, 34.9], 'California': [-119.4, 37.2], 'Colorado': [-105.5, 39.0],
        'Connecticut': [-72.7, 41.6], 'Delaware': [-75.5, 39.0], 'Florida': [-81.5, 27.8],
        'Georgia': [-83.2, 32.6], 'Idaho': [-114.0, 44.2], 'Illinois': [-89.2, 40.0],
        'Indiana': [-86.3, 39.9], 'Iowa': [-93.2, 42.0], 'Kansas': [-98.4, 38.5],
        'Kentucky': [-84.9, 37.5], 'Louisiana': [-91.9, 30.9], 'Maine': [-69.2, 45.3],
        'Maryland': [-76.8, 39.0], 'Massachusetts': [-71.8, 42.3], 'Michigan': [-84.6, 43.3],
        'Minnesota': [-94.6, 46.4], 'Mississippi': [-89.6, 32.7], 'Missouri': [-92.5, 38.3],
        'Montana': [-109.6, 47.0], 'Nebraska': [-99.8, 41.5], 'Nevada': [-117.0, 39.3],
        'New Hampshire': [-71.5, 43.9], 'New Jersey': [-74.4, 40.1], 'New Mexico': [-106.1, 34.4],
        'New York': [-75.5, 43.0], 'North Carolina': [-79.0, 35.5], 'North Dakota': [-100.3, 47.5],
        'Ohio': [-82.6, 40.3], 'Oklahoma': [-96.9, 35.6], 'Oregon': [-120.6, 43.9],
        'Pennsylvania': [-77.6, 40.9], 'Rhode Island': [-71.5, 41.7], 'South Carolina': [-80.9, 33.8],
        'South Dakota': [-100.2, 44.4], 'Tennessee': [-86.3, 35.9], 'Texas': [-99.3, 31.0],
        'Utah': [-111.7, 39.3], 'Vermont': [-72.7, 44.0], 'Virginia': [-78.7, 37.5],
        'Washington': [-120.4, 47.4], 'West Virginia': [-80.6, 38.6], 'Wisconsin': [-89.5, 44.6],
        'Wyoming': [-107.3, 43.0],
      }
    }).catch(() => setMapError('Failed to load Mapbox.'))
    return () => { cancelled = true }
  }, [])

  // Fly to selected state
  useEffect(() => {
    if (selectedState && mapRef.current && STATE_COORDS[selectedState]) {
      const [lng, lat, zoom] = STATE_COORDS[selectedState]
      mapRef.current.flyTo({ center: [lng, lat], zoom, duration: 2000 })
    }
  }, [selectedState])

  const stateData = selectedState ? STATE_DATA[selectedState] : null
  const popularStatesData = POPULAR_STATES.filter(s => STATE_DATA[s])

  return (
    <div className="space-y-6">
      {/* Map */}
      <div className="relative rounded border border-[rgba(255,149,0,0.2)] overflow-hidden" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
        {mapError ? (
          <div className="bg-[#1B2838] h-[300px] md:h-[400px] flex items-center justify-center p-6 text-center rounded border border-[rgba(255,149,0,0.2)]">
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

      {/* Popular States Quick Select */}
      <div>
        <p className="text-xs uppercase tracking-[0.08em] text-[#FF9500] mb-3">Most Searched States</p>
        <div className="flex flex-wrap gap-2">
          {popularStatesData.map((state) => (
            <button
              key={state}
              onClick={() => setSelectedState(selectedState === state ? null : state)}
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

      {/* All States Grid */}
      <div>
        <p className="text-xs uppercase tracking-[0.08em] text-[#C9B99A] mb-3">All States with Data</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {Object.keys(STATE_DATA).sort().map((state) => (
            <button
              key={state}
              onClick={() => setSelectedState(selectedState === state ? null : state)}
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

      {/* Selected State Detail Panel */}
      <AnimatePresence>
        {stateData && selectedState && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Header */}
            <div className="bg-[rgba(27,40,56,0.85)] backdrop-blur-lg rounded border border-[rgba(255,149,0,0.3)] p-6" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.4)', borderLeft: '3px solid #FF9500' }}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl text-[#F0EBE1]">{selectedState}</h3>
                <button onClick={() => setSelectedState(null)} className="text-[#C9B99A] hover:text-[#FF9500] transition-colors">
                  <ChevronUp size={20} />
                </button>
              </div>
              <p className="text-sm text-[#C9B99A]">{stateData.tribes.length} Indigenous Nations Documented</p>
            </div>

            {/* Tribes */}
            <div className="bg-[rgba(27,40,56,0.7)] rounded border border-[rgba(255,149,0,0.15)] p-5">
              <h4 className="text-sm text-[#FF9500] uppercase tracking-[0.04em] mb-3 flex items-center gap-2">
                <Dna size={16} /> Indigenous Nations
              </h4>
              <div className="flex flex-wrap gap-2">
                {stateData.tribes.map((tribe) => (
                  <span key={tribe} className="text-xs bg-[rgba(255,149,0,0.1)] text-[#F0EBE1] border border-[rgba(255,149,0,0.2)] rounded px-3 py-1.5">
                    {tribe}
                  </span>
                ))}
              </div>
            </div>

            {/* Laws */}
            {stateData.laws.length > 0 && (
              <div className="bg-[rgba(27,40,56,0.7)] rounded border border-[rgba(255,149,0,0.15)] p-5">
                <h4 className="text-sm text-[#FF9500] uppercase tracking-[0.04em] mb-3 flex items-center gap-2">
                  <Landmark size={16} /> Laws & Policies
                </h4>
                <div className="space-y-3">
                  {stateData.laws.map((law, i) => (
                    <div key={i} className="border-l-2 border-[rgba(255,149,0,0.3)] pl-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#FF9500]">{law.year}</span>
                        <span className="text-sm text-[#F0EBE1]">{law.name}</span>
                      </div>
                      <p className="text-xs text-[#C9B99A] mt-1">{law.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Treaties */}
            {stateData.treaties.length > 0 && (
              <div className="bg-[rgba(27,40,56,0.7)] rounded border border-[rgba(255,149,0,0.15)] p-5">
                <h4 className="text-sm text-[#FF9500] uppercase tracking-[0.04em] mb-3 flex items-center gap-2">
                  <Scroll size={16} /> Treaties & Agreements
                </h4>
                <div className="space-y-3">
                  {stateData.treaties.map((treaty, i) => (
                    <div key={i} className="border-l-2 border-[rgba(201,185,154,0.3)] pl-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#C9B99A]">{treaty.year}</span>
                        <span className="text-sm text-[#F0EBE1]">{treaty.name}</span>
                      </div>
                      <p className="text-xs text-[#C9B99A] mt-1">{treaty.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vital Records */}
            <div className="bg-[rgba(27,40,56,0.7)] rounded border border-[rgba(255,149,0,0.15)] p-5">
              <h4 className="text-sm text-[#FF9500] uppercase tracking-[0.04em] mb-3 flex items-center gap-2">
                <FileText size={16} /> Vital Records & Genealogy Resources
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Landmark size={14} className="text-[#C9B99A] shrink-0 mt-1" />
                  <div>
                    <p className="text-[#F0EBE1]">{stateData.vitalRecords.office}</p>
                    <p className="text-xs text-[#C9B99A]">{stateData.vitalRecords.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={14} className="text-[#C9B99A] shrink-0" />
                  <span className="text-[#C9B99A]">{stateData.vitalRecords.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={14} className="text-[#C9B99A] shrink-0" />
                  <a href={stateData.vitalRecords.website} target="_blank" rel="noopener noreferrer" className="text-[#FF9500] hover:underline text-xs">
                    Vital Records Website <ExternalLink size={10} className="inline" />
                  </a>
                </div>
                <div className="border-t border-[rgba(255,149,0,0.1)] pt-3 mt-3">
                  <p className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-1">Death Certificates</p>
                  <p className="text-xs text-[#C9B99A]">{stateData.vitalRecords.deathCertProcess}</p>
                </div>
                <div>
                  <p className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-1">Birth Certificates</p>
                  <p className="text-xs text-[#C9B99A]">{stateData.vitalRecords.birthCertProcess}</p>
                </div>
                {stateData.vitalRecords.indianAffairs && (
                  <div className="border-t border-[rgba(255,149,0,0.1)] pt-3">
                    <p className="text-xs text-[#FF9500] uppercase tracking-[0.04em] mb-1">Indian Affairs Contact</p>
                    <p className="text-xs text-[#C9B99A]">{stateData.vitalRecords.indianAffairs}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Research Notes */}
            <div className="bg-[rgba(220,38,38,0.05)] rounded border border-[rgba(220,38,38,0.15)] p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle size={16} className="text-[#FF9500] shrink-0 mt-0.5" />
                <p className="text-xs text-[#C9B99A]/70 leading-relaxed">{stateData.researchNotes}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

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
            Click any state to discover the Indigenous nations who called that land home long before colonial borders redrew history. Find tribes, treaties, laws, and the vital records you need to trace your roots.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap gap-4 mb-12">
            <div className="flex items-center gap-2 text-xs text-[#FF9500] bg-[rgba(255,149,0,0.08)] border border-[rgba(255,149,0,0.2)] rounded px-3 py-1.5">
              <Dna size={12} /> 574 Sovereign Nations
            </div>
            <div className="flex items-center gap-2 text-xs text-[#C9B99A] bg-[rgba(27,40,56,0.6)] border border-[rgba(201,185,154,0.15)] rounded px-3 py-1.5">
              <FileText size={12} /> Vital Records Access
            </div>
            <div className="flex items-center gap-2 text-xs text-[#C9B99A] bg-[rgba(27,40,56,0.6)] border border-[rgba(201,185,154,0.15)] rounded px-3 py-1.5">
              <Landmark size={12} /> Laws & Treaties
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <HeritageMap />
        </ScrollReveal>

        {/* Disclaimer */}
        <ScrollReveal delay={0.5}>
          <div className="mt-8 p-4 bg-[rgba(220,38,38,0.05)] rounded border border-[rgba(220,38,38,0.15)]">
            <div className="flex items-start gap-3">
              <AlertTriangle size={16} className="text-red-400/60 shrink-0 mt-0.5" />
              <p className="text-xs text-[#C9B99A]/50 leading-relaxed">
                Tribal territories overlapped, shifted over time, and were not fixed like modern state borders. The nations listed are based on historical research and should be used as a starting point for further study. Always verify using original records and multiple sources. Information on vital records processes is subject to change — confirm directly with the state office before submitting requests.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
