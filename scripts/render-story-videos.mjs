/**
 * Renders a short, captioned story film for each child in Success Stories, so the
 * site ships real, self contained videos that play when tapped. Run with:
 *   node scripts/render-story-videos.mjs
 * Requires (dev only): sharp, ffmpeg-static
 */
import sharp from 'sharp';
import { spawnSync } from 'node:child_process';
import { mkdirSync, rmSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ffmpeg = require('ffmpeg-static');

const W = 1280;
const H = 720;
const FPS = 24;
const T = 12;
const FRAMES = T * FPS;

const STORIES = [
  {
    slug: 'amina-the-engineer',
    name: 'Amina',
    age: 19,
    location: 'Eastern Region',
    program: 'Education Support',
    figure: 'female',
    from: '#7A3A1E',
    via: '#C56A22',
    before: 'Found selling water near a market at seven, with no family and no school.',
    after: 'Now studies civil engineering on a national scholarship and mentors younger girls.',
    quote: 'They gave me the belief that a girl from nowhere could build bridges.',
    outcome: 'Engineering scholarship',
  },
  {
    slug: 'daniel-the-carpenter',
    name: 'Daniel',
    age: 21,
    location: 'Northern Hills',
    program: 'Skills Development',
    figure: 'male',
    from: '#14375C',
    via: '#2766A1',
    before: 'Orphaned at ten, he drifted between relatives and left school to find work.',
    after: 'Now runs a furniture workshop that employs four other young people.',
    quote: 'Someone was finally measuring out a future for me.',
    outcome: 'Owns a business',
  },
  {
    slug: 'grace-the-nurse',
    name: 'Grace',
    age: 23,
    location: 'Lakeside',
    program: 'Healthcare Assistance',
    figure: 'female',
    from: '#6E2A47',
    via: '#B05576',
    before: 'Came to us gravely ill and grieving, with no one able to fund her care.',
    after: 'Qualified as a nurse and works in the very clinics that healed her.',
    quote: 'The hands that cared for me taught me how to care for others.',
    outcome: 'Qualified nurse',
  },
];

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const seg = (t, s, d) => clamp((t - s) / d);
const lerp = (a, b, p) => a + (b - a) * p;
const eOut3 = (p) => 1 - Math.pow(1 - p, 3);
const eInOut2 = (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function wrap(text, max) {
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max) {
      lines.push(cur.trim());
      cur = w;
    } else {
      cur = (cur + ' ' + w).trim();
    }
  }
  if (cur) lines.push(cur.trim());
  return lines;
}

function tspans(text, x, max, lh) {
  return wrap(text, max)
    .map((l, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : lh}">${esc(l)}</tspan>`)
    .join('');
}

function figure(kind, color) {
  const headY = 43;
  const headR = 14.5;
  const hair =
    kind === 'female'
      ? `<path d="M${50 - headR - 3} ${headY + 3} a ${headR + 3} ${headR + 5} 0 1 1 ${(headR + 3) * 2} 0 Z" opacity="0.92"/>` +
        `<path d="M${50 - headR - 3} ${headY + 1} q -2 12 3 18 q 3 -3 3 -9 q -3 -4 -3 -9 Z" opacity="0.92"/>` +
        `<path d="M${50 + headR + 3} ${headY + 1} q 2 12 -3 18 q -3 -3 -3 -9 q 3 -4 3 -9 Z" opacity="0.92"/>`
      : `<path d="M${50 - headR} ${headY - 3} q ${headR} -13 ${headR * 2} 0 q -${headR} -7 -${headR * 2} 0 Z" opacity="0.9"/>`;
  return `<g fill="${color}">${hair}<circle cx="50" cy="${headY}" r="${headR}"/><path d="M24 100 C 24 78, 38 ${headY + headR + 6}, 50 ${headY + headR + 6} C 62 ${headY + headR + 6}, 76 78, 76 100 Z"/></g>`;
}

function captionBlock(cls, opacity, content) {
  return `<g opacity="${opacity.toFixed(3)}">${content}</g>`;
}

function frameSVG(st, t) {
  const intro = seg(t, 0.2, 0.9);
  const portraitScale = lerp(0.92, 1.0, eOut3(seg(t, 0, 1.2))) * lerp(1, 1.04, clamp(t / T));
  const drift = Math.sin(t * 0.6) * 10;

  // caption phases
  const aO = clamp(seg(t, 0.4, 0.8)) * (1 - clamp(seg(t, 3.0, 0.6)));
  const bO = clamp(seg(t, 3.6, 0.7)) * (1 - clamp(seg(t, 6.2, 0.6)));
  const cO = clamp(seg(t, 6.8, 0.7)) * (1 - clamp(seg(t, 9.0, 0.6)));
  const dO = clamp(seg(t, 9.6, 0.7));
  const fadeO = clamp(1 - seg(t, 0, 0.5)) + seg(t, T - 0.5, 0.5);
  const prog = clamp(t / T);

  const cx = 330;
  const cy = 340;
  const r = 188;

  const capX = 600;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="${W}" height="${H}" font-family="Georgia, serif">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0%" stop-color="${st.from}"/><stop offset="100%" stop-color="${st.via}"/></linearGradient>
    <radialGradient id="vig" cx="50%" cy="45%" r="75%"><stop offset="55%" stop-color="#000000" stop-opacity="0"/><stop offset="100%" stop-color="#000000" stop-opacity="0.4"/></radialGradient>
    <radialGradient id="halo" cx="50%" cy="42%" r="60%"><stop offset="0%" stop-color="#FBF2DF" stop-opacity="0.85"/><stop offset="100%" stop-color="#FBF2DF" stop-opacity="0.05"/></radialGradient>
    <clipPath id="pc"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>
  </defs>
  <rect width="1280" height="720" fill="url(#bg)"/>
  <circle cx="${1050 + drift}" cy="${160 - drift}" r="220" fill="#FFFFFF" opacity="0.06"/>
  <circle cx="${180 - drift}" cy="${620 + drift}" r="180" fill="#000000" opacity="0.08"/>
  <rect width="1280" height="720" fill="url(#vig)"/>

  <!-- portrait -->
  <g transform="translate(${cx} ${cy}) scale(${portraitScale.toFixed(4)}) translate(${-cx} ${-cy})">
    <circle cx="${cx}" cy="${cy}" r="${r + 8}" fill="#FBF8F2" opacity="0.12"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#0E2138" opacity="0.45"/>
    <g clip-path="url(#pc)">
      <rect x="${cx - r}" y="${cy - r}" width="${r * 2}" height="${r * 2}" fill="url(#halo)"/>
      <g transform="translate(${cx - 158} ${cy - 150}) scale(3.16)" opacity="0.7">${figure(st.figure, '#15293B')}</g>
    </g>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#FBE2B0" stroke-width="2.5" opacity="0.5"/>
  </g>

  <!-- name and meta -->
  <g opacity="${intro.toFixed(3)}" fill="#FBF8F2">
    <text x="${capX}" y="150" font-size="64" font-weight="700">${esc(st.name)}, ${st.age}</text>
    <text x="${capX}" y="192" font-size="24" fill="#F3D8B0">${esc(st.location)}</text>
    <g transform="translate(${capX} 220)"><rect width="${st.program.length * 12 + 36}" height="40" rx="20" fill="#FBF8F2" opacity="0.16"/><text x="${(st.program.length * 12 + 36) / 2}" y="26" font-size="19" font-weight="700" text-anchor="middle" fill="#FBF8F2">${esc(st.program)}</text></g>
  </g>

  <!-- captions -->
  ${captionBlock('a', aO, `<text x="${capX}" y="360" font-size="34" font-style="italic" fill="#FBF8F2">Every child has a story.</text><text x="${capX}" y="404" font-size="34" font-style="italic" fill="#FBF8F2">This one is still being written.</text>`)}
  ${captionBlock('b', bO, `<text x="${capX}" y="340" font-size="22" font-weight="700" letter-spacing="3" fill="#F3D8B0">BEFORE</text><text x="${capX}" y="392" font-size="34" fill="#FBF8F2">${tspans(st.before, capX, 30, 46)}</text>`)}
  ${captionBlock('c', cO, `<text x="${capX}" y="340" font-size="22" font-weight="700" letter-spacing="3" fill="#9FE0C0">AFTER</text><text x="${capX}" y="392" font-size="34" fill="#FBF8F2">${tspans(st.after, capX, 30, 46)}</text>`)}
  ${captionBlock('d', dO, `<text x="${capX}" y="330" font-size="60" fill="#FBE2B0" font-family="Georgia, serif">&#8220;</text><text x="${capX}" y="392" font-size="33" font-style="italic" fill="#FBF8F2">${tspans(st.quote, capX, 32, 46)}</text><g transform="translate(${capX} ${392 + wrap(st.quote, 32).length * 46 + 14})"><rect width="${st.outcome.length * 12 + 52}" height="44" rx="22" fill="#EE9F42"/><text x="${(st.outcome.length * 12 + 52) / 2}" y="29" font-size="20" font-weight="700" text-anchor="middle" fill="#16293A">${esc(st.outcome)}</text></g>`)}

  <!-- progress + brand -->
  <g>
    <rect x="${capX}" y="640" width="600" height="5" rx="2.5" fill="#FFFFFF" opacity="0.2"/>
    <rect x="${capX}" y="640" width="${(600 * prog).toFixed(1)}" height="5" rx="2.5" fill="#FBE2B0"/>
    <text x="${capX}" y="688" font-size="17" letter-spacing="1" fill="#FBF8F2" opacity="0.7" font-family="Arial, sans-serif">HORIZON CHILDREN FOUNDATION</text>
  </g>

  <rect width="1280" height="720" fill="#0B1B33" opacity="${clamp(fadeO).toFixed(3)}"/>
</svg>`;
}

async function renderStory(st) {
  const dir = `/tmp/sf_${st.slug}`;
  if (existsSync(dir)) rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  let poster = null;
  for (let f = 0; f < FRAMES; f += 1) {
    const t = f / FPS;
    const png = await sharp(Buffer.from(frameSVG(st, t))).png().toBuffer();
    await sharp(png).toFile(`${dir}/f${String(f).padStart(4, '0')}.png`);
    if (Math.abs(t - 10.2) < 0.5 / FPS) poster = png;
  }
  if (poster) await sharp(poster).jpeg({ quality: 82 }).toFile(`public/stories/${st.slug}.jpg`);
  const args = ['-y', '-framerate', String(FPS), '-i', `${dir}/f%04d.png`, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-crf', '24', '-movflags', '+faststart', `public/stories/${st.slug}.mp4`];
  const res = spawnSync(ffmpeg, args, { stdio: 'ignore' });
  rmSync(dir, { recursive: true, force: true });
  if (res.status !== 0) throw new Error('ffmpeg failed for ' + st.slug);
  console.log('  done', st.slug);
}

async function main() {
  mkdirSync('public/stories', { recursive: true });
  for (const st of STORIES) {
    console.log('Rendering', st.name, '...');
    await renderStory(st);
  }
  console.log('All story films done.');
}

main();
