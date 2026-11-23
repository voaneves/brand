import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import { startServer, launch, newPage, previewNames, previewUrl, runAxe, formatViolations } from './helpers.js';

const AXE = fs.readFileSync(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8');

let browser;
let server;
before(async () => {
  server = await startServer();
  browser = await launch();
});
after(async () => {
  await browser?.close();
  server?.close();
  // Guard against a silent no-op: the previews hold well over 60 focusable controls per theme.
  assert.ok(stops >= 80, `only ${stops} focus stops were exercised`);
});

const names = previewNames();
let stops = 0;

// 1. Mobile reflow: 390px wide, no page-level horizontal scroll, axe clean.
for (const scheme of ['light', 'dark']) {
  for (const name of names) {
    test(`mobile 390px: ${name} (${scheme})`, async () => {
      const page = await newPage(browser, { colorScheme: scheme, viewport: { width: 390, height: 844 } });
      try {
        await page.goto(previewUrl(name, '#open'));
        await page.waitForLoadState('load');
        await page.waitForTimeout(400);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        assert.ok(overflow <= 1, `page scrolls horizontally by ${overflow}px at 390px`);
        const violations = await runAxe(page);
        assert.equal(violations.length, 0, `\n${formatViolations(violations)}`);
      } finally {
        await page.context().close();
      }
    });
  }
}

// 2. Focus states: Tab through every focusable, require a visible indicator and contrast on the focused element.
for (const scheme of ['light', 'dark']) {
  for (const name of names) {
    test(`focus states: ${name} (${scheme})`, async () => {
      const page = await newPage(browser, { colorScheme: scheme });
      try {
        await page.goto(previewUrl(name));
        await page.waitForLoadState('load');
        await page.evaluate(AXE);
        const seen = new Set();
        for (let i = 0; i < 40; i += 1) {
          await page.keyboard.press('Tab');
          const info = await page.evaluate(() => {
            const el = document.activeElement;
            if (!el || el === document.body) return null;
            const cs = getComputedStyle(el);
            const outline = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 2;
            if (!el.dataset.vnProbe) el.dataset.vnProbe = String(Math.random());
            return { id: el.dataset.vnProbe, label: `${el.tagName.toLowerCase()}${el.className ? `.${String(el.className).split(' ')[0]}` : ''}`, indicator: outline };
          });
          if (!info || seen.has(info.id)) break;
          seen.add(info.id);
          stops += 1;
          assert.ok(info.indicator, `${info.label} shows no focus indicator (outline >= 2px)`);
          const violations = await page.evaluate(
            () => window.axe.run(document.activeElement, { runOnly: { type: 'rule', values: ['color-contrast'] } }).then((r) => r.violations),
          );
          assert.equal(violations.length, 0, `\n${formatViolations(violations)}`);
        }
      } finally {
        await page.context().close();
      }
    });
  }
}
