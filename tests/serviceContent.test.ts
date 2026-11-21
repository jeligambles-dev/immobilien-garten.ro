import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SERVICES } from '../src/lib/services.ts';
import { SERVICE_CONTENT } from '../src/lib/serviceContent.ts';

test('every service has complete page content', () => {
  for (const s of SERVICES) {
    const c = SERVICE_CONTENT[s.slug];
    assert.ok(c, `missing content for ${s.slug}`);
    assert.ok(c.features.length >= 4, `${s.slug} features`);
    assert.equal(c.process.length, 4, `${s.slug} process`);
    assert.ok(c.faq.length >= 3, `${s.slug} faq`);
    assert.ok(c.intro && c.metaTitle && c.metaDescription, `${s.slug} text`);
    assert.ok(!/\d+(\.\d+)? lei/.test(c.priceNote), `${s.slug} priceNote must not hard-code prices`);
  }
});
test('existing copy moved verbatim', () => {
  assert.equal(SERVICE_CONTENT['tuns-gazon'].metaTitle, 'Tuns Gazon Profesional Timișoara');
  assert.equal(SERVICE_CONTENT['gard-viu'].faq[1].q, 'Ce specii de gard viu tăiați?');
});
