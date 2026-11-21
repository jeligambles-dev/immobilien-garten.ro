import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mergeServiceContent, resolveFaq, resolveStoryVideo, DEFAULT_STORY_VIDEO } from '../src/lib/contentMerge.ts';

const base = {
  metaTitle: 'T', metaDescription: 'D', intro: 'I', priceNote: 'P',
  features: ['a', 'b'], process: [{ step: 's', desc: 'd' }], faq: [{ q: 'q', a: 'a' }],
};

test('no overrides → defaults', () => {
  assert.deepEqual(mergeServiceContent(base, undefined), base);
});
test('non-empty override fields win, empty ones fall back', () => {
  const m = mergeServiceContent(base, { intro: 'Nou', priceNote: '', features: [] });
  assert.equal(m.intro, 'Nou');
  assert.equal(m.priceNote, 'P');
  assert.deepEqual(m.features, ['a', 'b']);
});
test('override lists drop blank rows', () => {
  const m = mergeServiceContent(base, {
    features: ['x', '  ', 'y'],
    faq: [{ q: 'Q1', a: 'A1' }, { q: '', a: 'orphan' }],
    process: [{ step: 'S1', desc: 'D1' }, { step: ' ', desc: '' }],
  });
  assert.deepEqual(m.features, ['x', 'y']);
  assert.deepEqual(m.faq, [{ q: 'Q1', a: 'A1' }]);
  assert.deepEqual(m.process, [{ step: 'S1', desc: 'D1' }]);
});
test('garbage overrides are ignored', () => {
  assert.deepEqual(mergeServiceContent(base, { intro: 42, features: 'nope', faq: [null, 7] } as never), base);
});
test('resolveFaq falls back to defaults when empty/invalid', () => {
  const d = [{ q: 'd', a: 'd' }];
  assert.deepEqual(resolveFaq(d, undefined), d);
  assert.deepEqual(resolveFaq(d, []), d);
  assert.deepEqual(resolveFaq(d, [{ q: 'n', a: 'n' }, { q: '', a: '' }]), [{ q: 'n', a: 'n' }]);
});
test('resolveStoryVideo keeps defaults for missing or unsafe urls', () => {
  assert.deepEqual(resolveStoryVideo(undefined), DEFAULT_STORY_VIDEO);
  const v = resolveStoryVideo({ desktop: '/api/uploads/1-a.mp4', mobile: 'javascript:alert(1)', poster: '' });
  assert.equal(v.desktop, '/api/uploads/1-a.mp4');
  assert.equal(v.mobile, DEFAULT_STORY_VIDEO.mobile);
  assert.equal(v.poster, DEFAULT_STORY_VIDEO.poster);
});
