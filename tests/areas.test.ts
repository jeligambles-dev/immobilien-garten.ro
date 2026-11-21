import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { AREA_COORDS, pinsFor } from '../src/lib/areas.ts';

const data = JSON.parse(readFileSync(new URL('../data/site-content.json', import.meta.url), 'utf8'));

test('every bundled coverage area has map coordinates', () => {
  for (const a of data.coveringAreas) assert.ok(AREA_COORDS[a], `missing coords for ${a}`);
});
test('coordinates sit around Timișoara (within ~25 km)', () => {
  const [lat0, lng0] = AREA_COORDS['Timișoara'];
  for (const [name, [lat, lng]] of Object.entries(AREA_COORDS)) {
    assert.ok(Math.abs(lat - lat0) < 0.25 && Math.abs(lng - lng0) < 0.35, name);
  }
});
test('pinsFor skips unknown names instead of crashing', () => {
  const pins = pinsFor(['Timișoara', 'Localitate Nouă']);
  assert.deepEqual(pins.map(p => p.name), ['Timișoara']);
});
