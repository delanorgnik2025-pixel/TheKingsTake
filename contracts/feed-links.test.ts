import { describe, expect, it } from 'vitest';
import { resolveFeedLink } from './feed-links';

describe('stored feed links', () => {
  const origin = 'https://thekingstake.com';
  it('resolves article links on this site', () => {
    expect(resolveFeedLink('/blog/nolan-wells', origin)).toEqual({ href: `${origin}/blog/nolan-wells`, hostname: 'thekingstake.com' });
  });
  it('preserves external web links', () => {
    expect(resolveFeedLink(' https://example.com/story?q=1 ', origin)).toEqual({ href: 'https://example.com/story?q=1', hostname: 'example.com' });
  });
  it('does not throw or make unsafe and malformed values clickable', () => {
    for (const value of [null, '', 'not a link', 'https://', 'https://[', 'javascript:alert(1)', 'data:text/html,test', '//example.com', 'https://user:password@example.com']) {
      expect(resolveFeedLink(value, origin)).toBeNull();
    }
  });
});
