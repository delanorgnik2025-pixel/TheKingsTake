import type {RowDataPacket,ResultSetHeader} from 'mysql2/promise';
import {agentDb} from './agent';
import {easternDailyKey,easternHour} from '../newsletter-automation-utils';
import {dailyAlmanac} from '../../contracts/daily-almanac';

// One durable website post per Eastern day. No AI, media or external API calls.
export async function runDailyAlmanac(now=new Date()){
 if(process.env.DAILY_ALMANAC_ENABLED==='false')return {status:'paused'};
 if(easternHour(now)<8)return {status:'outside schedule'};
 const day=easternDailyKey(now),c=await agentDb();let locked=false;
 try{
  const [lock]=await c.query<RowDataPacket[]>('SELECT GET_LOCK(?,0) AS acquired',['aasotu_daily_almanac']);locked=lock[0]?.acquired===1;
  if(!locked)return {status:'busy'};
  const [rows]=await c.query<RowDataPacket[]>("SELECT status FROM agent_worker_runs WHERE kind='almanac' AND slot_key=?",[day]);
  if(rows[0]?.status==='completed')return {status:'completed',alreadyRan:true};
  const issue=dailyAlmanac(day);
  await c.beginTransaction();
  try{
   const [post]=await c.execute<ResultSetHeader>('INSERT INTO feed_posts (body,link_url,link_title) VALUES (?,?,?)',[issue.body,`https://thekingstake.com/spirit-and-symbol/${issue.entry.slug}`,issue.entry.title]);
   await c.execute("INSERT INTO agent_worker_runs (kind,slot_key,status,notes,completed_at) VALUES ('almanac',?,'completed',?,CURRENT_TIMESTAMP) ON DUPLICATE KEY UPDATE status='completed',notes=VALUES(notes),completed_at=CURRENT_TIMESTAMP",[day,`Daily zodiac reflection and sourced reading; Feed post #${post.insertId}; no AI calls`]);
   await c.commit();console.log(`[almanac] ${day}: published one subscriber Feed post #${post.insertId}; no AI calls`);
   return {status:'completed',postId:post.insertId};
  }catch(error){await c.rollback();throw error;}
 }finally{if(locked)await c.query('SELECT RELEASE_LOCK(?)',['aasotu_daily_almanac']);await c.end();}
}
