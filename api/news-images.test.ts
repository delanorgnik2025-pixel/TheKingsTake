import {describe,it,expect} from 'vitest';
import {newsImageForUrl} from '../contracts/news-images';
describe('editorial image credit lookup',()=>{
 it('matches exact asset paths and does not assign credits from a filename suffix',()=>{
  expect(newsImageForUrl('https://external.example/unknown.jpg')).toBeUndefined();
  expect(newsImageForUrl('/images/doechii-world-pride-archive.jpg')?.credit).toContain('Thesavagenorwegian');
  expect(newsImageForUrl('https://thekingstake.com/images/kai-cenat-archive.jpg?version=1')?.credit).toContain('Agent 00 Gaming');
 });
});
