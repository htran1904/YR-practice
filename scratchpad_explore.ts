import 'dotenv/config';
import { chromium, selectors } from '@playwright/test';

(async () => {
  selectors.setTestIdAttribute('data-test-id');
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ storageState: 'storageState.json', viewport: { width: 1920, height: 1080 } });
  const page = await ctx.newPage();

  await page.goto('https://goto.your.rentals/calendar', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(6000);
  if (/login/.test(page.url())) { console.log('SESSION EXPIRED'); await browser.close(); process.exit(2); }

  // dismiss cookie
  const allow = page.getByRole('button', { name: 'Allow all' });
  if (await allow.count() && await allow.first().isVisible().catch(()=>false)) await allow.first().click().catch(()=>{});

  // click a future day cell on first listing
  const cell = '381351_2026-07-20';
  await page.getByTestId(cell).click();
  await page.waitForTimeout(2000);

  // click "Create booking offer"
  const offerBtn = page.getByText('Create booking offer', { exact: false });
  console.log('Create booking offer visible:', await offerBtn.first().isVisible().catch(()=>false));
  await offerBtn.first().click().catch(e=>console.log('offer click err', e.message.split('\n')[0]));
  await page.waitForTimeout(3000);

  console.log('url now:', page.url());
  // dump modal fields
  const fields = await page.$$eval('input, textarea, select, button, [data-test-id]', els =>
    els.map(e => {
      const tid = e.getAttribute('data-test-id')||''; const ph=(e as HTMLInputElement).placeholder||'';
      const lbl = e.getAttribute('aria-label')||''; const name=e.getAttribute('name')||'';
      const txt=(e.textContent||'').trim().slice(0,35).replace(/\s+/g,' ');
      if(!tid && !ph && !lbl && !name) return '';
      return `${e.tagName} tid="${tid}" ph="${ph}" aria="${lbl}" name="${name}" txt="${txt}"`;
    }).filter(Boolean));
  console.log('\n--- offer modal fields ---');
  console.log([...new Set(fields as string[])].filter(s=>/offer|guest|email|name|price|amount|date|night|send|create|input|first|last/i.test(s)).join('\n'));

  console.log('\n--- modal text ---');
  const t = (await page.locator('body').innerText()).split('\n').map(s=>s.trim()).filter(Boolean);
  const oi = t.findIndex(x=>/offer/i.test(x));
  console.log(t.slice(Math.max(0,oi-2), oi+50).join(' | ').slice(0,900));

  await page.screenshot({ path: 'scratchpad_conv.png' });
  await browser.close();
})();
