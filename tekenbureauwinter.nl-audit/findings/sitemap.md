# Sitemap & robots.txt — Findings & Templates

**Current state:** `sitemap.xml` → 404, `robots.txt` → 404.

## `sitemap.xml` (place at repo root)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://tekenbureauwinter.nl/</loc><priority>1.0</priority></url>
  <url><loc>https://tekenbureauwinter.nl/diensten.html</loc><priority>0.9</priority></url>
  <url><loc>https://tekenbureauwinter.nl/pakketten.html</loc><priority>0.9</priority></url>
  <url><loc>https://tekenbureauwinter.nl/projecten.html</loc><priority>0.8</priority></url>
  <url><loc>https://tekenbureauwinter.nl/over-tekenbureau-winter.html</loc><priority>0.7</priority></url>
  <url><loc>https://tekenbureauwinter.nl/contact.html</loc><priority>0.7</priority></url>
</urlset>
```

## `robots.txt` (place at repo root)

```
User-agent: *
Allow: /

Sitemap: https://tekenbureauwinter.nl/sitemap.xml
```

> Tip: explicitly allow AI crawlers (GPTBot, PerplexityBot, ClaudeBot, Google-Extended) if you want AI-search visibility — by default they are allowed, so the simple version above is fine.

After deploying, submit the sitemap in Google Search Console.
