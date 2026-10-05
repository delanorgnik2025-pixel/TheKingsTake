// General map viewing centers, reused from the existing heritage map.
// These are display anchors for whole states, never historical site coordinates.
export const RESEARCH_STATE_AREAS: Record<string,[number,number,number]> = {
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
};
