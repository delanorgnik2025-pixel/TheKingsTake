import {describe,it,expect} from 'vitest';
import {chooseGazetteerMatch,generalAreaMatch} from './geography';
import type {ArchiveRecord} from '../archive';
const record={title:'Salt Lake City, Utah',description:'A photograph of Salt Lake City, Utah.'} as ArchiveRecord;
const quote={place:'Salt Lake City',evidence:'Salt Lake City, Utah'};
const feature={layerId:3,attributes:{gaz_name:'Salt Lake City',gaz_id:1446907,gaz_featureclass:'Populated Place',state_alpha:'UT'},geometry:{points:[[-111.891,40.76]]}};
describe('automatic geographic publication',()=>{
 it('accepts one exact named, state-supported USGS match',()=>expect(chooseGazetteerMatch(record,quote,{results:[feature]})?.state).toBe('UT'));
 it('rejects ambiguous named features',()=>expect(chooseGazetteerMatch(record,quote,{results:[feature,{...feature,attributes:{...feature.attributes,gaz_id:2}}]})).toBeNull());
 it('rejects unsupported state, broad geometry and sensitive locations',()=>{expect(chooseGazetteerMatch({...record,title:'Salt Lake City',description:''}, {place:'Salt Lake City',evidence:'Salt Lake City'},{results:[feature]})).toBeNull();expect(chooseGazetteerMatch(record,quote,{results:[{...feature,geometry:{points:[[-111,40],[-112,41]]}}]})).toBeNull();expect(chooseGazetteerMatch({...record,description:'Salt Lake City, Utah burial location'},quote,{results:[feature]})).toBeNull()});
 it('never accepts a fabricated evidence quote or repository address',()=>expect(chooseGazetteerMatch(record,{place:'Salt Lake City',evidence:'office in Salt Lake City, Utah'},{results:[feature]})).toBeNull());
});

describe('source-supported general areas',()=>{
 it('uses a state viewing anchor without pretending to locate a site',()=>{const match=generalAreaMatch(record,[quote]);expect(match?.name).toBe('Utah — general area');expect(match?.scope).toBe('state area');expect(match?.latitude).toBe(39.3);});
 it('falls back to the one state named by the source even when a suggested place is unusable',()=>{const match=generalAreaMatch(record,[{place:'Florida',evidence:'Florida shoreline'}]);expect(match?.state).toBe('Utah');expect(match?.scope).toBe('state area');});
 it('leaves multiple-state geography unresolved instead of choosing arbitrarily',()=>expect(generalAreaMatch({title:'Utah and Nevada',description:''} as ArchiveRecord,[{place:'Utah',evidence:'Utah and Nevada'}])).toBeNull());
 it('does not confuse West Virginia with Virginia',()=>expect(generalAreaMatch({title:'West Virginia landscapes'} as ArchiveRecord,[{place:'West Virginia',evidence:'West Virginia landscapes'}])?.state).toBe('West Virginia'));
 it('allows sensitive records only at the supported state level',()=>expect(generalAreaMatch({...record,title:'Burial places in Utah'},[{place:'Utah',evidence:'Burial places in Utah'}])?.scope).toBe('state area'));
 it('rejects a repository-only state reference',()=>expect(generalAreaMatch({title:'Held at the archive office in Utah'} as ArchiveRecord,[{place:'Utah',evidence:'Held at the archive office in Utah'}])).toBeNull());
});
