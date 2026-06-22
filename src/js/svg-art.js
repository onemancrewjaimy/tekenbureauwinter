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

/** Doorsnede-tekening (Diensten): dakconstructie met dakkapel en maatvoering */
export function sectionDrawing() {
  return `
  <svg class="line-art" viewBox="0 0 560 380" fill="none" role="img" aria-label="Doorsnedetekening van een dakconstructie met dakkapel">
    <g style="stroke:${PAPER}" stroke-width="1.3">
      <line class="draw-path" data-order="0" x1="40" y1="320" x2="520" y2="320" />
      <polyline class="draw-path" data-order="1" points="80,320 80,180 280,60 480,180 480,320" />
    </g>
    <g style="stroke:${ACCENT_TINT}" stroke-width="1.4">
      <polyline class="draw-path" data-order="2" points="190,140 190,90 280,90 280,140" />
      <line x1="190" y1="140" x2="280" y2="140" />
    </g>
    <g style="stroke:${LINE}" stroke-width="1" stroke-dasharray="2 5">
      <line class="draw-path" data-order="3" x1="280" y1="60" x2="280" y2="320" />
    </g>
    <g style="stroke:${PAPER}; fill:${PAPER}; font-family:${MONO}" stroke-width="1" font-size="11">
      <line class="draw-path" data-order="4" x1="40" y1="340" x2="40" y2="60" />
      <line x1="34" y1="320" x2="46" y2="320" />
      <line x1="34" y1="60" x2="46" y2="60" />
      <text x="30" y="190" text-anchor="end" transform="rotate(-90 30 190)">2950</text>
      <text x="280" y="350" text-anchor="middle">DOORSNEDE A-A · 1:50</text>
    </g>
  </svg>`;
}

/** Situatietekening (Projecten): plattegrondraster met percelen en schaal */
export function sitePlanDrawing() {
  return `
  <svg class="line-art" viewBox="0 0 560 400" fill="none" role="img" aria-label="Situatietekening met percelen en rasterlijnen">
    <g style="stroke:${LINE_FAINT}" stroke-width="1">
      ${[0, 1, 2, 3, 4, 5].map((i) => `<line x1="${40 + i * 90}" y1="20" x2="${40 + i * 90}" y2="360" />`).join('')}
      ${[0, 1, 2, 3, 4].map((i) => `<line x1="40" y1="${20 + i * 85}" x2="490" y2="${20 + i * 85}" />`).join('')}
    </g>
    <g style="stroke:${PAPER}" stroke-width="1.4">
      <rect class="draw-path" data-order="0" x="100" y="60" width="140" height="110" />
      <rect class="draw-path" data-order="1" x="280" y="105" width="120" height="150" />
    </g>
    <g style="stroke:${ACCENT}" stroke-width="1.6">
      <rect class="draw-path" data-order="2" x="130" y="190" width="80" height="70" />
    </g>
    <g style="fill:${PAPER}; font-family:${MONO}" font-size="10">
      <text x="40" y="14">A</text><text x="130" y="14">B</text><text x="220" y="14">C</text>
      <text x="310" y="14">D</text><text x="400" y="14">E</text>
      <text x="20" y="25">1</text><text x="20" y="110">2</text><text x="20" y="195">3</text>
      <text x="20" y="280">4</text>
      <text x="320" y="380" letter-spacing="1">SCHAAL 1:200</text>
    </g>
  </svg>`;
}

/** Tekentafel-illustratie (Over): passer en winkelhaak */
export function draftingToolsDrawing() {
  return `
  <svg class="line-art" viewBox="0 0 420 420" fill="none" role="img" aria-label="Lijntekening van een passer en winkelhaak">
    <g style="stroke:${PAPER}" stroke-width="1.3">
      <line class="draw-path" data-order="0" x1="120" y1="360" x2="210" y2="60" />
      <line class="draw-path" data-order="1" x1="300" y1="360" x2="210" y2="60" />
      <circle cx="210" cy="60" r="5" style="fill:${PAPER}" stroke="none" />
      <path class="draw-path" data-order="2" d="M 150 300 A 90 90 0 0 1 270 300" />
    </g>
    <g style="stroke:${ACCENT_TINT}" stroke-width="1.5">
      <polyline class="draw-path" data-order="3" points="60,330 60,230 200,230" />
    </g>
    <g style="stroke:${LINE}" stroke-width="1" stroke-dasharray="2 6">
      <line class="draw-path" data-order="4" x1="40" y1="360" x2="380" y2="360" />
    </g>
    <g style="fill:${PAPER}; font-family:${MONO}" font-size="10">
      <text x="40" y="385" letter-spacing="1">SCHETS 01 · WINTER</text>
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

/** Locatiemarkering (Contact): kruispeiling met coördinaten van Heerhugowaard */
export function locationDrawing() {
  return `
  <svg class="line-art" viewBox="0 0 420 420" fill="none" role="img" aria-label="Locatiemarkering met coördinaten van Heerhugowaard">
    <g style="stroke:${LINE_FAINT}" stroke-width="1">
      <line x1="210" y1="0" x2="210" y2="420" />
      <line x1="0" y1="210" x2="420" y2="210" />
    </g>
    <g style="stroke:${ACCENT}" stroke-width="1.6">
      <circle class="draw-path" data-order="0" cx="210" cy="210" r="70" />
      <circle class="draw-path" data-order="1" cx="210" cy="210" r="4" style="fill:${ACCENT}" stroke="none" />
    </g>
    <g style="stroke:${PAPER}" stroke-width="1" stroke-dasharray="2 6">
      <circle class="draw-path" data-order="2" cx="210" cy="210" r="130" />
    </g>
    <g style="fill:${PAPER}; font-family:${MONO}" font-size="10" letter-spacing="1">
      <text x="226" y="150">N 52.668°</text>
      <text x="226" y="166">E 4.840°</text>
      <text x="20" y="404">HEERHUGOWAARD · NL</text>
    </g>
  </svg>`;
}
