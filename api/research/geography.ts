import {RESEARCH_STATE_AREAS} from '../../contracts/research-state-areas';
import type {ArchiveRecord} from '../archive';
import type {PlaceSuggestion} from './evidence';
export const GNIS_URL='https://carto.nationalmap.gov/arcgis/rest/services/geonames/MapServer';
export type GazetteerMatch={name:string;state:string;featureId:string;longitude:number;latitude:number;source:string;scope?:string;evidence?:string};
const STATES:Record<string,string>={UT:'Utah',FL:'Florida',SC:'South Carolina',GA:'Georgia',NC:'North Carolina',TX:'Texas',CA:'California',NY:'New York',VA:'Virginia',LA:'Louisiana',MS:'Mississippi',AL:'Alabama',OK:'Oklahoma',NM:'New Mexico',AZ:'Arizona',NV:'Nevada',CO:'Colorado',MD:'Maryland',DC:'District of Columbia',PA:'Pennsylvania',TN:'Tennessee',KY:'Kentucky',OH:'Ohio',IL:'Illinois',IN:'Indiana',MI:'Michigan',WI:'Wisconsin',MN:'Minnesota',IA:'Iowa',MO:'Missouri',AR:'Arkansas',KS:'Kansas',NE:'Nebraska',SD:'South Dakota',ND:'North Dakota',MT:'Montana',WY:'Wyoming',ID:'Idaho',OR:'Oregon',WA:'Washington',AK:'Alaska',HI:'Hawaii',ME:'Maine',VT:'Vermont',NH:'New Hampshire',MA:'Massachusetts',RI:'Rhode Island',CT:'Connecticut',NJ:'New Jersey',DE:'Delaware',WV:'West Virginia'};
const words=(s:string)=>s.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
export function chooseGazetteerMatch(record:ArchiveRecord,suggestion:PlaceSuggestion,payload:unknown):GazetteerMatch|null {
 const text=`${record.title} ${record.description || ''}`;
 if(/burial|cemetery|grave|sacred|archaeolog|archeolog|private residence|home address/i.test(text))return null;
 if(!text.toLowerCase().includes(suggestion.evidence.toLowerCase()) || !suggestion.evidence.toLowerCase().includes(suggestion.place.toLowerCase()))return null;
 const results=(payload as {results?:any[]})?.results;if(!Array.isArray(results))return null;
 const matches=new Map<string,GazetteerMatch>();
 for(const r of results){const a=r.attributes || {},points=r.geometry?.points;
  if(words(a.gaz_name || '')!==words(suggestion.place) || !Array.isArray(points) || points.length!==1 || a.isunknowncoords===1)continue;
  if(!['Populated Place','Stream','Lake','Reservoir','Bay','Island','Civil','Census'].includes(a.gaz_featureclass))continue;
  const [longitude,latitude]=points[0];if(!Number.isFinite(latitude)||!Number.isFinite(longitude)||Math.abs(latitude)>90||Math.abs(longitude)>180)continue;
  const state=STATES[a.state_alpha];if(!state || !new RegExp(`\\b${state}\\b`,'i').test(text))continue;
  const featureId=String(a.gaz_id);matches.set(featureId,{name:a.gaz_name,state:a.state_alpha,featureId,longitude,latitude,source:`${GNIS_URL}/${r.layerId}/query?where=gaz_id%3D${encodeURIComponent(featureId)}&outFields=*&outSR=4326&f=pjson`});
 }
 return matches.size===1?[...matches.values()][0]:null;
}
export async function resolvePlace(record:ArchiveRecord,suggestion:PlaceSuggestion){
 const u=new URL(`${GNIS_URL}/find`);u.search=new URLSearchParams({searchText:suggestion.place,contains:'false',searchFields:'gaz_name',layers:'3,5,6,7,12,13,14',returnGeometry:'true',outSR:'4326',f:'json'}).toString();
 const r=await fetch(u,{signal:AbortSignal.timeout(8000)});if(!r.ok)throw new Error(`USGS gazetteer request failed (${r.status})`);
 return chooseGazetteerMatch(record,suggestion,await r.json());
}

// Prefer quoted place evidence, but do not discard a useful historical record merely because
// a precise feature cannot be resolved. If the source title/description itself names exactly
// one supported state, publish a clearly labeled state-area anchor rather than inventing precision.
// Never use the catalog search query or repository-office metadata as geographic evidence.
export function generalAreaMatch(record:ArchiveRecord,suggestions:PlaceSuggestion[]):GazetteerMatch|null {
 const sourceText=`${record.title} ${record.description || ''}`;
 const text=sourceText.toLowerCase();
 for(const suggestion of suggestions){
  const quote=suggestion.evidence.toLowerCase();
  if(!text.includes(quote)||!quote.includes(suggestion.place.toLowerCase())||/repository|archive office|reference unit|stored at|held at/i.test(quote))continue;
  let remaining=quote;const states:string[]=[];
  for(const state of Object.keys(RESEARCH_STATE_AREAS).sort((a,b)=>b.length-a.length)){
   const re=new RegExp(`\\b${state}\\b`,'ig');if(re.test(remaining)){states.push(state);remaining=remaining.replace(re,' ');}
  }
  if(states.length!==1)continue;
  const state=states[0],[longitude,latitude]=RESEARCH_STATE_AREAS[state];
  return {name:`${state} — general area`,state,featureId:`state-${state}`,longitude,latitude,scope:'state area',evidence:suggestion.evidence,source:record.recordUrl};
 }
 const safeText=sourceText.replace(/repository|archive office|reference unit|stored at|held at/ig,' ');
 const states=Object.keys(RESEARCH_STATE_AREAS).filter(state=>new RegExp(`\\b${state}\\b`,'i').test(safeText));
 if(states.length===1){
  const state=states[0],[longitude,latitude]=RESEARCH_STATE_AREAS[state];
  return {name:`${state} — general area`,state,featureId:`state-${state}`,longitude,latitude,scope:'state area',evidence:`State named in National Archives title/description: ${state}`,source:record.recordUrl};
 }
 return null;
}
