import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SERVICES, STORY_STARTS, priceFor } from '../src/lib/services.ts';

test('9 services in video order', () => {
  assert.deepEqual(SERVICES.map(s => s.slug), ['pavaje','tuns-gazon','scarificare','gazon-rulou','gazon-artificial','gard-viu','toaletare-pomi','plantari','irigatii']);
});
test('story starts match video cuts', () => {
  assert.deepEqual(STORY_STARTS, [0, 2.96, 6, 9, 11.79, 14.79, 17.83, 20.71, 23.63, 26.54]);
  assert.deepEqual(SERVICES.map(s => s.segmentStart), STORY_STARTS.slice(1));
});
test('priceFor uses row by id', () => {
  assert.deepEqual(priceFor(SERVICES[1], [{ id: '1', title: 'Tuns Gazon', price: 'De la 0.50 lei/mp', priceMin: 0.5, priceMax: 1.5, unit: 'mp' }]),
    { label: 'de la 0.50 lei/mp', min: 0.5, max: 1.5, unit: 'mp' });
});
test('priceFor falls back when row missing', () => {
  assert.equal(priceFor(SERVICES[1], []).label, 'Ofertă personalizată');
  assert.equal(priceFor(SERVICES[1], undefined).min, null);
});
test('pavaje never priced', () => {
  assert.equal(priceFor(SERVICES[0], [{ id: '1', title: 'x', price: '1' }]).min, null);
});
