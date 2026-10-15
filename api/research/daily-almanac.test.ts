import {beforeEach,afterEach,describe,it,expect,vi} from 'vitest';
const m=vi.hoisted(()=>({query:vi.fn(),execute:vi.fn(),end:vi.fn(),beginTransaction:vi.fn(),commit:vi.fn(),rollback:vi.fn(),done:false}));
vi.mock('./agent',()=>({agentDb:async()=>m}));
import {runDailyAlmanac} from './daily-almanac';
import {dailyAlmanac} from '../../contracts/daily-almanac';
beforeEach(()=>{vi.clearAllMocks();m.done=false;vi.stubEnv('DAILY_ALMANAC_ENABLED','true');m.query.mockImplementation(async(s:string)=>s.includes('GET_LOCK')?[[{acquired:1}]]:s.includes('SELECT status')?[m.done?[{status:'completed'}]:[]]:[[]]);m.execute.mockResolvedValue([{insertId:91}]);m.commit.mockImplementation(async()=>{m.done=true;});});
afterEach(()=>vi.unstubAllEnvs());
describe('daily subscriber almanac',()=>{
 it('publishes exactly once per Eastern day, with an atomic completion record',async()=>{
  expect((await runDailyAlmanac(new Date('2026-10-15T14:00Z'))).status).toBe('completed');
  expect((await runDailyAlmanac(new Date('2026-10-16T02:00Z'))).alreadyRan).toBe(true);
  expect(m.execute.mock.calls.filter(([s])=>s.includes('INSERT INTO feed_posts'))).toHaveLength(1);
  expect(m.commit).toHaveBeenCalledTimes(1);
 });
 it('rolls back a partial write so a later retry can publish safely',async()=>{
  m.execute.mockRejectedValueOnce(new Error('write failed'));
  await expect(runDailyAlmanac(new Date('2026-10-15T14:00Z'))).rejects.toThrow('write failed');
  expect(m.rollback).toHaveBeenCalledTimes(1);expect(m.commit).not.toHaveBeenCalled();
  expect((await runDailyAlmanac(new Date('2026-10-15T14:05Z'))).status).toBe('completed');
 });
 it('honors pause and morning boundary before touching the database',async()=>{
  expect((await runDailyAlmanac(new Date('2026-10-15T10:00Z'))).status).toBe('outside schedule');
  vi.stubEnv('DAILY_ALMANAC_ENABLED','false');expect((await runDailyAlmanac(new Date('2026-10-15T14:00Z'))).status).toBe('paused');
  expect(m.query).not.toHaveBeenCalled();
 });
 it('provides twelve distinct signs, a dated entertainment label and a sourced reading',()=>{
  const issue=dailyAlmanac('2026-10-15');expect(new Set(issue.signs.map(s=>s.sign)).size).toBe(12);
  expect(issue.body).toContain('entertainment');expect(issue.entry.sources.length).toBeGreaterThan(0);
  expect(dailyAlmanac('2026-10-16').body).not.toBe(issue.body);
 });
});
