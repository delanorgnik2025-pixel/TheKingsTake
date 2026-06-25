// ============================================
// COMPLETE 50-STATE INDIGENOUS HERITAGE DATABASE
// AASOTU Media Group LLC | #TheKingsTake
// ============================================

export interface TribeDetail {
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

export interface TreatyDetail {
  name: string
  year: string
  fullText: string
  signatories: string[]
  impact: string
}

export interface StateData {
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

// ============================================
// TRIBE DATABASE — Detailed info on click
// ============================================
export const TRIBE_DB: Record<string, TribeDetail> = {
  'Muscogee (Creek) Nation': {
    name: 'Muscogee (Creek) Nation',
    alsoKnownAs: ['Creek', 'Muscogee', 'Mvskoke'],
    location: 'Oklahoma (historically Alabama, Georgia, Florida)',
    status: 'Federally Recognized',
    population: 'Approximately 90,000 enrolled citizens',
    language: 'Mvskoke (Creek/Muskogee) — classified as endangered',
    history: 'The Muscogee people are descendants of the Mississippian culture that built mound cities throughout the Southeast. They formed the Creek Confederacy — a union of multiple towns (talwa) speaking related languages. During the 18th century, they became known as "Creek" by British traders due to the Ocmulgee River\'s network of streams. The Muscogee were one of the "Five Civilized Tribes" forcibly removed to Indian Territory (Oklahoma) on the Trail of Tears between 1836-1837.',
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
    history: 'The Cherokee are an Iroquoian-speaking people who inhabited the southeastern United States for thousands of years. They developed one of the most advanced Indigenous nations — with a written constitution, bilingual newspaper (Cherokee Phoenix), and a sophisticated political system. The discovery of gold on Cherokee land in Georgia in 1829 led to intense pressure for removal. Despite winning in the Supreme Court (Worcester v. Georgia, 1832), President Andrew Jackson refused to enforce the ruling. The Treaty of New Echota (1835), signed by an unauthorized minority faction, led to the Trail of Tears (1838-1839).',
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
    history: 'The Yuchi are one of the most ancient peoples of the Southeast, predating both Creek and Cherokee presence in the region. Their oral history claims they "came from the sun." The Yuchi language is a linguistic isolate, meaning it has no known relation to any other language family in the world. During removal, Yuchi people were scattered. Many were forcibly relocated to Oklahoma with the Creek Nation.',
    currentStatus: 'The Euchee/Yuchi Language Project works to revitalize their critically endangered language. They maintain ceremonial grounds in both Oklahoma and Florida.',
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
    history: 'The Hitchiti were a Muskogean-speaking people closely related to the Muscogee (Creek). They inhabited central Georgia before European contact. Many Hitchiti people migrated to Florida during the Creek Wars and became founding members of the Seminole and Miccosukee tribes.',
    currentStatus: 'The Hitchiti people are primarily represented through the Seminole Tribe of Florida and the Miccosukee Tribe. The Hitchiti-Mikasuki language is still spoken by a small number of elders.',
    resources: [
      { label: 'Seminole Tribe of Florida', url: 'https://www.seminoletribe.com' },
    ],
  },
  'Shawnee': {
    name: 'Shawnee',
    alsoKnownAs: ['Shaawanwaki', 'Shawanese'],
    location: 'Oklahoma (historically Ohio, Pennsylvania, West Virginia, Kentucky, Tennessee, Georgia)',
    status: 'Federally Recognized (three separate tribes)',
    population: 'Approximately 15,000 enrolled across all Shawnee tribes',
    language: 'Shawnee (Algonquian) — severely endangered',
    history: 'The Shawnee are an Algonquian-speaking people who originally inhabited the Ohio River Valley. Known as fierce warriors and respected diplomats, they were frequently displaced by expanding colonial settlements. The Shawnee leader Tecumseh organized a massive pan-Indian confederacy to resist American expansion. Most Shawnee were removed to Indian Territory (Oklahoma) in the 1830s.',
    currentStatus: 'Three federally recognized Shawnee tribes: the Absentee Shawnee Tribe, the Eastern Shawnee Tribe of Oklahoma, and the Shawnee Tribe.',
    resources: [
      { label: 'Shawnee Tribe', url: 'https://www.shawnee-tribe.com' },
      { label: 'Absentee Shawnee Tribe', url: 'https://astribe.com' },
    ],
  },
  'Yamasee': {
    name: 'Yamasee',
    alsoKnownAs: ['Yemassee', 'Yamasi'],
    location: 'South Carolina, Georgia, Florida',
    status: 'State-recognized by South Carolina in 2023',
    population: 'Unknown; descendants scattered across the Southeast',
    language: 'Extinct — possibly Muskogean or a distinct language',
    history: 'The Yamasee were a multi-ethnic confederation of peoples who inhabited coastal Georgia and South Carolina. They were central players in the Yamasee War of 1715 — one of the most significant Indigenous uprisings against British colonists. After the war, Yamasee peoples scattered. Some joined the Seminole in Florida, some relocated to Louisiana, and others remained in South Carolina.',
    currentStatus: 'The Yamassee Nation in South Carolina received state recognition in 2023. Descendants continue to work toward federal recognition.',
    resources: [
      { label: 'Yamassee Nation', url: 'https://www.yamasseenation.com' },
    ],
  },
  'Eastern Band of Cherokee Indians': {
    name: 'Eastern Band of Cherokee Indians',
    alsoKnownAs: ['Eastern Cherokee', 'Qualla Boundary Cherokee'],
    location: 'Western North Carolina',
    status: 'Federally Recognized',
    population: 'Approximately 16,000 enrolled members',
    language: 'Cherokee (Tsalagi)',
    history: 'The Eastern Band of Cherokee Indians are descendants of those Cherokee who remained in the mountains of western North Carolina after the Trail of Tears. Under the leadership of Tsali, a small group refused to leave their ancestral lands. They hid in the remote mountains and gradually re-established their community. The Qualla Boundary reservation was formally established in 1876.',
    currentStatus: 'Headquartered in Cherokee, North Carolina. Operates Harrah\'s Cherokee Casino, the largest employer in western North Carolina. Runs the Museum of the Cherokee Indian and the Oconaluftee Indian Village.',
    resources: [
      { label: 'Official Website', url: 'https://ebci.com' },
      { label: 'Cherokee Indian Reservation', url: 'https://visitcherokeenc.com' },
    ],
  },
  'Lumbee Tribe': {
    name: 'Lumbee Tribe',
    alsoKnownAs: ['Croatan', 'Cherokee Indians of Robeson County'],
    location: 'Robeson County, North Carolina',
    status: 'State-recognized; seeking full federal recognition since 1885',
    population: 'Approximately 55,000 enrolled members — largest tribe east of the Mississippi',
    language: 'English historically; original language lost due to early contact',
    history: 'The Lumbee are the largest Native American tribe east of the Mississippi River. Their origins trace back to the indigenous peoples of the Carolina coastal plain who intermarried with European settlers and free people of color. They have been fighting for federal recognition since 1885. The Lumbee Act of 1956 recognized them as Indian but denied full benefits.',
    currentStatus: 'The Lumbee Tribe continues its fight for full federal recognition. They have their own tribal government, educational programs, and cultural preservation efforts. The Lumbee Tribe Heritage Center is located in Pembroke, NC.',
    resources: [
      { label: 'Official Website', url: 'https://www.lumbeetribe.com' },
    ],
  },
  'Seminole Tribe of Florida': {
    name: 'Seminole Tribe of Florida',
    alsoKnownAs: ['Seminole', 'Unconquered People'],
    location: 'Florida (Hollywood, Brighton, Big Cypress, Immokalee, Fort Pierce)',
    status: 'Federally Recognized',
    population: 'Approximately 4,000 enrolled members',
    language: 'Mikasuki (also called Hitchiti-Mikasuki) and Creek (Mvskoke)',
    history: 'The Seminole formed in Florida during the 18th century from a mixture of Creek refugees, free African Americans, and Indigenous peoples of Florida. They fought three wars against the United States (1817-1858) and never surrendered. The Seminole Tribe of Florida gained federal recognition in 1957 through a corporate charter.',
    currentStatus: 'Headquartered in Hollywood, Florida. Operates the Hard Rock International brand globally. One of the most economically successful tribes in the United States.',
    resources: [
      { label: 'Official Website', url: 'https://www.seminoletribe.com' },
    ],
  },
  'Navajo Nation (Diné)': {
    name: 'Navajo Nation (Diné)',
    alsoKnownAs: ['Diné', 'Naabeehó'],
    location: 'Arizona, New Mexico, Utah — largest reservation in the U.S.',
    status: 'Federally Recognized',
    population: 'Over 399,000 enrolled citizens — second largest tribe in the U.S.',
    language: 'Diné Bizaad (Navajo) — most widely spoken Indigenous language in the U.S.',
    history: 'The Navajo are speakers of an Athabaskan language who migrated to the Southwest from present-day Canada between 1100-1500 AD. They adopted farming and sheep herding from the Pueblo peoples. During the 1860s, the U.S. military forced approximately 9,000 Navajo to walk 300 miles to Bosque Redondo, New Mexico — an internment camp where hundreds died. The Treaty of 1868 allowed their return to their homeland.',
    currentStatus: 'Headquartered in Window Rock, Arizona. The Navajo Nation covers over 27,000 square miles — larger than 10 U.S. states. They have their own president, council, court system, and police force.',
    resources: [
      { label: 'Official Website', url: 'https://www.navajo-nsn.gov' },
    ],
  },
  'Pamunkey Indian Tribe': {
    name: 'Pamunkey Indian Tribe',
    alsoKnownAs: ['Pamunkey', 'Powhatan Confederacy'],
    location: 'King William County, Virginia',
    status: 'Federally Recognized (2016)',
    population: 'Approximately 400 enrolled members',
    language: 'Virginia Algonquian — extinct; being revitalized',
    history: 'The Pamunkey are one of the original tribes of the Powhatan Confederacy, which included approximately 30 Algonquian-speaking tribes when the English arrived at Jamestown in 1607. Pocahontas (Matoaka) was a Pamunkey. They maintained their reservation through the Racial Integrity Act of 1924, which attempted to erase Native identity in Virginia.',
    currentStatus: 'The Pamunkey Indian Tribe received federal recognition in 2016 — the first Virginia tribe to do so. They maintain a 1,200-acre reservation, one of the oldest in the United States, continuously occupied since the 1600s.',
    resources: [
      { label: 'Official Website', url: 'https://www.pamunkey.org' },
    ],
  },
  'Choctaw Nation': {
    name: 'Choctaw Nation',
    alsoKnownAs: ['Chahta', 'Choctaw Nation of Oklahoma'],
    location: 'Oklahoma (historically Mississippi, Alabama, Louisiana)',
    status: 'Federally Recognized — Third largest tribe in the U.S.',
    population: 'Over 200,000 enrolled members',
    language: 'Chahta (Choctaw) — Muskogean language family',
    history: 'The Choctaw are a Muskogean-speaking people who inhabited Mississippi and Alabama. They were known as one of the "Five Civilized Tribes" and had a highly organized society with district chiefs. The Choctaw were the first tribe removed under the Indian Removal Act, forced to walk to Indian Territory on what became known as the Trail of Tears (1831-1833). The Choctaw Nation signed nine treaties with the United States between 1786 and 1855, ceding over 32 million acres of land.',
    currentStatus: 'Headquartered in Durant, Oklahoma. The Choctaw Nation operates healthcare facilities, educational programs, and cultural preservation efforts. They are one of the largest employers in southeastern Oklahoma.',
    resources: [
      { label: 'Official Website', url: 'https://www.choctawnation.com' },
    ],
  },
  'Chickasaw Nation': {
    name: 'Chickasaw Nation',
    alsoKnownAs: ['Chikasha'],
    location: 'Oklahoma (historically Mississippi, Alabama, Tennessee, Kentucky)',
    status: 'Federally Recognized',
    population: 'Over 60,000 enrolled members',
    language: 'Chikashshanompa\' (Chickasaw) — Muskogean language family',
    history: 'The Chickasaw are a Muskogean-speaking people closely related to the Choctaw. They inhabited northern Mississippi, western Tennessee, Alabama, and Kentucky. Known as fierce warriors, the Chickasaw successfully defended their territory against French invasion in the 1730s. They were forcibly removed to Indian Territory in 1837 during the Trail of Tears. The Chickasaw Nation was the last of the Five Civilized Tribes to be removed.',
    currentStatus: 'Headquartered in Ada, Oklahoma. The Chickasaw Nation operates numerous businesses including casinos, hotels, and a bank. They are one of the most economically successful tribes in the United States.',
    resources: [
      { label: 'Official Website', url: 'https://www.chickasaw.net' },
    ],
  },
  'Haudenosaunee (Iroquois Confederacy)': {
    name: 'Haudenosaunee (Iroquois Confederacy)',
    alsoKnownAs: ['Six Nations', 'Iroquois', 'People of the Longhouse'],
    location: 'New York, Ontario, Quebec, Wisconsin, Oklahoma',
    status: 'Federally Recognized (multiple member nations)',
    population: 'Approximately 125,000 across all six nations',
    language: 'Six distinct languages: Mohawk, Oneida, Onondaga, Cayuga, Seneca, Tuscarora',
    history: 'The Haudenosaunee Confederacy was founded centuries ago when the Peacemaker brought together five warring nations (Mohawk, Oneida, Onondaga, Cayuga, Seneca) under the Great Law of Peace. The Tuscarora joined later, making it the Six Nations. The Haudenosaunee developed one of the world\'s oldest participatory democracies, which influenced the framers of the U.S. Constitution, particularly Benjamin Franklin.',
    currentStatus: 'The Six Nations maintain their traditional government and ceremonies. The Seneca Nation operates three casinos in western New York. The Oneida Nation operates Turning Stone Resort. The Confederacy continues to advocate for Indigenous rights internationally.',
    resources: [
      { label: 'Haudenosaunee Confederacy', url: 'https://www.haudenosauneeconfederacy.com' },
    ],
  },
  'Catawba Indian Nation': {
    name: 'Catawba Indian Nation',
    alsoKnownAs: ['Catawba', 'Ye Iswa ("People of the River")'],
    location: 'Rock Hill, South Carolina (historically Catawba River Valley)',
    status: 'Federally Recognized (1993 restoration)',
    population: 'Approximately 2,800 enrolled members',
    language: 'Catawba — extinct; revitalization efforts ongoing',
    history: 'The Catawba are a Siouan-speaking people who inhabited the Catawba River Valley in present-day South Carolina for thousands of years. They were known as skilled potters and formed alliances with European colonists during the colonial period. The Catawba Nation was terminated by South Carolina in 1962 but regained federal recognition in 1993.',
    currentStatus: 'Headquartered in Rock Hill, South Carolina. The Catawba Indian Nation operates a casino and hotel complex and continues their traditional pottery-making practices. They received a $50 million settlement for land claims in 1993.',
    resources: [
      { label: 'Official Website', url: 'https://www.catawba.com' },
    ],
  },
  'Osage Nation': {
    name: 'Osage Nation',
    alsoKnownAs: ['Wahzhazhe', 'Ni-u-kon-ska ("People of the Middle Waters")'],
    location: 'Oklahoma (historically Missouri, Arkansas, Kansas)',
    status: 'Federally Recognized',
    population: 'Approximately 25,000 enrolled members',
    language: 'Wazhazhe ie (Osage) — Siouan language family',
    history: 'The Osage are a Dhegihan Siouan-speaking people who originally inhabited the Ohio River Valley before migrating west to the Missouri and Arkansas River valleys. They became known as skilled warriors and controlled a vast territory through alliances and military strength. The Osage were forcibly removed to Indian Territory in 1872. In the 1890s, oil was discovered under their land, making them briefly the richest people per capita in the world.',
    currentStatus: 'Headquartered in Pawhuska, Oklahoma. The Osage Nation operates under a modern constitution adopted in 2006. They are featured prominently in the book and film "Killers of the Flower Moon" which documents the Osage Reign of Terror.',
    resources: [
      { label: 'Official Website', url: 'https://www.osagenation-nsn.gov' },
    ],
  },
  'Poarch Band of Creek Indians': {
    name: 'Poarch Band of Creek Indians',
    alsoKnownAs: ['Poarch Creek'],
    location: 'Escambia County, Alabama',
    status: 'Federally Recognized (1984) — Only federally recognized tribe in Alabama',
    population: 'Approximately 3,000 enrolled members',
    language: 'Mvskoke (Creek) — some language preservation efforts',
    history: 'The Poarch Band descends from Creek (Muscogee) people who remained in Alabama after the majority of the Creek Nation was forcibly removed to Indian Territory on the Trail of Tears in the 1830s. They managed to maintain their community and cultural identity despite enormous pressure to assimilate. The Poarch Band received federal recognition in 1984 after a long struggle.',
    currentStatus: 'Headquartered in Atmore, Alabama. Operates the Wind Creek Casino & Hotel, one of the largest employers in the region. Active in cultural preservation and economic development.',
    resources: [
      { label: 'Official Website', url: 'https://pci-nsn.gov' },
    ],
  },
  'Seminole Tribe of Florida': {
    name: 'Seminole Tribe of Florida',
    alsoKnownAs: ['Seminole', 'Unconquered People'],
    location: 'Florida (Hollywood, Brighton, Big Cypress, Immokalee, Fort Pierce)',
    status: 'Federally Recognized',
    population: 'Approximately 4,000 enrolled members',
    language: 'Mikasuki (Hitchiti-Mikasuki) and Creek (Mvskoke)',
    history: 'The Seminole formed in Florida during the 18th century from a mixture of Creek refugees, free African Americans, and Indigenous peoples of Florida. They fought three wars against the United States (1817-1858) and never formally surrendered. The Seminole are known as the "Unconquered People" because they never signed a treaty of peace with the U.S. The Seminole Tribe of Florida gained federal recognition in 1957.',
    currentStatus: 'Headquartered in Hollywood, Florida. Operates the Hard Rock International brand globally. One of the most economically successful tribes in the United States.',
    resources: [
      { label: 'Official Website', url: 'https://www.seminoletribe.com' },
    ],
  },
  'Miccosukee Tribe of Indians': {
    name: 'Miccosukee Tribe of Indians',
    alsoKnownAs: ['Miccosukee', 'Mikasuki'],
    location: 'Florida Everglades',
    status: 'Federally Recognized (1962)',
    population: 'Approximately 600 enrolled members',
    language: 'Mikasuki — spoken by most tribal members',
    history: 'The Miccosukee are closely related to the Seminole but maintain a separate political identity. They are descendants of Creek (Muscogee) peoples who migrated to Florida and mixed with Indigenous Florida peoples. The Miccosukee fought in the Seminole Wars and remained in the Everglades, refusing removal. They received federal recognition separately from the Seminole in 1962.',
    currentStatus: 'The Miccosukee Tribe operates their own police force, court system, and schools. They are known for their traditional Everglades lifestyle and cultural preservation. The Miccosukee Indian Village is a popular cultural attraction.',
    resources: [
      { label: 'Official Website', url: 'https://www.miccosukee.com' },
    ],
  },
  'Catawba Indian Nation': {
    name: 'Catawba Indian Nation',
    alsoKnownAs: ['Catawba', 'Ye Iswa ("People of the River")'],
    location: 'Rock Hill, South Carolina (historically Catawba River Valley)',
    status: 'Federally Recognized (1993 restoration)',
    population: 'Approximately 2,800 enrolled members',
    language: 'Catawba — extinct; revitalization efforts ongoing',
    history: 'The Catawba are a Siouan-speaking people who inhabited the Catawba River Valley in present-day South Carolina for thousands of years. They were known as skilled potters and formed alliances with European colonists. The Catawba Nation was terminated by South Carolina in 1962 but regained federal recognition in 1993 after decades of advocacy.',
    currentStatus: 'Headquartered in Rock Hill, South Carolina. Operates a casino and hotel complex. Known for traditional Catawba pottery, which has been made in the same style for thousands of years. Received a $50 million land claims settlement in 1993.',
    resources: [
      { label: 'Official Website', url: 'https://www.catawba.com' },
    ],
  },
  'Navajo Nation (Diné)': {
    name: 'Navajo Nation (Diné)',
    alsoKnownAs: ['Diné', 'Naabeehó'],
    location: 'Arizona, New Mexico, Utah — largest reservation in the U.S. (27,000+ sq miles)',
    status: 'Federally Recognized — Second largest tribe in the U.S.',
    population: 'Over 399,000 enrolled citizens',
    language: 'Diné Bizaad (Navajo) — most widely spoken Indigenous language in the U.S.',
    history: 'The Navajo are speakers of an Athabaskan language who migrated to the Southwest from present-day Canada between 1100-1500 AD. They adopted farming and sheep herding from the Pueblo peoples. During the 1860s, the U.S. military forced approximately 9,000 Navajo to walk 300 miles to Bosque Redondo, New Mexico — an internment camp where hundreds died. The Treaty of 1868 allowed their return to their homeland. Navajo Code Talkers played a crucial role in World War II.',
    currentStatus: 'Headquartered in Window Rock, Arizona. The Navajo Nation is larger than 10 U.S. states. They have their own president, council, court system, and police force. The Nation has faced significant challenges including COVID-19 (highest infection rate in the U.S. at one point) and lack of running water in many communities.',
    resources: [
      { label: 'Official Website', url: 'https://www.navajo-nsn.gov' },
    ],
  },
  'Tohono O\'odham Nation': {
    name: 'Tohono O\'odham Nation',
    alsoKnownAs: ['Papago (historical name)', 'Desert People'],
    location: 'Southern Arizona (4,400 sq miles — second largest reservation)',
    status: 'Federally Recognized',
    population: 'Approximately 34,000 enrolled members',
    language: 'O\'odham ñiok (Tohono O\'odham language) — Uto-Aztecan family',
    history: 'The Tohono O\'odham ("Desert People") are descendants of the ancient Hohokam people who built sophisticated irrigation systems in the Arizona desert over 1,000 years ago. Their traditional territory spans the U.S.-Mexico border, and many tribal members still live in Mexico. The Tohono O\'odham did not sign a treaty with the United States — their reservation was created by executive order.',
    currentStatus: 'The Tohono O\'odham Nation operates three casinos, farms, and ranches. They have been at the forefront of border wall opposition, as the wall bisects their traditional lands and sacred sites. They operate their own government, courts, and police force.',
    resources: [
      { label: 'Official Website', url: 'https://www.tonation-nsn.gov' },
    ],
  },
  'Hopi Tribe': {
    name: 'Hopi Tribe',
    alsoKnownAs: ['Hopitu', 'Peaceful People'],
    location: 'Northeastern Arizona (surrounded by Navajo Nation)',
    status: 'Federally Recognized',
    population: 'Approximately 19,000 enrolled members',
    language: 'Hopi — Uto-Aztecan language isolate',
    history: 'The Hopi are one of the oldest continuously living cultures in North America, with villages on the mesas of northeastern Arizona dating back over 2,000 years. They are known for their kachina ceremonies, pottery, and agricultural wisdom. The Hopi have never signed a treaty with the United States. Their reservation was created by executive order in 1882 and is entirely surrounded by the Navajo Nation, leading to decades of land disputes.',
    currentStatus: 'The Hopi Tribe operates their own government from Kykotsmovi Village. They are known worldwide for their artistry in pottery, basket weaving, kachina dolls, and silver overlay jewelry. The Hopi maintain their traditional ceremonial calendar and agricultural practices.',
    resources: [
      { label: 'Official Website', url: 'https://www.hopi-nsn.gov' },
    ],
  },
  'Lumbee Tribe': {
    name: 'Lumbee Tribe',
    alsoKnownAs: ['Croatan (historical)', 'Cherokee Indians of Robeson County (historical)'],
    location: 'Robeson County, North Carolina',
    status: 'State-recognized; seeking full federal recognition since 1885',
    population: 'Approximately 55,000 enrolled members — largest tribe east of the Mississippi',
    language: 'English historically; original language lost due to early contact',
    history: 'The Lumbee are the largest Native American tribe east of the Mississippi River. Their origins trace back to the indigenous peoples of the Carolina coastal plain who intermarried with European settlers and free people of color. They have been fighting for federal recognition since 1885. The Lumbee Act of 1956 recognized them as Indian but denied full benefits. Henry Berry Lowry led a resistance movement against Confederate conscription during the Civil War and became a folk hero.',
    currentStatus: 'The Lumbee Tribe continues its fight for full federal recognition. They have their own tribal government, educational programs, and the Lumbee Tribe Heritage Center in Pembroke, NC. The Lumbee are known for their strong community identity and cultural resilience despite centuries of marginalization.',
    resources: [
      { label: 'Official Website', url: 'https://www.lumbeetribe.com' },
    ],
  },
  'Alabama-Coushatta Tribe': {
    name: 'Alabama-Coushatta Tribe',
    alsoKnownAs: ['Alabama-Coushatta', 'Albaamo Imathkahachi'],
    location: 'Polk County, Texas',
    status: 'Federally Recognized (1987 restoration)',
    population: 'Approximately 1,100 enrolled members',
    language: 'Alabama and Koasati (Coushatta) — both Muskogean languages',
    history: 'The Alabama-Coushatta are descended from two tribes — the Alabama and the Koasati (Coushatta) — who originally lived in Alabama and Georgia. They were forcibly removed from Alabama in the 1830s and settled in eastern Texas with permission from the Spanish. They received a reservation in 1854, the oldest reservation in Texas. Their federal recognition was terminated in 1954 and restored in 1987.',
    currentStatus: 'The Alabama-Coushatta Tribe operates the Naskila Gaming casino and the Alabama-Coushatta Tribe of Texas Economic Development Authority. They are the oldest extant tribe in Texas and maintain their traditional stomp dance ceremonies.',
    resources: [
      { label: 'Official Website', url: 'https://www.alabama-coushatta.com' },
    ],
  },
  'Choctaw Nation': {
    name: 'Choctaw Nation',
    alsoKnownAs: ['Chahta', 'Choctaw Nation of Oklahoma'],
    location: 'Oklahoma (historically Mississippi, Alabama, Louisiana)',
    status: 'Federally Recognized — Third largest tribe in the U.S.',
    population: 'Over 200,000 enrolled members',
    language: 'Chahta (Choctaw) — Muskogean language family',
    history: 'The Choctaw are a Muskogean-speaking people who inhabited Mississippi and Alabama. They were known as one of the "Five Civilized Tribes" and had a highly organized society with district chiefs. The Choctaw were the first tribe removed under the Indian Removal Act, forced to walk to Indian Territory on what became known as the Trail of Tears (1831-1833). Before removal, the Choctaw people sent $710 (over $20,000 today) to Irish famine relief in 1847 — the first international donation to Ireland.',
    currentStatus: 'Headquartered in Durant, Oklahoma. The Choctaw Nation operates healthcare facilities, educational programs, and cultural preservation efforts. They are one of the largest employers in southeastern Oklahoma.',
    resources: [
      { label: 'Official Website', url: 'https://www.choctawnation.com' },
    ],
  },
  'Chickasaw Nation': {
    name: 'Chickasaw Nation',
    alsoKnownAs: ['Chikasha'],
    location: 'Oklahoma (historically Mississippi, Alabama, Tennessee, Kentucky)',
    status: 'Federally Recognized',
    population: 'Over 60,000 enrolled members',
    language: 'Chikashshanompa\' (Chickasaw) — Muskogean language family',
    history: 'The Chickasaw are a Muskogean-speaking people closely related to the Choctaw. They inhabited northern Mississippi, western Tennessee, Alabama, and Kentucky. Known as fierce warriors, they successfully defended their territory against French invasion in the 1730s. They were forcibly removed to Indian Territory in 1837 during the Trail of Tears — the last of the Five Civilized Tribes to be removed.',
    currentStatus: 'Headquartered in Ada, Oklahoma. The Chickasaw Nation operates numerous businesses including casinos, hotels, and a bank. They are one of the most economically successful tribes in the United States.',
    resources: [
      { label: 'Official Website', url: 'https://www.chickasaw.net' },
    ],
  },
  'Kiowa Tribe': {
    name: 'Kiowa Tribe',
    alsoKnownAs: ['Ka\'igwu', 'Kiowa People'],
    location: 'Oklahoma (historically Great Plains — Colorado, Kansas, Texas, Oklahoma)',
    status: 'Federally Recognized',
    population: 'Approximately 12,000 enrolled members',
    language: 'Cáuijògà (Kiowa) — Kiowa-Tanoan language isolate',
    history: 'The Kiowa are a Plains people who migrated from the Yellowstone River area to the Southern Plains. They became known as skilled horsemen, warriors, and artists. The Kiowa were forcibly removed to Indian Territory in 1867. They are known for their ledger art — drawings on accounting ledger books that documented their history and culture. The Kiowa Six were a group of artists who became internationally famous in the early 20th century.',
    currentStatus: 'Headquartered in Carnegie, Oklahoma. The Kiowa Tribe operates a casino and cultural center. They continue their traditional Gourd Clan ceremonies and maintain strong cultural traditions including the annual Kiowa Black Leggings Warrior Society ceremony.',
    resources: [
      { label: 'Official Website', url: 'https://kiowatribe.org' },
    ],
  },
  'Comanche Nation': {
    name: 'Comanche Nation',
    alsoKnownAs: ['Nʉmʉnʉʉ ("The People")', 'Lords of the Plains'],
    location: 'Oklahoma (historically Texas, New Mexico, Colorado, Kansas)',
    status: 'Federally Recognized',
    population: 'Approximately 17,000 enrolled members',
    language: 'Nʉmʉ Tekwapʉ (Comanche) — Uto-Aztecan language, critically endangered',
    history: 'The Comanche emerged as a distinct people in the early 1700s, breaking away from the Shoshone and migrating to the Southern Plains. They became the dominant Plains tribe, known as the "Lords of the Plains" for their mastery of horseback warfare. The Comanche controlled a massive territory called Comancheria that covered much of Texas, New Mexico, Colorado, and Oklahoma. They were never defeated in battle — they were eventually forced onto a reservation through attrition and the destruction of the buffalo.',
    currentStatus: 'Headquartered in Lawton, Oklahoma. The Comanche Nation operates casinos, businesses, and cultural programs. They maintain their traditional Native American Church (peyote) ceremonies and the annual Comanche Homecoming celebration.',
    resources: [
      { label: 'Official Website', url: 'https://comanchenation.com' },
    ],
  },
  'Chitimacha Tribe': {
    name: 'Chitimacha Tribe',
    alsoKnownAs: ['Chitimacha', 'Chetimachan'],
    location: 'Charenton, Louisiana (Iberia Parish)',
    status: 'Federally Recognized',
    population: 'Approximately 1,100 enrolled members',
    language: 'Chitimacha — language isolate, extinct; being revitalized',
    history: 'The Chitimacha are the only tribe in Louisiana to still occupy a portion of their ancestral homeland. They inhabited the lower Atchafalaya River basin for thousands of years. The Chitimacha fought a war with the French in the early 1700s and were nearly exterminated. They are known for their distinctive river cane basket weaving, which is considered among the finest in North America.',
    currentStatus: 'The Chitimacha Tribe operates the Cypress Bayou Casino and Hotel. They have a small reservation near Charenton, Louisiana. Their tribal museum showcases their history and world-renowned basket collection.',
    resources: [
      { label: 'Official Website', url: 'https://www.chitimacha.gov' },
    ],
  },
  'Coushatta Tribe': {
    name: 'Coushatta Tribe',
    alsoKnownAs: ['Koasati', 'Coushatta Tribe of Louisiana'],
    location: 'Allen Parish, Louisiana',
    status: 'Federally Recognized (1973 restoration)',
    population: 'Approximately 960 enrolled members',
    language: 'Koasati (Coushatta) — Muskogean language, critically endangered',
    history: 'The Coushatta are closely related to the Alabama people and speak a Muskogean language. They originally lived in Alabama and Georgia before being forced west by European expansion. Some Coushatta settled in Louisiana while others went to Texas and Oklahoma. The Coushatta were terminated by the federal government in 1953 but regained recognition in 1973.',
    currentStatus: 'The Coushatta Tribe operates the Coushatta Casino Resort, the largest casino in Louisiana. They run a language immersion school to preserve the Koasati language. They are one of the most economically successful small tribes in the country.',
    resources: [
      { label: 'Official Website', url: 'https://www.coushattatribe.org' },
    ],
  },
  'Pee Dee Indian Tribe': {
    name: 'Pee Dee Indian Tribe',
    alsoKnownAs: ['Pee Dee', 'Pedee'],
    location: 'Marlboro and Dillon Counties, South Carolina',
    status: 'State-recognized by South Carolina',
    population: 'Approximately 500 enrolled members',
    language: 'Siouan — extinct',
    history: 'The Pee Dee are a Siouan-speaking people who inhabited the Pee Dee River Valley in present-day South Carolina and North Carolina. They were known as agriculturalists and traders. After the Yamasee War of 1715, many Pee Dee people migrated north to merge with the Catawba, while others remained in their ancestral lands and gradually intermarried with European settlers and free people of color.',
    currentStatus: 'The Pee Dee Indian Tribe of South Carolina received state recognition and continues to work toward federal recognition. They maintain their traditional cultural practices and advocate for the preservation of Pee Dee heritage sites.',
    resources: [
      { label: 'Pee Dee Indian Tribe of SC', url: 'https://peedeeindiantribe.org' },
    ],
  },
  'Waccamaw Indian People': {
    name: 'Waccamaw Indian People',
    alsoKnownAs: ['Waccamaw Siouan', 'Waccamaw-Siouan'],
    location: 'Bladen and Columbus Counties, North Carolina',
    status: 'State-recognized by North Carolina',
    population: 'Approximately 2,000 enrolled members',
    language: 'Woccon (Siouan) — extinct',
    history: 'The Waccamaw are a Siouan-speaking people who inhabited the coastal plains of present-day North Carolina and South Carolina. They lived around Lake Waccamaw, a Carolina bay lake of mysterious origin. The Waccamaw people endured centuries of marginalization and were frequently classified as "free people of color" in colonial and antebellum records.',
    currentStatus: 'The Waccamaw Siouan Tribe received state recognition from North Carolina. They maintain their tribal government and cultural programs, including the annual Waccamaw Siouan Powwow.',
    resources: [
      { label: 'Waccamaw Siouan Tribe', url: '#' },
    ],
  },
  'Coharie Intra-Tribal Council': {
    name: 'Coharie Intra-Tribal Council',
    alsoKnownAs: ['Coharie', 'Coharie Indian People'],
    location: 'Sampson and Harnett Counties, North Carolina',
    status: 'State-recognized by North Carolina',
    population: 'Approximately 3,000 enrolled members',
    language: 'Iroquoian (related to Meherrin and Nottoway) — extinct',
    history: 'The Coharie people are an Indigenous group from the Coharie River area in southeastern North Carolina. Their exact tribal origins are debated — they may be descended from Iroquoian-speaking peoples, coastal Algonquians, or a mixture of multiple groups. The Coharie people maintained their distinct identity despite centuries of pressure to assimilate.',
    currentStatus: 'The Coharie Intra-Tribal Council received state recognition from North Carolina in 1971. They operate the Coharie Tribal Center and maintain their cultural traditions.',
    resources: [
      { label: 'Coharie Tribe', url: '#' },
    ],
  },
  'Haliwa-Saponi Indian Tribe': {
    name: 'Haliwa-Saponi Indian Tribe',
    alsoKnownAs: ['Haliwa-Saponi'],
    location: 'Halifax and Warren Counties, North Carolina',
    status: 'State-recognized by North Carolina',
    population: 'Approximately 4,000 enrolled members',
    language: 'Siouan (Saponi dialect) — extinct',
    history: 'The Haliwa-Saponi people are descendants of the Saponi, a Siouan-speaking people who originally lived in Virginia and North Carolina. The name "Haliwa-Saponi" combines "Halifax" and "Warren" (the two counties where they live) with "Saponi" (their ancestral tribe). They maintained their identity despite the Racial Integrity Act of 1924 which attempted to erase Native identity in the region.',
    currentStatus: 'The Haliwa-Saponi Indian Tribe received state recognition from North Carolina. They are known for their strong cultural revitalization efforts including the annual Haliwa-Saponi Powwow, one of the oldest in the state.',
    resources: [
      { label: 'Haliwa-Saponi Tribe', url: 'https://www.haliwa-saponi.org' },
    ],
  },
  'Occaneechi Band of the Saponi Nation': {
    name: 'Occaneechi Band of the Saponi Nation',
    alsoKnownAs: ['Occaneechi-Saponi'],
    location: 'Alamance and Orange Counties, North Carolina',
    status: 'State-recognized by North Carolina',
    population: 'Approximately 800 enrolled members',
    language: 'Siouan — extinct',
    history: 'The Occaneechi are a Siouan-speaking people who originally inhabited the Piedmont region of North Carolina and Virginia. They were known as traders who established a major trading center on the Roanoke River. After the Yamasee War, the Occaneechi scattered and merged with related Siouan peoples, forming the Occaneechi-Saponi community.',
    currentStatus: 'The Occaneechi Band of the Saponi Nation received state recognition from North Carolina. They operate the Occaneechi-Saponi Tribal Center and are active in cultural preservation and education.',
    resources: [
      { label: 'Occaneechi-Saponi', url: '#' },
    ],
  },
  'Monacan Indian Nation': {
    name: 'Monacan Indian Nation',
    alsoKnownAs: ['Monacan', 'Monahassanugh'],
    location: 'Amherst County, Virginia (Bear Mountain)',
    status: 'Federally Recognized (2018)',
    population: 'Approximately 2,000 enrolled members',
    language: 'Siouan — extinct; revitalization efforts ongoing',
    history: 'The Monacan are a Siouan-speaking people who inhabited the Piedmont region of Virginia. They are descendants of the Monacan Confederacy, which included several allied tribes. The Monacan people maintained their community at Bear Mountain, Virginia despite the Racial Integrity Act of 1924 which attempted to classify them as "colored." They received federal recognition in 2018 along with five other Virginia tribes.',
    currentStatus: 'The Monacan Indian Nation is headquartered at Bear Mountain, Virginia. They operate a museum and cultural center. The Monacan are one of seven state-recognized tribes in Virginia, six of which received federal recognition in 2018.',
    resources: [
      { label: 'Monacan Indian Nation', url: 'https://monacannation.com' },
    ],
  },
  'Rappahannock Tribe': {
    name: 'Rappahannock Tribe',
    alsoKnownAs: ['Rappahannock Indian Tribe'],
    location: 'Caroline, Essex, and King and Queen Counties, Virginia',
    status: 'Federally Recognized (2018)',
    population: 'Approximately 500 enrolled members',
    language: 'Algonquian — extinct',
    history: 'The Rappahannock are an Algonquian-speaking people who inhabited the Rappahannock River Valley in Virginia. They were one of the Powhatan Confederacy tribes encountered by the Jamestown colonists. Despite centuries of displacement, the Rappahannock people maintained their identity and community. They received federal recognition in 2018.',
    currentStatus: 'The Rappahannock Tribe received federal recognition in 2018. They are working to reclaim ancestral lands along the Rappahannock River and preserve their cultural heritage.',
    resources: [
      { label: 'Rappahannock Tribe', url: 'https://www.rappahannocktribe.org' },
    ],
  },
  'Nansemond Indian Nation': {
    name: 'Nansemond Indian Nation',
    alsoKnownAs: ['Nansemond'],
    location: 'Chesapeake and Suffolk, Virginia',
    status: 'Federally Recognized (2018)',
    population: 'Approximately 400 enrolled members',
    language: 'Algonquian — extinct',
    history: 'The Nansemond are an Algonquian-speaking people who inhabited the Nansemond River area in southeastern Virginia. They were part of the Powhatan Confederacy. The Nansemond people intermarried with English colonists and maintained their identity despite enormous pressure to assimilate. They received federal recognition in 2018.',
    currentStatus: 'The Nansemond Indian Nation received federal recognition in 2018. They maintain their Mattanock Town cultural center and are active in preserving Nansemond heritage and traditions.',
    resources: [
      { label: 'Nansemond Indian Nation', url: 'https://www.nansemond.org' },
    ],
  },
  'Tlingit & Haida Indian Tribes': {
    name: 'Tlingit & Haida Indian Tribes',
    alsoKnownAs: ['Central Council of Tlingit & Haida'],
    location: 'Southeast Alaska (33 communities)',
    status: 'Federally Recognized (Central Council)',
    population: 'Approximately 30,000 enrolled members',
    language: 'Tlingit and Haida — both critically endangered',
    history: 'The Tlingit and Haida are Indigenous peoples of the Pacific Northwest Coast who have inhabited southeast Alaska and coastal British Columbia for thousands of years. They are known for their sophisticated art tradition including totem poles, clan houses, and woven Chilkat blankets. They never signed a treaty with the United States — their land was simply taken.',
    currentStatus: 'The Central Council of Tlingit & Haida Indian Tribes of Alaska represents 33 communities. They are leaders in cultural revitalization, language preservation, and environmental protection. Tlingit and Haida art is recognized worldwide.',
    resources: [
      { label: 'Official Website', url: 'https://www.ccthita-nsn.gov' },
    ],
  },
  'Blackfeet Nation': {
    name: 'Blackfeet Nation',
    alsoKnownAs: ['Blackfeet Tribe', 'Niitsitapi ("Original People")'],
    location: 'Northwestern Montana (1.5 million acre reservation)',
    status: 'Federally Recognized',
    population: 'Approximately 17,000 enrolled members',
    language: 'Siksiká (Blackfoot) — Algonquian language, critically endangered',
    history: 'The Blackfeet (Blackfoot) Confederacy consisted of four related bands who controlled a vast territory in present-day Montana and Alberta, Canada. They were known as skilled warriors and buffalo hunters. The Blackfeet Reservation was established in 1855. In the winter of 1883-1884, approximately 600 Blackfeet died of starvation when the buffalo were exterminated — known as "Starvation Winter."',
    currentStatus: 'The Blackfeet Nation is headquartered in Browning, Montana. They operate casinos, oil and gas leases, and are major landowners along the eastern edge of Glacier National Park. They are actively working to preserve the Siksiká language and traditional culture.',
    resources: [
      { label: 'Official Website', url: 'https://blackfeetnation.com' },
    ],
  },
  'Standing Rock Sioux Tribe': {
    name: 'Standing Rock Sioux Tribe',
    alsoKnownAs: ['Standing Rock', 'Íŋyaŋ Woslál Háŋ'],
    location: 'North Dakota and South Dakota',
    status: 'Federally Recognized',
    population: 'Approximately 8,500 enrolled members',
    language: 'Dakota/Lakota — Siouan language family',
    history: 'Standing Rock is the birthplace of Sitting Bull (Tatanka Iyotake), the famous Hunkpapa Lakota holy man and political leader. The Standing Rock Reservation was established in 1889. In 2016, Standing Rock became the center of international attention when the Dakota Access Pipeline was routed under the Missouri River near their water supply. Thousands of Indigenous people and allies gathered to protest in what became known as the #NoDAPL movement.',
    currentStatus: 'The Standing Rock Sioux Tribe is headquartered in Fort Yates, North Dakota. They continue to fight for clean water and tribal sovereignty. The tribe operates casinos and agricultural enterprises.',
    resources: [
      { label: 'Official Website', url: 'https://www.standingrock.org' },
    ],
  },
  'Oglala Sioux Tribe': {
    name: 'Oglala Sioux Tribe',
    alsoKnownAs: ['Oglala Lakota', 'Pine Ridge Sioux'],
    location: 'Pine Ridge Indian Reservation, South Dakota (3,500 sq miles)',
    status: 'Federally Recognized',
    population: 'Approximately 46,000 enrolled members',
    language: 'Lakota — Siouan language, critically endangered',
    history: 'The Oglala are one of the seven bands of the Lakota people. The Pine Ridge Reservation is home to the site of the Wounded Knee Massacre (1890), where approximately 300 Lakota men, women, and children were killed by the U.S. 7th Cavalry. In 1973, the American Indian Movement (AIM) occupied Wounded Knee for 71 days, bringing national attention to treaty rights and tribal sovereignty. Pine Ridge has historically been one of the most economically disadvantaged reservations in the U.S.',
    currentStatus: 'The Oglala Sioux Tribe is headquartered in Pine Ridge, South Dakota. They operate casinos and are working to develop economic opportunities. The tribe has been actively involved in the fight against the Keystone XL pipeline.',
    resources: [
      { label: 'Official Website', url: 'https://oglalalakotanation.info' },
    ],
  },
  'Puyallup Tribe of Indians': {
    name: 'Puyallup Tribe of Indians',
    alsoKnownAs: ['Puyallup', 'spuyaləpabš ("Generous People")'],
    location: 'Tacoma area, Washington State',
    status: 'Federally Recognized',
    population: 'Approximately 5,000 enrolled members',
    language: 'Lushootseed — Coast Salish language, critically endangered',
    history: 'The Puyallup are a Coast Salish people who have inhabited the Puget Sound region for thousands of years. They signed the Medicine Creek Treaty in 1854, which guaranteed them fishing rights and a reservation. Those rights were repeatedly violated until the Boldt Decision of 1974 affirmed that tribes have the right to half of the fish harvest. The Puyallup were leaders in the fish wars of the 1960s-70s.',
    currentStatus: 'The Puyallup Tribe is headquartered in Tacoma, Washington. They operate the Emerald Queen Casino and are major landowners in the Tacoma area. They are leaders in environmental protection and salmon restoration in the Puget Sound.',
    resources: [
      { label: 'Official Website', url: 'https://www.puyalluptribalservices.org' },
    ],
  },
}

// ============================================
// EXPANDABLE TREATY DATABASE
// ============================================
export const TREATY_DB: Record<string, TreatyDetail[]> = {
  'Georgia': [
    {
      name: 'Treaty of New York (Creek)',
      year: '1790',
      fullText: 'Signed on August 7, 1790, at New York City between the United States and the Creek Nation. This was the first treaty between the Creek and the U.S. federal government under the new Constitution.\n\nKEY TERMS:\n- The Creek Nation acknowledged themselves to be under the protection of the United States\n- Boundaries were defined between Creek territory and the United States\n- The Creeks agreed to deliver up any criminals who committed offenses against U.S. citizens\n- The U.S. agreed to regulate trade and prevent unauthorized settlement on Creek lands\n- The Creeks were promised annual supplies worth $1,500\n\nHISTORICAL SIGNIFICANCE:\nThis treaty established the framework for Creek-U.S. relations and set the precedent for all subsequent southeastern Indian treaties.',
      signatories: ['United States', 'Creek Nation (Muscogee)'],
      impact: 'Established federal authority over Creek affairs and set precedent for all southeastern Indian treaties.',
    },
    {
      name: 'Treaty of Indian Springs',
      year: '1825',
      fullText: 'Signed on February 12, 1825, at Indian Springs, Georgia. This was one of the most controversial treaties in American history.\n\nKEY TERMS:\n- William McIntosh and a small faction of Creek leaders ceded ALL remaining Creek lands in Georgia\n- The cession included approximately 22 million acres\n- In exchange, the signers received personal financial compensation\n- The treaty violated Creek law which required National Council approval\n\nTHE CONTROVERSY:\nMcIntosh was the cousin of Georgia Governor George Troup and had significant personal debts. The treaty was negotiated in secret and signed by only a fraction of Creek leadership.\n\nCONSEQUENCES:\n- The Creek National Council declared the treaty void\n- McIntosh was executed by the Creek National Council for treason\n- The U.S. Senate narrowly ratified the treaty despite protests\n\nHISTORICAL SIGNIFICANCE:\nDemonstrates how treaties were manipulated through bribery and manipulation of individual leaders — bypassing the democratic processes of tribal nations.',
      signatories: ['United States', 'William McIntosh (unauthorized Creek faction)'],
      impact: 'McIntosh executed for treason. Demonstrated treaty manipulation through bribery.',
    },
  ],
  'North Carolina': [
    {
      name: 'Treaty of Hopewell (Cherokee)',
      year: '1785',
      fullText: 'Signed on November 28, 1785, at Hopewell Plantation, South Carolina. This was the first treaty between the United States and the Cherokee Nation after the American Revolution.\n\nKEY TERMS:\n- The Cherokee were acknowledged as a sovereign nation\n- Boundaries were established between Cherokee lands and the United States\n- The U.S. promised to regulate trade and prevent unauthorized settlement\n- Cherokee who committed crimes against U.S. citizens would be delivered up for trial\n- The Cherokee received $1,000 in goods annually\n\nHISTORICAL SIGNIFICANCE:\nThis treaty established the Cherokee as a sovereign nation with defined territory — a status the U.S. would later violate repeatedly. It set the precedent for Cherokee-U.S. relations.',
      signatories: ['United States', 'Cherokee Nation'],
      impact: 'Established Cherokee sovereignty and territorial boundaries — both repeatedly violated by the U.S.',
    },
    {
      name: 'Treaty of New Echota',
      year: '1835',
      fullText: 'Signed on December 29, 1835, at New Echota, Georgia by an unauthorized Cherokee faction. This treaty led directly to the Trail of Tears.\n\nKEY TERMS:\n- The Cherokee Nation ceded all lands east of the Mississippi River to the United States\n- In exchange, the Cherokee received $5 million and land in Indian Territory (present-day Oklahoma)\n- The U.S. promised to provide transportation, food, and supplies for the removal\n- Cherokee who remained would become citizens of the states where they lived\n\nTHE CONTROVERSY:\nThe treaty was signed by approximately 100 Cherokee — out of a nation of 16,000. Principal Chief John Ross and the Cherokee National Council opposed the treaty. Major Ridge, John Ridge, and Elias Boudinot (the signers) were acting without authorization.\n\nCONSEQUENCES:\n- The U.S. Senate ratified the treaty by one vote\n- Forced removal began in 1838 under General Winfield Scott\n- Approximately 4,000 Cherokee died on the Trail of Tears\n- The Ridge faction signers were later assassinated by Cherokee for their role\n\nHISTORICAL SIGNIFICANCE:\nThe Treaty of New Echota is considered one of the most shameful episodes in U.S. history — a treaty negotiated through fraud that resulted in genocide.',
      signatories: ['United States', 'Major Ridge faction (unauthorized)'],
      impact: 'Led directly to the Trail of Tears and the deaths of approximately 4,000 Cherokee.',
    },
  ],
  'Oklahoma': [
    {
      name: 'Reconstruction Treaties (Five Civilized Tribes)',
      year: '1866',
      fullText: 'Signed in 1866 between the United States and the Five Civilized Tribes (Cherokee, Choctaw, Chickasaw, Creek, Seminole) following the Civil War.\n\nKEY TERMS:\n- The tribes agreed to abolish slavery and grant citizenship to freedmen (formerly enslaved people)\n- The tribes ceded the western portion of Indian Territory for other removed tribes\n- The tribes agreed to allow railroads to cross their lands\n- The U.S. promised compensation for damages during the Civil War\n- Each tribe signed a separate treaty with similar terms\n\nHISTORICAL SIGNIFICANCE:\nThese treaties fundamentally changed the political landscape of Indian Territory. The inclusion of freedmen as tribal citizens remains a contested issue today, with ongoing legal battles over citizenship rights.',
      signatories: ['United States', 'Five Civilized Tribes'],
      impact: 'Fundamentally restructured tribal governments. Freedmen citizenship remains contested today.',
    },
  ],
  'New York': [
    {
      name: 'Treaty of Canandaigua',
      year: '1794',
      fullText: 'Signed on November 11, 1794, at Canandaigua, New York. This treaty recognized the sovereignty of the Six Nations of the Haudenosaunee Confederacy.\n\nKEY TERMS:\n- The United States acknowledged the lands of the Seneca, Cayuga, Onondaga, Oneida, Mohawk, and Tuscarora nations\n- The U.S. promised annual goods worth $4,500 to the Six Nations\n- Peace was established between the United States and the Haudenosaunee\n- The treaty affirmed that the U.S. would not claim lands of the Six Nations\n\nHISTORICAL SIGNIFICANCE:\nThe Treaty of Canandaigua is one of the few treaties between the U.S. and Indigenous nations that is still honored. The Six Nations still receive their annual cloth payment from the U.S. government. This treaty established a lasting framework for Haudenosaunee-U.S. relations.',
      signatories: ['United States', 'Six Nations of the Haudenosaunee'],
      impact: 'One of the few U.S.-Indian treaties still honored. Annual cloth payment continues to this day.',
    },
  ],
}

// ============================================
// 50 STATE DATA
// ============================================
export const STATE_DATA: Record<string, StateData> = {
  'Alabama': {
    tribes: ['Poarch Band of Creek Indians', 'Muscogee Creek Nation (historical)', 'Cherokee (historical)', 'Choctaw (historical)', 'Chickasaw (historical)'],
    laws: [
      { name: 'Indian Removal Act Impact', year: '1830', desc: 'Forced removal of Creek, Cherokee, and Choctaw peoples from Alabama territory to Indian Territory (Oklahoma).' },
      { name: 'Creek Cession Treaties', year: '1814-1832', desc: 'Series of treaties gradually ceding Creek lands to the U.S. government following the Creek War.' },
    ],
    treaties: [
      { name: 'Treaty of Fort Jackson', year: '1814', desc: 'Ceded 23 million acres of Creek land after the Creek War. Signed under duress by Creek leaders.' },
      { name: 'Treaty of Cusseta', year: '1832', desc: 'Divided Creek territory into individual allotments, leading to massive fraudulent land seizures.' },
    ],
    vitalRecords: { office: 'Alabama Center for Health Statistics', address: 'RSA Tower, 201 Monroe Street, Suite 1150, Montgomery, AL 36104', phone: '(334) 206-5418', website: 'https://www.alabamapublichealth.gov/vitalrecords/', deathCertProcess: 'Mail-in application with valid ID. $15 per copy. Processing 5-10 business days.', birthCertProcess: 'Same as death certificates. Must prove relationship if not your own.', indianAffairs: 'Alabama Indian Affairs Commission: (334) 242-2835' },
  },
  'Alaska': {
    tribes: ['Tlingit & Haida Indian Tribes', 'Inupiat', 'Yupik', 'Aleut', 'Athabaskan', 'Alaska Native Village Corporations (200+)'],
    laws: [
      { name: 'Alaska Native Claims Settlement Act (ANCSA)', year: '1971', desc: 'Largest land claims settlement in U.S. history. Created Native corporations instead of reservations. Gave 44 million acres and $963 million.' },
      { name: 'Indian Reorganization Act (Alaska)', year: '1936', desc: 'Extended IRA provisions to Alaska Natives, allowing tribal reorganization.' },
    ],
    treaties: [
      { name: 'Alaska Native Claims Settlement Act', year: '1971', desc: 'Settled aboriginal land claims for 44 million acres and $963 million in compensation.' },
    ],
    vitalRecords: { office: 'Alaska Bureau of Vital Statistics', address: '5441 Commercial Blvd, Juneau, AK 99801', phone: '(907) 465-3391', website: 'https://dhss.alaska.gov/dph/VitalStats/Pages/default.aspx', deathCertProcess: 'Online or mail-order. $30 per copy. Expedited available.', birthCertProcess: 'Online ordering available. Must prove identity.', indianAffairs: 'Alaska Native Tribal Health Consortium: (907) 729-6000' },
  },
  'Arizona': {
    tribes: ['Navajo Nation (Diné)', 'Tohono O\'odham Nation', 'Gila River Indian Community', 'Hopi Tribe', 'White Mountain Apache', 'San Carlos Apache', 'Havasupai', 'Hualapai', 'Yaqui (Pascua)', 'Colorado River Indian Tribes'],
    laws: [
      { name: 'Dawes Act (General Allotment)', year: '1887', desc: 'Broke up tribal lands into individual allotments. Arizona tribes lost millions of acres.' },
      { name: 'Indian Reorganization Act', year: '1934', desc: 'Ended allotment. Allowed tribes to reorganize governments and recover some lands.' },
    ],
    treaties: [
      { name: 'Navajo Treaty (Bosque Redondo)', year: '1868', desc: 'Allowed Navajo return to their homeland after the Long Walk internment. 300-mile forced march where hundreds died.' },
      { name: 'Gadsden Purchase', year: '1854', desc: 'U.S. acquired southern Arizona from Mexico, affecting Tohono O\'odham and Yaqui lands.' },
    ],
    vitalRecords: { office: 'Arizona Office of Vital Records', address: '1818 W. Adams St, Phoenix, AZ 85007', phone: '(602) 364-1300', website: 'https://www.azdhs.gov/vitalrecords/', deathCertProcess: 'Mail or walk-in at county health departments. $20 per copy.', birthCertProcess: 'Same process. Online ordering through AZDHS website.', indianAffairs: 'Inter Tribal Council of Arizona: (602) 258-4822' },
  },
  'Arkansas': {
    tribes: ['Quapaw Tribe of Oklahoma (historical AR)', 'Caddo Nation (historical)', 'Osage Nation (historical)'],
    laws: [
      { name: 'Arkansas Removal Acts', year: '1820s-1830s', desc: 'Forced removal of Quapaw, Caddo, and Osage from Arkansas territory to Indian Territory.' },
    ],
    treaties: [
      { name: 'Quapaw Treaty of 1818', year: '1818', desc: 'Ceded Quapaw lands in Arkansas; tribe relocated to Louisiana, then eventually to Oklahoma.' },
    ],
    vitalRecords: { office: 'Arkansas Department of Health, Vital Records', address: '4815 W. Markham St, Slot 44, Little Rock, AR 72205', phone: '(501) 661-2336', website: 'https://www.healthy.arkansas.gov/programs-services/topics/vital-records', deathCertProcess: 'Mail-in with notarized application. $12 per copy. 10-14 days.', birthCertProcess: 'Same as death certificates. Must provide acceptable ID.' },
  },
  'California': {
    tribes: ['Chumash', 'Tongva (Gabrielino)', 'Pomo', 'Yokuts', 'Miwok', 'Kumeyaay', 'Luiseño', 'Cahuilla', 'Karuk', 'Yurok'],
    laws: [
      { name: '18 Unratified California Treaties', year: '1851-1852', desc: 'U.S. negotiated then secretly refused to ratify 18 treaties with California tribes, leaving them landless. Not revealed until 1905.' },
      { name: 'California Indian Homestead Act', year: '1850s-1870s', desc: 'Promised land grants to "mission Indians" but rarely honored. Most California tribes remained landless.' },
    ],
    treaties: [
      { name: '18 Treaties of 1851-1852', year: '1851', desc: 'Secretly sealed by U.S. Senate. Would have reserved 8.5 million acres for California tribes. Not revealed until 1905.' },
    ],
    vitalRecords: { office: 'California Dept of Public Health, Vital Records', address: 'MS 5103, P.O. Box 997410, Sacramento, CA 95899-7410', phone: '(916) 445-2684', website: 'https://www.cdph.ca.gov/Programs/CHSI/Pages/Vital-Records.aspx', deathCertProcess: 'Mail or online via VitalChek. $21 per copy. 4-6 weeks.', birthCertProcess: 'Online through VitalChek or county recorder.', indianAffairs: 'California Native American Heritage Commission: (916) 373-3710' },
  },
  'Colorado': {
    tribes: ['Ute Mountain Ute Tribe', 'Southern Ute Indian Tribe', 'Northern Ute (Uintah & Ouray)', 'Cheyenne (historical)', 'Arapaho (historical)'],
    laws: [
      { name: 'Brunot Agreement', year: '1873', desc: 'Ute leaders "agreed" to cede the San Juan Mountains after being held in Washington D.C. under duress.' },
      { name: 'Meeker Massacre & Aftermath', year: '1879', desc: 'U.S. agent Nathan Meeker\'s policies led to conflict. Utes were forcibly removed from most of Colorado.' },
    ],
    treaties: [
      { name: 'Treaty of Conejos', year: '1863', desc: 'Utes ceded land east of the Continental Divide but retained large portions of western Colorado.' },
    ],
    vitalRecords: { office: 'Colorado Department of Public Health, Vital Records', address: '4300 Cherry Creek Drive South, Denver, CO 80246', phone: '(303) 692-2200', website: 'https://cdphe.colorado.gov/vital-records', deathCertProcess: 'Mail or online via VitalChek. $20 per copy. 30 days processing.', birthCertProcess: 'Same process. Online ordering available.' },
  },
  'Connecticut': {
    tribes: ['Mashantucket Pequot Tribal Nation', 'Mohegan Tribe', 'Eastern Pequot Tribal Nation', 'Golden Hill Paugussett', 'Schaghticoke Tribal Nation'],
    laws: [
      { name: 'Connecticut Indian Settlement Acts', year: 'Various', desc: 'Series of state laws addressing tribal land claims and casino gaming compacts.' },
      { name: 'Pequot Land Recovery', year: '1983', desc: 'Mashantucket Pequot received federal recognition and began reclaiming ancestral lands.' },
    ],
    treaties: [
      { name: 'Treaty of Hartford (Pequot)', year: '1638', desc: 'Following the Pequot War, surviving Pequots were divided between Mohegan and Narragansett tribes or sold into slavery.' },
    ],
    vitalRecords: { office: 'Connecticut Department of Public Health, Vital Records', address: '410 Capitol Avenue, Hartford, CT 06134', phone: '(860) 509-7700', website: 'https://portal.ct.gov/DPH/Vital-Records', deathCertProcess: 'Mail, online, or in-person. $20 per copy. 6-8 weeks.', birthCertProcess: 'Same process. Online ordering available.' },
  },
  'Delaware': {
    tribes: ['Nanticoke Indian Association', 'Lenape Indian Tribe of Delaware'],
    laws: [
      { name: 'Delaware Native American Recognition', year: '2016', desc: 'State formally recognized the Nanticoke Lenni-Lenape as the original inhabitants of Delaware.' },
    ],
    treaties: [
      { name: 'Treaty of Fort Pitt (Delaware)', year: '1778', desc: 'First treaty between the United States and any Indigenous nation. Delaware agreed to support Americans in Revolutionary War.' },
    ],
    vitalRecords: { office: 'Delaware Office of Vital Statistics', address: '417 Federal Street, Dover, DE 19901', phone: '(302) 744-4549', website: 'https://dhss.delaware.gov/dhss/dph/vs/vitals.html', deathCertProcess: 'Mail or in-person. $25 per copy. 2-3 weeks.', birthCertProcess: 'Same process.' },
  },
  'Florida': {
    tribes: ['Seminole Tribe of Florida', 'Miccosukee Tribe of Indians'],
    laws: [
      { name: 'Seminole Wars', year: '1817-1858', desc: 'Three wars resulting in forced removal of most Seminoles to Indian Territory (Oklahoma).' },
      { name: 'Indian Removal Act - Florida', year: '1830', desc: 'Applied to Seminole, Miccosukee, and Creek peoples in Florida.' },
    ],
    treaties: [
      { name: 'Treaty of Payne\'s Landing', year: '1832', desc: 'Seminole agreed to removal west. Signed under duress by a minority faction.' },
    ],
    vitalRecords: { office: 'Florida Bureau of Vital Statistics', address: '1217 Pearl Street, Jacksonville, FL 32202', phone: '(904) 359-6900', website: 'https://www.floridahealth.gov/certificates/', deathCertProcess: 'Online via VitalChek or mail. $9 + local fee. 3-5 days.', birthCertProcess: 'Same process.', indianAffairs: 'Florida Governor\'s Council on Indian Affairs: (850) 487-0914' },
  },
  'Georgia': {
    tribes: ['Muscogee (Creek) Nation', 'Cherokee Nation', 'Yuchi', 'Hitchiti', 'Shawnee', 'Yamasee'],
    laws: [
      { name: 'Georgia Cherokee Laws', year: '1829-1831', desc: 'Georgia passed laws extending state jurisdiction over Cherokee territory, making Cherokee laws illegal and Cherokee government powers void.' },
      { name: 'Indian Removal Act', year: '1830', desc: 'Authorized forced removal of Cherokee, Creek, and other southeastern tribes west of the Mississippi River.' },
    ],
    treaties: [
      { name: 'Treaty of New York (Creek)', year: '1790', desc: 'First treaty between U.S. and Creek Nation. Established peace and defined boundaries.' },
      { name: 'Treaty of Indian Springs', year: '1825', desc: 'Controversial treaty where McIntosh faction ceded all Creek lands. McIntosh executed for treason.' },
    ],
    vitalRecords: { office: 'Georgia Dept of Public Health, Vital Records', address: '1680 Phoenix Boulevard, Suite 100, Atlanta, GA 30349', phone: '(404) 679-4701', website: 'https://dph.georgia.gov/vital-records', deathCertProcess: 'Mail, online via ROVER, or in-person. $25 per copy. 8-10 weeks.', birthCertProcess: 'Same process. Online ordering available.', indianAffairs: 'Georgia Council on American Indian Concerns: (404) 656-3883' },
  },
  'Hawaii': {
    tribes: ['Native Hawaiian (Kanaka Maoli)', 'various Ohana (family) lineages'],
    laws: [
      { name: 'Overthrow of the Hawaiian Kingdom', year: '1893', desc: 'U.S.-backed businessmen overthrew Queen Liliʻuokalani. U.S. later apologized via Public Law 103-150 (1993).' },
      { name: 'Hawaiian Homes Commission Act', year: '1921', desc: 'Set aside approximately 200,000 acres for Native Hawaiian homesteads. Blood quantum requirements still contested.' },
    ],
    treaties: [
      { name: 'No treaties signed', year: 'N/A', desc: 'Hawaii was an independent kingdom with diplomatic relations, not a tribal nation. The U.S. never negotiated treaties — it overthrew the government.' },
    ],
    vitalRecords: { office: 'Hawaii Department of Health, Vital Records', address: '1250 Punchbowl Street, Honolulu, HI 96813', phone: '(808) 586-4533', website: 'https://health.hawaii.gov/vitalrecords/', deathCertProcess: 'Mail, online, or in-person. $10 per copy. 6-8 weeks.', birthCertProcess: 'Same process.', indianAffairs: 'Office of Hawaiian Affairs: (808) 594-1835' },
  },
  'Idaho': {
    tribes: ['Nez Perce Tribe', 'Shoshone-Bannock Tribes', 'Coeur d\'Alene Tribe', 'Kootenai Tribe'],
    laws: [
      { name: 'Nez Perce Removal', year: '1877', desc: 'Following the Nez Perce War, Chief Joseph and his people were forcibly removed from their Wallowa Valley homeland.' },
    ],
    treaties: [
      { name: 'Treaty of 1855 (Nez Perce)', year: '1855', desc: 'Nez Perce ceded large portions of their land but retained the Wallowa Valley. Later violated by U.S.' },
    ],
    vitalRecords: { office: 'Idaho Bureau of Vital Records and Health Statistics', address: '450 W State Street, Boise, ID 83702', phone: '(208) 334-5988', website: 'https://www.healthandwelfare.idaho.gov/vital-records', deathCertProcess: 'Mail or in-person. $16 per copy. 7-10 days.', birthCertProcess: 'Same process.' },
  },
  'Illinois': {
    tribes: ['Illiniwek (Illini)', 'Potawatomi (historical)', 'Miami (historical)', 'Kickapoo (historical)', 'Sac & Fox (historical)'],
    laws: [
      { name: 'Illinois Removal', year: '1830s', desc: 'All major tribes were removed from Illinois under the Indian Removal Act.' },
    ],
    treaties: [
      { name: 'Treaty of Prairie du Chien', year: '1829', desc: 'Multiple tribes ceded claims in Illinois, Wisconsin, and Michigan.' },
    ],
    vitalRecords: { office: 'Illinois Department of Public Health, Vital Records', address: '925 E. Ridgely Avenue, Springfield, IL 62702', phone: '(217) 782-6553', website: 'https://www.idph.state.il.us/vitalrecords/', deathCertProcess: 'Mail or in-person. $19 per copy. 5-7 business days.', birthCertProcess: 'Same process.' },
  },
  'Indiana': {
    tribes: ['Miami Nation of Indiana (historical)', 'Potawatomi (historical)', 'Shawnee (historical)', 'Delaware (historical)'],
    laws: [
      { name: 'Indiana Removal Period', year: '1830s-1840s', desc: 'Virtually all Indigenous peoples were removed from Indiana to Indian Territory (Kansas, then Oklahoma).' },
    ],
    treaties: [
      { name: 'Treaty of St. Mary\'s (Miami)', year: '1818', desc: 'Miami ceded large portions of Indiana. Later treaties removed them entirely.' },
    ],
    vitalRecords: { office: 'Indiana State Department of Health, Vital Records', address: '2 N. Meridian Street, Indianapolis, IN 46204', phone: '(317) 234-8156', website: 'https://www.in.gov/health/vital-records/', deathCertProcess: 'Mail or online via VitalChek. $8 per copy. 8-12 weeks.', birthCertProcess: 'Same process.' },
  },
  'Iowa': {
    tribes: ['Sac and Fox Tribe of the Mississippi in Iowa', 'Meskwaki (Sac & Fox) Settlement'],
    laws: [
      { name: 'Iowa Tribal Recognition', year: 'Various', desc: 'Sac and Fox purchased land in Tama County in 1856 — the first time Native Americans bought back their own land.' },
    ],
    treaties: [
      { name: 'Sac and Fox Land Purchase', year: '1856', desc: 'Sac and Fox purchased 80 acres in Tama County — first Indigenous land purchase in U.S. history.' },
    ],
    vitalRecords: { office: 'Iowa Department of Public Health, Bureau of Vital Statistics', address: '321 E. 12th Street, Des Moines, IA 50319', phone: '(515) 281-4944', website: 'https://idph.iowa.gov/health-statistics/vital-records', deathCertProcess: 'Mail, online, or in-person. $15 per copy. 4-6 weeks.', birthCertProcess: 'Same process.' },
  },
  'Kansas': {
    tribes: ['Kaw Nation', 'Ponca Tribe of Oklahoma (historical KS)', 'Potawatomi (historical)', 'Kickapoo Tribe in Kansas'],
    laws: [
      { name: 'Kansas-Nebraska Act Impact', year: '1854', desc: 'Opened Kansas to white settlement, displacing tribes who had been relocated there from the East.' },
    ],
    treaties: [
      { name: 'Kansas Treaty of 1846', year: '1846', desc: 'Multiple relocated eastern tribes ceded Kansas lands as pressure for white settlement increased.' },
    ],
    vitalRecords: { office: 'Kansas Office of Vital Statistics', address: '1000 SW Jackson Street, Suite 120, Topeka, KS 66612', phone: '(785) 296-1400', website: 'https://www.kdheks.gov/vital/', deathCertProcess: 'Mail or in-person. $15 per copy. 5-7 business days.', birthCertProcess: 'Same process.' },
  },
  'Kentucky': {
    tribes: ['Cherokee (historical)', 'Shawnee (historical)', 'Chickasaw (historical)'],
    laws: [
      { name: 'Kentucky Pre-Removal', year: 'Pre-1830', desc: 'Kentucky was largely cleared of Indigenous peoples before the Indian Removal Act through individual treaties and warfare.' },
    ],
    treaties: [
      { name: 'Treaty of Henderson (Cherokee)', year: '1775', desc: 'Cherokee ceded land in Kentucky to Richard Henderson\'s Transylvania Company. Controversial and later disputed.' },
    ],
    vitalRecords: { office: 'Kentucky Office of Vital Statistics', address: '275 E. Main Street 1E-A, Frankfort, KY 40621', phone: '(502) 564-4212', website: 'https://chfs.ky.gov/agencies/dph/dehp/vb/Pages/vital-records.aspx', deathCertProcess: 'Mail, online, or in-person. $10 per copy. 5-7 days.', birthCertProcess: 'Same process.' },
  },
  'Louisiana': {
    tribes: ['Chitimacha Tribe', 'Coushatta Tribe', 'Jena Band of Choctaw', 'Tunica-Biloxi Indian Tribe', 'Houma Tribe', 'United Houma Nation'],
    laws: [
      { name: 'Louisiana Recognition Act', year: '1983', desc: 'Established state commission to address Native American concerns in Louisiana.' },
      { name: 'Coushatta Recognition Restoration', year: '1973', desc: 'Coushatta regained federal recognition after being terminated in 1953.' },
    ],
    treaties: [
      { name: 'Treaty of 1803 (Chitimacha)', year: '1803', desc: 'Chitimacha ceded lands to U.S. Retained small reservation near Charenton.' },
    ],
    vitalRecords: { office: 'Louisiana Vital Records Registry', address: '1450 Poydras Street, Suite 400, New Orleans, LA 70112', phone: '(504) 593-5100', website: 'https://ldh.la.gov/vital-records/', deathCertProcess: 'Mail or walk-in. $9 per copy. 8-10 weeks.', birthCertProcess: 'Same process.', indianAffairs: 'Louisiana Governor\'s Office of Indian Affairs: (225) 342-1887' },
  },
  'Maine': {
    tribes: ['Houlton Band of Maliseet Indians', 'Passamaquoddy Tribe', 'Penobscot Indian Nation', 'Aroostook Band of Micmacs'],
    laws: [
      { name: 'Maine Indian Claims Settlement Act (MICSA)', year: '1980', desc: 'Federal settlement returning $81.5 million to Passamaquoddy, Penobscot, and Maliseet for illegally taken lands.' },
    ],
    treaties: [
      { name: 'Treaty of 1794 (Passamaquoddy)', year: '1794', desc: 'Established peace and defined boundaries between Passamaquoddy and Massachusetts (which included Maine at the time).' },
    ],
    vitalRecords: { office: 'Maine Office of Data, Research and Vital Statistics', address: '220 Capitol Street, Augusta, ME 04330', phone: '(207) 287-3181', website: 'https://www.maine.gov/dhhs/mecdc/public-health-systems/data-research/vital-records', deathCertProcess: 'Mail or in-person. $15 per copy. 5-10 business days.', birthCertProcess: 'Same process.' },
  },
  'Maryland': {
    tribes: ['Piscataway Conoy Tribe', 'Piscataway Indian Nation', 'Accohannock Indian Tribe', 'Nanticoke Indian Association (also in DE)'],
    laws: [
      { name: 'Maryland Tribal Recognition', year: '2012', desc: 'Maryland formally recognized the Piscataway Conoy and Piscataway Indian Nation.' },
    ],
    treaties: [
      { name: 'Treaty of 1635 (Piscataway)', year: '1635', desc: 'Piscataway entered into treaty relations with Maryland Colony, establishing trade and peace.' },
    ],
    vitalRecords: { office: 'Maryland Department of Health, Division of Vital Records', address: '6764-B Industrial Boulevard, Elkridge, MD 21075', phone: '(410) 764-3038', website: 'https://health.maryland.gov/vsa/Pages/home.aspx', deathCertProcess: 'Mail or in-person. $10 per copy. 4-6 weeks.', birthCertProcess: 'Same process.' },
  },
  'Massachusetts': {
    tribes: ['Mashpee Wampanoag Tribe', 'Wampanoag Tribe of Gay Head (Aquinnah)'],
    laws: [
      { name: 'Massachusetts Recognition', year: 'Federal recognition granted to Mashpee in 2007, Aquinnah in 1987', desc: 'Both Wampanoag tribes received federal recognition after lengthy legal battles.' },
    ],
    treaties: [
      { name: 'Treaty of Plymouth (Massasoit)', year: '1621', desc: 'Massasoit (Wampanoag sachem) formed alliance with Pilgrims at Plymouth. Led to first Thanksgiving.' },
    ],
    vitalRecords: { office: 'Massachusetts Registry of Vital Records and Statistics', address: '150 Mount Vernon Street, 1st Floor, Dorchester, MA 02125', phone: '(617) 740-2600', website: 'https://www.mass.gov/orgs/registry-of-vital-records-and-statistics', deathCertProcess: 'Mail or in-person. $32 per copy. 2-4 weeks.', birthCertProcess: 'Same process.' },
  },
  'Michigan': {
    tribes: ['Sault Ste. Marie Tribe of Chippewa Indians', 'Keweenaw Bay Indian Community', 'Saginaw Chippewa Indian Tribe', 'Little River Band of Ottawa Indians', 'Grand Traverse Band of Ottawa and Chippewa Indians', 'Pokagon Band of Potawatomi Indians', 'Nottawaseppi Huron Band of the Potawatomi', 'Bay Mills Indian Community', 'Lac Vieux Desert Band of Lake Superior Chippewa'],
    laws: [
      { name: 'Michigan Indian Tribal Tax Agreements', year: 'Various', desc: 'Series of agreements between state and tribes regarding taxation, gaming, and sovereignty.' },
    ],
    treaties: [
      { name: 'Treaty of Washington (Saginaw)', year: '1819', desc: 'Multiple tribes ceded millions of acres in southeastern Michigan.' },
      { name: 'Treaty of Saginaw', year: '1819', desc: 'Chippewa, Ottawa, and Potawatomi ceded 6 million acres in the Saginaw Valley.' },
    ],
    vitalRecords: { office: 'Michigan Department of Health and Human Services, Vital Records', address: '201 Townsend Street, Lansing, MI 48913', phone: '(517) 335-8666', website: 'https://www.michigan.gov/mdhhs/inside-mdhhs/about-mdhhs/vital-records', deathCertProcess: 'Mail, online, or in-person. $34 per copy. 4-5 weeks.', birthCertProcess: 'Same process.' },
  },
  'Minnesota': {
    tribes: ['Bois Forte Band of Chippewa', 'Fond du Lac Band of Lake Superior Chippewa', 'Grand Portage Band of Lake Superior Chippewa', 'Leech Lake Band of Ojibwe', 'Lower Sioux Indian Community', 'Mille Lacs Band of Ojibwe', 'Prairie Island Indian Community', 'Red Lake Nation', 'Shakopee Mdewakanton Sioux Community', 'Upper Sioux Community', 'White Earth Nation'],
    laws: [
      { name: 'Dakota War of 1862 & Aftermath', year: '1862', desc: 'Following the Dakota War, 38 Dakota men were executed (largest mass execution in U.S. history). Dakota peoples were largely removed from Minnesota.' },
    ],
    treaties: [
      { name: 'Treaty of Traverse des Sioux', year: '1851', desc: 'Dakota ceded 24 million acres of southern and western Minnesota.' },
      { name: 'Treaty of Mendota', year: '1851', desc: 'Supplementary treaty ceding additional Dakota lands in Minnesota.' },
    ],
    vitalRecords: { office: 'Minnesota Department of Health, Office of Vital Records', address: '625 Robert Street North, St. Paul, MN 55155', phone: '(651) 201-5970', website: 'https://www.health.state.mn.us/people/vitalrecords/', deathCertProcess: 'Mail or in-person. $13 per copy. 4-6 weeks.', birthCertProcess: 'Same process.' },
  },
  'Mississippi': {
    tribes: ['Mississippi Band of Choctaw Indians'],
    laws: [
      { name: 'Mississippi Choctaw Federal Recognition', year: '1945', desc: 'The Mississippi Band of Choctaw Indians received federal recognition, though most Choctaw had been removed to Oklahoma.' },
    ],
    treaties: [
      { name: 'Treaty of Dancing Rabbit Creek', year: '1830', desc: 'Choctaw ceded all remaining Mississippi lands. One of the largest land cessions in U.S. history — over 10 million acres.' },
    ],
    vitalRecords: { office: 'Mississippi State Department of Health, Vital Records', address: '222 Marketridge Drive, Ridgeland, MS 39157', phone: '(601) 206-8200', website: 'https://msdh.ms.gov/vital-records', deathCertProcess: 'Mail or in-person. $17 per copy. 7-10 business days.', birthCertProcess: 'Same process.' },
  },
  'Missouri': {
    tribes: ['Eastern Shawnee Tribe of Oklahoma (historical MO)', 'Miami (historical)', 'Osage (historical)'],
    laws: [
      { name: 'Missouri Removal', year: '1820s-1830s', desc: 'All Indigenous peoples were removed from Missouri through a series of treaties.' },
    ],
    treaties: [
      { name: 'Treaty of 1808 (Osage)', year: '1808', desc: 'Osage ceded large portions of Missouri, Arkansas, and Oklahoma to the United States.' },
    ],
    vitalRecords: { office: 'Missouri Department of Health and Senior Services, Bureau of Vital Records', address: '930 Wildwood, Jefferson City, MO 65109', phone: '(573) 751-6387', website: 'https://health.mo.gov/data/vitalrecords/', deathCertProcess: 'Mail or in-person. $15 per copy. 2-4 weeks.', birthCertProcess: 'Same process.' },
  },
  'Montana': {
    tribes: ['Blackfeet Nation', 'Chippewa-Cree Indians of the Rocky Boy\'s Reservation', 'Confederated Salish and Kootenai Tribes', 'Crow Tribe', 'Fort Belknap Indian Community', 'Fort Peck Assiniboine and Sioux Tribes', 'Little Shell Chippewa Tribe', 'Northern Cheyenne Tribe'],
    laws: [
      { name: 'Dawes Act (Montana)', year: '1887', desc: 'Allotment broke up tribal lands throughout Montana. The state has 7 reservations covering over 8 million acres.' },
    ],
    treaties: [
      { name: 'Treaty of Hellgate (Flathead)', year: '1855', desc: 'Established Flathead Reservation. CSKT ancestors ceded 22 million acres but retained the reservation.' },
    ],
    vitalRecords: { office: 'Montana Department of Public Health and Human Services, Office of Vital Statistics', address: '111 N Sanders, Room 6, Helena, MT 59604', phone: '(406) 444-2685', website: 'https://dphhs.mt.gov/vitalrecords', deathCertProcess: 'Mail or in-person. $16 per copy. 2-3 weeks.', birthCertProcess: 'Same process.' },
  },
  'Nebraska': {
    tribes: ['Omaha Tribe of Nebraska', 'Ponca Tribe of Nebraska', 'Santee Sioux Nation', 'Sauk and Fox Nation', 'Winnebago Tribe of Nebraska'],
    laws: [
      { name: 'Nebraska Indian Claims', year: '1970s', desc: 'Multiple tribes settled land claims with the U.S. government for illegally taken Nebraska lands.' },
    ],
    treaties: [
      { name: 'Treaty of 1854 (Omaha)', year: '1854', desc: 'Omaha ceded most of their Nebraska lands and were confined to a reservation in northeastern Nebraska.' },
    ],
    vitalRecords: { office: 'Nebraska Department of Health and Human Services, Office of Vital Records', address: '1033 O Street, Suite 130, Lincoln, NE 68508', phone: '(402) 471-2871', website: 'https://dhhs.ne.gov/vitalrecords', deathCertProcess: 'Mail or in-person. $16 per copy. 2-3 weeks.', birthCertProcess: 'Same process.' },
  },
  'Nevada': {
    tribes: ['Duckwater Shoshone Tribe', 'Ely Shoshone Tribe', 'Fort McDermitt Paiute and Shoshone Tribes', 'Las Vegas Paiute Tribe', 'Lovelock Paiute Tribe', 'Moapa Band of Paiute Indians', 'Pyramid Lake Paiute Tribe', 'Reno-Sparks Indian Colony', 'Summit Lake Paiute Tribe', 'Te-Moak Tribe of Western Shoshone', 'Walker River Paiute Tribe', 'Washoe Tribe of Nevada and California', 'Winnemucca Indian Colony', 'Yerington Paiute Tribe', 'Yomba Shoshone Tribe'],
    laws: [
      { name: 'Nevada Indian Gaming', year: 'Various', desc: 'Nevada tribes operate under state-tribal gaming compacts, though most Nevada tribes are small and rural.' },
    ],
    treaties: [
      { name: 'Treaty of Ruby Valley (Western Shoshone)', year: '1863', desc: 'Western Shoshone agreed to allow passage and mining but never explicitly ceded their lands. Land claims continue today.' },
    ],
    vitalRecords: { office: 'Nevada Division of Public and Behavioral Health, Office of Vital Statistics', address: '4150 Technology Way, Suite 104, Carson City, NV 89706', phone: '(775) 684-4242', website: 'https://dpbh.nv.gov/Programs/VitalStats/', deathCertProcess: 'Mail or in-person. $25 per copy. Same-day available in Carson City.', birthCertProcess: 'Same process.' },
  },
  'New Hampshire': {
    tribes: ['No federally recognized tribes', 'Abenaki historical presence'],
    laws: [
      { name: 'New Hampshire Native American Affairs', year: 'Various', desc: 'New Hampshire has no federally recognized tribes, though Abenaki peoples historically inhabited the region.' },
    ],
    treaties: [
      { name: 'No major treaties', year: 'N/A', desc: 'New Hampshire was among the first areas cleared of Indigenous peoples through warfare and disease in the 1600s-1700s.' },
    ],
    vitalRecords: { office: 'New Hampshire Department of State, Division of Vital Records Administration', address: '9 Ratification Way, Concord, NH 03301', phone: '(603) 271-4650', website: 'https://www.dhhs.nh.gov/programs/vital-records', deathCertProcess: 'Mail or in-person. $15 per copy. 2-3 weeks.', birthCertProcess: 'Same process.' },
  },
  'New Jersey': {
    tribes: ['Nanticoke Lenni-Lenape Tribal Nation', 'Ramapough Lenape Nation', 'Powhatan Renape Nation'],
    laws: [
      { name: 'New Jersey State Recognition', year: '1980', desc: 'New Jersey recognized three tribal groups: Nanticoke Lenni-Lenape, Ramapough Mountain Indians, and Powhatan Renape Nation.' },
    ],
    treaties: [
      { name: 'Treaty of 1758 (Delaware/Lenape)', year: '1758', desc: 'Delaware (Lenape) and New Jersey colonists agreed to peace and established the Brotherton Reservation — the first reservation in New Jersey.' },
    ],
    vitalRecords: { office: 'New Jersey Department of Health, Vital Statistics and Registry', address: 'PO Box 370, Trenton, NJ 08625', phone: '(609) 292-4087', website: 'https://www.nj.gov/health/vital/', deathCertProcess: 'Mail or online. $25 per copy. 8-12 weeks.', birthCertProcess: 'Same process.' },
  },
  'New Mexico': {
    tribes: ['Navajo Nation (Diné)', 'Jicarilla Apache Nation', 'Mescalero Apache Tribe', 'Fort Sill Apache Tribe', '19 Pueblo Nations', 'Ute Mountain Ute'],
    laws: [
      { name: 'Pueblo Lands Act', year: '1924', desc: 'Confirmed Pueblo land titles disputed since the Mexican-American War.' },
    ],
    treaties: [
      { name: 'Treaty of Guadalupe Hidalgo', year: '1848', desc: 'Ended Mexican-American War. Guaranteed property rights of Pueblo peoples under U.S. law.' },
      { name: 'Navajo-Bosque Redondo Treaty', year: '1868', desc: 'Navajo returned to homeland from the Long Walk internment.' },
    ],
    vitalRecords: { office: 'New Mexico Department of Health, Vital Records', address: '1190 St. Francis Drive, Santa Fe, NM 87505', phone: '(505) 827-2338', website: 'https://www.nmhealth.org/about/vital_records/', deathCertProcess: 'Mail or in-person. $10 per copy. Same-day if in-person.', birthCertProcess: 'Same process.', indianAffairs: 'NM Indian Affairs Department: (505) 476-1600' },
  },
  'New York': {
    tribes: ['Seneca Nation', 'Oneida Indian Nation', 'Onondaga Nation', 'Cayuga Nation', 'Mohawk Nation', 'Tuscarora Nation', 'Shinnecock Indian Nation', 'Unkechaug Nation', 'Saint Regis Mohawk Tribe'],
    laws: [
      { name: 'Treaty of Canandaigua Implementation', year: '1794-Present', desc: 'Treaty guaranteeing Six Nations lands. Still active and contested.' },
    ],
    treaties: [
      { name: 'Treaty of Canandaigua', year: '1794', desc: 'Recognized sovereignty of Six Nations. Guaranteed their lands. Annual cloth payment continues.' },
      { name: 'Treaty of Big Tree (Seneca)', year: '1797', desc: 'Seneca retained 4 reservations in western New York. Corruption widely documented.' },
    ],
    vitalRecords: { office: 'New York State Department of Health, Vital Records', address: '800 North Pearl Street, Menands, NY 12204', phone: '(855) 322-1022', website: 'https://www.health.ny.gov/vital_records/', deathCertProcess: 'Mail or online via VitalChek. $30 per copy. 8-10 weeks.', birthCertProcess: 'Same process.', indianAffairs: 'New York State Indian Affairs: (518) 474-0510' },
  },
  'North Carolina': {
    tribes: ['Eastern Band of Cherokee Indians', 'Lumbee Tribe', 'Coharie Intra-Tribal Council', 'Haliwa-Saponi Indian Tribe', 'Occaneechi Band of the Saponi Nation', 'Meherrin Indian Tribe', 'Sappony', 'Waccamaw Siouan'],
    laws: [
      { name: 'North Carolina Recognition Act', year: '1971', desc: 'First state to officially recognize Native American tribes through legislative action.' },
      { name: 'Lumbee Recognition Efforts', year: '1885-Present', desc: 'Lumbee have sought federal recognition for over 130 years. Partial recognition in 1956.' },
    ],
    treaties: [
      { name: 'Treaty of Hopewell (Cherokee)', year: '1785', desc: 'First treaty between U.S. and Cherokee. Defined boundaries and established peace.' },
      { name: 'Treaty of New Echota', year: '1835', desc: 'Signed by unauthorized Cherokee faction. Led to Trail of Tears. Eastern Band remained in NC.' },
    ],
    vitalRecords: { office: 'North Carolina Vital Records', address: '1903 Mail Service Center, Raleigh, NC 27699-1903', phone: '(919) 733-3000', website: 'https://www.ncdhhs.gov/divisions/public-health/vital-records', deathCertProcess: 'Mail or online via VitalChek. $10 per copy. 6-8 weeks.', birthCertProcess: 'Same process.', indianAffairs: 'NC Commission of Indian Affairs: (919) 733-5998' },
  },
  'North Dakota': {
    tribes: ['Mandan, Hidatsa, and Arikara Nation (Three Affiliated Tribes)', 'Spirit Lake Tribe', 'Standing Rock Sioux Tribe', 'Turtle Mountain Band of Chippewa Indians', 'Sisseton-Wahpeton Oyate', 'Devils Lake Sioux Tribe'],
    laws: [
      { name: 'Dawes Act (North Dakota)', year: '1887', desc: 'Allotment broke up tribal lands on all reservations in North Dakota.' },
      { name: 'Pick-Sloan Missouri Basin Program', year: '1944', desc: 'Garrison Dam flooded 156,000 acres of prime Three Affiliated Tribes land, displacing hundreds of families.' },
    ],
    treaties: [
      { name: 'Treaty of Fort Laramie (1851)', year: '1851', desc: 'Defined territorial boundaries for Sioux, Cheyenne, Arapaho, Crow, and other Plains tribes.' },
    ],
    vitalRecords: { office: 'North Dakota Department of Health, Division of Vital Records', address: '600 E. Boulevard Avenue, Bismarck, ND 58505', phone: '(701) 328-2360', website: 'https://www.ndhealth.gov/vitalrecords/', deathCertProcess: 'Mail or in-person. $15 per copy. Same-day available.', birthCertProcess: 'Same process.' },
  },
  'Ohio': {
    tribes: ['Shawnee (historical)', 'Wyandotte (Huron) (historical)', 'Miami (historical)', 'Delaware (Lenape) (historical)', 'Ottawa (historical)'],
    laws: [
      { name: 'Northwest Ordinance', year: '1787', desc: 'Promised fair treatment of Native Americans in the Northwest Territory. Promise was repeatedly broken.' },
    ],
    treaties: [
      { name: 'Treaty of Greenville', year: '1795', desc: 'Ended the Northwest Indian War. Tribes ceded most of Ohio to the United States.' },
    ],
    vitalRecords: { office: 'Ohio Department of Health, Bureau of Vital Statistics', address: '225 Neilston Street, Columbus, OH 43215', phone: '(614) 466-2531', website: 'https://odh.ohio.gov/wps/portal/gov/odh/know-our-programs/vital-statistics/', deathCertProcess: 'Mail or in-person. $25 per copy. 4-6 weeks.', birthCertProcess: 'Same process.' },
  },
  'Oklahoma': {
    tribes: ['Cherokee Nation', 'Choctaw Nation', 'Chickasaw Nation', 'Muscogee (Creek) Nation', 'Seminole Nation', 'Osage Nation', 'Kiowa Tribe', 'Comanche Nation', 'Pawnee Nation', 'Cheyenne & Arapaho Tribes'],
    laws: [
      { name: 'Dawes Act', year: '1887', desc: 'Divided tribal lands into individual plots in Indian Territory. Oklahoma tribes lost 90 million acres total.' },
      { name: 'Curtis Act', year: '1898', desc: 'Abolished tribal courts in Indian Territory. Forced allotment on Five Civilized Tribes.' },
    ],
    treaties: [
      { name: 'Reconstruction Treaties', year: '1866', desc: 'Five Civilized Tribes forced to sign after Civil War. Freedmen granted tribal citizenship.' },
    ],
    vitalRecords: { office: 'Oklahoma State Department of Health, Vital Records', address: '1000 NE 10th Street, Oklahoma City, OK 73117', phone: '(405) 426-8782', website: 'https://oklahoma.gov/health/records.html', deathCertProcess: 'Mail or online via VitalChek. $15 per copy. 6-8 weeks.', birthCertProcess: 'Same process.', indianAffairs: 'Oklahoma Indian Affairs Commission: (405) 521-4211' },
  },
  'Oregon': {
    tribes: ['Burns Paiute Tribe', 'Coquille Indian Tribe', 'Cow Creek Band of Umpqua Tribe', 'Klamath Tribes', 'Confederated Tribes of Grand Ronde', 'Confederated Tribes of Siletz Indians', 'Confederated Tribes of the Umatilla Indian Reservation', 'Confederated Tribes of Warm Springs'],
    laws: [
      { name: 'Oregon Termination Act (Western Oregon)', year: '1954', desc: 'Terminated recognition of 60 tribes and bands in western Oregon. Most have since been restored.' },
      { name: 'Klamath Termination', year: '1954', desc: 'Klamath Tribes were terminated and their reservation land sold. Restoration came in 1986.' },
    ],
    treaties: [
      { name: 'Treaty with the Kalapuya etc.', year: '1851', desc: 'Multiple Willamette Valley tribes ceded their lands in exchange for a reservation that was never established.' },
    ],
    vitalRecords: { office: 'Oregon Health Authority, Vital Records', address: '800 NE Oregon Street, Portland, OR 97232', phone: '(971) 673-1190', website: 'https://www.oregon.gov/oha/ph/birthdeathcertificates/pages/index.aspx', deathCertProcess: 'Mail, online, or in-person. $25 per copy. 5-8 weeks.', birthCertProcess: 'Same process.' },
  },
  'Pennsylvania': {
    tribes: ['Lenape (Delaware) Tribe of Indians (historical)', 'Shawnee (historical)', 'Susquehannock (historical)', 'Iroquois (historical)'],
    laws: [
      { name: 'Pennsylvania Removal', year: '1700s-1800s', desc: 'Virtually all Indigenous peoples were removed from Pennsylvania through a combination of treaties, warfare, and the Walking Purchase fraud.' },
    ],
    treaties: [
      { name: 'Walking Purchase of 1737', year: '1737', desc: 'A fraudulent treaty where Delaware (Lenape) were tricked into ceding land equivalent to "a day and a half\'s walk" — which colonists rigged by running.' },
    ],
    vitalRecords: { office: 'Pennsylvania Department of Health, Division of Vital Records', address: '110 Pickering Way, Suite 101, Exton, PA 19341', phone: '(724) 656-3100', website: 'https://www.health.pa.gov/topics/certificates/Pages/Vital-Records.aspx', deathCertProcess: 'Mail or online via VitalChek. $20 per copy. 2-4 weeks.', birthCertProcess: 'Same process.' },
  },
  'Rhode Island': {
    tribes: ['Narragansett Indian Tribe'],
    laws: [
      { name: 'Narragansett Federal Recognition', year: '1983', desc: 'Received federal recognition. Land issues and state-tribal relations remain contentious.' },
    ],
    treaties: [
      { name: 'Treaty of 1644 (Narragansett)', year: '1644', desc: 'Narragansett agreed to submit to the authority of the English crown and the Colony of Rhode Island.' },
    ],
    vitalRecords: { office: 'Rhode Island Department of Health, Office of Vital Records', address: '3 Capitol Hill, Providence, RI 02908', phone: '(401) 222-2811', website: 'https://health.ri.gov/records/', deathCertProcess: 'Mail or in-person. $25 per copy. 3-5 business days.', birthCertProcess: 'Same process.' },
  },
  'South Carolina': {
    tribes: ['Catawba Indian Nation', 'Pee Dee Indian Tribe', 'Waccamaw Indian People', 'Yamasee (state-recognized 2023)'],
    laws: [
      { name: 'SC Termination Policy', year: '1962', desc: 'State terminated recognition of Catawba. Federal recognition restored 1993.' },
    ],
    treaties: [
      { name: 'Treaty of Pine Tree Hill', year: '1760', desc: 'Catawba ceded large tracts to South Carolina colony.' },
    ],
    vitalRecords: { office: 'South Carolina Department of Health, Vital Records', address: '2600 Bull Street, Columbia, SC 29201', phone: '(803) 898-3630', website: 'https://www.sc.gov/dhec/VitalRecords', deathCertProcess: 'Mail or online via VitalChek. $12 per copy. 4-6 weeks.', birthCertProcess: 'Same process.', indianAffairs: 'SC Commission for Minority Affairs: (803) 333-9621' },
  },
  'South Dakota': {
    tribes: ['Oglala Sioux Tribe (Pine Ridge)', 'Rosebud Sioux Tribe (Sicangu Oyate)', 'Cheyenne River Sioux Tribe', 'Standing Rock Sioux Tribe', 'Yankton Sioux Tribe', 'Sisseton-Wahpeton Oyate', 'Flandreau Santee Sioux Tribe', 'Crow Creek Sioux Tribe', 'Lower Brule Sioux Tribe'],
    laws: [
      { name: 'Black Hills Land Claim', year: '1980', desc: 'Supreme Court awarded $105 million for illegal taking of the Black Hills. Tribes have refused the money, demanding return of the land.' },
      { name: 'Wounded Knee Occupation', year: '1973', desc: 'AIM occupied Wounded Knee for 71 days, bringing national attention to treaty rights and tribal sovereignty.' },
    ],
    treaties: [
      { name: 'Treaty of Fort Laramie (1868)', year: '1868', desc: 'Established the Great Sioux Reservation, including the Black Hills, as "set apart for the absolute and undisturbed use and occupation of the Indians." Later violated by U.S.' },
    ],
    vitalRecords: { office: 'South Dakota Department of Health, Vital Records', address: '207 E. Missouri Avenue, Suite 1-A, Pierre, SD 57501', phone: '(605) 773-4961', website: 'https://doh.sd.gov/vitalrecords/', deathCertProcess: 'Mail or in-person. $15 per copy. 4-6 weeks.', birthCertProcess: 'Same process.' },
  },
  'Tennessee': {
    tribes: ['Cherokee (historical)', 'Chickasaw (historical)', 'Shawnee (historical)', 'Yuchi (historical)'],
    laws: [
      { name: 'Tennessee Removal', year: '1830s', desc: 'Virtually all Indigenous peoples were removed from Tennessee through the Indian Removal Act.' },
    ],
    treaties: [
      { name: 'Treaty of Tellico (Cherokee)', year: '1798', desc: 'Cherokee ceded lands in eastern Tennessee. Series of Tellico treaties gradually removed Cherokee from Tennessee.' },
    ],
    vitalRecords: { office: 'Tennessee Department of Health, Office of Vital Records', address: '710 James Robertson Parkway, Nashville, TN 37243', phone: '(615) 741-1763', website: 'https://www.tn.gov/health/health-program-areas/vital-records.html', deathCertProcess: 'Mail or online. $15 per copy. 6-8 weeks.', birthCertProcess: 'Same process.' },
  },
  'Texas': {
    tribes: ['Alabama-Coushatta Tribe', 'Kickapoo Traditional Tribe', 'Ysleta del Sur Pueblo (Tigua)'],
    laws: [
      { name: 'Texas Indian Commission Abolished', year: '1989', desc: 'State eliminated Texas Indian Commission, leaving tribes without state advocacy office.' },
    ],
    treaties: [
      { name: 'Cherokee Treaty of 1836', year: '1836', desc: 'Sam Houston negotiated with Cherokee. Republic of Texas later violated it.' },
    ],
    vitalRecords: { office: 'Texas Vital Statistics', address: '1100 W. 49th Street, Austin, TX 78756', phone: '(888) 963-7111', website: 'https://www.dshs.texas.gov/vs/', deathCertProcess: 'Online via Texas.gov or mail. $20 per copy. 10-15 days.', birthCertProcess: 'Same process.', indianAffairs: 'Texas Historical Commission: (512) 463-6100' },
  },
  'Utah': {
    tribes: ['Navajo Nation (Diné)', 'Ute Indian Tribe of the Uintah and Ouray Reservation', 'Northwestern Band of the Shoshone Nation', 'Paiute Indian Tribe of Utah', 'Skull Valley Band of Goshute', 'Confederated Tribes of the Goshute Reservation'],
    laws: [
      { name: 'Dawes Act (Utah)', year: '1887', desc: 'Allotment reduced tribal lands throughout Utah.' },
      { name: 'Uintah Basin Reservation Reduction', year: '1902-1905', desc: 'Ute reservation was opened to white settlement despite treaty guarantees.' },
    ],
    treaties: [
      { name: 'Treaty of Spanish Fork (Ute)', year: '1865', desc: 'Utes agreed to move to the Uintah Valley Reservation. Terms were later violated.' },
    ],
    vitalRecords: { office: 'Utah Department of Health, Office of Vital Records and Statistics', address: 'PO Box 141012, Salt Lake City, UT 84114', phone: '(801) 538-6105', website: 'https://vitalrecords.health.utah.gov/', deathCertProcess: 'Mail, online, or in-person. $18 per copy. 3-5 weeks.', birthCertProcess: 'Same process.' },
  },
  'Vermont': {
    tribes: ['No federally recognized tribes', 'Abenaki historical presence', 'Nulhegan Band of the Coosuk Abenaki Nation (state-recognized)', 'Elnu Abenaki Tribe (state-recognized)'],
    laws: [
      { name: 'Vermont State Recognition', year: '2011-2012', desc: 'Vermont recognized the Nulhegan Band of the Coosuk Abenaki Nation and the Elnu Abenaki Tribe.' },
    ],
    treaties: [
      { name: 'No major treaties', year: 'N/A', desc: 'Vermont was settled primarily through warfare and disease in the 1600s-1700s. No formal treaties were signed.' },
    ],
    vitalRecords: { office: 'Vermont Department of Health, Vital Records', address: '108 Cherry Street, PO Box 70, Burlington, VT 05402', phone: '(802) 863-7275', website: 'https://www.healthvermont.gov/vital-records', deathCertProcess: 'Mail or online. $10 per copy. 6-8 weeks.', birthCertProcess: 'Same process.' },
  },
  'Virginia': {
    tribes: ['Pamunkey Indian Tribe', 'Chickahominy Indian Tribe', 'Eastern Chickahominy', 'Mattaponi', 'Upper Mattaponi', 'Monacan Indian Nation', 'Nansemond Indian Nation', 'Rappahannock', 'Cheroenhaka (Nottoway)'],
    laws: [
      { name: 'Racial Integrity Act of 1924', year: '1924', desc: 'Classified all Virginians as "white" or "colored." Erased Native American identity from official records.' },
      { name: 'Virginia Tribal Recognition', year: '1980s-Present', desc: 'State began recognizing tribes. Federal recognition granted to 6 Virginia tribes in 2018.' },
    ],
    treaties: [
      { name: 'Treaty of Middle Plantation', year: '1677', desc: 'Established peace between Virginia colony and Powhatan Confederacy tribes after Bacon\'s Rebellion.' },
    ],
    vitalRecords: { office: 'Virginia Department of Health, Vital Records', address: 'P.O. Box 1000, Richmond, VA 23218', phone: '(804) 662-6200', website: 'https://www.vdh.virginia.gov/vital-records/', deathCertProcess: 'Mail, online, or in-person. $12 per copy. 2-4 weeks.', birthCertProcess: 'Same process.', indianAffairs: 'Virginia Council on Indians: (804) 225-2098' },
  },
  'Washington': {
    tribes: ['Confederated Tribes and Bands of the Yakama Nation', 'Confederated Tribes of the Colville Reservation', 'Lummi Nation', 'Makah Indian Tribe', 'Muckleshoot Indian Tribe', 'Nisqually Indian Tribe', 'Puyallup Tribe of Indians', 'Quileute Tribe', 'Quinault Indian Nation', 'Spokane Tribe of Indians', 'Squaxin Island Tribe', 'Suquamish Tribe', 'Tulalip Tribes'],
    laws: [
      { name: 'Boldt Decision (U.S. v. Washington)', year: '1974', desc: 'Federal court affirmed that tribes in Washington have the right to half of the fish harvest. Landmark decision for treaty rights.' },
      { name: 'Point Elliott Treaty Implementation', year: '1855-Present', desc: 'U.S. continues to negotiate implementation of the Medicine Creek and Point Elliott treaties with Washington tribes.' },
    ],
    treaties: [
      { name: 'Point Elliott Treaty', year: '1855', desc: 'Signed at Mukilteo. Tribes ceded land in exchange for reservations and fishing rights. Fishing rights later affirmed in Boldt Decision.' },
      { name: 'Medicine Creek Treaty', year: '1854', desc: 'Signed near Olympia. Nisqually, Puyallup, and other tribes ceded land but retained fishing rights.' },
    ],
    vitalRecords: { office: 'Washington State Department of Health, Center for Health Statistics', address: 'PO Box 47814, Olympia, WA 98504', phone: '(360) 236-4300', website: 'https://www.doh.wa.gov/YouandYourFamily/BirthDeathMarriageandDivorce', deathCertProcess: 'Mail, online, or in-person. $20 per copy. 4-6 weeks.', birthCertProcess: 'Same process.' },
  },
  'West Virginia': {
    tribes: ['No federally recognized tribes', 'Shawnee historical presence', 'Cherokee (historical)'],
    laws: [
      { name: 'No formal recognition laws', year: 'N/A', desc: 'West Virginia has no federally recognized tribes. The state was formed from territory where Shawnee, Cherokee, and other tribes historically lived before removal.' },
    ],
    treaties: [
      { name: 'Treaty of Camp Charlotte (Shawnee)', year: '1774', desc: 'Shawnee agreed to recognize the Ohio River as boundary following Lord Dunmore\'s War.' },
    ],
    vitalRecords: { office: 'West Virginia Health Statistics Center, Vital Registration', address: '350 Capitol Street, Room 165, Charleston, WV 25301', phone: '(304) 558-2931', website: 'https://dhhr.wv.gov/bph/hsc/vital/Pages/default.aspx', deathCertProcess: 'Mail or in-person. $12 per copy. 5-10 days.', birthCertProcess: 'Same process.' },
  },
  'Wisconsin': {
    tribes: ['Bad River Band of Lake Superior Chippewa', 'Forest County Potawatomi Community', 'Ho-Chunk Nation', 'Lac Courte Oreilles Band of Lake Superior Chippewa', 'Lac du Flambeau Band of Lake Superior Chippewa', 'Menominee Indian Tribe of Wisconsin', 'Oneida Nation', 'Red Cliff Band of Lake Superior Chippewa', 'Sokaogon Chippewa Community', 'St. Croix Chippewa Indians of Wisconsin', 'Stockbridge-Munsee Community'],
    laws: [
      { name: 'Dawes Act (Wisconsin)', year: '1887', desc: 'Allotment broke up tribal lands. Many Wisconsin tribes lost significant portions of their reservations.' },
      { name: 'Menominee Termination', year: '1954', desc: 'Menominee were terminated as a federally recognized tribe. Led to devastating economic and social consequences. Restored in 1973.' },
    ],
    treaties: [
      { name: 'Treaty of La Pointe (Chippewa)', year: '1854', desc: 'Established reservations for Chippewa (Ojibwe) bands in Wisconsin, including Bad River, Red Cliff, and Lac du Flambeau.' },
      { name: 'Treaty of the Cedars', year: '1836', desc: 'Menominee ceded 4 million acres in Wisconsin.' },
    ],
    vitalRecords: { office: 'Wisconsin Department of Health Services, Vital Records', address: '1 W. Wilson Street, Madison, WI 53703', phone: '(608) 266-1371', website: 'https://www.dhs.wisconsin.gov/vitalrecords/index.htm', deathCertProcess: 'Mail or in-person. $20 per copy. 2-4 weeks.', birthCertProcess: 'Same process.' },
  },
  'Wyoming': {
    tribes: ['Eastern Shoshone Tribe', 'Northern Arapaho Tribe'],
    laws: [
      { name: 'Dawes Act (Wind River)', year: '1887', desc: 'Allotment broke up the Wind River Reservation. Originally over 44 million acres, reduced to about 2.2 million acres.' },
    ],
    treaties: [
      { name: 'Treaty of Fort Bridger (Shoshone)', year: '1868', desc: 'Established the Wind River Reservation for the Shoshone. Later shared with the Northern Arapaho.' },
    ],
    vitalRecords: { office: 'Wyoming Department of Health, Vital Statistics Services', address: '101 Warrior Lane, Cheyenne, WY 82002', phone: '(307) 777-7591', website: 'https://health.wyo.gov/admin/vitalstatistics/', deathCertProcess: 'Mail or in-person. $20 per copy. 3-5 business days.', birthCertProcess: 'Same process.' },
  },
  'District of Columbia': {
    tribes: ['No federally recognized tribes', 'Nacotchtank (historical)', 'Piscataway (historical)'],
    laws: [
      { name: 'No recognition laws', year: 'N/A', desc: 'D.C. is a federal district with no federally recognized tribes. The area was historically inhabited by Algonquian-speaking peoples.' },
    ],
    treaties: [
      { name: 'No treaties', year: 'N/A', desc: 'No formal treaties were signed for the D.C. area as it was a federal district from its inception.' },
    ],
    vitalRecords: { office: 'DC Department of Health, Vital Records Division', address: '899 N Capitol Street NE, Washington, DC 20002', phone: '(202) 442-9303', website: 'https://dchealth.dc.gov/vitalrecords', deathCertProcess: 'Mail, online, or in-person. $18 per copy. 2-4 weeks.', birthCertProcess: 'Same process.' },
  },
}

// Popular states for quick select
export const POPULAR_STATES = ['Georgia', 'Oklahoma', 'North Carolina', 'Virginia', 'South Carolina', 'Alabama', 'Florida', 'Texas', 'New York', 'New Mexico', 'Arizona', 'California', 'Washington', 'Montana', 'South Dakota']

// State coordinates for Mapbox flyTo
export const STATE_COORDS: Record<string, [number, number, number]> = {
  'Alabama': [-86.7, 32.8, 6.5], 'Alaska': [-152, 64, 3], 'Arizona': [-111.5, 34.2, 6],
  'Arkansas': [-92.3, 34.9, 6.5], 'California': [-119.4, 37.2, 5.5], 'Colorado': [-105.5, 39.0, 6],
  'Connecticut': [-72.7, 41.6, 7.5], 'Delaware': [-75.5, 39.0, 7.5], 'District of Columbia': [-77.0, 38.9, 10],
  'Florida': [-81.5, 27.8, 6], 'Georgia': [-83.2, 32.6, 6.5], 'Hawaii': [-157.5, 21.3, 6.5],
  'Idaho': [-114.0, 44.2, 6], 'Illinois': [-89.2, 40.0, 6], 'Indiana': [-86.3, 39.9, 6.5],
  'Iowa': [-93.2, 42.0, 6.5], 'Kansas': [-98.4, 38.5, 6.5], 'Kentucky': [-84.9, 37.5, 6.5],
  'Louisiana': [-91.9, 30.9, 6.5], 'Maine': [-69.2, 45.3, 6.5], 'Maryland': [-76.8, 39.0, 7],
  'Massachusetts': [-71.8, 42.3, 7], 'Michigan': [-84.6, 43.3, 6], 'Minnesota': [-94.6, 46.4, 6],
  'Mississippi': [-89.6, 32.7, 6.5], 'Missouri': [-92.5, 38.3, 6.5], 'Montana': [-109.6, 47.0, 6],
  'Nebraska': [-99.8, 41.5, 6.5], 'Nevada': [-117.0, 39.3, 6], 'New Hampshire': [-71.5, 43.9, 7],
  'New Jersey': [-74.4, 40.1, 7], 'New Mexico': [-106.1, 34.4, 6], 'New York': [-75.5, 43.0, 6],
  'North Carolina': [-79.0, 35.5, 6.5], 'North Dakota': [-100.3, 47.5, 6.5], 'Ohio': [-82.6, 40.3, 6.5],
  'Oklahoma': [-96.9, 35.6, 6.5], 'Oregon': [-120.6, 43.9, 6], 'Pennsylvania': [-77.6, 40.9, 6.5],
  'Rhode Island': [-71.5, 41.7, 7.5], 'South Carolina': [-80.9, 33.8, 6.5], 'South Dakota': [-100.2, 44.4, 6.5],
  'Tennessee': [-86.3, 35.9, 6.5], 'Texas': [-99.3, 31.0, 5.5], 'Utah': [-111.7, 39.3, 6],
  'Vermont': [-72.7, 44.0, 6.5], 'Virginia': [-78.7, 37.5, 6.5], 'Washington': [-120.4, 47.4, 6],
  'West Virginia': [-80.6, 38.6, 6.5], 'Wisconsin': [-89.5, 44.6, 6], 'Wyoming': [-107.3, 43.0, 6],
}
