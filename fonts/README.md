# fonts

- `source/` holds the upstream variable TTFs and each family's `OFL.txt` (see `source/SOURCES.md`). They are not published.
- The generated woff2 subsets land in `fonts/` in M1 via `scripts/build-fonts.mjs`.
- OFL 1.1: ship each family's `OFL.txt` with any distributed subset. A subset is a Modified Version; none of the three families declares a Reserved Font Name, so the original names may be kept.
