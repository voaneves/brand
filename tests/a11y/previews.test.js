// Run: npm run build && npm run test:a11y
import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, formatViolations, launch, newPage, previewNames, previewUrl, runAxe } from './helpers.js';

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

const names = previewNames();

test('there is a preview for every component group', () => {
  assert.ok(names.length >= 17, `only ${names.length} previews found`);
});

for (const scheme of ['light', 'dark']) {
  for (const name of names) {
    test(`axe WCAG 2.2 AA: ${name} (${scheme})`, async () => {
      const page = await newPage(browser, { colorScheme: scheme });
      try {
        // #open lets overlay previews (Modal) show their open state.
        await page.goto(previewUrl(name, '#open'));
        await page.waitForLoadState('load');
        await page.waitForTimeout(400); // let entry transitions settle
        const violations = await runAxe(page);
        assert.equal(violations.length, 0, `\n${formatViolations(violations)}`);
      } finally {
        await page.context().close();
      }
    });
  }
}

for (const scheme of ['light', 'dark']) {
  test(`axe WCAG 2.2 AA: gallery page (${scheme})`, async () => {
    const page = await newPage(browser, { colorScheme: scheme });
    try {
      await page.goto(`${previewUrl('Button').split('/board/')[0]}/dist/site/index.html`);
      await page.waitForLoadState('load');
      await page.waitForTimeout(800);
      const violations = await runAxe(page);
      assert.equal(violations.length, 0, `
${formatViolations(violations)}`);
    } finally {
      await page.context().close();
    }
  });
}

test('axe harness detects a known violation (guards against a silent no-op)', async () => {
  const page = await newPage(browser);
  try {
    await page.setContent('<!doctype html><html lang="en"><title>t</title><main><img src="x.png"><button></button></main></html>');
    const ids = (await runAxe(page)).map((v) => v.id);
    assert.ok(ids.includes('image-alt') && ids.includes('button-name'), ids.join(','));
  } finally {
    await page.context().close();
  }
});
