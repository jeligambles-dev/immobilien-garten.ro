import { test } from 'node:test';
import assert from 'node:assert/strict';
import { segmentAt, snapToFrame, easeStep } from '../src/lib/scrub.ts';
const STARTS = [0, 2.96, 6, 9, 11.79, 14.79, 17.83, 20.71, 23.63, 26.54];

test('segmentAt returns last start <= t', () => {
  assert.equal(segmentAt(0, STARTS), 0);
  assert.equal(segmentAt(6.01, STARTS), 2);
  assert.equal(segmentAt(29.9, STARTS), 9);
});
test('snapToFrame rounds to nearest frame', () => {
  assert.equal(snapToFrame(1.02, 24), 1);
  assert.equal(snapToFrame(1.03, 24), 1 + 1 / 24);
});
test('easeStep converges and snaps to target', () => {
  let c = 0; for (let i = 0; i < 400; i++) c = easeStep(c, 1, 1);
  assert.equal(c, 1);
});
test('easeStep is frame-rate independent', () => {
  let a = 0; for (let i = 0; i < 2; i++) a = easeStep(a, 1, 1);
  const b = easeStep(0, 1, 2);
  assert.ok(Math.abs(a - b) < 1e-9);
});
