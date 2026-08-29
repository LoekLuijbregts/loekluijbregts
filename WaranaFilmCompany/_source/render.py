#!/usr/bin/env python3
"""
Statische tweetalige generator voor /WaranaFilmCompany op loekluijbregts.com.

  _source/content/<slug>.json   alle tekst, per sleutel {"en": ..., "nl": ...}
  _source/pages/<slug>.html     de opmaak van die pagina, met {{sleutel}} erin
  _source/pagecss/<slug>.css    opmaak die alleen deze pagina nodig heeft (optioneel)
  _source/shared.css            de gedeelde opmaak

Elke pagina wordt twee keer gerenderd — Engels en Nederlands — en allebei in de
uitvoer gezet. De taalknop laat er één zien. Eén bron, twee talen, geen drift.

  python3 _source/render.py        bouwt alles naar /WaranaFilmCompany/
"""
import html
import json
import os
import re
import shutil
import sys

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(BASE, '_source')
OUT = BASE

# slug -> (mapnaam onder /WaranaFilmCompany/, navlabel-sleutel)
PAGES = [
    ('index',   '',        'nav_overview'),
    ('pitch',   'pitch',   'nav_pitch'),
    ('brand',   'brand',   'nav_brand'),
    ('social',  'social',  'nav_social'),
    ('funding', 'funding', 'nav_funding'),
]

FONTS = ('https://fonts.googleapis.com/css2?'
         'family=Archivo:wght@400;500;600;700&'
         'family=Instrument+Serif:ital@0;1&display=swap')


def load(slug):
    """Paginateksten, aangevuld met de gedeelde sleutels uit _common.json."""
    with open(os.path.join(SRC, 'content', '_common.json'), encoding='utf-8') as f:
        data = json.load(f)
    with open(os.path.join(SRC, 'content', slug + '.json'), encoding='utf-8') as f:
        data.update(json.load(f))
    return data


def pick(node, lang):
    """Haal de taalvariant uit een {en,nl}-paar; laat andere waarden met rust."""
    if isinstance(node, dict) and 'en' in node and 'nl' in node:
        return node[lang]
    return node


def deep(node, lang):
    if isinstance(node, dict):
        if 'en' in node and 'nl' in node and len(node) == 2:
            return node[lang]
        return {k: deep(v, lang) for k, v in node.items()}
    if isinstance(node, list):
        return [deep(v, lang) for v in node]
    return node


# --------------------------------------------------------------- blokken
def block_slate(items, lang, root):
    out = []
    for p in items:
        out.append(f'''<article class="card" data-s="{p['status']}">
  <div class="card-img"><img src="{root}/img/{p['img']}.jpg" alt="{html.escape(p['alt'])}">
    <span class="card-accent" style="background:{p['colour']}"></span></div>
  <div class="card-body">
    <span class="kind">{p['kind']}</span>
    <h3>{p['title']}</h3>
    <p class="log">{p['logline']}</p>
    <div class="foot"><span class="status s-{p['status']}">{p['statusLabel']}</span></div>
    <p class="cmp">{p['meta']}</p>
  </div>
</article>''')
    return '\n'.join(out)


def block_bars(items, lang, root):
    mx = max(i['value'] for i in items)
    tone = {1: 'var(--t1)', 2: 'var(--t2)', 3: 'var(--t3)'}
    out = []
    for i, f in enumerate(items):
        val = f'{f["value"]:.1f}'.replace('.', ',' if lang == 'nl' else '.')
        unit = 'mln' if lang == 'nl' else 'm'
        out.append(f'''<div class="bar-row" tabindex="0">
  <div class="bar-top"><span class="bar-name">{f['name']}</span>
    <span class="bar-val tnum">&euro;{val} {unit}</span></div>
  <div class="track"><div class="fill" style="width:{f['value']/mx*100:.1f}%;background:{tone[f['tier']]};animation-delay:{i*70}ms"></div></div>
  <p class="bar-note">{f['note']}</p>
</div>''')
    return '\n'.join(out)


def block_funding(items, lang, root):
    out = []
    for f in items:
        out.append(f'''<div class="fin t{f['tier']}">
  <div class="top"><h4>{f['name']}</h4><span class="tier">{f['tierLabel']}</span></div>
  <p>{f['what']}</p>
  <p class="need"><b>{f['needLabel']}</b> {f['need']}</p>
</div>''')
    return '\n'.join(out)


def block_swatches(items, lang, root):
    out = []
    for s in items:
        out.append(f'''<div class="sw"><div class="chipc" style="background:{s['hex']}"></div>
  <div class="meta"><b>{s['name']}</b><code>{s['hex']}</code><span>{s['use']}</span></div></div>''')
    return '\n'.join(out)


def block_ba(items, lang, root):
    out = []
    for b in items:
        out.append(f'''<div class="ba">
  <div><span class="tag t-old">{b['oldLabel']}</span><q>{b['old']}</q></div>
  <div><span class="tag t-new">{b['newLabel']}</span><q>{b['new']}</q></div>
</div>''')
    return '\n'.join(out)


def block_posts(items, lang, root):
    out = []
    for p in items:
        body = '\n'.join(f'<p>{par}</p>' for par in p['body'])
        out.append(f'''<div class="li">
  <div class="li-head"><b>{p['head']}</b><span>{p['meta']}</span></div>
  <div class="li-body">{body}</div>
  <div class="li-foot">{p['foot']}</div>
</div>''')
    return '\n'.join(out)


def block_hubcards(items, lang, root):
    out = []
    for c in items:
        out.append(f'''<a class="hubcard" href="{root}/{c['href']}">
  <span class="n">{c['n']}</span>
  <h3>{c['title']}</h3>
  <p>{c['text']}</p>
  <span class="go">{c['go']} &rarr;</span>
</a>''')
    return '\n'.join(out)


def block_bookcfg(data, lang, root):
    """Instellingen voor de gespreksplanner, per taal, als JSON in een attribuut."""
    cfg = {'lang': lang, 'types': data['b_types'], 'days': data['b_days'],
           'months': data['b_months'], 'tz': data['b_tz'], 'tzFallback': data['b_tz_fallback'],
           'min': data['b_min'], 'minutes': data['b_minutes']}
    return html.escape(json.dumps(cfg, ensure_ascii=False), quote=True)


def block_feed(items, lang, root):
    out = []
    for i, t in enumerate(items, 1):
        num = f'<span class="num">{i}</span>'
        if t['type'] == 'img':
            out.append(f'<div class="tile">{num}'
                       f'<img src="{root}/img/{t["img"]}.jpg" alt="{html.escape(t["alt"])}"></div>')
        elif t['type'] == 'quote':
            out.append(f'<div class="tile card c-{t["tone"]}">{num}'
                       f'<div><p>{t["text"]}</p><cite>{t["cite"]}</cite></div></div>')
        else:
            out.append(f'<div class="tile card c-{t["tone"]}">{num}'
                       f'<img class="tilelogo" src="{root}/img/warana-logo.svg"'
                       f' alt="Warana Film Company"></div>')
    return '\n'.join(out)


def block_stories(items, lang, root):
    out = []
    for s in items:
        prog = ''.join('<i class="on"></i>' if k == s['n'] else '<i></i>' for k in range(3))
        sticker = (f'<span class="sticker">{s["stickerText"]} &nbsp;&rarr;</span>'
                   if s.get('sticker') else '')
        out.append(
            '<div>\n  <div class="story">\n'
            f'    <img src="{root}/img/{s["img"]}.jpg" alt="{html.escape(s["alt"])}">\n'
            '    <div class="veil"></div>\n    <div class="inner">\n'
            f'      <div class="prog">{prog}</div>\n      <div>\n'
            f'        <p class="txt">{s["txt"]}</p>\n'
            f'        <p class="sub">{s["sub"]}</p>\n        {sticker}\n'
            '      </div>\n    </div>\n  </div>\n'
            f'  <p class="story-note"><b>{s["noteH"]}</b>{s["note"]}</p>\n</div>')
    return '\n'.join(out)


def block_qa(items, lang, root):
    out = []
    for q in items:
        out.append(f'<div class="qa"><h4>{q["h"]}</h4><p>{q["p"]}</p></div>')
    return '\n'.join(out)


def block_socialconcepts(items, lang, root):
    out = []
    for i, item in enumerate(items, 1):
        src = f'{root}/img/social/{item["file"]}'
        out.append(f'''<a class="social-concept" href="{src}" target="_blank" rel="noopener">
  <img src="{src}" alt="{html.escape(item["alt"])}" loading="lazy">
  <span>{i:02d}</span>
</a>''')
    return '\n'.join(out)


BLOCKS = {'slate': block_slate, 'bars': block_bars, 'funding': block_funding,
          'swatches': block_swatches, 'ba': block_ba, 'posts': block_posts,
          'hubcards': block_hubcards, 'qa': block_qa, 'bookcfg': block_bookcfg,
          'feed': block_feed, 'stories': block_stories,
          'socialconcepts': block_socialconcepts}


# --------------------------------------------------------------- render
def render_body(tpl, data, lang, root):
    d = deep(data, lang)

    def sub(m):
        key = m.group(1)
        if key == 'ROOT':
            return root
        if key.startswith('#'):
            name = key[1:]
            kind, _, listkey = name.partition(':')
            if kind == 'bookcfg':
                return BLOCKS[kind](d, lang, root)
            return BLOCKS[kind](d[listkey or kind], lang, root)
        val = d
        for part in key.split('.'):
            val = val[part]
        if isinstance(val, list):
            return '\n'.join(val)
        return str(val)

    return re.sub(r'\{\{([#A-Za-z0-9_.:]+)\}\}', sub, tpl)


def chrome(data, slug, root):
    """Bovenbalk van Loek + sectienavigatie. Staat buiten de taalblokken."""
    def bi(key):
        n = data[key]
        return (f'<span class="langblock" lang="en">{n["en"]}</span>'
                f'<span class="langblock" lang="nl">{n["nl"]}</span>')

    nav = []
    for s, folder, navkey in PAGES:
        href = f'{root}/' if folder == '' else f'{root}/{folder}/'
        cur = ' aria-current="page"' if s == slug else ''
        nav.append(f'<a href="{href}"{cur}>{bi(navkey)}</a>')
    return f'''<div class="chrome">
  <div class="chrome-in">
    <a class="home" href="/">&larr;&nbsp; Loek Luijbregts</a>
    <span class="crumb">{bi('crumb')} &middot; <b>Warana Film Company</b></span>
    <div class="langtoggle" role="group" aria-label="Language">
      <button type="button" data-set="en" aria-pressed="true">EN</button>
      <button type="button" data-set="nl" aria-pressed="false">NL</button>
    </div>
  </div>
</div>
<nav class="subnav" aria-label="{data['nav_label']['en']}">
  <div class="subnav-in">{''.join(nav)}</div>
</nav>'''


TOGGLE_JS = '''
(function(){
  var r=document.documentElement, KEY='warana-lang';
  function set(l,save){
    r.dataset.lang=l; r.setAttribute('lang',l);
    document.querySelectorAll('.langtoggle button').forEach(function(b){
      b.setAttribute('aria-pressed', String(b.dataset.set===l));
    });
    var t=document.querySelector('title[data-'+l+']');
    if(t) document.title=t.getAttribute('data-'+l);
    if(save){ try{ localStorage.setItem(KEY,l); }catch(e){} }
  }
  var q=new URLSearchParams(location.search).get('lang');
  var saved=null; try{ saved=localStorage.getItem(KEY); }catch(e){}
  set(q==='nl'||q==='en' ? q : (saved==='nl'||saved==='en' ? saved : 'en'), false);
  document.addEventListener('click', function(e){
    var b=e.target.closest('.langtoggle button'); if(!b) return;
    set(b.dataset.set,true);
  });
})();
'''


def build_page(slug, folder, css_shared):
    data = load(slug)
    tpl_path = os.path.join(SRC, 'pages', slug + '.html')
    with open(tpl_path, encoding='utf-8') as f:
        tpl = f.read()
    page_css = ''
    p = os.path.join(SRC, 'pagecss', slug + '.css')
    if os.path.exists(p):
        with open(p, encoding='utf-8') as f:
            page_css = f.read()
    extra = ''
    p = os.path.join(SRC, 'pagejs', slug + '.js')
    if os.path.exists(p):
        with open(p, encoding='utf-8') as f:
            extra = f.read()

    root = '..' if folder else '.'
    bodies = []
    for lang in ('en', 'nl'):
        bodies.append(f'<div class="langblock" lang="{lang}">\n'
                      + render_body(tpl, data, lang, root) + '\n</div>')

    meta = data['meta']
    doc = f'''<!DOCTYPE html>
<html lang="en" data-lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title data-en="{html.escape(meta['title']['en'])}" data-nl="{html.escape(meta['title']['nl'])}">{html.escape(meta['title']['en'])}</title>
<meta name="description" content="{html.escape(meta['description']['en'])}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#101B2B">
<meta property="og:title" content="{html.escape(meta['title']['en'])}">
<meta property="og:description" content="{html.escape(meta['description']['en'])}">
<meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{FONTS}">
<style>
{css_shared}
{page_css}</style>
</head>
<body>
{chrome(data, slug, root)}
{chr(10).join(bodies)}
<script>{TOGGLE_JS}{extra}</script>
</body>
</html>
'''
    dest = os.path.join(OUT, folder) if folder else OUT
    os.makedirs(dest, exist_ok=True)
    with open(os.path.join(dest, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(doc)
    kb = os.path.getsize(os.path.join(dest, 'index.html')) // 1024
    print(f'  /WaranaFilmCompany/{folder + "/" if folder else ""}  {kb} KB')


def main():
    with open(os.path.join(SRC, 'shared.css'), encoding='utf-8') as f:
        css_shared = f.read()
    only = sys.argv[1:] or None
    print('Bouwen:')
    for slug, folder, _ in PAGES:
        if only and slug not in only:
            continue
        build_page(slug, folder, css_shared)
    print('Klaar.')


if __name__ == '__main__':
    main()
