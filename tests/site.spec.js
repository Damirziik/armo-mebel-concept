import { test, expect } from '@playwright/test';

const widths = [320, 360, 390, 430, 768, 1024, 1280, 1440, 1600, 1920];
for (const width of widths) {
  test(`layout ${width}px`, async ({ page }) => {
    const errors = [];
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(overflow).toBeFalsy();
    expect(errors).toEqual([]);
  });
}

test('mobile menu and lightbox keyboard controls', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Открыть меню' }).click();
  await expect(page.locator('#mobile-menu')).toHaveAttribute('aria-hidden', 'false');
  await page.keyboard.press('Escape');
  await expect(page.locator('#mobile-menu')).toHaveAttribute('aria-hidden', 'true');
  await page.locator('[data-project-id]').first().click();
  await expect(page.locator('dialog')).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Escape');
  await expect(page.locator('dialog')).not.toBeVisible();
});

test('contact links are valid and images load', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-whatsapp]').first()).toHaveAttribute('href', 'https://wa.me/77053788770');
  await expect(page.locator('[data-phone]')).toHaveAttribute('href', 'tel:+77053788770');
  const images = await page.locator('img[src]:not(dialog img)').all();
  for (const image of images) await image.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const brokenImages = await page.locator('img[src]:not(dialog img)').evaluateAll((images) => images.filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src));
  expect(brokenImages).toEqual([]);
});
