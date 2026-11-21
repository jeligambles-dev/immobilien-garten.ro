import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseQty, estimateRange, formatLei } from '../src/lib/estimate.ts';

test('parseQty accepts comma and dot decimals', () => {
  assert.equal(parseQty('12,5'), 12.5);
  assert.equal(parseQty('120'), 120);
  assert.equal(parseQty(' 7.5 '), 7.5);
});
test('parseQty rejects empty, zero, negative, text', () => {
  for (const b of ['', '0', '-3', 'abc', '1e999']) assert.equal(parseQty(b), null, b);
});
test('estimateRange multiplies and rounds', () => {
  assert.deepEqual(estimateRange(0.5, 1.5, 200), { low: 100, high: 300 });
  assert.deepEqual(estimateRange(0.5, 1.5, 33), { low: 17, high: 50 });
});
test('estimateRange null when unpriced or no qty', () => {
  assert.equal(estimateRange(null, null, 200), null);
  assert.equal(estimateRange(1, 2, null), null);
});
test('formatLei uses ro-RO grouping', () => {
  assert.equal(formatLei(1250).replace(/\s/g, ' '), '1.250 lei');
});

test('parseQty reads Romanian thousands separators', () => {
  assert.equal(parseQty('1.500'), 1500);
  assert.equal(parseQty('12.000'), 12000);
  assert.equal(parseQty('1.500,5'), 1500.5);
  assert.equal(parseQty('1.5'), 1.5);
});
test('parseQty rejects absurdly large quantities', () => {
  assert.equal(parseQty('100000'), 100000);
  assert.equal(parseQty('100001'), null);
  assert.equal(parseQty('99999999999999999999'), null);
});
