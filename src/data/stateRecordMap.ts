import type { StateRecordMapEntry } from '../types/ancestry'

export const STATE_RECORD_MAP: Record<string, StateRecordMapEntry> = {
  'Georgia': {
    state: 'Georgia',
    abbreviation: 'GA',
    nations: ['Cherokee', 'Muscogee Creek', 'Yuchi', 'Hitchiti', 'Shawnee', 'Yamasee', 'Apalachicola', 'Mico'],
    alternativeNames: ['Tsalagi', 'Mvskoke', 'Euchee'],
    relevantRolls: ['Dawes Rolls', 'Guion Miller Roll', 'Eastern Cherokee Applications', 'Henderson Roll 1835', 'Old Settler Roll 1851'],
    relevantTreaties: ['Treaty of New Echota 1835', 'Treaty of Indian Springs 1825'],
    relevantLaws: ['indian-removal-act-1830', 'dawes-act-1887'],
    migrationPaths: [
      { from: 'Georgia', to: 'Oklahoma / Indian Territory', note: 'Primary Trail of Tears route for Cherokee and Creek' },
      { from: 'Georgia', to: 'North Carolina', note: 'Some Cherokee hid in the mountains to avoid removal' },
      { from: 'Georgia', to: 'Alabama', note: 'Creek refugees before final removal' },
    ],
    vitalRecords: {
      office: 'Georgia Department of Public Health — Vital Records',
      address: '1680 Phoenix Boulevard, Suite 100, Atlanta, GA 30349',
      phone: '(404) 679-4702',
      website: 'https://dph.georgia.gov/VitalRecords',
      birthCertProcess: 'Order from GA DPH. Must prove relationship if requesting an older record.',
      deathCertProcess: 'Order from GA DPH. Death certificates 1919–present available.',
      indianAffairs: 'Georgia Council on American Indian Concerns: (404) 656-1278',
    },
    archiveLinks: [
      { label: 'Georgia Archives', url: 'https://www.georgiaarchives.org' },
      { label: 'Georgia Historical Society', url: 'https://www.georgiahistory.com' },
    ],
    genealogyLinks: [
      { label: 'FamilySearch — Georgia Genealogy', url: 'https://www.familysearch.org/wiki/en/Georgia_Genealogy' },
    ],
  },
  'North Carolina': {
    state: 'North Carolina',
    abbreviation: 'NC',
    nations: ['Cherokee', 'Lumbee', 'Coharie', 'Haliwa-Saponi', 'Meherrin', 'Occaneechi Band', 'Sappony', 'Waccamaw Siouan', 'Catawba', 'Tuscarora', 'Pee Dee'],
    alternativeNames: ['Tsalagi', 'Baker Roll Eastern Cherokee'],
    relevantRolls: ['Baker Roll 1924–1929', 'Guion Miller Roll', 'Eastern Cherokee Applications', 'Henderson Roll 1835', 'Dawes Rolls'],
    relevantTreaties: ['Treaty of Holston 1791', 'Treaty of Hopewell 1785'],
    relevantLaws: ['indian-removal-act-1830', 'racial-integrity-act-1924'],
    migrationPaths: [
      { from: 'NC Mountains', to: 'Oklahoma', note: 'Cherokee Trail of Tears' },
      { from: 'NC Coastal Plain', to: 'Robeson County', note: 'Lumbee and other tribes consolidated' },
      { from: 'NC Piedmont', to: 'Virginia', note: 'Saponi, Occaneechi migration' },
    ],
    vitalRecords: {
      office: 'North Carolina Vital Records',
      address: '1903 Mail Service Center, Raleigh, NC 27699-1903',
      phone: '(919) 733-3000',
      website: 'https://www.ncdhhs.gov/vital-records',
      birthCertProcess: 'Order from NC Vital Records. Records from 1913 onward.',
      deathCertProcess: 'Order from NC Vital Records. Death records from 1930 onward; some earlier city records exist.',
      indianAffairs: 'North Carolina Commission of Indian Affairs: (919) 807-4400',
    },
    archiveLinks: [
      { label: 'State Archives of NC', url: 'https://archives.ncdcr.gov' },
      { label: 'UNC Chapel Hill — Southern Historical Collection', url: 'https://wilsonlibrary.unc.edu' },
    ],
    genealogyLinks: [
      { label: 'FamilySearch — NC Genealogy', url: 'https://www.familysearch.org/wiki/en/North_Carolina_Genealogy' },
    ],
  },
  'Virginia': {
    state: 'Virginia',
    abbreviation: 'VA',
    nations: ['Powhatan Confederacy', 'Pamunkey', 'Mattaponi', 'Chickahominy', 'Nansemond', 'Monacan', 'Rappahannock', 'Nottoway', 'Cheroenhaka'],
    alternativeNames: ['Pamunkey', 'Mattaponi', 'Upper Mattaponi'],
    relevantRolls: ['Bureau of Vital Statistics records (Plecker era)', 'State census records', 'Church records'],
    relevantTreaties: ['Treaty of Middle Plantation 1677', 'Treaty of Albany 1718'],
    relevantLaws: ['partus-sequitur-ventrem-1662', 'racial-integrity-act-1924', 'plecker-era-1912-1946'],
    migrationPaths: [
      { from: 'Virginia', to: 'North Carolina', note: 'Many Virginia tribes migrated south to avoid reclassification' },
      { from: 'Virginia', to: 'Pennsylvania', note: 'Some Nottoway and Tutelo moved north' },
    ],
    vitalRecords: {
      office: 'Virginia Department of Health — Division of Vital Records',
      address: 'P.O. Box 1000, Richmond, VA 23218-1000',
      phone: '(804) 662-6200',
      website: 'https://www.vdh.virginia.gov/vital-records/',
      birthCertProcess: 'Order from VA Vital Records. Records from 1912 onward. Note: Plecker-era certificates may have altered racial classifications.',
      deathCertProcess: 'Order from VA Vital Records. Death records from 1912 onward.',
      indianAffairs: 'Virginia Council on Indians (disbanded 2012); contact tribes directly.',
    },
    archiveLinks: [
      { label: 'Library of Virginia', url: 'https://www.lva.virginia.gov' },
      { label: 'Virginia Museum of History & Culture', url: 'https://virginiahistory.org' },
    ],
    genealogyLinks: [
      { label: 'FamilySearch — Virginia Genealogy', url: 'https://www.familysearch.org/wiki/en/Virginia_Genealogy' },
    ],
  },
  'Oklahoma': {
    state: 'Oklahoma',
    abbreviation: 'OK',
    nations: ['Cherokee', 'Choctaw', 'Chickasaw', 'Creek/Muscogee', 'Seminole', 'Osage', 'Kiowa', 'Comanche', 'Apache', 'Pawnee', 'Delaware', 'Shawnee', 'Potawatomi', 'Cheyenne', 'Arapaho', 'Wichita', 'Caddo'],
    alternativeNames: ['Five Civilized Tribes', 'Five Tribes', 'Indian Territory'],
    relevantRolls: ['Dawes Rolls', 'Guion Miller Roll', 'Baker Roll', 'Kern-Clifton Roll', 'Old Settler Roll', 'Henderson Roll', 'Wallace Roll', 'Drennen Roll', 'Chapman Roll', 'Mullay Roll'],
    relevantTreaties: ['Treaty of Doaksville 1837', 'Treaty of Fort Gibson 1837', 'Treaty of New Echota 1835'],
    relevantLaws: ['dawes-act-1887', 'curtis-act-1898', 'indian-removal-act-1830'],
    migrationPaths: [
      { from: 'Southeastern states', to: 'Oklahoma', note: 'Trail of Tears — primary destination for removed nations' },
      { from: 'Great Lakes', to: 'Oklahoma', note: 'Potawatomi, Ottawa, Shawnee removal' },
      { from: 'Northern Plains', to: 'Oklahoma', note: 'Cheyenne, Arapaho reservation' },
    ],
    vitalRecords: {
      office: 'Oklahoma State Department of Health — Vital Records',
      address: '1000 NE 10th Street, Oklahoma City, OK 73117',
      phone: '(405) 271-4040',
      website: 'https://oklahoma.gov/health/services/vital-records.html',
      birthCertProcess: 'Order from OK Vital Records. Records from 1908 onward.',
      deathCertProcess: 'Order from OK Vital Records. Death records from 1908 onward.',
      indianAffairs: 'Oklahoma Indian Legal Services: (405) 943-6457',
    },
    archiveLinks: [
      { label: 'Oklahoma Historical Society', url: 'https://www.okhistory.org' },
      { label: 'Oklahoma State Archives', url: 'https://www.okhistory.org/research' },
    ],
    genealogyLinks: [
      { label: 'OHS — American Indian Archives', url: 'https://www.okhistory.org/research/americanindian' },
      { label: 'FamilySearch — Oklahoma Genealogy', url: 'https://www.familysearch.org/wiki/en/Oklahoma_Genealogy' },
    ],
  },
}

// Helper to get states with record data
export function getStatesWithRecords(): string[] {
  return Object.keys(STATE_RECORD_MAP)
}

// Helper to get record data for a state
export function getStateRecord(state: string): StateRecordMapEntry | undefined {
  return STATE_RECORD_MAP[state] || STATE_RECORD_MAP[state.toLowerCase()]
}
