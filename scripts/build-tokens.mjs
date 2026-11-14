// Builds every token output from the DTCG sources in tokens/src with Style Dictionary 5.
//   dist/css/tokens.css   custom properties (light-dark() for themed colors)
//   dist/css/type.css     .vn-type-<style> utility classes
//   dist/tokens.js, dist/tokens.d.ts, dist/tokens.json   resolved values, both themes
//   dist/board/tokens.json   Claude board grammar (list families, resolved values)
// Run: npm run build:tokens
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import StyleDictionary from 'style-dictionary';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(ROOT);

const THEMES = ['light', 'dark'];

// ---------------------------------------------------------------- token model

const isAlias = (v) => typeof v === 'string' && /^\{[^{}]+\}$/.test(v);
const aliasKey = (v) => v.slice(1, -1);

function buildModel(allTokens) {
  const tiers = { ref: 0, sys: 1, component: 2 };
  const tokens = allTokens.map((t) => {
    const tier = /(?:^|[\\/])tokens[\\/]src[\\/](ref|sys|component)[\\/]/.exec(t.filePath)?.[1];
    if (!tier) throw new Error(`Cannot tell the tier of ${t.filePath}`);
    const path = t.path.filter((s) => s !== '$root');
    let cssPath = path;
    if (tier === 'ref') {
      // ref.color.red.600 -> ref-red-600 (only the color segment is dropped)
      const rest = path.slice(1);
      cssPath = ['ref', ...(rest[0] === 'color' ? rest.slice(1) : rest)];
    } else if (tier === 'sys' && path[0] === 'color') {
      cssPath = path.slice(1);
    }
    const vn = t.original.$extensions?.vn ?? {};
    return {
      tier,
      order: tiers[tier],
      path,
      type: t.$type ?? t.original.$type,
      raw: t.original.$value,
      dark: vn.dark,
      vn,
      description: t.original.$description ?? '',
      name: ['vn', ...cssPath].join('-'), // without leading "--"
    };
  });
  tokens.sort((a, b) => a.order - b.order); // stable: file order inside a tier
  const byPath = new Map();
  const names = new Map();
  for (const t of tokens) {
    byPath.set(t.path.join('.'), t);
    if (names.has(t.name)) throw new Error(`Duplicate CSS name --${t.name} (${names.get(t.name)} / ${t.path.join('.')})`);
    names.set(t.name, t.path.join('.'));
  }
  return { tokens, byPath };
}

// ---------------------------------------------------------------- value conversion

const num = (n) => String(Number(Number(n).toFixed(4)));
const unit = (d) => `${num(d.value)}${d.unit}`;

function colorStr(c) {
  if (c.alpha === undefined || c.alpha === 1) return c.hex.toLowerCase();
  const [r, g, b] = hexToRgb(c.hex);
  return `rgba(${r}, ${g}, ${b}, ${num(c.alpha)})`;
}
export function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}
const family = (v) =>
  v.map((f) => (/\s/.test(f) ? `"${f}"` : f)).join(', ');

/**
 * Converts one raw DTCG value into a CSS-ish value.
 * ctx.refs: aliases become var(--vn-...) (CSS); otherwise they are followed (resolved values).
 */
function makeConverter(model) {
  const lookup = (key) => {
    const t = model.byPath.get(key);
    if (!t) throw new Error(`Unresolved alias {${key}}`);
    return t;
  };
  const rawFor = (t, theme) => (theme === 'dark' && t.dark !== undefined ? t.dark : t.raw);

  function conv(t, raw, ctx) {
    if (isAlias(raw)) {
      const target = lookup(aliasKey(raw));
      return ctx.refs ? `var(--${target.name})` : conv(target, rawFor(target, ctx.theme), ctx);
    }
    switch (t.type) {
      case 'color':
        return colorStr(raw);
      case 'dimension':
      case 'duration':
        return unit(raw);
      case 'number':
        return t.vn.unit ? `${num(raw)}${t.vn.unit}` : raw;
      case 'cubicBezier':
        return `cubic-bezier(${raw.map(num).join(',')})`;
      case 'fontFamily':
        return Array.isArray(raw) ? family(raw) : raw;
      case 'fontWeight':
        return raw;
      case 'shadow':
        return shadowStr(t, raw, ctx);
      default:
        throw new Error(`Unsupported $type "${t.type}" at ${t.path.join('.')}`);
    }
  }

  const shadowPart = (s, ctx) => {
    const c = isAlias(s.color) ? conv({ type: 'color', vn: {} }, s.color, ctx) : colorStr(s.color);
    return { geo: [s.offsetX, s.offsetY, s.blur, s.spread].map(unit).join(' '), c };
  };
  function shadowStr(t, raw, ctx) {
    if (ctx.refs) {
      // Aliased shadow -> var(); literal shadow carries its dark color through light-dark().
      if (isAlias(raw)) return conv(t, raw, ctx);
      const light = shadowPart(t.raw, ctx);
      if (t.dark === undefined) return `${light.geo} ${light.c}`;
      const dark = shadowPart(t.dark, ctx);
      if (light.geo !== dark.geo) throw new Error(`Shadow ${t.path.join('.')}: dark geometry differs; unsupported`);
      return `${light.geo} ${light.c === dark.c ? light.c : `light-dark(${light.c}, ${dark.c})`}`;
    }
    const p = shadowPart(raw, ctx);
    return `${p.geo} ${p.c}`;
  }

  // Type composite -> plain description with every member resolved.
  function typeStyle(t, ctx) {
    const v = t.raw;
    const vn = t.vn;
    const fam = isAlias(v.fontFamily)
      ? ctx.refs
        ? `var(--${lookup(aliasKey(v.fontFamily)).name})`
        : conv(lookup(aliasKey(v.fontFamily)), lookup(aliasKey(v.fontFamily)).raw, ctx)
      : family(v.fontFamily);
    let weight = v.fontWeight;
    if (isAlias(weight)) {
      const w = lookup(aliasKey(weight));
      weight = ctx.refs ? `var(--${w.name})` : w.raw;
    }
    return {
      family: fam,
      size: unit(v.fontSize),
      fluid: vn.fluid ?? null,
      lineHeight: v.lineHeight,
      weight,
      tracking: vn.tracking ?? unit(v.letterSpacing),
      style: vn.italic ? 'italic' : 'normal',
      transform: vn.uppercase ? 'uppercase' : 'none',
      opsz: vn.opsz ?? null,
      group: vn.group ?? null,
      sample: vn.sample ?? null,
    };
  }

  return { conv, typeStyle, lookup, rawFor };
}

// ---------------------------------------------------------------- CSS

function cssDecls(model, c) {
  const out = [];
  const reduced = [];
  for (const t of model.tokens) {
    if (t.type === 'typography') {
      const s = c.typeStyle(t, { refs: true });
      const p = `--${t.name}`;
      out.push([`${p}-size`, s.fluid ?? s.size]);
      out.push([`${p}-line-height`, s.lineHeight]);
      out.push([`${p}-weight`, s.weight]);
      out.push([`${p}-tracking`, s.tracking]);
      out.push([`${p}-family`, s.family]);
      out.push([`${p}-style`, s.style]);
      out.push([`${p}-transform`, s.transform]);
      if (s.opsz !== null) out.push([`${p}-opsz`, s.opsz]);
      continue;
    }
    let value;
    if (t.type === 'color' && !isAlias(t.raw) === false && t.dark === undefined) {
      value = c.conv(t, t.raw, { refs: true, theme: 'light' });
    } else if (t.type === 'color') {
      const l = c.conv(t, t.raw, { refs: true, theme: 'light' });
      const d = t.dark === undefined ? l : c.conv(t, t.dark, { refs: true, theme: 'dark' });
      value = l === d ? l : `light-dark(${l}, ${d})`;
    } else {
      value = c.conv(t, t.raw, { refs: true, theme: 'light' });
    }
    out.push([`--${t.name}`, value]);
    if (t.path[0] === 'dur' && t.tier === 'sys') reduced.push(`--${t.name}`);
  }
  return { out, reduced };
}

function formatTokensCss(model, c, reducedValue) {
  const { out, reduced } = cssDecls(model, c);
  const lines = out.map(([k, v]) => `    ${k}: ${v};`).join('\n');
  const rm = reduced.length
    ? `\n  @media (prefers-reduced-motion: reduce) {\n    :root {\n${reduced
        .map((k) => `      ${k}: ${reducedValue};`)
        .join('\n')}\n    }\n  }\n`
    : '';
  return `/* Generated by scripts/build-tokens.mjs from tokens/src. Do not edit. */
@layer vn.tokens {
  :root {
    color-scheme: light dark;
${lines}
  }
  [data-theme="light"] { color-scheme: light; }
  [data-theme="dark"] { color-scheme: dark; }
${rm}}
`;
}

function formatTypeCss(model, c) {
  const rules = model.tokens
    .filter((t) => t.type === 'typography')
    .map((t) => {
      const p = `var(--${t.name}`;
      const s = c.typeStyle(t, { refs: true });
      const decls = [
        `font-family: ${p}-family)`,
        `font-size: ${p}-size)`,
        `line-height: ${p}-line-height)`,
        `font-weight: ${p}-weight)`,
        `letter-spacing: ${p}-tracking)`,
        `font-style: ${p}-style)`,
        `text-transform: ${p}-transform)`,
      ];
      if (s.opsz !== null) decls.push(`font-variation-settings: "opsz" ${p}-opsz)`);
      return `  .${t.name.replace(/^vn-type-/, 'vn-type-')} {\n${decls.map((d) => `    ${d};`).join('\n')}\n  }`;
    });
  return `/* Generated by scripts/build-tokens.mjs from tokens/src. Do not edit. */
@layer vn.type {
${rules.join('\n')}
}
`;
}

// ---------------------------------------------------------------- resolved data

/** Resolved description of one token for JSON/JS output. */
function resolvedValue(t, c) {
  if (t.type === 'typography') {
    const s = c.typeStyle(t, { refs: false });
    return { value: s };
  }
  const light = c.conv(t, t.raw, { refs: false, theme: 'light' });
  const dark = c.conv(t, t.dark !== undefined ? t.dark : t.raw, { refs: false, theme: 'dark' });
  if (t.type === 'color') return { value: light, dark };
  if (dark !== light) return { value: light, dark };
  return { value: light };
}

function formatTokensJson(model, c) {
  const root = {};
  for (const t of model.tokens) {
    const r = resolvedValue(t, c);
    let node = root;
    for (const seg of t.path.slice(0, -1)) node = node[seg] ??= {};
    const leaf = { $type: t.type, $value: r.value };
    if (r.dark !== undefined) leaf.$dark = r.dark;
    leaf.$name = `--${t.name}`;
    leaf.$description = t.description;
    const last = t.path.at(-1);
    if (node[last] && !node[last].$value) node[last].$root = leaf; // group already exists
    else if (node[last]) throw new Error(`Path clash at ${t.path.join('.')}`);
    else node[last] = t.hasChildren ? { $root: leaf } : leaf;
  }
  return JSON.stringify(root, null, 2) + '\n';
}

function flatValues(model, c) {
  const flat = {};
  for (const t of model.tokens) {
    const r = resolvedValue(t, c);
    const key = t.name.replace(/^vn-/, '');
    flat[key] = r.dark !== undefined ? { light: r.value, dark: r.dark } : r.value;
  }
  return flat;
}

function formatJs(flat) {
  return `// Generated by scripts/build-tokens.mjs from tokens/src. Do not edit.
// Keys are the CSS custom property names without the leading "--vn-".
// Themed values (every color, plus shadows with a dark variant) are { light, dark }.
export const tokens = ${JSON.stringify(flat, null, 2)};
export default tokens;
`;
}

function tsType(v) {
  if (v === null) return 'null';
  if (typeof v === 'string') return JSON.stringify(v);
  if (typeof v === 'number') return String(v);
  if (typeof v === 'boolean') return String(v);
  if (typeof v === 'object') {
    return `{ ${Object.entries(v)
      .map(([k, x]) => `readonly ${/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)}: ${tsType(x)}`)
      .join('; ')} }`;
  }
  throw new Error('bad type');
}
const widen = (s) => s; // literal types are intentional: values are constants

function formatDts(flat) {
  const body = Object.entries(flat)
    .map(([k, v]) => `  readonly ${JSON.stringify(k)}: ${widen(tsType(v))};`)
    .join('\n');
  return `// Generated by scripts/build-tokens.mjs from tokens/src. Do not edit.
export declare const tokens: {
${body}
};
export type TokenName = keyof typeof tokens;
export default tokens;
`;
}

// ---------------------------------------------------------------- board

const BOARD_NAME = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,63}$/;

function formatBoard(model, c) {
  const bare = (t) => t.name.replace(/^vn-/, '');
  const list = (arr) => ({ tokens: arr });
  const usage = (t) => t.description.slice(0, 1000);
  const rv = (t) => resolvedValue(t, c);

  const colors = [];
  for (const t of model.tokens) {
    if (t.type !== 'color') continue;
    if (t.tier === 'component') continue;
    const r = rv(t);
    // palette (ref) names drop the "ref-" prefix; sys names stay as is
    const name = t.tier === 'ref' ? bare(t).replace(/^ref-/, '') : bare(t);
    colors.push({ name, value: { light: r.value, dark: r.dark }, usage: usage(t) });
  }

  const sysBy = (pred, mapVal) =>
    model.tokens
      .filter((t) => t.tier === 'sys' && pred(t))
      .map((t) => {
        const r = rv(t);
        return { name: bare(t), value: mapVal ? mapVal(r) : String(r.value), usage: usage(t) };
      });
  const themed = (r) => (r.dark !== undefined ? { light: r.value, dark: r.dark } : r.value);
  const cssNumber = (r) => String(r.value);

  const spacing = sysBy((t) => t.path[0] === 'space' || t.path[0] === 'layout');
  const radius = sysBy((t) => t.path[0] === 'radius');
  const shadow = sysBy((t) => t.path[0] === 'shadow', (r) => ({ light: r.value, dark: r.dark ?? r.value }));
  const opacity = sysBy((t) => t.path[0] === 'opacity', cssNumber);
  const zIndex = sysBy((t) => t.path[0] === 'z', cssNumber);
  const motion = sysBy((t) => ['ease', 'dur', 'stagger', 'scale'].includes(t.path[0]));
  void themed;

  const fontKeys = { display: 'display', text: 'text', mono: 'mono' };
  const families = {};
  for (const k of Object.keys(fontKeys)) {
    const t = model.byPath.get(`font.${k}`);
    families[k] = rv(t).value;
  }
  const groupOrder = ['Display', 'Text', 'Label'];
  const groups = groupOrder.map((g) => {
    const styles = model.tokens.filter((t) => t.type === 'typography' && t.vn.group === g);
    const famAlias = styles[0].raw.fontFamily; // {font.display}
    return {
      name: g,
      family: aliasKey(famAlias).split('.')[1],
      styles: styles.map((t) => {
        const s = c.typeStyle(t, { refs: false });
        const st = {
          name: t.path[1],
          fontSize: s.size,
          lineHeight: s.lineHeight,
          fontWeight: s.weight,
          letterSpacing: s.tracking,
          fontStyle: s.style,
        };
        if (s.opsz !== null) st.opticalSize = s.opsz;
        if (s.sample) st.sample = s.sample;
        st.usage = t.description;
        return st;
      }),
    };
  });

  const out = {
    color: { themes: THEMES.map((id) => ({ id })), tokens: colors },
    type: { fonts: [], families, groups },
    spacing: list(spacing),
    radius: list(radius),
    shadow: list(shadow),
    opacity: list(opacity),
    zIndex: list(zIndex),
    motion: list(motion),
  };

  // Self-check against the board grammar (the test suite repeats this on the file).
  const seen = new Set();
  for (const [fam, v] of Object.entries(out)) {
    if (fam === 'type') continue;
    for (const t of v.tokens) {
      if (!BOARD_NAME.test(t.name)) throw new Error(`Board name "${t.name}" violates the grammar`);
      if (seen.has(t.name)) throw new Error(`Board name "${t.name}" duplicated (family ${fam})`);
      seen.add(t.name);
    }
  }
  return JSON.stringify(out, null, 2) + '\n';
}

// ---------------------------------------------------------------- Style Dictionary

const sd = new StyleDictionary({
  source: ['tokens/src/**/*.tokens.json'],
  usesDtcg: true,
  log: { verbosity: 'default', warnings: 'warn' },
  platforms: {
    vn: {
      buildPath: 'dist/',
      files: [
        { destination: 'css/tokens.css', format: 'vn/css' },
        { destination: 'css/type.css', format: 'vn/css-type' },
        { destination: 'tokens.js', format: 'vn/js' },
        { destination: 'tokens.d.ts', format: 'vn/dts' },
        { destination: 'tokens.json', format: 'vn/json' },
        { destination: 'board/tokens.json', format: 'claude/board-list' },
      ],
    },
  },
});

const prep = (dictionary) => {
  const model = buildModel(dictionary.allTokens);
  // mark leaves that also have children (the $root convention) for the nested JSON
  const prefixes = new Set();
  for (const t of dictionary.allTokens) {
    const p = t.path;
    for (let i = 1; i < p.length; i++) prefixes.add(p.slice(0, i).join('.'));
  }
  for (const t of model.tokens) t.hasChildren = prefixes.has(t.path.join('.'));
  return { model, c: makeConverter(model), dictionary };
};

const reducedMotion = (dictionary) => dictionary.tokens?.dur?.$extensions?.vn?.reducedMotion ?? '1ms';

sd.registerFormat({
  name: 'vn/css',
  format: ({ dictionary }) => {
    const { model, c } = prep(dictionary);
    return formatTokensCss(model, c, reducedMotion(dictionary));
  },
});
sd.registerFormat({
  name: 'vn/css-type',
  format: ({ dictionary }) => {
    const { model, c } = prep(dictionary);
    return formatTypeCss(model, c);
  },
});
sd.registerFormat({
  name: 'vn/js',
  format: ({ dictionary }) => {
    const { model, c } = prep(dictionary);
    return formatJs(flatValues(model, c));
  },
});
sd.registerFormat({
  name: 'vn/dts',
  format: ({ dictionary }) => {
    const { model, c } = prep(dictionary);
    return formatDts(flatValues(model, c));
  },
});
sd.registerFormat({
  name: 'vn/json',
  format: ({ dictionary }) => {
    const { model, c } = prep(dictionary);
    return formatTokensJson(model, c);
  },
});
sd.registerFormat({
  name: 'claude/board-list',
  format: ({ dictionary }) => {
    const { model, c } = prep(dictionary);
    return formatBoard(model, c);
  },
});

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await sd.buildAllPlatforms();
  console.log('tokens built -> dist/');
}
