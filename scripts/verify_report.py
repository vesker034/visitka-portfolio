# -*- coding: utf-8 -*-
import zipfile
from xml.etree import ElementTree as ET

path = r"c:\Users\andre\OneDrive\Рабочий стол\GrapeLab\2026\visitka\отчет по практике MomCare - Толочек А.О.docx"
NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"

with zipfile.ZipFile(path) as z:
    xml = z.read("word/document.xml").decode("utf-8")

root = ET.fromstring(xml)
paras = root.find("w:body", NS).findall("w:p", NS)

breaks = []
for i, p in enumerate(paras):
    for br in p.findall(".//w:br", NS):
        if br.get(f"{W}type") == "page":
            breaks.append(i)

print("page breaks at:", [b + 1 for b in breaks])
print("paras before first break:", breaks[0] + 1 if breaks else len(paras))

for i, p in enumerate(paras[: breaks[0] + 1 if breaks else 30]):
    text = "".join(t.text or "" for t in p.findall(".//w:t", NS)).strip()
    if text:
        print(f"{i+1:2}: {text[:90]}")

# checks
full = xml
for token in ["Толочек", "Гилка", "ПрИн-267", "MomCare", "Филиппова", "Иванов", "Django"]:
    print(token, "->", token in full)
