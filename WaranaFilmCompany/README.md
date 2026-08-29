# /WaranaFilmCompany

A four-part proposal for Warana Film Company, built by Loek Luijbregts, August 2026.
Bilingual (English default, Dutch behind the toggle). Not indexed.

**Live:** https://loekluijbregts.com/WaranaFilmCompany/

| Path | What |
|---|---|
| `/WaranaFilmCompany/` | Overview — what this is and what was found in the slate |
| `/WaranaFilmCompany/pitch/` | The pitch page a financier would see |
| `/WaranaFilmCompany/brand/` | Brand book — colour, type, image rules, writing style |
| `/WaranaFilmCompany/social/` | Instagram grid, three stories, three LinkedIn posts |
| `/WaranaFilmCompany/funding/` | Eight funding sources and what each one requires |

## How it is built

Static HTML. No framework, no runtime dependencies, no build step on Netlify —
the five `index.html` files are committed as-is and served directly.

Each page exists **twice inside one file**: once in English, once in Dutch,
wrapped in `<div class="langblock" lang="en|nl">`. CSS hides one of the two.
The toggle in the top bar flips `data-lang` on `<html>`, remembers the choice in
`localStorage`, and honours `?lang=nl` in the URL. Without JavaScript the page
still renders — in English.

Both languages come from the same source, so they cannot drift apart.

## Changing the text

Never edit the `index.html` files by hand. Edit the source and regenerate:

```
_source/content/<page>.json     every string, as {"en": ..., "nl": ...}
_source/pages/<page>.html       the layout, with {{key}} placeholders
_source/pagecss/<page>.css      styling for that page only
_source/shared.css              styling shared by all five pages
```

Then, from the folder that contains `_source/`:

```bash
python3 _source/render.py            # rebuilds all five pages
python3 _source/render.py pitch      # rebuilds one
```

`render.py` writes the `index.html` files in place. Nothing else is needed —
Python 3 with the standard library only.

`_source/patches/` holds the copy-editing rounds (English and Dutch) that were
applied to the JSON, kept as a record of what changed and why.

## Before this ever goes public

Three things are deliberate and should not be changed without a reason:

1. **Every page carries `<meta name="robots" content="noindex, nofollow">`.**
   Bart's slate contains eight unannounced titles, an IP licence still under
   negotiation, and a project developed with a suicide-prevention foundation.
   The root `robots.txt` also needs `Disallow: /WaranaFilmCompany/`.
   These pages are **not** in `sitemap.xml`, and should stay out of it.

2. **Benedict Cumberbatch is not named anywhere.** The slate says
   "in co-production with SunnyMarch, London", and that is exactly what these
   pages say. SunnyMarch is publicly his company, but a company-level
   co-production is a different claim from an actor attaching himself to a film.

3. **The €20 million figure is a model, not Bart's number.** Both the pitch page
   and the funding page say so in as many words.

## Still to replace

The booking widget on the pitch page points at `https://zcal.co/waranafilm/…`,
which does not exist yet. Replace `ZBASE` in `_source/pagejs/pitch.js` with the
real calendar links (three of them, one per duration) and rebuild.
