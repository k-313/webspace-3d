import { test, expect } from '@playwright/test';

test.describe('WebSpace 3D Observatory E2E Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for canvas to load
    await expect(page.locator('canvas')).toBeVisible();
  });

  test('loads observatory with branding and NASA verification badge', async ({ page }) => {
    await expect(page).toHaveTitle(/WebSpace 3D/i);
    await expect(page.getByText('NASA Verified')).toBeVisible();
    await expect(page.getByText('Simulation Active')).toBeVisible();
  });

  test('toggles simulation pause and resume', async ({ page }) => {
    const pauseBtn = page.getByRole('button', { name: /Pause/i });
    await pauseBtn.click();
    await expect(page.getByText('Simulation Paused')).toBeVisible();

    const resumeBtn = page.getByRole('button', { name: /Resume/i });
    await resumeBtn.click();
    await expect(page.getByText('Simulation Active')).toBeVisible();
  });

  test('selects Jupiter and inspects scientific properties across tabs', async ({ page }) => {
    // Click Jupiter in planet carousel tray
    const jupiterBtn = page.getByTestId('planet-selector-tray').getByRole('button', { name: /Jupiter/i });
    await jupiterBtn.click();

    // Verify drawer dialog
    const drawer = page.getByRole('dialog', { name: /Jupiter Scientific Properties/i });
    await expect(drawer).toBeVisible();
    await expect(drawer.getByText('GAS GIANT')).toBeVisible();
    await expect(drawer.getByText('5.204 AU')).toBeVisible();

    // Switch to Physical characteristics
    await page.getByRole('tab', { name: /Physical/i }).click();
    await expect(drawer.getByText('24.79 m/s² (2.528g)')).toBeVisible();

    // Switch to Atmosphere
    await page.getByRole('tab', { name: /Atmosphere/i }).click();
    await expect(drawer.getByText('Hydrogen (H₂)')).toBeVisible();

    // Switch to Missions & Moons
    await page.getByRole('tab', { name: /Missions & Moons/i }).click();
    await expect(drawer.getByText('Confirmed Natural Moons')).toBeVisible();
    await expect(drawer.getByText('95')).toBeVisible();

    // Close panel
    await page.getByLabel('Close planet details panel').click();
    await expect(drawer).not.toBeVisible();
  });

  test('opens search modal, filters for Saturn, and focuses camera', async ({ page }) => {
    await page.getByRole('button', { name: /Search/i }).first().click();
    const searchInput = page.getByPlaceholder(/Search planets/i);
    await expect(searchInput).toBeVisible();

    await searchInput.fill('Saturn');
    const saturnOption = page.getByText('Saturn').first();
    await saturnOption.click();

    // Verify Saturn panel opened
    const drawer = page.getByRole('dialog', { name: /Saturn Scientific Properties/i });
    await expect(drawer).toBeVisible();
    await expect(drawer.getByText(/The Ringed Masterpiece/i)).toBeVisible();
  });

  test('launches and navigates guided educational tour', async ({ page }) => {
    await page.getByRole('button', { name: /Guided Tour/i }).click();

    const tourRegion = page.getByRole('region', { name: /Guided Solar System Tour/i });
    await expect(tourRegion).toBeVisible();
    await expect(tourRegion.getByText(/Step 1 of 10/i)).toBeVisible();

    // Next step
    await page.getByRole('button', { name: /Next Stop/i }).click();
    await expect(tourRegion.getByText(/Step 2 of 10/i)).toBeVisible();
    await expect(tourRegion.getByText('The Sun (Sol)')).toBeVisible();

    // Exit tour
    await page.getByLabel('Exit tour').click();
    await expect(tourRegion).not.toBeVisible();
  });

  test('opens and interacts with educational quiz', async ({ page }) => {
    await page.getByRole('button', { name: /Quiz/i }).first().click();

    const quizDialog = page.getByRole('dialog', { name: /Astronomy Quiz/i });
    await expect(quizDialog).toBeVisible();
    await expect(quizDialog.getByText(/Question 1 of/i)).toBeVisible();

    // Select the second option (Venus runaway greenhouse for Question 1)
    const options = quizDialog.getByRole('button').filter({ hasText: /Venus/i });
    await options.first().click();

    // Verify explanation appears
    await expect(quizDialog.getByText(/Scientific Explanation/i)).toBeVisible();

    // Close quiz
    await page.getByLabel('Close quiz dialog').click();
    await expect(quizDialog).not.toBeVisible();
  });

  test('switches scale modes and opens scale explainer', async ({ page }) => {
    // Click True Distance
    const trueDistBtn = page.getByRole('button', { name: 'True Distance' });
    if (await trueDistBtn.isVisible()) {
      await trueDistBtn.click();
      await expect(trueDistBtn).toHaveClass(/border-sky-400/);
    }

    // Open Scale Explainer
    await page.getByTitle('Explain Scale Differences').click();
    const scaleDialog = page.getByRole('dialog', { name: /Scale Explainer/i });
    await expect(scaleDialog).toBeVisible();
    await expect(scaleDialog.getByText(/The Solar System Scale Paradox/i)).toBeVisible();

    await page.getByRole('button', { name: /Apply & Close/i }).click();
    await expect(scaleDialog).not.toBeVisible();
  });

  test('opens keyboard shortcuts guide', async ({ page }) => {
    const helpBtn = page.getByLabel('Keyboard shortcuts');
    if (await helpBtn.isVisible()) {
      await helpBtn.click();
      const shortcutsDialog = page.getByRole('dialog', { name: /Keyboard Shortcuts/i });
      await expect(shortcutsDialog).toBeVisible();
      await page.getByRole('button', { name: /Got It/i }).click();
      await expect(shortcutsDialog).not.toBeVisible();
    }
  });

  test('handles responsive viewport sizing on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('canvas')).toBeVisible();
    await expect(page.getByText('WebSpace')).toBeVisible();

    // Bottom carousel is accessible
    const tray = page.getByTestId('planet-selector-tray');
    await expect(tray).toBeVisible();

    const earthBtn = tray.getByRole('button', { name: /Earth/i });
    await earthBtn.scrollIntoViewIfNeeded();
    await earthBtn.click();

    const drawer = page.getByRole('dialog', { name: /Earth Scientific Properties/i });
    await expect(drawer).toBeVisible();
  });
});
