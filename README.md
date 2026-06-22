# Tekenbureau Winter — redesign

Volledige redesign van de website van Tekenbureau Winter: een bouwkundig
tekenbureau in Heerhugowaard. De stijl is "architectuur tot leven" —
getekende SVG-lijntekeningen (plattegronden, doorsnedes, situatietekeningen),
een blueprint-raster op de achtergrond, en zelf-tekenende lijnen bij scroll.

## Tech stack

- **Vite** — build tool, vanilla JavaScript (geen framework)
- **Plain CSS** met custom properties voor kleuren/spacing (`src/styles/tokens.css`)
- **GSAP + ScrollTrigger** voor scroll-animaties en het "zelf tekenen" van SVG-lijnen
- Meerdere pagina's, elk een eigen map met `index.html`, gedeelde header/footer via
  JS-partials (`src/js/partials.js`)

## Installatie

Vereist: [Node.js](https://nodejs.org/) 18 of hoger (inclusief npm). Dit was op
de machine waarop dit project is opgezet nog niet geïnstalleerd — installeer
Node.js eerst als `npm` onbekend is in je terminal.

```bash
npm install
```

## Ontwikkelen

```bash
npm run dev
```

Start de Vite dev server (standaard op `http://localhost:5173`). Alle zes
pagina's zijn bereikbaar:

- `/` — Home
- `/diensten/` — Diensten
- `/projecten/` — Projecten
- `/over-tekenbureau-winter/` — Over Tekenbureau Winter
- `/pakketen/` — Pakketen
- `/contact/` — Contact

## Bouwen voor productie

```bash
npm run build
```

De output komt in `dist/`. Test de build lokaal met:

```bash
npm run preview
```

> **Hosting-tip:** elke route is een map met een eigen `index.html` (bv.
> `dist/diensten/index.html`). De meeste static hosts (Netlify, Vercel,
> Cloudflare Pages) serveren dat automatisch op `/diensten/` zonder verdere
> configuratie. Wil je dat `/diensten` (zonder slash) ook werkt, stel dan op
> je hostingplatform een trailing-slash-redirect in.

## Mappenstructuur

```
├── index.html                       Home
├── diensten/index.html
├── projecten/index.html
├── over-tekenbureau-winter/index.html
├── pakketen/index.html
├── contact/index.html
├── public/
│   └── images/
│       ├── logo.png                 Logo (van de live site)
│       └── favicon.svg
└── src/
    ├── main.js                      Gedeelde bootstrap: importeert CSS,
    │                                 rendert header/footer, start nav,
    │                                 blueprint-raster, scroll-reveal en
    │                                 het contactformulier
    ├── pages/                       Eén klein module per pagina, alleen
    │   ├── home.js                   verantwoordelijk voor het inladen van
    │   ├── diensten.js                de paginaspecifieke lijntekening
    │   ├── projecten.js
    │   ├── over.js
    │   ├── pakketen.js
    │   └── contact.js
    ├── js/
    │   ├── partials.js               Header- en footer-HTML (gedeeld)
    │   ├── nav.js                    Mobiel menu
    │   ├── blueprint-grid.js         Vast achtergrondraster + parallax
    │   ├── scroll-reveal.js          GSAP ScrollTrigger: reveal + SVG-draw
    │   ├── contact-form.js           Validatie + honeypot-spambescherming
    │   └── svg-art.js                Alle getekende illustraties (plattegrond,
    │                                 doorsnede, situatietekening, ...)
    └── styles/
        ├── tokens.css                Kleuren, typografie, spacing (CSS custom properties)
        ├── base.css                  Reset + toegankelijkheid (skip link, focus states)
        ├── layout.css                Header, footer, grids, blueprint-raster
        ├── components.css            Knoppen, kaarten, formulier, maatlijnen
        ├── animations.css            Initiële staten voor scroll-reveal
        └── pages.css                 Hero, page-header, split, gallery, CTA-band
```

## Inhoud & afbeeldingen

- Alle teksten zijn letterlijk overgenomen uit de opdracht.
- Foto's zijn vervangen door placeholders met een 4:3-verhouding
  (`.photo-placeholder`). Zoek in de HTML naar `<!-- TODO: vervang door ... -->`
  om te zien waar een echte foto moet komen.
- Het logo (`public/images/logo.png`) is van de live site overgenomen en wordt
  met een CSS-filter (`invert`) lichtgekleurd weergegeven op de donkere
  achtergrond.
- De accentkleur (`#4caac9`) is gesampled uit de echte theme-CSS van
  tekenbureauwinter.com (JouwWeb-template).

## Toegankelijkheid

- Skip-link naar `#main-content` op elke pagina
- Semantische HTML (`header`, `main`, `nav`, `footer`, `address`, `figure`)
- `aria-current="page"` op de actieve navigatielink
- Focus states via `:focus-visible`
- Decoratieve SVG's hebben `aria-hidden`, illustratieve SVG's hebben `role="img"` + `aria-label`
- Reduced-motion: alle scroll- en lijnanimaties worden uitgeschakeld bij
  `prefers-reduced-motion: reduce`
