# 07 — Iconografia e Motivos

Conjunto curado de **19 ícones** normalizados em `viewBox="0 0 1024 1024"`, com `fill="currentColor"` e empacotados em sprite único (`dist/icons/sprite.svg`).

## Catálogo de Ícones

`adjust`, `blog`, `briefcase`, `calendar-check`, `cloud-download`, `comments`, `envelope-open`, `gamepad`, `github`, `globe`, `graduation-cap`, `home`, `linkedin`, `paper-plane`, `refresh`, `translate`, `user`, `whatsapp`, `youtube`.

## Uso Recomendado

- Consumir via `<Icon name="..." />` (`@voaneves/brand/astro/Icon.astro`) apontando para `#vn-icon-<name>`.
- Omitir `label` para ícones decorativos (`aria-hidden="true"`); fornecer `label` descritivo em botões apenas com ícone.

## Motivos Auxiliares

- `motifs/services_wave.svg`: Onda divisória da seção de serviços.
- `motifs/timeline_wave.svg`: Onda estrutural da linha do tempo profissional.
