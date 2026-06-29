# Schema / Structured Data — Findings & Generated Markup

**Current state:** No JSON-LD or any structured data on any of the 6 pages.

## Paste-ready: LocalBusiness (add to `<head>` of `index.html`)

> Verify the email (`.com` vs `.nl`) and opening hours before publishing. KVK and geo coords taken from the existing site.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Tekenbureau Winter",
  "description": "Bouwkundig tekenbureau voor aanbouw, opbouw, overkappingen, dakkapellen en detaillering in Heerhugowaard — voor particulieren en bouwbedrijven.",
  "url": "https://tekenbureauwinter.nl/",
  "image": "https://tekenbureauwinter.nl/images/logo.png",
  "logo": "https://tekenbureauwinter.nl/images/logo.png",
  "telephone": "+31681656361",
  "email": "info@tekenbureauwinter.nl",
  "priceRange": "€€",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Truus Schröderplantsoen 10",
    "postalCode": "1705 ND",
    "addressLocality": "Heerhugowaard",
    "addressCountry": "NL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 52.668,
    "longitude": 4.840
  },
  "areaServed": { "@type": "City", "name": "Heerhugowaard" },
  "sameAs": [
    "https://www.linkedin.com/",
    "https://instagram.com/tekenbureau_winter/",
    "https://facebook.com/profile.php?id=61588136734913"
  ],
  "founder": { "@type": "Person", "name": "Winter" },
  "vatID": "",
  "identifier": { "@type": "PropertyValue", "name": "KVK", "value": "99705559" }
}
</script>
```

## Paste-ready: Service + Offers (add to `pakketten.html`)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Bouwkundig tekenwerk",
  "provider": { "@type": "ProfessionalService", "name": "Tekenbureau Winter" },
  "areaServed": "Heerhugowaard",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Pakketten",
    "itemListElement": [
      { "@type": "Offer", "name": "Basis Pakket", "price": "350", "priceCurrency": "EUR",
        "description": "2D plattegronden (bestaand en nieuw)" },
      { "@type": "Offer", "name": "Vergunningsaanvraag", "price": "750", "priceCurrency": "EUR",
        "description": "Volledige set tekeningen voor een omgevingsvergunning, incl. één revisieronde" },
      { "@type": "Offer", "name": "Het Totaalpakket", "price": "1850", "priceCurrency": "EUR",
        "description": "Vergunningspakket + werktekeningen + lichtplan + 3 luxe 3D-renders" }
    ]
  }
}
</script>
```

## Also recommended
- **FAQPage** schema on a new FAQ section (costs, permit requirement, timelines) — strong for AI Overviews.
- **BreadcrumbList** site-wide.
- **Review / AggregateRating** once Google Business Profile reviews exist.

Validate everything at https://validator.schema.org and Google's Rich Results Test before deploy.
