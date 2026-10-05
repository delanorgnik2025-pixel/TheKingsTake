import {z} from 'zod';
import {TRPCError} from '@trpc/server';
import type {RowDataPacket} from 'mysql2/promise';
import {adminQuery,createRouter,publicQuery} from '../middleware';
import {toolPreview} from '../security/tool-preview';
import {agentDb,runResearchAgent,verifyResearchConnections} from './agent';
async function readState() {const c=await agentDb();try{const [settings]=await c.query<RowDataPacket[]>('SELECT * FROM research_agent_settings WHERE id=1');const [runs]=await c.query<RowDataPacket[]>('SELECT * FROM research_agent_runs ORDER BY day_key DESC LIMIT 14');const [records]=await c.query<RowDataPacket[]>('SELECT * FROM research_agent_records ORDER BY created_at DESC LIMIT 100');return {settings:settings[0],runs,records};}finally{await c.end();}}
export const researchRouter=createRouter({
 state:adminQuery.query(readState),
 verify:adminQuery.mutation(verifyResearchConnections),
 run:adminQuery.mutation(runResearchAgent),
 configure:adminQuery.input(z.object({enabled:z.boolean(),topics:z.array(z.string().trim().min(2).max(120)).min(1).max(2)})).mutation(async({input})=>{const c=await agentDb();try{await c.execute('UPDATE research_agent_settings SET enabled=?,topics=? WHERE id=1',[input.enabled,JSON.stringify(input.topics)]);return {ok:true};}finally{await c.end();}}),
 review:adminQuery.input(z.object({id:z.string().max(64),status:z.enum(['approved','rejected']),place:z.string().trim().max(191).default(''),latitude:z.number().min(-90).max(90).nullable(),longitude:z.number().min(-180).max(180).nullable(),evidence:z.string().trim().max(3000).default(''),precision:z.enum(['exact','approximate']).default('approximate'),rightsReviewed:z.boolean().default(false)})).mutation(async({input})=>{
  if(input.status==='approved' && (!input.place || !input.evidence || input.latitude===null || input.longitude===null || !input.rightsReviewed))throw new TRPCError({code:'BAD_REQUEST',message:'Approval requires a place, coordinates, location evidence, and review of rights and sensitive locations.'});
  const c=await agentDb();try{await c.execute('UPDATE research_agent_records SET status=?,place_name=?,latitude=?,longitude=?,evidence=?,precision_label=?,rights_reviewed=?,reviewed_at=CURRENT_TIMESTAMP WHERE id=?',[input.status,input.place,input.latitude,input.longitude,input.evidence,input.precision,input.rightsReviewed,input.id]);return {ok:true};}finally{await c.end();}
 }),
 places:publicQuery.query(async({ctx})=>{await toolPreview(ctx.req,'archives','request');const c=await agentDb();try{const [rows]=await c.query<RowDataPacket[]>("SELECT id,place_name,latitude,longitude,precision_label,evidence,record_json FROM research_agent_records WHERE status='approved' AND rights_reviewed=1 ORDER BY reviewed_at DESC LIMIT 200");return rows.map(row=>({id:String(row.id),place_name:String(row.place_name),latitude:Number(row.latitude),longitude:Number(row.longitude),precision_label:String(row.precision_label),evidence:String(row.evidence),record:JSON.parse(row.record_json)}));}finally{await c.end();}})
});
