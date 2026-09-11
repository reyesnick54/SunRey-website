"""PDF -> structured article blocks for the SunRey white-paper reading view.

Uses pdftotext, which preserves the papers' line structure (pypdf glues lines).
The ten papers use three section-marker styles:
    05 | CONTROL SPINE          then a title line
    2.3 | PRIVACY & …           decimal numbering
    01                          bare number, then a one- or two-line title
Running heads and feet are found by frequency, not by pattern, because the
chrome differs per paper.
"""
import json, re, subprocess, unicodedata
from collections import Counter
from pathlib import Path

BULLET  = re.compile(r'^[•▪●◦‣⁃]\s*(.+)$')
SEC_PIPE = re.compile(r'^(\d{1,2}(?:\.\d{1,2})?)\s*\|\s*([A-Z][A-Z0-9 ’&/,\.\-\(\)]{2,52})$')
SEC_NUM  = re.compile(r'^(\d{1,2}[A-Z]?)$')
SEC_DOT  = re.compile(r'^(\d{1,2})\.\s+([A-Z].{3,70})$')
# Some papers glue the marker, the section title and the first body line together.
SEC_INLINE = re.compile(r'^(\d{1,2})\s*\|\s*([A-Z][A-Z ’&/\-]{2,40}?)\s+([A-Z][a-z][^.]{3,70}?)\s+([A-Z][a-z].*)$')
FIGURE   = re.compile(r'^(Figure|Table|Diagram)\s+\d+[\.:]')
CAPS     = re.compile(r'^[A-Z][A-Z0-9 ’&/,\.\-\(\)]{3,46}$')
REF      = re.compile(r'^\[\d+\]')

def norm(s):
    s = unicodedata.normalize('NFKC', s)
    for a, b in [('ﬁ','fi'),('ﬂ','fl'),('“','"'),('”','"'),(' ',' ')]:
        s = s.replace(a, b)
    s = re.sub(r'(?<=\S)\s*->\s*(?=\S)', ' → ', s)
    return re.sub(r'\s{2,}', ' ', s).strip()

def pages_of(path):
    txt = subprocess.run(['pdftotext', str(path), '-'], capture_output=True, text=True).stdout
    return [[norm(l) for l in pg.splitlines() if norm(l)] for pg in txt.split('\f')]

def chrome(pages):
    c = Counter()
    for p in pages:
        for l in set(p):
            c[re.sub(r'\d+', '#', l) if len(l) > 4 else l] += 1
    return {k for k, v in c.items() if v >= max(3, len(pages) * 0.25)}

def looks_like_title(l):
    return (len(l) < 66 and not l.endswith('.') and not l.endswith(',')
            and l[:1].isupper() and not BULLET.match(l))

def convert(path):
    pages = pages_of(path)
    skip  = chrome(pages)
    blocks, buf, bullets = [], [], []
    last_n = 0                  # section numbers must run in sequence
    awaiting_title = 0          # lines still collectable into the current title

    def flush_p():
        nonlocal buf
        if buf:
            t = ' '.join(buf).strip()
            if len(t) > 2:
                blocks.append({'type': 'p', 'text': t})
            buf = []

    def flush_b():
        nonlocal bullets
        if bullets:
            blocks.append({'type': 'list', 'items': bullets}); bullets = []

    def open_section(n, label=None):
        """Accept only a number that continues the sequence. Contents-page echoes,
        appendix numbering and two-column misreads all fail this test."""
        nonlocal awaiting_title, last_n
        v = int(n)
        if not (v == last_n + 1 or v == last_n + 2 or (last_n == 0 and v <= 1)):
            return False
        last_n = v
        flush_p(); flush_b()
        blocks.append({'type': 'section', 'n': str(n).zfill(2),
                       'label': (label or '').title(), 'title': ''})
        awaiting_title = 2
        return True

    for pi, lines in enumerate(pages):
        if pi == 0:
            continue                                  # cover page is metadata
        first_on_page = True
        for raw in lines:
            # Chrome and stray page numbers must not consume the page's first-line flag.
            if (re.sub(r'\d+', '#', raw) if len(raw) > 4 else raw) in skip: continue
            if re.fullmatch(r'\d{1,3}', raw) and not SEC_NUM.match(raw): continue
            was_first, first_on_page = first_on_page, False

            m = SEC_PIPE.match(raw)
            if m:
                if open_section(m.group(1).split('.')[0], m.group(2)): continue

            if was_first and SEC_NUM.match(raw) and int(re.sub(r'[A-Z]', '', raw)) <= 40:
                if open_section(re.sub(r'[A-Z]', '', raw)): continue
            if SEC_NUM.match(raw):
                continue        # page number

            il = SEC_INLINE.match(raw)
            if il and int(il.group(1)) <= 40:
                if open_section(il.group(1), il.group(2)):
                    blocks[-1]['title'] = il.group(3).strip()
                    awaiting_title = 0
                    buf.append(il.group(4).strip())
                    continue

            d = SEC_DOT.match(raw)
            if d and int(d.group(1)) <= 40:
                if open_section(d.group(1)):
                    blocks[-1]['title'] = d.group(2).strip()
                    awaiting_title = 1      # the title may wrap one more line
                    continue

            if awaiting_title and blocks and blocks[-1]['type'] == 'section' and looks_like_title(raw):
                b = blocks[-1]
                b['title'] = (b['title'] + ' ' + raw).strip()
                awaiting_title -= 1
                continue
            awaiting_title = 0

            bm = BULLET.match(raw)
            if bm:
                flush_p(); bullets.append(bm.group(1).strip()); continue

            if FIGURE.match(raw):
                flush_p(); flush_b(); blocks.append({'type': 'figure', 'caption': raw}); continue

            if CAPS.match(raw) and len(raw) < 48:
                flush_p(); flush_b()
                blocks.append({'type': 'callout', 'label': raw.title(), 'text': ''}); continue

            flush_b()
            if blocks and blocks[-1]['type'] == 'callout' and not blocks[-1]['text'] and not buf:
                blocks[-1]['text'] = raw; continue
            buf.append(raw)
    flush_p(); flush_b()

    # Stitch: a callout's opening line usually runs on into the next paragraph.
    out = []
    for b in blocks:
        if (out and out[-1]['type'] == 'callout' and out[-1]['text'] and b['type'] == 'p'
                and len(out[-1]['text']) < 110 and not out[-1]['text'].endswith('.')):
            out[-1]['text'] += ' ' + b['text']; continue
        out.append(b)

    # An ALL-CAPS line with no prose under it was a label inside a rendered diagram,
    # not a callout. Diagram text does not survive extraction as readable content.
    blocks = [b for b in out if not (b['type'] == 'callout' and not b['text'].strip())]
    # Contents/report-map residue is navigation, not article body.
    blocks = [b for b in blocks if not (
        b['type'] == 'callout' and re.match(r'^Contents\b', b['text'].strip(), re.I))]
    blocks = [b for b in blocks if not (
        b['type'] == 'p' and len(re.findall(r'\s\d{1,2}\s+[A-Z]', b['text'])) >= 6)]
    # A label that merely repeats the title adds nothing.
    for b in blocks:
        if b['type'] == 'section' and b['label'].lower() == b['title'].lower():
            b['label'] = ''
    out = blocks

    # Drop empty sections and any contents-page residue (a section with no body after it).
    cleaned = []
    for i, b in enumerate(out):
        if b['type'] == 'section':
            nxt = out[i+1] if i+1 < len(out) else None
            if not b['title'] and (nxt is None or nxt['type'] == 'section'):
                continue
        cleaned.append(b)
    return cleaned

if __name__ == '__main__':
    src, dst = Path('out'), Path('json'); dst.mkdir(exist_ok=True)
    for pdf in sorted(src.glob('*.pdf')):
        bl = convert(pdf)
        words = sum(len(b.get('text', '').split()) for b in bl)
        words += sum(len(' '.join(b['items']).split()) for b in bl if b['type'] == 'list')
        secs = [b for b in bl if b['type'] == 'section']
        titled = sum(1 for b in secs if b['title'])
        (dst / (pdf.stem + '.json')).write_text(json.dumps(bl, ensure_ascii=False, indent=1))
        print(f"{pdf.stem:<45} {len(bl):>4} blk  {len(secs):>3} sec ({titled} titled)  {words:>5} wd")
