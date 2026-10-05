import {useEffect,useRef,useState} from 'react';
import {Link} from 'react-router';
import {trpc} from '@/providers/trpc';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
export default function ResearchPlaces(){
 const {data}=trpc.research.places.useQuery(undefined,{staleTime:60000,retry:false});
 const container=useRef<HTMLDivElement>(null);const [selected,setSelected]=useState<any>(null);const [mapError,setMapError]=useState(false);
 useEffect(()=>{
  if(!data?.length || !container.current || !import.meta.env.VITE_MAPBOX_TOKEN)return;
  const map=new mapboxgl.Map({container:container.current,accessToken:import.meta.env.VITE_MAPBOX_TOKEN,style:'mapbox://styles/mapbox/dark-v11',center:[-98,39],zoom:3});
  map.addControl(new mapboxgl.NavigationControl());
  map.on('error',()=>setMapError(true));
  map.on('load',()=>{
   map.addSource('research-places',{type:'geojson',cluster:true,clusterRadius:45,data:{type:'FeatureCollection',features:data.map(r=>({type:'Feature' as const,geometry:{type:'Point' as const,coordinates:[r.longitude,r.latitude]},properties:{id:r.id}}))}});
   map.addLayer({id:'research-clusters',type:'circle',source:'research-places',filter:['has','point_count'],paint:{'circle-color':'#FF9500','circle-radius':22}});
   map.addLayer({id:'research-counts',type:'symbol',source:'research-places',filter:['has','point_count'],layout:{'text-field':['get','point_count_abbreviated'],'text-size':12}});
   map.addLayer({id:'research-points',type:'circle',source:'research-places',filter:['!',['has','point_count']],paint:{'circle-color':'#FFB840','circle-radius':8,'circle-stroke-width':2,'circle-stroke-color':'#fff'}});
   map.on('click','research-points',e=>{const f=e.features?.[0] as unknown as {properties?:{id?:string}};const id=f?.properties?.id;setSelected(data.find(r=>r.id===id));});
   map.on('click','research-clusters',e=>{const f=e.features?.[0] as unknown as {geometry:{type:string;coordinates:number[]}};if(f?.geometry.type==='Point')map.easeTo({center:f.geometry.coordinates as [number,number],zoom:map.getZoom()+2});});
  });return ()=>map.remove();
 },[data]);
 if(!data?.length)return null;
 return <section className="mb-8 space-y-4 rounded-2xl border border-[#FF9500]/20 p-4"><h2 className="text-2xl">Places connected to records</h2><p className="text-sm text-[#C9B99A]">Reviewed location matches. Approximate markers represent research areas, not exact historical boundaries.</p><div ref={container} className="h-80 w-full rounded-xl" aria-label="Map of reviewed archive locations"/>{mapError&&<p className="text-sm">Map unavailable; use the location list below.</p>}<div className="flex flex-wrap gap-2">{data.map(r=><button key={r.id} onClick={()=>setSelected(r)} className="rounded-full border border-white/20 px-3 py-2 text-sm">{r.place_name}</button>)}</div>{selected&&<article className="rounded-xl bg-white/5 p-4"><h3 className="text-xl">{selected.record.title}</h3><p>{selected.place_name} · {selected.precision_label}</p>{selected.record.imageUrl&&<img src={selected.record.imageUrl} alt={selected.record.title} loading="lazy" className="my-3 max-h-80 w-full rounded-lg object-contain"/>}<p className="my-3 text-sm">{selected.record.description}</p><p className="text-xs">Location evidence: {selected.evidence}</p><Link to={`/archives/nara/${selected.id.replace('nara-','')}`} className="mt-3 inline-block text-[#FFB840] underline">Explore this archive record</Link></article>}</section>;
}
