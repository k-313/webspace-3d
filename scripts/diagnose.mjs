import { chromium } from '@playwright/test';

async function diagnose() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const consoleLogs = [];
  page.on('console', (msg) => {
    consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', (err) => {
    consoleLogs.push(`[PAGE ERROR] ${err.message}\n${err.stack}`);
  });

  page.on('requestfailed', (req) => {
    consoleLogs.push(`[REQUEST FAILED] ${req.url()} (${req.failure()?.errorText})`);
  });

  try {
    const res = await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 15000 });
    console.log('HTTP Status:', res?.status());
    await page.waitForTimeout(2000);

    const canvasCount = await page.locator('canvas').count();
    console.log('Canvas element count:', canvasCount);

    const rootHtml = await page.locator('#root').innerHTML();
    console.log('Root HTML length:', rootHtml.length);
    console.log('Root HTML snippet:', rootHtml.slice(0, 300));
  } catch (err) {
    console.error('Diagnosis error:', err);
  } finally {
    console.log('--- BROWSER CONSOLE LOGS ---');
    consoleLogs.forEach((l) => console.log(l));
    await browser.close();
  }
}

diagnose();
