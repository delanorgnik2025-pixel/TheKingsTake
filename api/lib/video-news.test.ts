import { describe, expect, it } from 'vitest';
import { emptyVideo, parseVideo, videoNewsSchema, videoSource, safeAsset, parseUpdates } from '@contracts/video-news';
describe('video news trust boundary', () => {
 it('accepts canonical provider URLs and discards untrusted parameters', () => {
  expect(videoSource('youtube','https://youtu.be/abcdefghijk?autoplay=1')).toBe('https://www.youtube-nocookie.com/embed/abcdefghijk');
  expect(videoSource('vimeo','https://vimeo.com/12345')).toBe('https://player.vimeo.com/video/12345');
 });
 it.each(['javascript:alert(1)','https://youtube.com.evil.test/watch?v=abcdefghijk','https://evil.test/embed/abcdefghijk','http://youtube.com/watch?v=abcdefghijk','https://user:password@youtube.com/watch?v=abcdefghijk'])('rejects unsafe provider URL %s', value => expect(videoSource('youtube',value)).toBeNull());
 it('allowlists direct media and rejects arbitrary third-party files', () => {
  expect(videoSource('direct','/media/report.mp4')).toBe('https://thekingstake.com/media/report.mp4');
  expect(videoSource('direct','https://evil.test/report.mp4')).toBeNull();
  expect(videoSource('direct','https://thekingstake.com/report.html')).toBeNull();
 });
 it('does not render disabled, missing, malformed or incomplete video', () => {
  for (const value of [null,'garbage',JSON.stringify(emptyVideo),JSON.stringify({...emptyVideo,enabled:true})]) expect(parseVideo(value)).toBeNull();
  expect(videoNewsSchema.safeParse({...emptyVideo,enabled:true,url:'https://youtu.be/abcdefghijk',title:'Report',publicationDate:'2026-10-09T14:30:00Z'}).success).toBe(true);
 });
 it('rejects unsafe asset URLs and malformed timeline', () => {
  expect(safeAsset('//evil.test/poster.jpg')).toBeNull();
  expect(safeAsset('javascript:alert(1)')).toBeNull();
  expect(parseUpdates('[{"date":"wrong","text":"update"}]')).toEqual([]);
 });
});
