export interface TerritoryMarker {
  id: string
  name: string
  coords: [number, number]
  zoom: number
  region: 'caribbean' | 'canada' | 'mexico' | 'centralAmerica' | 'southAmerica'
  parentCountry?: string
  description: string
  nations: string[]
}

export const caribbeanMarkers: TerritoryMarker[] = [
  { id: 'jm', name: 'Jamaica', coords: [-77.2975, 18.1096], zoom: 6, region: 'caribbean', description: 'Taíno (Yamaye), Accompong Maroons, Moore Town Maroons', nations: ['Taino','Yamaye','Maroons','Accompong','Moore Town','Akan','Igbo'] },
  { id: 'ht', name: 'Haiti', coords: [-72.2852, 18.9712], zoom: 6, region: 'caribbean', description: 'Taino (Ayiti), Haitian Maroons (Mawon), Vodou', nations: ['Taino','Ayiti','Mawon','Fon','Yoruba','Kongo'] },
  { id: 'cu', name: 'Cuba', coords: [-79.0, 21.5], zoom: 5, region: 'caribbean', description: 'Taino, Ciboney, Guanahatabey', nations: ['Taino','Ciboney','Guanahatabey','Hatuey'] },
  { id: 'pr', name: 'Puerto Rico', coords: [-66.5, 18.2], zoom: 6, region: 'caribbean', description: 'Taino (Boriken), Jibaro', nations: ['Taino','Boriken','Borinquen','Jibaro'] },
  { id: 'do', name: 'Dominican Republic', coords: [-70.2, 18.7], zoom: 6, region: 'caribbean', description: 'Taino (Quisqueya), Enriquillo', nations: ['Taino','Quisqueya','Enriquillo','Anacaona'] },
  { id: 'bs', name: 'Bahamas', coords: [-77.4, 25.0], zoom: 6, region: 'caribbean', description: 'Lucayan Taino', nations: ['Lucayan','Taino'] },
  { id: 'tt', name: 'Trinidad & Tobago', coords: [-61.3, 10.4], zoom: 7, region: 'caribbean', description: 'Kalinago, Arawak, First Peoples', nations: ['Kalinago','Carib','Arawak','Lokono'] },
  { id: 'ag', name: 'Antigua & Barbuda', coords: [-61.8, 17.1], zoom: 7, region: 'caribbean', description: 'Kalinago (Island Carib)', nations: ['Kalinago','Carib'] },
  { id: 'dm', name: 'Dominica', coords: [-61.4, 15.4], zoom: 7, region: 'caribbean', description: 'Kalinago Territory — last Carib stronghold', nations: ['Kalinago','Carib'] },
  { id: 'gd', name: 'Grenada', coords: [-61.7, 12.1], zoom: 7, region: 'caribbean', description: 'Kalinago', nations: ['Kalinago','Carib'] },
  { id: 'kn', name: 'St. Kitts & Nevis', coords: [-62.8, 17.3], zoom: 7, region: 'caribbean', description: 'Kalinago', nations: ['Kalinago','Carib'] },
  { id: 'lc', name: 'St. Lucia', coords: [-61.0, 13.9], zoom: 7, region: 'caribbean', description: 'Kalinago', nations: ['Kalinago','Carib'] },
  { id: 'vc', name: 'St. Vincent', coords: [-61.2, 13.2], zoom: 7, region: 'caribbean', description: 'Kalinago (Black Carib/Garifuna origin)', nations: ['Kalinago','Carib','Garifuna'] },
  { id: 'bb', name: 'Barbados', coords: [-59.5, 13.1], zoom: 7, region: 'caribbean', description: 'Kalinago (historical)', nations: ['Kalinago','Carib'] },
  { id: 'vi', name: 'US Virgin Islands', coords: [-64.8, 18.0], zoom: 7, region: 'caribbean', description: 'Taino, Kalinago', nations: ['Taino','Kalinago'] },
  { id: 'ky', name: 'Cayman Islands', coords: [-80.9, 19.3], zoom: 7, region: 'caribbean', description: 'Taino', nations: ['Taino'] },
  { id: 'tc', name: 'Turks & Caicos', coords: [-71.8, 21.8], zoom: 7, region: 'caribbean', description: 'Lucayan Taino', nations: ['Lucayan','Taino'] },
  { id: 'gp', name: 'Guadeloupe', coords: [-61.6, 16.3], zoom: 7, region: 'caribbean', description: 'Kalinago', nations: ['Kalinago','Carib'] },
  { id: 'mq', name: 'Martinique', coords: [-61.0, 14.6], zoom: 7, region: 'caribbean', description: 'Kalinago', nations: ['Kalinago','Carib'] },
  { id: 'aw', name: 'Aruba', coords: [-70.0, 12.5], zoom: 7, region: 'caribbean', description: 'Caquetio (Arawak)', nations: ['Caquetio','Arawak'] },
  { id: 'cw', name: 'Curacao', coords: [-68.9, 12.2], zoom: 7, region: 'caribbean', description: 'Caquetio (Arawak)', nations: ['Caquetio','Arawak'] },
  { id: 'bo', name: 'Bonaire', coords: [-68.3, 12.2], zoom: 8, region: 'caribbean', description: 'Caquetio (Arawak)', nations: ['Caquetio','Arawak'] },
]

export const canadaMarkers: TerritoryMarker[] = [
  { id: 'ca-on', name: 'Ontario', coords: [-84.7, 50.0], zoom: 4, region: 'canada', parentCountry: 'Canada', description: 'Anishinaabe, Haudenosaunee, Cree, Huron-Wendat', nations: ['Anishinaabe','Ojibwe','Haudenosaunee','Iroquois','Cree','Huron-Wendat'] },
  { id: 'ca-qc', name: 'Quebec', coords: [-73.0, 52.0], zoom: 3, region: 'canada', parentCountry: 'Canada', description: 'Cree, Innu, Inuit, Mohawk, Abenaki', nations: ['Cree','Innu','Inuit','Mohawk','Abenaki','Huron-Wendat'] },
  { id: 'ca-bc', name: 'British Columbia', coords: [-125.0, 54.0], zoom: 4, region: 'canada', parentCountry: 'Canada', description: 'Coast Salish, Haida, Tsilhqotin, Nuu-chah-nulth', nations: ['Coast Salish','Haida','Tsilhqotin','Nuu-chah-nulth','Kwakwakawakw'] },
  { id: 'ca-ab', name: 'Alberta', coords: [-115.0, 55.0], zoom: 4, region: 'canada', parentCountry: 'Canada', description: 'Cree, Blackfoot Confederacy, Tsuutina, Metis', nations: ['Cree','Blackfoot','Tsuutina','Metis'] },
  { id: 'ca-mb', name: 'Manitoba', coords: [-97.0, 55.0], zoom: 4, region: 'canada', parentCountry: 'Canada', description: 'Cree, Ojibwe, Dakota, Dene, Metis', nations: ['Cree','Ojibwe','Dakota','Dene','Metis'] },
  { id: 'ca-sk', name: 'Saskatchewan', coords: [-106.0, 55.0], zoom: 4, region: 'canada', parentCountry: 'Canada', description: 'Cree, Dakota, Dene, Saulteaux, Metis', nations: ['Cree','Dakota','Dene','Saulteaux','Metis'] },
  { id: 'ca-ns', name: 'Nova Scotia', coords: [-63.0, 45.0], zoom: 5, region: 'canada', parentCountry: 'Canada', description: 'Mikmaq, Maliseet-Passamaquoddy', nations: ['Mikmaq','Maliseet','Passamaquoddy'] },
  { id: 'ca-nb', name: 'New Brunswick', coords: [-66.5, 46.5], zoom: 5, region: 'canada', parentCountry: 'Canada', description: 'Mikmaq, Wolastoqiyik', nations: ['Mikmaq','Wolastoqiyik'] },
  { id: 'ca-nl', name: 'Newfoundland & Labrador', coords: [-60.0, 53.0], zoom: 4, region: 'canada', parentCountry: 'Canada', description: 'Innu, Inuit (Nunatsiavut), Mikmaq, Beothuk', nations: ['Innu','Inuit','Nunatsiavut','Mikmaq','Beothuk'] },
  { id: 'ca-pe', name: 'Prince Edward Island', coords: [-63.2, 46.4], zoom: 6, region: 'canada', parentCountry: 'Canada', description: 'Mikmaq (Epekwitk)', nations: ['Mikmaq','Epekwitk'] },
  { id: 'ca-yt', name: 'Yukon', coords: [-136.0, 64.0], zoom: 4, region: 'canada', parentCountry: 'Canada', description: 'Trondek Hwechin, Carcross/Tagish, Kwanlin Dun', nations: ['Trondek Hwechin','Han','Carcross','Kwanlin Dun'] },
  { id: 'ca-nt', name: 'Northwest Territories', coords: [-119.0, 66.0], zoom: 3, region: 'canada', parentCountry: 'Canada', description: 'Dene, Metis, Inuvialuit', nations: ['Dene','Metis','Inuvialuit','Inuit'] },
  { id: 'ca-nu', name: 'Nunavut', coords: [-95.0, 70.0], zoom: 2, region: 'canada', parentCountry: 'Canada', description: 'Inuit — created as Indigenous territory', nations: ['Inuit','Inuinnait'] },
]

export const mexicoMarkers: TerritoryMarker[] = [
  { id: 'mx-oax', name: 'Oaxaca', coords: [-96.5, 17.0], zoom: 5, region: 'mexico', parentCountry: 'Mexico', description: 'Zapotec, Mixtec, Chatino, Triqui, Mazatec', nations: ['Zapotec','Mixtec','Chatino','Triqui','Mazatec'] },
  { id: 'mx-chp', name: 'Chiapas', coords: [-93.0, 16.5], zoom: 5, region: 'mexico', parentCountry: 'Mexico', description: 'Tzotzil Maya, Tzeltal Maya, Chol, Zoque', nations: ['Tzotzil','Tzeltal','Chol','Zoque','Tojolabal'] },
  { id: 'mx-yuc', name: 'Yucatan', coords: [-89.0, 20.8], zoom: 5, region: 'mexico', parentCountry: 'Mexico', description: 'Maya (Yucatec)', nations: ['Maya','Yucatec'] },
  { id: 'mx-gro', name: 'Guerrero', coords: [-100.0, 17.5], zoom: 5, region: 'mexico', parentCountry: 'Mexico', description: 'Nahuatl, Mixtec, Tlapanec, Amuzgo', nations: ['Nahuatl','Mixtec','Tlapanec','Amuzgo'] },
  { id: 'mx-pue', name: 'Puebla', coords: [-97.8, 19.0], zoom: 5, region: 'mexico', parentCountry: 'Mexico', description: 'Nahuatl, Totonac, Popoloca', nations: ['Nahuatl','Totonac','Popoloca'] },
  { id: 'mx-ver', name: 'Veracruz', coords: [-96.5, 19.5], zoom: 5, region: 'mexico', parentCountry: 'Mexico', description: 'Totonac, Nahua, Huastec, Popoluca', nations: ['Totonac','Nahua','Huastec','Teenek'] },
  { id: 'mx-hid', name: 'Hidalgo', coords: [-98.9, 20.5], zoom: 6, region: 'mexico', parentCountry: 'Mexico', description: 'Nahua, Otomi (Hnahnu), Tepehua', nations: ['Nahua','Otomi','Hnahnu','Tepehua'] },
  { id: 'mx-chh', name: 'Chihuahua', coords: [-106.5, 28.8], zoom: 4, region: 'mexico', parentCountry: 'Mexico', description: 'Tarahumara (Raramuri), Tepehuan', nations: ['Tarahumara','Raramuri','Tepehuan'] },
  { id: 'mx-son', name: 'Sonora', coords: [-110.5, 29.5], zoom: 4, region: 'mexico', parentCountry: 'Mexico', description: 'Mayo, Yaqui, Papago, Pima', nations: ['Mayo','Yaqui','Papago','Tohono Oodham'] },
  { id: 'mx-mic', name: 'Michoacan', coords: [-102.0, 19.2], zoom: 5, region: 'mexico', parentCountry: 'Mexico', description: 'Purepecha (Tarascan), Mazahua', nations: ['Purepecha','Tarascan','Mazahua'] },
  { id: 'mx-mor', name: 'Morelos', coords: [-99.0, 18.8], zoom: 6, region: 'mexico', parentCountry: 'Mexico', description: 'Nahua, Tlahuica, Tlapanec', nations: ['Nahua','Tlahuica','Tlapanec'] },
  { id: 'mx-cmx', name: 'Mexico City', coords: [-99.1, 19.4], zoom: 7, region: 'mexico', parentCountry: 'Mexico', description: 'Nahua heritage, Mexica (Aztec) center', nations: ['Nahua','Mexica','Aztec'] },
  { id: 'mx-nay', name: 'Nayarit', coords: [-104.9, 21.8], zoom: 5, region: 'mexico', parentCountry: 'Mexico', description: 'Huichol (Wixarika), Cora (Naayari)', nations: ['Huichol','Wixarika','Cora','Naayari'] },
  { id: 'mx-qr', name: 'Quintana Roo', coords: [-87.8, 19.8], zoom: 5, region: 'mexico', parentCountry: 'Mexico', description: 'Maya (Yucatec, Mopan)', nations: ['Maya','Yucatec','Mopan'] },
  { id: 'mx-cam', name: 'Campeche', coords: [-90.5, 19.8], zoom: 5, region: 'mexico', parentCountry: 'Mexico', description: 'Maya (Yucatec), Chol', nations: ['Maya','Yucatec','Chol'] },
  { id: 'mx-tab', name: 'Tabasco', coords: [-92.9, 17.9], zoom: 6, region: 'mexico', parentCountry: 'Mexico', description: 'Chontal, Nahuatl, Zoque', nations: ['Chontal','Nahuatl','Zoque'] },
]

export const centralAmericaMarkers: TerritoryMarker[] = [
  { id: 'gt', name: 'Guatemala', coords: [-90.5, 15.8], zoom: 7, region: 'centralAmerica', description: 'Kiche Maya, Kaqchikel Maya, Mam, Garifuna', nations: ['Kiche','Kaqchikel','Mam','Garifuna'] },
  { id: 'bz', name: 'Belize', coords: [-88.8, 17.2], zoom: 8, region: 'centralAmerica', description: 'Maya (Yucatec, Mopan, Kekchi), Garifuna', nations: ['Maya','Garifuna'] },
  { id: 'hn', name: 'Honduras', coords: [-86.5, 14.8], zoom: 7, region: 'centralAmerica', description: 'Lenca, Miskito, Garifuna, Chorti', nations: ['Lenca','Miskito','Garifuna','Chorti'] },
  { id: 'sv', name: 'El Salvador', coords: [-88.9, 13.8], zoom: 8, region: 'centralAmerica', description: 'Pipil (Nahuat), Lenca', nations: ['Pipil','Nahuat','Lenca'] },
  { id: 'ni', name: 'Nicaragua', coords: [-85.2, 12.9], zoom: 7, region: 'centralAmerica', description: 'Miskito, Mayangna, Rama, Garifuna', nations: ['Miskito','Mayangna','Rama','Garifuna'] },
  { id: 'cr', name: 'Costa Rica', coords: [-84.0, 9.7], zoom: 7, region: 'centralAmerica', description: 'Bribri, Cabecar, Naso, Chorotega', nations: ['Bribri','Cabecar','Naso','Chorotega'] },
  { id: 'pa', name: 'Panama', coords: [-80.0, 8.5], zoom: 7, region: 'centralAmerica', description: 'Ngabe-Bugle, Embera, Kuna (Guna)', nations: ['Ngabe-Bugle','Guaymi','Embera','Kuna','Guna'] },
]

export const southAmericaMarkers: TerritoryMarker[] = [
  { id: 'co', name: 'Colombia', coords: [-74.0, 4.5], zoom: 5, region: 'southAmerica', description: 'Wayuu, Paez (Nasa), Embera, Kogi', nations: ['Wayuu','Paez','Nasa','Embera','Kogi'] },
  { id: 've', name: 'Venezuela', coords: [-66.0, 7.0], zoom: 5, region: 'southAmerica', description: 'Wayuu, Warao, Yanomami, Pemon', nations: ['Wayuu','Warao','Yanomami','Pemon','Jivi'] },
  { id: 'br', name: 'Brazil', coords: [-55.0, -10.0], zoom: 4, region: 'southAmerica', description: 'Tupi-Guarani, Yanomami, Kayapo, Guarani', nations: ['Tupi','Guarani','Yanomami','Kayapo','Ashaninka','Xavante','Tikuna'] },
  { id: 'pe', name: 'Peru', coords: [-76.0, -10.0], zoom: 5, region: 'southAmerica', description: 'Quechua, Aymara, Ashaninka, Awajun', nations: ['Quechua','Aymara','Ashaninka','Awajun','Shipibo'] },
  { id: 'ec', name: 'Ecuador', coords: [-78.5, -1.5], zoom: 6, region: 'southAmerica', description: 'Kichwa (Quechua), Shuar, Achuar, Huaorani', nations: ['Kichwa','Quechua','Shuar','Achuar','Huaorani'] },
  { id: 'bo', name: 'Bolivia', coords: [-64.5, -17.0], zoom: 5, region: 'southAmerica', description: 'Quechua, Aymara, Guarani, Chiquitano', nations: ['Quechua','Aymara','Guarani','Chiquitano'] },
  { id: 'cl', name: 'Chile', coords: [-71.5, -35.0], zoom: 4, region: 'southAmerica', description: 'Mapuche, Aymara, Rapa Nui, Quechua', nations: ['Mapuche','Aymara','Rapa Nui','Quechua'] },
  { id: 'ar', name: 'Argentina', coords: [-65.0, -38.0], zoom: 4, region: 'southAmerica', description: 'Mapuche, Quechua, Guarani, Qom (Toba)', nations: ['Mapuche','Quechua','Guarani','Qom','Toba'] },
  { id: 'uy', name: 'Uruguay', coords: [-56.0, -33.0], zoom: 7, region: 'southAmerica', description: 'Charrua (revival), Guarani, Chana', nations: ['Charrua','Guarani','Chana'] },
  { id: 'py', name: 'Paraguay', coords: [-58.5, -23.5], zoom: 6, region: 'southAmerica', description: 'Guarani (co-official), Ache, Mbya', nations: ['Guarani','Ache','Mbya'] },
  { id: 'gy', name: 'Guyana', coords: [-59.0, 5.0], zoom: 7, region: 'southAmerica', description: 'Lokono (Arawak), Carib, Warao', nations: ['Lokono','Arawak','Carib','Warao'] },
  { id: 'sr', name: 'Suriname', coords: [-56.0, 4.0], zoom: 7, region: 'southAmerica', description: 'Saramaka, Ndyuka, Auka Matawai Maroons', nations: ['Saramaka','Ndyuka','Auka','Matawai','Kwinti','Maroon'] },
  { id: 'gf', name: 'French Guiana', coords: [-53.0, 4.0], zoom: 7, region: 'southAmerica', description: 'Kalina (Carib), Lokono, Wayana', nations: ['Kalina','Carib','Lokono','Wayana'] },
]

export const ALL_TERRITORIES: TerritoryMarker[] = [
  ...caribbeanMarkers,
  ...canadaMarkers,
  ...mexicoMarkers,
  ...centralAmericaMarkers,
  ...southAmericaMarkers,
]

export const TERRITORY_BY_ID = new Map(ALL_TERRITORIES.map(t => [t.id, t]))

export interface SearchResult {
  territory: TerritoryMarker
  matchedTerm: string
  matchType: 'name' | 'nation' | 'description'
}

export function searchTerritories(query: string): SearchResult[] {
  const q = query.toLowerCase().trim()
  if (!q || q.length < 2) return []
  const results: SearchResult[] = []
  const seen = new Set<string>()
  for (const t of ALL_TERRITORIES) {
    if (t.name.toLowerCase().includes(q)) {
      const key = `${t.id}-name`
      if (!seen.has(key)) { seen.add(key); results.push({ territory: t, matchedTerm: t.name, matchType: 'name' }) }
      continue
    }
    for (const nation of t.nations) {
      if (nation.toLowerCase().includes(q)) {
        const key = `${t.id}-${nation}`
        if (!seen.has(key)) { seen.add(key); results.push({ territory: t, matchedTerm: nation, matchType: 'nation' }) }
        break
      }
    }
    if (t.description.toLowerCase().includes(q)) {
      const key = `${t.id}-desc`
      if (!seen.has(key)) { seen.add(key); results.push({ territory: t, matchedTerm: t.description, matchType: 'description' }) }
    }
  }
  return results.slice(0, 10)
}

export const REGION_LABELS: Record<string, { label: string; color: string }> = {
  caribbean: { label: 'Caribbean', color: '#FF9500' },
  canada: { label: 'Canada', color: '#C9B99A' },
  mexico: { label: 'Mexico', color: '#E8A87C' },
  centralAmerica: { label: 'Central America', color: '#85CDCA' },
  southAmerica: { label: 'South America', color: '#E27D60' },
}
