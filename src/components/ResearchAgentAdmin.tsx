import {useEffect,useState} from 'react';
import {trpc} from '@/providers/trpc';
import {toast} from 'sonner';
function ReviewRecord({row,refresh}:{row:any;refresh:()=>void}) {
 const record=JSON.parse(row.record_json),suggestions=JSON.parse(row.suggestions_json || '[]');
 const [place,setPlace]=useState(row.place_name || suggestions[0]?.place || '');
 const [lat,setLat]=useState(row.latitude?.toString() || ''),[lng,setLng]=useState(row.longitude?.toString() || '');
 const [evidence,setEvidence]=useState(row.evidence || suggestions[0]?.evidence || '');
 const [precision,setPrecision]=useState<'exact'|'approximate'>(row.precision_label || 'approximate');
 const [checked,setChecked]=useState(false);
 const review=trpc.research.review.useMutation({onSuccess:refresh,onError:e=>toast.error(e.message)});
 const submit=(status:'approved'|'rejected')=>review.mutate({id:row.id,status,place,latitude:lat.trim()?Number(lat):null,longitude:lng.trim()?Number(lng):null,evidence,precision,rightsReviewed:checked});
 return <details className="rounded-2xl border border-white/10 p-4"><summary className="cursor-pointer text-[#FFB840]">{row.title} · {row.status}</summary><div className="mt-4 space-y-3 text-sm">
 <p>{record.description || 'No description supplied.'}</p><p>Search: {row.query_text} · Date: {record.date || 'unspecified'}</p>
 <a href={record.recordUrl} target="_blank" rel="noreferrer" className="underline">Review original archive record</a>
 <p>Image: {record.imageUrl?'available in source; review use restrictions':'not supplied'} · {record.rights || 'Rights not specified; check the original.'}</p>
 <p className="text-xs">AI suggestions are unverified. Repository office addresses are not depicted locations. Keep sensitive burial sites private.</p>
 {suggestions.map((s:any,i:number)=><p key={i}>Candidate: {s.place} — “{s.evidence}”</p>)}
 {row.status==='draft' && <><label className="block">Place name<input value={place} onChange={e=>setPlace(e.target.value)} className="mt-1 block w-full rounded-xl bg-black/20 p-3"/></label>
 <div className="grid gap-3 sm:grid-cols-2"><label>Latitude<input type="number" value={lat} onChange={e=>setLat(e.target.value)} className="block w-full rounded-xl bg-black/20 p-3"/></label><label>Longitude<input type="number" value={lng} onChange={e=>setLng(e.target.value)} className="block w-full rounded-xl bg-black/20 p-3"/></label></div>
 <label className="block">Location evidence and source URL<textarea value={evidence} onChange={e=>setEvidence(e.target.value)} className="block w-full rounded-xl bg-black/20 p-3"/></label>
 <select value={precision} onChange={e=>setPrecision(e.target.value as typeof precision)} className="rounded-xl bg-[#182635] p-3"><option value="approximate">Approximate location</option><option value="exact">Exact documented location</option></select>
 <label className="flex gap-2"><input type="checkbox" checked={checked} onChange={e=>setChecked(e.target.checked)}/>I reviewed image use restrictions and whether this location is appropriate to publish.</label>
 <div className="flex flex-wrap gap-3"><button disabled={review.isPending} onClick={()=>submit('approved')} className="rounded-full bg-[#FF9500] px-4 py-2 text-black">Approve location</button><button disabled={review.isPending} onClick={()=>submit('rejected')} className="rounded-full border px-4 py-2">Reject</button></div></>}
 </div></details>;
}
export default function ResearchAgentAdmin(){
 const state=trpc.research.state.useQuery(undefined,{refetchInterval:30000});const refresh=()=>void state.refetch();
 const [topics,setTopics]=useState(''),[enabled,setEnabled]=useState(true),[checks,setChecks]=useState<Record<string,string>|null>(null);
 useEffect(()=>{if(state.data?.settings){setTopics(JSON.parse(state.data.settings.topics).join('\n'));setEnabled(Boolean(state.data.settings.enabled));}},[state.data?.settings?.topics,state.data?.settings?.enabled]);
 const config=trpc.research.configure.useMutation({onSuccess:refresh,onError:e=>toast.error(e.message)});
 const verify=trpc.research.verify.useMutation({onSuccess:r=>{setChecks(r);refresh();},onError:e=>toast.error(e.message)});
 const run=trpc.research.run.useMutation({onSuccess:r=>{toast.success(r.alreadyRan?'Today’s run already recorded.':`Research: ${r.status}`);refresh();},onError:()=>toast.error('Research unavailable. Check connections and Railway logs.')});
 const savedChecks=state.data?.settings?.last_check?JSON.parse(state.data.settings.last_check):null;
 return <div className="space-y-6 text-[#C9B99A]"><h2 className="text-3xl text-[#F0EBE1]">Research Agent</h2><p>Find archival records and propose source-supported places. New discoveries stay private until reviewed. Maximum: 2 searches, 10 records and 10 small AI requests per day. No automatic map geocoding, publication, or email sending.</p>
 {state.error && <p role="alert">The research queue could not load. Check the deployment and database.</p>}
 <section className="space-y-4 rounded-2xl border border-white/10 p-5"><label className="flex gap-2"><input type="checkbox" checked={enabled} onChange={e=>setEnabled(e.target.checked)}/>Daily research enabled</label><label className="block">Topics (one per line; maximum two)<textarea value={topics} onChange={e=>setTopics(e.target.value)} className="mt-2 block w-full rounded-xl bg-black/20 p-3"/></label>
 <div className="flex flex-wrap gap-3"><button disabled={config.isPending} onClick={()=>config.mutate({enabled,topics:topics.split('\n').map(t=>t.trim()).filter(Boolean)})} className="rounded-full bg-[#FF9500] px-4 py-2 text-black">Save settings</button><button disabled={verify.isPending} onClick={()=>verify.mutate()} className="rounded-full border px-4 py-2">{verify.isPending?'Checking…':'Verify connections'}</button><button disabled={run.isPending} onClick={()=>run.mutate()} className="rounded-full border px-4 py-2">{run.isPending?'Researching…':'Run today’s research'}</button></div>
 {Object.entries(checks || savedChecks || {}).map(([key,value])=><p key={key} className="break-words text-sm">{key}: {String(value)}</p>)}</section>
 <h3 className="text-xl">Recent runs</h3>{state.data?.runs.map((r:any)=><div key={r.day_key} className="rounded-xl border border-white/10 p-3"><p>{r.day_key} · {r.status} · {r.records_added} new drafts · {r.ai_calls} AI calls</p><p className="whitespace-pre-wrap text-xs">{r.notes}</p></div>)}
 <h3 className="text-xl">Record review queue</h3>{!state.data?.records.length && <p>No records yet. The first scheduled run starts shortly after deployment.</p>}{state.data?.records.map((r:any)=><ReviewRecord key={r.id} row={r} refresh={refresh}/>)}</div>;
}
