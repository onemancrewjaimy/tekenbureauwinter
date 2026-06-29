# SEO Audit — tekenbureauwinter.nl

**Audited:** 2026-06-29
**Method:** Direct source-code analysis (static site repo) + live HTTP header checks
**Pages analyzed:** 6 (index, diensten, projecten, over, pakketten, contact)
**Hosting:** GitHub Pages (Fastly CDN)
**Business type:** Local Service — Architectural drawing office (bouwkundig tekenbureau), Heerhugowaard NL

---

## Executive Summary

### Overall SEO Health Score: **54 / 100** — *Needs Work*

| Category | Weight | Score |
|---|---|---|
| Technical SEO | 22% | 55 |
| Content Quality | 23% | 60 |
| On-Page SEO | 20% | 65 |
| Schema / Structured Data | 10% | 5 |
| Performance (CWV, est.) | 10% | 80 |
| AI Search Readiness | 10% | 35 |
| Images | 5% | 70 |

The site is cleanly hand-built, mobile-friendly, fast, and has genuinely good fundamentals that most small sites get wrong: unique titles/descriptions per page, one `<h1>` per page, descriptive `alt` text everywhere, `width`/`height` on all images (no layout shift), and a solid no-JS/reduced-motion fallback. The ceiling on rankings right now is **discoverability and trust signals**, not craftsmanship.

The three things holding it back hardest:
1. **No sitemap.xml + navigation that only exists in JavaScript** — search engines and AI crawlers have a hard time discovering and linking your pages.
2. **Zero structured data** — for a local business this is the single biggest missed opportunity (LocalBusiness, Service, FAQ schema all absent).
3. **No social/sharing metadata** (Open Graph / Twitter cards) and **no canonical tags**.

### Top 5 Critical / High Issues
1. **No `sitemap.xml`** (404) — combined with JS-only internal links, page discovery is fragile.
2. **Internal navigation is injected by JavaScript only** — the static `<header>`/`<footer>` are empty; non-rendering crawlers (Bing, GPTBot, social scrapers) see no links between your pages.
3. **No structured data anywhere** — missing LocalBusiness, Service, BreadcrumbList, FAQPage schema.
4. **No canonical tags** on any page.
5. **No Open Graph / Twitter Card tags** — links shared on WhatsApp/LinkedIn/Facebook render with no title, image, or description.

### Top 5 Quick Wins
1. Add a `robots.txt` + `sitemap.xml` (6 static URLs — trivial). *(15 min)*
2. Add LocalBusiness JSON-LD with your NAP + geo coords (already known: 52.668°N, 4.840°E). *(30 min)*
3. Add Open Graph + Twitter tags + one OG image to all 6 pages. *(45 min)*
4. Add `<link rel="canonical">` to each page. *(15 min)*
5. Delete the unused `/img/` folder — **~27 MB** of oversized originals (incl. a 16 MB JPG) currently published to your live site. *(5 min)*

---

## 1. Technical SEO — Score 55

### What works
- **HTTPS** enforced; `http://` → `https://` is a 301. ✅
- **`www` → non-www** is a 301 redirect (canonical host consistent). ✅
- **CDN + caching**: served via Fastly with `Cache-Control: max-age=600`, ETag, gzip (`Vary: Accept-Encoding`). ✅
- **`lang="nl"`** and `<meta viewport>` on every page. ✅
- **Clean URLs**, flat structure, no parameters.

### Findings
| Severity | Issue | Detail |
|---|---|---|
| **High** | No `sitemap.xml` | Returns 404. Search engines must discover all pages via crawling — and your only internal links are JS-injected (see below). |
| **High** | Navigation links exist only in JavaScript | `index.html:23` and every page have an empty `<header id="site-header">` / `<footer>`. The nav + footer (and all internal links) are written by `js/site.js` at runtime (`renderHeader`/`renderFooter`). Googlebot renders JS and will find them, but Bingbot, GPTBot, PerplexityBot, and social/link scrapers often do **not** — to them, every page looks like an orphan with no outbound internal links. |
| **Medium** | No `robots.txt` | Returns 404. Not fatal (everything is crawlable by default), but you can't point to a sitemap or set crawl rules. |
| **Medium** | No `CNAME` file in repo | The custom domain works (configured in GitHub Pages settings), but without a `CNAME` file in the repo the custom-domain binding can be lost on certain redeploys. Recommend committing a `CNAME` file containing `tekenbureauwinter.nl`. |
| **Low** | No custom `404.html` | GitHub Pages serves a generic 404; a branded `404.html` with nav links recovers lost visitors. |
| **Low** | Deploy publishes the whole repo | `.github/workflows/deploy.yml` uploads `path: .` — meaning the `/img/` originals, README, and workflow are all published. See Images. |

---

## 2. Content Quality — Score 60

### What works
- Original, human-written Dutch copy with a clear value proposition ("modern, luxe én betaalbaar").
- A real **founder story** on the About page — good for E-E-A-T (experience signal).
- Consistent tone and clear service descriptions.

### Findings
| Severity | Issue | Detail |
|---|---|---|
| **High** | Weak authority (E-E-A-T) signals | The About page positions the owner as an *"afgestudeerde bouwkundige student"* still studying for the architect title. That honesty is fine, but there are **no reviews/testimonials, no completed-project case studies with results, no named author, no credentials/registrations**. For a service people pay €350–€1,850 for, trust signals are decisive. |
| **High** | Brand-name inconsistency | The About page twice calls the business **"Winter details"** (`over-tekenbureau-winter.html:67,71`) instead of "Tekenbureau Winter". Confuses both users and entity recognition. |
| **Medium** | Spelling errors in service names | `diensten.html`: **"Dakkappellen"** and **"dakappel"** (correct: *Dakkapellen* / *dakkapel*). These are core keywords — misspelling them costs rankings and trust. |
| **Medium** | Thin pages | `pakketten.html`, `contact.html`, and `projecten.html` are light on indexable text. Pakketten has an **empty description** paragraph on the "Vergunningsaanvraag" card (`pakketten.html:73`). |
| **Medium** | "Projecten" page shows no real projects | The gallery uses generic stock-style captions (Aanbouw, Opbouw…) rather than actual named projects with location/scope. Real local project pages ("Dakkapel in Heerhugowaard") would be strong local-SEO content. |
| **Low** | NAP/email domain mismatch | Email is `info@tekenbureauwinter.com` but the site/brand is `.nl`. Pick one and be consistent across site, GBP, and citations. |

---

## 3. On-Page SEO — Score 65

### What works
- **Unique, descriptive `<title>`** on every page (e.g. *"Diensten - Tekenbureau Winter"*, *"Over Tekenbureau Winter - Passie voor architectuur"*). ✅
- **Unique meta descriptions** on every page, mostly well-written and within length. ✅
- **Exactly one `<h1>` per page**, with a logical `h2`/`h3` hierarchy. ✅
- Good keyword presence: "bouwtekeningen", "aanbouw", "Heerhugowaard" appear naturally.

### Findings
| Severity | Issue | Detail |
|---|---|---|
| **High** | No Open Graph / Twitter Card tags | None of the 6 pages have `og:title`, `og:description`, `og:image`, or Twitter card tags. Links shared on WhatsApp (your own CTA channel!), LinkedIn, Facebook, and Instagram render bare. |
| **High** | No `rel="canonical"` | No page declares a canonical URL. Add self-referencing canonicals to pre-empt duplicate-URL issues (e.g. trailing-slash / index.html variants). |
| **Medium** | Local keywords underused in titles | Only the homepage leans on "Heerhugowaard". Service/package titles would benefit from geo-modifiers (e.g. *"Bouwtekening Aanbouw Heerhugowaard \| Tekenbureau Winter"*). |
| **Low** | No breadcrumbs | Adding visible breadcrumbs + `BreadcrumbList` schema would aid navigation and SERP appearance. |

---

## 4. Schema / Structured Data — Score 5

### Findings
| Severity | Issue | Detail |
|---|---|---|
| **High** | No structured data at all | Zero JSON-LD across the entire site. For a local service business this is the biggest single opportunity. |

**Recommended schema to add:**
- **`LocalBusiness`** (or `ProfessionalService` / `GeneralContractor`) on the homepage — name, address (Truus Schröderplantsoen 10, 1705 ND Heerhugowaard), phone, email, `geo` (52.668, 4.840), `areaServed`, `sameAs` (your LinkedIn/Instagram/Facebook), `priceRange`.
- **`Service`** on `diensten.html` for each service (Aanbouw, Opbouw, Dakkapel, Overkapping, Detaillering).
- **`Offer`/`PriceSpecification`** on `pakketten.html` (you already publish prices: €350 / €750 / €1.850).
- **`FAQPage`** — add an FAQ section (e.g. *"Wat kost een bouwtekening voor een dakkapel?"*, *"Heb ik een vergunning nodig?"*) for AI Overviews + rich results.
- **`BreadcrumbList`** site-wide.

A ready-to-paste `LocalBusiness` block is in `findings/schema.md`.

---

## 5. Performance (Core Web Vitals — lab estimate) — Score 80

> Field data (CrUX) and Lighthouse lab runs were unavailable in this environment (no Python/Playwright). The following is a static estimate based on payload and markup review.

### What works
- Lightweight static HTML, no framework, no build bloat.
- **All images have explicit `width`/`height`** → near-zero CLS. ✅
- `loading="lazy"` on below-the-fold images. ✅
- Scripts loaded at end of `<body>`; `preconnect` to Google Fonts; `display=swap`. ✅
- LCP element is likely the `<h1>` text (present in static HTML) — fast.

### Findings
| Severity | Issue | Detail |
|---|---|---|
| **Medium** | Three font families, many weights | Loading Poppins (4 weights) + Inter (3) + Space Mono (2) in one request. Subset/trim to the weights actually used; consider self-hosting to drop the Google Fonts round-trip. |
| **Low** | GSAP + ScrollTrigger (~70 KB) on every page | Only used for scroll reveals; fine, but `defer` the scripts and gate behind reduced-motion to save mobile CPU. |
| **Low** | Render-blocking font stylesheet | The Google Fonts `<link>` is in `<head>`; acceptable, but `media`-swap or `font-display` already mitigates FOIT. |

---

## 6. Images — Score 70

### What works
- **Descriptive, keyword-relevant `alt` text on every content image** — genuinely well done. ✅
- `width`/`height` + `loading="lazy"` everywhere. ✅
- SVG favicon. ✅

### Findings
| Severity | Issue | Detail |
|---|---|---|
| **High** | ~27 MB of unused images published to production | The `/img/` folder (capitalized originals: `Vergunningsaanvraag.jpg` = **16 MB**, `Detaillering.jpg` = **8.5 MB**, `Dakkapel.png` = 1.2 MB, etc.) is **not referenced by any page** but is deployed live (`deploy.yml` uploads `path: .`). Risk: accidental indexing, wasted bandwidth, repo bloat. **Delete `/img/` or exclude it from deploy.** The pages correctly use the optimized `/images/` folder. |
| **Medium** | No next-gen formats | All content images are JPG/PNG. Converting `/images/*.jpg` to WebP/AVIF would cut ~30–50% off the largest (portrait 249 KB, detaillering 183 KB). |
| **Low** | No `apple-touch-icon` / no OG image | Add a 180×180 `apple-touch-icon` and a 1200×630 social share image. |

---

## 7. AI Search Readiness (GEO) — Score 35

| Severity | Issue | Detail |
|---|---|---|
| **High** | No structured data → low AI citability | LLM search (AI Overviews, ChatGPT, Perplexity) leans heavily on schema + clear entity data. None present. |
| **Medium** | JS-only nav blocks AI crawlers | GPTBot/PerplexityBot/ClaudeBot largely don't execute JS — they see orphan pages with no internal links (same root cause as Technical #2). |
| **Medium** | No FAQ / Q&A content | Direct-answer content (costs, permit process, timelines) is what AI engines cite. None exists yet. |
| **Low** | No `llms.txt` | Optional, but a simple `llms.txt` summarizing services + NAP helps AI agents. |

---

## Local SEO Notes

This is a **local service business** and local SEO is where the fastest wins are:
- **Set up / claim a Google Business Profile** for Heerhugowaard — the single highest-ROI action for a local tekenbureau. The site currently shows no GBP linkage.
- **Add `LocalBusiness` schema** with consistent NAP (resolve the `.com`/`.nl` email mismatch first).
- **Build citations** (consistent NAP) on Dutch directories.
- **Embed a Google Map** + opening hours on the Contact page.
- **Create location/service-combo content** (e.g. "Dakkapel laten tekenen in Heerhugowaard") — currently absent.

---

## Methodology & Limitations
- Audit performed by reading the actual site source in the repository plus live HTTP header/status checks via `curl`.
- The skill's Python rendering/crawl scripts and Lighthouse/Playwright were **not run** — Python is not installed in this environment (only the Microsoft Store stub) and Playwright was unavailable. Core Web Vitals figures are therefore **lab estimates**, not field (CrUX) data.
- For real field CWV + indexation data, connect Google Search Console + PageSpeed Insights and re-run the `seo-google` agent.
