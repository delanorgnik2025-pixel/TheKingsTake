import {useEffect,useRef,useState,useMemo} from 'react';
import {Link} from 'react-router';
import {trpc} from '@/providers/trpc';
import {RESEARCH_STARTING_PLACES} from '../../contracts/research-places';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const PHASES=[...new Set(RESEARCH_STARTING_PLACES.map(r=>r.phase))];
export default function ResearchPlaces({externalMap,query:parentQuery}:{externalMap?:any;query?:string}={}){
 const container=useRef<HTMLDivElement>(null),mapRef=useRef<any>(null),matchesRef=useRef<any[]>([]);
 const [selected,setSelected]=useState<any>(null),[mapError,setMapError]=useState(false),[query,setQuery]=useState('');
 const [mode,setMode]=useState<'history'|'archives'>('history'),[phase,setPhase]=useState('all'),[search,setSearch]=useState(''),[visible,setVisible]=useState(10),[mapReady,setMapReady]=useState(0);
 const term=(parentQuery ?? query).trim().toLowerCase();
 useEffect(()=>{const timer=setTimeout(()=>setSearch(term.slice(0,200)),350);setVisible(10);return()=>clearTimeout(timer);},[term,mode,phase]);
 const {data,isError}=trpc.research.places.useQuery({query:search},{staleTime:60000,refetchInterval:120000,retry:false});
 const archives=useMemo(()=> (data || []).map(r=>({...r,aliases:[] as string[],internalUrl:`/archives/nara/${r.id.replace('nara-','')}`})),[data]);
 const matches=useMemo(()=>{
  const records:any[]=mode==='history'?RESEARCH_STARTING_PLACES:archives;
  return records.filter(r=>(mode!=='history'||phase==='all'||r.phase===phase)&&(!term||`${r.place_name} ${r.record.title} ${r.record.description || ''} ${(r.aliases || []).join(' ')}`.toLowerCase().includes(term)));
 },[mode,phase,term,archives]);
 matchesRef.current=matches;
 const select=(r:any)=>{setSelected(r);mapRef.current?.flyTo({center:[r.longitude,r.latitude],zoom:r.precision_label==='state area'?5:r.precision_label==='approximate'?10:8,duration:700});};
 useEffect(()=>{
  if(!externalMap && (!container.current || !import.meta.env.VITE_MAPBOX_TOKEN))return;
  const map=externalMap || new mapboxgl.Map({container:container.current!,accessToken:import.meta.env.VITE_MAPBOX_TOKEN,style:'mapbox://styles/mapbox/dark-v11',center:[-86,32],zoom:4});mapRef.current=map;
  const ready=()=>setMapReady(v=>v+1);
  const click=(e:any)=>{const id=e.features?.[0]?.properties?.id;const r=matchesRef.current.find(r=>r.id===id);if(r)select(r);};
  const cluster=(e:any)=>{const f=e.features?.[0];if(f?.geometry.type==='Point'){
   const features=map.querySourceFeatures('research-places',{filter:['==','cluster_id',f.properties.cluster_id]});
   const source=map.getSource('research-places');
   source?.getClusterLeaves(f.properties.cluster_id,100,0,(error:any,leaves:any[])=>{if(!error&&leaves?.length){const first=matchesRef.current.find(r=>r.id===leaves[0].properties.id);if(first)setSelected(first);}});
   if(features.length)map.easeTo({center:f.geometry.coordinates,zoom:Math.min(map.getZoom()+2,11)});
  }};
  if(map.isStyleLoaded())ready();else map.once('load',ready);
  map.on('click','research-points',click);map.on('click','research-clusters',cluster);
  if(!externalMap){map.addControl(new mapboxgl.NavigationControl());map.on('error',()=>setMapError(true));}
  return()=>{map.off('load',ready);map.off('click','research-points',click);map.off('click','research-clusters',cluster);if(!externalMap)map.remove();else{for(const id of ['research-labels','research-points','research-counts','research-clusters'])if(map.getLayer(id))map.removeLayer(id);if(map.getSource('research-places'))map.removeSource('research-places');}mapRef.current=null;};
 },[externalMap]);
 useEffect(()=>{
  const map=mapRef.current;if(!map?.isStyleLoaded())return;
  const geo={type:'FeatureCollection',features:matches.map(r=>({type:'Feature',geometry:{type:'Point',coordinates:[r.longitude,r.latitude]},properties:{id:r.id,year:r.year?String(r.year):''}}))};
  const existing=map.getSource('research-places');
  if(existing)existing.setData(geo);else{
   map.addSource('research-places',{type:'geojson',cluster:true,clusterRadius:35,data:geo});
   map.addLayer({id:'research-clusters',type:'circle',source:'research-places',filter:['has','point_count'],paint:{'circle-color':'#FF9500','circle-radius':22}});
   map.addLayer({id:'research-counts',type:'symbol',source:'research-places',filter:['has','point_count'],layout:{'text-field':['get','point_count_abbreviated'],'text-size':12}});
   map.addLayer({id:'research-points',type:'circle',source:'research-places',filter:['!',['has','point_count']],paint:{'circle-color':'#FFB840','circle-radius':8,'circle-stroke-width':2,'circle-stroke-color':'#fff'}});
   map.addLayer({id:'research-labels',type:'symbol',source:'research-places',filter:['!',['has','point_count']],layout:{'text-field':['get','year'],'text-offset':[0,1.5],'text-size':12},paint:{'text-color':'#fff','text-halo-color':'#101b28','text-halo-width':2}});
  }
  if(matches.length){const bounds=new mapboxgl.LngLatBounds();matches.forEach(r=>bounds.extend([r.longitude,r.latitude]));map.fitBounds(bounds,{padding:45,maxZoom:8,duration:600});}
 },[matches,mapReady]);
 useEffect(()=>{setSelected(null);},[mode,phase,term]);
 const position=selected?matches.findIndex(r=>r.id===selected.id):-1;
 return <section className="my-6 space-y-4 rounded-2xl border border-[#FF9500]/20 p-4 sm:p-6">
  <div><p className="text-xs uppercase tracking-widest text-[#FFB840]">History · Places · Evidence</p><h2 className="mt-2 text-2xl sm:text-3xl">Follow history across the map</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#C9B99A]">Follow the Seminole Wars and related Black Seminole history in chronological order. Open an event to read its context, then explore related archive records. Place markers show approximate sites or general areas.</p></div>
  <div className="flex flex-wrap gap-2" role="group" aria-label="Map layers">{(['history','archives'] as const).map(value=><button key={value} aria-pressed={mode===value} onClick={()=>setMode(value)} className={`rounded-full border px-4 py-2 text-sm ${mode===value?'border-[#FF9500] bg-[#FF9500]/15 text-[#FFB840]':'border-white/20'}`}>{value==='history'?'Historical timeline':'Mapped archive records'}</button>)}</div>
  {mode==='history'&&<label className="block text-sm">Choose a period<select value={phase} onChange={e=>setPhase(e.target.value)} className="mt-2 block w-full rounded-xl border border-white/15 bg-[#15202B] p-3"><option value="all">Full sequence · 1816–1914</option>{PHASES.map(p=><option key={p}>{p}</option>)}</select></label>}
  {parentQuery===undefined&&<input aria-label="Search historical map" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search a battle, fort, person, treaty or place…" className="w-full rounded-xl border border-white/15 bg-[#15202B] p-3"/>}
  <p className="text-xs text-[#C9B99A]">{mode==='history'?`${matches.length} sourced historical events · chronological order`:`${matches.length} retrieved archive records mapped for this search`}. Historical overviews and catalog records are separate layers.</p>
  {!externalMap&&<div ref={container} className="h-80 w-full rounded-xl sm:h-96" aria-label="Map of historical events and archive locations"/>}
  {mapError&&<p>Map unavailable; the timeline and records below remain usable.</p>}
  {mode==='archives'&&isError&&<p role="status" className="text-sm">Mapped archive records could not load. The sourced historical timeline remains available.</p>}
  {selected&&<article className="rounded-2xl border border-[#FF9500]/30 bg-white/5 p-4"><button className="float-right px-2" aria-label="Close selected event" onClick={()=>setSelected(null)}>×</button><p className="text-sm text-[#FFB840]">{selected.eventDate || `Catalog date: ${selected.record.date || 'not supplied'}`}</p><h3 className="mt-1 text-xl">{selected.record.title}</h3><p className="mt-1 text-xs">{selected.place_name} · {selected.precision_label}</p><p className="my-3 text-sm leading-relaxed">{selected.record.description}</p>{selected.record.imageUrl&&<img src={selected.record.imageUrl} alt={selected.record.title} loading="lazy" className="my-3 max-h-80 w-full rounded-lg object-contain"/>}<p className="text-xs text-[#C9B99A]">{selected.evidence}</p>{selected.geo_source&&<a href={selected.geo_source} target="_blank" rel="noreferrer" className="mt-2 block text-xs underline">Location reference</a>}<div className="mt-4 flex flex-wrap gap-3"><Link to={selected.internalUrl} className="rounded-full bg-[#FF9500] px-4 py-2 text-sm text-black">{mode==='history'?'Search related archive documents':'Read archive record'}</Link><a href={selected.record.recordUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-4 py-2 text-sm">{mode==='history'?'Historical source':'Original catalog source'}</a></div>{mode==='history'&&<div className="mt-4 flex justify-between gap-3"><button disabled={position<=0} onClick={()=>select(matches[position-1])} className="rounded-full border px-3 py-2 text-xs disabled:opacity-30">← Earlier event</button><button disabled={position<0||position>=matches.length-1} onClick={()=>select(matches[position+1])} className="rounded-full border px-3 py-2 text-xs disabled:opacity-30">Next event →</button></div>}</article>}
  <ol className="grid gap-3 sm:grid-cols-2">{matches.slice(0,visible).map((r,i)=><li key={r.id}><button onClick={()=>select(r)} aria-pressed={selected?.id===r.id} className="h-full w-full rounded-2xl border border-white/15 bg-white/[0.03] p-4 text-left hover:border-[#FF9500]/60"><p className="text-xs text-[#FFB840]">{mode==='history'?`${i+1}. ${r.eventDate}`:`Catalog date: ${r.record.date || 'not supplied'}`}</p><h3 className="mt-1 text-lg">{r.record.title}</h3><p className="mt-1 text-xs text-[#C9B99A]">{r.place_name}</p></button></li>)}</ol>
  {matches.length>visible&&<button className="rounded-full border px-4 py-2 text-sm" onClick={()=>setVisible(v=>v+25)}>Show more {mode==='history'?'events':'records'}</button>}
  {!matches.length&&<p className="text-sm">No match in this layer. <Link className="text-[#FFB840] underline" to={`/archives?q=${encodeURIComponent(term)}`}>Search National Archives and Library of Congress catalogs</Link></p>}
 </section>;
}
