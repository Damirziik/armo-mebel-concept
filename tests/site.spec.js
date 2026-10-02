import { test, expect } from '@playwright/test';

const widths = [320, 360, 375, 390, 412, 430, 768, 1024, 1280, 1440, 1600, 1920];

for (const width of widths) {
  test(`home layout ${width}px`, async ({ page }) => {
    const errors = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('pageerror', (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Пространство');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(overflow).toBeFalsy();
    expect(errors).toEqual([]);
  });
}

test('mobile navigation, route transitions and filters', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Открыть меню' }).click();
  await expect(page.locator('#mobile-menu')).toHaveAttribute('aria-hidden', 'false');
  await page.keyboard.press('Escape');
  await expect(page.locator('#mobile-menu')).toHaveAttribute('aria-hidden', 'true');
  await page.getByRole('link', { name: /Смотреть проекты/ }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await page.getByRole('button', { name: /Кухни/ }).click();
  await expect(page).toHaveURL(/category=kitchen/);
  await expect(page.locator('[data-project-card]')).toHaveCount(3);
});

test('project gallery supports keyboard, pointer gesture and focus return', async ({ page }) => {
  await page.goto('/projects/walk-in-office');
  const opener = page.locator('[data-gallery-open]').first();
  await opener.click();
  const dialog = page.locator('dialog');
  await expect(dialog).toBeVisible();
  await expect(page.locator('[data-lightbox-count]')).toHaveText('01 / 05');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('[data-lightbox-count]')).toHaveText('02 / 05');
  await page.locator('[data-lightbox-image]').dispatchEvent('pointerdown', { clientX: 300 });
  await page.locator('[data-lightbox-image]').dispatchEvent('pointerup', { clientX: 200 });
  await expect(page.locator('[data-lightbox-count]')).toHaveText('03 / 05');
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
});

test('internal routes and images are valid', async ({ page }) => {
  const routes = ['/', '/projects', '/projects/sardar-family', '/before-after', '/missing'];
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator('main')).toBeVisible();
    const images = await page.locator('img[src]').all();
    for (const image of images) await image.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => [...document.images].every((image) => image.complete), null, { timeout: 10000 });
    const broken = await page.locator('img[src]').evaluateAll((items) => items.filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src));
    expect(broken).toEqual([]);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(overflow).toBeFalsy();
  }
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow');
  expect(errors).toEqual([]);
});

test('contacts and reduced motion remain usable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('a[href^="https://wa.me/77053788770"]').first()).toHaveAttribute('target', '_blank');
  await expect(page.locator('a[href="tel:+77053788770"]')).toBeVisible();
  await expect(page.locator('a[href="https://www.instagram.com/armo_mebel_astana/"]').last()).toBeVisible();
});
