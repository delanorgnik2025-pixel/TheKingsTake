import {describe,it,expect} from 'vitest';
import {supportedSuggestions,researchDay} from './evidence';
import type {ArchiveRecord} from '../archive';
const record:ArchiveRecord={id:'nara-1',title:'Church in Salt Lake City',description:'Photograph of a church in Salt Lake City.',locations:['Denver'],date:null,format:[],subjects:[],imageUrl:null,recordUrl:'https://catalog.archives.gov/id/1',rights:null,hasDigitalImage:false,repository:'National Archives'};
describe('research location evidence',()=>{
 it('rejects repository addresses and fabricated quotes',()=>{expect(supportedSuggestions(record,[{place:'Denver',evidence:'Repository in Denver'},{place:'Ogden',evidence:'Photograph in Ogden'}])).toEqual([])});
 it('preserves source-supported suggestions without inventing coordinates',()=>{expect(supportedSuggestions(record,[{place:'Salt Lake City',evidence:'church in Salt Lake City'}])).toEqual([{place:'Salt Lake City',evidence:'church in Salt Lake City'}])});
 it('rejects malformed model output',()=>{expect(supportedSuggestions(record,{places:[]})).toEqual([]);expect(supportedSuggestions(record,[null,{place:5,evidence:'Salt Lake City'}])).toEqual([])});
 it('uses an Eastern day so UTC midnight cannot trigger a second daily run',()=>{expect(researchDay(new Date('2026-10-06T02:00:00Z'))).toBe('2026-10-05')});
});
