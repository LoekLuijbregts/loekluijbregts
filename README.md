# loekluijbregts.com

Personal brand site for Loek Luijbregts — growth partner and pacer for founders and leaders. Cycling marketing execution lives on the business site (Cycling Incubators).

**Live site:** [loekluijbregts.com](https://loekluijbregts.com)  
**Business site:** [cyclingincubators.com](https://cyclingincubators.com)  
**Contact:** loek@cyclingincubators.com

---

## What this site is

This is a bilingual personal introduction — the person behind Cycling Incubators B.V. Dutch is the default language; `/en/` is the English homepage. It answers three questions:

1. Who is Loek Luijbregts?
2. What has he actually done?
3. Is working together worth a 30-minute conversation?

It is intentionally separate from the business site. This site introduces Loek's cross-industry Outside-In work, directie- en teamsessies, The Pacer and his practical DIY library. Cycling Incubators remains the specialist practice for cycling, outdoor and destination assignments.

---

## Site structure

Static HTML and CSS — no build tools or JavaScript dependencies.

```
loekluijbregts/
├── index.html          ← Dutch homepage (default, with ScoreApp as first step)
├── en/index.html       ← English homepage
├── assets/site.css     ← shared homepage design system
├── guidance.html       ← The Pacer (EN) — served at /guidance
├── begeleiding.html    ← The Pacer (NL) — served at /begeleiding
├── diy/                ← Dutch DIY, article and case-study library
├── */index.html        ← individual essays and case studies
├── images/             ← site images (extracted from former inline base64)
├── sitemap.xml         ← all indexable pages
├── robots.txt
├── _redirects          ← Netlify routes (incl. /guidance, /begeleiding)
└── *.md                ← long-form source/reference content
```

Deployed via [Netlify](https://netlify.com). Custom domain managed via Netlify DNS.

---

## Deployment

This repo is connected to Netlify with auto-deploy on push to `main`.

To update the site:
1. Edit the relevant HTML file and, for shared homepage styling, `assets/site.css`
2. Commit and push to `main`
3. Netlify auto-deploys within ~60 seconds

---

## Design

- **Typography:** Fraunces (display, serif) + DM Sans (body) + DM Mono (labels)
- **Palette:** Cream `#f8f5f0` · Ink `#1c1814` · Orange `#d94f0a`
- **Philosophy:** Authentic over polished. iPhone-first production. Earned, not bought.
- **Photos:** Real project evidence and one restrained personal portrait; cycling imagery is used as proof, not as the default identity cue

---

## About Loek

Loek Luijbregts is a strategic Outside-In partner and the founder of Cycling Incubators B.V., based in Tilburg, Netherlands. He helps founders and leadership teams reveal overlooked value, choose what deserves attention and turn that choice into clearer positioning, trusted stories and focused movement. Cycling and destination work provide specialist proof, not the boundary of his role.

→ Full profile: [loekluijbregts.md](./loekluijbregts.md)
