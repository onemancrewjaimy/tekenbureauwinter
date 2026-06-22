import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Vaste blueprint-achtergrond (twee rasterlagen) die op elke pagina
 * onder de inhoud meebeweegt: een grove laag die licht meedrijft met
 * de scroll (parallax) en een fijne laag die continu zwak ronddrijft.
 */
export function initBlueprintGrid() {
  if (document.querySelector('.blueprint-grid')) return;

  const grid = document.createElement('div');
  grid.className = 'blueprint-grid';
  grid.setAttribute('aria-hidden', 'true');
  grid.innerHTML = `
    <div class="blueprint-grid__layer blueprint-grid__layer--coarse"></div>
    <div class="blueprint-grid__layer blueprint-grid__layer--fine blueprint-grid__layer--drift"></div>
  `;
  document.body.prepend(grid);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const coarse = grid.querySelector('.blueprint-grid__layer--coarse');

  gsap.to(coarse, {
    yPercent: 6,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
    },
  });
}
