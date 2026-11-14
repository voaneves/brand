# C. Monograma

## Idea
A VN monogram on a chamfered square tile, like a machined part or a title block. Letters are monoline and set on a 8-unit grid, with a dimension line under them (the drawing-sheet reference) and a square full stop in Sinal, as JetBrains Mono draws the period. The mark and the wordmark share one language.

## Construction (viewBox 512, 8-unit grid)
- Tile: 512 square, all four corners chamfered 40 units at 45 degrees.
- Letters: cap height 224 (y 112 to 336). Each letter is 160 wide. V at x 56 to 216, N at x 232 to 392, gap 16.
- V: arm thickness 44, edges at 1:4 (14 degrees), flat bottom 48 wide, counter ends 144 below the top.
- N: stems 40, diagonal 51 (horizontal), diagonal edges at 3:8 (the brand angle), notch depth 40.
- Full stop: 40 by 40 square at (416, 296), baseline aligned with the letters.
- Dimension line: 8 thick from x 56 to 392 at y 380 to 388, end ticks 8 by 32.

## Clear space and minimum size
- Clear space: 0.125 side (64 units), i.e. one chamfer plus a margin.
- Minimum: 16 px. The letters stay readable (1.25 px strokes). The dimension line is decoration and fades below about 32 px.

## Why it fits
Most literal of the three about who he is: engineer-turned-designer, initials first, drawing-sheet details. Reads at 16 px as "VN". It breaks away from the disc, so it gives the system a second shape (tile) for avatars and app icons while the wordmark stays in the lockup.

## Risks
- Square tile conflicts with A1 and A8, which assume a disc (nav, footer, favicon, credit). Choosing C means redoing those rules.
- Two letters are less ownable than a symbol, and "VN" is a common pair. The chamfer, dimension line and square stop do the distinguishing.
- The dimension line adds detail that disappears at small sizes; keep it out of the favicon.
