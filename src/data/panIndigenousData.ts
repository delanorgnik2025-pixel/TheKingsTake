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
]

export const allNations: IndigenousNation[] = [
  ...jamaicaNations,
]

// Helper: Get a nation by ID
export function getNationById(id: string): IndigenousNation | undefined {
  return allNations.find(n => n.id === id)
}

// Helper: Get all nations for a country
export function getNationsByCountry(country: string): IndigenousNation[] {
  return allNations.filter(n => n.country === country)
}
