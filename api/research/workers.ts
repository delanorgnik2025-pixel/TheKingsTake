import type {RowDataPacket,ResultSetHeader} from 'mysql2/promise';
import {agentDb,archiveBatch,suggest} from './agent';
import {resolvePlace} from './geography';
import {researchDay,supportedSuggestions} from './evidence';
import {researchCurrentNews,writeDraft,findCommonsImage} from '../newsletter-automation';
import {NEWS_BEATS} from '../../contracts/news-beats';
import {easternHour} from '../newsletter-automation-utils';
import type {ArchiveRecord} from '../archive';
export function workerSlot(kind:'feed'|'map',now=new Date()){
 const h=easternHour(now);if(kind==='feed' && (h<8 || h>=24))return null;
 return `${researchDay(now)}-${String(kind==='feed'?8+4*Math.floor((h-8)/4):h).padStart(2,'0')}`;
}
const trusted=(raw:string)=>{try {const h=new URL(raw).hostname;return /(^|\.)(gov|mil)$/.test(h)||['reuters.com','apnews.com','bbc.com','bbc.co.uk','un.org','who.int','wmo.int','nature.com','science.org','sciencedirect.com','ecowas.int','au.int','energy.gov'].some(d=>h===d||h.endsWith('.'+d));}catch{return false;}};
export function trustedSources<T extends {url:string}>(sources:T[]){return sources.filter(s=>trusted(s.url));}
async function autoLocate(c:Awaited<ReturnType<typeof agentDb>>,row:RowDataPacket){
 const record=JSON.parse(row.record_json) as ArchiveRecord;
 const suggestions=supportedSuggestions(record,JSON.parse(row.suggestions_json || '[]'));
 for(const candidate of suggestions.slice(0,2)){
  const match=await resolvePlace(record,candidate);if(!match)continue;
  await c.execute("UPDATE research_agent_records SET status='approved',auto_published=1,place_name=?,latitude=?,longitude=?,evidence=?,precision_label='approximate',geo_source=?,reviewed_at=CURRENT_TIMESTAMP WHERE id=? AND status='draft'",[match.name,match.latitude,match.longitude,candidate.evidence,match.source,row.id]);return true;
 }return false;
}
export async function runAutonomousWorker(kind:'feed'|'map',now=new Date()){
 const slot=workerSlot(kind,now);if(!slot)return {status:'outside schedule'};
 const c=await agentDb();let locked=false,claimed=false;
 try {
  const [lock]=await c.query<RowDataPacket[]>('SELECT GET_LOCK(?,0) AS acquired',[`aasotu_${kind}_worker`]);locked=lock[0]?.acquired===1;if(!locked)return {status:'busy'};
  const [controls]=await c.query<RowDataPacket[]>('SELECT * FROM agent_controls WHERE id=1');if(!controls[0]?.[`${kind}_enabled`])return {status:'paused'};
  const [old]=await c.query<RowDataPacket[]>('SELECT status FROM agent_worker_runs WHERE kind=? AND slot_key=?',[kind,slot]);if(old.length && old[0].status!=='retry')return {status:old[0].status,alreadyRan:true};
  // No restart catch-up bursts. A slot is attempted once even if a provider fails.
  if(kind==='feed'){const [recent]=await c.query<RowDataPacket[]>("SELECT slot_key FROM agent_worker_runs WHERE kind='feed' AND status='completed' AND started_at>DATE_SUB(CURRENT_TIMESTAMP,INTERVAL 3 HOUR)");if(recent.length)return {status:'spacing guard'};}
  await c.execute("INSERT INTO agent_worker_runs (kind,slot_key,status) VALUES (?,?,'running') ON DUPLICATE KEY UPDATE status='running',notes=NULL,completed_at=NULL",[kind,slot]);claimed=true;
  let notes='';
  if(kind==='map'){
   const [settings]=await c.query<RowDataPacket[]>('SELECT * FROM research_agent_settings WHERE id=1');let added=0,mapped=0;
   if(settings[0]?.enabled){
    const [count]=await c.query<RowDataPacket[]>("SELECT COUNT(*) AS total FROM agent_worker_runs WHERE kind='map'");const index=Math.max(0,Number(count[0]?.total || 1)-1);
    const topics=[...new Set([...(JSON.parse(settings[0].topics) as string[]).slice(0,2),'Gullah','Black Seminole','Prospect Bluff','Apalachicola River'])];
    const cycles=Math.ceil(topics.length/2),recordIndex=Math.floor(index/cycles)%5,page=1+Math.floor(index/(cycles*5));
    for(const topic of [topics[(index*2)%topics.length],topics[(index*2+1)%topics.length]]){
     const records=await archiveBatch(topic,page);
     // Two new records per hour, at most 48 additional analyses/day.
     const record=records[recordIndex];if(!record)continue;
     const [exists]=await c.query<RowDataPacket[]>('SELECT id FROM research_agent_records WHERE id=?',[record.id]);if(exists.length)continue;
     const suggestions=process.env.OPENAI_API_KEY?await suggest(record):[];
     await c.execute('INSERT IGNORE INTO research_agent_records (id,title,record_json,suggestions_json,query_text) VALUES (?,?,?,?,?)',[record.id,record.title,JSON.stringify(record),JSON.stringify(suggestions),topic]);added++;
    }
   }
   const [pending]=await c.query<RowDataPacket[]>("SELECT * FROM research_agent_records WHERE status='draft' AND geo_source IS NULL ORDER BY created_at LIMIT 4");
   for(const row of pending){try{if(await autoLocate(c,row))mapped++;else await c.execute('UPDATE research_agent_records SET geo_source=? WHERE id=?',["Manual review required: ambiguous, broad, sensitive, or unsupported location.",row.id]);}catch{await c.execute('UPDATE research_agent_records SET geo_source=? WHERE id=?',["Location provider unavailable; manual review or a later explicit retry is needed.",row.id]);}}
   notes=`${added} new records; ${mapped} automatic location matches; ${pending.length-mapped} retained for review`;
  }else{
   if(!process.env.OPENAI_API_KEY)throw new Error('OpenAI key missing');
   const h=Number(slot.slice(-2));const day=Number(slot.slice(8,10));const beat=NEWS_BEATS[(day+Math.floor((h-8)/4))%NEWS_BEATS.length];
   const [recentTitles]=await c.query<RowDataPacket[]>("SELECT title FROM posts WHERE published=1 AND createdAt>DATE_SUB(CURRENT_TIMESTAMP,INTERVAL 24 HOUR) ORDER BY createdAt DESC LIMIT 20");
   const research=await researchCurrentNews(process.env.OPENAI_API_KEY,`${beat.focus} Avoid individual crime or missing-person allegations. Prefer reporting corroborated by at least two independent sources from primary agencies, universities, Reuters, AP or BBC. Avoid repeating these recent published headlines: ${JSON.stringify(recentTitles.map(r=>r.title))}. This is for scheduled website publication: use a dated context brief if there is no confirmed fresh development.`);
   const sources=trustedSources(research.sources);if(sources.length<2)throw new Error('Fewer than two trusted independent sources; publication withheld');
   const draft=await writeDraft(process.env.OPENAI_API_KEY,research.text,sources);const image=await findCommonsImage(draft.imageSearchTerm,beat.id);
   if(draft.articleTitle.length<10||draft.articleContent.length<300)throw new Error('Article validation failed');
   const [duplicate]=await c.query<RowDataPacket[]>('SELECT id FROM posts WHERE LOWER(title)=LOWER(?) AND published=1 AND createdAt>DATE_SUB(CURRENT_TIMESTAMP,INTERVAL 48 HOUR)',[draft.articleTitle]);if(duplicate.length)throw new Error('Duplicate recent headline; publication withheld');
   const slug=`${draft.articleTitle.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,150)}-feed-${slot}`;
   const content=`${draft.articleContent}\n\n## Sources\n${sources.map(s=>`- [${s.title.replace(/[\[\]]/g,'')}](${s.url})`).join('\n')}\n\n_Image: ${image.credit}${image.sourceUrl?' — '+image.sourceUrl:''}_`;
   await c.beginTransaction();
   try {
    await c.execute('INSERT INTO posts (title,slug,excerpt,content,category,coverImage,published,featured,news_beat,news_edition) VALUES (?,?,?,?,?,?,TRUE,FALSE,?,?)',[draft.articleTitle.slice(0,255),slug,draft.articleExcerpt,content,'DAILY NEWS',image.url.slice(0,500),beat.id,`feed-${slot}`]);
    const [post]=await c.execute<ResultSetHeader>('INSERT INTO feed_posts (body,link_url,link_title,image_url) VALUES (?,?,?,?)',[`${draft.articleExcerpt.slice(0,450)}\n\nRead the full story on The King’s Take.`, `https://thekingstake.com/blog/${slug}`,draft.articleTitle.slice(0,500),image.url]);
    notes=`Published ${beat.id} article and feed post #${post.insertId}; ${sources.length} trusted sources; ${slug}`;
    await c.execute("UPDATE agent_worker_runs SET status='completed',notes=?,completed_at=CURRENT_TIMESTAMP WHERE kind=? AND slot_key=?",[notes,kind,slot]);await c.commit();
   }catch(e){await c.rollback();throw e;}
  }
  if(kind==='map')await c.execute("UPDATE agent_worker_runs SET status='completed',notes=?,completed_at=CURRENT_TIMESTAMP WHERE kind=? AND slot_key=?",[notes,kind,slot]);
  console.log(`[${kind}-agent] ${slot}: ${notes}`);return {status:'completed',notes};
 }catch(e){
  // A failed fresh-news check can spotlight an existing published article, never invent a replacement.
  if(kind==='feed' && claimed){try {
   const [archive]=await c.query<RowDataPacket[]>("SELECT p.title,p.slug,p.coverImage,p.createdAt FROM posts p WHERE p.published=1 AND p.coverImage IS NOT NULL AND p.category IN ('DAILY NEWS','INVESTIGATION') AND NOT EXISTS (SELECT 1 FROM feed_posts f WHERE f.link_url=CONCAT('https://thekingstake.com/blog/',p.slug) AND f.created_at>DATE_SUB(CURRENT_TIMESTAMP,INTERVAL 30 DAY)) ORDER BY p.createdAt DESC LIMIT 1");
   const article=archive[0];if(article){
    const date=new Date(article.createdAt).toLocaleDateString('en-US',{timeZone:'America/New_York',year:'numeric',month:'long',day:'numeric'});
    await c.beginTransaction();
    try {const [r]=await c.execute<ResultSetHeader>('INSERT INTO feed_posts (body,link_url,link_title,image_url) VALUES (?,?,?,?)',[`From our published archive (${date}): ${article.title}\n\nExplore the full article and its sources on The King’s Take.`, `https://thekingstake.com/blog/${article.slug}`,article.title,article.coverImage]);
     const notes=`Archive spotlight feed post #${r.insertId}; fresh-news validation did not pass; ${article.slug}`;
     await c.execute("UPDATE agent_worker_runs SET status='completed',notes=?,completed_at=CURRENT_TIMESTAMP WHERE kind=? AND slot_key=?",[notes,kind,slot]);await c.commit();console.log(`[feed-agent] ${slot}: ${notes}`);return {status:'completed',notes};
    }catch(fallbackError){await c.rollback();throw fallbackError;}
   }
  }catch{console.error('[feed-agent] Archive fallback unavailable');}}
  const message=(e as Error).message.replace(/Bearer\s+\S+/g,'[redacted]').slice(0,200);if(claimed)await c.execute("UPDATE agent_worker_runs SET status='failed',notes=?,completed_at=CURRENT_TIMESTAMP WHERE kind=? AND slot_key=?",[message,kind,slot]);console.error(`[${kind}-agent] ${slot}: ${message}`);return {status:'failed',notes:message};
 }finally{if(locked)await c.query('SELECT RELEASE_LOCK(?)',[`aasotu_${kind}_worker`]);await c.end();}
}
export function startAutonomousWorkers(){
 const tick=()=>{void runAutonomousWorker('map').catch(()=>console.error('[map-agent] Database unavailable'));void runAutonomousWorker('feed').catch(()=>console.error('[feed-agent] Database unavailable'));};
 setTimeout(tick,30000).unref();setInterval(tick,5*60*1000).unref();console.log('[agents] Hourly map research and 08:00/12:00/16:00/20:00 Eastern feed schedule enabled.');
}
