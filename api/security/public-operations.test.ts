import {describe,it,expect} from 'vitest';
import {isUnauthenticatedOperation} from './public-operations';
describe('public Feed and enrollment boundary',()=>{
 it('permits public reading and narrow course enrollment',()=>{
  for(const op of ['feed.list','feed.getById','blog.list','courses.enroll']) expect(isUnauthenticatedOperation(op)).toBe(true);
 });
 it('retains the entrance boundary for writes, private audiences and live providers',()=>{
  for(const op of ['feed.like','feed.create','member.createComment','courses.adminEnrollments','engagement.adminOverview','live.status']) expect(isUnauthenticatedOperation(op)).toBe(false);
 });
});
