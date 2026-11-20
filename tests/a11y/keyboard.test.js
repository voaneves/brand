import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, launch, newPage, previewUrl } from './helpers.js';

let browser;
let server;
before(async () => {
  server = await startServer();
  browser = await launch();
});
after(async () => {
  await browser?.close();
  server?.close();
});

async function open(name, options) {
  const page = await newPage(browser, options);
  await page.goto(previewUrl(name));
  return page;
}

test('tabs: roving tabindex, arrows, Home/End and focus moves to the panel', async () => {
  const page = await open('Tabs');
  const state = () =>
    page.$$eval('[role=tab]', (tabs) => tabs.map((t) => [t.getAttribute('aria-selected'), t.tabIndex]));
  assert.deepEqual(await state(), [['true', 0], ['false', -1], ['false', -1]]);

  await page.focus('#t-1');
  await page.keyboard.press('ArrowRight');
  assert.deepEqual(await state(), [['false', -1], ['true', 0], ['false', -1]]);
  assert.equal(await page.evaluate(() => document.activeElement.id), 't-2');
  assert.equal(await page.$eval('#p-2', (p) => p.hidden), false);
  assert.equal(await page.$eval('#p-1', (p) => p.hidden), true);

  await page.keyboard.press('End');
  assert.equal(await page.evaluate(() => document.activeElement.id), 't-3');
  await page.keyboard.press('ArrowRight'); // wraps to first
  assert.equal(await page.evaluate(() => document.activeElement.id), 't-1');
  await page.keyboard.press('ArrowLeft'); // wraps to last
  assert.equal(await page.evaluate(() => document.activeElement.id), 't-3');
  await page.keyboard.press('Home');
  assert.equal(await page.evaluate(() => document.activeElement.id), 't-1');

  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement.id), 'p-1');
  await page.context().close();
});

test('modal: opens, traps focus, closes on Esc and returns focus to the trigger', async () => {
  const page = await open('Modal');
  await page.focus('#open');
  await page.keyboard.press('Enter');
  assert.equal(await page.$eval('#dlg', (d) => d.open), true);
  assert.equal(await page.evaluate(() => document.activeElement.textContent.trim()), 'Cancelar');

  for (let i = 0; i < 6; i += 1) {
    await page.keyboard.press('Tab');
    // Native modal dialogs cycle through the browser UI, so body is allowed; page content never is.
    const ok = await page.evaluate(
      () => document.activeElement === document.body || document.getElementById('dlg').contains(document.activeElement),
    );
    assert.ok(ok, `focus escaped the dialog on Tab #${i + 1}`);
  }
  await page.keyboard.press('Shift+Tab');
  assert.equal(await page.$eval('#open', (b) => b === document.activeElement), false, 'trigger behind the modal got focus');

  await page.keyboard.press('Escape');
  assert.equal(await page.$eval('#dlg', (d) => d.open), false);
  assert.equal(await page.evaluate(() => document.activeElement.id), 'open');
  await page.context().close();
});

test('tooltip: shows on focus and Escape dismisses it without moving focus', async () => {
  const page = await open('Tooltip');
  const visible = () => page.$eval('#tip1', (el) => getComputedStyle(el).visibility === 'visible');
  assert.equal(await visible(), false);
  await page.keyboard.press('Tab');
  await page.waitForTimeout(400);
  assert.equal(await visible(), true);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  assert.equal(await visible(), false);
  assert.equal(await page.evaluate(() => document.activeElement.tagName), 'BUTTON');
  await page.context().close();
});

test('reduced motion: duration tokens collapse to 1ms and transitions are effectively off', async () => {
  const page = await open('Toast', { reducedMotion: 'reduce' });
  const tokens = await page.evaluate(() => {
    const cs = getComputedStyle(document.documentElement);
    return ['--vn-dur-press', '--vn-dur-hover', '--vn-dur-cursor', '--vn-dur-line', '--vn-dur-unveil', '--vn-dur-page'].map(
      (n) => cs.getPropertyValue(n).trim(),
    );
  });
  assert.deepEqual(tokens, Array(6).fill('1ms'));
  const dur = await page.$eval('.vn-toast', (el) => getComputedStyle(el).transitionDuration);
  assert.ok(dur.split(',').every((d) => parseFloat(d) <= 0.001), `toast transition-duration is ${dur}`);
  await page.context().close();

  const normal = await open('Toast');
  const fullDur = await normal.$eval('.vn-toast', (el) => getComputedStyle(el).transitionDuration);
  assert.ok(parseFloat(fullDur) >= 0.25, `expected 250ms without the preference, got ${fullDur}`);
  await normal.context().close();
});
