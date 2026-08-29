#!/usr/bin/env python3
"""Past taalcorrecties toe op de content-JSON's.

Elke correctie is {"file": ..., "path": ..., "new": ...} en raakt alleen
de opgegeven taalkant. Paden lopen door taalparen heen: als een knoop
{"en":..., "nl":...} is, duikt de resolver eerst in de juiste taal.
"""
import json
import os
import sys

SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'content')


def is_pair(node):
    return isinstance(node, dict) and set(node.keys()) == {'en', 'nl'}


def resolve(node, parts, lang):
    for p in parts[:-1]:
        if is_pair(node):
            node = node[lang]
        node = node[int(p)] if isinstance(node, list) else node[p]
    if is_pair(node):
        node = node[lang]
    return node, parts[-1]


def apply(patchfile, lang):
    with open(patchfile, encoding='utf-8') as f:
        patches = json.load(f)
    cache, done, failed = {}, 0, []
    for p in patches:
        fn = p['file']
        if fn not in cache:
            with open(os.path.join(SRC, fn), encoding='utf-8') as f:
                cache[fn] = json.load(f)
        try:
            node, last = resolve(cache[fn], p['path'].split('.'), lang)
            if isinstance(node, list):
                i = int(last)
                if is_pair(node[i]):
                    node[i][lang] = p['new']
                else:
                    node[i] = p['new']
            else:
                if is_pair(node.get(last)):
                    node[last][lang] = p['new']
                else:
                    if last not in node:
                        raise KeyError(last)
                    node[last] = p['new']
            done += 1
        except Exception as e:
            failed.append(f"{fn} :: {p['path']} :: {type(e).__name__} {e}")
    for fn, data in cache.items():
        with open(os.path.join(SRC, fn), 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.write('\n')
    print(f'{lang}: {done} toegepast, {len(failed)} mislukt')
    for x in failed:
        print('   MISLUKT', x)
    return len(failed)


if __name__ == '__main__':
    sys.exit(1 if apply(sys.argv[1], sys.argv[2]) else 0)
