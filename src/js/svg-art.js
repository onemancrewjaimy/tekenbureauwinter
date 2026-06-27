/**
 * Getekende architectuurelementen — de visuele kern van de site.
 * Elke functie geeft een SVG-string terug (plattegrond, gevel, doorsnede,
 * situatietekening...) opgebouwd uit lijnen, maatlijnen en coördinaten,
 * zoals op een echte bouwtekening. Elementen met class "draw-path" worden
 * door scroll-reveal.js zelf-tekenend gemaakt (stroke-dashoffset + ScrollTrigger).
 *
 * Kleuren worden via het "style"-attribuut gezet (niet als los presentatie-
 * attribuut) zodat CSS custom properties (var(--color-...)) overal
 * betrouwbaar worden geïnterpreteerd.
 */

const ACCENT = 'var(--color-accent)';
const ACCENT_TINT = 'var(--color-accent-tint)';
const LINE = 'var(--color-line-strong)';
const LINE_FAINT = 'var(--color-line)';
const PAPER = 'var(--color-paper-dim)';
const MONO = 'var(--font-mono)';

/** Hero-tekening (Home): axonometrische schets van aanbouw + opbouw + dakkapel */
export function heroDrawing() {
  return `
  <svg class="line-art" viewBox="0 0 620 520" fill="none" role="img" aria-label="Lijntekening van een woning met aanbouw, opbouw en dakkapel">
    <g style="stroke:${LINE_FAINT}" stroke-width="1">
      <line x1="0" y1="460" x2="620" y2="460" />
    </g>

    <!-- Hoofdvolume -->
    <g style="stroke:${PAPER}" stroke-width="1.4">
      <polyline class="draw-path" data-order="0" points="120,460 120,260 310,170 500,260 500,460" />
      <line class="draw-path" data-order="1" x1="120" y1="260" x2="500" y2="260" />
    </g>

    <!-- Dakkapel -->
    <g style="stroke:${ACCENT_TINT}" stroke-width="1.4">
      <polyline class="draw-path" data-order="2" points="250,222 250,180 310,150 370,180 370,222" />
      <line class="draw-path" data-order="2" x1="250" y1="222" x2="370" y2="222" />
    </g>

    <!-- Aanbouw (links) -->
    <g style="stroke:${ACCENT}" stroke-width="1.6">
      <polyline class="draw-path" data-order="3" points="20,460 20,360 120,330 120,460" />
    </g>

    <!-- Overkapping (rechts) -->
    <g style="stroke:${PAPER}" stroke-width="1.2" stroke-dasharray="2 6">
      <line class="draw-path" data-order="4" x1="500" y1="320" x2="590" y2="345" />
      <line class="draw-path" data-order="4" x1="500" y1="460" x2="590" y2="460" />
      <line x1="590" y1="345" x2="590" y2="460" stroke-dasharray="0" />
    </g>

    <!-- Maatlijnen -->
    <g style="stroke:${PAPER}; fill:${PAPER}; font-family:${MONO}" stroke-width="1" font-size="11">
      <line class="draw-path" data-order="5" x1="120" y1="486" x2="500" y2="486" />
      <line x1="120" y1="480" x2="120" y2="492" />
      <line x1="500" y1="480" x2="500" y2="492" />
      <text x="290" y="506" text-anchor="middle" letter-spacing="1">3800</text>

      <line class="draw-path" data-order="5" x1="540" y1="260" x2="540" y2="460" />
      <line x1="534" y1="260" x2="546" y2="260" />
      <line x1="534" y1="460" x2="546" y2="460" />
      <text x="558" y="365" text-anchor="start" letter-spacing="1">2600</text>
    </g>

    <!-- Coördinaat / kompas -->
    <g style="stroke:${PAPER}; fill:${PAPER}; font-family:${MONO}" stroke-width="1" font-size="10">
      <circle cx="566" cy="60" r="22" />
      <line x1="566" y1="40" x2="566" y2="80" />
      <line x1="546" y1="60" x2="586" y2="60" />
      <text x="566" y="34" text-anchor="middle">N</text>
      <text x="40" y="30" letter-spacing="1">X 52.668° / Y 4.840°</text>
    </g>
  </svg>`;
}

/** Dakkapeltekening (Diensten): voor- en zijaanzicht van een dakkapel op een schuin dak */
export function dakkapelDrawing() {
  return `
  <svg class="line-art" viewBox="0 0 560 380" fill="none" role="img" aria-label="Lijntekening van een dakkapel op een schuin dak">
    <g style="stroke:${LINE_FAINT}" stroke-width="1">
      <line x1="0" y1="320" x2="560" y2="320" />
    </g>

    <!-- Dakvlak -->
    <g style="stroke:${PAPER}" stroke-width="1.3">
      <line class="draw-path" data-order="0" x1="40" y1="320" x2="280" y2="180" />
      <line class="draw-path" data-order="0" x1="280" y1="180" x2="520" y2="320" />
    </g>

    <!-- Dakkapel: opstaande wangen, voorgevel en plat dakje -->
    <g style="stroke:${ACCENT}" stroke-width="1.6">
      <polyline class="draw-path" data-order="1" points="190,250 190,140 230,118 330,118 370,140 370,250" />
    </g>

    <!-- Raam in de dakkapel -->
    <g style="stroke:${ACCENT_TINT}" stroke-width="1.3">
      <rect class="draw-path" data-order="2" x="230" y="150" width="100" height="80" />
      <line x1="280" y1="150" x2="280" y2="230" stroke-dasharray="0" />
    </g>

    <!-- Maatlijnen -->
    <g style="stroke:${PAPER}; fill:${PAPER}; font-family:${MONO}" stroke-width="1" font-size="11">
      <line class="draw-path" data-order="3" x1="190" y1="276" x2="370" y2="276" />
      <line x1="190" y1="270" x2="190" y2="282" />
      <line x1="370" y1="270" x2="370" y2="282" />
      <text x="280" y="296" text-anchor="middle" letter-spacing="1">1800</text>

      <line class="draw-path" data-order="3" x1="396" y1="118" x2="396" y2="250" />
      <line x1="390" y1="118" x2="402" y2="118" />
      <line x1="390" y1="250" x2="402" y2="250" />
      <text x="414" y="190" text-anchor="start" letter-spacing="1">1100</text>
    </g>

    <g style="fill:${PAPER}; font-family:${MONO}" font-size="10" letter-spacing="1">
      <text x="40" y="345">DAKKAPEL 01 · VOORAANZICHT</text>
    </g>
  </svg>`;
}

/** Aanbouwtekening (Projecten): zijaanzicht van een aanbouw met glazen pui tegen de woning */
export function aanbouwDrawing() {
  return `
  <svg class="line-art" viewBox="0 0 560 360" fill="none" role="img" aria-label="Lijntekening van een aanbouw met glazen pui tegen de woning">
    <g style="stroke:${LINE_FAINT}" stroke-width="1">
      <line x1="0" y1="300" x2="560" y2="300" />
    </g>

    <!-- Bestaande woning (links, deels in beeld) -->
    <g style="stroke:${PAPER}" stroke-width="1.4">
      <polyline class="draw-path" data-order="0" points="40,300 40,120 130,60 220,120 220,300" />
    </g>

    <!-- Aanbouw: platte kap met grote glazen pui -->
    <g style="stroke:${ACCENT}" stroke-width="1.6">
      <polyline class="draw-path" data-order="1" points="220,300 220,170 420,170 420,300" />
    </g>
    <g style="stroke:${ACCENT_TINT}" stroke-width="1.3">
      <line class="draw-path" data-order="2" x1="260" y1="300" x2="260" y2="190" />
      <line class="draw-path" data-order="2" x1="380" y1="300" x2="380" y2="190" />
      <line class="draw-path" data-order="2" x1="260" y1="190" x2="380" y2="190" />
      <line x1="320" y1="190" x2="320" y2="300" stroke-dasharray="0" />
    </g>

    <!-- Maatlijnen -->
    <g style="stroke:${PAPER}; fill:${PAPER}; font-family:${MONO}" stroke-width="1" font-size="11">
      <line class="draw-path" data-order="3" x1="220" y1="326" x2="420" y2="326" />
      <line x1="220" y1="320" x2="220" y2="332" />
      <line x1="420" y1="320" x2="420" y2="332" />
      <text x="320" y="346" text-anchor="middle" letter-spacing="1">4000</text>

      <line class="draw-path" data-order="3" x1="446" y1="170" x2="446" y2="300" />
      <line x1="440" y1="170" x2="452" y2="170" />
      <line x1="440" y1="300" x2="452" y2="300" />
      <text x="464" y="240" text-anchor="start" letter-spacing="1">2400</text>
    </g>

    <g style="fill:${PAPER}; font-family:${MONO}" font-size="10" letter-spacing="1">
      <text x="40" y="334">AANBOUW 01 · ZIJAANZICHT</text>
    </g>
  </svg>`;
}

/** Kozijntekening (Over): elevatie van een kozijn met draairaam en bovenlicht */
export function kozijnDrawing() {
  return `
  <svg class="line-art" viewBox="0 0 420 420" fill="none" role="img" aria-label="Lijntekening van een kozijn met draairaam en bovenlicht">
    <!-- Buitenkant kozijn -->
    <g style="stroke:${PAPER}" stroke-width="1.4">
      <rect class="draw-path" data-order="0" x="110" y="60" width="200" height="300" />
    </g>

    <!-- Bovenlicht -->
    <g style="stroke:${LINE}" stroke-width="1">
      <line class="draw-path" data-order="1" x1="110" y1="120" x2="310" y2="120" />
    </g>

    <!-- Draairaam: twee vleugels met openingssymbool -->
    <g style="stroke:${ACCENT_TINT}" stroke-width="1.3">
      <line class="draw-path" data-order="2" x1="210" y1="120" x2="210" y2="360" />
    </g>
    <g style="stroke:${ACCENT}" stroke-width="1.2" stroke-dasharray="3 5">
      <polyline class="draw-path" data-order="3" points="118,128 202,240 118,352" />
      <polyline class="draw-path" data-order="3" points="302,128 218,240 302,352" />
    </g>

    <!-- Onderdorpel -->
    <g style="stroke:${PAPER}" stroke-width="1.6">
      <line class="draw-path" data-order="4" x1="92" y1="360" x2="328" y2="360" />
    </g>

    <!-- Maatlijnen -->
    <g style="stroke:${PAPER}; fill:${PAPER}; font-family:${MONO}" stroke-width="1" font-size="11">
      <line class="draw-path" data-order="5" x1="110" y1="386" x2="310" y2="386" />
      <line x1="110" y1="380" x2="110" y2="392" />
      <line x1="310" y1="380" x2="310" y2="392" />
      <text x="210" y="406" text-anchor="middle" letter-spacing="1">1200</text>

      <line class="draw-path" data-order="5" x1="346" y1="60" x2="346" y2="360" />
      <line x1="340" y1="60" x2="352" y2="60" />
      <line x1="340" y1="360" x2="352" y2="360" />
      <text x="364" y="215" text-anchor="start" letter-spacing="1">2300</text>
    </g>

    <g style="fill:${PAPER}; font-family:${MONO}" font-size="10" letter-spacing="1">
      <text x="110" y="40">KOZIJN 01 · DRAAIRAAM</text>
    </g>
  </svg>`;
}

/** Drie elevaties (Pakketen): oplopende complexiteit voor Basis / Vergunning / Totaal */
export function tierElevationsDrawing() {
  return `
  <svg class="line-art" viewBox="0 0 720 220" fill="none" role="img" aria-label="Drie gevelaanzichten van toenemende complexiteit">
    <g style="stroke:${PAPER}" stroke-width="1.2">
      <polyline class="draw-path" data-order="0" points="40,190 40,110 100,110 100,190" />
    </g>
    <g style="stroke:${ACCENT_TINT}" stroke-width="1.3">
      <polyline class="draw-path" data-order="1" points="300,190 300,90 360,60 420,90 420,190" />
      <line x1="300" y1="90" x2="420" y2="90" />
    </g>
    <g style="stroke:${ACCENT}" stroke-width="1.5">
      <polyline class="draw-path" data-order="2" points="560,190 560,70 620,40 680,70 680,190" />
      <line x1="560" y1="70" x2="680" y2="70" />
      <polyline points="600,190 600,130 640,130 640,190" />
      <line x1="640" y1="160" x2="600" y2="160" />
    </g>
    <g style="stroke:${LINE}" stroke-width="1">
      <line x1="0" y1="190" x2="720" y2="190" />
    </g>
    <g style="fill:${PAPER}; font-family:${MONO}" font-size="10" letter-spacing="1">
      <text x="40" y="208">BASIS</text>
      <text x="300" y="208">VERGUNNING</text>
      <text x="560" y="208">TOTAAL</text>
    </g>
  </svg>`;
}
