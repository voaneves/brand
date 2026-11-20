# Chip (`.vn-chip`)

Etiqueta compacta e não interativa para tags, tecnologias e categorias (ex.: "Astro", "BI"). Se for clicável, use um botão ou link com o mesmo visual e alvo de `44px`.

## Anatomia

- `.vn-chip`: altura `--vn-chip-height` (`32px`), raio `--vn-chip-radius` (pill), borda `--vn-line`, fundo `--vn-surface-raised`.
- Tipografia `tag` (mono, maiúscula, tracking `0.2em`) em `--vn-text-muted`.

## Teclado e movimento

Não focável; sem animação.

## Contraste

`--vn-text-muted` sobre `--vn-surface-raised` >= 4.5:1 (claro e escuro).
