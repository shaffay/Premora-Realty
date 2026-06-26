import { test, expect } from '@playwright/test';

test.describe('Premora Realty — core journey', () => {
  test('landing hero loads', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', { level: 1, name: /clarity/i }),
    ).toBeVisible();
  });

  test('search → listings → detail → book consultation', async ({ page }) => {
    await page.goto('/properties');

    // Listings render property cards.
    const firstCard = page.getByRole('article').first();
    await expect(firstCard).toBeVisible();

    // Open the first property detail.
    await firstCard.getByRole('link').first().click();
    await expect(page).toHaveURL(/\/properties\/.+/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Request a viewing opens the consultation modal.
    await page.getByRole('button', { name: /request a viewing/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Fill and submit the lead form.
    await page.getByLabel('Full Name').fill('Test Buyer');
    await page.getByLabel('Phone').fill('+971501234567');
    await page.getByLabel('Email').fill('test@example.com');
    await page
      .getByRole('button', { name: /request consultation/i })
      .click();

    await expect(page.getByText(/thank you/i)).toBeVisible();
  });

  test('filters update the URL', async ({ page }) => {
    await page.goto('/properties');
    await page.getByLabel('Search properties').fill('villa');
    await expect(page).toHaveURL(/q=villa/, { timeout: 5000 });
  });

  test('grid and map toggle works', async ({ page }) => {
    await page.goto('/properties');
    await page.getByRole('button', { name: 'Map', exact: true }).click();
    await expect(page).toHaveURL(/view=map/);
  });
});
