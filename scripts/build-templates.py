"""Generate the VOANEVES document templates in templates/.

Requires: python-docx, python-pptx, openpyxl, pillow.
Run: python scripts/build-templates.py
Fonts are referenced by name only (install from fonts/source).
"""
import copy
import io
import os
import re
import sys

from docx import Document
from docx.enum.section import WD_SECTION
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn as _dqn
from pptx.oxml.ns import qn as _pqn
from docx.shared import Cm, Pt, RGBColor
from lxml import etree
from PIL import Image, ImageDraw
from pptx import Presentation
from pptx.util import Emu, Inches, Pt as PPt

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "templates")
import tempfile
ASSETS = tempfile.mkdtemp(prefix="vn-tpl-")
os.makedirs(OUT, exist_ok=True)

INK, CREAM, CREAM_SOFT = "0A0A0A", "F4EAD4", "EFE4C5"
SIGNAL, SIGNAL_INK, MUTED, LINE = "F50000", "B80000", "5C5446", "7A705C"
SAND = "A69C86"
DISPLAY, TEXT, MONO = "Fraunces", "Schibsted Grotesk", "JetBrains Mono"


def qn(tag):
    return _pqn(tag) if tag.split(':')[0] in ('p', 'a') else _dqn(tag)


def rgb(h):
    return RGBColor.from_string(h)


# ---------------------------------------------------------------- logo PNGs
def draw_mark(path, disc="0A0A0A", dot="F50000", size=1024):
    """Mark geometry from docs/03-logo.md (viewBox 512), supersampled 4x."""
    s = size * 4
    k = s / 512
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.ellipse([0, 0, s - 1, s - 1], fill="#" + disc)
    v = [(142, 148), (214, 148), (250, 244), (286, 148), (358, 148), (277, 364), (223, 364)]
    cut = Image.new("L", (s, s), 0)
    ImageDraw.Draw(cut).polygon([(x * k, y * k) for x, y in v], fill=255)
    alpha = img.getchannel("A")
    alpha.paste(0, mask=cut)
    img.putalpha(alpha)
    d = ImageDraw.Draw(img)
    cx, cy, r = 340 * k, 337 * k, 27 * k
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill="#" + dot)
    img = img.resize((size, size), Image.LANCZOS)
    img.save(path)


MARK = os.path.join(ASSETS, "mark.png")
MARK_REV = os.path.join(ASSETS, "mark-reverse.png")
draw_mark(MARK)
draw_mark(MARK_REV, disc="FFFFFF", dot="F50000")


# ------------------------------------------------------------------- DOCX
def set_run_font(run_or_style_font_el, name):
    rpr = run_or_style_font_el
    rf = rpr.find(qn("w:rFonts"))
    if rf is None:
        rf = OxmlElement("w:rFonts")
        rpr.insert(0, rf)
    for a in list(rf.attrib):
        del rf.attrib[a]
    for a in ("ascii", "hAnsi", "eastAsia", "cs"):
        rf.set(qn("w:" + a), name)


def style_font(style, name, size, color=INK, bold=None, italic=None):
    f = style.font
    f.name = name
    set_run_font(style.element.get_or_add_rPr(), name)
    f.size = Pt(size)
    f.color.rgb = rgb(color)
    if bold is not None:
        f.bold = bold
    if italic is not None:
        f.italic = italic


def style_para(style, before=0, after=6, line=1.25, keep_next=False):
    pf = style.paragraph_format
    pf.space_before = Pt(before)
    pf.space_after = Pt(after)
    pf.line_spacing = line
    pf.keep_with_next = keep_next


def shade(el_pr, fill):
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), fill)
    el_pr.append(shd)


def para_border(ppr, side, color, sz=24, space=8):
    pbdr = ppr.find(qn("w:pBdr"))
    if pbdr is None:
        pbdr = OxmlElement("w:pBdr")
        ppr.append(pbdr)
    b = OxmlElement("w:" + side)
    b.set(qn("w:val"), "single")
    b.set(qn("w:sz"), str(sz))
    b.set(qn("w:space"), str(space))
    b.set(qn("w:color"), color)
    pbdr.append(b)


def add_field(par, instr, font=MONO, size=9, color=MUTED):
    def r(child):
        run = par.add_run()
        run.font.name = font
        set_run_font(run._r.get_or_add_rPr(), font)
        run.font.size = Pt(size)
        run.font.color.rgb = rgb(color)
        run._r.append(child)
    b = OxmlElement("w:fldChar"); b.set(qn("w:fldCharType"), "begin"); r(b)
    i = OxmlElement("w:instrText"); i.set(qn("xml:space"), "preserve"); i.text = instr; r(i)
    s = OxmlElement("w:fldChar"); s.set(qn("w:fldCharType"), "separate"); r(s)
    t = OxmlElement("w:t"); t.text = "1"; r(t)
    e = OxmlElement("w:fldChar"); e.set(qn("w:fldCharType"), "end"); r(e)


def add_run(par, text, font=TEXT, size=11, color=INK, bold=False, italic=False, spacing=None):
    run = par.add_run(text)
    run.font.name = font
    set_run_font(run._r.get_or_add_rPr(), font)
    run.font.size = Pt(size)
    run.font.color.rgb = rgb(color)
    run.bold = bold
    run.italic = italic
    if spacing is not None:
        sp = OxmlElement("w:spacing")
        sp.set(qn("w:val"), str(spacing))
        run._r.get_or_add_rPr().append(sp)
    return run


def wordmark(par, size, color=INK):
    add_run(par, "VOANEVES", MONO, size, color, bold=True, spacing=int(size * 20 * 0.1))
    add_run(par, ".", MONO, size, SIGNAL, bold=True)


def build_docx():
    doc = Document()
    sec = doc.sections[0]
    sec.page_width, sec.page_height = Cm(21.0), Cm(29.7)
    sec.left_margin = sec.right_margin = Cm(2.5)
    sec.top_margin, sec.bottom_margin = Cm(2.8), Cm(2.4)
    sec.header_distance, sec.footer_distance = Cm(1.2), Cm(1.1)
    sec.different_first_page_header_footer = True

    st = doc.styles
    style_font(st["Normal"], TEXT, 11)
    style_para(st["Normal"], 0, 8, 1.3)
    st["Normal"].font.color.rgb = rgb(INK)

    t = st["Title"]
    style_font(t, DISPLAY, 44, INK, bold=True, italic=True)
    style_para(t, 0, 10, 0.95)
    ppr = t.element.get_or_add_pPr()
    for b in ppr.findall(qn("w:pBdr")):
        ppr.remove(b)
    sub = st["Subtitle"]
    style_font(sub, TEXT, 15, MUTED, italic=False)
    style_para(sub, 0, 12, 1.3)

    for name, size, before, after, ital in (("Heading 1", 28, 24, 8, True), ("Heading 2", 19, 18, 6, False), ("Heading 3", 14, 14, 4, False)):
        h = st[name]
        style_font(h, DISPLAY, size, INK, bold=True, italic=ital)
        style_para(h, before, after, 1.05, keep_next=True)
    st["Heading 3"].font.color.rgb = rgb(MUTED)

    for name in ("List Bullet", "List Number"):
        style_font(st[name], TEXT, 11)
        style_para(st[name], 0, 4, 1.3)

    q = st["Quote"]
    style_font(q, DISPLAY, 17, INK, italic=True, bold=False)
    style_para(q, 10, 10, 1.3)
    q.paragraph_format.left_indent = Cm(0.8)
    para_border(q.element.get_or_add_pPr(), "left", SIGNAL, 24, 12)

    from docx.enum.style import WD_STYLE_TYPE
    cap = st["Caption"]
    style_font(cap, TEXT, 9, MUTED, bold=False, italic=False)
    style_para(cap, 4, 10, 1.2)

    lab = st.add_style("Label", WD_STYLE_TYPE.PARAGRAPH)
    lab.base_style = st["Normal"]
    style_font(lab, MONO, 9, MUTED, bold=True)
    style_para(lab, 0, 6, 1.2)
    sp = OxmlElement("w:spacing"); sp.set(qn("w:val"), "30")
    lab.element.get_or_add_rPr().append(sp)
    cp = OxmlElement("w:caps"); lab.element.get_or_add_rPr().append(cp)

    code = st.add_style("Code", WD_STYLE_TYPE.PARAGRAPH)
    code.base_style = st["Normal"]
    style_font(code, MONO, 9.5, INK)
    style_para(code, 6, 6, 1.2)
    code.paragraph_format.left_indent = Cm(0.3)
    code.paragraph_format.right_indent = Cm(0.3)
    shade(code.element.get_or_add_pPr(), CREAM_SOFT)

    inline = st.add_style("Code Inline", WD_STYLE_TYPE.CHARACTER)
    style_font(inline, MONO, 10, INK)
    shade(inline.element.get_or_add_rPr(), CREAM_SOFT)

    callout = st.add_style("Callout", WD_STYLE_TYPE.PARAGRAPH)
    callout.base_style = st["Normal"]
    style_font(callout, TEXT, 11, INK)
    style_para(callout, 8, 10, 1.3)
    callout.paragraph_format.left_indent = Cm(0.4)
    shade(callout.element.get_or_add_pPr(), CREAM_SOFT)
    para_border(callout.element.get_or_add_pPr(), "left", SIGNAL, 24, 8)

    # hyperlink style
    try:
        style_font(st["Hyperlink"], TEXT, 11, SIGNAL_INK)
    except KeyError:
        h = st.add_style("Hyperlink", WD_STYLE_TYPE.CHARACTER)
        style_font(h, TEXT, 11, SIGNAL_INK)
    st["Hyperlink"].font.underline = True

    # ---- header / footer
    hdr = sec.header
    hp = hdr.paragraphs[0]
    hp.paragraph_format.space_after = Pt(0)
    hp.paragraph_format.tab_stops.add_tab_stop(Cm(16.0), alignment=2)
    hp.add_run().add_picture(MARK, height=Cm(0.8))  # 8 mm, print minimum for the disc
    add_run(hp, "  ", TEXT, 9)
    wordmark(hp, 9)
    add_run(hp, "\tTitle of the document", MONO, 8, MUTED, spacing=20)
    para_border(hp._p.get_or_add_pPr(), "bottom", LINE, 4, 6)
    sec.first_page_header.paragraphs[0].text = ""

    ftr = sec.footer
    fp = ftr.paragraphs[0]
    fp.paragraph_format.tab_stops.add_tab_stop(Cm(16.0), alignment=2)
    add_run(fp, "voaneves.com", MONO, 8, MUTED, spacing=20)
    add_run(fp, "\t", MONO, 8, MUTED)
    add_field(fp, " PAGE ")
    add_run(fp, " / ", MONO, 9, MUTED)
    add_field(fp, " NUMPAGES ")
    sec.first_page_footer.paragraphs[0].text = ""

    # ---- title page
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(60)
    p.add_run().add_picture(MARK, height=Cm(3.6))
    p = doc.add_paragraph(style="Label")
    p.paragraph_format.space_before = Pt(10)
    p.paragraph_format.space_after = Pt(150)
    wordmark(p, 11)
    p = doc.add_paragraph(style="Label")
    p.add_run("Document type / 2026")
    doc.add_paragraph("Title of the document", style="Title")
    doc.add_paragraph("A one-sentence subtitle that says what the reader gets from this document.", style="Subtitle")
    p = doc.add_paragraph(style="Label")
    p.paragraph_format.space_before = Pt(120)
    p.add_run("Victor Neves  /  voaneves.com")
    doc.add_paragraph().add_run().add_break(WD_BREAK.PAGE)

    # ---- sample content
    doc.add_paragraph("01 / Overview", style="Label")
    doc.add_paragraph("Heading 1: one clear signal", style="Heading 1")
    p = doc.add_paragraph("Body text uses Schibsted Grotesk at 11 pt on ink. Keep paragraphs short and let whitespace do the work. Inline code looks like ")
    r = p.add_run("--vn-signal")
    r.style = st["Code Inline"]
    p.add_run(", and links use signal-ink: ")
    add_hyperlink(p, "https://github.com/voaneves/brand", "github.com/voaneves/brand")
    p.add_run(".")

    doc.add_paragraph("Heading 2: structure", style="Heading 2")
    for t_ in ("Bullet lists keep one idea per line.", "Use Sinal red sparingly: a dot, a rule, one emphasis.", "Never set white text on Sinal; use ink."):
        doc.add_paragraph(t_, style="List Bullet")

    doc.add_paragraph("Heading 3: details", style="Heading 3")
    for t_ in ("Pick the right style from the Styles gallery.", "Do not apply direct formatting.", "Export to PDF for sharing."):
        doc.add_paragraph(t_, style="List Number")

    doc.add_paragraph("Problem well solved has a signature.", style="Quote")
    doc.add_paragraph("Callout: use for a single note, warning or decision the reader must not miss.", style="Callout")

    doc.add_paragraph("Code", style="Heading 3")
    doc.add_paragraph("const signal = '#f50000'  // light\nconst signalDark = '#ff3838'", style="Code")

    doc.add_paragraph("Table", style="Heading 3")
    rows = [("Token", "Light", "Dark"), ("surface", "#f4ead4", "#0a0a0a"), ("text", "#0a0a0a", "#e8dec5"), ("signal", "#f50000", "#ff3838")]
    tbl = doc.add_table(rows=len(rows), cols=3)
    tbl.alignment = WD_TABLE_ALIGNMENT.LEFT
    tbl.autofit = False
    widths = (Cm(5), Cm(5.5), Cm(5.5))
    for ri, row in enumerate(rows):
        for ci, val in enumerate(row):
            c = tbl.cell(ri, ci)
            c.width = widths[ci]
            par = c.paragraphs[0]
            par.paragraph_format.space_after = Pt(3)
            par.paragraph_format.space_before = Pt(3)
            if ri == 0:
                add_run(par, val.upper(), MONO, 9, CREAM, bold=True, spacing=20)
                shade(c._tc.get_or_add_tcPr(), INK)
            else:
                add_run(par, val, MONO if ci else TEXT, 10, INK)
                if ri % 2 == 0:
                    shade(c._tc.get_or_add_tcPr(), CREAM_SOFT)
            borders = parse_xml(
                '<w:tcBorders %s><w:bottom w:val="single" w:sz="4" w:color="%s"/></w:tcBorders>' % (nsdecls("w"), LINE)
            )
            c._tc.get_or_add_tcPr().append(borders)
    doc.add_paragraph("Table 1. Caption in Schibsted Grotesk, 9 pt, muted.", style="Caption")

    doc.core_properties.author = "Victor Neves"
    doc.core_properties.title = "VOANEVES document template"
    doc.save(os.path.join(OUT, "voaneves-document.docx"))


def add_hyperlink(par, url, text):
    rid = par.part.relate_to(url, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", is_external=True)
    h = OxmlElement("w:hyperlink")
    h.set(qn("r:id"), rid)
    r = OxmlElement("w:r")
    rpr = OxmlElement("w:rPr")
    rs = OxmlElement("w:rStyle"); rs.set(qn("w:val"), "Hyperlink"); rpr.append(rs)
    r.append(rpr)
    t = OxmlElement("w:t"); t.text = text; r.append(t)
    h.append(r)
    par._p.append(h)


# ------------------------------------------------------------------- PPTX
NS = 'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"'
W, H = 12192000, 6858000  # 16:9 EMU


def emu(inches):
    return int(inches * 914400)


def ph_xml(idx, ph_type, name, x, y, w, h, size, color, font="+mn-lt", bold=False, italic=False,
           prompt="", caps=False, spacing=0, anchor="t", lvl_extra="", ph_idx=None, bullet=False):
    l1 = f'marL="{emu(0.3)}" indent="{-emu(0.3)}" ' if bullet else 'marL="0" indent="0" '
    bu = (f'<a:buClr><a:srgbClr val="{SIGNAL}"/></a:buClr><a:buFont typeface="Arial"/><a:buChar char="&#8226;"/>' if bullet else '<a:buNone/>')
    type_attr = f' type="{ph_type}"' if ph_type else ""
    idx_attr = f' idx="{ph_idx}"' if ph_idx is not None else ""
    b = ' b="1"' if bold else ' b="0"'
    i = ' i="1"' if italic else ""
    cp = ' cap="all"' if caps else ""
    sp = f' spc="{spacing}"' if spacing else ""
    body = (
        f'<p:txBody><a:bodyPr lIns="0" tIns="0" rIns="0" bIns="0" anchor="{anchor}"><a:normAutofit/></a:bodyPr>'
        f'<a:lstStyle><a:lvl1pPr {l1}algn="l"><a:lnSpc><a:spcPct val="{100000 if size<30 else 92000}"/></a:lnSpc>{bu}'
        f'<a:defRPr sz="{int(size*100)}"{b}{i}{cp}{sp}><a:solidFill><a:srgbClr val="{color}"/></a:solidFill>'
        f'<a:latin typeface="{font}"/><a:ea typeface="{font}"/><a:cs typeface="{font}"/></a:defRPr></a:lvl1pPr>{lvl_extra}</a:lstStyle>'
        f'<a:p><a:r><a:rPr lang="en-US"/><a:t>{prompt}</a:t></a:r></a:p></p:txBody>'
    )
    return (
        f'<p:sp {NS}><p:nvSpPr><p:cNvPr id="{idx}" name="{name}"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr>'
        f'<p:nvPr><p:ph{type_attr}{idx_attr}/></p:nvPr></p:nvSpPr>'
        f'<p:spPr><a:xfrm><a:off x="{emu(x)}" y="{emu(y)}"/><a:ext cx="{emu(w)}" cy="{emu(h)}"/></a:xfrm></p:spPr>{body}</p:sp>'
    )


def bullets_lvl(color, size):
    out = ""
    for lvl, (mar, sz) in enumerate(((0, size), (0.35, size - 2), (0.7, size - 4)), start=2):
        out += (
            f'<a:lvl{lvl}pPr marL="{emu(mar)}" indent="{-emu(0.25)}"><a:buClr><a:srgbClr val="{SIGNAL}"/></a:buClr>'
            f'<a:buFont typeface="Arial"/><a:buChar char="&#8226;"/><a:defRPr sz="{int(sz*100)}"><a:solidFill><a:srgbClr val="{color}"/></a:solidFill></a:defRPr></a:lvl{lvl}pPr>'
        )
    return out


def rect_xml(idx, name, x, y, w, h, fill):
    return (
        f'<p:sp {NS}><p:nvSpPr><p:cNvPr id="{idx}" name="{name}"/><p:cNvSpPr/><p:nvPr userDrawn="1"/></p:nvSpPr>'
        f'<p:spPr><a:xfrm><a:off x="{emu(x)}" y="{emu(y)}"/><a:ext cx="{emu(w)}" cy="{emu(h)}"/></a:xfrm>'
        f'<a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:solidFill><a:srgbClr val="{fill}"/></a:solidFill><a:ln><a:noFill/></a:ln></p:spPr></p:sp>'
    )


def ellipse_xml(idx, name, x, y, d, fill):
    return (
        f'<p:sp {NS}><p:nvSpPr><p:cNvPr id="{idx}" name="{name}"/><p:cNvSpPr/><p:nvPr userDrawn="1"/></p:nvSpPr>'
        f'<p:spPr><a:xfrm><a:off x="{emu(x)}" y="{emu(y)}"/><a:ext cx="{emu(d)}" cy="{emu(d)}"/></a:xfrm>'
        f'<a:prstGeom prst="ellipse"><a:avLst/></a:prstGeom><a:solidFill><a:srgbClr val="{fill}"/></a:solidFill><a:ln><a:noFill/></a:ln></p:spPr></p:sp>'
    )


def wordmark_xml(idx, x, y, color, w=2.4):
    return (
        f'<p:sp {NS}><p:nvSpPr><p:cNvPr id="{idx}" name="Wordmark"/><p:cNvSpPr txBox="1"/><p:nvPr userDrawn="1"/></p:nvSpPr>'
        f'<p:spPr><a:xfrm><a:off x="{emu(x)}" y="{emu(y)}"/><a:ext cx="{emu(w)}" cy="{emu(0.4)}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/></p:spPr>'
        f'<p:txBody><a:bodyPr lIns="0" tIns="0" rIns="0" bIns="0" anchor="ctr"/><a:lstStyle/><a:p>'
        f'<a:r><a:rPr lang="en-US" sz="1200" b="1" spc="120"><a:solidFill><a:srgbClr val="{color}"/></a:solidFill><a:latin typeface="{MONO}"/><a:ea typeface="{MONO}"/><a:cs typeface="{MONO}"/></a:rPr><a:t>VOANEVES</a:t></a:r>'
        f'<a:r><a:rPr lang="en-US" sz="1200" b="1"><a:solidFill><a:srgbClr val="{SIGNAL}"/></a:solidFill><a:latin typeface="{MONO}"/><a:ea typeface="{MONO}"/><a:cs typeface="{MONO}"/></a:rPr><a:t>.</a:t></a:r>'
        f'</a:p></p:txBody></p:sp>'
    )


def set_bg(layout, hexcolor):
    cSld = layout._element.find(qn("p:cSld"))
    old = cSld.find(qn("p:bg"))
    if old is not None:
        cSld.remove(old)
    bg = etree.fromstring(
        f'<p:bg {NS}><p:bgPr><a:solidFill><a:srgbClr val="{hexcolor}"/></a:solidFill><a:effectLst/></p:bgPr></p:bg>'
    )
    cSld.insert(0, bg)


def fill_layout(layout, name, shapes, pics, bg):
    layout._element.find(qn("p:cSld")).set("name", name)
    tree = layout.shapes._spTree
    for sp in list(tree):
        if sp.tag in (qn("p:sp"), qn("p:pic"), qn("p:graphicFrame"), qn("p:grpSp")):
            tree.remove(sp)
    for xml in shapes:
        tree.append(etree.fromstring(xml))
    set_bg(layout, bg)
    for path, x, y, d in pics:
        _, rid = layout.part.get_or_add_image_part(path)
        tree.append(etree.fromstring(
            f'<p:pic {NS}><p:nvPicPr><p:cNvPr id="{90 + len(tree)}" name="Logo mark" descr="VOANEVES mark"/>'
            f'<p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr userDrawn="1"/></p:nvPicPr>'
            f'<p:blipFill><a:blip r:embed="{rid}"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>'
            f'<p:spPr><a:xfrm><a:off x="{emu(x)}" y="{emu(y)}"/><a:ext cx="{emu(d)}" cy="{emu(d)}"/></a:xfrm>'
            f'<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr></p:pic>'))


def sldnum(idx, color, x=12.0, y=6.85):
    return ph_xml(idx, "sldNum", "Slide Number", x, y, 0.8, 0.3, 9, color, MONO, ph_idx=12, prompt="1", anchor="ctr").replace(
        "<a:r><a:rPr lang=\"en-US\"/><a:t>1</a:t></a:r>", '<a:fld id="{B6F15528-21DE-4FAA-801E-634DDDAF4B2B}" type="slidenum"><a:rPr lang="en-US"/><a:t>&#8249;#&#8250;</a:t></a:fld>'
    )


def build_pptx():
    prs = Presentation()
    prs.slide_width, prs.slide_height = Emu(W), Emu(H)
    prs.core_properties.author = "Victor Neves"
    prs.core_properties.title = "VOANEVES presentation template"

    # theme: colors and fonts
    master = prs.slide_master
    theme_part = None
    for rel in master.part.rels.values():
        if rel.reltype.endswith("/theme"):
            theme_part = rel.target_part
    xml = theme_part.blob.decode("utf-8")
    colors = dict(dk1=INK, lt1=CREAM, dk2="1A1A1A", lt2=CREAM_SOFT, accent1=SIGNAL, accent2=SIGNAL_INK,
                  accent3=MUTED, accent4=LINE, accent5=SAND, accent6="FF5A5A", hlink=SIGNAL_INK, folHlink=MUTED)
    for k, v in colors.items():
        xml = re.sub(rf"<a:{k}>.*?</a:{k}>", f'<a:{k}><a:srgbClr val="{v}"/></a:{k}>', xml, flags=re.S)
    xml = re.sub(r"(<a:majorFont>\s*<a:latin typeface=\")[^\"]*(\")", rf"\g<1>{DISPLAY}\2", xml)
    xml = re.sub(r"(<a:minorFont>\s*<a:latin typeface=\")[^\"]*(\")", rf"\g<1>{TEXT}\2", xml)
    xml = re.sub(r'<a:theme ([^>]*)name="[^"]*"', r'<a:theme \1name="VOANEVES"', xml, count=1)
    theme_part._blob = xml.encode("utf-8")

    # master: background + text styles
    mel = master._element
    cSld = mel.find(qn("p:cSld"))
    old = cSld.find(qn("p:bg"))
    if old is not None:
        cSld.remove(old)
    cSld.insert(0, etree.fromstring(f'<p:bg {NS}><p:bgPr><a:solidFill><a:srgbClr val="{CREAM}"/></a:solidFill><a:effectLst/></p:bgPr></p:bg>'))
    tx = mel.find(qn("p:txStyles"))
    for tag, font, sz, bold, ital in (("p:titleStyle", "+mj-lt", 40, True, True),):
        for lvl in tx.find(qn(tag)):
            pass
    title_style = tx.find(qn("p:titleStyle"))
    lvl1 = title_style.find(qn("a:lvl1pPr"))
    d = lvl1.find(qn("a:defRPr"))
    d.set("sz", "4000"); d.set("b", "1"); d.set("i", "1")
    for ch in list(d):
        d.remove(ch)
    d.append(etree.fromstring(f'<a:solidFill {NS}><a:srgbClr val="{INK}"/></a:solidFill>'))
    for t in ("latin", "ea", "cs"):
        d.append(etree.fromstring(f'<a:{t} {NS} typeface="+mj-lt"/>'))
    for tag in ("p:bodyStyle", "p:otherStyle"):
        for lvl in tx.find(qn(tag)):
            dr = lvl.find(qn("a:defRPr"))
            if dr is not None:
                for ch in list(dr):
                    if ch.tag in (qn("a:solidFill"),):
                        dr.remove(ch)
                dr.insert(0, etree.fromstring(f'<a:solidFill {NS}><a:srgbClr val="{INK}"/></a:solidFill>'))
    # strip master placeholders' own text formatting kept; reposition to margins
    for sh in master.shapes:
        if sh.is_placeholder:
            pt = sh.placeholder_format.type
            n = str(pt)
            if "TITLE" in n:
                sh.left, sh.top, sh.width, sh.height = Emu(emu(0.9)), Emu(emu(0.7)), Emu(emu(11.5)), Emu(emu(1.3))
            elif "BODY" in n:
                sh.left, sh.top, sh.width, sh.height = Emu(emu(0.9)), Emu(emu(2.2)), Emu(emu(11.5)), Emu(emu(4.2))

    layouts = list(prs.slide_layouts)
    # keep six layouts; drop the rest
    keep = layouts[:6]
    lst = master._element.find(qn("p:sldLayoutIdLst"))
    for lay in layouts[6:]:
        for lid in list(lst):
            if master.part.related_part(lid.get(qn("r:id"))) is lay.part:
                master.part.drop_rel(lid.get(qn("r:id")))
                lst.remove(lid)

    D = 0.5  # mark diameter, inches (clear space 0.25D is well inside the margins)
    ML = 0.9

    # 1 Title (ink)
    fill_layout(keep[0], "Title", [
        ph_xml(2, "ctrTitle", "Title", ML, 2.3, 10.5, 2.4, 72, CREAM, "+mj-lt", True, True, "Title of the deck", anchor="b"),
        ph_xml(3, "subTitle", "Subtitle", ML, 4.95, 9.5, 1.0, 20, SAND, prompt="One sentence that says what this is", ph_idx=1),
        wordmark_xml(6, ML + D + 0.15, 0.78 + 0.05, CREAM),
    ], [(MARK_REV, ML, 0.7, D)], INK)

    # 2 Section (ink, large number + title)
    fill_layout(keep[2], "Section", [
        ph_xml(2, "title", "Section title", ML, 2.6, 10.5, 2.2, 66, CREAM, "+mj-lt", True, True, "Section title", anchor="b"),
        ph_xml(3, "body", "Section number", ML, 1.9, 4, 0.5, 14, SIGNAL, MONO, True, False, "01 / Section", caps=True, spacing=300, ph_idx=1),
        sldnum(4, SAND),
    ], [(MARK_REV, 12.0, 0.6, D)], INK)

    # 3 Title + content
    fill_layout(keep[1], "Title and content", [
        ph_xml(2, "title", "Title", ML, 0.9, 11.5, 1.2, 40, INK, "+mj-lt", True, True, "Slide title states the point", anchor="t"),
        ph_xml(3, "body", "Content", ML, 2.4, 11.5, 4.0, 22, INK, prompt="Body text in Schibsted Grotesk. One idea per slide.", ph_idx=1,
               lvl_extra=bullets_lvl(INK, 22), bullet=True),
        sldnum(4, MUTED),
        wordmark_xml(5, ML + D + 0.15, 6.9 + 0.0, INK),
    ], [(MARK, ML, 6.85, 0.4)], CREAM)
    # 4 Two column
    fill_layout(keep[3], "Two columns", [
        ph_xml(2, "title", "Title", ML, 0.9, 11.5, 1.2, 40, INK, "+mj-lt", True, True, "Two columns, one comparison", anchor="t"),
        ph_xml(3, "body", "Left", ML, 2.4, 5.5, 4.0, 20, INK, prompt="Left column", ph_idx=1, lvl_extra=bullets_lvl(INK, 20), bullet=True),
        ph_xml(4, "body", "Right", ML + 6.0, 2.4, 5.5, 4.0, 20, INK, prompt="Right column", ph_idx=2, lvl_extra=bullets_lvl(INK, 20), bullet=True),
        sldnum(5, MUTED),
        wordmark_xml(6, ML + 0.4 + 0.15, 6.9, INK),
    ], [(MARK, ML, 6.85, 0.4)], CREAM)

    # 5 Quote / statement (signal ground, ink text; no logo on red)
    fill_layout(keep[4], "Quote or statement", [
        ph_xml(2, "title", "Statement", ML, 1.6, 11.0, 3.6, 54, INK, "+mj-lt", True, True, "One statement, set large.", anchor="ctr"),
        ph_xml(3, "body", "Attribution", ML, 5.6, 8, 0.5, 14, INK, MONO, True, False, "Name, role", caps=True, spacing=200, ph_idx=1),
    ], [], SIGNAL)

    # 6 Closing / contact (ink)
    fill_layout(keep[5], "Closing and contact", [
        ph_xml(2, "title", "Closing", ML, 1.6, 10.5, 2.4, 64, CREAM, "+mj-lt", True, True, "Let's talk.", anchor="b"),
        ph_xml(3, "body", "Contact", ML, 4.4, 9, 1.6, 20, CREAM, prompt="voaneves.com\nhello@voaneves.com", ph_idx=1),
        wordmark_xml(6, ML + D + 0.15, 6.2 + 0.05, CREAM),
    ], [(MARK_REV, ML, 6.2, D)], INK)
    # name layouts consistently
    for lay, nm in zip(keep, ("Title", "Title and content", "Section", "Two columns", "Quote or statement", "Closing and contact")):
        lay._element.find(qn("p:cSld")).set("name", nm)

    L = {l.name: l for l in prs.slide_layouts}
    def add(name):
        return prs.slides.add_slide(L[name])
    s = add("Title"); s.shapes.title.text = "VOANEVES presentation"; s.placeholders[1].text = "Signal, not noise. Replace this line."
    s = add("Section"); s.shapes.title.text = "Section title"; s.placeholders[1].text = "01 / Section"
    s = add("Title and content"); s.shapes.title.text = "One slide, one point"
    s.placeholders[1].text = "Short bullet one"
    for t in ("Short bullet two", "Sinal red only as an accent"):
        s.placeholders[1].text_frame.add_paragraph().text = t
    s = add("Two columns"); s.shapes.title.text = "Two columns, one comparison"
    s.placeholders[1].text = "Left point"; s.placeholders[2].text = "Right point"
    s = add("Quote or statement"); s.shapes.title.text = "Problem well solved has a signature."; s.placeholders[1].text = "Victor Neves, designer and developer"
    s = add("Closing and contact"); s.shapes.title.text = "Let's talk."; s.placeholders[1].text = "voaneves.com"
    prs.save(os.path.join(OUT, "voaneves-presentation.pptx"))


# ------------------------------------------------------------------- XLSX
def build_xlsx():
    from openpyxl import Workbook
    from openpyxl.chart import BarChart, Reference
    from openpyxl.drawing.image import Image as XImage
    from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
    from openpyxl.workbook.defined_name import DefinedName
    from openpyxl.worksheet.table import Table, TableStyleInfo

    wb = Workbook()
    ws = wb.active
    ws.title = "Data"
    ws.sheet_properties.tabColor = SIGNAL
    hdr_font = Font(name=MONO, size=10, bold=True, color=CREAM)
    hdr_fill = PatternFill("solid", fgColor=INK)
    body = Font(name=TEXT, size=11, color=INK)
    mono = Font(name=MONO, size=10, color=INK)
    band = PatternFill("solid", fgColor=CREAM_SOFT)
    thin = Side(style="thin", color=LINE)

    heads = ["Month", "Project", "Hours", "Rate (BRL)", "Revenue (BRL)", "Margin"]
    data = [
        ("2026-01-01", "Site redesign", 42, 180, 0.62),
        ("2026-02-01", "Dashboard BI", 55, 200, 0.58),
        ("2026-03-01", "Maintenance", 20, 150, 0.71),
        ("2026-04-01", "Design system", 64, 190, 0.66),
        ("2026-05-01", "Landing page", 28, 170, 0.60),
        ("2026-06-01", "Data automation", 48, 210, 0.64),
    ]
    import datetime
    for c, h in enumerate(heads, start=1):
        cell = ws.cell(row=1, column=c, value=h.upper())
        cell.font, cell.fill = hdr_font, hdr_fill
        cell.alignment = Alignment(horizontal="left" if c <= 2 else "right", vertical="center")
    ws.row_dimensions[1].height = 26
    for i, (m, p, h, r, mg) in enumerate(data, start=2):
        y, mo, d = map(int, m.split("-"))
        ws.cell(i, 1, datetime.date(y, mo, d)).number_format = "mmm yyyy"
        ws.cell(i, 2, p)
        ws.cell(i, 3, h).number_format = "#,##0"
        ws.cell(i, 4, r).number_format = '"R$" #,##0.00'
        ws.cell(i, 5, f"=C{i}*D{i}").number_format = '"R$" #,##0.00'
        ws.cell(i, 6, mg).number_format = "0.0%"
        for c in range(1, 7):
            cell = ws.cell(i, c)
            cell.font = mono if c in (3, 4, 5, 6) else body
            cell.alignment = Alignment(horizontal="left" if c <= 2 else "right", vertical="center")
            cell.border = Border(bottom=thin)
            if i % 2 == 1:
                cell.fill = band
    last = len(data) + 1
    tr = last + 1
    ws.cell(tr, 1, "Total").font = Font(name=TEXT, size=11, bold=True, color=INK)
    ws.cell(tr, 3, f"=SUM(C2:C{last})").number_format = "#,##0"
    ws.cell(tr, 5, f"=SUM(E2:E{last})").number_format = '"R$" #,##0.00'
    ws.cell(tr, 6, f"=AVERAGE(F2:F{last})").number_format = "0.0%"
    for c in range(1, 7):
        cell = ws.cell(tr, c)
        cell.border = Border(top=Side(style="medium", color=INK))
        if c > 1:
            cell.font = Font(name=MONO, size=10, bold=True, color=INK)
            cell.alignment = Alignment(horizontal="right")
    for col, w in zip("ABCDEF", (14, 26, 12, 16, 18, 12)):
        ws.column_dimensions[col].width = w
    ws.freeze_panes = "A2"
    ws.sheet_view.showGridLines = False
    ws.auto_filter.ref = f"A1:F{last}"
    wb.defined_names["ChartData"] = DefinedName("ChartData", attr_text=f"Data!$A$1:$A${last},Data!$E$1:$E${last}")
    ws.page_setup.orientation = "landscape"
    ws.print_title_rows = "1:1"

    # chart sheet
    cs = wb.create_sheet("Chart")
    cs.sheet_view.showGridLines = False
    cs["A1"] = "REVENUE BY MONTH"
    cs["A1"].font = Font(name=MONO, size=10, bold=True, color=MUTED)
    ch = BarChart()
    ch.type = "col"
    ch.title = None
    ch.add_data(Reference(ws, min_col=5, min_row=1, max_row=last), titles_from_data=True)
    ch.set_categories(Reference(ws, min_col=1, min_row=2, max_row=last))
    ch.series[0].graphicalProperties.solidFill = SIGNAL
    ch.series[0].graphicalProperties.line.noFill = True
    ch.legend = None
    ch.y_axis.numFmt = '"R$" #,##0'
    ch.y_axis.majorGridlines.spPr = None
    ch.x_axis.number_format = "mmm"
    ch.x_axis.delete = False
    ch.y_axis.delete = False
    ch.height, ch.width = 9, 18
    cs.add_chart(ch, "A3")

    # guide sheet
    g = wb.create_sheet("Guide")
    g.sheet_view.showGridLines = False
    g.column_dimensions["A"].width = 22
    g.column_dimensions["B"].width = 14
    g.column_dimensions["C"].width = 60
    img = XImage(MARK)
    img.width = img.height = 48
    g.add_image(img, "A1")
    g["B1"] = "VOANEVES."
    g["B1"].font = Font(name=MONO, size=14, bold=True, color=INK)
    g["A3"] = "How to use this template"
    g["A3"].font = Font(name=DISPLAY, size=18, bold=True, italic=True, color=INK)
    rows = [
        ("Header row", "Ink fill, Creme text, JetBrains Mono caps. Frozen, filtered."),
        ("Body", "Schibsted Grotesk for text, JetBrains Mono for numbers."),
        ("Formats", "Dates mmm yyyy, currency R$ #,##0.00, percent 0.0%, integers #,##0."),
        ("Chart range", "Named range ChartData (Month + Revenue). Series color: Sinal."),
        ("Install fonts", "Fraunces, Schibsted Grotesk and JetBrains Mono (see fonts/ in the brand repo)."),
    ]
    for i, (a, b) in enumerate(rows, start=5):
        g.cell(i, 1, a).font = Font(name=TEXT, size=11, bold=True, color=INK)
        g.cell(i, 3, b).font = Font(name=TEXT, size=11, color=INK)
    g["A11"] = "Palette"
    g["A11"].font = Font(name=MONO, size=10, bold=True, color=MUTED)
    for i, (nm, hx, fg) in enumerate((("Tinta", INK, CREAM), ("Creme", CREAM, INK), ("Creme soft", CREAM_SOFT, INK),
                                       ("Sinal", SIGNAL, INK), ("Signal ink", SIGNAL_INK, CREAM), ("Muted", MUTED, CREAM)), start=12):
        a = g.cell(i, 1, nm)
        a.fill = PatternFill("solid", fgColor=hx)
        a.font = Font(name=MONO, size=10, bold=True, color=fg)
        b = g.cell(i, 2, "#" + hx.lower())
        b.font = Font(name=MONO, size=10, color=INK)

    wb.properties.creator = "Victor Neves"
    wb.properties.title = "VOANEVES sheet template"
    wb.save(os.path.join(OUT, "voaneves-sheet.xlsx"))


if __name__ == "__main__":
    which = sys.argv[1:] or ["docx", "pptx", "xlsx"]
    if "docx" in which:
        build_docx()
    if "pptx" in which:
        build_pptx()
    if "xlsx" in which:
        build_xlsx()
    print("ok", which)
