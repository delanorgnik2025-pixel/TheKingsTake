import {beforeEach,describe,expect,it,vi} from 'vitest';
const mocks=vi.hoisted(()=>({query:vi.fn(),execute:vi.fn(),end:vi.fn(),enabled:true,existing:false,days:0}));
vi.mock('mysql2/promise',()=>({default:{createConnection:async()=>mocks}}));
vi.mock('../archive',()=>({normalizeNationalArchivesResponse:()=>({results:Array.from({length:20},(_,i)=>({id:`nara-${i}`,title:'Church in Utah',description:'Church in Utah',locations:['Denver'],recordUrl:`https://catalog.archives.gov/id/${i}`}))})}));
import {runResearchAgent} from './agent';
beforeEach(()=>{vi.clearAllMocks();mocks.enabled=true;mocks.existing=false;mocks.days=0;
 mocks.query.mockImplementation(async(s:string)=>{
 if(s.includes('GET_LOCK'))return [[{acquired:1}]];
 if(s.includes('COUNT(*)'))return [[{total:mocks.days}]];
 if(s.includes('research_agent_settings'))return [[{enabled:mocks.enabled,topics:JSON.stringify(['Utah churches','Utah towns'])}]];
 if(s.includes('research_agent_runs'))return [mocks.existing?[{status:'completed'}]:[]];return [[]];});
 mocks.execute.mockResolvedValue([{}]);vi.stubEnv('DATABASE_URL','test');vi.stubEnv('NARA_API_KEY','test');vi.stubEnv('OPENAI_API_KEY','test');
 vi.stubGlobal('fetch',vi.fn(async(url:string|URL)=>({ok:true,json:async()=>String(url).includes('openai')?{choices:[{message:{content:'{"places":[]}'}}]}:{body:{hits:{hits:[]}}}})));
});
describe('daily agent controls',()=>{
 it('advances archive pages on later research days',async()=>{mocks.days=2;await runResearchAgent();const urls=vi.mocked(fetch).mock.calls.map(([u])=>String(u)).filter(u=>u.includes('catalog.archives.gov'));expect(urls).toHaveLength(2);expect(urls.every(u=>new URL(u).searchParams.get('page')==='3')).toBe(true)});
 it('performs no source calls while paused',async()=>{mocks.enabled=false;expect(await runResearchAgent()).toEqual({status:'paused'});expect(fetch).not.toHaveBeenCalled();expect(mocks.end).toHaveBeenCalled()});
 it('does not repeat an already claimed day',async()=>{mocks.existing=true;expect((await runResearchAgent()).alreadyRan).toBe(true);expect(fetch).not.toHaveBeenCalled()});
 it('caps source batches and AI calls, only inserts drafts, and releases lock',async()=>{const result=await runResearchAgent();expect(result.calls).toBe(10);expect(fetch).toHaveBeenCalledTimes(12);const inserts=mocks.execute.mock.calls.filter(([s])=>s.includes('INSERT IGNORE INTO research_agent_records'));expect(inserts).toHaveLength(10);expect(inserts.every(([s])=>!s.includes('approved'))).toBe(true);expect(mocks.query).toHaveBeenCalledWith("SELECT RELEASE_LOCK('aasotu_research_agent')")});
});
