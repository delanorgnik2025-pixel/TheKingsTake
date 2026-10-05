import {describe,it,expect} from 'vitest';
import {chooseGazetteerMatch} from './geography';
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
