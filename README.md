# Tekenbureau Winter — website

Website van Tekenbureau Winter: een bouwkundig tekenbureau in Heerhugowaard.
De stijl is "architectuur tot leven" — getekende SVG-lijntekeningen
(plattegronden, doorsnedes, situatietekeningen), een blueprint-raster op de
achtergrond, en zelf-tekenende lijnen bij scroll.

## Tech stack

Een **statische site**: platte HTML, CSS en JavaScript. Geen build-stap, geen
npm, geen Vite. Je kunt de bestanden direct openen of op elke statische host
zetten.

- **HTML** — elke pagina is een eigen map met een `index.html`
- **CSS** — alles gebundeld in `css/styles.css` (custom properties voor
  kleuren/typografie/spacing)
- **JavaScript** — alle logica in één bestand `js/site.js` (klassiek script,
  geen modules)
- **GSAP + ScrollTrigger** — meegeleverd in `js/vendor/`, voor scroll-animaties
  en het "zelf tekenen" van de SVG-lijnen

## Lokaal bekijken

Dubbelklik gewoon op `index.html` — de hele site werkt zo, inclusief
navigatie tussen de pagina's. Elke pagina is een los `.html`-bestand in de
root:

- `index.html` — Home
- `diensten.html` — Diensten
- `projecten.html` — Projecten
- `over-tekenbureau-winter.html` — Over Tekenbureau Winter
- `pakketten.html` — Pakketten
- `contact.html` — Contact

Alle paden (links, logo, CSS, JS, afbeeldingen) zijn relatief, dus de site
werkt zowel bij dubbelklikken als op elke host, en ook in een submap (bv. een
GitHub Pages project-site op `username.github.io/repo-naam/`) zonder extra
configuratie.

## Deployen naar GitHub Pages

Er staat een workflow in `.github/workflows/deploy.yml` die bij elke push naar
`main` de repo-inhoud rechtstreeks publiceert (geen build-stap). **Eenmalig
instellen:** ga in de GitHub-repo naar **Settings → Pages → Build and
deployment → Source** en kies **"GitHub Actions"**.

Omdat het een statische site is, kun je 'm net zo goed op elke andere host
zetten (Netlify, Vercel, Cloudflare Pages, of zelfs gewoon de bestanden
uploaden via FTP) — sleep de map erin en klaar.

## Mappenstructuur

```
├── index.html                       Home
├── diensten.html
├── projecten.html
├── over-tekenbureau-winter.html
├── pakketten.html
├── contact.html
├── css/
│   └── styles.css                   Alle stijlen (tokens, base, layout,
│                                     components, animaties, pagina's)
├── js/
│   ├── site.js                      Alle logica: header/footer renderen,
│   │                                 mobiel menu, blueprint-raster, scroll-
│   │                                 reveal, SVG-lijntekeningen, contactform
│   └── vendor/
│       ├── gsap.min.js              GSAP (animatiebibliotheek)
│       └── ScrollTrigger.min.js     GSAP scroll-plugin
├── images/                          Afbeeldingen, logo en favicon
└── img/                             Originele bron-afbeeldingen (niet gebruikt
                                      op de site; archief)
```

## Inhoud & afbeeldingen

- Het logo (`images/logo.png`) wordt met een CSS-filter (`invert`)
  lichtgekleurd weergegeven op de donkere achtergrond.
- De accentkleur (`#4caac9`) is gesampled uit de echte theme-CSS van
  tekenbureauwinter.com.

## Het contactformulier

Het formulier in `js/site.js` valideert de velden en heeft een
honeypot-spambescherming, maar **verstuurt nog niets** — de verzending is
gesimuleerd. Koppel een echt eindpunt (bv. Formspree, Netlify Forms of een
eigen API) in `initContactForm()` om berichten daadwerkelijk te ontvangen.

## Toegankelijkheid

- Skip-link naar `#main-content` op elke pagina
- Semantische HTML (`header`, `main`, `nav`, `footer`, `address`, `figure`)
- `aria-current="page"` op de actieve navigatielink
- Focus states via `:focus-visible`
- Decoratieve SVG's hebben `aria-hidden`, illustratieve SVG's hebben
  `role="img"` + `aria-label`
- Reduced-motion: alle scroll- en lijnanimaties worden uitgeschakeld bij
  `prefers-reduced-motion: reduce`
