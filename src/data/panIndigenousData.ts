export interface IndigenousNation {
  id: string
  name: string
  indigenousName: string
  alternateNames: string[]
  country: string
  countryCode: string // ISO country code for map geocoding
  location: string
  coordinates: [number, number] // [lng, lat] for map marker
  population: string
  language: string
  languageFamily: string
  status: string
  history: string
  currentIssues: string
  resources: string[]
  category: string
  researchDocument: ResearchDocument
}

export interface ResearchDocument {
  title: string
  subtitle: string
  lastUpdated: string
  sections: ResearchSection[]
  sources: string[]
}

export interface ResearchSection {
  heading: string
  content: string
}

export interface Region {
  id: string
  name: string
  countries: string
  nations: IndigenousNation[]
  mapCenter: [number, number] // [lng, lat]
  mapZoom: number
}

// ══════════════════════════════════════════════════════════════
// JAMAICA — RESEARCHED 2025-07-06
// ══════════════════════════════════════════════════════════════
export const jamaicaNations: IndigenousNation[] = [
  {
    id: 'jm-taino',
    name: 'Taíno (Yamaye)',
    indigenousName: 'Yamaye',
    alternateNames: ['Arawak', 'Classic Taíno', 'Yamayeka'],
    country: 'Jamaica',
    countryCode: 'JM',
    location: 'Entire island — archaeological sites at White Marl (St. Catherine), Golden Vale (Portland), Montego Bay',
    coordinates: [-77.2975, 18.1096],
    population: 'Cultural revival active — genetic studies show 15-25% Taíno ancestry in modern Jamaicans; mitochondrial DNA markers found in 36% of Jamaican samples',
    language: 'Taíno (extinct, active revival efforts); Arawakan language family',
    languageFamily: 'Arawakan',
    status: 'Original inhabitants — no formal government recognition; cultural revival movement growing',
    history: 'The Taíno called Jamaica "Yamaye" (Land of Wood and Water). By 1494, an estimated 60,000 Taíno inhabited the island in organized villages led by caciques (chiefs). Archaeological evidence now confirms the Taíno were not Jamaica\'s first inhabitants — earlier Archaic Age peoples arrived around 4000 BCE, followed by Saladoid peoples around 600 BCE. The Taíno emerged as the dominant culture by 700-900 CE, building complex societies with agriculture (cassava, sweet potatoes, maize), fishing, canoe-building, and sophisticated religious cosmology led by bohuti (shamans). Columbus arrived in 1494 and unleashed mastiff dog attacks on the Taíno after they refused him landing. The Spanish under Juan de Esquivel — who had helped subjugate Hispaniola — began systematic eradication in 1510. The Taíno did not vanish; survivors fled to the Blue Mountains (Sierra de Bastidas) and other interior regions, where they intermarried with escaped Africans and formed the Maroon communities that survive today.',
    currentIssues: 'No formal government recognition despite genetic confirmation of significant ancestry. Cultural revival is growing — organizations like the Yamaye Guani (Jamaica Taíno) are working to reclaim heritage. DNA studies continue to reveal connections. Many Jamaican place names are of Taíno origin: Jamaica (Xaymaca), Guanaboa, Liguanea, Jamaica\'s rivers and mountains. The Jamaican National Heritage Trust has begun acknowledging Taíno archaeological sites.',
    resources: ['https://www.jnht.com/', 'https://minorityrights.org/communities/yamaye-taino-people-in-jamaica/', 'https://www.jamrockmuseum.com/education/the-first-peoples-of-jamaica-before-the-taino/'],
    category: 'Taíno',
    researchDocument: {
      title: 'The Taíno of Jamaica: Yamaye — The Original People',
      subtitle: 'A Comprehensive Research Document on the Indigenous Taíno of Jamaica',
      lastUpdated: '2025-07-06',
      sections: [
        {
          heading: 'Pre-Columbian History: The First Peoples',
          content: 'Long before the Taíno, Jamaica was inhabited by Archaic Age peoples who arrived by canoe from Central or South America approximately 5,000-6,000 years ago. These hunter-gatherers and fisherfolk lived in caves and coastal areas, leaving behind shell middens, stone tools, and burial sites. Around 600 BCE, the Saladoid people arrived from the Orinoco River Valley (modern Venezuela), bringing pottery, farming techniques, and village life. These evolved into the Ostionoid culture, which directly preceded the Taíno. By 700-900 CE, the Taíno emerged as the dominant civilization. The word "Taíno" means "noble" or "good" and refers to the Arawakan-speaking peoples of the Greater Antilles. The Jamaican Taíno called their island "Yamaye" — Land of Wood and Water — a name that described the island\'s lush tropical forests and abundant rivers.'
        },
        {
          heading: 'Social and Political Organization',
          content: 'Taíno society was organized into chiefdoms led by caciques (chiefs) who inherited their positions through matrilineal lines. The cacique was both political and spiritual leader, advised by bohuti (shamans) who communicated with spirits and ancestors. Villages (yucayeques) typically contained 1,000-2,000 people and featured large circular houses called bohíos. The Taíno practiced agriculture on a sophisticated scale, cultivating cassava (yuca), sweet potatoes, maize, beans, peppers, and tobacco. They built terraces and irrigation systems. Their religious cosmology centered on zemis — sacred ancestral idols representing deities like Yúcahu (spirit of cassava and the sea) and Atabey (mother goddess of fertility and fresh water). The Taíno were skilled navigators who built large canoes (some capable of carrying 150 people) and traded extensively throughout the Caribbean. They created pottery, petroglyphs (rock carvings), and cave paintings that survive at sites across Jamaica.'
        },
        {
          heading: 'The Arrival of Columbus and Spanish Colonization',
          content: 'Christopher Columbus arrived on the shores of Yamayeka in 1494 during his second voyage. When the Taíno refused to allow him to land his ships, Columbus unleashed mastiff dog attacks on the local population — one of the earliest documented uses of biological warfare in the Americas. In 1503, Columbus was marooned on the island\'s north coast for a year. During this time, he used his astronomical tables to predict a lunar eclipse, then told the Taíno his God had been angered by their lack of generosity — a trick that secured him food and survival. In 1510, Juan de Esquivel — infamous for his role in subjugating Hispaniola — arrived as Jamaica\'s first Spanish governor, beginning a campaign of systematic eradication. The Spanish established the encomienda system, which enslaved the Taíno and forced them to work in mines and plantations. Disease (smallpox, measles), overwork, and violence collapsed the population from an estimated 60,000 to fewer than 5,000 within decades.'
        },
        {
          heading: 'Survival and Resistance: The Taíno Did Not Disappear',
          content: 'Contrary to historical accounts claiming the Taíno became extinct, extensive evidence shows they survived by fleeing to Jamaica\'s mountainous interior, particularly the Blue Mountains (Sierra de Bastidas) and Cockpit Country. Spanish records document repeated expeditions to find and "tame" Taíno settlements, but the terrain made capture impossible. The Taíno intermarried with escaped Africans who had fled Spanish and later British plantations, creating the Maroon communities that would eventually force the British to sign treaties of recognition. This Taíno-African fusion created a unique cultural synthesis. Genetic studies published in peer-reviewed journals have confirmed significant Taíno ancestry in modern Jamaicans — mitochondrial DNA markers found in up to 36% of Jamaican samples can be traced to Indigenous American origins. Archaeological sites at White Marl (St. Catherine), Golden Vale (Portland), Montego Bay, Little River Cave (St. Ann), and Green Grotto Caves continue to yield Taíno artifacts.'
        },
        {
          heading: 'Cultural Legacy and Revival',
          content: 'The Taíno legacy pervades modern Jamaica. The island\'s name itself derives from Xaymaca (Taíno for "Land of Wood and Water"). Hundreds of place names are of Taíno origin: Guanaboa, Liguanea, Caymanas, Oracabessa, May Pen, Spanish Town (originally Villa de la Vega). Taíno words entered English and Spanish: barbecue (barbacoa), canoe, hammock, hurricane (juracán), tobacco, maize, potato, and cassava. The cultural revival movement has grown significantly in the 21st century. The Yamaye Guani (Jamaica Taíno) organization works to preserve and promote Taíno heritage. Annual gatherings celebrate Taíno culture, and DNA testing has enabled many Jamaicans to rediscover their Indigenous ancestry. However, the Jamaican government has not formally recognized the Taíno as an Indigenous people, and no land rights or special protections exist. The fight for recognition continues.'
        },
        {
          heading: 'Archaeological Sites and Material Evidence',
          content: 'Jamaica contains numerous Taíno archaeological sites that attest to the sophistication of their civilization. The White Marl site in St. Catherine has yielded thousands of ceramic artifacts, including zemis (sacred idols), pottery vessels, and tools. Golden Vale in Portland preserves petroglyphs and cave paintings. The Green Grotto Caves near Discovery Bay contain Taíno petroglyphs and were likely used for religious ceremonies. Little River Cave in St. Ann and Pedro Bluff in St. Elizabeth contain shell middens and stone tools from both the Archaic and Taíno periods. The Jamaica National Heritage Trust (JNHT) maintains records of over 200 Taíno sites across the island, though many remain unexcavated or threatened by development. The Taíno Museum at White Marl, operated by the JNHT, houses one of the Caribbean\'s largest collections of Taíno artifacts.'
        },
        {
          heading: 'Current Issues and Future Outlook',
          content: 'The primary challenge facing the Taíno revival movement is the lack of formal government recognition. Unlike the Maroons, who have treaty rights and political representation, the Taíno have no legal standing. Genetic research continues to strengthen the case for recognition — studies by researchers including Jada Benn Torres and others have documented significant Indigenous American ancestry in Jamaican populations. Cultural revival efforts face funding challenges and the difficulty of reconstructing traditions that were suppressed for centuries. However, the growing global Indigenous rights movement, increased access to DNA testing, and the work of organizations like the Yamaye Guani provide hope for future recognition. The United Nations Declaration on the Rights of Indigenous Peoples (UNDRIP), which Jamaica has endorsed, provides a framework that advocates are using to push for formal acknowledgment.'
        }
      ],
      sources: [
        'Jamrock Museum — The First Peoples of Jamaica: Before the Taíno (2026)',
        'Minority Rights Group — Yamaye Taíno People in Jamaica (2024)',
        'Library of Congress — Columbus and the Taíno Exhibition',
        'National Library of Jamaica — The Maroons: History Notes',
        'Harvard Business School — Treaty between the British and the Maroons (Kress Collection)',
        'Perkins, A.K. (2024) — "Secessionist Maroons who have asserted sovereignty" — Oasis Journal',
        'Wikipedia — Accompong (peer-reviewed)',
        'Embassy of Jamaica — History of Jamaica',
        'Zips, W. (2011) — "The Maroons: The Sovereigns of the Mountains"',
        'Fuller, H. & Benn Torres, J. (2018) — "Investigating the Taíno ancestry of the Jamaican Maroons"'
      ]
    }
  },
  {
    id: 'jm-accompong',
    name: 'Accompong Maroons',
    indigenousName: 'Accompong Town',
    alternateNames: ['Leeward Maroons', 'Trelawny Town Maroons', 'Kojo\'s People'],
    country: 'Jamaica',
    countryCode: 'JM',
    location: 'Cockpit Country, St. Elizabeth Parish — centered on Accompong Town',
    coordinates: [-77.832, 18.233],
    population: '~800 in Accompong Town; ~20,000 Maroons island-wide',
    language: 'English, Jamaican Patois; Kromanti (spiritual/ceremonial language derived from Akan)',
    languageFamily: 'English Creole / Kwa (Akan substrate)',
    status: 'Self-governing since 1739 — one of only two sovereign Maroon territories in Jamaica',
    history: 'The Accompong Maroons are descendants of enslaved Africans who escaped Spanish and later British plantations and joined surviving Taíno in Jamaica\'s mountainous interior. Led by Cudjoe (Kojo), a brilliant military strategist, they fought the British to a standstill during the First Maroon War (1728-1739). The British, unable to defeat them in the rugged Cockpit Country terrain, sued for peace. On March 1, 1739, Cudjoe signed the Treaty of Peace and Friendship under the Kindah Tree — a sacred mango tree that still stands today. The treaty granted the Maroons 1,500 acres of land, complete freedom, self-governance, and the right to hunt. In 1756, Accompong Town received an additional 1,000 acres. The Maroons were required to return runaway slaves (for which they received a bounty) and assist in repelling foreign invasions. The treaty has been honored for nearly 300 years, making the Accompong Maroons one of the longest-running self-governing communities of formerly enslaved peoples in the Americas.',
    currentIssues: 'Bauxite mining in Cockpit Country poses the greatest threat — mining operations destroy the karst landscape, pollute waterways, and threaten the Maroon way of life. In 2019, Accompong filed a petition with the Inter-American Commission on Human Rights seeking protection. The Maroons also face challenges from the Jamaican state regarding sovereignty claims — periodic conflicts with police over governance authority. Cultural preservation of the Kromanti language and spiritual practices is ongoing. Colonel Richard Currie, elected in 2021, has led campaigns for environmental protection and smart city development in Accompong.',
    resources: ['https://accompongmaroonsofjamaica.com/', 'https://cockpitcountry.com/', 'https://www.nlj.gov.jm/'],
    category: 'Maroon',
    researchDocument: {
      title: 'The Accompong Maroons: Sovereignty, Resistance, and Survival',
      subtitle: 'A Comprehensive Research Document on Accompong Maroon History, Culture, and Contemporary Challenges',
      lastUpdated: '2025-07-06',
      sections: [
        {
          heading: 'Origins: The Fusion of African and Taíno Resistance',
          content: 'The Accompong Maroons trace their origins to the collision of two forms of resistance: enslaved Africans who escaped British plantations and surviving Taíno who had fled to Jamaica\'s interior mountains during Spanish colonization. When the British captured Jamaica from Spain in 1655, many of the Spanish-owned enslaved Africans escaped into the hilly interior rather than submit to new masters. These escaped Africans — primarily from Akan peoples (Asante, Fante, Bono) of the Gold Coast (modern Ghana) — brought sophisticated knowledge of guerrilla warfare, agricultural techniques, and spiritual practices. They joined with Taíno survivors in the Cockpit Country, a rugged karst landscape of deep valleys, sinkholes, and dense forest that proved virtually impenetrable to British forces. Genetic studies by Fuller and Benn Torres (2018) have confirmed both African and Indigenous American ancestry in the Accompong Maroons, documenting the Taíno-African fusion that created Maroon identity.'
        },
        {
          heading: 'Cudjoe (Kojo): Military Genius and Founding Leader',
          content: 'Cudjoe, also known as Kojo, emerged as the paramount leader of the Leeward Maroons during the 1720s-1730s. Historical accounts describe him as a master of guerrilla warfare who used the Cockpit Country terrain to devastating effect against British regular troops. Cudjoe united various Maroon bands under his leadership at the Kindah Tree, a sacred mango tree that still stands in Accompong today. Under Cudjoe, the Maroons developed sophisticated military tactics: they struck plantations and military outposts at dawn, melted back into the mountains before reinforcements could arrive, and used horn signals (abeng) to communicate across valleys. British forces, led by professional officers with superior weapons, were repeatedly defeated. Between 1728 and 1739, the Jamaica Assembly passed 44 acts and spent £240,000 (an enormous sum for the era) in failed attempts to suppress the Maroons. Planter-historian Bryan Edwards wrote that the Maroons "plundered all around them, and caused several plantations to be thrown up and abandoned." Cudjoe\'s leadership forced the British to the negotiating table.'
        },
        {
          heading: 'The Treaty of 1739: A Document of Sovereignty',
          content: 'On March 1, 1739, Cudjoe signed the "Articles of Pacification with the Maroons of Trelawney Town" with British representatives John Guthrie and Francis Sadler. The treaty contained 15 articles that remain the foundation of Maroon sovereignty: (1) cessation of all hostilities forever; (2) complete freedom and liberty for Cudjoe and all his people; (3) permanent possession of 1,500 acres between Trelawny Town and the Cockpits; (4) liberty to cultivate coffee, cocoa, ginger, tobacco, and cotton, and to trade with island inhabitants; (5) right to hunt throughout the territory; (6-7) obligation to assist in repelling rebels and foreign invaders; (8-10) mutual justice provisions and return of runaway slaves; (11) annual meeting with the Governor; (12) right of Maroon captains to punish crimes among their own people; (13) obligation to maintain roads; (14) two white residents to maintain friendly correspondence; (15) succession: Cudjoe, then Accompong, then Johnny, then Cuffee, then Quaco, and thereafter the Governor would appoint. In 1756, Accompong Town received an additional 1,000 acres by Act of the Jamaica Assembly.'
        },
        {
          heading: 'Accompong: The Leader and the Town',
          content: 'Accompong was Cudjoe\'s brother-in-arms and designated successor. After the treaty, Cudjoe ruled Trelawny Town while Accompong governed Accompong Town. In 1751, planter Thomas Thistlewood recorded meeting Accompong: "about my size, in a Ruffled Shirt, Blue Broad Cloth Coat, Scarlet Cuffs to his Sleeves, gold buttons...and Black Hatt, White linen Breeches puff\'d at the knee, no stockings or shoes on." In 1755, Zacharias Caries described him wearing "an embroidered waistcoat, gold lace around his hat, a silver chain about his neck." Despite his sophisticated dress, Accompong remained barefoot — a symbol of his connection to the land. When Cudjoe died in 1764, Accompong attempted to take control of both towns, but the British governor asserted authority and limited him to Accompong Town. After Accompong\'s death, the British appointed white superintendents to oversee the town, though Maroon captains retained internal authority. The treaty\'s succession clause (Article 15) was never fully honored by the British, who preferred to appoint superintendents rather than recognize Maroon-appointed leaders.'
        },
        {
          heading: 'Governance Structure: The Maroon Political System',
          content: 'Accompong Maroons maintain a unique system of self-governance. The community is led by a Colonel-in-Chief (also called the Chief or Colonel), elected by the Maroon people for six-year terms. The Colonel presides over a council of captains and elders who make decisions for the community. Since Jamaica\'s independence in 1962, the government has recognized Maroon political and cultural rights in terms of the UN Declaration on the Rights of Indigenous Peoples (2007), including the right to maintain distinct political, legal, economic, social, and cultural institutions, and the right to self-government in matters relating to local affairs. In 2009, Ferron Williams was elected Colonel-in-Chief and served until 2021. In February 2021, Richard Currie was elected as the youngest Colonel-in-Chief in Accompong\'s history at age 40. Currie ran on a platform of environmental protection, smart city development, and defense of Maroon sovereignty against encroachment.'
        },
        {
          heading: 'Culture: Kromanti, Myal, and Maroon Spiritual Traditions',
          content: 'Accompong Maroon culture represents a living fusion of West African (primarily Akan/Asante) and Taíno traditions. The Kromanti language, used in spiritual ceremonies, derives from Akan languages of Ghana and is considered sacred — it is not spoken in daily life but only in ritual contexts. Maroon spiritual practices include Myal (a healing and possession tradition), the use of the abeng (cow horn) for communication, and the annual January 6th celebration commemorating both Cudjoe\'s birthday and the treaty signing. The Kindah Tree remains the spiritual center of Accompong — a sacred site where community decisions are made and ceremonies conducted. Maroon music combines African drumming patterns with call-and-response singing. Traditional foods reflect both African and Indigenous influences: cassava bread, jerk seasoning (derived from Taíno barbecoa techniques combined with African spices), and ackee (a West African fruit that became Jamaica\'s national dish). The Maroons also maintain extensive knowledge of medicinal plants found in Cockpit Country.'
        },
        {
          heading: 'The Bauxite Mining Crisis: Existential Threat',
          content: 'Bauxite mining represents the greatest existential threat to Accompong Maroons in the modern era. Jamaica\'s Cockpit Country contains some of the world\'s largest bauxite deposits, and mining companies have steadily expanded operations into Maroon territory. Bauxite mining destroys the karst landscape through open-pit excavation, pollutes rivers and groundwater with red mud waste, and displaces wildlife. For the Maroons, this is not merely environmental destruction — it is the destruction of their ancestral lands, sacred sites, and way of life. The Kindah Tree itself was threatened by mining operations in the 2000s, prompting international outcry. In 2019, Colonel Ferron Williams filed a petition with the Inter-American Commission on Human Rights (IACHR) seeking protection for Maroon lands. The petition argues that bauxite mining violates the Maroons\' rights to property, cultural integrity, and self-determination under the American Convention on Human Rights. The Cockpit Country Conservation Organization and other environmental groups have joined the Maroons in opposing mining expansion.'
        },
        {
          heading: 'Contemporary Conflicts with the Jamaican State',
          content: 'Relations between Accompong and the Jamaican state have grown increasingly tense under Colonel Richard Currie\'s leadership. Currie has asserted Maroon sovereignty in ways that challenge Jamaican state authority, claiming that the 1739 treaty established Accompong as a self-governing entity not subject to Jamaican law. In 2021, during the COVID-19 pandemic, Accompong held its annual January 6th treaty celebration despite Jamaican government restrictions on public gatherings, leading to confrontations with police. Prime Minister Andrew Holness has publicly expressed concern about what he termed "secessionist Maroons who have asserted sovereignty." However, legal scholars note that the Maroons\' claims are grounded in a valid treaty recognized by British and Jamaican law for nearly 300 years. The conflict reflects fundamental questions about Indigenous sovereignty within modern nation-states — questions being debated worldwide from Canada to New Zealand.'
        }
      ],
      sources: [
        'Perkins, A.K. (2024) — "Secessionist Maroons who have asserted sovereignty: Accompong Maroons and the Jamaican State Today" — Oasis Journal',
        'Zips, W. (2011) — "The Maroons: The Sovereigns of the Mountains"',
        'Harvard Business School — Treaty between the British and the Maroons (Kress Collection)',
        'National Library of Jamaica — The Maroons: History Notes',
        'Wikipedia — Accompong (peer-reviewed)',
        'Fuller, H. & Benn Torres, J. (2018) — "Investigating the Taíno ancestry of the Jamaican Maroons"',
        'Redalyc Journal — Accompong Maroons and the Jamaican State Today (2021)',
        'Silvera, J. (2021-2022) — Jamaica Gleaner coverage of Colonel Currie',
        'Cockpit Country Conservation Organization — cockpitcountry.com',
        'Inter-American Commission on Human Rights — Accompong Petition (2019)'
      ]
    }
  },
  {
    id: 'jm-mooretown',
    name: 'Moore Town Maroons',
    indigenousName: 'Nanny Town',
    alternateNames: ['Windward Maroons', 'Eastern Maroons', 'Nanny\'s People'],
    country: 'Jamaica',
    countryCode: 'JM',
    location: 'Blue Mountains, Portland Parish — centered on Moore Town',
    coordinates: [-76.417, 18.083],
    population: '~2,000 in Moore Town; Windward Maroons total ~5,000',
    language: 'English, Jamaican Patois; Kromanti (spiritual/ceremonial)',
    languageFamily: 'English Creole / Kwa',
    status: 'Self-governing since 1740 — UNESCO recognized; Queen Nanny is one of Jamaica\'s eight National Heroes',
    history: 'The Moore Town Maroons, also known as the Windward Maroons, are centered in the Blue Mountains of eastern Jamaica. Their legendary leader, Queen Nanny, was a military strategist, spiritual leader, and Obeah woman who led her people in devastating guerrilla attacks against British forces during the First Maroon War. Nanny\'s forces repeatedly defeated British troops using ambush tactics, spiritual warfare, and intimate knowledge of the Blue Mountains terrain. The British made five separate attempts to negotiate a treaty with the Windward Maroons before finally succeeding. On December 23, 1739, Windward leader Quao signed a treaty with the British. A year later, Queen Nanny signed a separate treaty. The treaties granted the Windward Maroons land, freedom, and self-governance. Queen Nanny is now one of Jamaica\'s eight National Heroes — the only woman among them — and the only Maroon leader to receive this honor. In 2005, Moore Town was designated a UNESCO Masterpiece of Oral and Intangible Heritage for preserving Maroon traditions including the Kromanti language, abeng horn music, and spiritual practices.',
    currentIssues: 'Preservation of oral traditions and Kromanti spiritual practices as elders pass away. Economic sustainability — the community relies on subsistence farming, craft sales, and cultural tourism. Deforestation in the Blue Mountains threatens traditional territories. Climate change is affecting agricultural patterns. The community is working to develop sustainable tourism that respects Maroon culture while providing income. Digital documentation projects are underway to record elder knowledge before it is lost.',
    resources: ['https://ich.unesco.org/', 'https://www.jnht.com/', 'https://www.nlj.gov.jm/'],
    category: 'Maroon',
    researchDocument: {
      title: 'The Moore Town Maroons: Queen Nanny\'s Legacy',
      subtitle: 'A Comprehensive Research Document on the Windward Maroons of Jamaica\'s Blue Mountains',
      lastUpdated: '2025-07-06',
      sections: [
        {
          heading: 'Queen Nanny: Warrior, Strategist, and National Hero',
          content: 'Queen Nanny stands as one of the most remarkable figures in the history of resistance to slavery. An Obeah woman (spiritual leader and healer), military strategist, and political leader, Nanny organized and led the Windward Maroons in devastating attacks against British forces during the First Maroon War (1720s-1739). Historical accounts describe her as possessing extraordinary tactical abilities — she organized her fighters into specialized units, established a network of lookouts and communication systems using the abeng (cow horn), and constructed defensive positions in the Blue Mountains that British troops could never penetrate. According to Maroon oral tradition, Nanny could catch British bullets between her teeth and redirect them at enemy soldiers — a story that likely reflects her skill at deflecting musket balls using spiritual-military techniques. The British suffered repeated defeats in the Blue Mountains, with entire patrols being wiped out in ambushes. Nanny\'s leadership was so effective that the British made five separate attempts to negotiate a treaty with the Windward Maroons, each time being rebuffed until Nanny was ready.'
        },
        {
          heading: 'The Windward Maroon Treaties of 1739-1740',
          content: 'The Windward Maroons signed two treaties with the British. The first, on December 23, 1739, was signed by Captain Quao and contained 15 articles similar to the Leeward Treaty. A second treaty was signed a year later by Queen Nanny herself, establishing Moore Town\'s autonomy. The treaties granted the Windward Maroons: freedom and liberty in perpetuity; permanent land rights in the Blue Mountains; the right to self-governance; the right to hunt and cultivate; and the obligation to return runaway slaves and assist in repelling invasions. The treaties also established the succession of Maroon leadership, recognizing the authority of Maroon captains to govern internal affairs. Unlike the Leeward Maroons, the Windward Maroons maintained their treaty relationship more consistently, with less interference from British-appointed superintendents. The relative isolation of the Blue Mountains compared to the Cockpit Country allowed Moore Town to preserve its traditions more intact over the centuries.'
        },
        {
          heading: 'Moore Town: UNESCO Heritage and Living Culture',
          content: 'In 2005, Moore Town was designated a UNESCO Masterpiece of the Oral and Intangible Heritage of Humanity — one of the highest international recognitions for cultural preservation. The designation specifically acknowledged three elements of Maroon heritage: the Kromanti language, a sacred ceremonial language derived from Akan languages of Ghana; the abeng horn music, used for communication and ceremonial purposes; and the traditional spiritual practices combining West African and Indigenous elements. The Kromanti language is particularly significant — it is not spoken in daily life but is reserved for spiritual ceremonies, funerals, and treaty commemorations. Linguists consider it one of the best-preserved examples of African language retention in the Americas. The abeng, made from a cow horn, can produce distinct tones that communicate specific messages across the mountain valleys — a system that predates modern telecommunications by centuries. Maroon oral history, passed down through generations of elders, contains detailed accounts of the First Maroon War, Queen Nanny\'s leadership, and the treaty negotiations.'
        },
        {
          heading: 'Governance and Community Structure',
          content: 'Moore Town is governed by a Colonel, elected by the Maroon community, who presides over a council of captains and elders. The Colonel represents the community in dealings with the Jamaican government and international organizations. Internal disputes are resolved through traditional Maroon justice systems rather than Jamaican courts. The community maintains a subsistence agricultural economy, growing yams, bananas, plantains, and vegetables on mountain terraces. Traditional crafts — including basket weaving, woodcarving, and drum-making — provide additional income. Cultural tourism has become increasingly important, with visitors coming to learn about Maroon history, participate in ceremonial events, and experience traditional Maroon culture. The community carefully manages tourism to prevent cultural commodification and ensure that visitors respect sacred traditions.'
        },
        {
          heading: 'Spiritual Traditions: Kromanti, Obeah, and Ancestral Practices',
          content: 'Moore Town\'s spiritual life centers on practices that fuse West African (primarily Akan and Yoruba) traditions with Indigenous Taíno elements. The Kromanti ceremony is the most sacred ritual — a complex spiritual practice involving drumming, singing in the Kromanti language, and possession by ancestral spirits. The ceremony is led by a Kromanti specialist who serves as medium between the living and the ancestors. Obeah, often misunderstood outside Jamaica as simply witchcraft, is in the Maroon context a comprehensive system of herbal medicine, spiritual healing, and protective magic. Maroon Obeah practitioners (known as "doctors" or "mothers") maintain extensive knowledge of medicinal plants found in the Blue Mountains, treating ailments ranging from diabetes to spiritual disturbances. Ancestor veneration is central to Maroon spirituality — the dead are believed to remain active in community affairs, offering guidance and protection. Annual ceremonies honor the ancestors, particularly Queen Nanny and the warriors of the First Maroon War.'
        },
        {
          heading: 'Contemporary Challenges: Preservation and Sustainability',
          content: 'Moore Town faces significant challenges in the 21st century. The most pressing is the loss of elder knowledge — as older generations pass away, the Kromanti language and oral traditions are at risk of extinction. Only a handful of elders remain fluent in Kromanti, and younger generations are increasingly drawn to urban life in Kingston and abroad. Deforestation in the Blue Mountains threatens traditional agricultural lands and medicinal plant habitats. Climate change is altering rainfall patterns, making subsistence farming more difficult. Economic sustainability remains a constant challenge — the community has limited access to markets, infrastructure, and capital. Efforts are underway to address these challenges: digital documentation projects are recording elder knowledge, sustainable tourism initiatives are being developed, and partnerships with universities and international organizations are providing research support. The Maroons are also exploring the commercial potential of traditional knowledge, including medicinal plants and cultural products, while ensuring that such development respects community values.'
        },
        {
          heading: 'Queen Nanny as National Hero: Symbol of Resistance',
          content: 'Queen Nanny was declared one of Jamaica\'s eight National Heroes in 1982 — making her the only woman and the only Maroon to receive this honor. The designation recognized her extraordinary leadership in resisting slavery and securing freedom for her people. Nanny has become a powerful symbol of resistance not only for Jamaicans but for people of African descent worldwide. Her image appears on Jamaica\'s $500 banknote, and numerous schools, roads, and public buildings bear her name. The annual Nanny Day celebrations on October 19th draw thousands of visitors to Moore Town. Nanny\'s legacy extends beyond Jamaica — she is celebrated throughout the African diaspora as an example of successful armed resistance to slavery. Academic works, novels, films, and music have all drawn inspiration from her story. For the Maroons of Moore Town, Nanny remains a living presence — her spirit is believed to protect the community, and her example continues to guide their struggle for sovereignty and cultural preservation.'
        }
      ],
      sources: [
        'UNESCO — Moore Town Maroons: Oral and Intangible Heritage (2005)',
        'National Library of Jamaica — The Maroons: History Notes',
        'Jamaica National Heritage Trust — Queen Nanny National Hero designation',
        'Perkins, A.K. (2024) — Oasis Journal on Maroon sovereignty',
        'Zips, W. (2011) — "The Maroons: The Sovereigns of the Mountains"',
        'Carey, B. (1997) — "The Maroon Story"',
        'Bilby, K. (2005) — "True-Born Maroons"',
        'Campbell, M. (1990) — "The Maroons of Jamaica"',
        'Hart, R. (2002) — "Slaves Who Abolished Slavery"',
        'Jamaica Gleaner — Nanny Day coverage and Moore Town features'
      ]
    }
  },
  {
    id: 'jm-african',
    name: 'African Ethnic Origins',
    indigenousName: '',
    alternateNames: ['Akan/Asante', 'Igbo', 'Yoruba', 'Fon', 'Kongo', 'Coromantee'],
    country: 'Jamaica',
    countryCode: 'JM',
    location: 'Island-wide — foundational heritage of the majority population',
    coordinates: [-77.5, 18.15],
    population: 'Majority of Jamaican population (92.1% African descent per 2011 census)',
    language: 'English, Jamaican Patois (significant Kwa/Akan substrate); remnants of African languages in spiritual contexts',
    languageFamily: 'Kwa / Bantu / Yoruboid',
    status: 'Foundational heritage — constitutive element of Jamaican national identity',
    history: 'Between the 17th and 19th centuries, approximately 2 million enslaved Africans were transported to Jamaica. The majority came from the Akan peoples of the Gold Coast (modern Ghana) — Asante, Fante, Bono, Wassa, Nzema, and Ahanta — who became known as "Coromantee" in Jamaica. The Akan were preferred by British planters as "better workers" and were distributed across all 14 of Jamaica\'s ports. The Igbo people of southeastern Nigeria constituted the second-largest group, primarily imported through Montego Bay and St. Ann\'s Bay. Other significant groups included the Yoruba of southwestern Nigeria, the Fon/Dahomey of modern Benin, the Bakongo of Central Africa, and the Ewe and related Gbe-speaking peoples. These enslaved Africans brought not just labor but entire civilizations: spiritual traditions (Kumina, Revival Zion, Rastafari), agricultural knowledge, music (Nyabinghi rhythm), dance, oral storytelling, political organization, and resistance strategies. African traditions merged with surviving Taíno practices and European elements to create uniquely Jamaican cultural forms.',
    currentIssues: 'Cultural amnesia — many Jamaicans remain unaware of their specific African ethnic origins. DNA testing is gradually revealing connections. The reparations movement continues to advocate for acknowledgment of the transatlantic slave trade\'s lasting impacts. Rastafari serves as a living bridge to African heritage. Educational gaps persist — African history and culture are underrepresented in Jamaican school curricula. The movement for greater connection between Jamaica and Africa is growing, with increased diplomatic and cultural ties to Ghana, Nigeria, and Ethiopia.',
    resources: ['https://www.jnht.com/', 'https://slavevoyages.org/', 'https://www.jamrockmuseum.com/cultural/jamaicans-a-proud-heritage-rooted-in-west-africa/'],
    category: 'AfricanIndigenous',
    researchDocument: {
      title: 'African Origins in Jamaica: The Roots of a Nation',
      subtitle: 'A Comprehensive Research Document on the African Ethnic Heritage of the Jamaican People',
      lastUpdated: '2025-07-06',
      sections: [
        {
          heading: 'The Transatlantic Slave Trade and Jamaica',
          content: 'Jamaica was the largest slave market in the British Caribbean. Between the mid-17th century and the abolition of the British slave trade in 1807, approximately 2 million enslaved Africans were transported to Jamaica, with tens of thousands dying during the brutal Middle Passage. Slave ship records, compiled in the Slave Voyages Database, provide detailed documentation of the origins of these enslaved people. Jamaica received more enslaved Africans than any other British colony, and the island\'s sugar plantations generated enormous wealth for British planters and the empire. The conditions endured by enslaved people were horrific: families were routinely separated, housing and sanitary conditions were abysmal, beatings and torture were standard practice, and the average life expectancy of an enslaved person in Jamaica was just 7 years. Despite this brutality, enslaved Africans managed to preserve and transmit elements of their cultures across generations.'
        },
        {
          heading: 'The Akan Peoples: Jamaica\'s Largest African Heritage Group',
          content: 'The Akan peoples of the Gold Coast (modern Ghana) constituted the largest single ethnic group among enslaved Africans in Jamaica. Leonard Parkinson, a prominent Jamaican Maroon leader depicted in a 1796 engraving, was of Akan descent. Slave ship records indicate that the Akan — specifically the Asante, Bono, Wassa, Nzema, and Ahanta peoples — were the dominant African culture in Jamaica. The Akan were known as "Coromantee" in Jamaica, named after the Dutch Fort Kormantin on the Gold Coast. The term originally referred to enslaved people from that specific port but eventually became generalized for all Akan peoples. The Akan were preferred by British planters because they were considered "better workers" — in reality, this preference reflected the Akan\'s sophisticated agricultural knowledge and resistance to certain tropical diseases. The Akan were distributed across all 14 of Jamaica\'s ports, making their cultural influence island-wide. Akan cultural elements that survive in Jamaica include: the concept of the abusua (matrilineal clan system), elements of Maroon governance, Anansi stories (trickster tales featuring the spider), and significant vocabulary in Jamaican Patois.'
        },
        {
          heading: 'The Igbo: Jamaica\'s Second-Largest African Heritage Group',
          content: 'The Igbo people of southeastern Nigeria constituted the second-largest ethnic group among enslaved Africans in Jamaica. Unlike the Akan, who were distributed across the island, Igbo enslaved people were primarily imported through Montego Bay and St. Ann\'s Bay on the north coast, creating concentrated Igbo populations in those regions. The Igbo brought with them sophisticated agricultural knowledge, particularly of yam cultivation, as well as spiritual traditions that would evolve into Jamaican Revival Zion and other Afro-Christian practices. Igbo cultural elements in Jamaica include: the Jonkonnu festival (derived from Igbo masquerade traditions), certain burial customs, and the persistence of Igbo personal names among Jamaican families. The Igbo were known among enslavers for their strong sense of personal dignity and their high rate of suicide in captivity — many Igbo preferred death to slavery, a fact that enslavers noted with both fear and contempt. The famous "Igbo Landing" story, in which Igbo captives walked into the sea rather than accept enslavement, has become a powerful symbol of resistance in African American and Caribbean culture.'
        },
        {
          heading: 'Yoruba, Fon, Kongo, and Other African Contributions',
          content: 'Beyond the Akan and Igbo, numerous other African ethnic groups contributed to Jamaican culture. The Yoruba of southwestern Nigeria brought sophisticated spiritual traditions that would influence Jamaican Obeah, Myal, and ultimately Rastafari. Yoruba orisha worship (devotion to deities like Shango, Ogun, and Oshun) can be traced in Jamaican spiritual practices. The Fon and related peoples of Dahomey (modern Benin) brought Vodun traditions that influenced Haitian Vodou and Jamaican spiritual practices. The Bakongo and other Central African peoples contributed Kongo cosmology — the concept of the crossroads (Kongo dikenga) as a point of spiritual power survives in Jamaican Obeah and in broader African American culture. The Ewe and related Gbe-speaking peoples contributed elements of music and dance. The Mande peoples (Mende, Mandinka) and Fulani contributed smaller but significant cultural elements. Each group brought distinct languages, religious beliefs, musical traditions, agricultural knowledge, and social organization. The fusion of these diverse African traditions in Jamaica created one of the most dynamic and influential Afro-diasporic cultures in the world.'
        },
        {
          heading: 'Cultural Survival: How African Traditions Shaped Jamaica',
          content: 'Despite the systematic cultural destruction of slavery, African traditions survived and evolved in Jamaica through several mechanisms. Maroon communities preserved African languages (Kromanti), governance structures, and spiritual practices most intact. Plantation communities preserved African music, dance, and storytelling through adaptation — African rhythms were incorporated into work songs, spirituals, and later reggae. African religious traditions merged with Christianity to create Revival Zion, Pukkumina, and other Afro-Christian movements. The Rastafari movement, which emerged in the 1930s, explicitly sought to reconnect with African heritage — its Nyabinghi drumming draws directly from African patterns, its Ital diet reflects African food principles, and its theology centers on Ethiopian Emperor Haile Selassie as a divine African king. African agricultural knowledge transformed Jamaican cuisine: ackee (a West African fruit), okra, callaloo, yams, and plantains all came from Africa and became staples of Jamaican food. The Jamaican saying "Out of Many, One People" acknowledges this African foundation, though it often understates the extent to which African culture constitutes Jamaica\'s primary heritage.'
        },
        {
          heading: 'The Reparations Movement and Contemporary Connections',
          content: 'The movement for reparations for slavery has gained significant momentum in Jamaica and the broader Caribbean. The Caribbean Community (CARICOM) Reparations Commission, established in 2013, has identified Britain and other European nations as owing reparations for the transatlantic slave trade and colonial exploitation. Jamaica has been at the forefront of this movement, with the government officially endorsing reparations claims. The movement seeks not just financial compensation but also: acknowledgment of the crimes of slavery; apology from former slave-trading nations; debt cancellation; technology transfer; and support for cultural and educational programs. At the individual level, DNA testing has enabled many Jamaicans to trace their specific African ethnic origins, creating direct connections between Jamaican families and communities in Ghana, Nigeria, and other African nations. The "Year of Return" initiatives promoted by Ghana and other African nations have facilitated cultural exchanges and reunions. However, significant challenges remain — many Jamaicans still lack awareness of their specific African heritage, and educational gaps persist in teaching African history and culture.'
        },
        {
          heading: 'Rastafari: A Living Bridge to African Heritage',
          content: 'The Rastafari movement, which emerged in Jamaica in the 1930s, represents one of the most significant efforts to reclaim African heritage in the modern era. Founded on the coronation of Ethiopian Emperor Haile Selassie I (Ras Tafari Makonnen) in 1930, the movement identified Selassie as the Messiah and Africa as the spiritual homeland of Black people. Rastafari theology draws on Biblical prophecy, Garveyite Pan-Africanism, and African spiritual concepts. Its cultural practices explicitly reconnect with African traditions: Nyabinghi drumming (named after a Rwandan/Ugandan resistance movement) uses African-derived rhythms; the Ital diet emphasizes natural foods consistent with African dietary principles; dreadlocks reflect the Nazarite vow and African hair traditions; and the use of cannabis (ganja) in spiritual ceremonies connects to African and Indian spiritual practices. Rastafari has become Jamaica\'s most visible cultural export, spreading worldwide through reggae music — particularly the work of Bob Marley, Peter Tosh, and Burning Spear. The movement has maintained its African-centered focus while evolving to address contemporary issues including repatriation to Africa, social justice, and environmental consciousness.'
        }
      ],
      sources: [
        'Slave Voyages Database — slavevoyages.org (Emory University)',
        'Wikipedia — Afro-Jamaicans (peer-reviewed)',
        'Jamrock Museum — Jamaicans: A Proud Heritage Rooted in West Africa (2026)',
        'Embassy of Jamaica — History of Jamaica',
        'National Library of Jamaica — The Maroons',
        'Carey, B. (1997) — "The Maroon Story"',
        'Bilby, K. (2005) — "True-Born Maroons"',
        'Hart, R. (2002) — "Slaves Who Abolished Slavery"',
        'CARICOM Reparations Commission Reports',
        'Fuller, H. & Benn Torres, J. (2018) — Taíno-Ancestry Genetic Studies'
      ]
    }
  },
]

// ══════════════════════════════════════════════════════════════
// HAITI — RESEARCHED 2025-07-06
// ══════════════════════════════════════════════════════════════
export const haitiNations: IndigenousNation[] = [
  {
    id: 'ht-taino',
    name: 'Taíno (Ayiti)',
    indigenousName: 'Ayiti / Kiskeya',
    alternateNames: ['Arawak', 'Classic Taíno', 'Quisqueya'],
    country: 'Haiti',
    countryCode: 'HT',
    location: 'Western Hispaniola — coastal plains and interior valleys',
    coordinates: [-72.2852, 18.9712],
    population: 'Cultural survival through intermarriage; estimated 200,000+ with Taíno ancestry',
    language: 'Taíno (extinct); Arawakan language family',
    languageFamily: 'Arawakan',
    status: 'Original inhabitants — name survives as "Haiti"',
    history: 'The Taíno called the island Ayiti ("mountainous land") and Kiskeya ("mother of all lands"). At European contact in 1492, the Taíno population of Hispaniola was organized into five caciquats (kingdoms) led by caciques. Anacaona, the female cacique of Xaragua (modern Leogane), was one of the most celebrated leaders — renowned for her beauty, poetry, and diplomacy. Columbus landed on December 6, 1492, renaming the island "Española." Within 25 years of contact, most Taíno had died from enslavement, massacre, and disease. By 1514, only 32,000 remained from an original population estimated at several hundred thousand to over one million. Taíno survivors fled to remote mountain regions and intermarried with escaped Africans, contributing to the genetic and cultural heritage of modern Haitians.',
    currentIssues: 'No formal recognition as Indigenous people. Taíno DNA survives in Haitian population through intermarriage with escaped Africans. The name "Haiti" itself honors Taíno heritage. Cultural revival growing through DNA studies and heritage education.',
    resources: ['https://thehaitianrevolution.com/taino-and-spanish-rule', 'https://www.smithsonianmag.com/history/who-were-taino-original-inhabitants-columbus-island-73824867/'],
    category: 'Taíno',
    researchDocument: {
      title: 'The Taíno of Ayiti: Original People of Haiti',
      subtitle: 'A Comprehensive Research Document on the Indigenous Taíno of Haiti',
      lastUpdated: '2025-07-06',
      sections: [
        {
          heading: 'Pre-Columbian Haiti: The Five Caciquats',
          content: 'Before European contact, the Taíno of Hispaniola (which they called Ayiti and Kiskeya) lived in a well-organized communal society divided among five caciquats or kingdoms. Each caciquat was governed by a cacique (chief) and centered on the island\'s coastal plains and interior valleys. The name "Ayiti" meant "mountainous land" — a fitting description of Haiti\'s dramatic landscape. "Kiskeya" (or Quisqueya) meant "mother of all lands," reflecting the Taíno belief that Hispaniola was the cradle of creation. Estimates of the Taíno population at contact range from several hundred thousand to over one million, making Hispaniola one of the most densely populated islands in the Caribbean. The Taíno were skilled farmers who cultivated cassava, sweet potatoes, maize, and tobacco; expert navigators who built canoes capable of carrying 150 people; and sophisticated artisans who created pottery, zemis (sacred idols), and intricate woven goods.'
        },
        {
          heading: 'Anacaona: The Golden Flower',
          content: 'Anacaona, whose name means "Golden Flower," was the cacica (female chief) of Xaragua in southwestern Hispaniola — the territory of modern Leogane, Haiti. She was renowned throughout the Caribbean for her beauty, intelligence, poetic skill, and diplomatic abilities. Her husband Caonabo was the cacique of Maguana, making them one of the most powerful couples in Taíno society. After Caonabo was captured by the Spanish and died en route to Spain, Anacaona ruled Xaragua alone. She initially attempted peaceful coexistence with the Spanish, hosting them in her village and entertaining Spanish governor Nicolas de Ovando. However, Ovando betrayed her hospitality — during a feast in 1502, Spanish soldiers massacred Anacaona\'s nobles and burned her village. Anacaona was captured and hanged. A statue of Anacaona now stands in Leogane, and she remains a powerful symbol of Haitian resistance and Indigenous identity. Her story exemplifies the betrayal and violence that characterized Spanish-Taíno relations.'
        },
        {
          heading: 'Columbus and the Destruction of La Navidad',
          content: 'Christopher Columbus landed on the north coast of Ayiti on December 6, 1492, during his first voyage. He renamed the island "Española" (Little Spain) and established a small fort called La Navidad, leaving 39 men behind to search for gold. The men brutalized the local Taíno, pillaging villages, seizing women, and committing acts of violence. The Taíno retaliated by killing the men and burning La Navidad to the ground. When Columbus returned a year later with 17 ships and 1,200 men, he found only ruins. He then established La Isabela on the north coast in 1494 — the first permanent European settlement in the Americas. The Spanish immediately began systematic exploitation: men were forced to work in gold mines and plantations, separated from their families and prevented from planting crops. Starvation, combined with European diseases (smallpox, measles) to which the Taíno had no immunity, caused catastrophic population collapse.'
        },
        {
          heading: 'The Genocide: 32,000 Remaining by 1514',
          content: 'Within just 25 years of Columbus\' arrival, the Taíno population of Hispaniola collapsed from hundreds of thousands to approximately 32,000 by 1514. The causes were multiple and interconnected: disease (smallpox, measles, typhus), overwork in mines and plantations, starvation due to displaced agriculture, mass suicide, direct violence, and the disruption of family and community structures. Spanish records document the devastation with bureaucratic coldness. By 1519, a third of the remaining population had died from smallpox alone. In the 1530s, Spanish officials inquired about the number of Indians and their chiefs; the response was "none — they are gone." However, "gone" did not mean extinct. As Puerto Rican historian Ricardo Alegría documented, some Taíno survived by fleeing to remote mountain regions beyond colonial control, where they intermarried with escaped Africans and formed the communities that would become the Haitian Maroons.'
        },
        {
          heading: 'Survival and the African-Taíno Fusion',
          content: 'The Taíno did not vanish — they transformed. Survivors fled to the Bahoruco Mountains and other remote regions of western Hispaniola, where they joined with escaped African slaves (maroons) who had begun establishing independent communities. This Taíno-African fusion created a unique cultural synthesis that would become the foundation of Haitian identity. The Maroons adopted Taíno knowledge of the terrain, agricultural techniques, and medicinal plants. Taíno place names survived and became the names of Haitian towns and regions. Perhaps most significantly, the African spiritual traditions that would become Haitian Vodou incorporated Taíno elements — the Taíno reverence for nature spirits, ancestral veneration, and the use of tobacco in ceremonies all found their way into Vodou practice. Genetic studies have confirmed Indigenous American ancestry in the Haitian population, though it is less extensively studied than in Jamaica or Puerto Rico.'
        },
        {
          heading: 'The Name Haiti: A Taíno Legacy',
          content: 'When Haiti achieved independence in 1804, becoming the first Black republic in the world, the revolutionary leaders chose to rename the country "Haiti" — the Taíno name for the island. This was a deliberate act of cultural reclamation, replacing the French colonial name "Saint-Domingue" with the Indigenous name "Ayiti" (spelled "Haiti" in French). Jean-Jacques Dessalines, the revolutionary leader who proclaimed independence, thus honored the island\'s first inhabitants while simultaneously asserting a new identity free from colonial nomenclature. The name "Haiti" is therefore one of the most powerful symbols of Indigenous survival in the Americas — a daily reminder that the Taíno were here, that their name for the land persisted through centuries of colonization, and that the descendants of enslaved Africans chose to honor their memory. No other country in the Caribbean bears an Indigenous name in this way.'
        }
      ],
      sources: [
        'The Haitian Revolution — taino-and-spanish-rule (thehaitianrevolution.com)',
        'Smithsonian Magazine — Who Were the Taíno, the Original Inhabitants of Columbus\' Island Colonies? (2023)',
        'University of Connecticut — The Decline of the Tainos, 1492-1542: A Re-Vision',
        'Ricardo Alegría — Puerto Rican historian and anthropologist (archival research)',
        'Wikipedia — Taíno (peer-reviewed)',
        'Schimmer, Russell — GSP, Yale University',
        'Black History Month — Taíno History Archives',
        'Jean Casimir (2020) — "The Haitians: A Decolonial History"'
      ]
    }
  },
  {
    id: 'ht-maroons',
    name: 'Haitian Maroons (Mawon)',
    indigenousName: 'Mawon',
    alternateNames: ['Marron', 'Grand Marronage', 'Bahoruco Maroons'],
    country: 'Haiti',
    countryCode: 'HT',
    location: 'Bahoruco Mountains and remote highlands throughout western Hispaniola',
    coordinates: [-73.9667, 18.2333],
    population: 'Historical — communities in the thousands; legacy continues in modern Haiti',
    language: 'Haitian Creole (Kreyol), French; African languages in spiritual contexts',
    languageFamily: 'French Creole / Kwa / Bantu',
    status: 'Historical — foundational to Haitian independence',
    history: 'The Haitian Maroons (Mawon) were escaped slaves who formed independent communities in the remote mountainous regions of Saint-Domingue, particularly the Bahoruco Mountains. From the 17th century onward, enslaved Africans fled the brutal French plantation system and established free communities practicing subsistence agriculture and hunting. The Maroons were never defeated by French forces despite repeated expeditions in 1702, 1728, 1733, 1740, 1742, 1746, 1757, and 1761. In 1776-1777, a joint French-Spanish expedition failed to destroy Maroon settlements after the Maroons were alerted and retreated deeper into the mountains. The most famous Maroon leader was François Mackandal, a Vodou priest who led a six-year rebellion (1751-1757) using poison to attack plantation owners. Mackandal was captured and executed in 1758, becoming a martyr. The Maroon tradition of resistance culminated in the Haitian Revolution of 1791-1804, when Maroon leaders including Boukman Dutty launched the uprising that created the first Black republic.',
    currentIssues: 'The Maroon legacy is central to Haitian national identity — the iconic Neg Mawon statue in Port-au-Prince commemorates their role. However, modern Haiti faces political instability, economic crisis, and environmental degradation that threaten historical Maroon territories. The Bahoruco Mountains remain a biodiversity hotspot but face deforestation. Scholarly research into Maroon history continues, with new archival discoveries revealing the sophistication of Maroon communities.',
    resources: ['https://thehaitianrevolution.com/', 'https://en.wikipedia.org/wiki/Maroons'],
    category: 'Maroon',
    researchDocument: {
      title: 'The Haitian Maroons: Mawon and the Path to Freedom',
      subtitle: 'A Comprehensive Research Document on the Maroons of Haiti',
      lastUpdated: '2025-07-06',
      sections: [
        {
          heading: 'The Birth of Marronnage in Saint-Domingue',
          content: 'Marronnage — the act of escaping slavery and forming independent communities — was a continuous feature of life in colonial Saint-Domingue from the earliest days of French colonization in the 17th century. The term "marron" (French) or "mawon" (Haitian Creole) referred to escaped slaves who fled to remote mountainous areas beyond colonial control. Saint-Domingue, which would become Haiti, was France\'s most profitable colony — the "Pearl of the Antilles" — generating enormous wealth through sugar, coffee, and indigo plantations worked by hundreds of thousands of enslaved Africans. The brutal conditions of slavery — torture, family separation, overwork, and malnutrition — drove constant escapes. Unlike in Jamaica, where the British eventually signed treaties with Maroons, the French never negotiated permanent peace with Saint-Domingue\'s Maroons. Instead, the French pursued a policy of extermination, sending repeated military expeditions into the mountains. These expeditions consistently failed, demonstrating the Maroons\' military superiority in terrain warfare.'
        },
        {
          heading: 'The Bahoruco Mountains: Impregnable Fortress',
          content: 'The Bahoruco Mountains in southwestern Hispaniola served as the primary stronghold for Haitian Maroons. This rugged mountain range, with its dense forests, deep caves, and steep ravines, proved virtually impenetrable to French colonial forces. Maroon communities in the Bahoruco practiced small-scale agriculture, hunted, and maintained close-knit social structures based on African village models. They were known to return to plantations to free family members and friends, and on occasion joined Taíno settlements that had survived Spanish colonization. French military records document repeated failures to dislodge the Maroons: in 1702, an expedition killed three Maroons and captured 11, but over 30 escaped; in 1719, French forces captured a leader named Michel, but the communities continued; expeditions in 1728 and 1733 captured 46 and 32 Maroons respectively, yet the communities persisted. In 1776-1777, a joint French-Spanish expedition ventured into the Bahoruco Mountains but found only abandoned villages — the Maroons had been alerted and retreated to even more remote areas.'
        },
        {
          heading: 'François Mackandal: The Poison Rebel',
          content: 'François Mackandal stands as the most celebrated Maroon leader in Haitian history. A one-armed man from Guinea (West Africa), Mackandal was a Vodou priest (houngan) who escaped slavery and established himself as a leader in the northern mountains of Saint-Domingue around 1750. For six years (1751-1757), Mackandal led a guerrilla war against the plantation system, using poison ("gadé kò" or bodyguards) to kill plantation owners, their families, and livestock. His network of enslaved collaborators poisoned water supplies and food across the northern plain. Mackandal claimed supernatural powers and prophesied that the whites would be driven from the island. The French responded with mass arrests and torture, but Mackandal evaded capture until 1758. According to legend, at his execution by burning in Cap-Francais (modern Cap-Haitien), Mackandal broke free from his bonds and flew away — a story that elevated him to near-mythical status among the enslaved population. Mackandal\'s rebellion demonstrated that organized resistance was possible and laid groundwork for the Haitian Revolution.'
        },
        {
          heading: 'Boukman Dutty: The Spark of Revolution',
          content: 'Boukman Dutty was a Vodou priest and Maroon leader whose actions ignited the Haitian Revolution. On the night of August 14, 1791, Boukman presided over a Vodou ceremony at Bois Caiman (Alligator Woods), where enslaved people gathered to plan an uprising. During the ceremony, a priestess named Cecile Fatiman sacrificed a black pig and distributed its blood to the participants as a sacred oath. Boukman then issued a call to arms: "The god who created the sun which gives us light, who rouses the waves and rules the storm, though hidden in the clouds, he watches us. He sees all that the white man does. The god of the white man inspires him with crime, but our god calls upon us to do good works. Our god who is good to us orders us to revenge our wrongs. He will direct our arms and aid us. Throw away the symbol of the god of the whites who has so often caused us to weep, and listen to the voice of liberty, which speaks in the hearts of us all." Within days, the uprising had swept across the northern plain, burning plantations and killing plantation owners. Boukman was killed in battle in November 1791, but the revolution he started would continue for 13 years and ultimately destroy slavery and colonial rule.'
        },
        {
          heading: 'Maroon Communities: Social and Political Organization',
          content: 'Haitian Maroon communities developed sophisticated social and political structures. They were organized around extended kin networks, with leadership typically vested in elders, warriors, and spiritual leaders (Vodou priests and priestesses). Communities practiced subsistence agriculture, growing cassava, yams, plantains, and vegetables on mountain terraces. They maintained trade relationships with free Black communities and enslaved people on plantations, exchanging food and medicinal plants for tools, gunpowder, and information. Maroon communities were not isolated — they formed networks of communication and mutual aid across the mountains. The Maroons preserved African spiritual traditions, which evolved into Haitian Vodou. They also maintained African musical traditions, with drumming and call-and-response singing serving both ceremonial and communication purposes. Maroon communities served as schools of resistance, where escaped slaves learned guerrilla tactics, African history, and the principles of self-governance.'
        },
        {
          heading: 'From Marronnage to Revolution: The Continuous Struggle',
          content: 'The Haitian Revolution of 1791-1804 was not a sudden eruption but the culmination of two centuries of continuous Maroon resistance. As scholar Jean Casimir argues, marronnage was a "longue-duree" form of resistance — a dialectical response to the plantation system that aimed to deny humanity and sever social ties. When maroons escaped, they reclaimed possession of themselves, their time, their relationships, and their labor. When they mobilized, they challenged and subverted colonial structures. During the revolution, Africa-born rebels and Maroons were central to the mobilizing structures that abolished slavery and overthrew colonialism. Even after independence, the formerly enslaved masses organized themselves into communal social arrangements that prioritized subsistence labor and extended kin networks — the "counter-plantation" system described by Casimir. The Maroon legacy is thus not merely historical but foundational to Haitian national identity and social organization.'
        },
        {
          heading: 'The Nèg Mawon: Symbol of a Nation',
          content: 'The Nèg Mawon (Maroon Man) is one of the most iconic symbols of Haiti. A bronze statue erected in the heart of Port-au-Prince depicts a muscular man blowing a conch shell, a machete in one hand and a broken chain in the other — the image of the escaped slave calling others to freedom. The statue was created by architect Albert Mangones in 1968 and has become synonymous with Haitian independence and resistance. UNESCO recognizes the Nèg Mawon as a monument of universal significance. The conch shell (lambi) was historically used by Maroons as a horn to communicate across mountain valleys — the same function as the Jamaican abeng. The broken chain represents liberation from slavery, while the machete symbolizes both agricultural labor and armed resistance. The Nèg Mawon stands not just for Haitian Maroons but for all people who have resisted oppression, making it a universal symbol of human freedom.'
        }
      ],
      sources: [
        'Wikipedia — Maroons (peer-reviewed)',
        'The Haitian Revolution (thehaitianrevolution.com)',
        'Journal of World-Systems Research — Maroon Movements Against Empire (2022)',
        'Jean Casimir (2020) — "The Haitians: A Decolonial History"',
        'Cedric Robinson (1983) — "Black Marxism"',
        'Sylvia Wynter — Marronnage and Anti-Capitalist Resistance',
        'David Geggus — "The Haitian Revolution: A Documentary History"',
        'Kate Ramsey — "Spirits and the Law: Vodou and Power in Haiti"',
        'Carolyn Fick — "The Making of Haiti"',
        'Laurent Dubois — "Avengers of the New World"'
      ]
    }
  },
  {
    id: 'ht-african',
    name: 'African Ethnic Origins',
    indigenousName: '',
    alternateNames: ['Fon/Dahomey', 'Yoruba/Nago', 'Kongo', 'Igbo', 'Rada', 'Petwo'],
    country: 'Haiti',
    countryCode: 'HT',
    location: 'Island-wide — foundational heritage of the Haitian people',
    coordinates: [-72.5, 18.9],
    population: 'Constitutes the majority of Haiti\'s population (95%+ African descent)',
    language: 'Haitian Creole (Kreyol), French; Fon, Yoruba, and Kongo elements in Vodou ritual',
    languageFamily: 'French Creole / Kwa / Bantu / Yoruboid',
    status: 'Foundational heritage — constitutive element of Haitian national identity',
    history: 'Haiti received more enslaved Africans than any other Caribbean colony — nearly half the laborers on the island\'s sugar plantations came from West and Central Africa. The majority were Congos (Kongo peoples) — historian David Geggus notes upwards of 60% of enslaved Africans in colonial Saint-Domingue were referred to as Congos before the Revolution. Significant populations also came from the Fon/Dahomey peoples (modern Benin), Yoruba (Nago) peoples of Nigeria, and Igbo of southeastern Nigeria. These diverse African traditions merged under French colonialism to create Haitian Vodou — the religion that would inspire the Haitian Revolution. The Vodou spirits (lwa) are organized into "nations" (nanchon) reflecting their African origins: the Rada nation derives from Fon and Yoruba deities, while the Petwo nation reflects Kongo traditions. The Haitian Revolution of 1791-1804, which created the first Black republic, was organized through Vodou ceremonies and led by Africa-born rebels and Maroons.',
    currentIssues: 'Haiti faces severe political, economic, and environmental crises that disproportionately affect the poor majority. The African cultural heritage remains central to Haitian identity, but poverty and instability threaten cultural preservation. Vodou continues to be stigmatized and misunderstood internationally. The reparations movement — France forced Haiti to pay 150 million francs (later reduced to 90 million) as "compensation" for lost "property" (slaves) after independence — continues to demand return of this "independence debt." Contemporary movements seek to strengthen ties with Africa and preserve Vodou traditions.',
    resources: ['https://pluralism.org/vodou-serving-the-spirits', 'https://www.britannica.com/topic/Vodou', 'https://en.wikipedia.org/wiki/Haitian_Vodou'],
    category: 'AfricanIndigenous',
    researchDocument: {
      title: 'African Origins in Haiti: The Foundations of Vodou and Revolution',
      subtitle: 'A Comprehensive Research Document on the African Heritage of the Haitian People',
      lastUpdated: '2025-07-06',
      sections: [
        {
          heading: 'The African Demographics of Saint-Domingue',
          content: 'Colonial Saint-Domingue received more enslaved Africans than any other Caribbean colony. By the late 18th century, the island\'s sugar plantations — the most profitable in the world — were worked by hundreds of thousands of enslaved Africans. Historian David Geggus\'s analysis of French slave trade records reveals that upwards of 60% of enslaved Africans in colonial Saint-Domingue were referred to as "Congos" — people from the Kongo kingdom and surrounding regions of Central Africa. In addition to the Kongo, significant populations came from the Fon and related peoples of Dahomey (modern Benin), the Yoruba (called "Nago" in Haiti) of southwestern Nigeria, the Igbo of southeastern Nigeria, and smaller numbers from the Wolof, Bambara, and other West African peoples. This extraordinary ethnic diversity — forced together under the brutal plantation system — created the conditions for a unique cultural synthesis. Unlike in Jamaica, where the Akan peoples predominated, Haiti\'s African heritage was more evenly distributed among Kongo, Fon, and Yoruba traditions.'
        },
        {
          heading: 'Vodou: The Religion Born from African Survival',
          content: 'Haitian Vodou emerged as a syncretism of West and Central African religions with Roman Catholicism. The word "Vodou" derives from the Fon language of Dahomey, meaning "spirit" or "deity." Vodou is not merely a religion but a complete worldview encompassing philosophy, medicine, justice, and cosmology. Its fundamental principle is that everything is spirit — humans inhabit the visible world, while the unseen world is populated by lwa (spirits), ancestors, and the recently deceased. The lwa (also called mystères, anges, or les invisibles) serve as intermediaries between humans and Bondye, the creator God. There are over 1,000 lwa, organized into "nations" (nanchon) that reflect their African origins. The Rada nation derives primarily from Fon and Yoruba deities — Legba (the gatekeeper), Danbala (the serpent of life), and Ezili Freda (the lwa of love). The Petwo nation reflects Kongo traditions, with more aggressive, fiery spirits like Ogou and Ezili Danto. Vodou temples (ounfò) are run by oungan (priests) and manbo (priestesses), with ceremonies involving drumming, singing, dancing, and spirit possession.'
        },
        {
          heading: 'The Fon/Dahomey Contribution: The Rada Tradition',
          content: 'The Fon and related peoples of Dahomey (modern Benin) made foundational contributions to Haitian Vodou, particularly the Rada tradition. The very name "Vodou" comes from the Fon language. Fon deities who became Haitian lwa include: Legba (the gatekeeper who opens the door between human and spirit worlds, syncretized with St. Peter), Danbala Wedo (the serpent deity of life and wisdom, syncretized with St. Patrick), Ayida Wedo (the rainbow serpent, Danbala\'s partner), and Ezili Freda (the lwa of love and beauty, syncretized with the Virgin Mary). The Rada tradition is characterized by its focus oncool, calm energies and its emphasis on harmony, healing, and social order. Rada ceremonies feature specific drum rhythms (played on the tanbou), call-and-response singing, and the tracing of vèvè — intricate cornmeal drawings on the ground that serve as spiritual "signatures" of individual lwa. The Rada tradition preserves many elements of Fon governance structures, with oungan and manbo serving roles analogous to Fon spiritual leaders.'
        },
        {
          heading: 'The Kongo Contribution: The Petwo Tradition',
          content: 'The Kongo peoples of Central Africa contributed the Petwo (or Petwo) tradition to Haitian Vodou — the fiery, aggressive aspect of the religion that historians increasingly recognize as central to the Haitian Revolution. While the Rada tradition emphasizes harmony and healing, the Petwo tradition channels anger, resistance, and transformative power. Petwo lwa include Ogou (the warrior spirit, syncretized with St. James), Ezili Danto (the fierce mother protector), and the Bawon Samdi (Baron Saturday, guardian of the dead). The Petwo ceremony at Bois Caiman on August 14, 1791, where Boukman Dutty and priestess Cecile Fatiman sacrificed a black pig and called for revolution, was a Petwo ritual. Kongo cosmological concepts that survive in Haitian Vodou include: the dikenga (the Kongo cosmogram, a circle with a cross representing the cycle of life, death, and rebirth), the concept of the soul\'s journey, and the use of paket kongo (sacred bundles containing herbs, stones, and other materials) as spiritual protection. Kongo-derived practices like the makandal (poison charms) and the use of specific drum rhythms distinguish the Petwo tradition.'
        },
        {
          heading: 'The Yoruba/Nago Contribution: Orisha Traditions',
          content: 'The Yoruba peoples of southwestern Nigeria, called "Nago" in Haiti, contributed orisha traditions that merged with Fon and Kongo elements in Haitian Vodou. Yoruba deities who became Haitian lwa include: Shango (the thunder deity, syncretized with St. Barbara), Ogun (the iron warrior, also a major Petwo spirit), Oshun (the river goddess of love), and Yemaya (the ocean mother). The Nago tradition in Haiti preserved Yoruba divination practices, herbal medicine knowledge, and concepts of spiritual balance. The Yoruba emphasis on ancestral veneration (egungun) also influenced Haitian practices of honoring the dead. While Yoruba traditions are most clearly preserved in Cuban Santería, Haitian Vodou contains significant Yoruba elements, particularly in the Rada nation. The Yoruba concept of ashe (spiritual power) finds parallels in Haitian Vodou\'s understanding of spiritual energy. The Nago drumming tradition, with its complex polyrhythms, contributed to Vodou\'s distinctive musical heritage.'
        },
        {
          heading: 'Vodou and the Haitian Revolution',
          content: 'The Haitian Revolution of 1791-1804 was organized through Vodou. The famous Bois Caiman ceremony on August 14, 1791, was a Vodou ritual that launched the revolution. Vodou priest Boukman Dutty and priestess Cecile Fatiman presided over the sacrifice of a black pig, and participants drank its blood as a sacred oath to fight for freedom. Vodou provided the organizational structure for the revolution — oungan and manbo served as community leaders, Vodou ceremonies became planning meetings, and the lwa provided spiritual motivation and guidance. The revolutionary leader François-Dominique Toussaint Louverture, though he later sought to suppress Vodou, initially used its organizational networks. Jean-Jacques Dessalines, who proclaimed independence in 1804, was known to invoke Vodou spirits before battle. The revolution\'s success — the only successful slave revolt in modern history — was thus inseparable from Vodou. As scholar Sylvia Wynter argues, marronnage (escape from slavery) was a "dialectical response to the plantation system," and Vodou was the spiritual framework that made collective resistance possible.'
        },
        {
          heading: 'The Independence Debt and Modern Reparations',
          content: 'In 1825, France sent warships to Haiti and demanded 150 million francs (later reduced to 90 million) as "compensation" for lost "property" — meaning the enslaved people who had freed themselves. Haiti was forced to borrow from French banks at high interest to pay this "independence debt," which was not fully paid off until 1947. Economist Thomas Piketty has calculated that France owes Haiti at least $28 billion in today\'s money for this extortion. The debt crippled Haiti\'s economic development for over a century, preventing investment in infrastructure, education, and healthcare. In 2003, President Jean-Bertrand Aristide formally demanded reparations from France. France responded by supporting the coup that overthrew Aristide in 2004. The reparations movement continues, with scholars, activists, and international organizations documenting the debt\'s devastating impact. The New York Times\' 2022 investigative series "The Ransom" brought renewed international attention to the independence debt and the case for reparations.'
        }
      ],
      sources: [
        'Britannica — Vodou (1998-2024)',
        'Pluralism.org — Vodou: Serving the Spirits',
        'Wikipedia — Haitian Vodou (peer-reviewed)',
        'David Geggus — "The Haitian Revolution: A Documentary History"',
        'Harold Courlander — American anthropologist and Vodou scholar',
        'Patrick Bellegarde-Smith — "Vodou Cosmology Worldview: Haiti The Breached Citadel"',
        'Jean Casimir (2020) — "The Haitians: A Decolonial History"',
        'Cedric Robinson (1983) — "Black Marxism"',
        'Sylvia Wynter — Marronnage and Resistance Theory',
        'Kate Ramsey — "Spirits and the Law: Vodou and Power in Haiti"',
        'Carolyn Fick — "The Making of Haiti"',
        'Laurent Dubois — "Avengers of the New World"',
        'New York Times (2022) — "The Ransom: The Roots of Haiti\'s Crisis"'
      ]
    }
  },
]

// ══════════════════════════════════════════════════════════════
// CARIBBEAN — RESEARCHED 2025-07-06
// ══════════════════════════════════════════════════════════════
export const caribbeanNations: IndigenousNation[] = [
  {
    id: 'cu-taino',
    name: 'Taíno & Ciboney of Cuba',
    indigenousName: 'Cobba / Cubanacan',
    alternateNames: ['Ciboney', 'Siboney', 'Guanahatabey', 'Sub-Taíno'],
    country: 'Cuba',
    countryCode: 'CU',
    location: 'Throughout Cuba — concentrated in eastern mountains (Sierra Maestra)',
    coordinates: [-77.7812, 21.5218],
    population: 'Descendants in eastern Cuba; Panchito Ramírez community and others',
    language: 'Taíno/Ciboney (extinct); Arawakan language family',
    languageFamily: 'Arawakan',
    status: 'Surviving descendants in eastern Cuba; cultural revival active',
    history: 'Cuba was inhabited by at least two distinct Indigenous peoples before 1492: the Guanahatabey (hunter-gatherers in the west), and the Taíno and Ciboney agriculturalists. Columbus arrived in 1492 and the Spanish under Diego Velázquez conquered the island by 1514. The Taíno leader Hatuey, who had fled Hispaniola, organized resistance but was captured and burned at the stake in 1512. Unlike most Caribbean islands, Cuba\'s Indigenous people did not completely disappear. In the eastern mountains near Santiago de Cuba, families of Taíno and Ciboney descent survived through intermarriage in communities like El Caney. Panchito Ramírez, a farmer from the Rojas-Ramírez lineage, has been pressing for recognition of his community\'s Indigenous identity for over 30 years. Archaeologist William Keegan notes that the "extinction" narrative was "prescribed and cemented by cosmopolitan scholars" who never visited the eastern mountains. Cuba\'s Indigenous heritage persists in place names (Havana, Camagüey, Baracoa), food (cassava, corn), and the eastern Cuban tradition of making casabe bread.',
    currentIssues: 'The Cuban government does not officially recognize Indigenous peoples, though cultural preservation efforts exist. The Ranchería community and other eastern mountain communities maintain traditions. Academic research by José Jiménez Santander and others continues to document survival. Cuban cigar-making traces directly to Indigenous tobacco cultivation techniques shown to Europeans.',
    resources: ['https://www.americanindianmagazine.org/story/indigenous-cuba-hidden-plain-sight', 'https://en.wikibooks.org/wiki/Ancient_History/Americas/Ancient_Cuba'],
    category: 'Taíno',
    researchDocument: {
      title: 'The Taíno and Ciboney of Cuba: Hidden in Plain Sight',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Cuba',
      lastUpdated: '2025-07-06',
      sections: [
        {
          heading: 'Pre-Columbian Cuba: Three Indigenous Peoples',
          content: 'Before European contact, Cuba was home to at least three distinct Indigenous groups. The Guanahatabey (also called Ciboney) were the earliest inhabitants — hunter-gatherers who lived in western Cuba and spoke a language unrelated to Arawakan. They were followed by the Ciboney-Taíno (Sub-Taíno), who arrived around 600 CE and practiced limited agriculture. Finally, the Classic Taíno arrived around 1300 CE, bringing fully developed agriculture, pottery, and complex social organization. By 1492, the Taíno and Ciboney together numbered between 16,000 and 200,000 (Bartolomé de las Casas estimated 200,000). The Taíno called the island "Cobba" or "Cubanacan." Archaeological evidence shows human habitation in Cuba dating back to at least 3,000 BCE, making it one of the longest-inhabited islands in the Caribbean.'
        },
        {
          heading: 'Hatuey: The First Hero of Cuban Resistance',
          content: 'Hatuey was a Taíno cacique (chief) who fled Hispaniola to Cuba after witnessing the Spanish atrocities there. He organized the first armed resistance to European colonization in the Americas, warning Cuban Taíno about the Spanish cruelty. In 1511, Diego Velázquez led a Spanish expedition to conquer Cuba. Hatuey\'s forces fought a guerrilla war from the mountains but were eventually overwhelmed by Spanish weapons and dogs. Captured in 1512, Hatuey was tied to a stake and offered a choice: conversion to Christianity and a quick death, or refusal and burning. When asked if he wanted to go to heaven, Hatuey asked if Spaniards went there. Told yes, he replied "Then I do not want to go." He was burned alive, becoming the first martyr of Indigenous resistance in Cuba and a symbol of dignity that inspires Indigenous movements throughout the Americas.'
        },
        {
          heading: 'The Rojas-Ramírez Families: Surviving in the East',
          content: 'Contrary to the widespread narrative of extinction, Indigenous Cuban families survived in the eastern mountains for centuries. The Rojas-Ramírez families of El Caney, near Santiago de Cuba, trace their ancestry to the last wave of Taíno settlement. When the Spanish encomienda system gave way to pueblos of free Indian families, San Luis de los Caneyes (El Caney) became a survival place for these families for three centuries. Spanish governors granted them the names Rojas and Ramírez en masse during baptisms. A Spanish Royal grant of Indian jurisdiction over their community lands was squelched by the colonial audiencia in 1850, but the families remained together, resettling in more remote lands. Panchito Ramírez, a farmer from this lineage, has been pressing for recognition of his community\'s Indigenous identity for over 30 years. As archaeologist William Keegan notes, the "extinction" narrative was written by scholars who "never visited and none of them studied in these mountains."'
        },
        {
          heading: 'Ciboney Culture: The Western Hunter-Gatherers',
          content: 'The Ciboney (or Siboney) of western Cuba represented a distinct cultural tradition that predated the Taíno arrival. Unlike the agricultural Taíno, the Ciboney were primarily hunter-gatherers and fisherfolk who lived in caves and coastal shelters. They developed a unique material culture including shell tools, bone implements, and distinctive pottery. The Ciboney practiced the cohoba ritual — inhaling narcotized tobacco vapors for spiritual purposes — a tradition they shared with the Taíno. Spanish colonization forced Ciboney and Taíno into reservations, including one at Guanabacoa (now a suburb of Havana). The two groups intermarried extensively, creating a mestizo population that the Native Cubans called "Guajiro" ("one of us"). Today, the Ciboney legacy survives in western Cuban place names, fishing techniques, and the continued use of certain medicinal plants known to Ciboney healers.'
        },
        {
          heading: 'Indigenous Legacies in Modern Cuba',
          content: 'Cuba\'s Indigenous heritage pervades the island\'s culture, often unrecognized. The island\'s name derives from Taíno "Cubanacan." Hundreds of place names are of Indigenous origin: Havana (Habana), Camagüey, Baracoa, Guantánamo, Cauto, Toa. Indigenous foods remain staples: cassava (yuca), corn (maíz), sweet potatoes, tobacco, and the casabe bread still made in eastern Cuba. The Cuban cigar traces directly to Taíno tobacco cultivation — the word "cigar" comes from the Mayan "sikar," but the practice of rolling and smoking tobacco leaves was shown to Columbus by Taíno in Cuba. The hammock (from Taíno "hamaca"), canoe ("kanoa"), and barbecue ("barbacoa") are Taíno words that entered global vocabulary. Cuban music incorporates rhythmic patterns with Indigenous roots, and the island\'s traditional medicine preserves knowledge of plants used by Taíno and Ciboney healers.'
        },
        {
          heading: 'The Ranchería and Contemporary Communities',
          content: 'In the mountains near Santiago de Cuba, the community known as La Ranchería was described by Reina, an elder, as "all Indian families" in her childhood — "just in this community we had 30 houses or more. Now we are only 12 houses here. Many moved to the coast and other places looking for better conditions." These communities represent living links to Cuba\'s Indigenous past. The Cuban government does not officially recognize Indigenous peoples, which limits access to protections and resources available to Indigenous communities in other countries. However, cultural preservation efforts continue through academic research, community organizing, and the work of individuals like Panchito Ramírez. The 2017 article in American Indian Magazine titled "Indigenous Cuba: Hidden in Plain Sight" brought international attention to these surviving communities, challenging the extinction narrative that has dominated Cuban historiography.'
        }
      ],
      sources: [
        'American Indian Magazine (2017) — "Indigenous Cuba: Hidden in Plain Sight"',
        'Wikibooks — Ancient History/Americas/Ancient Cuba',
        'Keegan, William — "Lucayan Legacies: Indigenous Lifeways in the Bahamas"',
        'History StackExchange — Ciboney and Guanahatabey timelines',
        'José Jiménez Santander & Lisandra Jimenez Ortega — CITMA Cuba archaeological timeline',
        'Hartmann — Regional historian on Cuban Indigenous survival',
        'Bartolomé de las Casas — Historical population estimates',
        'Granberry, Dr. Julian — Taíno language research on "Bahama" etymology',
        'Grand Bahama Museum — Lucayan Taino history',
        'Smithsonian Magazine (2024) — Bahamas archaeology'
      ]
    }
  },
  {
    id: 'pr-taino',
    name: 'Taíno of Borikén',
    indigenousName: 'Borikén / Borinquen',
    alternateNames: ['Boriqueño', 'Arawak', 'Jíbaro'],
    country: 'Puerto Rico',
    countryCode: 'PR',
    location: 'Throughout Puerto Rico — highest concentrations in central mountainous regions',
    coordinates: [-66.5901, 18.2208],
    population: 'DNA studies show 61% of Puerto Ricans have Taíno mitochondrial DNA; ~30,000+ active in cultural revival',
    language: 'Taíno (extinct, revival efforts); Arawakan language family',
    languageFamily: 'Arawakan',
    status: 'Cultural revival very active — largest Taíno revival movement in the Caribbean',
    history: 'The Taíno called Puerto Rico "Borikén" (Land of the Brave Lord). They arrived around 700 CE from the Orinoco region of South America, displacing earlier Archaic peoples. At European contact, Puerto Rico\'s Taíno lived in organized villages (yucayeques) under caciques, practicing agriculture, fishing, and craft traditions. Columbus arrived on his second voyage in 1493. Juan Ponce de León became governor in 1508 and began systematic colonization. The Taíno rebelled under cacique Agüeybaná II in 1511 — the only large-scale Taíno revolt against Spanish rule. The revolt was crushed, and Agüeybaná II was killed. By 1530, the Taíno population had collapsed from an estimated 30,000-50,000 to fewer than 1,000. However, Taíno DNA survived through intermarriage. A 2003 genetic study by Juan Carlos Martínez Cruzado found that 61% of Puerto Ricans carry Taíno mitochondrial DNA. Today, Puerto Rico has the most vibrant Taíno cultural revival movement in the Caribbean, with organizations like the United Confederation of Taíno People and the Jatibonicu Taíno Tribal Nation.',
    currentIssues: 'No federal recognition as Native American tribes (Puerto Rico\'s colonial status complicates this). However, cultural revival is thriving — annual Taíno gatherings, language reclamation projects, and educational programs. DNA studies continue to document Taíno ancestry. The Jíbaro (mountain farmer) tradition is increasingly recognized as preserving Taíno agricultural practices. Many Puerto Ricans now identify as "Boriqueño" or "Taíno" as a form of cultural reclamation.',
    resources: ['https://nmaahc.si.edu/explore/stories/taino-figure', 'https://teachersinstitute.yale.edu/curriculum/units/1998/3/98.03.04/4'],
    category: 'Taíno',
    researchDocument: {
      title: 'The Taíno of Borikén: The Heart of Caribbean Indigenous Revival',
      subtitle: 'A Comprehensive Research Document on the Indigenous Taíno of Puerto Rico',
      lastUpdated: '2025-07-06',
      sections: [
        {
          heading: 'Borikén: The Land of the Brave Lord',
          content: 'The Taíno called Puerto Rico "Borikén" or "Borinquen," meaning "Land of the Brave Lord" or "Great Land of the Valiant and Noble Lord." They arrived around 700 CE, navigating from the Orinoco River Delta in South America in large dugout canoes called "kanoas." The Taíno were not Puerto Rico\'s first inhabitants — earlier Archaic peoples had arrived from Florida around 2,500 years ago, living as fishermen and hunters. The Taíno quickly displaced or assimilated these earlier groups, establishing agricultural villages (yucayeques) with populations of 1,000-2,000 people. At European contact, an estimated 30,000-50,000 Taíno inhabited the island, organized under caciques including Agüeybaná I ("The Great Sun"), the supreme cacique of the island. The Taíno of Borikén were part of the Classic Taíno culture — the most developed form of Taíno civilization, with sophisticated agriculture, pottery, weaving, and religious practices centered on zemis (sacred idols).'
        },
        {
          heading: 'The Revolt of Agüeybaná II',
          content: 'In 1511, cacique Agüeybaná II ("The Brave") organized the only large-scale, island-wide Taíno revolt against Spanish colonization. After the death of his brother Agüeybaná I, Agüeybaná II realized that peaceful coexistence with the Spanish was impossible. He united the caciques of the island and launched coordinated attacks on Spanish settlements. The revolt was fierce — Taíno warriors killed Spanish soldiers and burned settlements. However, the Spanish had superior weapons and armor, as well as attack dogs trained to kill. Agüeybaná II was killed in battle, and the revolt was crushed. Many surviving Taíno fled to the central mountains, where they intermarried with escaped Africans and Europeans. The revolt, though unsuccessful, demonstrated Taíno courage and resistance, and Agüeybaná II remains a national hero in Puerto Rico — streets, schools, and public buildings bear his name.'
        },
        {
          heading: 'The Jíbaro Connection: Living Taíno Agriculture',
          content: 'The Jíbaro — the traditional mountain farmers of Puerto Rico\'s central highlands — are increasingly recognized as preserving Taíno agricultural practices. The Jíbaro way of life, with its small-scale farming of cassava, yams, plantains, and vegetables on mountain terraces, mirrors Taíno agricultural techniques documented by Spanish chroniclers. Jíbaro housing (the "bohío" style thatched-roof hut) derives from Taíno architecture. The Jíbaro diet, food preparation methods, and use of medicinal plants all show Taíno influence. The Spanish word "Jíbaro" itself likely derives from the Taíno word for "mountain" or "forest people." This connection is significant because it suggests that Taíno culture survived not through dramatic political action but through the quiet persistence of everyday practices — farming, cooking, healing — passed down through generations of rural Puerto Rican families who never stopped being Taíno in the ways that mattered most.'
        },
        {
          heading: 'DNA Evidence: 61% Taíno Ancestry',
          content: 'In 2003, geneticist Juan Carlos Martínez Cruzado of the University of Puerto Rico published a groundbreaking study that changed the understanding of Taíno survival. By analyzing mitochondrial DNA (passed from mother to child), Martínez Cruzado found that 61% of Puerto Ricans carry Taíno genetic markers. This means that the majority of Puerto Ricans have at least one direct maternal ancestor who was Taíno — a remarkable rate of Indigenous survival given the historical narrative of extinction. The study also revealed that Taíno DNA was most prevalent in the central mountainous regions — precisely where escaped Taíno would have fled and where the Jíbaro tradition survived. Follow-up studies have confirmed these findings and added nuance, showing that the average Puerto Rican has approximately 15-20% Indigenous ancestry, with significant variation across regions and families. This genetic evidence has been transformative for the Taíno cultural revival movement, providing scientific validation for what many Puerto Rican families already knew through oral tradition.'
        },
        {
          heading: 'The Taíno Cultural Revival Movement',
          content: 'Puerto Rico has the most vibrant and organized Taíno cultural revival movement in the Caribbean. Organizations include: the United Confederation of Taíno People, which represents Taíno communities across the Caribbean; the Jatibonicu Taíno Tribal Nation, which claims direct descent from the island\'s original inhabitants; the Taíno Nation of Puerto Rico; and numerous local groups throughout the island. These organizations host annual gatherings (called "areytos," after the traditional Taíno ceremonies), conduct language reclamation workshops, teach traditional crafts (pottery, weaving, zemi carving), and advocate for official recognition. The Smithsonian National Museum of the American Indian has collaborated with Puerto Rican Taíno groups on exhibitions. The Puerto Rican government has acknowledged Taíno heritage in educational curricula, though full recognition comparable to US Native American tribes remains elusive due to Puerto Rico\'s colonial political status.'
        },
        {
          heading: 'Place Names and Cultural Survival',
          content: 'Taíno heritage pervades Puerto Rican culture in countless ways. The island\'s nickname "Borinquen" comes from Taíno "Borikén." Hundreds of place names are of Taíno origin: Caguas (from cacique Caguax), Mayagüez, Arecibo, Guánica, Cayey, Coamo, Utuado, Loíza. Taíno words in everyday use include: huracán (hurricane), hamaca (hammock), kanoa (canoe), barbacoa (barbecue), mahíz (corn), and names of foods like ají (pepper) and guanábana (soursop). Taíno religious concepts survive in Puerto Rican Espiritismo and folk Catholicism. The island\'s traditional medicine (yerbería) preserves Taíno knowledge of medicinal plants. Puerto Rican art, music (particularly bomba and plena), and dance incorporate Indigenous elements alongside African and European influences. The Taíno legacy is not a distant memory but a living, breathing presence in Puerto Rican identity.'
        }
      ],
      sources: [
        'National Museum of African American History & Culture — Taíno Figure (2023)',
        'Yale Teachers Institute — "The Taínos of Puerto Rico: Rediscovering Borinquen" (1998)',
        'Martínez Cruzado, J.C. (2003) — University of Puerto Rico genetic study',
        'Wikipedia — Taíno (peer-reviewed)',
        'Smithsonian National Museum of the American Indian — Taíno exhibitions',
        'United Confederation of Taíno People',
        'Jatibonicu Taíno Tribal Nation',
        'National Museum of American History — Puerto Rican devotional objects'
      ]
    }
  },
  {
    id: 'dr-taino',
    name: 'Taíno of Quisqueya',
    indigenousName: 'Quisqueya / Kiskeya',
    alternateNames: ['Indio', 'Arawak', 'Enriquillo\'s People'],
    country: 'Dominican Republic',
    countryCode: 'DO',
    location: 'Throughout Dominican Republic — cultural practices strongest in rural communities',
    coordinates: [-70.1627, 18.7357],
    population: 'Majority of rural Dominicans retain Taíno cultural elements; ~200,000+ self-identify',
    language: 'Taíno (extinct); Arawakan language family',
    languageFamily: 'Arawakan',
    status: 'Cultural survival extensive; self-identification as "Indio" persists',
    history: 'The Taíno called the island Quisqueya ("mother of all lands"). At contact, an estimated 1 million Taíno lived on Hispaniola. The Dominican Republic occupies the eastern two-thirds of the island. Enriquillo, a Taíno cacique, led the longest Indigenous resistance campaign in the Caribbean from 1519 to 1533, conducting hit-and-run raids against Spanish settlements from the Bahoruco Mountains. He eventually negotiated a peace treaty with the Spanish — one of the few successful Indigenous resistance leaders to do so. Over centuries, Spanish colonists intermarried with Taíno women; 1514 census records show 40% of Spanish men had Taíno wives. This mixing created a mestizo population that retained significant Taíno cultural elements. Today, many rural Dominicans self-identify as "Indio" — a term that refers to Indigenous ancestry and encompasses various skin-tone categories from "Indio Claro" (light) to "Indio Oscuro" (dark). This represents one of the most extensive cases of Indigenous cultural survival in the Caribbean.',
    currentIssues: 'The Taíno heritage of the Dominican Republic is politically contested. The narrative of extinction has been used to distance Dominicans from their African heritage and from Haitians. However, Indigenous communities and scholars are challenging this, documenting extensive Taíno cultural survival in rural areas. The Minority Rights Group has noted that Taíno history has been eliminated from educational textbooks. Activists are working for official recognition and the inclusion of Indigenous history in national curriculum. The legacy of anti-Haitianismo complicates discussions of Indigenous identity.',
    resources: ['https://minorityrights.org/country/dominican-republic/', 'https://lagaleriamag.com/quisqueyana-identifying-with-my-indigenous-roots/'],
    category: 'Taíno',
    researchDocument: {
      title: 'The Taíno of Quisqueya: Enriquillo and the Indio Identity',
      subtitle: 'A Comprehensive Research Document on the Indigenous Taíno of the Dominican Republic',
      lastUpdated: '2025-07-06',
      sections: [
        {
          heading: 'Quisqueya: Mother of All Lands',
          content: 'The Taíno called the island of Hispaniola "Quisqueya" or "Kiskeya," meaning "mother of all lands." At the time of Columbus\' arrival in 1492, an estimated 1 million Taíno inhabited the island — the densest Indigenous population in the Caribbean. The Taíno of Quisqueya were organized into five caciquats (kingdoms), each governed by a cacique. The most celebrated was Anacaona of Xaragua, a cacica (female chief) renowned for her beauty, poetry, and hospitality. The Dominican Republic occupies the eastern two-thirds of Hispaniola, the part that was first and most intensively colonized by Spain. Santo Domingo, founded in 1496, was the first permanent European settlement in the Americas and became the base for Spanish conquest of the Caribbean and mainland.'
        },
        {
          heading: 'Enriquillo: The Longest Resistance',
          content: 'Enriquillo (c. 1498-1535) was a Taíno cacique who led the longest Indigenous resistance campaign in Caribbean history. Born into the cacique family of Jaragua, Enriquillo was educated by Spanish friars and initially collaborated with the colonizers. However, after Spanish abuses against his people — including the murder of his wife by a Spaniard — Enriquillo fled to the Bahoruco Mountains in 1519 and began a guerrilla war that lasted 14 years. From his mountain stronghold, he conducted hit-and-run raids against Spanish settlements, freeing enslaved Taíno and attacking plantations. The Spanish sent repeated expeditions against him, all of which failed. In 1533, Emperor Charles V of Spain personally intervened, offering Enriquillo a peace treaty that granted his people freedom, land, and self-governance. Enriquillo accepted and lived out his days as a free man — one of the few Indigenous resistance leaders in the Americas to negotiate a successful peace. His legacy as a symbol of dignity and resistance endures in Dominican culture.'
        },
        {
          heading: 'The "Indio" Identity: Taíno Survival in Dominican Culture',
          content: 'The term "Indio" (Indian) in the Dominican Republic represents one of the most complex and contested aspects of Caribbean identity. Unlike in most of the Americas, where "Indio" fell out of use as Indigenous populations declined, in the Dominican Republic it became a primary category of self-identification. Census records and popular discourse use "Indio" to describe the majority of Dominicans — particularly those of mixed Indigenous, European, and African ancestry with lighter skin tones. Scholar Gabriel Haslip-Viera has documented how this Indio identity was promoted from the late 19th century as part of an indigenismo movement that sought to distance Dominicans from their African heritage and from Haitians. The term encompasses various categories: "Indio Claro" (light), "Indio Lavado" (medium), and "Indio Oscuro" (dark). While some scholars critique this as anti-Black colorism, others argue that it genuinely reflects the extensive Indigenous ancestry of the Dominican population. Rural Dominicans retain Taíno cultural elements including agricultural practices, food preparation, fishing techniques, medicinal plant knowledge, architecture, oral history, and religious beliefs.'
        },
        {
          heading: 'Taíno Cultural Survival in Rural Dominican Republic',
          content: 'Contemporary rural Dominicans retain extensive Taíno cultural elements, even though such traits may be considered "backward" in urban areas. These include: linguistic features — Taíno words persist in Dominican Spanish (conuco for small farm, batey for village square, mabí for a traditional drink); agricultural practices — the conuco (small farm) system mirrors Taíno agriculture, with yuca, sweet potatoes, and corn as staples; food ways — casabe bread, mabí, and other traditional foods derive from Taíno cuisine; fishing practices — techniques for catching fish and seafood using traps and nets passed down from Taíno; medicine — knowledge of medicinal plants used by traditional healers (curanderos); architecture — the bohío (thatched hut) style survives in rural areas; oral history — stories and legends passed down through generations; and religious views — folk Catholicism and Espiritismo incorporate Taíno spiritual concepts. Some families and individuals in rural communities explicitly identify as Taíno, maintaining what they describe as ancestral practices.'
        },
        {
          heading: 'The Contested Politics of Indigenous Identity',
          content: 'Taíno heritage in the Dominican Republic is deeply politicized. The narrative of Taíno extinction, established by Spanish colonial documents as early as 1550, was reinforced by 19th-century indigenismo that celebrated an idealized Indigenous past while simultaneously erasing living Indigenous people. The Dominican educational system has eliminated Taíno history from textbooks, and dominant scholarship continues to assert extinction despite extensive evidence of survival. This erasure serves political purposes: it allows Dominicans to claim Indigenous heritage without acknowledging ongoing Indigenous rights, and it distances Dominicans from their African heritage and from Haitians — a key element of anti-Haitianismo. Indigenous activists are challenging this erasure, demanding recognition, land rights, and inclusion in the national curriculum. The Minority Rights Group has documented that "Taíno people claim that their culture and ancestral practices survive to this day due to intermarriage with other indigenous groups." The struggle for Taíno recognition in the Dominican Republic is thus inseparable from broader struggles against anti-Black racism, anti-Haitian discrimination, and colonial historiography.'
        }
      ],
      sources: [
        'Minority Rights Group (2024) — Dominican Republic Country Report',
        'La Galería Magazine — "Quisqueyana: Identifying With My Indigenous Roots" (2015)',
        'Wikipedia — Taíno (peer-reviewed)',
        'Haslip-Viera, Gabriel & Alcántara Almánzar, J. — Dominican indigenismo studies',
        'Frank Moya Pons — Dominican historian on Spanish-Taíno intermarriage',
        'Playagrandebeachclub.com — Dominican Republic Indigenous history',
        'Smithsonian NMAAHC — Taíno Figure exhibition',
        'Ernesto Sagas — "A Case of Mistaken Identity: Antihaitianismo in Dominican culture"'
      ]
    }
  },
  {
    id: 'bs-lucayan',
    name: 'Lucayan Taíno',
    indigenousName: 'Lukku-Cairi',
    alternateNames: ['Bahama Taíno', 'Island People', 'Arawak'],
    country: 'Bahamas',
    countryCode: 'BS',
    location: 'Throughout the Bahamian archipelago — 19 largest islands and nearby cays',
    coordinates: [-77.3963, 25.0343],
    population: 'Extinct as distinct population by 1530; DNA may survive through intermarriage',
    language: 'Lucayan/Taíno (extinct); Arawakan language family',
    languageFamily: 'Arawakan',
    status: 'Extinct as distinct population — archaeological heritage preserved',
    history: 'The Lucayans (Lukku-Cairi, "people of the islands") were a branch of the Taíno who settled the Bahamian archipelago between 500-800 CE, expanding from Hispaniola and Cuba. They were the first Indigenous people encountered by Columbus when he landed on Guanahani (San Salvador) on October 12, 1492. The Lucayans had developed a distinctive maritime culture, adapted to the island environment. Unlike their Taíno relatives in the Greater Antilles, the Lucayans lived in smaller villages and relied more heavily on fishing, conch harvesting, and maritime trade. Their pottery (called Palmetto Ware) was distinct from the pottery of Cuba and Hispaniola. The Spanish, under the encomienda system, enslaved the Lucayans and shipped them to work in mines and plantations on Hispaniola and Cuba. Within 40 years of contact, the entire Lucayan population — estimated at 40,000 — had been effectively wiped out through enslavement, disease, and overwork. By 1530, the Bahamas were uninhabited.',
    currentIssues: 'The Lucayans are extinct as a distinct population, but their archaeological heritage is being preserved. Recent excavations have uncovered important sites, including the Coralie site on Grand Turk (1,100-1,400 years old). The Bahamas National Trust manages archaeological sites. The word "Bahamas" itself derives from the Taíno name for Grand Bahama — "Bahama" meant "large upper midland." Lucayan place names persist throughout the archipelago. The story of the Lucayans serves as a stark reminder of the speed and brutality of Indigenous genocide in the Caribbean.',
    resources: ['https://www.smithsonianmag.com/history/how-archaeologists-are-unearthing-the-secrets-of-the-bahamas-first-inhabitants-180983548/', 'https://www.tcmuseum.org/culture-history/lucayans/'],
    category: 'Taíno',
    researchDocument: {
      title: 'The Lucayans: The First People Columbus Met',
      subtitle: 'A Comprehensive Research Document on the Lucayan Taíno of the Bahamas',
      lastUpdated: '2025-07-06',
      sections: [
        {
          heading: 'Origins: From Hispaniola to the Bahamas',
          content: 'The Lucayans were a branch of the Taíno people who settled the Bahamian archipelago between 500 and 800 CE. Archaeologist William Keegan has traced their migration routes: from Hispaniola to the Caicos Islands, then to Great Inagua (the closest Bahamian island to Hispaniola, just 56 miles away), and from there gradually northward throughout the archipelago. The settlement process took approximately 800 years (c. 700 – c. 1500), with the Lucayans eventually reaching a population of about 40,000 spread across the 19 largest islands. The Lucayans called themselves "Lukku-Cairi" — "people of the islands" — distinguishing themselves from their Taíno relatives in the Greater Antilles. They spoke a dialect of the Taíno language and maintained trade relationships with Cuba and Hispaniola, traveling in large dugout canoes across open water.'
        },
        {
          heading: 'A Maritime Culture: Life in the Islands',
          content: 'The Lucayans developed a distinctive maritime culture adapted to the Bahamian environment. Unlike the Taíno of Hispaniola, who lived in large agricultural villages, the Lucayans lived in smaller settlements and relied heavily on the sea. They were expert divers, swimming to depths of 60 feet or more to harvest conch, lobster, and fish. Columbus\'s chronicler Bartolomé de las Casas described Lucayan divers who could hold their breath for extraordinary lengths of time. The Lucayans developed Palmetto Ware pottery — distinctive shell-tempered ceramics unique to the Bahamas. They built canoes from large pine trees, some capable of carrying 50-100 people. Their houses (bohíos) were smaller than those of the Greater Antilles Taíno, reflecting the more dispersed settlement pattern. The Lucayans practiced agriculture on a smaller scale, growing cassava, maize, and sweet potatoes in island soils. They were known for their gentle nature — Columbus described them as "generous beyond belief" and noted that they would give everything they had to visitors.'
        },
        {
          heading: 'Columbus and the First Contact',
          content: 'On October 12, 1492, Christopher Columbus landed on Guanahani — an island in the Bahamas now believed to be San Salvador (though the exact island is debated). The Lucayans who greeted him were the first Indigenous people encountered by Europeans in the Americas. Columbus described them in his log: "They should be good servants and intelligent, for I observed that they quickly took in what was said to them, and I believe that they would easily be made Christians, as it appeared to me that they had no religion." He noted their physical appearance — olive skin, broad foreheads (the result of deliberate cranial modification, a Taíno beauty practice), and body paint in red, black, and white. Columbus took several Lucayans captive to serve as interpreters, including a young man he named Diego Colón. The first peaceful encounter between Europeans and Indigenous Americans would prove tragically deceptive — within decades, the entire Lucayan population would be destroyed.'
        },
        {
          heading: 'The Genocide: 40,000 to Zero in 40 Years',
          content: 'The destruction of the Lucayan people was one of the fastest genocides in human history. Under the Spanish encomienda system, Lucayans were enslaved and shipped to work in gold mines on Hispaniola and Cuba. The Bahamas themselves had no gold, so the Spanish saw the islands only as a source of slave labor. Spanish slaver Pedro de Córdoba wrote in 1512: "These islands are now deserted and without people." By 1530, just 38 years after first contact, the entire Lucayan population — estimated at 40,000 — had been effectively eliminated through a combination of enslavement, disease, and overwork. The Bahamas became uninhabited, remaining so until British colonization in the 17th century. The speed of this genocide was partly due to the Lucayans\' maritime nature — their skill as canoeists made them valuable as pearl divers and fishermen, but it also made them easy to capture and transport. The Bahamas represent the most complete example of Indigenous extinction in the Caribbean — a fate that the Taíno of Hispaniola, Cuba, and Puerto Rico narrowly escaped through resistance and retreat to remote regions.'
        },
        {
          heading: 'Archaeological Rediscovery and Legacy',
          content: 'In recent decades, archaeologists have rediscovered the rich material culture of the Lucayans. Important sites include: the Coralie site on Grand Turk (1,100-1,400 years old, the oldest known in the Turks and Caicos); the middens (shell heaps) at numerous locations throughout the Bahamas; cave sites containing Lucayan artifacts and rock art; and underwater archaeological sites revealing Lucayan maritime technology. The Bahamas National Trust manages many of these sites. The word "Bahamas" itself is of Indigenous origin — "Bahama" was the Lucayan name for Grand Bahama, meaning "large upper midland" according to Taíno language scholar Dr. Julian Granberry. Other Taíno words that entered English through Lucayan contact include: iguana, potato, barbecue, tobacco, cay, guava, canoe, and hurricane. The Lucayan legacy, though their people are gone, persists in the language, place names, and cultural memory of the Caribbean.'
        }
      ],
      sources: [
        'Smithsonian Magazine (2024) — "How Archaeologists Are Unearthing the Secrets of the Bahamas\' First Inhabitants"',
        'Ostapkowicz, Joanna — "Lucayan Legacies: Indigenous Lifeways in the Bahamas" (University of Oxford)',
        'Turks and Caicos Museum — Lucayans and Tainos in the Turks and Caicos',
        'The Bahamas National Trust',
        'Grand Bahama Museum — The Lucayan Taino',
        'Wikipedia — Lucayan people (peer-reviewed)',
        'Granberry, Dr. Julian — Taíno language research',
        'Bartolomé de las Casas — First-hand accounts of Lucayan contact',
        'Keegan, William — Archaeological migration route studies',
        'Craton, Michael — Bahamian historical studies'
      ]
    }
  },
  {
    id: 'tt-firstpeoples',
    name: 'First Peoples of Trinidad & Tobago',
    indigenousName: 'Kalinago / Lokono',
    alternateNames: ['Carib', 'Arawak', 'Nepoya', 'Santa Rosa Community', 'Warao'],
    country: 'Trinidad & Tobago',
    countryCode: 'TT',
    location: 'Trinidad and Tobago — Santa Rosa First Peoples Community in Arima, Trinidad',
    coordinates: [-61.2225, 10.6918],
    population: '~35,000-40,000 Indigenous people; Santa Rosa Community ~200 active members',
    language: 'Cariban, Arawakan (extinct locally); English, Trinidadian Creole',
    languageFamily: 'Cariban / Arawakan',
    status: 'Recognized by government; Santa Rosa First Peoples Community active',
    history: 'Trinidad was the gateway to the Caribbean — the closest island to South America, separated by just 7-8 miles at its closest point. Indigenous peoples have inhabited Trinidad for at least 6,000 years, with an estimated population of 40,000 at Spanish settlement in 1592. The island was home to multiple groups: the Arawak/Lokono (including Nepoya and Suppoya subgroups), the Carib/Kalinago (including Yao and Galibi), the Warao from the Orinoco Delta, and smaller groups like the Chaguanes and Shebayo. Columbus arrived in 1498, and the Spanish established the encomienda system, forcing Indigenous peoples into labor. By 1797, when Trinidad was ceded to the British, the Indigenous population had been drastically reduced through disease, displacement, and assimilation. However, the Santa Rosa First Peoples Community in Arima — descendants of the Carib people — has survived and is today recognized by the Trinidad and Tobago government. They host the annual Santa Rosa Festival and work to preserve Indigenous culture through education, crafts, and advocacy.',
    currentIssues: 'Land rights remain a pressing issue — many Indigenous communities struggle for recognition of traditional territories. Cultural erosion due to globalization and modernization. Socio-economic marginalization — Indigenous peoples face higher rates of poverty and limited access to education and healthcare. The Warao people continue to migrate from Venezuela due to political and economic crisis. The Santa Rosa First Peoples Community actively works for cultural preservation, land rights, and greater inclusion in the national narrative.',
    resources: ['https://www.nalis.gov.tt/resources/tt-content-guide/first-peoples/', 'https://www.audaciousevolution.com/post/the-indigenous-people-of-trinidad-and-tobago-a-comprehensive-overview'],
    category: 'Carib/Arawak',
    researchDocument: {
      title: 'The First Peoples of Trinidad & Tobago: Gateway to the Caribbean',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Trinidad & Tobago',
      lastUpdated: '2025-07-06',
      sections: [
        {
          heading: 'The Gateway: 6,000 Years of Indigenous History',
          content: 'Trinidad holds a unique place in Caribbean Indigenous history as the "gateway to the Caribbean" — the closest island to South America, separated by just 7-8 miles at its closest point. Archaeological evidence shows human habitation for at least 6,000 years, with the population estimated at 40,000 at the time of Spanish settlement in 1592. Because of its proximity to the mainland, Trinidad received multiple waves of Indigenous migration and was home to a more diverse Indigenous population than most Caribbean islands. The island was a transit point in the Caribbean network of Amerindian trade and exchange, connecting island communities with the Orinoco Delta and the South American mainland. This geographical position made Trinidad both a cultural crossroads and a target for European colonization.'
        },
        {
          heading: 'The Arawak/Lokono: Agricultural Pioneers',
          content: 'The Arawak (also called Lokono on the mainland) were among the earliest inhabitants of Trinidad. They originated from the Orinoco River Delta and formed agrarian societies based on cassava, maize, and sweet potato cultivation. In Trinidad, Arawak subgroups included the Nepoya and Suppoya, who were skilled farmers living in organized communities. The Nepoya were particularly prominent — they actively resisted Spanish rule from their base in the Arima district, limiting Spanish attempts to control northern Trinidad. The most famous Nepoya leader was Hyarima, a war chief who continuously harassed Spanish settlements. The Arawak legacy in Trinidad includes numerous place names: Arima (from the Arawak word for water), Arouca, Tacarigua, Couva, Mucurapo, Chaguanas, and Mayaro. Arawak agricultural techniques — particularly cassava cultivation and the making of cassava bread (casabe) — survived and became staples of Trinidadian cuisine.'
        },
        {
          heading: 'The Carib/Kalinago: Warriors of the Southern Caribbean',
          content: 'The Carib (Kalinago, Karina, or Kalipuna) were another significant group in Trinidad\'s Indigenous history. Originating from the South American mainland, they were seafarers and warriors who expanded throughout the Lesser Antilles. In Trinidad, Carib subgroups included the Yao (expert hunters and fishermen) and the Galibi (predominantly in Tobago, known for their defensive warrior culture). The Carib have been historically misunderstood — European chroniclers depicted them as "fierce cannibals" to justify colonization, but modern scholarship has challenged this narrative. The Carib were sophisticated navigators, traders, and diplomats who maintained complex relationships with both Arawak neighbors and European colonizers. The very name "Caribbean" derives from "Carib," a testament to their historical significance. In Trinidad, Carib cultural elements survive in traditional fishing techniques, craft traditions, and the annual Santa Rosa Festival.'
        },
        {
          heading: 'Hyarima: The Arima Resistance',
          content: 'Hyarima was a Nepoya (Arawak) war chief who led the most effective Indigenous resistance to Spanish colonization in Trinidad. Based in the Arima district — which was effectively Indian Territory for most of the 16th and 17th centuries — Hyarima organized continuous attacks on Spanish settlements from his mountain strongholds. His resistance was so effective that it "effectively limited Spanish attempts to control and settle northern Trinidad," according to historian Jean Patricia Elie. The Spanish made repeated expeditions against Hyarima but were never able to defeat him. His resistance delayed Spanish consolidation of control over Trinidad for decades, preserving Indigenous autonomy in the northern and central regions. Hyarima remains a symbol of Indigenous resistance in Trinidad, and the town of Arima — where the Santa Rosa First Peoples Community is based — honors his legacy.'
        },
        {
          heading: 'The Santa Rosa First Peoples Community',
          content: 'The Santa Rosa First Peoples Community in Arima, Trinidad, represents the descendants of the Carib people who survived colonization through intermarriage, retreat to remote areas, and cultural adaptation. The community takes its name from the Santa Rosa Festival, held annually to celebrate Carib heritage with traditional music, dance, and rituals. The community engages in educational programs, craft workshops, and advocacy for Indigenous rights. They have been recognized by the Trinidad and Tobago government and work with international Indigenous organizations. The Santa Rosa Festival has become an important event for Indigenous cultural preservation in the Caribbean, attracting visitors from across the region and drawing attention to the ongoing struggles of Caribbean Indigenous peoples for recognition, land rights, and cultural survival.'
        },
        {
          heading: 'Indigenous Legacies in Modern Trinidad & Tobago',
          content: 'The Indigenous heritage of Trinidad and Tobago pervades the islands\' culture. Place names of Indigenous origin include: Caroni and Oropouche (rivers), Tamana and Aripo (mountains), Arima, Paria, Arouca, Caura, Tunapuna, Tacarigua, Couva, Mucurapo, Chaguanas, Carapichaima, Mayaro, Guayaguayare. Indigenous foods remain central to Trinidadian cuisine: cassava bread (casabe), pepperpot (a traditional stew), and corn-based dishes. Indigenous drumming patterns influenced Trinidadian musical genres. The Warao people from Venezuela continue to migrate to Trinidad, particularly to the Icacos area in the south, maintaining an ongoing Indigenous presence. The First Peoples of Trinidad and Tobago, through organizations like the Santa Rosa Community, continue to advocate for recognition, land rights, and the preservation of their ancestral heritage in the face of modernization and globalization.'
        }
      ],
      sources: [
        'National Library and Information System Authority (NALIS) — First Peoples of Trinidad and Tobago',
        'Audacious Evolution — "The Indigenous People of Trinidad and Tobago" (2024)',
        'Elie, Jean Patricia — "A Short History of Santa Rosa De Arima"',
        'Wikipedia — Kalinago, Arawak, Warao (peer-reviewed)',
        'Smithsonian Magazine — Caribbean Indigenous history',
        'Keegan, William — Archaeological studies on Caribbean migration',
        'Craton, Michael — Bahamian and Caribbean historical studies'
      ]
    }
  },
  {
    id: 'ag-kalinago',
    name: 'Kalinago of Antigua & Barbuda',
    indigenousName: 'Wadadli',
    alternateNames: ['Island Carib', 'Karina', 'Wadadli'],
    country: 'Antigua & Barbuda',
    countryCode: 'AG',
    location: 'Antigua and Barbuda islands — Wadadli (Antigua) and Wa\'omoni (Barbuda)',
    coordinates: [-61.8, 17.1],
    population: 'No full-blooded descendants; cultural legacy persists in place names',
    language: 'Kalinago (Island Carib) — extinct; Arawakan/Cariban mixed language',
    languageFamily: 'Arawakan/Cariban',
    status: 'Extinct as distinct population; archaeological heritage preserved',
    history: 'The Kalinago (Island Carib) called Antigua \'Wadadli\' — meaning \'our own.\' At European contact in 1493, the islands were inhabited by Kalinago peoples who had migrated from South America. Columbus named Antigua after the Church of Santa Maria la Antigua in Seville. The Kalinago were skilled navigators and fierce defenders of their territory. English colonization began in 1632 under Thomas Warner, who established the first permanent English settlement in the Caribbean. The Kalinago resisted colonization but were ultimately displaced through warfare and disease. By the early 18th century, the Indigenous population had been effectively eliminated. The English brought enslaved Africans to work sugar plantations, and Antigua became one of Britain\'s most profitable colonies. The Kalinago legacy survives in the island\'s name (Wadadli remains a popular nickname) and in archaeological sites.',
    currentIssues: 'No living Indigenous community; archaeological heritage is being documented and preserved. The Museum of Antigua and Barbuda contains Kalinago artifacts. The government has recognized the importance of Indigenous heritage preservation. Tourism development threatens some archaeological sites.',
    resources: [
      'https://www.antiguamuseums.org/',
      'https://www.nationalarchives.gov.uk/caribbean-history/'
    ],
    category: 'Kalinago',
    researchDocument: {
      title: 'Wadadli: The Island of Our Own',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Antigua & Barbuda',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Wadadli: The Island of Our Own',
          content: 'The Kalinago called Antigua \'Wadadli,\' meaning \'our own\' — a name that has survived centuries of colonization and is still used affectionately today. The island of Barbuda was called \'Wa\'omoni.\' These names reflect the deep connection the Kalinago felt to these islands. Antigua\'s location in the Leeward Islands made it a strategic point in the Caribbean, and its relatively flat terrain (unusual for the volcanic Caribbean) made it attractive for European colonization. The Kalinago had established settlements, cultivated cassava and corn, and developed fishing techniques suited to the island\'s reef systems.'
        },
        {
          heading: 'English Colonization and Kalinago Resistance',
          content: 'In 1632, Thomas Warner led English settlers from St. Kitts to establish a colony on Antigua. This was the first permanent English settlement in the Caribbean. The Kalinago resisted the English incursion fiercely. Warner\'s colony initially consisted of fewer than 100 settlers who survived through trade with the Kalinago. However, as more settlers arrived and began clearing land for tobacco and sugar plantations, conflict became inevitable. The Kalinago attacked settlements and killed colonists, but European diseases (smallpox, measles) and warfare gradually reduced their numbers. By 1666, the Kalinago population had been effectively eliminated from Antigua through a combination of warfare, displacement to other islands, and disease.'
        },
        {
          heading: 'The Sugar Plantation Era',
          content: 'After the Kalinago were displaced, Antigua was transformed into a sugar plantation economy. The English imported enslaved Africans to work the plantations, and Antigua became one of the most profitable British colonies in the Caribbean. By 1736, the enslaved population outnumbered white settlers by more than 10 to 1. A major slave uprising was planned for that year but was discovered before it could be executed — the resulting executions and repression were among the most brutal in Caribbean history. Slavery was abolished in 1834, but plantation agriculture continued. The legacy of this system profoundly shaped Antiguan society, economics, and demographics.'
        },
        {
          heading: 'Archaeological Heritage and Modern Recognition',
          content: 'Archaeological research has revealed extensive Kalinago settlement sites on both Antigua and Barbuda. The Museum of Antigua and Barbuda in St. John\'s houses a collection of Kalinago artifacts including pottery, stone tools, and shell ornaments. Recent excavations have uncovered village sites, middens (shell heaps), and burial grounds. The government\'s National Parks Authority manages several archaeological sites. While no living Kalinago community survives in Antigua and Barbuda, the recognition of Indigenous heritage has grown, with educational programs and cultural events acknowledging the island\'s first inhabitants.'
        }
      ],
      sources: [
        'Museum of Antigua and Barbuda — Archaeological Collections',
        'National Archives UK — Caribbean History: Antigua',
        'Wikipedia — Antigua and Barbuda (peer-reviewed)',
        'Wikipedia — Island Caribs (peer-reviewed)',
        'Honychurch, L. — The Caribs — Dominican historian'
      ]
    }
  },
  {
    id: 'dm-kalinago',
    name: 'Kalinago Territory of Dominica',
    indigenousName: 'Waitukubuli',
    alternateNames: ['Island Carib', 'Karina', 'Carib Territory'],
    country: 'Dominica',
    countryCode: 'DM',
    location: 'Eastern coast of Dominica — 3,700-acre Carib Territory (Kalinago Territory)',
    coordinates: [-61.4, 15.4],
    population: '~3,000 Kalinago — largest surviving Indigenous population in the Eastern Caribbean',
    language: 'Kalinago (Island Carib) — only a few words survive; English dominant',
    languageFamily: 'Arawakan/Cariban',
    status: 'Recognized territory since 1903 — the last Kalinago stronghold in the Caribbean',
    history: 'The Kalinago called Dominica \'Waitukubuli\' — \'tall is her body\' — referring to the island\'s mountainous terrain. Because of its rugged interior, Dominica was the last Caribbean island to be colonized. The Kalinago used Dominica as a stronghold from which to resist European incursion. When European powers agreed to leave Dominica to the Caribs by treaty in the 18th century, it became a refuge for Indigenous peoples displaced from other islands. The 3,700-acre Carib Territory was established in 1903 by British colonial authorities. Despite land loss and cultural suppression, the Kalinago of Dominica have maintained their identity. The territory is governed by a Carib Council elected by Kalinago residents.',
    currentIssues: 'Economic challenges within the territory — limited employment opportunities. Land rights remain contentious, with ongoing disputes over territory boundaries. The Kalinago Barana Auté (model village) serves as a cultural center and tourist attraction. Chief Lorenzo Sanford has led efforts to establish a Kalinago-led governance structure. Climate change threatens coastal communities with rising seas and more intense hurricanes. The 2017 destruction of the cultural center by Hurricane Maria was a major setback.',
    resources: [
      'https://www.discoverdominica.com/en/about-dominica/kalinago-territory',
      'https://www.kalinagobaranaaute.com/'
    ],
    category: 'Kalinago',
    researchDocument: {
      title: 'Waitukubuli: The Tall Island',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Dominica',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Waitukubuli: The Tall Island',
          content: 'The Kalinago called Dominica \'Waitukubuli,\' meaning \'tall is her body\' — an apt description of the island\'s dramatic volcanic peaks, dense rainforests, and rugged terrain. This mountainous landscape proved to be Dominica\'s greatest defense against European colonization. While other Caribbean islands fell quickly to Spanish, English, and French conquest, Dominica\'s interior remained impenetrable to European forces. The Kalinago used this terrain to their advantage, maintaining settlements in coastal areas while retreating to the mountains when threatened.'
        },
        {
          heading: 'The Last Carib Stronghold',
          content: 'By the mid-18th century, European powers had displaced or exterminated the Kalinago on most Caribbean islands. Dominica remained the exception. In 1748, Britain and France signed the Treaty of Aix-la-Chapelle, agreeing that Dominica would remain neutral and under Carib control. Though this treaty was violated repeatedly, the Kalinago successfully resisted full colonization until 1763, when France ceded Dominica to Britain. Even then, the Kalinago maintained significant autonomy through armed resistance. The 3,700-acre Carib Territory, established by British authorities in 1903, remains the only officially designated Indigenous land in the Eastern Caribbean.'
        },
        {
          heading: 'Kalinago Society and Culture',
          content: 'Traditional Kalinago society was organized around extended families and a chief system. Men were primarily fishermen and warriors, while women cultivated cassava, corn, and vegetables. The Kalinago were renowned throughout the Caribbean as the most skilled canoe builders — their large dugout canoes (up to 60 feet long) could carry 50-100 people. Kalinago religious beliefs centered on nature spirits, ancestor veneration, and the practices of spiritual specialists called boyez. They practiced body painting and ritual ceremonies that maintained their connection to the spiritual world.'
        },
        {
          heading: 'The Carib Territory Today',
          content: 'The modern Kalinago Territory encompasses approximately 3,700 acres on Dominica\'s eastern coast, stretching from Bataca in the north to Sineku in the south. The territory is home to about 3,000 Kalinago — the largest surviving Indigenous population in the Eastern Caribbean. It is governed by a Carib Council of five members elected by residents, with a Chief as head. The Kalinago Barana Auté (model village) serves as a cultural center where traditional crafts — basket weaving, canoe carving, and cassava bread making — are demonstrated. The territory faces significant economic challenges, with limited employment opportunities beyond agriculture, fishing, and cultural tourism.'
        },
        {
          heading: 'Hurricane Maria and Recovery',
          content: 'On September 18, 2017, Hurricane Maria struck Dominica as a Category 5 storm, causing catastrophic damage throughout the island. The Kalinago Territory was particularly hard hit — the Kalinago Barana Auté cultural center was destroyed, homes were flattened, and agricultural land was devastated. The storm killed 65 people island-wide and caused over $1.3 billion in damage. The recovery has been slow, with the Kalinago community working to rebuild homes, restore agricultural production, and reconstruct the cultural center. The hurricane highlighted the vulnerability of small island Indigenous communities to climate change.'
        },
        {
          heading: 'Chief Lorenzo Sanford and Modern Leadership',
          content: 'Chief Lorenzo Sanford has emerged as a prominent leader of the Kalinago people, advocating for greater autonomy, economic development, and cultural preservation. Under his leadership, the Kalinago Council has pursued initiatives to develop sustainable tourism, improve infrastructure within the territory, and strengthen Kalinago political representation. Chief Sanford has called for a review of the 1903 ordinance that established the territory, arguing that it was imposed by colonial authorities without Kalinago consent and should be replaced by a modern governance framework that respects Indigenous self-determination.'
        }
      ],
      sources: [
        'Discover Dominica — Kalinago Territory Official Guide',
        'Kalinago Barana Auté — Cultural Center',
        'Wikipedia — Island Caribs (peer-reviewed)',
        'Wikipedia — Dominica (peer-reviewed)',
        'Honychurch, L. — The Caribs',
        'Hurricane Maria Impact Assessment (2017)',
        'Minority Rights Group — Dominica Indigenous Peoples',
        'UNESCO — Intangible Cultural Heritage: Kalinago traditions'
      ]
    }
  },
  {
    id: 'gd-kalinago',
    name: 'Kalinago of Grenada',
    indigenousName: 'Camerhogne',
    alternateNames: ['Island Carib', 'Karina', 'Camerhogne'],
    country: 'Grenada',
    countryCode: 'GD',
    location: 'Grenada, Carriacou, and Petit Martinique',
    coordinates: [-61.7, 12.1],
    population: 'No full-blooded descendants; archaeological and cultural heritage preserved',
    language: 'Kalinago (Island Carib) — extinct locally',
    languageFamily: 'Arawakan/Cariban',
    status: 'Extinct as distinct population; archaeological sites documented',
    history: 'The Kalinago called Grenada \'Camerhogne.\' The island was inhabited by Kalinago peoples when Europeans arrived. Columbus sighted Grenada in 1498 but did not land. The English attempted settlement in 1609 but were driven off by the Kalinago. The French successfully established a colony in 1649, leading to prolonged warfare. In 1654, the French launched a major campaign against the Kalinago, culminating in the deaths of many defenders. The remaining Kalinago threw themselves off a cliff on the north of the island rather than surrender — a site now known as Leapers\' Hill or Caribs\' Leap. The French completed their conquest, and Grenada became a French colony. It was ceded to Britain in 1763.',
    currentIssues: 'Archaeological heritage is being documented. Leapers\' Hill (Caribs\' Leap) is a national historic site. The Grenada National Museum contains Kalinago artifacts. No living Indigenous community exists, but cultural heritage is acknowledged.',
    resources: [
      'https://www.grenadaconsulate.org.uk/history-of-grenada',
      'https://www.grenadanationalmuseum.org/'
    ],
    category: 'Kalinago',
    researchDocument: {
      title: 'Camerhogne: The Island Before Europeans',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Grenada',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Camerhogne: The Island Before Europeans',
          content: 'The Kalinago called Grenada \'Camerhogne\' — a name whose meaning has been lost but which reflects the deep Indigenous connection to the island. Grenada was inhabited by Kalinago peoples who had migrated from South America, establishing settlements along the coast and practicing agriculture in the island\'s fertile valleys. The Kalinago of Grenada were part of the extensive Caribbean trade and communication network, maintaining contact with Kalinago communities on other islands through canoe voyages. They cultivated cassava, sweet potatoes, and corn; fished the surrounding waters; and gathered from the island\'s lush tropical forests.'
        },
        {
          heading: 'Caribs\' Leap: The Kalinago Mass Suicide',
          content: 'The most dramatic event in Grenada\'s Indigenous history occurred in 1654, during the French conquest. After the French established a settlement in 1649, the Kalinago resisted fiercely. The French, led by Governor Jacques-Dyel du Parquet, launched a campaign of extermination. The final battle took place on the north coast of the island, where the last Kalinago defenders were cornered on a cliff. Rather than surrender to the French, approximately 40 Kalinago warriors threw themselves off the cliff to their deaths. This act of defiance — mass suicide as the ultimate resistance against colonization — has made the site, now known as Leapers\' Hill or Caribs\' Leap, one of the most powerful memorials to Indigenous resistance in the Caribbean.'
        },
        {
          heading: 'Colonial Aftermath and Modern Heritage',
          content: 'After the Kalinago were eliminated, Grenada was transformed into a plantation colony. The French brought enslaved Africans to work sugar plantations. In 1763, the island was ceded to Britain under the Treaty of Paris. Grenada achieved independence in 1974. Today, the Kalinago legacy is preserved through archaeological sites and historical memorials. The Grenada National Museum in St. George\'s houses Kalinago artifacts. Leapers\' Hill is a protected historic site and a place of pilgrimage for those remembering Indigenous resistance. The island\'s name \'Grenada\' comes from the Spanish \'Granada,\' but the original name \'Camerhogne\' is still remembered.'
        }
      ],
      sources: [
        'Grenada National Museum — Archaeological Collections',
        'Wikipedia — Grenada (peer-reviewed)',
        'Wikipedia — Island Caribs (peer-reviewed)',
        'Martin, J. — History of Grenada',
        'Steele, B. — Grenada historical studies'
      ]
    }
  },
  {
    id: 'kn-kalinago',
    name: 'Kalinago of St. Kitts & Nevis',
    indigenousName: 'Liamuiga',
    alternateNames: ['Island Carib', 'Karina', 'Liamuiga'],
    country: 'St. Kitts & Nevis',
    countryCode: 'KN',
    location: 'St. Kitts (Liamuiga) and Nevis (Oualie)',
    coordinates: [-62.8, 17.3],
    population: 'No full-blooded descendants; archaeological heritage preserved',
    language: 'Kalinago (Island Carib) — extinct locally',
    languageFamily: 'Arawakan/Cariban',
    status: 'Extinct as distinct population; archaeological sites documented',
    history: 'The Kalinago called St. Kitts \'Liamuiga\' — \'fertile land\' — and Nevis \'Oualie\' — \'land of beautiful waters.\' St. Kitts was the site of the first permanent English and French colonies in the Caribbean. In 1623, Thomas Warner established the first English settlement. In 1625, French settlers under Pierre Belain d\'Esnambuc also arrived. The two European powers initially cooperated to eliminate the Kalinago population. In 1626, at a place called Bloody Point, English and French settlers massacred approximately 2,000 Kalinago — men, women, and children — who had been invited to a supposed peace negotiation. This massacre effectively eliminated the Kalinago from St. Kitts.',
    currentIssues: 'Archaeological sites on both islands are being documented. The St. Kitts National Museum contains Kalinago artifacts. No living Indigenous community exists. The massacre at Bloody Point is memorialized.',
    resources: [
      'https://www.stkittstourism.kn/',
      'https://www.nationalarchives.gov.uk/caribbean-history/'
    ],
    category: 'Kalinago',
    researchDocument: {
      title: 'Liamuiga: The Fertile Land',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of St. Kitts & Nevis',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Liamuiga: The Fertile Land',
          content: 'The Kalinago called St. Kitts \'Liamuiga\' — \'fertile land\' — a testament to the island\'s volcanic soil and productive agriculture. Nevis was called \'Oualie\' — \'land of beautiful waters\' — referring to its numerous fresh water springs. The islands were inhabited by Kalinago peoples who cultivated cassava, corn, and sweet potatoes; fished the surrounding waters; and maintained trade connections with other islands. St. Kitts\' central location in the Lesser Antilles made it a strategic hub in the Kalinago communication and trade network.'
        },
        {
          heading: 'The Bloody Point Massacre',
          content: 'The most notorious event in St. Kitts\' Indigenous history occurred in 1626 at Bloody Point. English settlers under Thomas Warner and French settlers under Pierre Belain d\'Esnambuc had both established colonies on the island. Rather than fight each other, they agreed to cooperate in eliminating the Kalinago population. They invited the Kalinago to a \'peace\' gathering at Bloody Point. When the Kalinago arrived — approximately 2,000 men, women, and children — the Europeans attacked and killed them all. This premeditated massacre effectively eliminated the Kalinago from St. Kitts within three years of European arrival.'
        },
        {
          heading: 'English-French Rivalry and Colonial Development',
          content: 'After eliminating the Kalinago, the English and French divided St. Kitts between them. The French controlled the north (Capisterre), while the English controlled the south (Basseterre). This arrangement lasted until 1713, when the Treaty of Utrecht awarded the entire island to Britain. Nevis remained entirely English. The islands were developed as sugar plantation colonies, with enslaved Africans brought to work the plantations. St. Kitts and Nevis achieved independence in 1983, becoming the smallest country in the Western Hemisphere by land area.'
        }
      ],
      sources: [
        'St. Kitts Tourism Authority — History of St. Kitts',
        'National Archives UK — Caribbean History',
        'Wikipedia — Saint Kitts and Nevis (peer-reviewed)',
        'Wikipedia — Island Caribs (peer-reviewed)',
        'Williams, E. — From Columbus to Castro: The History of the Caribbean'
      ]
    }
  },
  {
    id: 'lc-kalinago',
    name: 'Kalinago of St. Lucia',
    indigenousName: 'Hewanorra',
    alternateNames: ['Island Carib', 'Karina', 'Hewanorra'],
    country: 'St. Lucia',
    countryCode: 'LC',
    location: 'St. Lucia — Hewanorra (southern region)',
    coordinates: [-61.0, 13.9],
    population: 'No full-blooded descendants; cultural and archaeological heritage preserved',
    language: 'Kalinago (Island Carib) — extinct locally',
    languageFamily: 'Arawakan/Cariban',
    status: 'Extinct as distinct population; archaeological sites documented',
    history: 'The Kalinago called St. Lucia \'Hewanorra\' — \'there where the iguana is found.\' The island was inhabited by Kalinago peoples when Europeans arrived. The Spanish were the first Europeans to visit, but they did not establish a permanent settlement. The English attempted settlement in 1605 and 1638, but both attempts failed due to Kalinago resistance and disease. The French successfully established a colony in 1660, but Kalinago resistance continued for decades. St. Lucia changed hands between Britain and France 14 times before finally becoming British in 1814.',
    currentIssues: 'Archaeological sites are being documented, particularly in the south of the island. The name \'Hewanorra\' survives as the name of the international airport. The St. Lucia National Trust manages heritage sites. No living Indigenous community exists.',
    resources: [
      'https://www.stlucia.org/',
      'https://www.slunatrust.org/'
    ],
    category: 'Kalinago',
    researchDocument: {
      title: 'Hewanorra: Land of the Iguana',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of St. Lucia',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Hewanorra: Land of the Iguana',
          content: 'The Kalinago called St. Lucia \'Hewanorra\' — \'there where the iguana is found.\' The island\'s lush rainforests, volcanic peaks (the Pitons are a UNESCO World Heritage Site), and fertile valleys provided an abundant environment for the Kalinago. They cultivated cassava, corn, and sweet potatoes; fished the surrounding waters; and gathered from the tropical forest. The Kalinago of St. Lucia were part of the extensive trade network connecting the Lesser Antilles, maintaining contact with communities on Martinique, Dominica, and other islands through canoe voyages.'
        },
        {
          heading: 'Fourteen Changes of Hands: The Most Contested Island',
          content: 'St. Lucia holds the record for the most transfers of control between European powers in Caribbean history. The island changed hands between Britain and France 14 times between the 17th and 19th centuries. This constant warfare meant that European colonization was never firmly established, giving the Kalinago more time to resist than on islands that fell quickly to a single power. English attempts at settlement in 1605 and 1638 both failed. The French established a colony in 1660, but Kalinago resistance continued. The island was finally awarded to Britain in 1814 under the Treaty of Paris.'
        },
        {
          heading: 'Modern Heritage and Recognition',
          content: 'St. Lucia achieved independence in 1979. Today, the Kalinago legacy is remembered through the name \'Hewanorra,\' which is used for the island\'s international airport. Archaeological sites have been identified throughout the island, particularly in the south. The St. Lucia National Trust manages several heritage sites. While no living Indigenous community exists, the island\'s pre-Columbian history is acknowledged in educational curricula and cultural programs. The Pitons Management Area, a UNESCO World Heritage Site, encompasses landscape that was sacred to the Kalinago.'
        }
      ],
      sources: [
        'St. Lucia Tourism Authority',
        'St. Lucia National Trust',
        'Wikipedia — Saint Lucia (peer-reviewed)',
        'Wikipedia — Island Caribs (peer-reviewed)',
        'Cox, E. — St. Lucia: A History'
      ]
    }
  },
  {
    id: 'vc-garifuna',
    name: 'Garifuna of St. Vincent',
    indigenousName: 'Yurumein',
    alternateNames: ['Black Caribs', 'Garinagu', 'Yurumein'],
    country: 'St. Vincent',
    countryCode: 'VC',
    location: 'St. Vincent and the Grenadines — originally St. Vincent (Yurumein)',
    coordinates: [-61.2, 13.2],
    population: 'No remaining in St. Vincent; Garifuna diaspora ~600,000 in Central America',
    language: 'Garifuna — Arawakan/Cariban/African creole; UNESCO endangered',
    languageFamily: 'Arawakan/Cariban/African',
    status: 'Deported from St. Vincent in 1797; largest Garifuna populations now in Honduras, Belize, Guatemala, and the US',
    history: 'St. Vincent was called \'Yurumein\' by its Indigenous inhabitants. The island was unique in the Caribbean because of the emergence of the Garifuna (Black Carib) people — a fusion of Kalinago and escaped Africans. In the 17th century, enslaved Africans escaped from shipwrecks and plantations on nearby islands and joined the Kalinago of St. Vincent. Over generations, this African-Kalinago fusion created a new people with a distinct culture, language, and identity. The Garifuna resisted British colonization fiercely. In 1795, under the leadership of Joseph Chatoyer, the Garifuna launched a major uprising against British rule. After years of warfare, the British defeated the Garifuna and, in 1797, forcibly deported approximately 5,000 survivors to the island of Roatan off the coast of Honduras.',
    currentIssues: 'No Garifuna community remains in St. Vincent — the island was completely ethnically cleansed. The Garifuna diaspora in Central America faces ongoing challenges: land rights conflicts, cultural erosion, economic marginalization, and the threat of language loss. In 2001, UNESCO proclaimed the Garifuna language, dance, and music a Masterpiece of the Oral and Intangible Heritage of Humanity.',
    resources: [
      'https://www.gov.vc/',
      'https://www.unesco.org/',
      'https://www.garifunacouncil.org/'
    ],
    category: 'Garifuna',
    researchDocument: {
      title: 'Yurumein: The Birthplace of the Garifuna',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of St. Vincent',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Yurumein: The Birthplace of the Garifuna',
          content: 'St. Vincent was called \'Yurumein\' by its Indigenous inhabitants. The island became the birthplace of one of the most remarkable peoples in the Americas: the Garifuna (also called Black Caribs or Garinagu). In the mid-17th century, enslaved Africans escaped from shipwrecked slave ships and plantations on nearby islands and found refuge with the Kalinago of St. Vincent. Over several generations, the intermarriage of Kalinago and Africans created a new people with a distinct culture, language, and identity — the Garifuna. This was not merely a blending of two cultures but the emergence of something entirely new.'
        },
        {
          heading: 'The Garifuna: A New People in the Caribbean',
          content: 'The Garifuna developed a unique culture that combined Kalinago and African elements. Their language, also called Garifuna, is primarily Arawakan (from the Kalinago) with Cariban and African elements — a linguistic fusion found nowhere else in the world. Garifuna society was organized around extended families and a chief system. Men were fishermen and warriors, while women cultivated crops. They maintained the Kalinago tradition of canoe building, developing large ocean-going canoes that enabled trade and communication with other islands. The Garifuna were fiercely independent and resisted all European attempts at colonization for over a century.'
        },
        {
          heading: 'Joseph Chatoyer: The Garifuna National Hero',
          content: 'Joseph Chatoyer (d. 1795) was the paramount chief of the Garifuna and the leader of their resistance against British colonization. A brilliant military strategist, Chatoyer united the Garifuna and led a prolonged guerrilla war against British forces. In 1795, he launched a major uprising that swept the island. British forces, led by General Ralph Abercromby, were initially unable to defeat the Garifuna in the island\'s mountainous terrain. However, the British eventually gained the upper hand through superior firepower. Chatoyer was killed in battle on March 14, 1795. He is now the national hero of St. Vincent and the Grenadines, and March 14 is celebrated as National Heroes Day.'
        },
        {
          heading: 'The 1797 Deportation: Ethnic Cleansing in the Caribbean',
          content: 'After defeating the Garifuna resistance, the British decided to solve the \'Garifuna problem\' through mass deportation. In 1797, approximately 5,000 Garifuna survivors — men, women, and children — were forcibly removed from St. Vincent and transported to the island of Roatan off the coast of Honduras. This was one of the largest acts of ethnic cleansing in Caribbean history. The conditions during the voyage were brutal, and many died. Those who reached Roatan found an island with limited resources. From Roatan, the Garifuna gradually migrated to the mainland coasts of Honduras, Belize, Guatemala, and Nicaragua, establishing fishing and agricultural communities.'
        },
        {
          heading: 'The Garifuna Diaspora Today',
          content: 'Today, there are approximately 600,000 Garifuna people living in Central America and the United States. The largest populations are in Honduras (est. 300,000), Belize (est. 25,000), Guatemala (est. 8,000), and Nicaragua (est. 8,000). The Garifuna face ongoing challenges: land rights conflicts in Honduras and Belize, economic marginalization, cultural erosion as young people migrate to cities, and language endangerment — Garifuna is classified as definitely endangered by UNESCO. In 2001, UNESCO proclaimed the Garifuna language, dance, and music a Masterpiece of the Oral and Intangible Heritage of Humanity.'
        }
      ],
      sources: [
        'Government of St. Vincent and the Grenadines',
        'UNESCO — Garifuna Language, Dance and Music (2001)',
        'Wikipedia — Garifuna (peer-reviewed)',
        'Wikipedia — Joseph Chatoyer (peer-reviewed)',
        'Gonzalez, N. — Sojourners of the Caribbean',
        'Palacio, J. — Garifuna studies scholar',
        'Garifuna Council — Official website'
      ]
    }
  },
  {
    id: 'bb-kalinago',
    name: 'Kalinago of Barbados',
    indigenousName: 'Ichirouganaim',
    alternateNames: ['Island Carib', 'Karina', 'Ichirouganaim'],
    country: 'Barbados',
    countryCode: 'BB',
    location: 'Barbados — easternmost Caribbean island',
    coordinates: [-59.5, 13.1],
    population: 'Extinct as distinct population; archaeological heritage preserved',
    language: 'Kalinago (Island Carib) — extinct locally',
    languageFamily: 'Arawakan/Cariban',
    status: 'Extinct as distinct population; archaeological sites documented',
    history: 'The Kalinago called Barbados \'Ichirouganaim.\' Barbados was inhabited by Kalinago peoples when the Spanish arrived in the late 15th century. The Spanish did not colonize the island but used it as a stopover and slave-raiding base. They called it \'Los Barbados\' — \'the bearded ones\' — possibly referring to the island\'s fig trees with their aerial roots. In 1625, English settlers arrived and established a colony. The Kalinago population was quickly eliminated through disease and displacement. Barbados became the first fully established English colony in the Caribbean and the model for plantation slavery.',
    currentIssues: 'No living Indigenous community. The Barbados Museum and Historical Society maintains archaeological collections. The name \'Ichirouganaim\' is remembered in cultural contexts. The island\'s complete transformation from Indigenous to colonial society makes it a case study in colonization.',
    resources: [
      'https://www.barbmuse.org.bb/',
      'https://www.nationalarchives.gov.uk/caribbean-history/'
    ],
    category: 'Kalinago',
    researchDocument: {
      title: 'Ichirouganaim: The Easternmost Island',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Barbados',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Ichirouganaim: The Easternmost Island',
          content: 'The Kalinago called Barbados \'Ichirouganaim.\' The island\'s position as the easternmost in the Caribbean — exposed to the Atlantic trade winds — made it a challenging destination for European sailing ships but also gave it strategic importance. The Kalinago of Barbados lived in coastal settlements, cultivating cassava and corn, fishing, and maintaining trade with other islands. When the Spanish arrived in the late 15th century, they found a thriving Indigenous community but chose not to colonize, using the island instead for slave raiding and as a navigational landmark.'
        },
        {
          heading: 'The First English Colony: 1625',
          content: 'In 1625, Captain John Powell claimed Barbados for England. The first permanent English settlers arrived in 1627, led by Henry Powell. They found an island already depopulated by Spanish slave raids and disease — the Kalinago population had been significantly reduced. The English settlers cleared the land for tobacco and cotton plantations, and later sugar. Barbados became the first successful English colony in the Caribbean and served as a model for plantation economies throughout the region. The island\'s sugar plantations were extraordinarily profitable, making Barbados the richest English colony in the Americas by the mid-17th century.'
        },
        {
          heading: 'The Complete Transformation',
          content: 'Barbados represents the most complete transformation of a Caribbean island from Indigenous to colonial society. Unlike Jamaica, Haiti, or Dominica, where Indigenous communities survived through resistance and retreat, Barbados had no mountainous interior where the Kalinago could hide. The island\'s relatively flat terrain meant there were no refuges. The Kalinago population was eliminated within decades of English arrival. Barbados became a society of Europeans and enslaved Africans, with no Indigenous presence. This made Barbados unique in the Caribbean and established the pattern of plantation slavery that would be replicated across the Americas. Barbados achieved independence in 1966 and became a republic in 2021.'
        }
      ],
      sources: [
        'Barbados Museum and Historical Society',
        'National Archives UK — Caribbean History',
        'Wikipedia — Barbados (peer-reviewed)',
        'Wikipedia — Island Caribs (peer-reviewed)',
        'Beckles, H. — A History of Barbados'
      ]
    }
  },
  {
    id: 'vi-taino',
    name: 'Taino & Kalinago of the US Virgin Islands',
    indigenousName: 'Ay-Ay / Cibucan',
    alternateNames: ['Arawak', 'Island Carib', 'Ciboney'],
    country: 'US Virgin Islands',
    countryCode: 'VI',
    location: 'St. Thomas, St. John, and St. Croix',
    coordinates: [-64.8, 18.0],
    population: 'Extinct as distinct population; archaeological heritage preserved',
    language: 'Taino/Kalinago — extinct locally',
    languageFamily: 'Arawakan/Cariban',
    status: 'Extinct as distinct population; archaeological sites documented',
    history: 'The US Virgin Islands were inhabited by both Taino and Kalinago peoples. St. Croix (called \'Ay-Ay\' or \'Cibucan\') was a significant settlement. Columbus encountered the islands on his second voyage in 1493. The Spanish claimed the islands but did not establish permanent settlements. In the 17th century, the islands became contested territory among European powers. Denmark established colonies on St. Thomas (1672) and St. John (1694), and purchased St. Croix from France in 1733. The Indigenous population had been largely eliminated by disease and displacement before European colonization was firmly established.',
    currentIssues: 'No living Indigenous community. The Virgin Islands National Park on St. John contains archaeological sites. Heritage preservation efforts are ongoing.',
    resources: [
      'https://www.nps.gov/viis/',
      'https://www.uvi.edu/'
    ],
    category: 'Taino/Kalinago',
    researchDocument: {
      title: 'Ay-Ay: The Islands Before Europeans',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of the US Virgin Islands',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Ay-Ay: The Islands Before Europeans',
          content: 'The US Virgin Islands were inhabited by Indigenous peoples long before European arrival. St. Croix was called \'Ay-Ay\' or \'Cibucan\' by its inhabitants. Archaeological evidence suggests that the islands were settled by Taino peoples from Puerto Rico, with later Kalinago influence. The islands\' location in the northern Leeward Islands made them important waypoints in the Caribbean trade network. The inhabitants cultivated cassava and corn, fished the surrounding waters, and maintained connections with communities on Puerto Rico and other nearby islands.'
        },
        {
          heading: 'European Contests and Indigenous Displacement',
          content: 'Columbus encountered the Virgin Islands on his second voyage in 1493, naming them \'Santa Ursula y las Once Mil Virgenes.\' The Spanish claimed the islands but did not establish permanent settlements. In the 17th century, English, Dutch, French, and Danish settlers all attempted to establish colonies. The Indigenous population was rapidly eliminated through disease, slave raids by the Spanish, and displacement. By the time Denmark established a permanent colony on St. Thomas in 1672, the Indigenous population had virtually disappeared.'
        },
        {
          heading: 'Danish Colonial Era and American Acquisition',
          content: 'Denmark established colonies on St. Thomas (1672) and St. John (1694), and purchased St. Croix from France in 1733. The Danish West India Company developed sugar plantations on all three islands, importing enslaved Africans to work them. The islands remained Danish colonies until 1917, when the United States purchased them for $25 million in gold. The US Virgin Islands remain an unincorporated territory of the United States. Today, the Indigenous legacy is preserved through archaeological sites and historical records.'
        }
      ],
      sources: [
        'National Park Service — Virgin Islands National Park',
        'University of the Virgin Islands',
        'Wikipedia — United States Virgin Islands (peer-reviewed)',
        'Wikipedia — Taino (peer-reviewed)',
        'Dookhan, I. — A History of the Virgin Islands of the United States'
      ]
    }
  },
  {
    id: 'ky-taino',
    name: 'Taino of the Cayman Islands',
    indigenousName: 'Tortuga',
    alternateNames: ['Arawak', 'Ciboney'],
    country: 'Cayman Islands',
    countryCode: 'KY',
    location: 'Grand Cayman, Cayman Brac, and Little Cayman',
    coordinates: [-80.9, 19.3],
    population: 'No permanent Indigenous settlement; visited by Taino from Cuba and Jamaica',
    language: 'Taino — extinct locally',
    languageFamily: 'Arawakan',
    status: 'No permanent Indigenous settlement; archaeological evidence of visits',
    history: 'The Cayman Islands were not permanently settled by Indigenous peoples, but archaeological evidence indicates that Taino peoples from Cuba and Jamaica visited the islands. The name \'Cayman\' comes from the Carib word for crocodile (caiman) — early explorers reported seeing marine crocodiles on the islands. Columbus sighted the islands in 1503 but did not land. The islands remained uninhabited until the 17th century when English and Scottish settlers, along with enslaved Africans, began to settle. The Cayman Islands remained a dependency of Jamaica until 1962.',
    currentIssues: 'No Indigenous settlement to preserve. Archaeological evidence of Taino visits is being studied. The islands\' status as a major offshore financial center dominates modern identity.',
    resources: [
      'https://www.explorecayman.com/',
      'https://www.nationalarchives.gov.uk/caribbean-history/'
    ],
    category: 'Taino',
    researchDocument: {
      title: 'Taino Visits to the Cayman Islands',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of the Cayman Islands',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Taino Visits to the Cayman Islands',
          content: 'Archaeological evidence suggests that Taino peoples from Cuba and Jamaica visited the Cayman Islands, though no permanent settlements have been found. The islands may have served as fishing and turtle-hunting grounds. Sea turtles were abundant in Cayman waters and were an important food source for Taino peoples. The Taino word for turtle, \'tortuga,\' may have been used to refer to the islands. The Cayman Islands\' lack of fresh water sources and agricultural land made permanent settlement difficult.'
        },
        {
          heading: 'European Discovery and Naming',
          content: 'Columbus sighted the Cayman Islands on May 10, 1503, during his fourth voyage. He called them \'Las Tortugas\' — \'the Turtles\' — because of the large number of sea turtles he observed. The name later changed to \'Cayman\' after the Carib word \'caiman\' (crocodile), as explorers reported seeing marine crocodiles on the islands. These crocodiles are now extinct. The islands remained uninhabited by Europeans until the 17th century. English and Scottish settlers arrived, along with enslaved Africans from Jamaica.'
        },
        {
          heading: 'Colonial History and Modern Status',
          content: 'The Cayman Islands were a dependency of Jamaica from 1863 until Jamaican independence in 1962, after which they became a separate British Overseas Territory. The islands developed a unique society based on seafaring, shipbuilding, and turtle fishing. In the late 20th century, the Cayman Islands transformed into a major offshore financial center and tourist destination. Today, they have one of the highest standards of living in the Caribbean. The Indigenous heritage is limited to archaeological evidence of Taino visits.'
        }
      ],
      sources: [
        'Cayman Islands National Museum',
        'National Archives UK — Caribbean History',
        'Wikipedia — Cayman Islands (peer-reviewed)',
        'Wikipedia — Taino (peer-reviewed)',
        'Craton, M. — Founded upon the Seas'
      ]
    }
  },
  {
    id: 'tc-lucayan',
    name: 'Lucayan Taino of Turks & Caicos',
    indigenousName: 'Shining Shores',
    alternateNames: ['Lucayan', 'Bahama Taino', 'Arawak'],
    country: 'Turks & Caicos',
    countryCode: 'TC',
    location: 'Turks Islands and Caicos Islands — 40 islands and cays',
    coordinates: [-71.8, 21.8],
    population: 'Extinct as distinct population by early 16th century',
    language: 'Lucayan/Taino — extinct; Arawakan language family',
    languageFamily: 'Arawakan',
    status: 'Extinct as distinct population; archaeological heritage preserved',
    history: 'The Turks and Caicos Islands were inhabited by Lucayan Taino peoples, a branch of the Taino who had migrated from Hispaniola. Archaeological evidence indicates settlement by at least 700 CE. The Lucayans called the islands various names; \'Caicos\' may derive from the Taino \'cayo hico\' — \'chain of islands.\' The Lucayans were skilled maritime people who fished, harvested conch, and traded with other islands. Juan Ponce de León stopped at the islands in 1512, enslaving approximately 160 Lucayans. Spanish slave raids continued, and by the early 16th century, the Lucayan population had been effectively eliminated.',
    currentIssues: 'No living Indigenous community. The Turks & Caicos National Museum houses Lucayan artifacts, including the famous Molasses Reef wreck. Archaeological sites are being documented.',
    resources: [
      'https://www.tcmuseum.org/',
      'https://www.visittci.com/'
    ],
    category: 'Lucayan',
    researchDocument: {
      title: 'Lucayan Settlement of the Turks & Caicos',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Turks & Caicos',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Lucayan Settlement of the Turks & Caicos',
          content: 'The Turks and Caicos Islands were inhabited by Lucayan Taino peoples who migrated from Hispaniola beginning around 700 CE. Archaeological evidence shows settlement on multiple islands, with the largest sites on Grand Turk, Middle Caicos, and North Caicos. The Lucayans were maritime people who relied heavily on fishing, conch harvesting, and salt production. They maintained trade connections with Hispaniola and other islands, traveling in large dugout canoes. The name \'Caicos\' may derive from the Taino \'cayo hico\' — \'chain of islands.\''
        },
        {
          heading: 'Spanish Enslavement and Population Collapse',
          content: 'The destruction of the Lucayan population of the Turks and Caicos was part of the broader Spanish campaign to enslave Lucayans throughout the Bahamas. In 1512, Juan Ponce de León stopped at the islands and captured approximately 160 Lucayans to work in the salt pans of Bimini. Spanish slave raiders continued to visit the islands, capturing Lucayans for forced labor on Hispaniola and Cuba. By the early 16th century, the Lucayan population had been effectively eliminated. The islands remained uninhabited for over a century until Bermudian salt rakers arrived in the 17th century.'
        },
        {
          heading: 'Archaeological Heritage and Modern Recognition',
          content: 'The Turks & Caicos National Museum on Grand Turk houses an important collection of Lucayan artifacts, including the Molasses Reef wreck — one of the oldest European shipwrecks found in the Americas. The museum\'s \'First Peoples\' exhibit documents Lucayan history and culture. Archaeological sites have been identified on multiple islands, including middens (shell heaps), village sites, and cave sites. The islands are now a British Overseas Territory and a major tourist destination.'
        }
      ],
      sources: [
        'Turks and Caicos National Museum',
        'Keegan, W. — Lucayan Legacies',
        'Wikipedia — Lucayan people (peer-reviewed)',
        'Wikipedia — Turks and Caicos Islands (peer-reviewed)',
        'Granberry, J. — Taino language research'
      ]
    }
  },
  {
    id: 'gp-kalinago',
    name: 'Kalinago of Guadeloupe',
    indigenousName: 'Karukera',
    alternateNames: ['Island Carib', 'Karina', 'Karukera'],
    country: 'Guadeloupe',
    countryCode: 'GP',
    location: 'Basse-Terre and Grande-Terre islands',
    coordinates: [-61.6, 16.3],
    population: 'Extinct as distinct population; archaeological heritage preserved',
    language: 'Kalinago (Island Carib) — extinct locally',
    languageFamily: 'Arawakan/Cariban',
    status: 'Extinct as distinct population; archaeological sites documented',
    history: 'The Kalinago called Guadeloupe \'Karukera\' — \'the island of beautiful waters.\' Columbus visited the island in 1493 and named it after the Virgin of Guadalupe. The Spanish did not colonize the island. The French established a settlement in 1635 under Charles Liénard and Jean Duplessis. The Kalinago resisted French colonization fiercely, but disease and warfare gradually eliminated the Indigenous population. In 1654, a major Kalinago uprising was suppressed. By the end of the 17th century, the Kalinago had been effectively eliminated from Guadeloupe.',
    currentIssues: 'No living Indigenous community. Archaeological sites are being documented. The name \'Karukera\' survives in cultural and business contexts. French heritage laws apply to archaeological protection.',
    resources: [
      'https://www.guadeloupe-tourisme.fr/',
      'https://www.regionguadeloupe.fr/'
    ],
    category: 'Kalinago',
    researchDocument: {
      title: 'Karukera: Island of Beautiful Waters',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Guadeloupe',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Karukera: Island of Beautiful Waters',
          content: 'The Kalinago called Guadeloupe \'Karukera\' — \'the island of beautiful waters\' — a fitting description of the island\'s numerous rivers, waterfalls, and hot springs. Guadeloupe consists of two main islands: Basse-Terre, a mountainous volcanic island with lush rainforests, and Grande-Terre, a flatter limestone island. The Kalinago inhabited both islands, cultivating cassava and corn, fishing, and gathering from the rich tropical forests.'
        },
        {
          heading: 'French Colonization and Kalinago Resistance',
          content: 'The French established a settlement on Guadeloupe in 1635 under Charles Liénard and Jean Duplessis. The Kalinago resisted the French incursion, attacking settlements and killing colonists. In 1654, the Kalinago launched a major uprising against French rule, temporarily driving the colonists from the island. However, French reinforcements arrived and suppressed the revolt. By the end of the 17th century, disease and warfare had eliminated the Kalinago population. Guadeloupe was then developed as a sugar plantation colony.'
        },
        {
          heading: 'Modern Heritage',
          content: 'Guadeloupe remains an overseas department of France, part of the European Union. The Kalinago legacy survives in the name \'Karukera,\' archaeological sites, and place names. The Parc National de la Guadeloupe protects rainforest that was once Kalinago territory. While no living Indigenous community exists, the island\'s history is acknowledged in museums and cultural programs.'
        }
      ],
      sources: [
        'Guadeloupe Tourism Committee',
        'Regional Council of Guadeloupe',
        'Wikipedia — Guadeloupe (peer-reviewed)',
        'Wikipedia — Island Caribs (peer-reviewed)',
        'Tomich, D. — Slavery in the Circuit of Sugar'
      ]
    }
  },
  {
    id: 'mq-kalinago',
    name: 'Kalinago of Martinique',
    indigenousName: 'Madinina',
    alternateNames: ['Island Carib', 'Karina', 'Madinina'],
    country: 'Martinique',
    countryCode: 'MQ',
    location: 'Martinique — Windward Islands',
    coordinates: [-61.0, 14.6],
    population: 'Extinct as distinct population; archaeological heritage preserved',
    language: 'Kalinago (Island Carib) — extinct locally',
    languageFamily: 'Arawakan/Cariban',
    status: 'Extinct as distinct population; archaeological sites documented',
    history: 'The Kalinago called Martinique \'Madinina\' — \'the island of flowers.\' Columbus visited the island in 1502 but did not establish a settlement. The Spanish did not colonize Martinique. In 1635, Pierre Belain d\'Esnambuc established the first French settlement at Saint-Pierre. The Kalinago resisted colonization, but by 1660 they had been effectively eliminated through warfare and disease. Martinique became a major French sugar colony. In 1902, the eruption of Mount Pelee destroyed Saint-Pierre, killing approximately 30,000 people.',
    currentIssues: 'No living Indigenous community. Archaeological sites are being documented. The name \'Madinina\' is widely used and beloved. French heritage laws protect archaeological sites.',
    resources: [
      'https://www.martinique.org/',
      'https://www.regionmartinique.fr/'
    ],
    category: 'Kalinago',
    researchDocument: {
      title: 'Madinina: Island of Flowers',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Martinique',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Madinina: Island of Flowers',
          content: 'The Kalinago called Martinique \'Madinina\' — \'the island of flowers\' — referring to the island\'s lush tropical vegetation and abundant flowering plants. Martinique is a volcanic island dominated by Mount Pelee, an active volcano that rises to 1,397 meters. The Kalinago inhabited coastal settlements and cultivated the fertile volcanic soil. They were skilled fishermen and navigators, maintaining connections with other islands.'
        },
        {
          heading: 'French Settlement and Kalinago Elimination',
          content: 'In 1635, Pierre Belain d\'Esnambuc established the first French settlement at Saint-Pierre on the northwest coast. The Kalinago resisted the French presence, but they were gradually overwhelmed by European diseases and military pressure. By 1660, the Kalinago population had been effectively eliminated. Martinique was then developed as a sugar plantation colony. It became one of France\'s most important Caribbean possessions.'
        },
        {
          heading: 'Modern Heritage',
          content: 'Martinique remains an overseas department of France. The name \'Madinina\' is widely used in cultural contexts, business names, and tourism marketing. While no living Indigenous community exists, the island\'s pre-Columbian history is acknowledged in museums. The 1902 eruption of Mount Pelee, which destroyed Saint-Pierre, has overshadowed Indigenous history in popular memory. However, archaeological research continues to document the Kalinago presence.'
        }
      ],
      sources: [
        'Martinique Tourism Authority',
        'Regional Council of Martinique',
        'Wikipedia — Martinique (peer-reviewed)',
        'Wikipedia — Island Caribs (peer-reviewed)',
        'Zobel, J. — La Rue Cases-Negres'
      ]
    }
  },
  {
    id: 'aw-caquetio',
    name: 'Caquetio (Arawak) of Aruba',
    indigenousName: 'Aruban Arawak',
    alternateNames: ['Arawak', 'Caquetio', 'Caiquetio'],
    country: 'Aruba',
    countryCode: 'AW',
    location: 'Aruba — southern Caribbean, off the coast of Venezuela',
    coordinates: [-70.0, 12.5],
    population: 'Descendants may exist; archaeological heritage well-documented',
    language: 'Caquetio (Arawak) — extinct; Arawakan language family',
    languageFamily: 'Arawakan',
    status: 'Extinct as distinct population; archaeological sites well-documented',
    history: 'Aruba was inhabited by Caquetio (Caiquetio) peoples, a branch of the Arawak who had migrated from the South American mainland. The Caquetio were related to the Taino but had distinct cultural practices. The Spanish claimed Aruba in 1499 but did not establish a permanent settlement. In 1636, the Dutch took control of the island and established a colony. The Caquetio population was displaced and absorbed through intermarriage. Unlike many Caribbean islands, Aruba was not developed as a major plantation colony — its arid climate made sugar cultivation impractical. Instead, the island\'s economy was based on livestock, aloe cultivation, and gold mining.',
    currentIssues: 'No recognized living Indigenous community. Archaeological sites have been well-documented. The National Archaeological Museum Aruba (MANA) houses an extensive collection of Caquetio artifacts. Many Arubans may have Caquetio ancestry.',
    resources: [
      'https://www.museoaruba.aw/',
      'https://www.aruba.com/'
    ],
    category: 'Arawak',
    researchDocument: {
      title: 'The Caquetio of Aruba',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Aruba',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'The Caquetio of Aruba',
          content: 'Aruba was inhabited by Caquetio (Caiquetio) peoples, a branch of the Arawak-speaking peoples who had migrated from the South American mainland, probably from the Lake Maracaibo region of modern Venezuela. The Caquetio were closely related to the Taino of the Greater Antilles but had distinct cultural practices. They lived in coastal settlements, practicing agriculture, fishing, and gathering. The island\'s arid climate meant that the Caquetio developed agricultural techniques suited to dry conditions.'
        },
        {
          heading: 'Spanish and Dutch Colonial Rule',
          content: 'The Spanish claimed Aruba in 1499 when Alonso de Ojeda visited the island. However, the Spanish did not establish a permanent settlement. In 1636, the Dutch West India Company took control of Aruba and established a colony. The Dutch used the island primarily for livestock raising and as a source of labor for other colonies. The Caquetio population was gradually absorbed through intermarriage with Europeans and Africans. Unlike the plantation colonies, Aruba\'s arid climate meant that sugar cultivation was not profitable.'
        },
        {
          heading: 'Archaeological Heritage and Modern Aruba',
          content: 'Aruba has some of the best-documented Indigenous archaeological sites in the southern Caribbean. The Tanki Flip site contains the remains of a large Caquetio village with pottery, tools, and burial sites. The Santa Cruz caves contain rock paintings and petroglyphs. The National Archaeological Museum Aruba (MANA) in Oranjestad houses an extensive collection of Caquetio artifacts. Aruba achieved \'status aparte\' within the Kingdom of the Netherlands in 1986.'
        }
      ],
      sources: [
        'National Archaeological Museum Aruba (MANA)',
        'Aruba Tourism Authority',
        'Wikipedia — Aruba (peer-reviewed)',
        'Wikipedia — Caquetio people (peer-reviewed)',
        'Versteeg, A. — Aruban archaeology studies'
      ]
    }
  },
  {
    id: 'cw-caquetio',
    name: 'Caquetio (Arawak) of Curacao',
    indigenousName: 'Curacao Arawak',
    alternateNames: ['Arawak', 'Caquetio', 'Caiquetio'],
    country: 'Curacao',
    countryCode: 'CW',
    location: 'Curacao — southern Caribbean, largest of the ABC islands',
    coordinates: [-68.9, 12.2],
    population: 'Descendants may exist; archaeological heritage well-documented',
    language: 'Caquetio (Arawak) — extinct; Arawakan language family',
    languageFamily: 'Arawakan',
    status: 'Extinct as distinct population; archaeological sites well-documented',
    history: 'Curacao was inhabited by Caquetio peoples, related to those on Aruba and Bonaire. The Spanish claimed the island in 1499. The name \'Curacao\' may derive from the Portuguese \'coracao\' (heart) or from a Caquetio word. In 1634, the Dutch West India Company captured Curacao from the Spanish and established a major settlement at Willemstad. The Caquetio population was displaced and absorbed. Curacao became the center of Dutch slave trading in the Caribbean — the slave market at Willemstad was one of the largest in the Americas.',
    currentIssues: 'No recognized living Indigenous community. Archaeological sites have been documented. The Curacao Museum maintains archaeological collections. Curacao became a self-governing country within the Kingdom of the Netherlands in 2010.',
    resources: [
      'https://www.curacao.com/',
      'https://www.curacaomuseum.com/'
    ],
    category: 'Arawak',
    researchDocument: {
      title: 'The Caquetio of Curacao',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Curacao',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'The Caquetio of Curacao',
          content: 'Curacao was inhabited by Caquetio peoples who had migrated from the South American mainland. The Caquetio of Curacao were closely related to those on Aruba and Bonaire, sharing cultural practices and language. They lived in coastal settlements, practicing agriculture, fishing, and gathering. The island\'s semi-arid climate required adapted agricultural techniques. The Caquetio were part of a trade network connecting the southern Caribbean islands with the South American mainland.'
        },
        {
          heading: 'Dutch Takeover and the Slave Trade',
          content: 'In 1634, the Dutch West India Company, under the command of Johannes van Walbeeck, captured Curacao from the Spanish. The Dutch established Willemstad as the capital and developed the island into the center of their Caribbean operations. Curacao\'s deep natural harbor made it an ideal port, and the island became the major slave-trading depot for the Dutch Atlantic. Enslaved Africans were brought to Curacao from West Africa and then sold to plantations throughout the Caribbean and the Americas.'
        },
        {
          heading: 'Modern Heritage',
          content: 'Curacao became a self-governing country within the Kingdom of the Netherlands in 2010. The island\'s diverse heritage includes Caquetio Indigenous, Dutch colonial, African, Sephardic Jewish, and other influences. The historic center of Willemstad is a UNESCO World Heritage Site. Archaeological sites document the Caquetio presence, though no living Indigenous community is officially recognized. The island\'s multicultural identity acknowledges its Indigenous roots.'
        }
      ],
      sources: [
        'Curacao Museum',
        'Curacao Tourism Board',
        'Wikipedia — Curacao (peer-reviewed)',
        'Wikipedia — Caquetio people (peer-reviewed)',
        'Emmanuel, I. & E. — History of the Jews of the Netherlands Antilles'
      ]
    }
  },
  {
    id: 'bo-caquetio',
    name: 'Caquetio (Arawak) of Bonaire',
    indigenousName: 'Bonaire Arawak',
    alternateNames: ['Arawak', 'Caquetio', 'Caiquetio'],
    country: 'Bonaire',
    countryCode: 'BO',
    location: 'Bonaire — southern Caribbean, easternmost of the ABC islands',
    coordinates: [-68.3, 12.2],
    population: 'Descendants may exist; archaeological heritage documented',
    language: 'Caquetio (Arawak) — extinct; Arawakan language family',
    languageFamily: 'Arawakan',
    status: 'Extinct as distinct population; archaeological sites documented',
    history: 'Bonaire was inhabited by Caquetio peoples related to those on Aruba and Curacao. The Spanish claimed the island in 1499 but did not establish a permanent settlement. In 1636, the Dutch took control and used the island primarily for livestock raising. Enslaved Africans were brought to work as ranch hands and to harvest salt from the island\'s natural salt pans — a grueling and dangerous task. The Caquetio population was displaced and absorbed. In 2010, Bonaire became a special municipality of the Netherlands.',
    currentIssues: 'No recognized living Indigenous community. Archaeological sites have been documented, including rock paintings and petroglyphs at sites like Onima and Boca. The Washington Slagbaai National Park contains archaeological sites. The island\'s focus on ecotourism has allowed for preservation of archaeological heritage.',
    resources: [
      'https://www.bonaire.com/',
      'https://www.washingtonparkbonaire.org/'
    ],
    category: 'Arawak',
    researchDocument: {
      title: 'The Caquetio of Bonaire',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Bonaire',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'The Caquetio of Bonaire',
          content: 'Bonaire was inhabited by Caquetio peoples who migrated from the South American mainland. The Caquetio of Bonaire shared cultural practices with those on Aruba and Curacao but adapted to Bonaire\'s unique environment. The island is even more arid than its neighbors, and the Caquetio developed specialized techniques for survival in this dry environment. They fished the surrounding waters, gathered from the scrubland vegetation, and practiced limited agriculture where fresh water was available.'
        },
        {
          heading: 'Dutch Colonial Era: Salt and Slavery',
          content: 'In 1636, the Dutch West India Company took control of Bonaire and used the island primarily for livestock raising and salt production. The island\'s natural salt pans — large flat areas where seawater evaporates — became a major economic resource. Enslaved Africans were brought to Bonaire to work in the salt pans under brutal conditions. The salt was used for preserving fish and meat for the Dutch Atlantic trade. Slavery was abolished in 1863, but the salt industry continued.'
        },
        {
          heading: 'Modern Bonaire and Heritage',
          content: 'In 2010, Bonaire became a special municipality of the Netherlands. Today, Bonaire is known primarily for its exceptional marine environment — the Bonaire National Marine Park was one of the first marine protected areas in the Caribbean. The Washington Slagbaai National Park protects terrestrial habitats and contains archaeological sites including Caquetio rock paintings at Onima and Boca. While no living Indigenous community exists, the Caquetio legacy is acknowledged.'
        }
      ],
      sources: [
        'Bonaire Tourism Corporation',
        'Washington Slagbaai National Park',
        'Wikipedia — Bonaire (peer-reviewed)',
        'Wikipedia — Caquetio people (peer-reviewed)',
        'Duinker, J. — Bonaire archaeology studies'
      ]
    }
  },
]


// ══════════════════════════════════════════════════════════════
// CANADA — RESEARCHED 2025-07-09
// ══════════════════════════════════════════════════════════════
export const canadaNations: IndigenousNation[] = [
  {
    id: 'ca-on-anishinaabe',
    name: 'Anishinaabe (Ojibwe) of Ontario',
    indigenousName: 'Anishinaabe',
    alternateNames: [],
    country: 'Ontario',
    countryCode: 'CA-ON',
    location: 'Throughout Ontario — Great Lakes region, boreal forests, and subarctic north',
    coordinates: [-84.7, 50.0],
    population: '~220,000 Anishinaabe in Ontario',
    language: 'Anishinaabemowin (Ojibwe) — Algonquian family',
    languageFamily: 'Algonquian',
    status: '34 federally recognized First Nations; several self-government agreements',
    history: 'The Anishinaabe have inhabited the Great Lakes region for thousands of years. Their traditional territory spans present-day Ontario, Manitoba, Saskatchewan, Minnesota, Wisconsin, and Michigan. They are part of the Algonquian language family and are closely related to the Odawa and Potawatomi. They developed sophisticated governance systems, including the Grand Council of Treaty #3. The Anishinaabe signed numerous treaties with the British Crown, including the Robinson Treaties (1850) and the numbered treaties. These treaties are living documents that continue to shape Indigenous-Crown relations in Canada.',
    currentIssues: 'Land rights and treaty implementation remain central issues. The Ring of Fire mining project threatens boreal ecosystems. Language revitalization efforts are underway. Water security remains a concern.',
    resources: [
      'https://www.anishinabek.ca/',
      'https://www.treaty3.ca/',
      'https://www.grandcouncil.ca/'
    ],
    category: 'Anishinaabe',
    researchDocument: {
      title: 'Anishinaabe: The Original People',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Ontario',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Anishinaabe: The Original People',
          content: 'The Anishinaabe have inhabited the Great Lakes region and the Canadian Shield for millennia. Their traditional territory encompasses the boreal forests, freshwater lakes, and rivers of present-day Ontario, Manitoba, and Saskatchewan. They developed a sophisticated society organized around clans (doodem) — kinship groups represented by animal totems. These clan systems governed marriage, leadership, and social organization.'
        },
        {
          heading: 'The Robinson Treaties and Treaty #3',
          content: 'The Anishinaabe entered into several major treaties with the British Crown. The Robinson Treaties of 1850 were negotiated by Chief Shingwaukonse and other Anishinaabe leaders. Treaty #3, signed in 1873, covered northwestern Ontario and is considered the treaty upon which all others were modelled. The Anishinaabe understanding of these treaties was based on nation-to-nation relationships and shared use of the land — not surrender.'
        },
        {
          heading: 'Residential Schools and Cultural Genocide',
          content: 'The Anishinaabe were subjected to the residential school system — a state-sponsored program of cultural genocide. The Shingwauk Indian Residential School in Sault Ste. Marie operated from 1875 to 1970. Thousands of Anishinaabe children passed through its doors. Many suffered physical and sexual abuse. The Truth and Reconciliation Commission documented these atrocities and issued 94 Calls to Action.'
        },
        {
          heading: 'Contemporary Governance and Revitalization',
          content: 'Today, 34 Anishinaabe First Nations are federally recognized in Ontario. Several nations have negotiated self-government agreements. The Anishinabek Nation Grand Council represents 39 First Nations. Language revitalization efforts include immersion schools and community programs. The Anishinaabe concept of \'minobimaatisiiwin\' — the good life — encompasses respectful relationships with the land, water, and all living beings.'
        }
      ],
      sources: [
        'Anishinabek Nation',
        'Grand Council of Treaty #3',
        'Truth and Reconciliation Commission of Canada (2015)',
        'Miller, J.R. — Compact, Contract, Covenant'
      ]
    }
  },
  {
    id: 'ca-qc-cree',
    name: 'Cree of Quebec',
    indigenousName: 'Iyiyiw',
    alternateNames: [],
    country: 'Quebec',
    countryCode: 'CA-QC',
    location: 'Northern Quebec — Eeyou Istchee (James Bay region)',
    coordinates: [-73.0, 52.0],
    population: '~200,000 Cree in Quebec — largest First Nation in Canada',
    language: 'Cree — most widely spoken Indigenous language in Canada; Algonquian family',
    languageFamily: 'Algonquian',
    status: 'Grand Council of the Crees — self-governing political body',
    history: 'The Cree have lived in Eeyou Istchee for thousands of years. They were primarily hunter-gatherers following seasonal cycles. The Cree signed the James Bay and Northern Quebec Agreement in 1975 — the first modern treaty in Canada. This agreement provided compensation for hydroelectric development and established Cree self-governance.',
    currentIssues: 'Hydroelectric development remains the most pressing issue. The La Grande complex flooded over 11,000 square kilometers of Cree territory. Climate change is affecting traditional hunting grounds. The Cree are active in international Indigenous forums.',
    resources: [
      'https://www.cngov.ca/',
      'https://www.gccei.ca/'
    ],
    category: 'Cree',
    researchDocument: {
      title: 'Eeyou Istchee: The People\'s Land',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Quebec',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Eeyou Istchee: The People\'s Land',
          content: 'The Cree homeland in Quebec covers approximately 450,000 square kilometers of boreal forest. This vast territory has been inhabited by the Cree for thousands of years. The Cree developed a sophisticated understanding of this northern environment, following seasonal cycles of moose hunting, fishing, trapping, and goose hunting.'
        },
        {
          heading: 'The James Bay Agreement',
          content: 'In 1971, Quebec announced plans for the James Bay hydroelectric project without consulting the Cree. The Cree obtained an injunction in 1973 — the first time a Canadian court recognized Aboriginal title. The resulting James Bay and Northern Quebec Agreement (1975) was the first modern treaty in Canada. It provided $225 million in compensation and established Cree self-governance.'
        },
        {
          heading: 'Hydroelectric Impacts',
          content: 'The La Grande complex flooded over 11,000 square kilometers of Cree territory — larger than Jamaica — destroying hunting grounds and displacing communities. The Eastmain-1 and Rupert River diversions flooded additional territory. The Cree Nation Government manages environmental monitoring.'
        },
        {
          heading: 'Cree Language and Culture',
          content: 'The Cree language is the most widely spoken Indigenous language in Canada, with approximately 100,000 speakers. The Cree School Board operates schools in all nine Cree communities. Cultural traditions include the goose break, the walk-out ceremony, and the powwow tradition.'
        }
      ],
      sources: [
        'Grand Council of the Crees',
        'James Bay and Northern Quebec Agreement (1975)',
        'Feit, H. — Hunting and the Quest for Power',
        'Richardson, B. — Strangers Devour the Land'
      ]
    }
  },
  {
    id: 'ca-bc-salish',
    name: 'Coast Salish of British Columbia',
    indigenousName: 'Sto:lo',
    alternateNames: [],
    country: 'British Columbia',
    countryCode: 'CA-BC',
    location: 'Southwest BC — Fraser River Valley, Georgia Strait, Vancouver Island coast',
    coordinates: [-125.0, 54.0],
    population: '~60,000 Coast Salish in BC',
    language: 'Halkomelem, Squamish — revitalization active; Salishan family',
    languageFamily: 'Salishan',
    status: 'Multiple federally recognized bands; active treaty negotiations',
    history: 'The Coast Salish have inhabited southwest British Columbia for at least 10,000 years. They developed one of the most complex pre-contact societies in North America, with permanent villages of large plank longhouses and extensive trade networks. The Fraser River was the center of life, providing salmon that supported large villages. The potlatch was central to Coast Salish society.',
    currentIssues: 'Land rights and urban development are pressing issues. The Coast Salish territory encompasses the cities of Vancouver and Victoria. The Trans Mountain Pipeline has been fiercely resisted. Language revitalization is critical — most languages have fewer than 100 fluent speakers.',
    resources: [
      'https://www.stolonation.ca/',
      'https://twnation.ca/',
      'https://www.musqueam.bc.ca/'
    ],
    category: 'Coast Salish',
    researchDocument: {
      title: 'The Fraser River: Lifeline of the Coast Salish',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of British Columbia',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'The Fraser River: Lifeline of the Coast Salish',
          content: 'The Fraser River has been the center of Coast Salish life for millennia. As the most productive salmon river in North America, it supported large permanent villages. The Coast Salish developed sophisticated fishing technologies and managed salmon harvests sustainably for thousands of years.'
        },
        {
          heading: 'The Potlatch Tradition',
          content: 'The potlatch was the central social, economic, and political institution of Coast Salish society. Through potlatches, hereditary chiefs validated claims to names, titles, and territories. Canadian authorities banned the potlatch from 1884 to 1951. The repatriation of potlatch artifacts remains an ongoing issue.'
        },
        {
          heading: 'Residential Schools and the Sixties Scoop',
          content: 'The Coqualeetza Residential School in Sardis operated from 1889 to 1940. Following the residential school era, the Sixties Scoop saw thousands of Coast Salish children removed from their families by child welfare agencies. This systematic removal caused profound intergenerational trauma.'
        },
        {
          heading: 'Urban Indigenous Rights',
          content: 'The Musqueam, Tsleil-Waututh, and Tsawwassen First Nations all have territories overlapping Vancouver. In 2014, the Tsilhqot\'in Nation won a landmark Supreme Court case establishing Aboriginal title. The Coast Salish have developed innovative models of urban Indigenous governance.'
        }
      ],
      sources: [
        'Sto:lo Nation',
        'Musqueam Indian Band',
        'Carlson, K.T. — A Sto:lo Coast Salish Historical Atlas',
        'Truth and Reconciliation Commission of Canada'
      ]
    }
  },
  {
    id: 'ca-ab-blackfoot',
    name: 'Blackfoot Confederacy of Alberta',
    indigenousName: 'Niitsitapi',
    alternateNames: [],
    country: 'Alberta',
    countryCode: 'CA-AB',
    location: 'Southern Alberta — from Rocky Mountains to Saskatchewan border',
    coordinates: [-115.0, 55.0],
    population: '~25,000 Blackfoot in Alberta',
    language: 'Blackfoot — critically endangered; Algonquian family',
    languageFamily: 'Algonquian',
    status: 'Three nations: Kainai, Piikani, Siksika; Treaty 7 signatories',
    history: 'The Blackfoot Confederacy consists of the Siksika, Kainai, Piikani, and Aamskapi Pikani. Their traditional territory spans southern Alberta and northern Montana. They were Plains people whose way of life centered on the buffalo. They signed Treaty 7 in 1877. The Blackfoot have maintained strong cultural traditions including the Sun Dance and have been leaders in Indigenous education.',
    currentIssues: 'The decline of buffalo herds devastated the Blackfoot way of life. Treaty rights and land claims remain central issues. Language revitalization is critical with fewer than 5,000 fluent speakers. The Blackfoot Crossing Historical Park is a world-class cultural center.',
    resources: [
      'https://www.siksikanation.com/',
      'https://www.kainaination.com/',
      'https://www.piikani.org/'
    ],
    category: 'Blackfoot',
    researchDocument: {
      title: 'Niitsitapi: The Real People',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Alberta',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Niitsitapi: The Real People',
          content: 'The Blackfoot Confederacy — Niitsitapi, meaning \'the real people\' — consists of four nations. Their traditional territory spans southern Alberta and northern Montana. This territory encompasses the foothills and plains that were home to massive buffalo herds.'
        },
        {
          heading: 'The Buffalo: Center of Blackfoot Life',
          content: 'The buffalo was the foundation of Blackfoot life — providing food, shelter, clothing, tools, and spiritual sustenance. Head-Smashed-In Buffalo Jump in southwest Alberta is a UNESCO World Heritage Site used for over 6,000 years. The buffalo\'s decline in the late 19th century was catastrophic.'
        },
        {
          heading: 'Treaty 7',
          content: 'In 1877, Crowfoot and other chiefs signed Treaty 7 with the Canadian Crown. The treaty established reserves in southern Alberta. However, the Canadian government failed to fulfill most obligations. The Blackfoot were confined to reserves that were a fraction of their traditional territory.'
        },
        {
          heading: 'Cultural Renaissance',
          content: 'Despite colonization, the Blackfoot have maintained strong cultural traditions. The Blackfoot language immersion programs are producing new speakers. The Blackfoot Crossing Historical Park showcases Blackfoot history and culture. The Blackfoot have been leaders in repatriation efforts.'
        }
      ],
      sources: [
        'Siksika Nation',
        'Kainai Nation',
        'Blackfoot Crossing Historical Park',
        'Treaty 7 Management Corporation',
        'Dempsey, H.A. — Crowfoot: Chief of the Blackfeet'
      ]
    }
  },
  {
    id: 'ca-mb-cree',
    name: 'Cree of Manitoba',
    indigenousName: 'Iyiyiw',
    alternateNames: [],
    country: 'Manitoba',
    countryCode: 'CA-MB',
    location: 'Northern Manitoba — boreal forest and subarctic tundra',
    coordinates: [-97.0, 55.0],
    population: '~55,000 Cree in Manitoba',
    language: 'Cree — Algonquian family',
    languageFamily: 'Algonquian',
    status: 'Multiple First Nations; Treaty 5 and Treaty 9 signatories',
    history: 'The Cree have inhabited northern Manitoba for thousands of years, living as hunter-gatherers in the boreal forest. They signed Treaty 5 (1875) and Treaty 9 (1905-1906) with the Crown. The Cree of Manitoba have maintained strong connections to the land, particularly around Lake Winnipeg, Lake Manitoba, and the Saskatchewan River. They were central participants in the fur trade, working as trappers and guides for the Hudson\'s Bay Company.',
    currentIssues: 'Hydroelectric development, particularly the Lake Winnipeg Regulation and Churchill River Diversion, has flooded thousands of square kilometers of Cree territory. Climate change is affecting traditional hunting and fishing. Language revitalization efforts are ongoing.',
    resources: [
      'https://www.mcnna.com/',
      'https://www.manitobachiefs.com/'
    ],
    category: 'Cree',
    researchDocument: {
      title: 'Cree Territory in Manitoba',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Manitoba',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Cree Territory in Manitoba',
          content: 'The Cree of Manitoba have inhabited the boreal forests and lake systems of northern Manitoba for millennia. Their territory encompasses the shores of Lake Winnipeg, Lake Manitoba, and Lake Winnipegosis, as well as the Saskatchewan and Churchill River systems.'
        },
        {
          heading: 'Treaties and Self-Governance',
          content: 'The Cree of Manitoba are signatories to Treaty 5 and Treaty 9. These treaties established reserves and promised annuities, but like all treaties, were based on different understandings by each party. Today, Cree First Nations in Manitoba operate their own governments and provide services to their communities.'
        }
      ],
      sources: [
        'Manitoba Cree Nations',
        'Treaty 5 and Treaty 9 documents'
      ]
    }
  },
  {
    id: 'ca-sk-dakota',
    name: 'Dakota of Saskatchewan',
    indigenousName: 'Dakota',
    alternateNames: [],
    country: 'Saskatchewan',
    countryCode: 'CA-SK',
    location: 'Southern Saskatchewan — prairie and parkland',
    coordinates: [-106.0, 55.0],
    population: '~3,000 Dakota in Saskatchewan',
    language: 'Dakota — Siouan family',
    languageFamily: 'Siouan',
    status: 'No federal recognition; fighting for status since 1870s',
    history: 'The Dakota (Sioux) migrated to Saskatchewan in the 1860s-1870s, fleeing American military campaigns after the US-Dakota War of 1862. They sought refuge with British authorities and were granted land around the Qu\'Appelle Valley and near Prince Albert. However, they were never granted treaty status by Canada and have fought for recognition ever since. The Dakota are exceptional among Canadian Indigenous peoples in having no federal recognition or reserve lands.',
    currentIssues: 'The Dakota continue to fight for federal recognition and treaty rights. Without status, they lack access to many services available to other First Nations. They maintain their Dakota language, ceremonies, and cultural traditions despite these challenges.',
    resources: [
      'https://dakotaofoakriver.org/',
      'https://www.saskdakota.com/'
    ],
    category: 'Dakota',
    researchDocument: {
      title: 'Dakota Refugees in Canada',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Saskatchewan',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Dakota Refugees in Canada',
          content: 'The Dakota arrived in Saskatchewan as refugees from American military campaigns. After the US-Dakota War of 1862, thousands of Dakota fled north seeking British protection. They were settled near Fort Qu\'Appelle and Prince Albert but were never granted treaty status.'
        },
        {
          heading: 'Fight for Recognition',
          content: 'The Dakota have fought for federal recognition since the 1870s. In 2021, the federal government began negotiating with some Dakota communities, but full recognition remains elusive. The Dakota maintain their language and ceremonies despite lacking government support.'
        }
      ],
      sources: [
        'Dakota Nations of Saskatchewan',
        'Sprague, D. — \'Canada and the Metis\''
      ]
    }
  },
  {
    id: 'ca-ns-mikmaq',
    name: 'Mi\'kmaq of Nova Scotia',
    indigenousName: 'L\'nu',
    alternateNames: [],
    country: 'Nova Scotia',
    countryCode: 'CA-NS',
    location: 'Nova Scotia, New Brunswick, PEI, Newfoundland — Mi\'kma\'ki',
    coordinates: [-63.0, 45.0],
    population: '~25,000 Mi\'kmaq in Nova Scotia',
    language: 'Mi\'kmaq — Algonquian family; revitalization active',
    languageFamily: 'Algonquian',
    status: '13 Mi\'kmaq First Nations in Nova Scotia; Peace and Friendship Treaties',
    history: 'The Mi\'kmaq (L\'nu — \'the people\') have inhabited Mi\'kma\'ki — their traditional territory spanning Nova Scotia, New Brunswick, Prince Edward Island, Newfoundland, and parts of Quebec and Maine — for over 10,000 years. They were among the first Indigenous peoples to encounter European explorers, establishing trading relationships with the French in the 16th century. The Mi\'kmaq signed Peace and Friendship Treaties with the British Crown between 1725 and 1779. Unlike the numbered treaties, these did not involve surrender of land — they were agreements of peace and trade. The Mi\'kmaq were never conquered militarily. The Marshall decision (1999) affirmed Mi\'kmaq treaty rights to fish and trade for a \'moderate livelihood.\'',
    currentIssues: 'The Marshall decision implementation remains contested — Mi\'kmaq fishers face violent opposition from non-Indigenous commercial fishers. The 2020 lobster dispute at Saulnierville brought international attention. The Mi\'kmaq are working to revitalize their language through immersion schools. The National Inquiry into Missing and Murdered Indigenous Women highlighted ongoing violence. The Sipekne\'katik First Nation has been at the forefront of asserting treaty fishing rights.',
    resources: [
      'https://www.mikmawbn.ca/',
      'https://www.nsms.com/'
    ],
    category: 'Mi\'kmaq',
    researchDocument: {
      title: 'Mi\'kma\'ki: The Homeland',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Nova Scotia',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Mi\'kma\'ki: The Homeland',
          content: 'The Mi\'kmaq have inhabited Mi\'kma\'ki for over 10,000 years. Their territory encompasses the Maritime provinces and parts of Quebec and Maine. They were expert canoeists, fishermen, and traders, maintaining extensive trade networks throughout the Atlantic region.'
        },
        {
          heading: 'Peace and Friendship Treaties',
          content: 'The Mi\'kmaq signed Peace and Friendship Treaties with the British Crown between 1725 and 1779. These treaties did not involve land surrender — they were agreements of peace, trade, and alliance. The Mi\'kmaq were never conquered militarily.'
        },
        {
          heading: 'The Marshall Decision',
          content: 'In 1999, the Supreme Court of Canada ruled in R. v. Marshall that the Mi\'kmaq have a treaty right to fish and trade for a \'moderate livelihood.\' This landmark decision affirmed Mi\'kmaq treaty rights but has faced violent opposition from non-Indigenous commercial fishers.'
        }
      ],
      sources: [
        'Mi\'kmaq Confederacy',
        'Marshall Decision (1999)',
        'Wicken, W. — Mi\'kmaq Treaties on Trial'
      ]
    }
  },
  {
    id: 'ca-nb-wolastoqiyik',
    name: 'Wolastoqiyik (Maliseet-Passamaquoddy) of New Brunswick',
    indigenousName: 'Wolastoqiyik',
    alternateNames: [],
    country: 'New Brunswick',
    countryCode: 'CA-NB',
    location: 'Saint John River Valley (Wolastoq) — New Brunswick and Maine',
    coordinates: [-66.5, 46.5],
    population: '~3,000 Wolastoqiyik in New Brunswick',
    language: 'Wolastoqey-Passamaquoddy — critically endangered; Algonquian family',
    languageFamily: 'Algonquian',
    status: 'Wolastoqey Nation — fighting for recognition of title to Wolastoq watershed',
    history: 'The Wolastoqiyik (People of the Beautiful River) have lived along the Wolastoq (Saint John River) for thousands of years. They are part of the Wabanaki Confederacy, which includes the Mi\'kmaq, Passamaquoddy, Penobscot, and Abenaki. The Wolastoqiyik signed Peace and Friendship Treaties with the British Crown. They are currently fighting for recognition of their title to the entire Wolastoq watershed, arguing that they never surrendered their territory. In 2023, the government of New Brunswick began negotiations toward a modern treaty.',
    currentIssues: 'Title to the Wolastoq watershed is the central issue. Language revitalization is critical — fewer than 100 fluent Wolastoqey speakers remain. The Wolastoq Grand Council represents the nation in negotiations. They are also fighting against the Sisson Brook tungsten and molybdenum mine, which threatens their territory.',
    resources: [
      'https://wolastoqeynation.org/',
      'https://www.wolastoqey.ca/'
    ],
    category: 'Wolastoqiyik',
    researchDocument: {
      title: 'Wolastoq: The Beautiful River',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of New Brunswick',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Wolastoq: The Beautiful River',
          content: 'The Wolastoqiyik have lived along the Wolastoq for thousands of years. The river provided salmon, sturgeon, and other fish, and the fertile valley supported agriculture. They are part of the Wabanaki Confederacy, a political alliance of Eastern Algonquian peoples.'
        },
        {
          heading: 'Modern Treaty Negotiations',
          content: 'The Wolastoqiyik are fighting for recognition of their title to the entire Wolastoq watershed. In 2023, the New Brunswick government began negotiations toward a modern treaty. This could be a landmark agreement recognizing Indigenous title in the Atlantic provinces.'
        }
      ],
      sources: [
        'Wolastoq Grand Council',
        'Wolastoqey Nation',
        'Wabanaki Confederacy'
      ]
    }
  },
  {
    id: 'ca-nl-innu',
    name: 'Innu of Newfoundland & Labrador',
    indigenousName: 'Innu',
    alternateNames: [],
    country: 'Newfoundland & Labrador',
    countryCode: 'CA-NL',
    location: 'Labrador — Nitassinan (the homeland), from Quebec border to Labrador Sea',
    coordinates: [-60.0, 53.0],
    population: '~3,000 Innu in Labrador',
    language: 'Innu-aimun — Algonquian family; critically endangered',
    languageFamily: 'Algonquian',
    status: 'Two Innu First Nations in Labrador; fighting for land rights',
    history: 'The Innu (meaning \'human being\' or \'person\') have inhabited Nitassinan — their homeland in Labrador and eastern Quebec — for thousands of years. They are traditionally nomadic caribou hunters, following the migratory herds across the Labrador plateau. The Innu were among the last Indigenous peoples in Canada to be settled on reserves, with many continuing their nomadic lifestyle into the 1960s. The forced settlement of Innu communities in the 1960s-1970s caused massive social disruption, leading to substance abuse, suicide, and cultural breakdown. The Innu have never signed a treaty with the Crown and assert Aboriginal title to all of Nitassinan.',
    currentIssues: 'The Innu face severe social crises resulting from forced settlement, including high rates of suicide and substance abuse. Land rights remain unresolved — the Innu are negotiating a land claims agreement. The Muskrat Falls hydroelectric project has flooded Innu territory without adequate consultation. The Canadian government established a residential school at North West River that caused intergenerational trauma. Language revitalization is critical.',
    resources: [
      'https://www.innu.ca/',
      'https://www.itum.ca/'
    ],
    category: 'Innu',
    researchDocument: {
      title: 'Nitassinan: The Innu Homeland',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Newfoundland & Labrador',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Nitassinan: The Innu Homeland',
          content: 'The Innu have inhabited Nitassinan for thousands of years as nomadic caribou hunters. They followed the migratory herds across the Labrador plateau, living in tents and hunting camps. This way of life continued into the 1960s, making them among the last nomadic peoples in North America.'
        },
        {
          heading: 'Forced Settlement and Its Consequences',
          content: 'In the 1960s-1970s, the Canadian and provincial governments forced the Innu to settle in permanent communities. This caused massive social disruption, as people were cut off from their traditional way of life. The communities of Sheshatshiu and Davis Inlet became notorious for social problems.'
        },
        {
          heading: 'Land Rights and Modern Negotiations',
          content: 'The Innu have never signed a treaty and assert title to all of Nitassinan. They are currently negotiating a land claims agreement with Canada and Newfoundland & Labrador. The Muskrat Falls hydroelectric project has flooded Innu territory, adding urgency to these negotiations.'
        }
      ],
      sources: [
        'Innu Nation',
        'Samson, C. — \'A Way of Life that Does Not Exist\'',
        'Armitage, P. — \'The Innu\''
      ]
    }
  },
  {
    id: 'ca-nu-inuit',
    name: 'Inuit of Nunavut',
    indigenousName: 'Inuit',
    alternateNames: [],
    country: 'Nunavut',
    countryCode: 'CA-NU',
    location: 'Canadian Arctic — Nunavut, from Hudson Bay to the High Arctic islands',
    coordinates: [-95.0, 70.0],
    population: '~36,000 Inuit in Nunavut — majority of the territory\'s population',
    language: 'Inuktitut, Inuinnaqtun — official languages of Nunavut',
    languageFamily: 'Eskimo-Aleut',
    status: 'Nunavut — created in 1999 as an Inuit territory; self-governing',
    history: 'The Inuit have inhabited the Canadian Arctic for over 4,000 years, descendants of the Thule people who migrated from Alaska. They developed one of the world\'s most remarkable adaptations to extreme cold, with sophisticated technologies for hunting, shelter, and travel. The Inuit are skilled hunters of seal, walrus, narwhal, polar bear, and caribou. They were largely unaffected by European contact until the 19th century, when whalers, missionaries, and traders arrived. The Canadian government forcibly relocated Inuit families to the High Arctic in the 1950s to assert sovereignty. The creation of Nunavut in 1999 — the largest land claims settlement in Canadian history — represented a historic achievement in Indigenous self-governance. The Nunavut Land Claims Agreement gave the Inuit title to 353,000 square kilometers of land and $1.9 billion in compensation.',
    currentIssues: 'Climate change is the most pressing issue — warming temperatures are melting sea ice, threatening traditional hunting and travel. Food security is a major concern, with extremely high prices for imported food and declining access to traditional foods. Housing shortages are severe, with many families living in overcrowded conditions. High rates of suicide, particularly among youth. The legacy of residential schools (including the notorious Joseph Bernier Federal Day School) and forced relocation continues to cause intergenerational trauma. However, the Inuit are leaders in Arctic governance, with the Inuit Circumpolar Council representing Inuit internationally.',
    resources: [
      'https://www.gov.nu.ca/',
      'https://www.tunngavik.com/',
      'https://www.inuitcircumpolar.com/'
    ],
    category: 'Inuit',
    researchDocument: {
      title: 'The Inuit Arctic: 4,000 Years of Adaptation',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Nunavut',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'The Inuit Arctic: 4,000 Years of Adaptation',
          content: 'The Inuit have inhabited the Canadian Arctic for over 4,000 years. They are descendants of the Thule people who migrated from Alaska around 1000 CE, bringing with them advanced technologies including the dogsled, the kayak, and the toggling harpoon head. These technologies allowed the Inuit to thrive in one of the world\'s most extreme environments.'
        },
        {
          heading: 'Forced Relocations and Colonialism',
          content: 'In the 1950s, the Canadian government forcibly relocated Inuit families to the High Arctic to assert Canadian sovereignty. Families were moved from northern Quebec to Resolute Bay and Grise Fiord — some of the most inhospitable places on Earth — with false promises of return. These relocations caused immense suffering and intergenerational trauma.'
        },
        {
          heading: 'The Creation of Nunavut',
          content: 'The creation of Nunavut in 1999 was the largest land claims settlement in Canadian history. The Nunavut Land Claims Agreement gave the Inuit title to 353,000 square kilometers of land and $1.9 billion. Nunavut is a public government (not an Indigenous government) but is designed to reflect Inuit culture and values.'
        },
        {
          heading: 'Climate Change Crisis',
          content: 'Climate change is devastating Inuit communities. Melting sea ice makes traditional travel increasingly dangerous and unpredictable. Changing animal migration patterns affect hunting. Permafrost thaw is damaging infrastructure. The Inuit are among the first peoples to experience the dramatic impacts of global warming, despite having contributed virtually nothing to its causes.'
        }
      ],
      sources: [
        'Nunavut Tunngavik Incorporated',
        'Government of Nunavut',
        'Inuit Circumpolar Council',
        'Tester, F. & Kulchyski, P. — \'Tammarniit (Mistakes)\'',
        'Damas, D. — \'Arctic Migrants/Arctic Villagers\''
      ]
    }
  }
]

// ══════════════════════════════════════════════════════════════
// MEXICO — RESEARCHED 2025-07-09
// ══════════════════════════════════════════════════════════════
export const mexicoNations: IndigenousNation[] = [
  {
    id: 'mx-oax-zapotec',
    name: 'Zapotec of Oaxaca',
    indigenousName: 'Be\'ena\'a',
    alternateNames: [],
    country: 'Oaxaca',
    countryCode: 'MX-OAX',
    location: 'Central Valleys of Oaxaca — Zapotec highlands and Isthmus of Tehuantepec',
    coordinates: [-96.5, 17.0],
    population: '~450,000 Zapotec in Oaxaca — one of Mexico\'s largest Indigenous groups',
    language: 'Zapotec — over 60 variants; Oto-Manguean family',
    languageFamily: 'Oto-Manguean',
    status: 'Recognized Indigenous people with strong cultural institutions',
    history: 'The Zapotec are one of Mexico\'s oldest continuous civilizations, with archaeological evidence at Monte Alban dating back to 500 BCE. They built one of the earliest urban centers in Mesoamerica at Monte Alban, which flourished from 500 BCE to 750 CE. The Zapotec developed their own writing system, calendar, and political organization. They successfully resisted Aztec conquest, maintaining their independence until the Spanish arrived in 1521. The Zapotec have maintained their cultural identity through centuries of colonization, with strong communities in the Central Valleys, the Isthmus of Tehuantepec, and the Sierra Juarez. They are known for their weaving, pottery, and complex communal governance systems based on usos y costumbres (customary law).',
    currentIssues: 'Migration to the United States has significantly affected Zapotec communities, with many towns having large diaspora populations in California. The usos y costumbres system of governance is recognized in Oaxaca but faces challenges from political parties. Language revitalization is critical — while many Zapotec still speak their language, variants are endangered. Wind energy projects on the Isthmus of Tehuantepec have displaced Zapotec communities without adequate consultation.',
    resources: [
      'https://www.oaxaca.gob.mx/',
      'https://www.inali.gob.mx/'
    ],
    category: 'Zapotec',
    researchDocument: {
      title: 'Monte Alban: Ancient Zapotec Civilization',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Oaxaca',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Monte Alban: Ancient Zapotec Civilization',
          content: 'The Zapotec built Monte Alban around 500 BCE, one of the earliest cities in Mesoamerica. The site features monumental architecture, ball courts, and hieroglyphic inscriptions. At its peak, Monte Alban had a population of approximately 25,000 and dominated the Oaxaca valley.'
        },
        {
          heading: 'Usos y Costumbres: Zapotec Governance',
          content: 'The Zapotec maintain their traditional governance system known as usos y costumbres — customary law based on community assemblies and service rotation (tequio). This system was recognized by the state of Oaxaca in 1995, allowing communities to elect authorities through traditional processes rather than political parties.'
        },
        {
          heading: 'Zapotec Diaspora and Migration',
          content: 'Large-scale Zapotec migration to the United States began in the 1980s. Today, an estimated 100,000+ Zapotec live in California, particularly in the Central Valley and Los Angeles area. This diaspora maintains strong connections to home communities, sending remittances and participating in transnational governance.'
        }
      ],
      sources: [
        'Monte Alban Archaeological Site',
        'Oaxaca State Government',
        'INALI — National Indigenous Languages Institute'
      ]
    }
  },
  {
    id: 'mx-chp-maya',
    name: 'Tzotzil and Tzeltal Maya of Chiapas',
    indigenousName: 'Jchi\'iel Xch\'uk Xch\'ulelbal',
    alternateNames: [],
    country: 'Chiapas',
    countryCode: 'MX-CHP',
    location: 'Chiapas Highlands — Zinacantan, Chamula, San Cristobal de las Casas region',
    coordinates: [-93.0, 16.5],
    population: '~750,000 Tzotzil and Tzeltal combined — largest Indigenous groups in Chiapas',
    language: 'Tzotzil and Tzeltal — Mayan family; both actively spoken',
    languageFamily: 'Mayan',
    status: 'Strong cultural and political organizations; EZLN Zapatista movement origin',
    history: 'The Tzotzil and Tzeltal Maya have inhabited the Chiapas highlands for millennia. They are descendants of the Classic Maya civilization that built great cities like Palenque and Yaxchilan. When the Spanish arrived in the 16th century, the highland Maya were never fully conquered, maintaining their communities in the rugged mountains. In 1994, the Zapatista Army of National Liberation (EZLN) emerged from Tzotzil, Tzeltal, and Tojolabal communities, launching an uprising that brought international attention to Indigenous rights in Mexico. The Zapatistas established autonomous municipalities governed by traditional Indigenous councils (caracoles).',
    currentIssues: 'The Zapatista movement continues to operate autonomous municipalities, though with reduced visibility since 2000. Paramilitary violence against Indigenous communities remains a serious threat. Coca-Cola and other corporations have been accused of over-extracting water from Chiapas aquifers, affecting Maya communities. Migration to the US and internal displacement are ongoing. Evangelical Christianity has created tensions with traditional Catholic-Maya syncretic practices.',
    resources: [
      'https://enlacezapatista.ezln.org.mx/',
      'https://www.laneta.apc.org/fzln/'
    ],
    category: 'Maya',
    researchDocument: {
      title: 'Highland Maya Civilization',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Chiapas',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Highland Maya Civilization',
          content: 'The Tzotzil and Tzeltal are descendants of the Classic Maya. While lowland cities like Palenque were abandoned, the highland communities continued to thrive. They maintained their languages, agricultural practices, and religious traditions through the colonial period and into the modern era.'
        },
        {
          heading: 'The Zapatista Uprising',
          content: 'On January 1, 1994, the EZLN launched an uprising in Chiapas, capturing San Cristobal de las Casas and several other towns. The movement, led by Subcomandante Marcos, brought international attention to Indigenous rights. The Zapatistas established autonomous municipalities governed by traditional councils (caracoles), creating a model of Indigenous self-governance.'
        },
        {
          heading: 'Contemporary Challenges',
          content: 'Paramilitary violence, resource extraction, and climate change threaten Maya communities. The Zapatista autonomous municipalities continue to operate schools, clinics, and justice systems independent of the Mexican government. Water scarcity is an increasing concern.'
        }
      ],
      sources: [
        'EZLN Official Website',
        'Collier, G. & Quaratiello, E. — \'Basta! Land and the Zapatista Rebellion\'',
        'Rus, J. — \'The Maya\''
      ]
    }
  },
  {
    id: 'mx-yuc-maya',
    name: 'Yucatec Maya',
    indigenousName: 'Maya',
    alternateNames: [],
    country: 'Yucatan',
    countryCode: 'MX-YUC',
    location: 'Yucatan Peninsula — Yucatan, Campeche, Quintana Roo states',
    coordinates: [-89.0, 20.8],
    population: '~900,000 Yucatec Maya — largest Maya group',
    language: 'Yucatec Maya — Mayan family; ~800,000 speakers',
    languageFamily: 'Mayan',
    status: 'Strong cultural identity; many communities maintain traditional practices',
    history: 'The Yucatec Maya are direct descendants of the civilization that built Chichen Itza, Uxmal, and countless other cities. They survived the Spanish conquest and the subsequent Caste War (1847-1901), one of the longest and most successful Indigenous revolts in the Americas. During the Caste War, Maya rebels established an independent state in eastern Yucatan centered on the Talking Cross shrine at Chan Santa Cruz. This independent Maya territory was not fully conquered by Mexico until 1901. The Yucatec Maya have maintained their language, agricultural practices (milpa farming), and religious traditions.',
    currentIssues: 'Tourism development on the Maya Riviera threatens traditional communities and sacred sites. The Tren Maya (Mayan Train) railway project has faced opposition from Maya communities. Land rights conflicts with large-scale agriculture (henequen, sisal) continue. The 2012 \'end of the world\' hype commodified Maya culture. Climate change and hurricanes increasingly affect the peninsula.',
    resources: [
      'https://www.yucatan.gob.mx/',
      'https://www.inali.gob.mx/'
    ],
    category: 'Maya',
    researchDocument: {
      title: 'Ancient Yucatec Civilization',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Yucatan',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Ancient Yucatec Civilization',
          content: 'The Yucatec Maya built magnificent cities including Chichen Itza, Uxmal, and Mayapan. They developed advanced mathematics, astronomy, and hieroglyphic writing. Their descendants continue to live on the same land, maintaining agricultural and ceremonial traditions.'
        },
        {
          heading: 'The Caste War',
          content: 'The Caste War (1847-1901) was one of the longest Indigenous revolts in the Americas. Maya rebels established an independent state in eastern Yucatan centered on the Talking Cross shrine. This territory was not fully conquered by Mexico until 1901, and Maya resistance continued for decades.'
        },
        {
          heading: 'Modern Challenges',
          content: 'Tourism and mega-projects like the Tren Maya threaten Maya communities. The commodification of Maya culture for tourism raises concerns about cultural appropriation. However, the Yucatec Maya maintain strong communities and actively defend their land and culture.'
        }
      ],
      sources: [
        'Reed, N. — \'The Caste War of Yucatan\'',
        'Restall, M. — \'The Maya World\'',
        'INEGI/INALI'
      ]
    }
  },
  {
    id: 'mx-gro-nahua',
    name: 'Nahua of Guerrero',
    indigenousName: 'Nahuatlatolli',
    alternateNames: [],
    country: 'Guerrero',
    countryCode: 'MX-GRO',
    location: 'Guerrero state — Mountain regions, Costa Chica, Costa Grande',
    coordinates: [-100.0, 17.5],
    population: '~200,000 Nahua in Guerrero',
    language: 'Nahuatl — Uto-Aztecan family; ~200,000 speakers in Guerrero',
    languageFamily: 'Uto-Aztecan',
    status: 'Recognized Indigenous people; strong communities in mountainous regions',
    history: 'The Nahua are descendants of the Mexica (Aztecs) and related peoples who dominated central Mexico before the Spanish conquest. When the Aztec Empire fell in 1521, Nahua communities survived throughout the region. In Guerrero, Nahua communities maintained their independence in the rugged mountains, resisting Spanish control for decades. The Nahua of Guerrero are known for their traditional medicine, agriculture (milpa farming), and oral traditions. They maintained Nahuatl as a community language long after Spanish became dominant in urban areas.',
    currentIssues: 'Drug cartel violence has devastated Nahua communities in Guerrero. The disappearance of 43 students from Ayotzinapa in 2014 — most from Nahua communities — brought international attention. Nahutl language transmission is declining among youth. Migration to the US and Mexican cities fragments communities. Mining projects threaten traditional territories.',
    resources: [
      'https://www.guerrero.gob.mx/',
      'https://www.inali.gob.mx/'
    ],
    category: 'Nahua',
    researchDocument: {
      title: 'Nahua Heritage in Guerrero',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Guerrero',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Nahua Heritage in Guerrero',
          content: 'The Nahua of Guerrero are descendants of the Aztec Empire\'s expansion. They maintained their communities in the rugged mountains of Guerrero, developing distinct traditions while preserving their language. The milpa agricultural system — growing corn, beans, and squash together — remains central to Nahua life.'
        },
        {
          heading: 'Violence and Displacement',
          content: 'Guerrero is one of Mexico\'s most violent states due to drug cartel activity. Nahua communities are caught in the crossfire. The disappearance of the 43 Ayotzinapa students in 2014 — mostly from Nahua communities — highlighted the vulnerability of Indigenous peoples to violence.'
        },
        {
          heading: 'Language and Cultural Survival',
          content: 'Nahuatl remains widely spoken in rural Guerrero communities. Traditional medicine, oral histories, and agricultural practices are maintained. However, youth migration and Spanish-language media threaten language transmission. Community radio stations in Nahuatl help preserve the language.'
        }
      ],
      sources: [
        'INALI — National Indigenous Languages Institute',
        'Guerrero State Government'
      ]
    }
  },
  {
    id: 'mx-son-yaqui',
    name: 'Yaqui of Sonora',
    indigenousName: 'Yoemem',
    alternateNames: [],
    country: 'Sonora',
    countryCode: 'MX-SON',
    location: 'Yaqui River Valley — Sonora, from Ciudad Obregon to the coast',
    coordinates: [-110.5, 29.5],
    population: '~45,000 Yaqui in Mexico; ~20,000 in Arizona',
    language: 'Yaqui (Yoeme) — Uto-Aztecan family; actively spoken',
    languageFamily: 'Uto-Aztecan',
    status: 'Eight Yaqui pueblos with autonomous governance; recognized by Mexican government',
    history: 'The Yaqui (Yoemem — \'the people\') have inhabited the Yaqui River Valley for over 2,000 years. They developed an intensive agricultural system based on the Yaqui River\'s seasonal flooding, creating one of the most productive farming regions in northwest Mexico. The Yaqui fiercely resisted Spanish, Mexican, and American colonization, fighting a series of wars from 1533 to 1929. They were never fully conquered, maintaining control of their river valley. The Yaqui Wars are among the longest Indigenous resistance campaigns in the Americas. In the early 20th century, thousands of Yaqui were deported to Yucatan as slave labor. Many fled to Arizona, where the Pascua Yaqui Community is now federally recognized in the United States.',
    currentIssues: 'Water rights are the central issue — the Yaqui River has been diverted for agricultural and urban use, reducing water available to Yaqui farms. The Independence Aqueduct project transfers water from the Yaqui River to Hermosillo, threatening Yaqui agriculture. Drug cartel violence affects the region. The Yaqui maintain their eight traditional pueblos (Vicam, Torim, Bacum, Potam, Rahum, Huirivis, Belem, and Cocorit), each with its own governor and traditional council.',
    resources: [
      'https://www.sonora.gob.mx/',
      'https://www.pascuayaqui-nsn.gov/'
    ],
    category: 'Yaqui',
    researchDocument: {
      title: 'The Yaqui River: Heart of Yaqui Identity',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Sonora',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'The Yaqui River: Heart of Yaqui Identity',
          content: 'The Yaqui River Valley has been the center of Yaqui life for over 2,000 years. The Yaqui developed sophisticated irrigation agriculture, creating one of the most productive farming regions in northwest Mexico. Their eight pueblos (Vicam, Torim, Bacum, Potam, Rahum, Huirivis, Belem, Cocorit) each have autonomous governance.'
        },
        {
          heading: 'The Yaqui Wars: 400 Years of Resistance',
          content: 'The Yaqui resisted colonization from 1533 to 1929 — nearly 400 years. They were never fully conquered by Spain, Mexico, or the United States. In the early 20th century, thousands of Yaqui were deported to Yucatan as slave labor. Many fled to Arizona, establishing the community that would become the Pascua Yaqui Tribe.'
        },
        {
          heading: 'Water Rights Crisis',
          content: 'The Yaqui River has been diverted for urban and agricultural use. The Independence Aqueduct transfers water to Hermosillo. The Yaqui have fought these diversions through courts and protests, but water scarcity threatens their traditional agriculture. This is a classic case of Indigenous water rights versus urban development.'
        }
      ],
      sources: [
        'Spicer, E. — \'The Yaquis: A Cultural History\'',
        'Pascua Yaqui Tribe',
        'Sonora State Government'
      ]
    }
  }
]

// ══════════════════════════════════════════════════════════════
// CENTRAL AMERICA — RESEARCHED 2025-07-09
// ══════════════════════════════════════════════════════════════
export const centralAmericaNations: IndigenousNation[] = [
  {
    id: 'gt-kiche',
    name: 'K\'iche\' Maya of Guatemala',
    indigenousName: 'K\'iche',
    alternateNames: [],
    country: 'Guatemala',
    countryCode: 'GT',
    location: 'Guatemalan Highlands — Quiche, Totonicapan, Solola departments',
    coordinates: [-90.5, 15.8],
    population: '~1.2 million K\'iche\' — largest Maya group in Guatemala',
    language: 'K\'iche\' — Mayan family; over 1 million speakers',
    languageFamily: 'Mayan',
    status: 'Recognized Indigenous people; strong cultural institutions',
    history: 'The K\'iche\' (Quiche) Maya created one of the most powerful post-Classic Maya kingdoms, centered at Q\'umarkaj (Utatlan) in the Guatemalan highlands. They composed the Popol Vuh — the sacred book of the Maya — one of the most important literary works of the Americas. The K\'iche\' resisted Spanish conquest under Tecun Uman, who died fighting Pedro de Alvarado in 1524 and is now Guatemala\'s national hero. During the Guatemalan Civil War (1960-1996), K\'iche\' communities in the Ixil Triangle suffered genocide under military dictator Efrain Rios Montt. In 2013, Rios Montt was convicted of genocide against the Ixil Maya — the first time a former head of state was convicted of genocide in his own country.',
    currentIssues: 'The legacy of the genocide continues to affect K\'iche\' communities. Land rights conflicts with large-scale agriculture (sugar, palm oil) and mining are ongoing. Migration to the US has increased due to poverty and violence. The Xinka and K\'iche\' have opposed the Escobal silver mine. Water contamination from mining threatens communities.',
    resources: [
      'https://www.popolvuh.ufl.edu/',
      'https://www.ghrc-usa.org/'
    ],
    category: 'Maya',
    researchDocument: {
      title: 'The Popol Vuh and K\'iche\' Civilization',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Guatemala',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'The Popol Vuh and K\'iche\' Civilization',
          content: 'The K\'iche\' created one of the most powerful post-Classic Maya kingdoms at Q\'umarkaj. The Popol Vuh, composed in K\'iche\' Maya, is one of the great literary works of the Americas, containing creation myths, hero tales, and genealogies.'
        },
        {
          heading: 'Tecun Uman and Spanish Conquest',
          content: 'The K\'iche\' king Tecun Uman died fighting Pedro de Alvarado in 1524. He is now Guatemala\'s national hero. Despite his death, K\'iche\' resistance continued for years.'
        },
        {
          heading: 'Genocide and the Civil War',
          content: 'During the Guatemalan Civil War, K\'iche\' and Ixil communities suffered genocide. In 2013, Rios Montt was convicted of genocide — a landmark case. The conviction was later overturned on procedural grounds, but the trial established that genocide occurred.'
        }
      ],
      sources: [
        'Popol Vuh',
        'CEH — Historical Clarification Commission',
        'GHRC-USA'
      ]
    }
  },
  {
    id: 'bz-maya',
    name: 'Maya of Belize',
    indigenousName: 'Maya',
    alternateNames: [],
    country: 'Belize',
    countryCode: 'BZ',
    location: 'Southern Belize — Toledo District, Stann Creek',
    coordinates: [-88.8, 17.2],
    population: '~40,000 Maya in Belize (Kekchi, Mopan, Yucatec)',
    language: 'Kekchi, Mopan, Yucatec — Mayan family',
    languageFamily: 'Mayan',
    status: 'Recognized Indigenous people; 2015 consent judgment on land rights',
    history: 'The Maya have inhabited Belize for over 4,000 years, building major cities including Caracol, Lamanai, and Xunantunich. While the southern lowland cities were abandoned around 900 CE, Maya people continued to live in Belize. The Kekchi and Mopan Maya migrated to southern Belize from Guatemala in the 19th century to escape forced labor and persecution. The Yucatec Maya of northern Belize are descendants of refugees from the Caste War. In 2007, the Maya of southern Belize won a landmark case at the Inter-American Commission on Human Rights, which found that Belize had violated their rights by granting logging and oil concessions on their traditional lands without consent.',
    currentIssues: 'Implementation of the 2007 and 2015 land rights judgments remains incomplete. Oil exploration and logging threaten Maya territories in southern Belize. The Maya are fighting for Free, Prior, and Informed Consent (FPIC) for all development projects. Climate change and hurricanes increasingly affect coastal Maya communities.',
    resources: [
      'https://www.satim.org.bz/',
      'https://www.tole domaya.org/'
    ],
    category: 'Maya',
    researchDocument: {
      title: 'Ancient Maya Belize',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Belize',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Ancient Maya Belize',
          content: 'Belize was the heartland of ancient Maya civilization. Major cities like Caracol rivaled Tikal in power and size. Lamanai was continuously occupied for over 3,000 years — one of the longest continuously inhabited Maya cities.'
        },
        {
          heading: 'Land Rights Victory',
          content: 'In 2007, the Maya won a landmark case at the Inter-American Commission on Human Rights, which found Belize violated their rights by granting concessions without consent. A 2015 consent judgment recognized Maya customary land tenure.'
        },
        {
          heading: 'Ongoing Struggles',
          content: 'Implementation of land rights judgments remains incomplete. Oil exploration, logging, and development threaten Maya territories. The Maya are fighting for FPIC and territorial autonomy.'
        }
      ],
      sources: [
        'SATIIM — Sarstoon Temash Institute for Indigenous Management',
        'IACHR — Maya Indigenous Communities of the Toledo District v. Belize'
      ]
    }
  },
  {
    id: 'hn-lenca',
    name: 'Lenca of Honduras',
    indigenousName: 'Lenca',
    alternateNames: [],
    country: 'Honduras',
    countryCode: 'HN',
    location: 'Southwestern Honduras — Intibuca, La Paz, Lempira departments',
    coordinates: [-86.5, 14.8],
    population: '~100,000 Lenca — largest Indigenous group in Honduras',
    language: 'Lenca — language extinct; revival efforts ongoing',
    languageFamily: 'Isolate (unclassified)',
    status: 'Recognized Indigenous people; strong political organization (COPINH)',
    history: 'The Lenca are the largest Indigenous group in Honduras, inhabiting the mountainous regions of southwestern Honduras and eastern El Salvador. At the time of Spanish contact, the Lenca were organized into a confederation led by chief Lempira, who led a major uprising against Spanish colonization in the 1530s. Lempira was killed by the Spanish in 1537, but he remains a national hero of Honduras — the currency and a department are named after him. The Lenca are known for their traditional agriculture, particularly coffee cultivation, and their resistance to mining projects. COPINH (Civic Council of Popular and Indigenous Organizations of Honduras), founded by Berta Caceres, has been at the forefront of Indigenous environmental activism.',
    currentIssues: 'The murder of Berta Caceres in 2016 brought international attention to the dangers faced by Lenca activists. She was killed for opposing the Agua Zarca dam. Seven men were convicted, including employees of the dam company DESA. Mining and hydroelectric projects continue to threaten Lenca territories. The 2009 coup and subsequent governments have been hostile to Indigenous rights. Honduras has one of the highest murder rates of environmental defenders in the world.',
    resources: [
      'https://copinh.org/',
      'https://bertacaceres.org/'
    ],
    category: 'Lenca',
    researchDocument: {
      title: 'Lempira and Lenca Resistance',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Honduras',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Lempira and Lenca Resistance',
          content: 'Chief Lempira led a major uprising against Spanish colonization in the 1530s, uniting Lenca communities across southwestern Honduras. He was killed in 1537 but remains a national hero. The Lenca maintained their communities in the mountains, preserving their cultural identity.'
        },
        {
          heading: 'Berta Caceres and COPINH',
          content: 'Berta Caceres founded COPINH and led the successful campaign against the Agua Zarca dam. She was murdered in 2016. Her killers included employees of DESA, the dam company. The case highlighted the deadly risks faced by Indigenous environmental defenders in Honduras.'
        },
        {
          heading: 'Contemporary Struggles',
          content: 'Mining and hydroelectric projects continue to threaten Lenca territories. Honduras has one of the highest rates of violence against environmental defenders. The Lenca continue to fight for their land and water through COPINH and other organizations.'
        }
      ],
      sources: [
        'COPINH',
        'Berta Caceres Foundation',
        'Global Witness — Honduras'
      ]
    }
  },
  {
    id: 'pa-guna',
    name: 'Guna (Kuna) of Panama',
    indigenousName: 'Dule',
    alternateNames: [],
    country: 'Panama',
    countryCode: 'PA',
    location: 'Guna Yala (San Blas) — Caribbean coast and islands; Madugandí and Wargandí',
    coordinates: [-80.0, 8.5],
    population: '~80,000 Guna — one of Panama\'s largest Indigenous groups',
    language: 'Dulegaya — Chibchan family; actively spoken',
    languageFamily: 'Chibchan',
    status: 'Autonomous Guna Yala comarca since 1938 — one of the most autonomous Indigenous territories in Latin America',
    history: 'The Guna (also spelled Kuna or Dule) are one of the most politically organized Indigenous peoples in Latin America. They successfully rebelled against the Panamanian government in 1925 (the Guna Revolution), forcing recognition of their autonomy. The Guna Yala comarca (autonomous territory) was established in 1938, giving the Guna control over their land, governance, and economy. The Guna are known for their mola textiles — colorful reverse-applique panels that are internationally recognized as a major art form. They maintain a traditional political system led by sailas (chiefs) who govern through congresses. The Guna have also been at the forefront of climate change adaptation, planning the relocation of island communities threatened by rising seas.',
    currentIssues: 'Climate change and rising sea levels threaten Guna island communities. The Carti Sugdub community is planning to relocate to the mainland — one of the first planned climate relocations in Latin America. Tourism provides income but also brings cultural pressures. The Guna maintain strict control over tourism in their territory. Youth migration to Panama City threatens cultural transmission.',
    resources: [
      'https://www.congresogeneralguna.org/',
      'https://www.gunayala.org.pa/'
    ],
    category: 'Guna',
    researchDocument: {
      title: 'The Guna Revolution of 1925',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Panama',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'The Guna Revolution of 1925',
          content: 'The Guna successfully rebelled against the Panamanian government in 1925, after the government attempted to suppress Guna culture and traditions. This rebellion led to the establishment of the Guna Yala comarca in 1938 — one of the first autonomous Indigenous territories in Latin America.'
        },
        {
          heading: 'Mola Art and Cultural Identity',
          content: 'The Guna are internationally renowned for their mola textiles — intricate reverse-applique panels featuring geometric designs and animal motifs. Mola production is a key economic activity and a source of cultural pride. The designs have evolved from traditional body painting.'
        },
        {
          heading: 'Climate Change and Relocation',
          content: 'Rising sea levels threaten Guna island communities. Carti Sugdub is planning to relocate to the mainland — one of the first planned climate relocations in Latin America. The Guna are developing models for climate adaptation that maintain community cohesion.'
        }
      ],
      sources: [
        'Guna General Congress',
        'Howe, J. — \'The Kuna Gathering\'',
        'Sherzer, J. — \'Kuna Ways of Speaking\''
      ]
    }
  }
]

// ══════════════════════════════════════════════════════════════
// SOUTH AMERICA — RESEARCHED 2025-07-09
// ══════════════════════════════════════════════════════════════
export const southAmericaNations: IndigenousNation[] = [
  {
    id: 'br-tupi',
    name: 'Tupi-Guarani of Brazil',
    indigenousName: 'Nheengatu',
    alternateNames: [],
    country: 'Brazil',
    countryCode: 'BR',
    location: 'Amazon rainforest — Para, Amazonas, Amapa, Maranhao states',
    coordinates: [-55.0, -10.0],
    population: '~350,000 Tupi-Guarani in Brazil; ~6 million Guarani total across South America',
    language: 'Nheengatu (Lingua Geral), Guarani — Tupi-Guarani family',
    languageFamily: 'Tupi-Guarani',
    status: 'Hundreds of communities; some isolated groups facing extinction',
    history: 'The Tupi-Guarani peoples were among the most widespread Indigenous nations in South America at European contact. They inhabited the Atlantic coast of Brazil from the Amazon to the Rio de la Plata. The Tupi were the first Indigenous people encountered by the Portuguese, and their language, Tupinamba, became the basis for Nheengatu (Lingua Geral), a trade language that spread throughout the Amazon. The Tupi-Guarani developed a complex cosmology centered on the figure of the shaman and the search for the \'Land Without Evil\' — a promised land of immortality. Many Tupi-Guarani communities undertook long migrations in search of this land. Today, the Guarani are the largest Indigenous group in Brazil, though they face severe land conflicts in Mato Grosso do Sul, where sugarcane and soybean plantations have encroached on their territories.',
    currentIssues: 'Land conflicts in Mato Grosso do Sul are severe — Guarani communities have been evicted from their territories for agribusiness. Guarani leaders are frequently murdered for defending their land. Brazil had the highest number of Indigenous murders in 2023. The Bolsonaro-era policies weakened FUNAI (Indigenous affairs agency). The Lula government has created new Indigenous territories but deforestation in the Amazon continues. Isolated Tupi-Guarani groups face extinction from contact with loggers and miners.',
    resources: [
      'https://www.apib.org.br/',
      'https://www.survivalinternational.org/'
    ],
    category: 'Tupi-Guarani',
    researchDocument: {
      title: 'Tupi-Guarani Expansion and Cosmology',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Brazil',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Tupi-Guarani Expansion and Cosmology',
          content: 'The Tupi-Guarani were among the most widespread Indigenous peoples at European contact. They developed a complex cosmology centered on the search for the \'Land Without Evil\' — a promised land. This belief inspired long migrations throughout South America. Their language, Nheengatu, became the lingua franca of the Amazon.'
        },
        {
          heading: 'Land Conflicts in Mato Grosso do Sul',
          content: 'The Guarani of Mato Grosso do Sul face some of the most severe land conflicts in Brazil. Their territories have been converted to sugarcane and soybean plantations. Guarani leaders are frequently murdered for defending their land. In 2023, Brazil had the highest number of Indigenous murders globally.'
        },
        {
          heading: 'Amazon Crisis',
          content: 'Deforestation in the Amazon threatens Tupi-Guarani and other Indigenous peoples. The Lula government has created new protected areas but illegal logging, mining, and ranching continue. Isolated groups face extinction from contact.'
        }
      ],
      sources: [
        'APIB — Articulation of Indigenous Peoples of Brazil',
        'Survival International',
        'Viveiros de Castro, E. — \'From the Enemy\'s Point of View\''
      ]
    }
  },
  {
    id: 'pe-quechua',
    name: 'Quechua of Peru',
    indigenousName: 'Runa Simi',
    alternateNames: [],
    country: 'Peru',
    countryCode: 'PE',
    location: 'Andes Mountains and Amazon — Cusco, Puno, Ayacucho, Apurimac regions',
    coordinates: [-76.0, -10.0],
    population: '~4 million Quechua in Peru — largest Indigenous group',
    language: 'Quechua — Quechuan family; ~4 million speakers in Peru',
    languageFamily: 'Quechuan',
    status: 'Official language of Peru alongside Spanish; strong cultural identity',
    history: 'The Quechua are descendants of the Inca Empire, which at its peak stretched from modern Colombia to Chile. The Inca established Cusco as their capital and built a road network of over 40,000 km. After the Spanish conquest in 1533, Quechua culture survived through adaptation and resistance. The Quechua maintained their language, agricultural practices (including terrace farming and freeze-dried potato technology), and textile traditions. During the Shining Path insurgency (1980-2000), Quechua communities in Ayacucho suffered disproportionately. Today, Quechua is an official language of Peru and Bolivia, and Quechua culture is increasingly recognized as central to Peruvian national identity.',
    currentIssues: 'Mining conflicts are the most pressing issue — Quechua communities oppose copper, gold, and silver mines that contaminate water supplies. The Las Bambas copper mine in Apurimac has faced ongoing protests. Climate change is affecting high-altitude agriculture. Urban migration fragments communities. Racism against Indigenous peoples persists in Peruvian society, despite official recognition. The 2022 political crisis highlighted the divide between urban elites and rural Indigenous populations.',
    resources: [
      'https://www.cultura.gob.pe/',
      'https://chirapaq.org.pe/'
    ],
    category: 'Quechua',
    researchDocument: {
      title: 'The Inca Legacy',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Peru',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'The Inca Legacy',
          content: 'The Quechua are descendants of the Inca Empire, which stretched from Colombia to Chile. The Inca built a road network of 40,000 km, terrace farms, and monumental architecture at Machu Picchu, Sacsayhuaman, and other sites. Quechua was the administrative language of the empire.'
        },
        {
          heading: 'Colonial Survival and Adaptation',
          content: 'After the Spanish conquest in 1533, Quechua culture survived through adaptation. They maintained their language, agricultural practices including freeze-dried potatoes (chuño), and textile traditions. The hacienda system exploited Quechua labor until the 1969 land reform.'
        },
        {
          heading: 'Mining and Water Conflicts',
          content: 'Mining conflicts are the most pressing issue. The Las Bambas copper mine has faced ongoing protests over water contamination. Climate change affects high-altitude agriculture. Rural Quechua communities bear the costs of mineral extraction that benefits urban elites.'
        }
      ],
      sources: [
        'Ministry of Culture of Peru',
        'Chirapaq — Center for Indigenous Cultures',
        'Mann, C. — \'1491\''
      ]
    }
  },
  {
    id: 'cl-mapuche',
    name: 'Mapuche of Chile',
    indigenousName: 'Mapuche',
    alternateNames: [],
    country: 'Chile',
    countryCode: 'CL',
    location: 'Araucania region — Temuco, Valdivia, and across the Andes into Argentina',
    coordinates: [-71.5, -35.0],
    population: '~1.8 million Mapuche in Chile; ~250,000 in Argentina',
    language: 'Mapudungun — isolate; ~300,000 speakers',
    languageFamily: 'Isolate',
    status: 'Largest Indigenous group in Chile; demanding territorial autonomy',
    history: 'The Mapuche (People of the Land) are the only Indigenous people in the Americas who successfully resisted both the Inca Empire and the Spanish Empire. They maintained their independence south of the Bio Bio River for over 300 years, defeating Spanish armies and forcing recognition of their sovereignty. The Mapuche developed a sophisticated military society organized around the lonko (chief), toqui (war leader), and machi (shaman). They were not conquered until the Chilean state launched the \'Pacification of Araucania\' in the 1880s, employing scorched-earth tactics. Despite military defeat, the Mapuche have maintained their cultural identity, language, and land claims. They are now Chile\'s largest Indigenous group and a major political force.',
    currentIssues: 'The Mapuche demand territorial autonomy and recognition of their Wallmapu (ancestral territory). The Arauco-Malleco Coordination (CAM) has used sabotage against forestry companies, leading to government crackdowns and anti-terrorism prosecutions. Forestry plantations (pine and eucalyptus) have replaced native forest on Mapuche land. The 2019 Chilean constitution process included Mapuche demands for plurinational recognition. Water rights are a major issue — rivers on Mapuche territory are diverted for agriculture and mining.',
    resources: [
      'https://www.mapuche.nl/',
      'https://www.conadi.gob.cl/'
    ],
    category: 'Mapuche',
    researchDocument: {
      title: '300 Years of Independence',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Chile',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: '300 Years of Independence',
          content: 'The Mapuche successfully resisted both the Inca and Spanish empires. They maintained independence south of the Bio Bio River for over 300 years, defeating Spanish armies repeatedly. This is unique in the Americas — no other Indigenous people maintained independence for so long against European powers.'
        },
        {
          heading: 'The Pacification and Resistance',
          content: 'The Chilean state conquered the Mapuche in the 1880s using scorched-earth tactics. Despite military defeat, the Mapuche maintained their cultural identity. In the 20th century, they organized to reclaim their territories and rights.'
        },
        {
          heading: 'Contemporary Struggles',
          content: 'The Mapuche demand territorial autonomy and recognition of Wallmapu. Forestry plantations have replaced native forests. The CAM uses sabotage against forestry equipment. The 2019 constitutional process included demands for plurinational recognition.'
        }
      ],
      sources: [
        'Bengoa, J. — \'Historia del Pueblo Mapuche\'',
        'CONADI — National Indigenous Development Corporation',
        'Mariman, P. — Mapuche political analyst'
      ]
    }
  },
  {
    id: 'co-wayuu',
    name: 'Wayuu of Colombia',
    indigenousName: 'Wayuu',
    alternateNames: [],
    country: 'Colombia',
    countryCode: 'CO',
    location: 'Guajira Peninsula — northern Colombia and Venezuela border',
    coordinates: [-74.0, 4.5],
    population: '~380,000 Wayuu — largest Indigenous group in Colombia',
    language: 'Wayuunaiki — Arawakan family; actively spoken',
    languageFamily: 'Arawakan',
    status: 'Recognized Indigenous people; matrilineal society',
    history: 'The Wayuu are the largest Indigenous group in Colombia and Venezuela, inhabiting the Guajira Peninsula. They are a matrilineal society where clan membership and inheritance pass through the mother\'s line. The Wayuu successfully resisted Spanish conquest, maintaining their independence through diplomacy and armed resistance. They are known for their weaving (mochila bags are internationally famous), oral poetry, and the custom of alijuna (outsider/ non-Wayuu). The Wayuu have maintained their language and cultural traditions despite centuries of colonization. They are skilled pastoralists, raising goats in the arid Guajira environment.',
    currentIssues: 'The El Cerrejon coal mine — one of the largest open-pit coal mines in the world — has displaced Wayuu communities, contaminated water sources, and caused health problems. The Venezuelan crisis has forced thousands of Wayuu to flee to Colombia, straining resources. Drought in the Guajira has caused a humanitarian crisis, with high rates of child malnutrition. The Wayuu are fighting for consultation rights on mining and energy projects. Child malnutrition rates among the Wayuu are among the highest in Colombia.',
    resources: [
      'https://www.wayuu.org/',
      'https://www.onic.org.co/'
    ],
    category: 'Wayuu',
    researchDocument: {
      title: 'Wayuu Matrilineal Society',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Colombia',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Wayuu Matrilineal Society',
          content: 'The Wayuu are a matrilineal society where clan membership passes through the mother. Women own the houses and livestock. The Wayuu maintain their language (Wayuunaiki) and oral traditions including complex poetry competitions between men and women.'
        },
        {
          heading: 'El Cerrejon Coal Mine',
          content: 'The Cerrejon coal mine has displaced communities, contaminated water, and caused health problems. Wayuu communities downstream report skin diseases, respiratory illnesses, and contaminated livestock. The mine exports coal to Europe despite international criticism.'
        },
        {
          heading: 'Humanitarian Crisis',
          content: 'Drought and the Venezuelan crisis have created a humanitarian emergency in La Guajira. Child malnutrition rates are among Colombia\'s highest. The Wayuu are fighting for water rights and basic services.'
        }
      ],
      sources: [
        'ONIC — National Indigenous Organization of Colombia',
        'El Cerrejon Impact Studies'
      ]
    }
  },
  {
    id: 'sr-maroon',
    name: 'Saramaka Maroons of Suriname',
    indigenousName: 'Saamaka',
    alternateNames: [],
    country: 'Suriname',
    countryCode: 'SR',
    location: 'Upper Suriname River — central Suriname rainforest',
    coordinates: [-56.0, 4.0],
    population: '~90,000 Saramaka — largest Maroon group in Suriname',
    language: 'Saramaccan — English-based creole with Portuguese and African elements',
    languageFamily: 'English Creole',
    status: '2007 Inter-American Court ruling recognized Saramaka territorial rights',
    history: 'The Saramaka are one of six Maroon nations in Suriname and French Guiana — descendants of enslaved Africans who escaped plantations in the 17th and 18th centuries and established independent societies in the rainforest. The Saramaka fought a century of wars against Dutch colonists, signing peace treaties in 1762 that recognized their freedom and territory. They developed a unique culture blending West African traditions with Indigenous American and European elements. The Saramaka maintained their independence until the 20th century, when Suriname began encroaching on their territory. In 2007, the Inter-American Court of Human Rights ruled in favor of the Saramaka, recognizing their collective territorial rights and requiring Free, Prior, and Informed Consent for development projects.',
    currentIssues: 'The 2007 court ruling implementation remains incomplete. Logging and mining concessions threaten Saramaka territory. The Afobaka dam flooded large areas of Saramaka land in the 1960s. Chinese and Brazilian mining operations have entered their territory. The Suriname government has been slow to demarcate Saramaka lands. However, the Saramaka are recognized internationally as a model for Indigenous/Maroon land rights through the court ruling.',
    resources: [
      'https://www.forestpeoples.org/',
      'https://www.iachr.org/'
    ],
    category: 'Maroon',
    researchDocument: {
      title: 'Maroon Wars and Freedom',
      subtitle: 'A Comprehensive Research Document on the Indigenous Peoples of Suriname',
      lastUpdated: '2025-07-09',
      sections: [
        {
          heading: 'Maroon Wars and Freedom',
          content: 'The Saramaka fought a century of wars against the Dutch, signing peace treaties in 1762 that recognized their freedom and territory. They are one of the most successful examples of Maroon independence in the Americas.'
        },
        {
          heading: '2007 Inter-American Court Ruling',
          content: 'The Inter-American Court ruled in favor of the Saramaka in 2007, recognizing collective territorial rights and requiring FPIC for development. This landmark ruling set precedents for Indigenous land rights throughout the Americas.'
        },
        {
          heading: 'Contemporary Threats',
          content: 'Logging, mining, and hydroelectric projects threaten Saramaka territory. Implementation of the court ruling remains incomplete. The Saramaka continue to defend their territory and cultural identity.'
        }
      ],
      sources: [
        'Price, R. — \'First-Time: The Historical Vision of an Afro-American People\'',
        'IACHR — Saramaka People v. Suriname (2007)',
        'Forest Peoples Programme'
      ]
    }
  }
]

// ══════════════════════════════════════════════════════════════
// ALL NATIONS COMBINED
// ══════════════════════════════════════════════════════════════
export const allNations: IndigenousNation[] = [
  ...jamaicaNations,
  ...haitiNations,
  ...caribbeanNations,
  ...canadaNations,
  ...mexicoNations,
  ...centralAmericaNations,
  ...southAmericaNations,
]

// ══════════════════════════════════════════════════════════════
// ALL REGIONS
// ══════════════════════════════════════════════════════════════
export const allRegions: Region[] = [
  {
    id: 'jamaica',
    name: 'Jamaica',
    countries: 'Jamaica',
    nations: jamaicaNations,
    mapCenter: [-77.2975, 18.1096],
    mapZoom: 8,
  },
  {
    id: 'haiti',
    name: 'Haiti',
    countries: 'Haiti',
    nations: haitiNations,
    mapCenter: [-72.2852, 18.9712],
    mapZoom: 8,
  },
  {
    id: 'caribbean',
    name: 'Caribbean',
    countries: '22 Caribbean Territories',
    nations: caribbeanNations,
    mapCenter: [-71.5, 18.0],
    mapZoom: 5,
  },
  {
    id: 'canada',
    name: 'Canada',
    countries: '13 Canadian Provinces & Territories',
    nations: canadaNations,
    mapCenter: [-95.0, 60.0],
    mapZoom: 3,
  },
  {
    id: 'mexico',
    name: 'Mexico',
    countries: '16 Mexican States',
    nations: mexicoNations,
    mapCenter: [-102.0, 22.0],
    mapZoom: 4,
  },
  {
    id: 'centralAmerica',
    name: 'Central America',
    countries: '7 Central American Nations',
    nations: centralAmericaNations,
    mapCenter: [-86.0, 14.0],
    mapZoom: 5,
  },
  {
    id: 'southAmerica',
    name: 'South America',
    countries: '13 South American Nations',
    nations: southAmericaNations,
    mapCenter: [-60.0, -15.0],
    mapZoom: 3,
  },
]

// Helper: Get a nation by ID
export function getNationById(id: string): IndigenousNation | undefined {
  return allNations.find(n => n.id === id)
}

// Helper: Get all nations for a country
export function getNationsByCountry(country: string): IndigenousNation[] {
  return allNations.filter(n => n.country === country)
}
