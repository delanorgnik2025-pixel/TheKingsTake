import {useEffect,useRef,useState,useMemo} from 'react';
import {Link} from 'react-router';
import {trpc} from '@/providers/trpc';
import {RESEARCH_STARTING_PLACES} from '../../contracts/research-places';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
export default function ResearchPlaces({externalMap,query:parentQuery}:{externalMap?:any;query?:string}={}){
 const {data}=trpc.research.places.useQuery(undefined,{staleTime:60000,refetchInterval:120000,retry:false});
 const records=useMemo(()=>[...RESEARCH_STARTING_PLACES,...(data || []).map(r=>({...r,aliases:[] as string[],internalUrl:`/archives/nara/${r.id.replace('nara-','')}`}))],[data]);
 const container=useRef<HTMLDivElement>(null),mapRef=useRef<any>(null);const [selected,setSelected]=useState<any>(null),[mapError,setMapError]=useState(false),[query,setQuery]=useState('');
 const term=(parentQuery ?? query).trim().toLowerCase();
 const matches=records.filter(r=>!term || `${r.place_name} ${r.record.title} ${r.record.description || ''} ${r.aliases.join(' ')}`.toLowerCase().includes(term));
 const select=(r:any)=>{setSelected(r);mapRef.current?.flyTo({center:[r.longitude,r.latitude],zoom:10,duration:1000});};
 useEffect(()=>{
  if(!externalMap && (!container.current || !import.meta.env.VITE_MAPBOX_TOKEN))return;
  const map=externalMap || new mapboxgl.Map({container:container.current!,accessToken:import.meta.env.VITE_MAPBOX_TOKEN,style:'mapbox://styles/mapbox/dark-v11',center:[-98,39],zoom:3});mapRef.current=map;
  const click=(e:any)=>{const id=e.features?.[0]?.properties?.id;const r=records.find(r=>r.id===id);if(r)select(r);};
  const cluster=(e:any)=>{const f=e.features?.[0];if(f?.geometry.type==='Point')map.easeTo({center:f.geometry.coordinates,zoom:map.getZoom()+2});};
  const load=()=>{
   if(map.getSource('research-places'))return;
   map.addSource('research-places',{type:'geojson',cluster:true,clusterRadius:45,data:{type:'FeatureCollection',features:records.map(r=>({type:'Feature',geometry:{type:'Point',coordinates:[r.longitude,r.latitude]},properties:{id:r.id}}))}});
   map.addLayer({id:'research-clusters',type:'circle',source:'research-places',filter:['has','point_count'],paint:{'circle-color':'#FF9500','circle-radius':22}});
   map.addLayer({id:'research-counts',type:'symbol',source:'research-places',filter:['has','point_count'],layout:{'text-field':['get','point_count_abbreviated'],'text-size':12}});
   map.addLayer({id:'research-points',type:'circle',source:'research-places',filter:['!',['has','point_count']],paint:{'circle-color':'#FFB840','circle-radius':8,'circle-stroke-width':2,'circle-stroke-color':'#fff'}});
   map.on('click','research-points',click);map.on('click','research-clusters',cluster);
  };
  if(map.isStyleLoaded())load();else map.once('load',load);
  if(!externalMap){map.addControl(new mapboxgl.NavigationControl());map.on('error',()=>setMapError(true));}
  return()=>{map.off('load',load);map.off('click','research-points',click);map.off('click','research-clusters',cluster);if(!externalMap)map.remove();else {for(const id of ['research-points','research-counts','research-clusters'])if(map.getLayer(id))map.removeLayer(id);if(map.getSource('research-places'))map.removeSource('research-places');}};
 },[records,externalMap]);
 useEffect(()=>{if(term.length>=3 && matches.length===1)select(matches[0]);},[term,records,externalMap]);
 return <section className="my-6 space-y-4 rounded-2xl border border-[#FF9500]/20 p-4"><h2 className="text-xl">Follow the records to a place</h2><p className="text-sm text-[#C9B99A]">Named locations linked to source records. Reference markers are approximate; historical events may span several sites.</p>{parentQuery===undefined&&<input aria-label="Search archive map" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search a town, river, record or Gullah Wars…" className="w-full rounded-xl border border-white/15 bg-[#15202B] p-3"/>}{!externalMap&&<div ref={container} className="h-80 w-full rounded-xl" aria-label="Map of archive locations"/>}{mapError&&<p>Map unavailable; use the location results below.</p>}<div className="flex flex-wrap gap-2">{matches.slice(0,10).map(r=><button key={r.id} onClick={()=>select(r)} className="rounded-full border border-white/20 px-3 py-2 text-sm">{r.place_name}</button>)}</div>{!matches.length&&<p className="text-sm">No mapped match yet. <Link className="text-[#FFB840] underline" to={`/archives?q=${encodeURIComponent(term)}`}>Search the source catalogs</Link></p>}{selected&&<article className="rounded-xl bg-white/5 p-4"><button className="float-right px-2" aria-label="Close selected archive location" onClick={()=>setSelected(null)}>×</button><h3 className="text-xl">{selected.record.title}</h3><p className="text-xs">{selected.place_name} · {selected.precision_label}</p>{selected.record.imageUrl&&<img src={selected.record.imageUrl} alt={selected.record.title} loading="lazy" className="my-3 max-h-80 w-full rounded-lg object-contain"/>}<p className="my-3 text-sm">{selected.record.description}</p><p className="text-xs">Location evidence: {selected.evidence}</p>{selected.geo_source&&<a href={selected.geo_source} target="_blank" rel="noreferrer" className="mt-2 block text-xs underline">Coordinate source</a>}<Link to={selected.internalUrl} className="mt-3 inline-block text-[#FFB840] underline">Explore related archive records</Link><a href={selected.record.recordUrl} target="_blank" rel="noreferrer" className="ml-4 text-xs underline">Original source</a></article>}</section>;
}
