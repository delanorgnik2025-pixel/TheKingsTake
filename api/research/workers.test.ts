import {beforeEach,describe,it,expect,vi} from 'vitest';
const m=vi.hoisted(()=>({query:vi.fn(),execute:vi.fn(),end:vi.fn(),beginTransaction:vi.fn(),commit:vi.fn(),rollback:vi.fn(),enabled:true,existing:false,research:vi.fn(),draft:vi.fn(),image:vi.fn()}));
vi.mock('./agent',()=>({agentDb:async()=>m,archiveBatch:vi.fn(),suggest:vi.fn()}));
vi.mock('../newsletter-automation',()=>({researchCurrentNews:m.research,writeDraft:m.draft,findCommonsImage:m.image}));
import {runAutonomousWorker,workerSlot,trustedSources} from './workers';
beforeEach(()=>{vi.clearAllMocks();m.enabled=true;m.existing=false;m.query.mockImplementation(async(s:string)=>{
 if(s.includes('GET_LOCK'))return [[{acquired:1}]];
 if(s.includes('agent_controls'))return [[{feed_enabled:m.enabled,map_enabled:m.enabled}]];
 if(s.includes('SELECT status'))return [m.existing?[{status:'completed'}]:[]];return [[]];
});m.execute.mockResolvedValue([{insertId:42}]);m.research.mockResolvedValue({text:'Verified research',sources:[{url:'https://www.noaa.gov/story',title:'NOAA'},{url:'https://apnews.com/story',title:'AP'}]});m.draft.mockResolvedValue({articleTitle:'Verified weather update',articleContent:'Factual context. '.repeat(40),articleExcerpt:'A sourced update.'});m.image.mockResolvedValue({url:'https://thekingstake.com/images/news-real-weather-20260929.jpg',credit:'Archive context image',sourceUrl:null});vi.stubEnv('OPENAI_API_KEY','test')});
describe('autonomous worker schedule and publication',()=>{
 it('has four Eastern feed slots with no midnight backlog',()=>{expect(workerSlot('feed',new Date('2026-10-05T16:00:00Z'))).toBe('2026-10-05-12');expect(workerSlot('feed',new Date('2026-10-05T07:00:00Z'))).toBeNull();expect(workerSlot('map',new Date('2026-10-05T16:00:00Z'))).toBe('2026-10-05-12')});
 it('honors pause and durable slot claims',async()=>{m.enabled=false;expect((await runAutonomousWorker('feed',new Date('2026-10-05T16:00Z'))).status).toBe('paused');expect(m.research).not.toHaveBeenCalled();m.enabled=true;m.existing=true;expect((await runAutonomousWorker('feed',new Date('2026-10-05T16:00Z'))).alreadyRan).toBe(true);expect(m.research).not.toHaveBeenCalled()});
 it('publishes article and internal feed link atomically without emailing',async()=>{const r=await runAutonomousWorker('feed',new Date('2026-10-05T16:00Z'));expect(r.status).toBe('completed');expect(m.beginTransaction).toHaveBeenCalled();expect(m.commit).toHaveBeenCalled();const feed=m.execute.mock.calls.find(([s])=>s.includes('INSERT INTO feed_posts'));expect(feed?.[1][1]).toMatch(/^https:\/\/thekingstake.com\/blog\//);expect(m.research).toHaveBeenCalledTimes(1)});
 it('withholds publishing when trusted source minimum fails',async()=>{m.research.mockResolvedValue({text:'Unsupported brief',sources:[{url:'https://random-blog.example/a',title:'Blog'}]});expect((await runAutonomousWorker('feed',new Date('2026-10-05T16:00Z'))).status).toBe('failed');expect(m.beginTransaction).not.toHaveBeenCalled()});
 it('rejects lookalike provider hostnames',()=>expect(trustedSources([{url:'https://apnews.com.fake.example/a'},{url:'https://www.noaa.gov/a'}])).toHaveLength(1));
});
