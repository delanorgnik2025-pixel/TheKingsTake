import {describe,it,expect} from 'vitest';
import {isUnauthenticatedOperation} from './public-operations';
describe('public transport and protected procedure boundary',()=>{
 it('allows free news and enrollment and passes private Feed requests to subscriber authorization',()=>{
  for(const op of ['feed.list','feed.getById','blog.list','blog.bySlug','blog.videoList','courses.enroll']) expect(isUnauthenticatedOperation(op)).toBe(true);
 });
 it('retains the entrance boundary for writes, private audiences and live providers',()=>{
  for(const op of ['feed.like','feed.create','courses.adminEnrollments','engagement.adminOverview','live.status']) expect(isUnauthenticatedOperation(op)).toBe(false);
 });
});
