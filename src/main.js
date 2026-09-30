import './styles.css';
import { siteConfig } from './data/site.js';
import { projects } from './data/projects.js';

const body = document.body;
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const projectGrid = document.querySelector('[data-project-grid]');
const dialog = document.querySelector('.lightbox');
const dialogImage = dialog.querySelector('img');
const dialogCaption = dialog.querySelector('figcaption');
let visibleProjects = [...projects];
let activeProject = 0;
let lastFocus = null;

document.querySelectorAll('[data-whatsapp]').forEach((link) => { link.href = siteConfig.whatsapp; link.target = '_blank'; link.rel = 'noopener noreferrer'; });
document.querySelectorAll('[data-phone]').forEach((link) => { link.href = `tel:${siteConfig.phone}`; link.textContent = siteConfig.phoneDisplay; });

function toggleMenu(force) {
  const open = typeof force === 'boolean' ? force : !body.classList.contains('menu-open');
  body.classList.toggle('menu-open', open);
  body.style.overflow = open ? 'hidden' : '';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  mobileMenu.setAttribute('aria-hidden', String(!open));
  if (open) mobileMenu.querySelector('a').focus();
}
menuButton.addEventListener('click', () => toggleMenu());
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => toggleMenu(false)));

function renderProjects(filter = 'all') {
  visibleProjects = filter === 'all' ? [...projects] : projects.filter((project) => project.category === filter);
  projectGrid.innerHTML = visibleProjects.map((project, index) => `
    <article class="project-card project-card--${index % 4}" data-category="${project.category}">
      <button class="project-card__image image-open" data-project-id="${project.id}" aria-label="Открыть проект: ${project.title}">
        <img src="${project.image}" alt="${project.title}" loading="lazy" decoding="async" style="object-position:${project.position}" />
        <span>Смотреть проект ↗</span>
      </button>
      <div class="project-card__caption"><span>${project.number}</span><div><h3>${project.title}</h3><p>${project.meta}</p></div><a href="${project.source}" target="_blank" rel="noopener noreferrer" aria-label="Источник проекта в Instagram">Источник ↗</a></div>
    </article>`).join('');
  projectGrid.querySelectorAll('[data-project-id]').forEach((button) => button.addEventListener('click', () => openProject(button.dataset.projectId)));
}

document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach((item) => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); });
  renderProjects(button.dataset.filter);
}));

function updateDialog() {
  const project = visibleProjects[activeProject];
  dialogImage.src = project.image;
  dialogImage.alt = project.title;
  dialogCaption.innerHTML = `<span>${project.number}</span><strong>${project.title}</strong><small>${project.meta}</small>`;
}
function openProject(id) {
  activeProject = Math.max(0, visibleProjects.findIndex((project) => project.id === id));
  lastFocus = document.activeElement;
  updateDialog();
  dialog.showModal();
  body.style.overflow = 'hidden';
  dialog.querySelector('.lightbox__close').focus();
}
function closeDialog() { dialog.close(); body.style.overflow = ''; lastFocus?.focus(); }
function stepDialog(direction) { activeProject = (activeProject + direction + visibleProjects.length) % visibleProjects.length; updateDialog(); }

document.querySelector('.hero .image-open').addEventListener('click', () => openProject('tv-zone-light'));
dialog.querySelector('.lightbox__close').addEventListener('click', closeDialog);
dialog.querySelector('.lightbox__prev').addEventListener('click', () => stepDialog(-1));
dialog.querySelector('.lightbox__next').addEventListener('click', () => stepDialog(1));
dialog.addEventListener('click', (event) => { if (event.target === dialog) closeDialog(); });
dialog.addEventListener('cancel', (event) => { event.preventDefault(); closeDialog(); });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && body.classList.contains('menu-open')) toggleMenu(false);
  if (!dialog.open) return;
  if (event.key === 'ArrowLeft') stepDialog(-1);
  if (event.key === 'ArrowRight') stepDialog(1);
});

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.12 });
document.querySelectorAll('.reveal, .reveal-media, section:not(.hero) h2, .direction-list article, .process__steps li').forEach((element) => observer.observe(element));

let lastScroll = 0;
window.addEventListener('scroll', () => { const y = window.scrollY; document.querySelector('[data-header]').classList.toggle('header-hidden', y > lastScroll && y > 160); document.querySelector('[data-header]').classList.toggle('header-scrolled', y > 20); lastScroll = y; }, { passive: true });

renderProjects();
