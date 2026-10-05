import {describe,it,expect} from 'vitest';
import {RESEARCH_STARTING_PLACES} from '../../contracts/research-places';
describe('historical narrative map',()=>{
 it('provides a chronological multi-place foundation rather than one marker',()=>{expect(RESEARCH_STARTING_PLACES.length).toBe(14);expect(new Set(RESEARCH_STARTING_PLACES.map(r=>`${r.latitude},${r.longitude}`)).size).toBeGreaterThan(10);expect(RESEARCH_STARTING_PLACES.map(r=>r.year)).toEqual(RESEARCH_STARTING_PLACES.map(r=>r.year).sort((a,b)=>a-b));});
 it('keeps Florida searches useful while including aftermath beyond Florida',()=>{expect(RESEARCH_STARTING_PLACES.filter(r=>r.place_name.includes('Florida')).length).toBeGreaterThan(5);expect(RESEARCH_STARTING_PLACES.some(r=>r.place_name.includes('Texas'))).toBe(true);});
 it('distinguishes context events from catalog records and links to on-site document search',()=>{for(const row of RESEARCH_STARTING_PLACES){expect(row.id).toMatch(/^history-/);expect(row.internalUrl).toMatch(/^\/archives\?q=/);expect(row.record.recordUrl).toMatch(/^https:\/\//);expect(row.precision_label).not.toBe('exact');expect(Math.abs(row.latitude)).toBeLessThan(90);expect(Math.abs(row.longitude)).toBeLessThan(180);}});
});
