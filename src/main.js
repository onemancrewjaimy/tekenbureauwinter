import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/animations.css';
import './styles/pages.css';

import { renderHeader, renderFooter } from './js/partials.js';
import { initNav } from './js/nav.js';
import { initBlueprintGrid } from './js/blueprint-grid.js';
import { initScrollReveal } from './js/scroll-reveal.js';
import { initContactForm } from './js/contact-form.js';

document.documentElement.classList.remove('no-js');

const headerEl = document.getElementById('site-header');
const footerEl = document.getElementById('site-footer');
const currentPath = document.body.dataset.path || '/';

if (headerEl) headerEl.innerHTML = renderHeader(currentPath);
if (footerEl) footerEl.innerHTML = renderFooter(currentPath);

initNav();
initBlueprintGrid();
initContactForm();

// Reveal-animaties pas starten zodra de header/footer (en hun layout) vaststaan.
requestAnimationFrame(() => initScrollReveal());
