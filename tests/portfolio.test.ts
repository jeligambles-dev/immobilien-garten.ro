import { test } from 'node:test';
import assert from 'node:assert/strict';
import { serviceFilters } from '../src/lib/portfolio.ts';

test('filters come from the services actually used in projects', () => {
  const f = serviceFilters([
    { services: ['Montaj Gazon Rulou', 'Pavaje'] },
    { services: ['Pavaje', 'Gazon Artificial'] },
  ]);
  assert.deepEqual(f, ['Toate', 'Gazon Artificial', 'Montaj Gazon Rulou', 'Pavaje']);
});
test('no projects → only "Toate"', () => {
  assert.deepEqual(serviceFilters([]), ['Toate']);
});
