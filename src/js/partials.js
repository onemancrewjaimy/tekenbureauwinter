/**
 * Gedeelde header en footer, als herbruikbare "partials" (vanilla JS,
 * geen framework). Elke pagina rendert deze via renderHeader()/renderFooter()
 * in een leeg <header id="site-header"> / <footer id="site-footer"> element.
 *
 * Alle interne links zijn relatief (geen leidende "/"), berekend op basis
 * van de diepte van de huidige pagina. Dat is nodig omdat deze site ook
 * als project-site op een submap kan draaien (bv. GitHub Pages:
 * username.github.io/repo-naam/) — een root-absoluut pad als "/diensten/"
 * zou daar naar de verkeerde plek wijzen.
 */

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Diensten', href: '/diensten/' },
  { label: 'Projecten', href: '/projecten/' },
  { label: 'Over Tekenbureau Winter', href: '/over-tekenbureau-winter/' },
  { label: 'Pakketen', href: '/pakketen/' },
  { label: 'Contact', href: '/contact/' },
];

const SOCIAL_LINKS = [
  { code: 'IN', label: 'LinkedIn', href: 'https://linkedin.com/feed/' },
  { code: 'IG', label: 'Instagram', href: 'https://instagram.com/tekenbureau_winter/' },
  { code: 'FB', label: 'Facebook', href: 'https://facebook.com/profile.php?id=61588136734913&sk=directory_work' },
  { code: 'WA', label: 'WhatsApp', href: 'https://api.whatsapp.com/send?phone=681656361' },
];

function isActive(currentPath, href) {
  const normalize = (p) => (p.length > 1 ? p.replace(/\/$/, '') : p);
  return normalize(currentPath) === normalize(href);
}

/** "/" -> 0, "/diensten/" -> 1, ... zodat we weten hoeveel "../" er nodig zijn. */
function pathDepth(currentPath) {
  return currentPath.split('/').filter(Boolean).length;
}

/** Maakt een root-absoluut pad ("/diensten/") relatief t.o.v. de huidige pagina. */
function toRelative(prefix, absoluteHref) {
  return prefix + absoluteHref.replace(/^\//, '');
}

export function renderHeader(currentPath = '/') {
  const depth = pathDepth(currentPath);
  const prefix = depth === 0 ? './' : '../'.repeat(depth);

  const links = NAV_LINKS.map(
    (link) => `
      <li>
        <a href="${toRelative(prefix, link.href)}" ${isActive(currentPath, link.href) ? 'aria-current="page"' : ''}>${link.label}</a>
      </li>`
  ).join('');

  return `
    <div class="site-header__inner container">
      <a class="site-header__logo" href="${prefix}" aria-label="Tekenbureau Winter — naar de homepage">
        <img src="${prefix}images/logo.png" alt="Tekenbureau Winter" width="180" height="47" loading="eager" />
      </a>
      <nav class="site-nav" id="site-nav" aria-label="Hoofdnavigatie">
        <ul class="site-nav__list">${links}</ul>
      </nav>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </div>`;
}

export function renderFooter(currentPath = '/') {
  const depth = pathDepth(currentPath);
  const prefix = depth === 0 ? './' : '../'.repeat(depth);

  const social = SOCIAL_LINKS.map(
    (s) => `<a href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${s.label} (opent in nieuw tabblad)"><span aria-hidden="true">${s.code}</span></a>`
  ).join('');

  return `
    <div class="site-footer__inner container">
      <div class="site-footer__brand">
        <a class="site-footer__logo" href="${prefix}" aria-label="Tekenbureau Winter — naar de homepage">
          <img src="${prefix}images/logo.png" alt="Tekenbureau Winter" width="160" height="42" loading="lazy" />
        </a>
        <p class="site-footer__tagline">Jouw visie, onze blauwdruk</p>
      </div>

      <div class="site-footer__col">
        <h3>Locatie</h3>
        <address>
          Truus Schröderplantsoen 10<br />
          1705 ND, Heerhugowaard<br />
          Nederland
        </address>
      </div>

      <div class="site-footer__col">
        <h3>Contactgegevens</h3>
        <p>E-mail: <a href="mailto:info@tekenbureauwinter.com">info@tekenbureauwinter.com</a></p>
        <p>Telefoon: <a href="tel:+31681656361">06-81 65 63 61</a></p>
      </div>

      <div class="site-footer__col">
        <h3>Zakelijk</h3>
        <p>KVK: 99705559</p>
        <div class="site-footer__social">${social}</div>
      </div>
    </div>
    <div class="site-footer__bottom container">
      <p>&copy; 2026 Tekenbureau Winter</p>
      <p class="blueprint-tag">N 52.668° / E 4.840° — Heerhugowaard</p>
    </div>`;
}
