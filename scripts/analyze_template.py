# -*- coding: utf-8 -*-
import re
import zipfile
from xml.etree import ElementTree as ET

path = r"c:\Users\andre\Downloads\Telegram Desktop\отчет по практике 2 курс лаба.docx"
NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"

with zipfile.ZipFile(path) as z:
    xml = z.read("word/document.xml").decode("utf-8")
    styles_xml = z.read("word/styles.xml").decode("utf-8")

root = ET.fromstring(xml)
body = root.find("w:body", NS)
paras = body.findall("w:p", NS)

page_break_idx = []
for i, p in enumerate(paras):
    for br in p.findall(".//w:br", NS):
        if br.get(f"{W}type") == "page":
            page_break_idx.append(i)
            break

print("page breaks at para indices:", page_break_idx)
print("first break at para:", page_break_idx[0] + 1 if page_break_idx else None)

for i, p in enumerate(paras[: page_break_idx[0] + 1 if page_break_idx else 40]):
    texts = [t.text or "" for t in p.findall(".//w:t", NS)]
    text = "".join(texts).strip()
    pf = p.find("w:pPr", NS)
    info = []
    if pf is not None:
        sp = pf.find("w:spacing", NS)
        if sp is not None:
            info.append(
                f"before={sp.get(W+'before')} after={sp.get(W+'after')} line={sp.get(W+'line')}"
            )
        jc = pf.find("w:jc", NS)
        if jc is not None:
            info.append(f"jc={jc.get(W+'val')}")
        ind = pf.find("w:ind", NS)
        if ind is not None:
            info.append(f"ind={ind.attrib}")
    br = any(b.get(f"{W}type") == "page" for b in p.findall(".//w:br", NS))
    label = text if text else "[пусто]"
    print(f"{i+1:2} {'[PB]' if br else '    '} {label[:75]!r} {' | '.join(info)}")

# margins
m = re.search(r"<w:pgMar[^>]*/>", xml)
print("\n", m.group(0) if m else "no margins")

# count empty paras on title page
if page_break_idx:
    first = paras[: page_break_idx[0]]
    empty = sum(1 for p in first if not "".join(t.text or "" for t in p.findall(".//w:t", NS)).strip())
    print(f"title page: {len(first)} paragraphs, {empty} empty")
