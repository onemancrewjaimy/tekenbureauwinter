/*
 * Tekenbureau Winter - alle front-end logica in één klassiek script.
 * Geen build-stap, geen modules: dit bestand draait direct in de browser.
 * GSAP + ScrollTrigger worden ervoor ingeladen (js/vendor/) en staan als
 * globale `gsap` / `ScrollTrigger` beschikbaar.
 *
 * Volgorde onderaan: partials renderen -> nav/grid/form -> reveal-animaties.
 */
(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  /* ============================================================
   * 1. Gedeelde header & footer (partials)
   * ----------------------------------------------------------------
   * Platte structuur: elke pagina is één .html-bestand in de root.
   * Alle links zijn gewone bestandsnamen (geen mappen, geen "/"), zodat
   * navigeren overal werkt - ook als je de bestanden direct opent.
   * ========================================================== */

  var NAV_LINKS = [
    { label: 'Home', href: 'index.html' },
    { label: 'Diensten', href: 'diensten.html' },
    { label: 'Projecten', href: 'projecten.html' },
    { label: 'Over Tekenbureau Winter', href: 'over-tekenbureau-winter.html' },
    { label: 'Pakketten', href: 'pakketten.html' },
    { label: 'Contact', href: 'contact.html' },
  ];

  var SOCIAL_LINKS = [
    { code: 'IN', label: 'LinkedIn', href: 'https://linkedin.com/feed/' },
    { code: 'IG', label: 'Instagram', href: 'https://instagram.com/tekenbureau_winter/' },
    { code: 'FB', label: 'Facebook', href: 'https://facebook.com/profile.php?id=61588136734913&sk=directory_work' },
    { code: 'WA', label: 'WhatsApp', href: 'https://api.whatsapp.com/send?phone=681656361' },
  ];

  function isActive(currentPath, href) {
    return currentPath === href;
  }

  function renderHeader(currentPath) {
    var links = NAV_LINKS.map(function (link) {
      return '\n      <li>\n        <a href="' + link.href + '" ' +
        (isActive(currentPath, link.href) ? 'aria-current="page"' : '') + '>' + link.label + '</a>\n      </li>';
    }).join('');

    return '' +
      '<div class="site-header__inner container">' +
      '  <a class="site-header__logo" href="index.html" aria-label="Tekenbureau Winter - naar de homepage">' +
      '    <img src="images/logo.png" alt="Tekenbureau Winter" width="180" height="47" loading="eager" />' +
      '  </a>' +
      '  <nav class="site-nav" id="site-nav" aria-label="Hoofdnavigatie">' +
      '    <ul class="site-nav__list">' + links + '</ul>' +
      '  </nav>' +
      '  <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">' +
      '    <span></span><span></span><span></span>' +
      '  </button>' +
      '</div>';
  }

  function renderFooter() {
    var social = SOCIAL_LINKS.map(function (s) {
      return '<a href="' + s.href + '" target="_blank" rel="noopener noreferrer" aria-label="' +
        s.label + ' (opent in nieuw tabblad)"><span aria-hidden="true">' + s.code + '</span></a>';
    }).join('');

    return '' +
      '<div class="site-footer__inner container">' +
      '  <div class="site-footer__brand">' +
      '    <a class="site-footer__logo" href="index.html" aria-label="Tekenbureau Winter - naar de homepage">' +
      '      <img src="images/logo.png" alt="Tekenbureau Winter" width="160" height="42" loading="lazy" />' +
      '    </a>' +
      '    <p class="site-footer__tagline">Jouw visie, onze blauwdruk</p>' +
      '  </div>' +
      '  <div class="site-footer__col">' +
      '    <h3>Locatie</h3>' +
      '    <address>Truus Schröderplantsoen 10<br />1705 ND, Heerhugowaard<br />Nederland</address>' +
      '  </div>' +
      '  <div class="site-footer__col">' +
      '    <h3>Contactgegevens</h3>' +
      '    <p>E-mail: <a href="mailto:info@tekenbureauwinter.com">info@tekenbureauwinter.com</a></p>' +
      '    <p>Telefoon: <a href="tel:+31681656361">06-81 65 63 61</a></p>' +
      '  </div>' +
      '  <div class="site-footer__col">' +
      '    <h3>Zakelijk</h3>' +
      '    <p>KVK: 99705559</p>' +
      '    <div class="site-footer__social">' + social + '</div>' +
      '  </div>' +
      '</div>' +
      '<div class="site-footer__bottom container">' +
      '  <p>&copy; 2026 Tekenbureau Winter</p>' +
      '  <p class="blueprint-tag">N 52.668° / E 4.840° - Heerhugowaard</p>' +
      '</div>';
  }

  /* ============================================================
   * 2. Getekende architectuurelementen (SVG line-art)
   * ----------------------------------------------------------------
   * Elke functie geeft een SVG-string terug. Elementen met class
   * "draw-path" worden door de scroll-reveal zelf-tekenend gemaakt.
   * ========================================================== */

  var ACCENT = 'var(--color-accent)';
  var ACCENT_TINT = 'var(--color-accent-tint)';
  var LINE = 'var(--color-line-strong)';
  var LINE_FAINT = 'var(--color-line)';
  var PAPER = 'var(--color-paper-dim)';
  var MONO = 'var(--font-mono)';

  function heroDrawing() {
    return '' +
    '<svg class="line-art line-art--plan" viewBox="0 0 640 560" fill="none" role="img" aria-label="Bouwkundige plattegrond van de begane grond: woonkamer, keuken, slaapkamer, hal, trap en aanbouw, met deuren, ramen en maatvoering">' +

    // --- Maatvoering boven + links (witness lines + maatlijnen) ---
    '  <g style="stroke:' + LINE_FAINT + '" stroke-width="1">' +
    '    <line x1="60" y1="58" x2="60" y2="86" /><line x1="270" y1="58" x2="270" y2="86" />' +
    '    <line x1="460" y1="58" x2="460" y2="86" /><line x1="580" y1="58" x2="580" y2="86" />' +
    '    <line x1="50" y1="90" x2="40" y2="90" /><line x1="50" y1="310" x2="34" y2="310" /><line x1="50" y1="450" x2="40" y2="450" />' +
    '  </g>' +
    '  <g style="stroke:' + PAPER + '; fill:' + PAPER + '; font-family:' + MONO + '" stroke-width="1" font-size="11">' +
    '    <line class="draw-path" data-order="6" x1="60" y1="52" x2="580" y2="52" />' +
    '    <line x1="60" y1="46" x2="60" y2="58" /><line x1="270" y1="46" x2="270" y2="58" />' +
    '    <line x1="460" y1="46" x2="460" y2="58" /><line x1="580" y1="46" x2="580" y2="58" />' +
    '    <text class="anno anno-dim" x="165" y="44" text-anchor="middle" letter-spacing="1">4200</text>' +
    '    <text class="anno anno-dim" x="365" y="44" text-anchor="middle" letter-spacing="1">3800</text>' +
    '    <text class="anno anno-dim" x="520" y="44" text-anchor="middle" letter-spacing="1">2400</text>' +
    '    <line class="draw-path" data-order="6" x1="44" y1="90" x2="44" y2="450" />' +
    '    <line x1="38" y1="90" x2="50" y2="90" /><line x1="38" y1="310" x2="50" y2="310" /><line x1="38" y1="450" x2="50" y2="450" />' +
    '    <text class="anno anno-dim" transform="rotate(-90 30 200)" x="30" y="200" text-anchor="middle" letter-spacing="1">3400</text>' +
    '    <text class="anno anno-dim" transform="rotate(-90 30 380)" x="30" y="380" text-anchor="middle" letter-spacing="1">2200</text>' +
    '  </g>' +

    // --- Buitenmuren (footprint, L-vorm) ---
    '  <g style="stroke:' + PAPER + '" stroke-width="1.9">' +
    '    <polyline class="draw-path" data-order="0" points="60,90 460,90 460,310 580,310 580,450 60,450 60,90" />' +
    '  </g>' +

    // --- Binnenmuren ---
    '  <g style="stroke:' + PAPER + '" stroke-width="1.4">' +
    '    <line class="draw-path" data-order="1" x1="270" y1="90" x2="270" y2="310" />' +
    '    <line class="draw-path" data-order="1" x1="60" y1="310" x2="460" y2="310" />' +
    '    <line class="draw-path" data-order="1" x1="270" y1="310" x2="270" y2="450" />' +
    '    <line class="draw-path" data-order="1" x1="460" y1="310" x2="460" y2="450" />' +
    '  </g>' +

    // --- Aanbouw / berging geaccentueerd ---
    '  <g style="stroke:' + ACCENT + '" stroke-width="1.9">' +
    '    <polyline class="draw-path" data-order="2" points="460,310 580,310 580,450 460,450 460,310" />' +
    '  </g>' +

    // --- Deuren met draaibogen ---
    '  <g style="stroke:' + ACCENT + '" stroke-width="1.4">' +
    '    <line class="draw-path" data-order="2" x1="380" y1="450" x2="380" y2="405" />' +
    '    <path class="draw-path" data-order="2" d="M380,405 A45,45 0 0 1 335,450" />' +
    '    <line class="draw-path" data-order="2" x1="150" y1="310" x2="150" y2="355" />' +
    '    <path class="draw-path" data-order="2" d="M150,355 A45,45 0 0 0 195,310" />' +
    '    <line class="draw-path" data-order="2" x1="385" y1="310" x2="385" y2="355" />' +
    '    <path class="draw-path" data-order="2" d="M385,355 A45,45 0 0 1 340,310" />' +
    '    <line class="draw-path" data-order="2" x1="460" y1="395" x2="415" y2="395" />' +
    '    <path class="draw-path" data-order="2" d="M415,395 A45,45 0 0 1 460,350" />' +
    '  </g>' +

    // --- Ramen (glaslijn + dagkanten) ---
    '  <g style="stroke:' + ACCENT_TINT + '" stroke-width="1.3">' +
    '    <line class="draw-path" data-order="3" x1="120" y1="90" x2="200" y2="90" /><line x1="120" y1="96" x2="200" y2="96" />' +
    '    <line x1="120" y1="84" x2="120" y2="98" /><line x1="200" y1="84" x2="200" y2="98" />' +
    '    <line class="draw-path" data-order="3" x1="320" y1="90" x2="400" y2="90" /><line x1="320" y1="96" x2="400" y2="96" />' +
    '    <line x1="320" y1="84" x2="320" y2="98" /><line x1="400" y1="84" x2="400" y2="98" />' +
    '    <line class="draw-path" data-order="3" x1="60" y1="150" x2="60" y2="230" /><line x1="66" y1="150" x2="66" y2="230" />' +
    '    <line x1="54" y1="150" x2="68" y2="150" /><line x1="54" y1="230" x2="68" y2="230" />' +
    '    <line class="draw-path" data-order="3" x1="60" y1="350" x2="60" y2="420" /><line x1="66" y1="350" x2="66" y2="420" />' +
    '    <line x1="54" y1="350" x2="68" y2="350" /><line x1="54" y1="420" x2="68" y2="420" />' +
    '    <line class="draw-path" data-order="3" x1="580" y1="350" x2="580" y2="410" /><line x1="574" y1="350" x2="574" y2="410" />' +
    '    <line x1="572" y1="350" x2="586" y2="350" /><line x1="572" y1="410" x2="586" y2="410" />' +
    '  </g>' +

    // --- Trap (treden + looprichting) ---
    '  <g style="stroke:' + LINE + '" stroke-width="1">' +
    '    <line class="draw-path" data-order="4" x1="388" y1="322" x2="388" y2="446" />' +
    '    <line class="draw-path" data-order="4" x1="450" y1="322" x2="450" y2="446" />' +
    '    <line class="draw-path" data-order="4" x1="388" y1="340" x2="450" y2="340" />' +
    '    <line class="draw-path" data-order="4" x1="388" y1="358" x2="450" y2="358" />' +
    '    <line class="draw-path" data-order="4" x1="388" y1="376" x2="450" y2="376" />' +
    '    <line class="draw-path" data-order="4" x1="388" y1="394" x2="450" y2="394" />' +
    '    <line class="draw-path" data-order="4" x1="388" y1="412" x2="450" y2="412" />' +
    '    <line class="draw-path" data-order="4" x1="388" y1="430" x2="450" y2="430" />' +
    '    <line class="draw-path" data-order="4" x1="419" y1="440" x2="419" y2="330" />' +
    '    <polyline class="draw-path" data-order="4" points="412,344 419,330 426,344" />' +
    '  </g>' +

    // --- Meubilair (licht) ---
    '  <g style="stroke:' + PAPER + '; opacity:0.5" stroke-width="1">' +
    '    <rect class="draw-path" data-order="5" x="82" y="232" width="120" height="42" rx="6" />' +
    '    <line class="draw-path" data-order="5" x1="82" y1="248" x2="202" y2="248" />' +
    '    <rect class="draw-path" data-order="5" x="104" y="186" width="62" height="32" rx="3" />' +
    '    <rect class="draw-path" data-order="5" x="318" y="168" width="92" height="58" rx="3" />' +
    '    <rect class="draw-path" data-order="5" x="348" y="146" width="20" height="16" /><rect class="draw-path" data-order="5" x="348" y="232" width="20" height="16" />' +
    '    <rect class="draw-path" data-order="5" x="296" y="186" width="16" height="22" /><rect class="draw-path" data-order="5" x="416" y="186" width="16" height="22" />' +
    '    <rect class="draw-path" data-order="5" x="84" y="348" width="98" height="84" rx="3" />' +
    '    <line class="draw-path" data-order="5" x1="84" y1="372" x2="182" y2="372" />' +
    '  </g>' +

    // --- Ruimtelabels + oppervlaktes ---
    '  <g style="fill:' + PAPER + '; font-family:' + MONO + '" font-size="13" letter-spacing="1.5">' +
    '    <text class="anno anno-room" x="120" y="120" text-anchor="middle">WOONKAMER</text>' +
    '    <text class="anno anno-room" x="335" y="120" text-anchor="middle">KEUKEN</text>' +
    '    <text class="anno anno-room" x="150" y="332" text-anchor="middle">SLAAPKAMER</text>' +
    '    <text class="anno anno-room" x="330" y="332" text-anchor="middle">HAL</text>' +
    '  </g>' +
    '  <g style="fill:' + ACCENT + '; font-family:' + MONO + '" font-size="13" letter-spacing="1.5">' +
    '    <text class="anno anno-room" x="520" y="392" text-anchor="middle">AANBOUW</text>' +
    '  </g>' +
    '  <g style="fill:' + LINE + '; font-family:' + MONO + '" font-size="9" letter-spacing="1">' +
    '    <text class="anno anno-room" x="120" y="136" text-anchor="middle">28.4 m²</text>' +
    '    <text class="anno anno-room" x="335" y="136" text-anchor="middle">16.1 m²</text>' +
    '    <text class="anno anno-room" x="150" y="348" text-anchor="middle">12.8 m²</text>' +
    '    <text class="anno anno-room" x="520" y="408" text-anchor="middle">9.0 m²</text>' +
    '  </g>' +

    // --- Kompas ---
    '  <g style="stroke:' + PAPER + '; fill:' + PAPER + '; font-family:' + MONO + '" stroke-width="1" font-size="11">' +
    '    <circle class="draw-path" data-order="6" cx="118" cy="505" r="26" />' +
    '    <line x1="118" y1="481" x2="118" y2="529" /><line x1="94" y1="505" x2="142" y2="505" />' +
    '    <text class="anno anno-stamp" x="118" y="476" text-anchor="middle">N</text>' +
    '    <text class="anno anno-stamp" x="168" y="500" letter-spacing="1">52.668° N</text>' +
    '    <text class="anno anno-stamp" x="168" y="516" letter-spacing="1">4.840° E</text>' +
    '  </g>' +

    // --- Titelblok (stempel) ---
    '  <g style="stroke:' + LINE + '; fill:none" stroke-width="1">' +
    '    <rect class="draw-path" data-order="6" x="300" y="476" width="300" height="68" />' +
    '    <line class="draw-path" data-order="6" x1="300" y1="502" x2="600" y2="502" />' +
    '    <line class="draw-path" data-order="6" x1="300" y1="524" x2="600" y2="524" />' +
    '    <line class="draw-path" data-order="6" x1="470" y1="524" x2="470" y2="544" />' +
    '  </g>' +
    '  <g style="fill:' + PAPER + '; font-family:' + MONO + '">' +
    '    <text class="anno anno-stamp" x="310" y="495" font-size="13" letter-spacing="2">TEKENBUREAU WINTER</text>' +
    '    <text class="anno anno-stamp" x="310" y="518" font-size="10" letter-spacing="1" style="fill:' + LINE + '">PLATTEGROND · BEGANE GROND</text>' +
    '    <text class="anno anno-stamp" x="310" y="539" font-size="10" letter-spacing="1" style="fill:' + LINE + '">SCHAAL 1:100</text>' +
    '    <text class="anno anno-stamp" x="480" y="539" font-size="10" letter-spacing="1" style="fill:' + LINE + '">GET. TBW · 2026</text>' +
    '  </g>' +
    '</svg>';
  }

  function dakkapelDrawing() {
    return '' +
    '<svg class="line-art" viewBox="0 0 560 380" fill="none" role="img" aria-label="Lijntekening van een dakkapel op een schuin dak">' +
    '  <g style="stroke:' + LINE_FAINT + '" stroke-width="1"><line x1="0" y1="320" x2="560" y2="320" /></g>' +
    '  <g style="stroke:' + PAPER + '" stroke-width="1.3">' +
    '    <line class="draw-path" data-order="0" x1="40" y1="320" x2="280" y2="180" />' +
    '    <line class="draw-path" data-order="0" x1="280" y1="180" x2="520" y2="320" />' +
    '  </g>' +
    '  <g style="stroke:' + ACCENT + '" stroke-width="1.6">' +
    '    <polyline class="draw-path" data-order="1" points="190,250 190,140 230,118 330,118 370,140 370,250" />' +
    '  </g>' +
    '  <g style="stroke:' + ACCENT_TINT + '" stroke-width="1.3">' +
    '    <rect class="draw-path" data-order="2" x="230" y="150" width="100" height="80" />' +
    '    <line x1="280" y1="150" x2="280" y2="230" stroke-dasharray="0" />' +
    '  </g>' +
    '  <g style="stroke:' + PAPER + '; fill:' + PAPER + '; font-family:' + MONO + '" stroke-width="1" font-size="11">' +
    '    <line class="draw-path" data-order="3" x1="190" y1="276" x2="370" y2="276" />' +
    '    <line x1="190" y1="270" x2="190" y2="282" />' +
    '    <line x1="370" y1="270" x2="370" y2="282" />' +
    '    <text x="280" y="296" text-anchor="middle" letter-spacing="1">1800</text>' +
    '    <line class="draw-path" data-order="3" x1="396" y1="118" x2="396" y2="250" />' +
    '    <line x1="390" y1="118" x2="402" y2="118" />' +
    '    <line x1="390" y1="250" x2="402" y2="250" />' +
    '    <text x="414" y="190" text-anchor="start" letter-spacing="1">1100</text>' +
    '  </g>' +
    '  <g style="fill:' + PAPER + '; font-family:' + MONO + '" font-size="10" letter-spacing="1">' +
    '    <text x="40" y="345">DAKKAPEL 01 · VOORAANZICHT</text>' +
    '  </g>' +
    '</svg>';
  }

  function aanbouwDrawing() {
    return '' +
    '<svg class="line-art" viewBox="0 0 560 360" fill="none" role="img" aria-label="Lijntekening van een aanbouw met glazen pui tegen de woning">' +
    '  <g style="stroke:' + LINE_FAINT + '" stroke-width="1"><line x1="0" y1="300" x2="560" y2="300" /></g>' +
    '  <g style="stroke:' + PAPER + '" stroke-width="1.4">' +
    '    <polyline class="draw-path" data-order="0" points="40,300 40,120 130,60 220,120 220,300" />' +
    '  </g>' +
    '  <g style="stroke:' + ACCENT + '" stroke-width="1.6">' +
    '    <polyline class="draw-path" data-order="1" points="220,300 220,170 420,170 420,300" />' +
    '  </g>' +
    '  <g style="stroke:' + ACCENT_TINT + '" stroke-width="1.3">' +
    '    <line class="draw-path" data-order="2" x1="260" y1="300" x2="260" y2="190" />' +
    '    <line class="draw-path" data-order="2" x1="380" y1="300" x2="380" y2="190" />' +
    '    <line class="draw-path" data-order="2" x1="260" y1="190" x2="380" y2="190" />' +
    '    <line x1="320" y1="190" x2="320" y2="300" stroke-dasharray="0" />' +
    '  </g>' +
    '  <g style="stroke:' + PAPER + '; fill:' + PAPER + '; font-family:' + MONO + '" stroke-width="1" font-size="11">' +
    '    <line class="draw-path" data-order="3" x1="220" y1="326" x2="420" y2="326" />' +
    '    <line x1="220" y1="320" x2="220" y2="332" />' +
    '    <line x1="420" y1="320" x2="420" y2="332" />' +
    '    <text x="320" y="346" text-anchor="middle" letter-spacing="1">4000</text>' +
    '    <line class="draw-path" data-order="3" x1="446" y1="170" x2="446" y2="300" />' +
    '    <line x1="440" y1="170" x2="452" y2="170" />' +
    '    <line x1="440" y1="300" x2="452" y2="300" />' +
    '    <text x="464" y="240" text-anchor="start" letter-spacing="1">2400</text>' +
    '  </g>' +
    '  <g style="fill:' + PAPER + '; font-family:' + MONO + '" font-size="10" letter-spacing="1">' +
    '    <text x="40" y="334">AANBOUW 01 · ZIJAANZICHT</text>' +
    '  </g>' +
    '</svg>';
  }

  function kozijnDrawing() {
    return '' +
    '<svg class="line-art" viewBox="0 0 420 420" fill="none" role="img" aria-label="Lijntekening van een kozijn met draairaam en bovenlicht">' +
    '  <g style="stroke:' + PAPER + '" stroke-width="1.4">' +
    '    <rect class="draw-path" data-order="0" x="110" y="60" width="200" height="300" />' +
    '  </g>' +
    '  <g style="stroke:' + LINE + '" stroke-width="1">' +
    '    <line class="draw-path" data-order="1" x1="110" y1="120" x2="310" y2="120" />' +
    '  </g>' +
    '  <g style="stroke:' + ACCENT_TINT + '" stroke-width="1.3">' +
    '    <line class="draw-path" data-order="2" x1="210" y1="120" x2="210" y2="360" />' +
    '  </g>' +
    '  <g style="stroke:' + ACCENT + '" stroke-width="1.2" stroke-dasharray="3 5">' +
    '    <polyline class="draw-path" data-order="3" points="118,128 202,240 118,352" />' +
    '    <polyline class="draw-path" data-order="3" points="302,128 218,240 302,352" />' +
    '  </g>' +
    '  <g style="stroke:' + PAPER + '" stroke-width="1.6">' +
    '    <line class="draw-path" data-order="4" x1="92" y1="360" x2="328" y2="360" />' +
    '  </g>' +
    '  <g style="stroke:' + PAPER + '; fill:' + PAPER + '; font-family:' + MONO + '" stroke-width="1" font-size="11">' +
    '    <line class="draw-path" data-order="5" x1="110" y1="386" x2="310" y2="386" />' +
    '    <line x1="110" y1="380" x2="110" y2="392" />' +
    '    <line x1="310" y1="380" x2="310" y2="392" />' +
    '    <text x="210" y="406" text-anchor="middle" letter-spacing="1">1200</text>' +
    '    <line class="draw-path" data-order="5" x1="346" y1="60" x2="346" y2="360" />' +
    '    <line x1="340" y1="60" x2="352" y2="60" />' +
    '    <line x1="340" y1="360" x2="352" y2="360" />' +
    '    <text x="364" y="215" text-anchor="start" letter-spacing="1">2300</text>' +
    '  </g>' +
    '  <g style="fill:' + PAPER + '; font-family:' + MONO + '" font-size="10" letter-spacing="1">' +
    '    <text x="110" y="40">KOZIJN 01 · DRAAIRAAM</text>' +
    '  </g>' +
    '</svg>';
  }

  function tierElevationsDrawing() {
    return '' +
    '<svg class="line-art" viewBox="0 0 720 220" fill="none" role="img" aria-label="Drie gevelaanzichten van toenemende complexiteit">' +
    '  <g style="stroke:' + PAPER + '" stroke-width="1.2">' +
    '    <polyline class="draw-path" data-order="0" points="40,190 40,110 100,110 100,190" />' +
    '  </g>' +
    '  <g style="stroke:' + ACCENT_TINT + '" stroke-width="1.3">' +
    '    <polyline class="draw-path" data-order="1" points="300,190 300,90 360,60 420,90 420,190" />' +
    '    <line x1="300" y1="90" x2="420" y2="90" />' +
    '  </g>' +
    '  <g style="stroke:' + ACCENT + '" stroke-width="1.5">' +
    '    <polyline class="draw-path" data-order="2" points="560,190 560,70 620,40 680,70 680,190" />' +
    '    <line x1="560" y1="70" x2="680" y2="70" />' +
    '    <polyline points="600,190 600,130 640,130 640,190" />' +
    '    <line x1="640" y1="160" x2="600" y2="160" />' +
    '  </g>' +
    '  <g style="stroke:' + LINE + '" stroke-width="1"><line x1="0" y1="190" x2="720" y2="190" /></g>' +
    '  <g style="fill:' + PAPER + '; font-family:' + MONO + '" font-size="10" letter-spacing="1">' +
    '    <text x="40" y="208">BASIS</text>' +
    '    <text x="300" y="208">VERGUNNING</text>' +
    '    <text x="560" y="208">TOTAAL</text>' +
    '  </g>' +
    '</svg>';
  }

  // Welke tekening hoort bij welke pagina-container (id -> functie).
  var PAGE_ART = {
    'hero-art': heroDrawing,
    'section-art': dakkapelDrawing,
    'site-plan-art': aanbouwDrawing,
    'drafting-art': kozijnDrawing,
    'tier-art': tierElevationsDrawing,
  };

  function injectPageArt() {
    Object.keys(PAGE_ART).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.innerHTML = PAGE_ART[id]();
    });
  }

  /*
   * Hero-plattegrond: tekent zichzelf zoals een tekenaar dat doet -
   * eerst de buitenmuren (snel, zeker), dan binnenmuren, deuren, ramen,
   * trap, meubels en als laatste de maatvoering en het stempel. Elke laag
   * heeft zijn eigen tempo, en de annotaties verschijnen pas wanneer de
   * bijbehorende lijnen er staan (gekoppeld aan de tijdlijn, niet aan een
   * vaste timer). Eén doelbewuste sequentie, geen losse effecten.
   */
  function initHeroPlan() {
    var svg = document.querySelector('.line-art--plan');
    if (!svg) return;

    var paths = svg.querySelectorAll('.draw-path');
    var annos = svg.querySelectorAll('.anno');
    var byOrder = function (o) { return svg.querySelectorAll('.draw-path[data-order="' + o + '"]'); };
    var annoOf = function (name) { return svg.querySelectorAll('.anno-' + name); };

    // Reduced motion: alles meteen in eindstaat, geen tekening.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      paths.forEach(function (p) { p.style.strokeDasharray = 'none'; p.style.strokeDashoffset = '0'; });
      annos.forEach(function (a) { a.style.opacity = '1'; });
      return;
    }

    paths.forEach(function (p) {
      var len = p.getTotalLength ? p.getTotalLength() : 300;
      p.style.strokeDasharray = '' + len;
      p.style.strokeDashoffset = '' + len;
    });

    var tl = gsap.timeline({ scrollTrigger: { trigger: svg, start: 'top 78%' } });

    tl.to(byOrder(0), { strokeDashoffset: 0, duration: 0.65, ease: 'power2.out' }, 0)
      .to(byOrder(1), { strokeDashoffset: 0, duration: 0.45, ease: 'power2.out', stagger: 0.1 }, 0.45)
      .to(annoOf('room'), { opacity: 1, duration: 0.5, ease: 'power1.out', stagger: 0.07 }, 0.8)
      .to(byOrder(2), { strokeDashoffset: 0, duration: 0.4, ease: 'power1.inOut', stagger: 0.06 }, 0.95)
      .to(byOrder(3), { strokeDashoffset: 0, duration: 0.3, ease: 'power1.out', stagger: 0.04 }, 1.35)
      .to(byOrder(4), { strokeDashoffset: 0, duration: 0.28, ease: 'power1.out', stagger: 0.03 }, 1.6)
      .to(byOrder(5), { strokeDashoffset: 0, duration: 0.3, ease: 'power1.out', stagger: 0.04 }, 1.85)
      .to(byOrder(6), { strokeDashoffset: 0, duration: 0.45, ease: 'power2.out', stagger: 0.03 }, 2.1)
      .to(annoOf('dim'), { opacity: 1, duration: 0.4, ease: 'power1.out', stagger: 0.05 }, 2.35)
      .to(annoOf('stamp'), { opacity: 1, duration: 0.5, ease: 'power2.out' }, 2.5);
  }

  /* ============================================================
   * 3. Mobiel menu
   * ========================================================== */

  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    var closeMenu = function () {
      document.body.classList.remove('nav-is-open');
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    var openMenu = function () {
      document.body.classList.add('nav-is-open');
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    };

    toggle.addEventListener('click', function () {
      if (nav.classList.contains('is-open')) closeMenu(); else openMenu();
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });

    var lastWidth = window.innerWidth;
    window.addEventListener('resize', function () {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        if (window.innerWidth > 860) closeMenu();
      }
    });
  }

  /* ============================================================
   * 4. Blueprint-raster (statische achtergrondtextuur)
   * ----------------------------------------------------------------
   * Bewust geen parallax of oneindige beweging: een blueprint-raster is
   * een textuur, die hoort stil te liggen. Eén keer plaatsen en klaar.
   * ========================================================== */

  function initBlueprintGrid() {
    if (document.querySelector('.blueprint-grid')) return;

    var grid = document.createElement('div');
    grid.className = 'blueprint-grid';
    grid.setAttribute('aria-hidden', 'true');
    grid.innerHTML =
      '<div class="blueprint-grid__layer blueprint-grid__layer--coarse"></div>' +
      '<div class="blueprint-grid__layer blueprint-grid__layer--fine"></div>';
    document.body.prepend(grid);
  }

  /* ============================================================
   * 5. Contactformulier (honeypot + basisvalidatie, gesimuleerde verzending)
   * ========================================================== */

  function initContactForm() {
    var form = document.querySelector('[data-contact-form]');
    if (!form) return;

    var status = form.querySelector('[data-form-status]');
    var submitButton = form.querySelector('[type="submit"]');

    var setStatus = function (message, state) {
      if (!status) return;
      status.textContent = message;
      status.dataset.state = state;
    };

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var honeypot = form.querySelector('input[name="laat-dit-veld-leeg"]');
      if (honeypot && honeypot.value.trim() !== '') {
        form.reset();
        setStatus('Bedankt voor je bericht. We nemen snel contact met je op.', 'success');
        return;
      }

      var name = form.querySelector('#naam');
      var email = form.querySelector('#email');
      var message = form.querySelector('#bericht');

      var fields = [name, email, message];
      var missing = fields.find(function (field) { return !field || field.value.trim() === ''; });

      if (missing) {
        setStatus('Vul alle verplichte velden in voordat je verzendt.', 'error');
        missing.focus();
        return;
      }

      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        setStatus('Vul een geldig e-mailadres in.', 'error');
        email.focus();
        return;
      }

      if (submitButton) submitButton.disabled = true;
      setStatus('Bericht wordt verzonden…', null);

      // Gesimuleerde verzending - vervang door een echte API-aanroep.
      setTimeout(function () {
        setStatus('Bedankt, ' + name.value.trim().split(' ')[0] + '! Je bericht is verzonden. We reageren binnen één werkdag.', 'success');
        form.reset();
        if (submitButton) submitButton.disabled = false;
      }, 500);
    });
  }

  /* ============================================================
   * 6. Entree-beweging
   * ----------------------------------------------------------------
   * Bewust terughoudend. Eén rustige reveal voor tekstkoppen; geen
   * scale/stagger op informatieblokken (die staan er gewoon). De
   * lijntekeningen op de overige pagina's tekenen zichzelf, met een
   * natuurlijke cadans (de hero-plattegrond heeft zijn eigen sequentie,
   * zie initHeroPlan).
   * ========================================================== */

  function initScrollReveal() {
    // Reduced motion: lijnen meteen volledig getekend, niets te onthullen
    // (de [data-reveal]-elementen zijn dan al zichtbaar via CSS).
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.draw-path').forEach(function (path) {
        path.style.strokeDasharray = 'none';
        path.style.strokeDashoffset = '0';
      });
      return;
    }

    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
    });

    gsap.utils.toArray('.line-art:not(.line-art--plan)').forEach(function (svg) {
      var paths = svg.querySelectorAll('.draw-path');
      if (!paths.length) return;

      paths.forEach(function (path) {
        var length = path.getTotalLength ? path.getTotalLength() : 300;
        path.style.strokeDasharray = '' + length;
        path.style.strokeDashoffset = '' + length;
      });

      var groups = {};
      paths.forEach(function (path) {
        var order = path.dataset.order || '0';
        groups[order] = groups[order] || [];
        groups[order].push(path);
      });

      var tl = gsap.timeline({ scrollTrigger: { trigger: svg, start: 'top 80%' } });

      // Eerste lijnen iets steviger/trager, details erna sneller en lichter -
      // zodat het leest als tekenen, niet als een plotter op constante snelheid.
      Object.keys(groups).sort(function (a, b) { return Number(a) - Number(b); }).forEach(function (order, i) {
        var dur = i === 0 ? 0.6 : 0.34;
        var ease = i === 0 ? 'power2.out' : 'power1.out';
        tl.to(groups[order], { strokeDashoffset: 0, duration: dur, ease: ease, stagger: 0.05 }, i * 0.18);
      });
    });
  }

  /* ============================================================
   * 7. Bootstrap
   * ========================================================== */

  document.documentElement.classList.remove('no-js');

  var headerEl = document.getElementById('site-header');
  var footerEl = document.getElementById('site-footer');
  var currentPath = document.body.dataset.path || 'index.html';

  if (headerEl) headerEl.innerHTML = renderHeader(currentPath);
  if (footerEl) footerEl.innerHTML = renderFooter();

  injectPageArt();
  initHeroPlan();
  initNav();
  initBlueprintGrid();
  initContactForm();

  // Reveal-animaties pas starten zodra header/footer/art (en hun layout) vaststaan.
  requestAnimationFrame(initScrollReveal);
})();
