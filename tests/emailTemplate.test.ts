import test from 'node:test';
import assert from 'node:assert/strict';
import { buildProfessionalEmailHtml } from '../src/services/emailTemplate';

test('wraps message content in a polished email layout', () => {
  const html = buildProfessionalEmailHtml('Welcome', 'Hello there', 'CasinoLab');

  assert.match(html, /<!doctype html>/i);
  assert.match(html, /CasinoLab/i);
  assert.match(html, /Welcome/i);
  assert.match(html, /Hello there/i);
});
