# templates

Brand templates for Word, PowerPoint and Excel. Regenerate with `python scripts/build-templates.py` (needs `python-docx`, `python-pptx`, `openpyxl`, `pillow`).

## Web and mail assets

| File | Contents |
|---|---|
| `og-image.html` / `og-image.png` | 1200x630 Open Graph and social card on Tinta: mark, wordmark, label, headline, footer. Edit the HTML (fonts load from `../fonts/`), then export with `chrome --headless --window-size=1200,630 --screenshot=og-image.png og-image.html`. Keep the headline to two lines. |
| `email-signature.html` | Table-based signature with inline styles and web-safe font fallbacks (Georgia, Arial, Courier New), signal rule, hosted PNG mark. Copy the table into Gmail, Outlook or Apple Mail settings; replace `[email]`. Contrast: ink and `#b80000` links on white pass AA. |
| `assets/` | PNG marks (standard and reverse, 192 px) used by the files above. |

## Install the fonts first

The files reference fonts by name and do not embed them. Install Fraunces, Schibsted Grotesk and JetBrains Mono from `fonts/source/` (OFL) before opening a template; without them Office falls back to a default font and the layout shifts.

## Files

| File | Contents |
|---|---|
| `voaneves-document.docx` | A4 document. Title page with the mark; styles Title, Heading 1 to 3 (Fraunces), Normal and lists (Schibsted Grotesk), Code and Code Inline (JetBrains Mono), Quote, Callout, Caption, Label; header with the mark and wordmark; footer with page numbers; a sample table. |
| `voaneves-presentation.pptx` | 16:9 master on Creme with six layouts: Title, Title and content, Section, Two columns, Quote or statement, Closing and contact. Theme colors are Tinta, Creme, Sinal and its neighbors; theme fonts are Fraunces (headings) and Schibsted Grotesk (body). One sample slide per layout. |
| `voaneves-sheet.xlsx` | Sheets Data, Chart and Guide. Ink header row (frozen, filtered), banded rows, number formats for date, currency (R$), percent and integers, a total row, a named range `ChartData` and a Sinal bar chart. |

## Use

- **Word:** open the file, replace the sample text, keep the styles (Home > Styles). Update the header title. Save as `.docx` or export to PDF.
- **PowerPoint:** open the file, use Home > New Slide to pick a layout, delete the sample slides. Insert > Slide Number adds the number on layouts that carry it. To make it a reusable template, save as `.potx`.
- **Excel:** replace the sample rows in `Data` (keep the header row), extend the table and `ChartData`. The `Guide` sheet lists the palette.
- **Google Docs, Slides, Sheets:** upload to Drive and open with Google. Fonts that Google offers (Fraunces, Schibsted Grotesk, JetBrains Mono) are mapped by name; styles and layouts carry over, but some effects (paragraph borders, theme colors) can be approximated. Check the result.

## Rules

- Color: Tinta and Creme grounds, Sinal as the single accent. Text on Sinal is ink, never white.
- The logo follows `docs/03-logo.md`: clear space 0.25 of the disc, 8 mm minimum in print, reverse mark on dark, no standard mark on Sinal (the quote layout carries no logo).

## License

The templates are for VOANEVES use. They contain the logo, which stays all rights reserved (see `../LICENSES.md`); the layout and styles are MIT.
