// ============================================
// DAWES ROLLS & ANCESTRY RESEARCH DATA
// ============================================

export interface ReclassificationLaw {
  year: string
  name: string
  desc: string
  impact: string
}

export interface DawesTribe {
  name: string
  alsoKnownAs: string[]
  rollYears: string
  enrollmentCount: string
  searchUrl: string
  notes: string
}

export interface AncestryKeyPoint {
  number: number
  title: string
  description: string
}

// ============================================
// RECONCILIATION — Tribes with Dawes Roll Records
// ============================================
export const DAWES_TRIBES: DawesTribe[] = [
  {
    name: 'Cherokee Nation',
    alsoKnownAs: ['Tsalagi', 'Ani-Yun-Wiya'],
    rollYears: '1898–1906',
    enrollmentCount: '41,798 enrolled',
    searchUrl: 'https://www.okhistory.org/research/dawes',
    notes: 'The largest of the Five Civilized Tribes. Many Cherokee of mixed ancestry were classified as "colored" on early censuses before being enrolled on the Dawes Rolls. Search both the "Cherokee by Blood" and "Cherokee Freedmen" rolls — many Indigenous families appear on both.',
  },
  {
    name: 'Choctaw Nation',
    alsoKnownAs: ['Chahta', 'Chata'],
    rollYears: '1898–1906',
    enrollmentCount: '25,000+ enrolled',
    searchUrl: 'https://www.okhistory.org/research/dawes',
    notes: 'The Choctaw were the first of the Five Civilized Tribes forcibly removed on the Trail of Tears. The Choctaw Freedmen rolls contain thousands of Indigenous families reclassified as "colored."',
  },
  {
    name: 'Chickasaw Nation',
    alsoKnownAs: ['Chikasha'],
    rollYears: '1898–1906',
    enrollmentCount: '6,500+ enrolled',
    searchUrl: 'https://www.okhistory.org/research/dawes',
    notes: 'The Chickasaw were known as fierce warriors. Their Dawes records include both "by blood" and freedmen rolls — many families classified as "negro" or "colored" on census records were enrolled as Chickasaw citizens.',
  },
  {
    name: 'Creek (Muscogee) Nation',
    alsoKnownAs: ['Mvskoke', 'Muscogee'],
    rollYears: '1898–1906',
    enrollmentCount: '18,000+ enrolled',
    searchUrl: 'https://www.okhistory.org/research/dawes',
    notes: 'The Creek Confederacy was a union of many towns. Creek Freedmen rolls document thousands of Indigenous peoples reclassified under racial integrity laws. Search both "Creek by Blood" and "Creek Freedmen."',
  },
  {
    name: 'Seminole Nation',
    alsoKnownAs: ['Siminoli', 'Isti-Simino-li'],
    rollYears: '1898–1906',
    enrollmentCount: '3,000+ enrolled',
    searchUrl: 'https://www.okhistory.org/research/dawes',
    notes: 'Descendants of Creek and Hitchiti peoples who migrated to Florida. The Seminole freedmen rolls include Black Seminole peoples — many of whom were Indigenous peoples classified as "African" by census takers.',
  },
  {
    name: 'Delaware (Lenape)',
    alsoKnownAs: ['Lenape', 'Lenni-Lenape'],
    rollYears: '1898–1906',
    enrollmentCount: '1,700+ enrolled',
    searchUrl: 'https://www.okhistory.org/research/dawes',
    notes: 'The Delaware were adopted into the Cherokee Nation. Search Cherokee rolls for Delaware ancestors. Many Delaware families in the Northeast were classified as "colored" or "mulatto" on census records.',
  },
  {
    name: 'Shawnee',
    alsoKnownAs: ['Shaawanwaki', 'Shawanese'],
    rollYears: '1898–1906',
    enrollmentCount: '800+ enrolled',
    searchUrl: 'https://www.okhistory.org/research/dawes',
    notes: 'The Shawnee were also adopted into the Cherokee Nation. Tecumseh was Shawnee. Search Cherokee rolls for Shawnee ancestors. Eastern Shawnee and Absentee Shawnee have separate records.',
  },
  {
    name: 'Ottawa (Odawa)',
    alsoKnownAs: ['Odawa', 'Grand River Ottawa'],
    rollYears: '1898–1906',
    enrollmentCount: '500+ enrolled',
    searchUrl: 'https://www.okhistory.org/research/dawes',
    notes: 'Part of the Three Fires Confederacy. Ottawa ancestors may appear on rolls under "Ottawa" or within affiliated band records.',
  },
  {
    name: 'Wyandotte',
    alsoKnownAs: ['Wendat', 'Huron'],
    rollYears: '1898–1906',
    enrollmentCount: '400+ enrolled',
    searchUrl: 'https://www.okhistory.org/research/dawes',
    notes: 'Iroquoian-speaking peoples originally from the Great Lakes. Wyandotte records are part of the Five Tribes agency records.',
  },
  {
    name: 'Potawatomi',
    alsoKnownAs: ['Neshnabémwen', 'Neshnabek'],
    rollYears: '1898–1906',
    enrollmentCount: '1,500+ enrolled',
    searchUrl: 'https://www.okhistory.org/research/dawes',
    notes: 'Part of the Three Fires Confederacy. The Citizen Potawatomi Nation has extensive enrollment records. Many Potawatomi in the Midwest were classified as "colored" on state census records.',
  },
  {
    name: 'Pawnee',
    alsoKnownAs: ['Chaticks si Chatiks', 'Men of Men'],
    rollYears: '1898–1906',
    enrollmentCount: '2,500+ enrolled',
    searchUrl: 'https://www.okhistory.org/research/dawes',
    notes: 'The Pawnee are a Caddoan-speaking people. Their scouts served with the U.S. Army. Search Pawnee agency records.',
  },
  {
    name: 'Kiowa',
    alsoKnownAs: ['Kaigwu', 'Kwuda'],
    rollYears: '1898–1906',
    enrollmentCount: '1,000+ enrolled',
    searchUrl: 'https://www.okhistory.org/research/dawes',
    notes: 'The Kiowa are a Plains tribe closely allied with the Comanche. Kiowa records are part of the Kiowa-Comanche-Apache agency records.',
  },
  {
    name: 'Comanche',
    alsoKnownAs: ['Nʉmʉnʉʉ', 'Lords of the Plains'],
    rollYears: '1898–1906',
    enrollmentCount: '1,500+ enrolled',
    searchUrl: 'https://www.okhistory.org/research/dawes',
    notes: 'The Comanche were known as fierce warriors who dominated the Southern Plains. Part of the Kiowa-Comanche-Apache agency records.',
  },
  {
    name: 'Apache (various bands)',
    alsoKnownAs: ['Ndé', 'Diné', 'Inde'],
    rollYears: '1898–1906',
    enrollmentCount: '3,000+ enrolled',
    searchUrl: 'https://www.okhistory.org/research/dawes',
    notes: 'Includes Fort Sill Apache, Kiowa-Apache, and other Apache bands. Many Apache peoples were held as prisoners of war at Fort Sill after 1886.',
  },
]

// ============================================
// RECONCILIATION — Laws That Reclassified Indigenous Peoples
// ============================================
export const RECONCILIATION_LAWS: ReclassificationLaw[] = [
  {
    year: '1662',
    name: 'Partus Sequitur Ventrem (Virginia)',
    desc: '"Offspring follows the womb" — declared that children born in the colonies took the status of their mother. If the mother was enslaved, the child was enslaved. This law created the foundation for race-based slavery and was later used to reclassify Indigenous women and their children as "negro" or "colored."',
    impact: 'Indigenous women who married or had children with African-descended peoples had their children legally classified as "negro," erasing their Native lineage from official records.',
  },
  {
    year: '1691',
    name: 'Anti-Miscegenation Act (Virginia)',
    desc: 'The first law in the colonies banning interracial marriage. Targeted "negroes, mulattoes, and Indians" marrying white people. This law began the legal separation of "races" and set the precedent for racial classification systems.',
    impact: 'Created the legal framework for classifying people by "race." Indigenous peoples who married outside their group were often reclassified on census records.',
  },
  {
    year: '1787',
    name: 'Northwest Ordinance — Indian Title Doctrine',
    desc: 'Established the doctrine of "Indian title" — recognizing that Indigenous peoples held original title to the land, but that the U.S. government held ultimate sovereignty. This created the legal basis for treaties and land cessions.',
    impact: 'While appearing to recognize Indigenous land rights, this doctrine set the stage for systematic land theft through treaties that were often violated.',
  },
  {
    year: '1830',
    name: 'Indian Removal Act',
    desc: 'Signed by President Andrew Jackson, this law authorized the forced removal of Indigenous peoples from their ancestral homelands in the southeastern United States to lands west of the Mississippi River.',
    impact: 'The Trail of Tears — thousands of Cherokee, Choctaw, Chickasaw, Creek, and Seminole people died during forced marches. Those who remained in the East were often classified as "colored" or "free persons of color."',
  },
  {
    year: '1840s–1850s',
    name: 'One-Drop Rule Emergence',
    desc: 'The informal "one-drop rule" began spreading through Southern states — anyone with even "one drop" of African blood was classified as Black/Negro. This rule was later used to reclassify many Indigenous peoples whose families included any African-descended members.',
    impact: 'Many Indigenous peoples with mixed ancestry were reclassified as "colored" or "negro" on census records, effectively erasing their Native identity.',
  },
  {
    year: '1887',
    name: 'Dawes Act (General Allotment Act)',
    desc: 'Authorized the President to break up communal tribal lands into individual allotments. "Excess" land was sold to non-Natives. This resulted in the loss of over 90 million acres of tribal land.',
    impact: 'The Dawes Rolls were created to determine who was eligible for land allotments — but many Indigenous peoples were excluded, classified as "colored," or enrolled as "freedmen" rather than "by blood."',
  },
  {
    year: '1898–1914',
    name: 'Dawes Commission Enrollment',
    desc: 'The Dawes Commission enrolled citizens of the Five Civilized Tribes. Enrollment cards recorded family information, including parents, grandparents, and sometimes great-grandparents. The rolls were divided into "by blood" and "freedmen" categories.',
    impact: 'The classification of many Indigenous families as "freedmen" rather than "by blood" created a lasting divide. Many families with clear Indigenous lineage were placed on freedmen rolls due to census classifications of "colored."',
  },
  {
    year: '1924',
    name: 'Racial Integrity Act (Virginia)',
    desc: 'The most severe racial classification law in U.S. history. Required every birth to be classified as either "white" or "colored." Defined a "colored" person as anyone with any known non-white ancestry. Walter Plecker, the Virginia registrar, used this law to reclassify Indigenous peoples as "colored."',
    impact: 'Plecker specifically targeted Indigenous peoples in Virginia, issuing bulletins to doctors and midwives demanding that "Indians" be recorded as "colored." This destroyed the legal identity of the Pamunkey, Mattaponi, Chickahominy, and other Virginia tribes.',
  },
  {
    year: '1924',
    name: 'Indian Citizenship Act',
    desc: 'Granted U.S. citizenship to all Indigenous peoples born in the United States. While appearing to be an act of inclusion, it was also a tool of assimilation — citizenship came with the expectation of abandoning tribal citizenship and traditions.',
    impact: 'Many Indigenous peoples who had been classified as "colored" were never informed of their right to claim their Indigenous identity. Their descendants grew up without knowing their true heritage.',
  },
]

// ============================================
// 10 KEY POINTS FOR ANCESTRY RESEARCH
// ============================================
export const ANCESTRY_KEY_POINTS: AncestryKeyPoint[] = [
  {
    number: 1,
    title: 'Start With What You Know',
    description: 'Begin with yourself and work backward. Write down every name, date, and place you know about your parents, grandparents, and great-grandparents. Family stories are often more accurate than official records.',
  },
  {
    number: 2,
    title: 'Search the Dawes Rolls',
    description: 'The Dawes Rolls (1898–1914) are the most comprehensive record of Indigenous families in Indian Territory. Search by surname at the Oklahoma Historical Society database. Check both "by blood" and "freedmen" rolls — many families appear on both.',
  },
  {
    number: 3,
    title: 'Check Census Records — All of Them',
    description: 'Your ancestors may be classified differently on each census: "Indian" in 1870, "mulatto" in 1880, "colored" in 1900, "Black" in 1910. These changes reflect shifting racial classification systems, not changes in identity.',
  },
  {
    number: 4,
    title: 'Look for Geographic Clusters',
    description: 'Indigenous families often lived in clusters — specific counties, townships, or neighborhoods. If you find ancestors in areas known for Indigenous communities (Eastern Shore MD, Southside VA, Robeson County NC, Nanticoke DE), dig deeper.',
  },
  {
    number: 5,
    title: 'Study the Guion Miller Rolls',
    description: 'The Guion Miller Rolls (1906–1911) documented Eastern Cherokee applicants. Over 90,000 people applied. Even denied applications contain valuable family information, including testimony about Indigenous ancestry.',
  },
  {
    number: 6,
    title: 'Research State-Recognized Tribes',
    description: 'Many states have their own tribal recognition processes. State-recognized tribes in NC, VA, MD, DE, NJ, SC, AL, LA, and CT maintain their own rolls and genealogical records. Contact tribal offices directly.',
  },
  {
    number: 7,
    title: 'Understand Racial Reclassification',
    description: 'The Racial Integrity Act of 1924 and similar laws deliberately reclassified Indigenous peoples as "colored." Census takers often ignored self-identified Indigenous people and wrote "B" (Black) or "Mu" (mulatto) instead of "In" (Indian).',
  },
  {
    number: 8,
    title: 'Check Military Records',
    description: 'Many Indigenous peoples served as scouts and soldiers. Confederate and Union military records, Indian Wars records, and Buffalo Soldier records may document Indigenous service members classified as "colored."',
  },
  {
    number: 9,
    title: 'Search the Eastern Cherokee Applications',
    description: 'Over 45,000 applications were filed for Eastern Cherokee payment. Each file contains detailed family information, witness testimony, and sometimes photographs — even for denied applications. Available through NARA and Fold3.',
  },
  {
    number: 10,
    title: 'Connect With Tribal Organizations',
    description: 'Many tribes maintain their own enrollment offices and genealogical resources. The Nanticoke Lenni-Lenape, Meherrin, Waccamaw Siouan, and other state-recognized tribes can help verify ancestry. Be respectful and patient — enrollment is their sovereign decision.',
  },
]

// ============================================
// DAWES ROLLS SEARCH RESOURCES
// ============================================
export const DAWES_RESOURCES = [
  {
    name: 'Oklahoma Historical Society — Dawes Rolls',
    url: 'https://www.okhistory.org/research/dawes',
    desc: 'Search the Dawes Rolls by name. Includes enrollment cards, census cards, and applications.',
  },
  {
    name: 'National Archives — Dawes Records',
    url: 'https://www.archives.gov/research/native-americans/dawes-rolls',
    desc: 'Official NARA guide to Dawes Rolls with research guidance and record descriptions.',
  },
  {
    name: 'Fold3 — Native American Records',
    url: 'https://www.fold3.com/browse/326',
    desc: 'Subscription database with digitized Dawes applications, Guion Miller rolls, and Eastern Cherokee applications.',
  },
  {
    name: 'Access Genealogy — Indian Census',
    url: 'https://accessgenealogy.com/native/indian-census-rolls-1885-1940',
    desc: 'Free database of Indian Census Rolls from 1885–1940 for reservations across the U.S.',
  },
  {
    name: 'National Archives — Guion Miller Rolls',
    url: 'https://www.archives.gov/research/native-americans/guion-miller-rolls',
    desc: 'Search the Guion Miller Rolls for Eastern Cherokee ancestry. Over 90,000 applications.',
  },
  {
    name: 'Bureau of Indian Affairs — Tribal Leaders',
    url: 'https://www.bia.gov/bia/ois/tribal-leaders-directory/',
    desc: 'Directory of federally recognized tribes with contact information for enrollment offices.',
  },
]
