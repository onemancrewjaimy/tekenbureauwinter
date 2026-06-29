# Action Plan — tekenbureauwinter.nl

Prioritized by impact ÷ effort. Health score today: **54/100**. Phases 1–2 alone should lift it toward ~75.

> ⚠️ Your deploy uploads the whole repo (`deploy.yml` → `path: .`). Anything you add to the repo root goes live, so place files thoughtfully (e.g. `robots.txt`, `sitemap.xml`, `CNAME` belong at the root; the audit folder does not).

---

## Phase 1 — Critical Fixes (Week 1)

- [ ] **Add `sitemap.xml`** at repo root listing all 6 URLs. *(15 min)* — see template in `findings/sitemap.md`.
- [ ] **Add `robots.txt`** at repo root with `Sitemap: https://tekenbureauwinter.nl/sitemap.xml`. *(5 min)*
- [ ] **Render nav/footer into static HTML** (or add a `<noscript>` block with the same links). The simplest robust fix: bake the header/footer markup directly into each `.html` instead of injecting via `js/site.js`, so every crawler sees your internal links. *(2–3 hrs)*
- [ ] **Add `LocalBusiness` JSON-LD** to `index.html`. *(30 min)* — paste-ready block in `findings/schema.md`.
- [ ] **Delete the unused `/img/` folder** (~27 MB of oversized originals, incl. a 16 MB JPG) so it stops shipping to production. *(5 min)*
- [ ] **Commit a `CNAME` file** containing `tekenbureauwinter.nl` to protect the custom-domain binding. *(2 min)*

## Phase 2 — High-Impact Improvements (Weeks 2–3)

- [ ] **Add Open Graph + Twitter Card tags** to all 6 pages, plus one 1200×630 OG image. *(45 min)*
- [ ] **Add self-referencing `<link rel="canonical">`** to each page. *(15 min)*
- [ ] **Fix content errors:** "Winter details" → "Tekenbureau Winter" (`over-...html:67,71`); "Dakkappellen"/"dakappel" → "Dakkapellen"/"dakkapel" (`diensten.html`); fill the empty Vergunningsaanvraag description (`pakketten.html:73`). *(20 min)*
- [ ] **Set up / claim Google Business Profile** for Heerhugowaard (highest local-SEO ROI). *(1 hr)*
- [ ] **Resolve email domain mismatch** (`.com` vs `.nl`) consistently across site + GBP. *(10 min)*
- [ ] **Add `Service` + `Offer` schema** to `diensten.html` and `pakketten.html`. *(45 min)*

## Phase 3 — Content & Authority (Month 2)

- [ ] **Add real reviews/testimonials** (and `Review`/`AggregateRating` schema once you have GBP reviews).
- [ ] **Turn the projects gallery into real case studies** with location + scope ("Dakkapel in Heerhugowaard", before/after, what was delivered).
- [ ] **Add an FAQ section** (costs, permit need, timelines) + `FAQPage` schema — strong for AI Overviews.
- [ ] **Add geo-modified service content** ("Bouwtekening aanbouw Heerhugowaard", surrounding towns).
- [ ] **Convert `/images/*.jpg` to WebP/AVIF**; add `apple-touch-icon`.
- [ ] **Add a branded `404.html`** with navigation.
- [ ] **Trim/self-host fonts** (drop unused weights).

## Phase 4 — Monitoring & Iteration (Ongoing)

- [ ] **Connect Google Search Console**; submit the sitemap; track indexation + queries.
- [ ] **Connect PageSpeed Insights / CrUX** for real Core Web Vitals field data.
- [ ] **Monitor GBP** reviews + insights; reply to reviews.
- [ ] **Build Dutch citations** (consistent NAP) on local directories.
- [ ] **Re-audit quarterly** and after major changes (a drift baseline can automate this).

---

### Effort vs. Impact snapshot
| Action | Effort | Impact |
|---|---|---|
| sitemap.xml + robots.txt | XS | High |
| Static (non-JS) internal nav | M | High |
| LocalBusiness schema | S | High |
| Google Business Profile | S | Very High (local) |
| OG/Twitter tags + image | S | Medium-High |
| Delete /img/ bloat | XS | Medium |
| Canonicals | XS | Medium |
| Reviews / case studies | L | High |
