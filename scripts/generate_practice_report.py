# -*- coding: utf-8 -*-
"""Сборка отчёта на базе шаблона ВолгГТУ с сохранением оформления."""

from __future__ import annotations

import copy
import re
import shutil
import zipfile
from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK
from docx.shared import Cm, Pt

ROOT = Path(__file__).resolve().parents[1]
TEMPLATE = Path(
    r"c:\Users\andre\Downloads\Telegram Desktop\отчет по практике 2 курс лаба.docx"
)
SCREENSHOTS = ROOT / "report-screenshots"
ASSETS = Path(
    r"C:\Users\andre\.cursor\projects\c-Users-andre-OneDrive-GrapeLab-2026-visitka\assets"
)
OUTPUT = ROOT / "отчет по практике MomCare - Толочек А.О.docx"
COPY_TO = Path(r"c:\Users\andre\Downloads\Telegram Desktop") / OUTPUT.name

STUDENT = "Толочек Андрей Олегович"
STUDENT_SHORT = "Толочек А.О."
GROUP = "ПрИн-267"
OLD_GROUP = "ПрИн-268"
SUPERVISOR = "Кузнецова А.С."
SUPERVISOR_FULL = "Кузнецова Агнесса Сергеевна"
OLD_SUPERVISOR = "Иванов И. И."
DEPT_HEAD = "и. о. зав. кафедры О.А. Сычов"
DATE_APPROVAL = "«09»________________2026 г."
DATE_ISSUE = "«09» июля 2026г."
DATE_CITY = "Волгоград 2026г."

FONT = "Times New Roman"


def asset(part: str) -> str:
    for p in ASSETS.glob(f"*{part}*"):
        if p.is_file():
            return str(p)
    raise FileNotFoundError(part)


DESIGN_MOCKUP = asset("8076a2f2")
DESIGN_PHONE = asset("fde59d72")
DESIGN_COMPARE = asset("ac54e194")


REPLACEMENTS = [
    ("Филиппова К.Е.", STUDENT_SHORT),
    ("Филиппова К.Е", STUDENT_SHORT),
    ("Филиппова Криситина Евгеньевна", STUDENT),
    ("Филиппова Кристина Евгеньевна", STUDENT),
    ("Студенту_Филипповой Криситине Евгеньевне", f"Студенту {STUDENT}"),
    ("Студент_Филиппова Кристина Евгеньевна", f"Студент {STUDENT}"),
    ("Филиппова Кристина Евгеньевна", STUDENT),
    (OLD_GROUP, GROUP),
    ("ПрИн-268", GROUP),
    (OLD_SUPERVISOR, SUPERVISOR),
    ("Иванов И. И.", SUPERVISOR),
    ("Гилка В.В.", SUPERVISOR),
    ("Гилка В. В.", SUPERVISOR),
    ("____________________ФИО", f"____________________{SUPERVISOR}"),
    ("Заведующий кафедрой ПОАС", DEPT_HEAD),
    ("Орлова", "Сычов О.А."),
    ("Орловой", "Сычов О.А."),
    ("«_____»________________2026 г.", DATE_APPROVAL),
    ("«______» __________ 20______г.", DATE_ISSUE),
]

ASSIGNMENT_TASKS = [
    "Разработать лендинг-визитку мобильного приложения MomCare по макетам Figma.",
    "Реализовать адаптивную вёрстку секций сайта на стеке Next.js, TypeScript и Tailwind CSS.",
    "Настроить мультиязычность (RU/EN/AR), админ-панель ссылок на скачивание и провести тестирование.",
]


def replace_in_paragraph(paragraph, old: str, new: str) -> None:
    if old not in paragraph.text:
        return
    full = paragraph.text
    if full == old or old in full:
        # preserve first run formatting
        for run in paragraph.runs:
            if old in run.text:
                run.text = run.text.replace(old, new)
                return
        # rebuild single run if split weirdly
        if paragraph.runs:
            paragraph.runs[0].text = full.replace(old, new)
            for run in paragraph.runs[1:]:
                run.text = ""
        else:
            paragraph.add_run(full.replace(old, new))


def replace_all(doc: Document) -> None:
    for old, new in REPLACEMENTS:
        for p in doc.paragraphs:
            replace_in_paragraph(p, old, new)
        for table in doc.tables:
            for row in table.rows:
                for cell in row.cells:
                    for p in cell.paragraphs:
                        replace_in_paragraph(p, old, new)


def set_assignment_tasks(doc: Document) -> None:
    task_idx = 0
    to_remove = []
    for i, p in enumerate(doc.paragraphs):
        t = p.text.strip()
        if re.match(r"^\d\._+$", t) or re.match(r"^_{10,}$", t):
            if task_idx < len(ASSIGNMENT_TASKS):
                task = ASSIGNMENT_TASKS[task_idx]
                if p.runs:
                    p.runs[0].text = f"{task_idx + 1}. {task}"
                    for r in p.runs[1:]:
                        r.text = ""
                else:
                    p.text = f"{task_idx + 1}. {task}"
                task_idx += 1
            else:
                to_remove.append(p)
        elif re.match(r"^3\._+$", t):
            to_remove.append(p)
    for p in to_remove:
        el = p._element
        el.getparent().remove(el)


def fix_supervisor_lines(doc: Document) -> None:
    """Руководитель практики — Кузнецова; в задании полное ФИО."""
    for p in doc.paragraphs:
        text = p.text
        for old in ("Иванов И. И.", "Гилка В.В.", "Гилка В. В."):
            replace_in_paragraph(p, old, SUPERVISOR)
        if text.strip().startswith("Руководитель практики от университета"):
            if p.runs:
                p.runs[0].text = (
                    f"Руководитель практики от университета                   "
                    f"____________________{SUPERVISOR_FULL}"
                )
                for r in p.runs[1:]:
                    r.text = ""


def fix_assignment_header(doc: Document) -> None:
    for p in doc.paragraphs:
        text = p.text
        if "Студенту_" in text or "Студент_" in text:
            if p.runs:
                p.runs[0].text = f"Студенту {STUDENT}          Группа {GROUP}"
                for r in p.runs[1:]:
                    r.text = ""
            else:
                p.text = f"Студенту {STUDENT}          Группа {GROUP}"
        if text.strip().startswith("Студент гр.") and STUDENT.split()[0] not in text:
            if "Филиппова" in text or "________" in text:
                if p.runs:
                    p.runs[0].text = (
                        f"Студент гр. {GROUP}                                          {STUDENT}"
                    )
                    for r in p.runs[1:]:
                        r.text = ""
                else:
                    p.text = f"Студент гр. {GROUP}                                          {STUDENT}"


def find_paragraph(doc: Document, startswith: str) -> int | None:
    for i, p in enumerate(doc.paragraphs):
        if p.text.strip().startswith(startswith):
            return i
    return None


def clear_paragraph(p) -> None:
    p.clear()


def add_body_paragraph(doc, text: str, style_name: str | None = None, center: bool = False):
    if style_name:
        p = doc.add_paragraph(style=style_name)
    else:
        p = doc.add_paragraph()
    p.clear()
    run = p.add_run(text)
    run.font.name = FONT
    run.font.size = Pt(14)
    if center:
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.first_line_indent = Cm(0)
    return p


def add_image_paragraph(doc, path: str, caption: str, width_cm: float = 14.0) -> None:
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.first_line_indent = Cm(0)
    p.add_run().add_picture(path, width=Cm(width_cm))
    cap = doc.add_paragraph()
    cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
    cap.paragraph_format.first_line_indent = Cm(0)
    r = cap.add_run(caption)
    r.font.name = FONT
    r.font.size = Pt(14)


def find_body_start(doc: Document) -> int:
    toc_idx = find_paragraph(doc, "Оглавление")
    if toc_idx is not None:
        for i in range(toc_idx + 1, len(doc.paragraphs)):
            text = doc.paragraphs[i].text.strip()
            if text.startswith("В современных"):
                return i
    for i, p in enumerate(doc.paragraphs):
        if p.text.strip().startswith("В современных"):
            return i
    raise RuntimeError("Не найдено начало основного текста в шаблоне")


def rebuild_body(doc: Document) -> None:
    intro_idx = find_body_start(doc)
    sources_idx = find_paragraph(doc, "6.Список")
    if sources_idx is None:
        sources_idx = find_paragraph(doc, "6.Список использованных")

    end_idx = sources_idx if sources_idx is not None else len(doc.paragraphs)

    for i in range(end_idx - 1, intro_idx, -1):
        el = doc.paragraphs[i]._element
        el.getparent().remove(el)

    insert_after = doc.paragraphs[intro_idx - 1]._element if intro_idx > 0 else doc.paragraphs[0]._element

    # заголовок раздела как в шаблоне
    heading = doc.add_paragraph()
    heading._element.getparent().remove(heading._element)
    insert_after.addnext(heading._element)
    insert_after = heading._element
    heading.style = doc.styles["Heading 1"]
    heading.clear()
    hrun = heading.add_run("1. Введение")
    hrun.font.name = FONT
    hrun.font.size = Pt(16)
    hrun.bold = True

    def insert_paragraph(text: str, style: str | None = None, heading_level: int | None = None):
        nonlocal insert_after
        new_p = doc.add_paragraph()
        new_p._element.getparent().remove(new_p._element)
        insert_after.addnext(new_p._element)
        insert_after = new_p._element
        new_p.clear()
        if heading_level:
            new_p.style = doc.styles[f"Heading {heading_level}"]
        run = new_p.add_run(text)
        run.font.name = FONT
        if heading_level == 1:
            run.font.size = Pt(16)
            run.bold = True
        else:
            run.font.size = Pt(14)
            run.bold = bool(heading_level)
        return new_p

    def insert_image(path: str, caption: str, width_cm: float = 14.0):
        nonlocal insert_after
        pic_p = doc.add_paragraph()
        pic_p._element.getparent().remove(pic_p._element)
        insert_after.addnext(pic_p._element)
        insert_after = pic_p._element
        pic_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        pic_p.paragraph_format.first_line_indent = Cm(0)
        pic_p.add_run().add_picture(path, width=Cm(width_cm))

        cap_p = doc.add_paragraph()
        cap_p._element.getparent().remove(cap_p._element)
        insert_after.addnext(cap_p._element)
        insert_after = cap_p._element
        cap_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        cap_p.paragraph_format.first_line_indent = Cm(0)
        r = cap_p.add_run(caption)
        r.font.name = FONT
        r.font.size = Pt(14)

    # intro heading already exists at intro_idx
    blocks: list[tuple] = [
        ("p", "В современных условиях цифровизации здравоохранения и сопровождения беременности мобильные приложения становятся важным инструментом информирования, планирования визитов к врачу и ведения дневника самочувствия. Для продвижения такого продукта необходим качественный лендинг — одностраничный сайт, который наглядно демонстрирует возможности приложения, формирует доверие пользователя и содержит ссылки на скачивание в App Store, Google Play, RuStore и других магазинах."),
        ("p", "Цель данного проекта — разработка лендинга-визитки MomCare для мобильного приложения, ориентированного на беременных женщин. Основной упор сделан на точную реализацию дизайн-макетов из Figma, создание интерактивных макетов экранов телефона, мультиязычную поддержку и удобную админ-панель для управления ссылками на скачивание."),
        ("p", "Объект исследования — процесс разработки одностраничного веб-приложения на базе Next.js."),
        ("p", "Предмет исследования — методы адаптивной вёрстки, локализации интерфейса и компонентного проектирования пользовательского интерфейса."),
        ("h1", "2. Внешняя спецификация"),
        ("h2", "2.1. Описание программы"),
        ("p", "Лендинг MomCare представляет собой одностраничный промо-сайт мобильного приложения для беременных. Сайт включает шесть основных секций: Hero, Calendar, Current Week, Visits, Tools и Trust/FAQ. Поддерживается переключение языков RU, EN и AR."),
        ("h2", "2.2. Функциональные требования"),
        ("p", "Сайт должен отображать все секции лендинга в соответствии с макетами Figma."),
        ("p", "Сайт должен содержать интерактивные макеты экранов смартфона (24-я неделя, дневник, мои дела)."),
        ("p", "Сайт должен поддерживать переключение языка интерфейса (RU/EN/AR)."),
        ("p", "Сайт должен содержать кнопки перехода в App Store, Google Play, RuStore и ссылку на APK."),
        ("p", "Сайт должен иметь админ-панель для редактирования ссылок на скачивание без изменения кода."),
        ("p", "Сайт должен корректно отображаться на десктопе, планшете и мобильных устройствах."),
        ("h2", "2.3. Нефункциональные требования"),
        ("p", "Производительность: использование SSR/SSG Next.js, оптимизация изображений через next/image."),
        ("p", "Адаптивность: вёрстка на Tailwind CSS с breakpoints sm/md/lg/xl."),
        ("p", "Сопровождаемость: модульная структура компонентов, типизация TypeScript, централизованные переводы."),
        ("p", "Интерфейс: дизайн должен соответствовать макетам Figma."),
        ("h1", "3. Внутренняя спецификация"),
        ("h2", "3.1. Описание решения"),
        ("p", "Решение реализовано на базе Next.js 16 (App Router) с React 19 и TypeScript. Стилизация выполнена с помощью Tailwind CSS 4. Локализация организована через LocaleContext и файлы переводов ru.ts, en.ts, ar.ts."),
        ("p", "Ключевые модули: PhoneMockup, FeatureCard, DoctorReportCard, StoreButtons, секции LandingPage, i18n и admin/page.tsx."),
        ("h2", "3.2. Структура проекта"),
        ("p", "Проект размещён в репозитории GrapeGit (code.grapelab.ru/Fixer201/mom-care-web). Исходный код организован по каталогам src/app, src/components, src/i18n, public/images и data."),
        ("h2", "3.3. Используемые при разработке программные продукты"),
        ("p", "Next.js 16, React 19, TypeScript, Tailwind CSS 4, Lucide React, Figma, GrapeGit, Node.js / npm."),
        ("h1", "4. Программа и методика испытаний"),
        ("h2", "4.1. Цель испытаний"),
        ("p", "Проверка соответствия реализованного лендинга дизайн-макетам, корректности локализации, адаптивности интерфейса и работоспособности админ-панели."),
        ("h2", "4.2. Аспекты тестирования"),
        ("p", "UI/UX: сравнение секций сайта с макетами Figma."),
        ("p", "Адаптивность: просмотр на ширине 1440px, 768px и 375px."),
        ("p", "Локализация: переключение RU/EN/AR."),
        ("p", "Функциональность: работа кнопок магазинов и сохранение настроек в admin."),
        ("p", "Сборка: успешное выполнение npm run build."),
        ("h2", "4.3. Результаты работы программы"),
        ("h2", "1. Дизайн и вёрстка лендинга"),
        ("p", "Выполнена вёрстка всех шести секций лендинга по макетам Figma. Реализованы розовый градиентный фон, SVG-ветки, прозрачный header и макеты экранов телефона."),
        ("img", DESIGN_MOCKUP, "Рис. 1 - Макеты лендинга MomCare в Figma"),
        ("img", str(SCREENSHOTS / "01-hero.png"), "Рис. 2 – Реализованная Hero-секция лендинга"),
        ("h2", "2. Секция «Текущая неделя» и макет телефона"),
        ("p", "Создан компонент PhoneMockup с экранами «24 неделя», «Дневник» и «Мои дела»."),
        ("img", DESIGN_PHONE, "Рис. 3 – Макет экрана «24 неделя» в Figma", 8),
        ("img", str(SCREENSHOTS / "03-current-week.png"), "Рис. 4 – Секция «Текущая неделя» на сайте"),
        ("h2", "3. Секции визитов, инструментов и FAQ"),
        ("p", "Реализованы блоки Visits, Tools и Trust/FAQ с карточкой отчёта для врача и feature-карточками."),
        ("img", str(SCREENSHOTS / "04-visits.png"), "Рис. 5 – Секция визитов и отчёта для врача"),
        ("img", str(SCREENSHOTS / "05-tools.png"), "Рис. 6 – Секция инструментов приложения"),
        ("h2", "4. Локализация и сравнение с макетом"),
        ("p", "Настроена поддержка трёх языков. Выполнена поэтапная подгонка интерфейса под макеты."),
        ("img", DESIGN_COMPARE, "Рис. 7 – Сравнение макета и текущей реализации"),
        ("img", str(SCREENSHOTS / "07-full-page.png"), "Рис. 8 – Полная страница лендинга MomCare"),
        ("h1", "5. Заключение"),
        ("p", f"В ходе учебной практики была выполнена разработка лендинга-визитки MomCare на стеке Next.js 16, React 19, TypeScript и Tailwind CSS. Студентом {STUDENT} (группа {GROUP}) под руководством {SUPERVISOR} реализованы все основные секции сайта по макетам Figma."),
        ("p", "Получены практические навыки работы с современным React-стеком, адаптивной вёрсткой, локализацией и системой контроля версий GrapeGit."),
    ]

    for block in blocks:
        kind = block[0]
        if kind == "p":
            insert_paragraph(block[1])
        elif kind == "h1":
            insert_paragraph(block[1], heading_level=1)
        elif kind == "h2":
            insert_paragraph(block[1], heading_level=2)
        elif kind == "img":
            path, caption = block[1], block[2]
            width = block[3] if len(block) > 3 else 14.0
            insert_image(path, caption, width)


def rebuild_sources(doc: Document) -> None:
    idx = find_paragraph(doc, "6.Список")
    if idx is None:
        return
    # remove old sources after heading
    while idx + 1 < len(doc.paragraphs) and not doc.paragraphs[idx + 1].text.strip().startswith("6."):
        nxt = doc.paragraphs[idx + 1].text.strip()
        if nxt == "":
            el = doc.paragraphs[idx + 1]._element
            el.getparent().remove(el)
            continue
        if "Django" in nxt or "PostgreSQL" in nxt or "Bootstrap" in nxt or "Schema.org" in nxt or "MDN" in nxt:
            el = doc.paragraphs[idx + 1]._element
            el.getparent().remove(el)
        else:
            break

    sources = [
        "Официальная документация Next.js [Электронный ресурс] – Режим доступа: https://nextjs.org/docs (дата обращения: 09.07.2026).",
        "Официальная документация React [Электронный ресурс] – Режим доступа: https://react.dev/ (дата обращения: 09.07.2026).",
        "Документация Tailwind CSS [Электронный ресурс] – Режим доступа: https://tailwindcss.com/docs (дата обращения: 09.07.2026).",
        "Документация TypeScript [Электронный ресурс] – Режим доступа: https://www.typescriptlang.org/docs/ (дата обращения: 09.07.2026).",
        "MDN Web Docs [Электронный ресурс] – Режим доступа: https://developer.mozilla.org/ (дата обращения: 09.07.2026).",
        "Макеты лендинга MomCare [Электронный ресурс] / GrapeLab. – Figma design assets.",
    ]
    anchor = doc.paragraphs[idx]._element
    for src in sources:
        p = doc.add_paragraph()
        p._element.getparent().remove(p._element)
        anchor.addnext(p._element)
        anchor = p._element
        run = p.add_run(src)
        run.font.name = FONT
        run.font.size = Pt(14)


def update_intro_text(doc: Document) -> None:
    """Заменить вводный текст Django на MomCare если rebuild не сработал."""
    mapping = {
        "официальный веб-сайт университетской кафедры": "лендинг-визитка мобильного приложения MomCare",
        "модернизация веб-сайта кафедры": "разработка лендинга-визитки MomCare",
        "Python, Django, PostgreSQL": "Next.js, React, TypeScript и Tailwind CSS",
        "Django": "Next.js",
    }
    for p in doc.paragraphs:
        for old, new in mapping.items():
            if old in p.text:
                replace_in_paragraph(p, old, new)


def main() -> None:
    if not TEMPLATE.exists():
        raise FileNotFoundError(TEMPLATE)

    work = ROOT / "_report_from_template.docx"
    shutil.copy2(TEMPLATE, work)
    doc = Document(str(work))

    replace_all(doc)
    set_assignment_tasks(doc)
    fix_supervisor_lines(doc)
    fix_assignment_header(doc)
    rebuild_body(doc)
    rebuild_sources(doc)
    update_intro_text(doc)

    doc.save(OUTPUT)
    work.unlink(missing_ok=True)
    shutil.copy2(OUTPUT, COPY_TO)
    print(f"Saved: {OUTPUT}")
    print(f"Copied: {COPY_TO}")


if __name__ == "__main__":
    main()
