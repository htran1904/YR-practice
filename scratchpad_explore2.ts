import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ storageState: 'storageState.json' });
  const page = await ctx.newPage();

  // ---------- CONVERSATIONS ----------
  console.log('\n========== CONVERSATIONS ==========');
  await page.goto('https://goto.your.rentals/conversations', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(6000);

  const convItem = page.getByTestId('conversation-item');
  console.log('conversation-item count:', await convItem.count());
  const first = convItem.first();
  console.log('first visible:', await first.isVisible());
  const box = await first.boundingBox();
  console.log('first boundingBox:', JSON.stringify(box));

  // What element is actually at the center of the first conversation item?
  if (box) {
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    const topEl = await page.evaluate(({ x, y }) => {
      const el = document.elementFromPoint(x, y);
      if (!el) return 'none';
      return el.tagName + '.' + (el.className || '') + ' testid=' + (el.getAttribute('data-test-id') || '');
    }, { x: cx, y: cy });
    console.log('element at first-item center:', topEl);
  }

  // Promo / modal probes
  for (const name of ['Not now', 'Set your style', 'Allow all', 'Got it']) {
    const c = await page.getByRole('button', { name }).count();
    if (c) console.log(`button "${name}" count:`, c, 'visible:', await page.getByRole('button', { name }).first().isVisible());
  }
  // any overlay/backdrop
  const overlays = await page.$$eval('[class*="overlay"],[class*="Overlay"],[class*="backdrop"],[class*="modal"],[role="dialog"]',
    els => els.filter(e => (e as HTMLElement).offsetParent !== null).map(e => e.tagName + '.' + e.className).slice(0, 10));
  console.log('visible overlays/dialogs:', JSON.stringify(overlays, null, 0));

  // ---------- CALENDAR ----------
  console.log('\n========== CALENDAR ==========');
  await page.goto('https://goto.your.rentals/calendar', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(6000);

  // The date header "29 June, 2026"
  const dateText = '29 June, 2026';
  console.log(`getByRole button "${dateText}" count:`, await page.getByRole('button', { name: dateText }).count());
  console.log(`getByText "${dateText}" count:`, await page.getByText(dateText, { exact: false }).count());
  // what is the element holding that text?
  const dateEls = await page.evaluate((t) => {
    const out: string[] = [];
    document.querySelectorAll('*').forEach(el => {
      if (el.children.length === 0 && el.textContent?.trim() === t) {
        out.push(el.tagName + '.' + (el.className || '') + ' role=' + (el.getAttribute('role') || '') + ' testid=' + (el.getAttribute('data-test-id') || ''));
      }
    });
    return out.slice(0, 5);
  }, dateText);
  console.log('elements with exact date text:', JSON.stringify(dateEls, null, 0));

  // Sync button
  const syncByRole = page.getByRole('button', { name: 'Sync all calendars' });
  console.log('getByRole button "Sync all calendars" count:', await syncByRole.count(), 'visible:', await syncByRole.count() ? await syncByRole.first().isVisible() : false);
  const syncByTid = page.getByTestId('btnSyncAllCalendars');
  console.log('getByTestId btnSyncAllCalendars count:', await syncByTid.count(), 'visible:', await syncByTid.count() ? await syncByTid.first().isVisible() : false);
  const syncTag = await page.evaluate(() => {
    const el = document.querySelector('[data-test-id="btnSyncAllCalendars"]');
    return el ? el.tagName + ' role=' + (el.getAttribute('role')||'') + ' text="' + (el.textContent||'').trim() + '"' : 'none';
  });
  console.log('btnSyncAllCalendars element:', syncTag);

  await browser.close();
})();
