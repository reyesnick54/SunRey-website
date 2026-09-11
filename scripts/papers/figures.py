"""Extract the figures from the supplied white-paper PDFs.

Text extraction cannot recover a diagram: the boxes are vector paths and the
labels are loose text runs. So we do not try. Each figure is located by its own
`Figure N.` caption, bounded by the graphics above that caption, and re-rendered
from the PDF at 220 dpi. The result is the paper's real diagram, not a redrawing.

Three papers (04, 05, 07) carry no figures at all — they argue in tables — and
this script reports zero for them, which is correct.
"""
import json, re, subprocess
from pathlib import Path
import pymupdf

CAP   = re.compile(r'^(Figure|Table|Diagram)\s+(\d+)\s*[\.:]\s*(.*)$', re.S)
DPI   = 220
PAD   = 9          # points of breathing room around the located region
TOP_FURNITURE = 38 # running head and the gold rule under it
BOT_FURNITURE = 734


def prose(block):
    """Body copy, as opposed to a label inside a diagram."""
    x0, _, x1, _, text = block[0], block[1], block[2], block[3], block[4]
    words = len(text.split())
    return (x1 - x0) > 330 and words > 14


def lines_of(page):
    """Line-level text with a prose flag inherited from the parent block.

    One paper sets a figure caption in the same block as the diagram's last
    label, so a block-level caption test misses it entirely.
    """
    out = []
    for blk in page.get_text("dict")['blocks']:
        if blk.get('type') != 0:
            continue
        bb = blk['bbox']
        text = ' '.join(s['text'] for ln in blk['lines'] for s in ln['spans'])
        is_prose = prose((bb[0], bb[1], bb[2], bb[3], text))
        for ln in blk['lines']:
            t = ' '.join(s['text'] for s in ln['spans']).strip()
            if not t:
                continue
            size = max((s['size'] for s in ln['spans']), default=0)
            heading = size > 15 and ln['bbox'][0] < 62   # a section heading, not a label
            out.append((pymupdf.Rect(ln['bbox']), t, is_prose or heading))
    return out


def figure_rect(page, lines, cap_rect, floor):
    """Bound the graphic sitting between `floor` and the caption."""
    top_limit = max(floor, TOP_FURNITURE)
    imgs, draws, xrefs = [], [], []

    for img in page.get_images(full=True):
        for r in page.get_image_rects(img[0]):
            if r.y1 <= cap_rect.y0 + 2 and r.y0 >= top_limit - 2 and r.height > 24:
                imgs.append(pymupdf.Rect(r))
                xrefs.append(img[0])

    for d in page.get_drawings():
        r = pymupdf.Rect(d['rect'])
        if r.y1 > cap_rect.y0 + 2 or r.y0 < top_limit - 2:
            continue
        if r.height < 4 and r.width < 80:         # the gold rule under the running head
            continue
        if r.height < 1.5 and r.width > 420:      # full-measure hairline, not a figure
            continue
        draws.append(r)

    # Where the paper placed the figure as an image, the image is the figure —
    # anything vector on the same page is a table or a rule, not part of it.
    cands = imgs or draws
    if not cands:
        return None

    # A figure placed as one image is wider than the text measure in several
    # papers, so the page edge clips it. Take the embedded original instead of a
    # crop of the page: nothing is lost and the resolution is the source's own.
    if len(imgs) == 1:
        return ('image', xrefs[0])

    # A page can carry a table above the figure, and a table is drawn with the
    # same primitives. Group the graphics into vertical bands and keep only the
    # band that actually sits under the caption.
    cands.sort(key=lambda r: r.y0)
    bands, cur, edge = [], [cands[0]], cands[0].y1
    for r in cands[1:]:
        if r.y0 - edge > 30:
            bands.append(cur); cur = []
        cur.append(r); edge = max(edge, r.y1)
    bands.append(cur)

    # Take the band under the caption, then absorb the band above it while what
    # we have is too small to be the whole diagram — a flow chart with a wide
    # gap between its rows would otherwise be cropped to its last row.
    box = None
    while bands:
        band = bands.pop()
        for r in band:
            box = r if box is None else box | r
        if box.height >= 150:
            break

    # Diagram labels are text, and often sit outside the drawn boxes — a figure
    # title above, axis words to the side. Absorb them, then re-check, because
    # absorbing one can bring another into range.
    labels = [r for r, t, is_prose in lines if not is_prose and not CAP.match(t)]
    for _ in range(4):
        grew = False
        for r in labels:
            if r.y1 > cap_rect.y0 - 3 or r.y0 < top_limit - 2:
                continue
            near = pymupdf.Rect(box.x0 - 34, box.y0 - 42, box.x1 + 34, box.y1 + 20)
            if r.intersects(near) and not box.contains(r):
                box |= r
                grew = True
        if not grew:
            break

    # Two of the papers set the caption on top of the diagram's last box rather
    # than below it. Cropping above the caption would slice that box in half, so
    # keep the graphic whole; the caption itself is redacted out before render.
    overlap = box.y1 > cap_rect.y0
    bottom = box.y1 + PAD if overlap else min(box.y1 + PAD, cap_rect.y0 - 3)
    box = pymupdf.Rect(box.x0 - PAD, box.y0 - PAD, box.x1 + PAD, bottom)
    box &= page.rect
    if box.width < 120 or box.height < 70:
        return None
    return box


def extract(pdf, outdir):
    doc = pymupdf.open(pdf)
    found = []
    for pno, page in enumerate(doc):
        lines = lines_of(page)
        blocks = page.get_text("blocks")
        caps = []
        for r, t, _ in lines:
            m = CAP.match(t)
            if m and r.y0 > 90:
                # A caption can wrap; recover the rest of it from the parent block.
                full = t
                for b in blocks:
                    if pymupdf.Rect(b[:4]).contains(r):
                        bt = ' '.join(b[4].split())
                        i = bt.find(t[:40])
                        if i >= 0:
                            full = bt[i:]
                        break
                caps.append((r, m.group(1), m.group(2), ' '.join(full.split())))
        if not caps:
            continue
        caps.sort(key=lambda c: c[0].y0)
        floor = TOP_FURNITURE
        for rect, kind, num, text in caps:
            box = figure_rect(page, lines, rect, floor)
            floor = rect.y1 + 4
            if box is None:
                print(f"    ! {pdf.stem} p{pno+1} {kind} {num}: no graphic located")
                continue
            name = f"{pdf.stem}-fig-{int(num):02d}.png"
            if isinstance(box, tuple):
                pix = pymupdf.Pixmap(doc, box[1])
                if pix.alpha or pix.colorspace.n > 3:
                    pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
                pix.save(outdir / name)
                found.append({'page': pno + 1, 'kind': kind, 'num': int(num),
                              'caption': text, 'file': name,
                              'w': pix.width, 'h': pix.height, 'src': 'embedded'})
                continue
            if box.y1 > rect.y0:
                page.add_redact_annot(rect + (-1, -1, 1, 1))
                page.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE,
                                      graphics=pymupdf.PDF_REDACT_LINE_ART_NONE)
            pix = page.get_pixmap(clip=box, dpi=DPI, alpha=False)
            pix.save(outdir / name)
            found.append({'page': pno + 1, 'kind': kind, 'num': int(num),
                          'caption': text, 'file': name,
                          'w': pix.width, 'h': pix.height, 'src': 'render'})
    return found


if __name__ == '__main__':
    out = Path('figures'); out.mkdir(exist_ok=True)
    manifest = {}
    for pdf in sorted(Path('out').glob('*.pdf')):
        figs = extract(pdf, out)
        manifest[pdf.stem] = figs
        print(f"{pdf.stem:<45} {len(figs):>2} figures")
    Path('figures/manifest.json').write_text(json.dumps(manifest, indent=1, ensure_ascii=False))
