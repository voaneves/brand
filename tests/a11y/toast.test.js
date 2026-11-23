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

async function setup() {
  const page = await newPage(browser);
  await page.goto(previewUrl('Toast'));
  await page.evaluate(async () => {
    const { createToaster } = await import('/dist/js/toast.js');
    const region = document.createElement('div');
    region.className = 'vn-toast-region';
    region.id = 'live';
    region.setAttribute('role', 'status');
    region.setAttribute('aria-live', 'polite');
    document.body.append(region);
    window.t = createToaster({ region, max: 2, duration: 600 });
  });
  return page;
}
const count = (page) => page.$$eval('#live .vn-toast', (els) => els.filter((e) => !e.dataset.leaving).length);

test('toast: max 2 visible, the rest queue and appear as others leave', async () => {
  const page = await setup();
  await page.evaluate(() => { for (const m of ['a', 'b', 'c']) window.t.show({ message: m, duration: 400 }); });
  assert.equal(await count(page), 2);
  assert.equal(await page.$eval('#live', (r) => r.getAttribute('aria-live')), 'polite');
  await page.waitForTimeout(700);
  assert.equal(await page.$$eval('#live .vn-toast__message', (m) => m.map((x) => x.textContent).join()), 'c');
  await page.waitForTimeout(700);
  assert.equal(await count(page), 0);
  await page.context().close();
});

test('toast: hover pauses auto-dismiss and leaving resumes it', async () => {
  const page = await setup();
  await page.evaluate(() => window.t.show({ message: 'hover', duration: 1500 }));
  await page.hover('#live .vn-toast');
  await page.waitForTimeout(2300);
  assert.equal(await count(page), 1, 'toast left while hovered');
  await page.mouse.move(2, 2);
  await page.waitForTimeout(2300);
  assert.equal(await count(page), 0, 'toast stayed after the pointer left');
  await page.context().close();
});

test('toast: focus pauses auto-dismiss, the action runs once and dismisses', async () => {
  const page = await setup();
  await page.evaluate(() => {
    window.hits = 0;
    window.t.show({ message: 'focus', actionLabel: 'Desfazer', duration: 1500, onAction: () => { window.hits += 1; } });
  });
  await page.focus('#live .vn-toast__action');
  await page.waitForTimeout(2300);
  assert.equal(await count(page), 1, 'toast left while focused');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(300);
  assert.equal(await page.evaluate(() => window.hits), 1);
  assert.equal(await count(page), 0);
  await page.context().close();
});

test('toast: message is inserted as text, not HTML', async () => {
  const page = await setup();
  await page.evaluate(() => window.t.show({ message: '<img src=x onerror="window.pwned=1">' }));
  assert.equal(await page.$$eval('#live img', (i) => i.length), 0);
  assert.equal(await page.evaluate(() => window.pwned), undefined);
  await page.context().close();
});
