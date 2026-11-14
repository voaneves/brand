import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ICONS_SRC = path.join(ROOT, 'icons', 'svg');
const ICONS_DIST = path.join(ROOT, 'dist', 'icons');
const LOGO_SRC = path.join(ROOT, 'logo');
const LOGO_DIST = path.join(ROOT, 'dist', 'logo');
const APP_ICONS_SRC = path.join(ROOT, 'app-icons');
const APP_ICONS_DIST = path.join(ROOT, 'dist', 'app-icons');

// Concept B (Sinal) canonical cutout V vertices on the 512x512 grid.
const V_POLYGON = [
  [142, 148],
  [214, 148],
  [250, 244],
  [286, 148],
  [358, 148],
  [277, 364],
  [223, 364],
];

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i += 1) {
    crc = CRC_TABLE[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function encodeRgbaPng(width, height, rgba) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const rowStart = y * (stride + 1);
    raw[rowStart] = 0; // filter type 0 (None)
    rgba.copy(raw, rowStart + 1, y * stride, (y + 1) * stride);
  }

  const compressed = zlib.deflateSync(raw, { level: 9 });
  return Buffer.concat([
    signature,
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', compressed),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

function pointInPolygon(x, y, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    const intersect = (yi > y) !== (yj > y)
      && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function renderSinalPng(size, { background = null, scale = 1 } = {}) {
  const rgba = Buffer.alloc(size * size * 4);
  const sub = 4;
  const invSubSq = 1 / (sub * sub);
  const half = size / 2;
  const discBg = background ?? [0, 0, 0, 0];

  for (let py = 0; py < size; py += 1) {
    for (let px = 0; px < size; px += 1) {
      let rAcc = 0;
      let gAcc = 0;
      let bAcc = 0;
      let aAcc = 0;

      for (let sy = 0; sy < sub; sy += 1) {
        const cy = py + (sy + 0.5) / sub;
        const v = ((cy - half) / (size * scale)) * 512 + 256;
        for (let sx = 0; sx < sub; sx += 1) {
          const cx = px + (sx + 0.5) / sub;
          const u = ((cx - half) / (size * scale)) * 512 + 256;

          const du = u - 256;
          const dv = v - 256;
          const inDisc = du * du + dv * dv <= 256 * 256;

          const ru = u - 340;
          const rv = v - 337;
          const inDot = ru * ru + rv * rv <= 27 * 27;

          let sample = discBg;
          if (inDot) {
            sample = [245, 0, 0, 255];
          } else if (inDisc && !pointInPolygon(u, v, V_POLYGON)) {
            sample = [10, 10, 10, 255];
          }

          const alpha = sample[3] / 255;
          rAcc += sample[0] * alpha;
          gAcc += sample[1] * alpha;
          bAcc += sample[2] * alpha;
          aAcc += sample[3];
        }
      }

      const outA = aAcc * invSubSq;
      const idx = (py * size + px) * 4;
      if (outA > 0) {
        const norm = 255 / outA;
        rgba[idx] = Math.round(rAcc * invSubSq * norm);
        rgba[idx + 1] = Math.round(gAcc * invSubSq * norm);
        rgba[idx + 2] = Math.round(bAcc * invSubSq * norm);
        rgba[idx + 3] = Math.round(outA);
      }
    }
  }

  return encodeRgbaPng(size, size, rgba);
}

function encodeIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type = ICO
  header.writeUInt16LE(entries.length, 4);

  const dirEntries = [];
  let offset = 6 + entries.length * 16;

  for (const { size, png } of entries) {
    const dir = Buffer.alloc(16);
    dir[0] = size >= 256 ? 0 : size;
    dir[1] = size >= 256 ? 0 : size;
    dir[2] = 0; // palette count
    dir[3] = 0; // reserved
    dir.writeUInt16LE(1, 4); // color planes
    dir.writeUInt16LE(32, 6); // bits per pixel
    dir.writeUInt32LE(png.length, 8);
    dir.writeUInt32LE(offset, 12);
    dirEntries.push(dir);
    offset += png.length;
  }

  return Buffer.concat([header, ...dirEntries, ...entries.map((e) => e.png)]);
}

function extractSvgInner(svgText) {
  const stripped = svgText.replace(/<!--[\s\S]*?-->/g, '').trim();
  const match = stripped.match(/^<svg\b([^>]*)>([\s\S]*)<\/svg>$/i);
  if (!match) {
    throw new Error('Invalid normalized SVG markup');
  }
  const attrs = match[1];
  const inner = match[2].trim();
  const vbMatch = attrs.match(/viewBox="([^"]+)"/i);
  const viewBox = vbMatch ? vbMatch[1] : '0 0 1024 1024';
  return { viewBox, inner };
}

export async function buildIcons() {
  await fs.mkdir(ICONS_DIST, { recursive: true });
  await fs.mkdir(LOGO_DIST, { recursive: true });
  await fs.mkdir(APP_ICONS_SRC, { recursive: true });
  await fs.mkdir(APP_ICONS_DIST, { recursive: true });

  // 1. Copy individual SVGs and assemble sprite.svg
  const iconFiles = (await fs.readdir(ICONS_SRC))
    .filter((f) => f.endsWith('.svg'))
    .sort();

  const symbols = [];
  for (const file of iconFiles) {
    const name = file.replace(/\.svg$/i, '');
    const raw = await fs.readFile(path.join(ICONS_SRC, file), 'utf8');
    await fs.writeFile(path.join(ICONS_DIST, file), raw, 'utf8');
    const { viewBox, inner } = extractSvgInner(raw);
    symbols.push(`  <symbol id="vn-icon-${name}" viewBox="${viewBox}">${inner}</symbol>`);
  }

  const sprite = [
    '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">',
    ...symbols,
    '</svg>',
    '',
  ].join('\n');
  await fs.writeFile(path.join(ICONS_DIST, 'sprite.svg'), sprite, 'utf8');

  // 2. Copy canonical logo/*.svg -> dist/logo/*.svg
  const logoFiles = (await fs.readdir(LOGO_SRC))
    .filter((f) => f.endsWith('.svg'))
    .sort();
  for (const file of logoFiles) {
    await fs.copyFile(path.join(LOGO_SRC, file), path.join(LOGO_DIST, file));
  }

  // 3. Build Concept B app-icons suite in app-icons/ and copy to dist/app-icons/
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="voaneves">
  <style>
    .disc { fill: #0a0a0a; }
    .dot { fill: #f50000; }
    @media (prefers-color-scheme: dark) {
      .disc { fill: #ffffff; }
    }
  </style>
  <path class="disc" fill-rule="evenodd" d="M0 256a256 256 0 1 0 512 0a256 256 0 1 0-512 0ZM142 148L214 148L250 244L286 148L358 148L277 364L223 364Z"/>
  <circle class="dot" cx="340" cy="337" r="27"/>
</svg>\n`;

  const ico16 = renderSinalPng(16);
  const ico32 = renderSinalPng(32);
  const ico48 = renderSinalPng(48);
  const faviconIco = encodeIco([
    { size: 16, png: ico16 },
    { size: 32, png: ico32 },
    { size: 48, png: ico48 },
  ]);

  const appleTouchPng = renderSinalPng(180, {
    background: [255, 248, 248, 255],
    scale: 0.78,
  });
  const icon192Png = renderSinalPng(192);
  const icon512Png = renderSinalPng(512);
  const maskable512Png = renderSinalPng(512, {
    background: [255, 248, 248, 255],
    scale: 0.7,
  });

  const outputs = [
    ['favicon.svg', faviconSvg],
    ['favicon.ico', faviconIco],
    ['apple-touch-icon.png', appleTouchPng],
    ['icon-192.png', icon192Png],
    ['icon-512.png', icon512Png],
    ['maskable-512.png', maskable512Png],
  ];

  for (const [name, content] of outputs) {
    await fs.writeFile(path.join(APP_ICONS_SRC, name), content);
    await fs.writeFile(path.join(APP_ICONS_DIST, name), content);
  }

  return { iconCount: iconFiles.length, logoCount: logoFiles.length, appIconCount: outputs.length };
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
if (isCli) {
  const result = await buildIcons();
  console.log(`Built ${result.iconCount} icons + sprite, ${result.logoCount} logos, ${result.appIconCount} app icons.`);
}
