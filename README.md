# loekluijbregts.com

Personal brand site for Loek Luijbregts — growth partner and pacer for founders and leaders. Cycling marketing execution lives on the business site (Cycling Incubators).

**Live site:** [loekluijbregts.com](https://loekluijbregts.com)  
**Business site:** [cyclingincubators.com](https://cyclingincubators.com)  
**Contact:** loek@cyclingincubators.com

---

## What this site is

This is a personal introduction — the person behind Cycling Incubators B.V. It answers three questions:

1. Who is Loek Luijbregts?
2. What has he actually done?
3. Is working together worth a 30-minute conversation?

It is intentionally separate from the business site. The two sites alternate stories: this one is personal, rider-led, and honest. The business site handles services, pricing, and conversion.

---

## Site structure

Single HTML file — no build tools, no dependencies, no separate CSS or JS.

```
loekluijbregts/
├── index.html          ← homepage (growth partner positioning, routes to The Pacer & Cycling Incubators)
├── guidance.html       ← The Pacer (EN) — served at /guidance
├── begeleiding.html    ← The Pacer (NL) — served at /begeleiding
├── writing/            ← essay & case study index
├── */index.html        ← individual essays and case studies
├── images/             ← site images (extracted from former inline base64)
├── sitemap.xml         ← all 17 pages
├── robots.txt
├── _redirects          ← Netlify routes (incl. /guidance, /begeleiding)
└── *.md                ← long-form source/reference content
```

Deployed via [Netlify](https://netlify.com). Custom domain managed via Netlify DNS.

---

## Deployment

This repo is connected to Netlify with auto-deploy on push to `main`.

To update the site:
1. Edit `index.html`
2. Commit and push to `main`
3. Netlify auto-deploys within ~60 seconds

---

## Design

- **Typography:** Fraunces (display, serif) + DM Sans (body) + DM Mono (labels)
- **Palette:** Cream `#f8f5f0` · Ink `#1c1814` · Orange `#d94f0a`
- **Philosophy:** Authentic over polished. iPhone-first production. Earned, not bought.
- **Photos:** Morocco gravel trip, photographed by Youri Zwart

---

## About Loek

Loek Luijbregts is the founder of Cycling Incubators B.V., based in Noord-Brabant, Netherlands. He helps cycling brands, destinations, and tourism boards grow through rider-first earned media — without ad spend.

Nine years in the field. 30+ clients across Europe, Africa, and the USA. 110M+ earned views.

→ Full profile: [loekluijbregts.md](./loekluijbregts.md)
