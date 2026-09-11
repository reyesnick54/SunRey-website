"""Prepare the extracted figures for a black-ground site.

The diagrams are dark line art on white. Inverting them would destroy the
papers' own colour coding, so the site shows them on a light plate instead —
and the plate colour is multiplied into the artwork here, so the image and the
surface it sits on are the same colour and no seam or halo appears at the edge.
"""
from pathlib import Path
import json
from PIL import Image, ImageChops

PLATE = (247, 245, 241)     # --fig-plate
MAXW  = 1600
SRC   = Path('figures')
DST   = Path('web-figures')


def main():
    DST.mkdir(exist_ok=True)
    manifest = json.loads((SRC / 'manifest.json').read_text())
    out, total = {}, 0
    for paper, figs in manifest.items():
        rows = []
        for f in figs:
            im = Image.open(SRC / f['file']).convert('RGB')
            im = ImageChops.multiply(im, Image.new('RGB', im.size, PLATE))
            if im.width > MAXW:
                im = im.resize((MAXW, round(im.height * MAXW / im.width)), Image.LANCZOS)
            name = f['file'].replace('.png', '.webp')
            im.save(DST / name, 'WEBP', quality=86, method=6)
            kb = (DST / name).stat().st_size / 1024
            total += kb
            rows.append({**f, 'file': name, 'w': im.width, 'h': im.height,
                         'kb': round(kb, 1)})
        out[paper] = rows
    (DST / 'manifest.json').write_text(json.dumps(out, indent=1, ensure_ascii=False))
    n = sum(len(v) for v in out.values())
    print(f"{n} figures  {total/1024:.2f} MB total  (avg {total/max(n,1):.0f} KB)")


if __name__ == '__main__':
    main()
