/**
 * Renders the Horizon explainer film (what the foundation does) to a real MP4.
 * Run with: node scripts/render-explainer-video.mjs
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
const SCENE = 3.5;
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const seg = (t, s, d) => clamp((t - s) / d);
const eOut3 = (p) => 1 - Math.pow(1 - p, 3);

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
    } else cur = (cur + ' ' + w).trim();
  }
  if (cur) lines.push(cur.trim());
  return lines;
}

// Simple iconic symbols drawn in a 0..100 box, stroke based.
const SYMBOLS = {
  heart: '<path d="M50 78 C 20 58, 16 34, 34 26 C 44 22, 50 30, 50 36 C 50 30, 56 22, 66 26 C 84 34, 80 58, 50 78 Z" fill="#FBF8F2"/>',
  home: '<path d="M22 50 L50 26 L78 50" fill="none" stroke="#FBF8F2" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 46 V76 H70 V46" fill="none" stroke="#FBF8F2" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 76 V58 H56 V76" fill="none" stroke="#FBF8F2" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>',
  book: '<path d="M50 32 C 42 26, 28 24, 20 26 V70 C 28 68, 42 70, 50 76 C 58 70, 72 68, 80 70 V26 C 72 24, 58 26, 50 32 Z" fill="none" stroke="#FBF8F2" stroke-width="5.5" stroke-linejoin="round"/><path d="M50 32 V76" stroke="#FBF8F2" stroke-width="5.5"/>',
  health: '<circle cx="50" cy="50" r="26" fill="none" stroke="#FBF8F2" stroke-width="5.5"/><path d="M50 40 V60 M40 50 H60" stroke="#FBF8F2" stroke-width="6" stroke-linecap="round"/>',
  bowl: '<path d="M22 48 H78 A28 28 0 0 1 22 48 Z" fill="#FBF8F2"/><path d="M40 40 C 40 32, 46 32, 46 24 M54 40 C 54 30, 60 32, 60 22" fill="none" stroke="#FBF8F2" stroke-width="4" stroke-linecap="round"/><path d="M30 74 H70" stroke="#FBF8F2" stroke-width="5" stroke-linecap="round"/>',
  cap: '<path d="M50 30 L82 44 L50 58 L18 44 Z" fill="#FBF8F2"/><path d="M32 50 V64 C 32 70, 68 70, 68 64 V50" fill="none" stroke="#FBF8F2" stroke-width="5.5"/><path d="M82 44 V60" stroke="#FBF8F2" stroke-width="4" stroke-linecap="round"/>',
  globe: '<circle cx="50" cy="50" r="28" fill="none" stroke="#FBF8F2" stroke-width="5.5"/><path d="M22 50 H78 M50 22 C 36 36, 36 64, 50 78 C 64 64, 64 36, 50 22" fill="none" stroke="#FBF8F2" stroke-width="4.5"/>',
};

const SCENES = [
  { sym: 'heart', from: '#0B1B33', via: '#27406B', cap: 'It begins with a child alone in the dark.', sub: 'Every night, somewhere, a child waits for someone to come.' },
  { sym: 'home', from: '#1C446C', via: '#2766A1', cap: 'We bring them home.', sub: 'Not an institution. A real family home, warm and safe.' },
  { sym: 'book', from: '#8C401E', via: '#E8862A', cap: 'We open the classroom door.', sub: 'Full scholarships, learning centers, and patient mentoring.' },
  { sym: 'health', from: '#1E4A5A', via: '#3E8497', cap: 'We keep them healthy.', sub: 'On site clinics and care whenever a child needs it.' },
  { sym: 'bowl', from: '#244B40', via: '#3E7F63', cap: 'We feed them, every day.', sub: 'Three balanced meals so growing bodies can thrive.' },
  { sym: 'cap', from: '#1C446C', via: '#3580BE', cap: 'We help them build a future.', sub: 'Skills, apprenticeships, and the confidence to choose.' },
  { sym: 'globe', from: '#11253B', via: '#1F5184', cap: 'This is Horizon Children Foundation.', sub: 'Join us, and a child you may never meet will never forget you.' },
];

const T = SCENES.length * SCENE;
const FRAMES = Math.round(T * FPS);

function sceneSVG(sc, local, global) {
  const inP = eOut3(seg(local, 0.2, 0.8));
  const iconScale = 0.8 + 0.2 * inP + 0.05 * eOut3(clamp(local / SCENE));
  const capLines = wrap(sc.cap, 26);
  const subLines = wrap(sc.sub, 40);
  const capY = 470;
  return `<g>
    <rect width="1280" height="720" fill="url(#bg)"/>
    <circle cx="1080" cy="150" r="240" fill="#FFFFFF" opacity="0.05"/>
    <rect width="1280" height="720" fill="url(#vig)"/>
    <g opacity="${inP.toFixed(3)}">
      <g transform="translate(640 250) scale(${(iconScale * 1.9).toFixed(3)}) translate(-50 -50)">
        <circle cx="50" cy="50" r="60" fill="#FBF8F2" opacity="0.08"/>
        <circle cx="50" cy="50" r="46" fill="#FBF8F2" opacity="0.10"/>
        ${SYMBOLS[sc.sym]}
      </g>
    </g>
    <g opacity="${inP.toFixed(3)}" text-anchor="middle" font-family="Georgia, serif">
      <text x="640" y="${capY}" font-size="48" font-weight="700" fill="#FBF8F2">${capLines.map((l, i) => `<tspan x="640" dy="${i === 0 ? 0 : 56}">${esc(l)}</tspan>`).join('')}</text>
      <text x="640" y="${capY + capLines.length * 56 + 8}" font-size="24" fill="#F3D8B0" font-family="Arial, sans-serif">${subLines.map((l, i) => `<tspan x="640" dy="${i === 0 ? 0 : 32}">${esc(l)}</tspan>`).join('')}</text>
    </g>
  </g>`;
}

function frameSVG(t) {
  const idx = Math.min(SCENES.length - 1, Math.floor(t / SCENE));
  const local = t - idx * SCENE;
  const sc = SCENES[idx];
  // crossfade out at end of each scene
  const outP = clamp((local - (SCENE - 0.6)) / 0.6);
  const sceneOpacity = 1 - outP;
  const prog = clamp(t / T);
  const fadeO = clamp(1 - seg(t, 0, 0.5)) + seg(t, T - 0.5, 0.5);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0%" stop-color="${sc.from}"/><stop offset="100%" stop-color="${sc.via}"/></linearGradient>
    <radialGradient id="vig" cx="50%" cy="42%" r="75%"><stop offset="55%" stop-color="#000000" stop-opacity="0"/><stop offset="100%" stop-color="#000000" stop-opacity="0.42"/></radialGradient>
  </defs>
  <g opacity="${sceneOpacity.toFixed(3)}">${sceneSVG(sc, local, t)}</g>
  <g>
    <rect x="340" y="664" width="600" height="5" rx="2.5" fill="#FFFFFF" opacity="0.2"/>
    <rect x="340" y="664" width="${(600 * prog).toFixed(1)}" height="5" rx="2.5" fill="#FBE2B0"/>
  </g>
  <rect width="1280" height="720" fill="#0B1B33" opacity="${clamp(fadeO).toFixed(3)}"/>
</svg>`;
}

async function main() {
  const dir = '/tmp/explainer';
  if (existsSync(dir)) rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  mkdirSync('public', { recursive: true });
  console.log(`Rendering ${FRAMES} explainer frames...`);
  let poster = null;
  for (let f = 0; f < FRAMES; f += 1) {
    const t = f / FPS;
    const png = await sharp(Buffer.from(frameSVG(t))).png().toBuffer();
    await sharp(png).toFile(`${dir}/f${String(f).padStart(4, '0')}.png`);
    if (Math.abs(t - 1.6) < 0.5 / FPS) poster = png;
    if (f % 60 === 0) console.log(`  frame ${f}/${FRAMES}`);
  }
  if (poster) await sharp(poster).jpeg({ quality: 82 }).toFile('public/explainer-poster.jpg');
  const args = ['-y', '-framerate', String(FPS), '-i', `${dir}/f%04d.png`, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-crf', '24', '-movflags', '+faststart', 'public/explainer.mp4'];
  const res = spawnSync(ffmpeg, args, { stdio: 'ignore' });
  rmSync(dir, { recursive: true, force: true });
  if (res.status !== 0) throw new Error('ffmpeg failed');
  console.log('Done: public/explainer.mp4');
}

main();
