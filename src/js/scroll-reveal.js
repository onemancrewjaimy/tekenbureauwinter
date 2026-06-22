import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Onthult content bij scroll en laat SVG-lijntekeningen zichzelf tekenen
 * (stroke-dashoffset, op basis van getTotalLength). Alles draait via
 * data-attributen in de HTML, zodat elke pagina dezelfde, kalme
 * animatie-taal deelt zonder per-pagina scripts.
 */
export function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.querySelectorAll('.draw-path').forEach((path) => {
      path.style.strokeDasharray = 'none';
      path.style.strokeDashoffset = '0';
    });
    return;
  }

  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });

  gsap.utils.toArray('[data-reveal-fade]').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      duration: 1.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
    });
  });

  gsap.utils.toArray('[data-reveal-scale]').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      scale: 1,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });

  gsap.utils.toArray('[data-reveal-stagger]').forEach((group) => {
    gsap.to(group.children, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: group, start: 'top 85%' },
    });
  });

  // Lijntekeningen: elk .line-art container tekent zijn .draw-path elementen
  // op volgorde van data-order, alsof een potlood de lijn aanzet.
  gsap.utils.toArray('.line-art').forEach((svg) => {
    const paths = svg.querySelectorAll('.draw-path');
    if (!paths.length) return;

    paths.forEach((path) => {
      const length = path.getTotalLength ? path.getTotalLength() : 300;
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    });

    const groups = {};
    paths.forEach((path) => {
      const order = path.dataset.order || '0';
      groups[order] = groups[order] || [];
      groups[order].push(path);
    });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: svg, start: 'top 80%' },
    });

    Object.keys(groups)
      .sort((a, b) => Number(a) - Number(b))
      .forEach((order, i) => {
        tl.to(
          groups[order],
          { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' },
          i * 0.15
        );
      });
  });
}
