import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const browser = await chromium.launch();
await mkdir('reports/screenshots', { recursive: true });
for (const width of [390, 430, 768, 1024, 1440, 1920]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    document.querySelectorAll('.reveal, .reveal-media, section:not(.hero) h2, .direction-list article, .process__steps li').forEach((element) => element.classList.add('is-visible'));
    document.querySelectorAll('img[loading="lazy"]').forEach((image) => image.setAttribute('loading', 'eager'));
    document.querySelector('.site-header').style.position = 'absolute';
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise((resolve) => setTimeout(resolve, 500));
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(250);
  await page.screenshot({ path: `reports/screenshots/home-${width}.png`, fullPage: true });
  await page.close();
}
await browser.close();
