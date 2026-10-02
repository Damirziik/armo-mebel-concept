import './styles.css';
import { projects, findProject } from './data/projects.js';
import { categories } from './data/categories.js';
import { beforeAfter } from './data/beforeAfter.js';
import { siteConfig, whatsappLink } from './data/site.js';

const app = document.querySelector('#app');
const imageAlt = {
  '/images/hero-tv.jpg':'ТВ-зона с деревянной отделкой, подсветкой и встроенными шкафами',
  '/images/kitchen-walnut.jpg':'Угловая кухня в древесном тоне с тёмной столешницей',
  '/images/wardrobe.jpg':'Светлый встроенный шкаф от пола до потолка',
  '/images/bathroom.jpg':'Подвесная мебель и высокий шкаф в санузле',
  '/images/kitchen-green.jpg':'Кухня с зелёными фасадами и деревянными деталями',
  '/images/hallway.jpg':'Высокая система хранения в прихожей',
  '/images/walk-in.jpg':'Открытая гардеробная с полками и штангами',
  '/images/kitchen-light.jpg':'Светлая угловая кухня с высокими шкафами'
};

const img = (src, alt, options={}) => `<img src="${src}" alt="${alt || imageAlt[src] || 'Мебель ARMO в интерьере'}" ${options.hero ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'} ${options.className ? `class="${options.className}"` : ''} />`;

function shell(content, theme='light') {
  return `
    <header class="site-header ${theme === 'dark' ? 'site-header--dark' : ''}" data-header>
      <a class="brand route-link" href="/" aria-label="ARMO — на главную"><span class="brand__glyph">A</span><span>ARMO</span></a>
      <nav class="desktop-nav" aria-label="Основная навигация">
        <a class="route-link" href="/projects">Проекты</a><a href="/#directions">Мебель</a><a class="route-link" href="/before-after">До / После</a><a href="/#studio">О нас</a><a href="/#process">Процесс</a>
      </nav>
      <a class="header-cta" href="${whatsappLink()}" target="_blank" rel="noopener noreferrer">Обсудить проект <span>↗</span></a>
      <button class="menu-toggle" type="button" aria-label="Открыть меню" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span></button>
    </header>
    <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
      <p>ARMO / ASTANA</p>
      <nav aria-label="Мобильная навигация"><a class="route-link" href="/projects"><span>01</span>Проекты</a><a href="/#directions"><span>02</span>Мебель</a><a class="route-link" href="/before-after"><span>03</span>До / После</a><a href="/#studio"><span>04</span>О нас</a><a href="/#process"><span>05</span>Процесс</a></nav>
      <div class="mobile-menu__contacts"><a href="${whatsappLink()}" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a><a href="${siteConfig.instagram}" target="_blank" rel="noopener noreferrer">Instagram ↗</a></div>
    </div>
    <main id="main">${content}</main>
    ${footer()}
    <a class="mobile-sticky" href="${whatsappLink()}" target="_blank" rel="noopener noreferrer">Написать в WhatsApp <span>↗</span></a>
    ${lightbox()}`;
}

function footer() {
  return `<footer class="footer"><div class="footer__top"><p>МЕБЕЛЬНЫЙ ЦЕХ / АСТАНА</p><a href="${whatsappLink()}" target="_blank" rel="noopener noreferrer">Начать проект <span>↗</span></a></div><div class="footer__wordmark">ARMO</div><div class="footer__bottom"><p>Неофициальный концепт сайта, созданный для портфолио. Не является официальным сайтом ARMO Mebel.</p><div><a href="tel:${siteConfig.phone}">${siteConfig.phoneDisplay}</a><a href="${siteConfig.instagram}" target="_blank" rel="noopener noreferrer">Instagram ↗</a><span>${siteConfig.city}</span></div></div></footer>`;
}

function lightbox() {
  return `<dialog class="lightbox" aria-label="Галерея проекта"><div class="lightbox__bar"><span data-lightbox-title></span><span data-lightbox-count></span><button type="button" data-lightbox-close aria-label="Закрыть галерею">Закрыть ×</button></div><button class="lightbox__nav lightbox__nav--prev" type="button" data-lightbox-prev aria-label="Предыдущее изображение">←</button><figure><img alt="" data-lightbox-image /><figcaption data-lightbox-caption></figcaption></figure><button class="lightbox__nav lightbox__nav--next" type="button" data-lightbox-next aria-label="Следующее изображение">→</button></dialog>`;
}

function projectCard(project, index=0) {
  return `<article class="project-card project-card--${(index%5)+1}" data-project-card data-category="${project.category}">
    <a class="project-card__media route-link" href="/projects/${project.slug}">${img(project.cover, project.description)}<span>Открыть проект ↗</span></a>
    <div class="project-card__info"><span>${project.index}</span><div><p>${project.categoryLabel}</p><h3><a class="route-link" href="/projects/${project.slug}">${project.title}</a></h3></div><small>${String(project.gallery.length).padStart(2,'0')} фото</small></div>
  </article>`;
}

function homePage() {
  const selected = projects.filter((project)=>project.featured).slice(0,6);
  return shell(`
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero__media">${img('/images/hero-tv.jpg', imageAlt['/images/hero-tv.jpg'], { hero:true })}</div>
      <div class="hero__shade"></div><div class="hero__grid" aria-hidden="true"></div>
      <p class="hero__code">01 / ASTANA<br>51.1694° N</p>
      <div class="hero__copy"><p>МЕБЕЛЬ ЛЮБОЙ СЛОЖНОСТИ НА ЗАКАЗ</p><h1 id="hero-title">Пространство,<br><span>собранное точно.</span></h1><div><a class="route-link button button--light" href="/projects">Смотреть проекты <span>↓</span></a><a class="button button--ghost" href="${whatsappLink()}" target="_blank" rel="noopener noreferrer">Обсудить задачу ↗</a></div></div>
      <aside class="hero__index"><span>P/001</span><p>ТВ-зона<br>Индивидуальный проект</p></aside>
    </section>

    <section class="manifest section" id="studio"><div class="section-tag"><span>01</span> ARMO / ПОДХОД</div><div><h2>Не коллекция готовых вещей.<br><em>Мебель под конкретное место.</em></h2><p>ARMO проектирует и изготавливает кухни, системы хранения и корпусную мебель по индивидуальным размерам. В профиле подтверждены доставка и установка.</p></div></section>

    <section class="facts" aria-label="Подтверждённые факты">${siteConfig.facts.map((fact)=>`<div><strong>${fact.value}</strong><span>${fact.label}</span></div>`).join('')}</section>

    <section class="selected section" aria-labelledby="selected-title"><div class="selected__head"><div class="section-tag"><span>02</span> ВЫБРАННЫЕ РАБОТЫ</div><div><h2 id="selected-title">Реальные проекты.<br><em>Без шаблонных сцен.</em></h2><a class="route-link text-link" href="/projects">Все проекты <span>↗</span></a></div></div><div class="selected-grid">${selected.map(projectCard).join('')}</div></section>

    <section class="directions section" id="directions" aria-labelledby="directions-title"><div class="directions__visual">${img('/images/kitchen-walnut.jpg','Угловая кухня ARMO в древесном тоне')}</div><div class="directions__content"><div class="section-tag"><span>03</span> НАПРАВЛЕНИЯ</div><h2 id="directions-title">Мебель как часть архитектуры.</h2><ol><li><a class="route-link" href="/projects?category=kitchen"><span>01</span><strong>Кухни</strong><small>03 проекта ↗</small></a></li><li><a class="route-link" href="/projects?category=storage"><span>02</span><strong>Шкафы и гардеробные</strong><small>02 проекта ↗</small></a></li><li><a class="route-link" href="/projects?category=apartment"><span>03</span><strong>Мебель для всей квартиры</strong><small>02 серии ↗</small></a></li><li><a class="route-link" href="/projects"><span>04</span><strong>Другие зоны</strong><small>Смотреть все ↗</small></a></li></ol></div></section>

    <section class="process section" id="process"><div class="process__head"><div class="section-tag section-tag--dark"><span>04</span> ПРОЦЕСС</div><h2>От сообщения<br>до установки.</h2></div><ol class="process-track"><li><span>01</span><h3>Задача</h3><p>Помещение, размеры и желаемый результат.</p></li><li><span>02</span><h3>Проект</h3><p>Дизайн и размеры согласуются под пространство.</p></li><li><span>03</span><h3>Изготовление</h3><p>В bio заявлен диапазон от 3 до 15 дней.</p></li><li><span>04</span><h3>Установка</h3><p>Доставка и монтаж подтверждены публикациями.</p></li></ol></section>

    <section class="materials section"><div class="materials__copy"><div class="section-tag"><span>05</span> МАТЕРИАЛЫ / ДЕТАЛИ</div><h2>То, что подтверждено работами.</h2><p>ЛДСП, фасады EGGER, крашеный и плёночный МДФ, фурнитура Hettich. Без выдуманных спецификаций.</p></div><div class="materials__image">${img('/images/kitchen-green.jpg','Кухня ARMO с цветными фасадами')}<div class="hotspot hotspot--one"><span>01</span><p>Цветные фасады</p></div><div class="hotspot hotspot--two"><span>02</span><p>Древесная текстура</p></div></div></section>

    <section class="instagram section"><div><p>@armo_mebel_astana</p><h2>Работы появляются<br>сначала там.</h2></div><a href="${siteConfig.instagram}" target="_blank" rel="noopener noreferrer">Смотреть Instagram <span>↗</span></a></section>
  `,'dark');
}

function projectsPage() {
  const params = new URLSearchParams(location.search);
  const requested = params.get('category');
  const active = categories.some((item)=>item.id===requested) ? requested : 'all';
  return shell(`<section class="page-hero page-hero--projects"><div class="section-tag"><span>01</span> АРХИВ РАБОТ</div><h1>Проекты<br><em>ARMO.</em></h1><p>Кухни, хранение и мебельные комплекты из публичного Instagram компании. Сначала показаны лучшие кадры; детали — внутри проектов.</p><span class="page-hero__count">${String(projects.length).padStart(2,'0')} / PROJECTS</span></section><section class="catalog section"><div class="filters" role="group" aria-label="Фильтр проектов">${categories.map((category)=>`<button type="button" data-filter="${category.id}" class="${category.id===active?'is-active':''}" aria-pressed="${category.id===active}">${category.label}<sup>${category.id==='all'?projects.length:projects.filter((project)=>project.category===category.id).length}</sup></button>`).join('')}</div><div class="catalog-grid" data-catalog>${projects.filter((project)=>active==='all'||project.category===active).map(projectCard).join('')}</div><button class="load-more" type="button" data-load-more hidden>Показать ещё <span>↓</span></button></section>`);
}

function projectPage(slug) {
  const project = findProject(slug);
  if (!project) return notFound();
  const current = projects.indexOf(project);
  const next = projects[(current+1)%projects.length];
  return shell(`<article class="project-detail"><header class="project-hero"><div class="project-hero__copy"><a class="route-link back-link" href="/projects">← Все проекты</a><span>${project.index} / ${project.categoryLabel}</span><h1>${project.title}</h1><p>${project.description}</p></div><button class="project-hero__media" type="button" data-gallery-open="0" aria-label="Открыть галерею проекта">${img(project.cover,project.description,{hero:true})}<span>Развернуть / ${String(project.gallery.length).padStart(2,'0')} фото ↗</span></button></header><section class="project-meta"><div><span>Категория</span><p>${project.categoryLabel}</p></div><div><span>Зона</span><p>${project.room}</p></div>${project.materials?`<div><span>Материалы</span><p>${project.materials.join(', ')}</p></div>`:''}<div><span>Источник</span><a href="${project.source}" target="_blank" rel="noopener noreferrer">Instagram ↗</a></div></section><section class="project-gallery" aria-label="Фотографии проекта">${project.gallery.map((photo,index)=>`<button type="button" data-gallery-open="${index}" class="gallery-item gallery-item--${(index%4)+1}" aria-label="Открыть фото ${index+1} из ${project.gallery.length}">${img(photo,`${project.title}, ракурс ${index+1}`)}<span>${String(index+1).padStart(2,'0')}</span></button>`).join('')}</section><section class="project-cta"><p>Понравилось решение?</p><h2>Обсудим похожий проект<br>для вашего пространства.</h2><a href="${whatsappLink(project.title)}" target="_blank" rel="noopener noreferrer">Написать в WhatsApp ↗</a></section><a class="next-project route-link" href="/projects/${next.slug}"><span>Следующий проект / ${next.index}</span><strong>${next.title}</strong><span>↗</span></a></article>`,'dark');
}

function beforeAfterPage() {
  const empty = !beforeAfter.length;
  return shell(`<section class="page-hero page-hero--compare"><div class="section-tag"><span>01</span> ДО / ПОСЛЕ</div><h1>Сравнение,<br><em>которому можно верить.</em></h1><p>Здесь публикуются только пары одного и того же пространства с подтверждёнными источниками.</p></section><section class="verification section">${empty?`<div class="verification__visual"><div class="verification__scan"></div><span>STATUS / VERIFYING</span><strong>0</strong><p>подтверждённых пар</p></div><div class="verification__copy"><div class="section-tag"><span>02</span> ЧЕСТНЫЙ СТАТУС</div><h2>Мы не нашли пару с достаточной уверенностью.</h2><p>В доступных публикациях есть монтажные этапы и готовые проекты, но нет двух кадров с совпадающей геометрией, которые можно честно назвать «до» и «после». Компонент не заполнен случайными фотографиями.</p><ul><li>Совпадающее помещение</li><li>Подтверждённый источник</li><li>Одинаковая геометрия и ракурс</li></ul><a href="${siteConfig.instagram}" target="_blank" rel="noopener noreferrer" class="text-link">Проверить Instagram ↗</a></div>`:beforeAfter.map(compareMarkup).join('')}</section>`);
}

function compareMarkup(pair) { return `<div class="compare" data-compare style="--position:50%"><img src="${pair.before}" alt="${pair.beforeAlt}"><div class="compare__after"><img src="${pair.after}" alt="${pair.afterAlt}"></div><input type="range" min="0" max="100" value="50" aria-label="Положение сравнения до и после"><span>ДО</span><span>ПОСЛЕ</span></div>`; }

function notFound() { return shell(`<section class="not-found"><span>404 / ARMO</span><h1>Такого проекта нет.</h1><a class="route-link button" href="/projects">Вернуться к проектам ↗</a></section>`); }

let galleryProject = null;
let galleryIndex = 0;
let lastFocus = null;

function render() {
  const path = location.pathname.replace(/\/+$/,'') || '/';
  let html;
  if (path === '/') html = homePage();
  else if (path === '/projects') html = projectsPage();
  else if (path.startsWith('/projects/')) html = projectPage(decodeURIComponent(path.split('/')[2] || ''));
  else if (path === '/before-after') html = beforeAfterPage();
  else html = notFound();
  app.innerHTML = html;
  document.body.classList.remove('menu-open','lightbox-open');
  document.body.style.overflow='';
  bindInteractions();
  if (location.hash) requestAnimationFrame(()=>document.querySelector(location.hash)?.scrollIntoView()); else window.scrollTo(0,0);
}

function navigate(href) {
  const url = new URL(href,location.origin);
  history.pushState({},'',`${url.pathname}${url.search}${url.hash}`);
  render();
}

function bindInteractions() {
  document.querySelectorAll('.route-link').forEach((link)=>link.addEventListener('click',(event)=>{ if(event.metaKey||event.ctrlKey) return; event.preventDefault(); navigate(link.getAttribute('href')); }));
  document.querySelectorAll('a[href^="/#"]').forEach((link)=>link.addEventListener('click',(event)=>{event.preventDefault(); const target=link.getAttribute('href'); if(location.pathname!=='/') navigate(target); else { document.querySelector(target.slice(1))?.scrollIntoView(); closeMenu(); }}));
  const toggle=document.querySelector('.menu-toggle');
  toggle?.addEventListener('click',()=>{const open=!document.body.classList.contains('menu-open');document.body.classList.toggle('menu-open',open);document.body.style.overflow=open?'hidden':'';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');document.querySelector('.mobile-menu')?.setAttribute('aria-hidden',String(!open));if(open)document.querySelector('.mobile-menu a')?.focus();});
  document.querySelectorAll('.mobile-menu a').forEach((link)=>link.addEventListener('click',closeMenu));
  bindFilters();
  const projectSlug=location.pathname.startsWith('/projects/')?location.pathname.split('/')[2]:null;
  galleryProject=projectSlug?findProject(projectSlug):null;
  document.querySelectorAll('[data-gallery-open]').forEach((button)=>button.addEventListener('click',()=>openGallery(Number(button.dataset.galleryOpen),button)));
  bindLightbox();
  document.querySelectorAll('[data-compare] input').forEach((range)=>range.addEventListener('input',()=>range.closest('[data-compare]').style.setProperty('--position',`${range.value}%`)));
  const observer=new IntersectionObserver((entries)=>entries.forEach((entry)=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.08});
  document.querySelectorAll('.section h2,.project-card,.facts>div,.process-track li').forEach((element)=>observer.observe(element));
}

function closeMenu(){document.body.classList.remove('menu-open');document.body.style.overflow='';document.querySelector('.menu-toggle')?.setAttribute('aria-expanded','false');document.querySelector('.mobile-menu')?.setAttribute('aria-hidden','true');}

function bindFilters(){
  const catalog=document.querySelector('[data-catalog]'); if(!catalog)return;
  document.querySelectorAll('[data-filter]').forEach((button)=>button.addEventListener('click',()=>{const filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach((item)=>{const active=item===button;item.classList.toggle('is-active',active);item.setAttribute('aria-pressed',String(active));});catalog.innerHTML=projects.filter((project)=>filter==='all'||project.category===filter).map(projectCard).join('');catalog.querySelectorAll('.route-link').forEach((link)=>link.addEventListener('click',(event)=>{event.preventDefault();navigate(link.getAttribute('href'));}));history.replaceState({},'',filter==='all'?'/projects':`/projects?category=${filter}`);}));
}

function bindLightbox(){const dialog=document.querySelector('.lightbox');if(!dialog)return;dialog.querySelector('[data-lightbox-close]').addEventListener('click',closeGallery);dialog.querySelector('[data-lightbox-prev]').addEventListener('click',()=>stepGallery(-1));dialog.querySelector('[data-lightbox-next]').addEventListener('click',()=>stepGallery(1));dialog.addEventListener('cancel',(event)=>{event.preventDefault();closeGallery();});dialog.addEventListener('click',(event)=>{if(event.target===dialog)closeGallery();});let startX=0;dialog.addEventListener('pointerdown',(event)=>{startX=event.clientX;});dialog.addEventListener('pointerup',(event)=>{const delta=event.clientX-startX;if(Math.abs(delta)>45)stepGallery(delta>0?-1:1);});}

function openGallery(index,trigger){if(!galleryProject)return;galleryIndex=index;lastFocus=trigger;updateGallery();const dialog=document.querySelector('.lightbox');dialog.showModal();document.body.classList.add('lightbox-open');document.body.style.overflow='hidden';dialog.querySelector('[data-lightbox-close]').focus();}
function closeGallery(){const dialog=document.querySelector('.lightbox');if(dialog?.open)dialog.close();document.body.classList.remove('lightbox-open');document.body.style.overflow='';lastFocus?.focus();}
function stepGallery(direction){if(!galleryProject)return;galleryIndex=(galleryIndex+direction+galleryProject.gallery.length)%galleryProject.gallery.length;updateGallery();}
function updateGallery(){const dialog=document.querySelector('.lightbox');const photo=galleryProject.gallery[galleryIndex];dialog.querySelector('[data-lightbox-image]').src=photo;dialog.querySelector('[data-lightbox-image]').alt=`${galleryProject.title}, фото ${galleryIndex+1}`;dialog.querySelector('[data-lightbox-title]').textContent=galleryProject.title;dialog.querySelector('[data-lightbox-count]').textContent=`${String(galleryIndex+1).padStart(2,'0')} / ${String(galleryProject.gallery.length).padStart(2,'0')}`;dialog.querySelector('[data-lightbox-caption]').textContent=galleryProject.description;}

window.addEventListener('popstate',render);
document.addEventListener('keydown',(event)=>{if(event.key==='Escape'&&document.body.classList.contains('menu-open'))closeMenu();const dialog=document.querySelector('.lightbox');if(!dialog?.open)return;if(event.key==='ArrowLeft')stepGallery(-1);if(event.key==='ArrowRight')stepGallery(1);});
render();
