import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const browser = await chromium.launch();
const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:4173';
const output = process.env.OUTPUT_DIR || 'reports/screenshots/v2';
const prefix = process.env.SCREENSHOT_PREFIX || '';
await mkdir(output, { recursive: true });

const shots = [
  ...[390, 430, 768, 1024, 1440, 1920].map((width) => ({ name:`home-${width}`, width, path:'/' })),
  { name:'projects-390', width:390, path:'/projects' }, { name:'projects-1440', width:1440, path:'/projects' },
  { name:'project-detail-390', width:390, path:'/projects/walk-in-office' }, { name:'project-detail-1440', width:1440, path:'/projects/walk-in-office' },
  { name:'before-after-390', width:390, path:'/before-after' }, { name:'before-after-1440', width:1440, path:'/before-after' }
];

for (const shot of shots) {
  const page = await browser.newPage({ viewport:{ width:shot.width, height:900 }, deviceScaleFactor:1 });
  await page.goto(`${baseUrl}${shot.path}`, { waitUntil:'networkidle' });
  await page.evaluate(async () => {
    await document.fonts.ready;
    document.querySelectorAll('.project-card,.facts>div,.process-track li,.section h2').forEach((element) => element.classList.add('is-visible'));
    document.querySelectorAll('img[loading="lazy"]').forEach((image, index) => {
      image.removeAttribute('loading');
      image.decoding='sync';
      const url = new URL(image.currentSrc || image.src);
      url.searchParams.set('capture', String(index));
      image.src=url.href;
    });
    for (let y=0; y<document.documentElement.scrollHeight; y+=700) {
      window.scrollTo(0,y);
      await new Promise((resolve)=>setTimeout(resolve,35));
    }
    await Promise.all([...document.images].map((image)=>image.decode().catch(()=>{})));
    window.scrollTo(0,0);
    document.activeElement?.blur();
  });
  await page.addStyleTag({ content: '.site-header{position:absolute!important}.mobile-sticky{display:none!important}.filters{position:relative!important;top:auto!important}.skip-link{display:none!important}' });
  await page.waitForTimeout(120);
  await page.screenshot({ path:`${output}/${prefix}${shot.name}.png`, fullPage:true });
  await page.close();
}
await browser.close();
