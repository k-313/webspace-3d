import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function main() {
  const screenshotsDir = path.resolve('screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();
  console.log('Navigating to http://localhost:5173 ...');
  await page.goto('http://localhost:5173');
  await page.waitForSelector('canvas');
  await page.waitForTimeout(2000); // Allow 3D scene & stars to render

  // 1. Full Solar System Overview
  console.log('Capturing overview.png...');
  await page.screenshot({ path: path.join(screenshotsDir, 'overview.png') });

  // 2. Jupiter Scientific Properties
  console.log('Capturing planet-jupiter.png...');
  const jupiterBtn = page.getByTestId('planet-selector-tray').getByRole('button', { name: /Jupiter/i });
  await jupiterBtn.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(screenshotsDir, 'planet-jupiter.png') });

  // 3. Physical Specifications Tab
  console.log('Capturing jupiter-physical-specs.png...');
  await page.getByRole('tab', { name: /Physical/i }).click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(screenshotsDir, 'jupiter-physical-specs.png') });

  // Close drawer
  await page.getByLabel('Close planet details panel').click();
  await page.waitForTimeout(500);

  // 4. Guided Tour
  console.log('Capturing guided-tour.png...');
  await page.getByRole('button', { name: /Guided Tour/i }).click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotsDir, 'guided-tour.png') });
  await page.getByLabel('Exit tour').click();
  await page.waitForTimeout(500);

  // 5. Astronomy Quiz
  console.log('Capturing astronomy-quiz.png...');
  await page.getByRole('button', { name: /Quiz/i }).first().click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(screenshotsDir, 'astronomy-quiz.png') });
  await page.getByLabel('Close quiz dialog').click();
  await page.waitForTimeout(500);

  // 6. Search Dialog
  console.log('Capturing planet-search.png...');
  await page.getByRole('button', { name: /Search/i }).first().click();
  await page.getByPlaceholder(/Search planets/i).fill('Saturn');
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(screenshotsDir, 'planet-search.png') });

  await browser.close();
  console.log('All screenshots captured successfully in screenshots/');
}

main().catch(console.error);
