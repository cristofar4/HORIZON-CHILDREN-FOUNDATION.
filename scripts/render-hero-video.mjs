/**
 * Renders the Horizon hero story into a real MP4 (and a poster) so the website
 * ships a self contained cinematic video that plays on every device with no
 * external dependency. Frames are drawn as SVG, rasterized with sharp, and
 * encoded with the bundled ffmpeg binary.
 *
 * Run with: node scripts/render-hero-video.mjs
 * Requires (dev only): sharp, ffmpeg-static
 */
import sharp from 'sharp';
import { spawnSync } from 'node:child_process';
import { mkdirSync, rmSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ffmpeg = require('ffmpeg-static');

const W = 1500;
const H = 950;
const FPS = 24;
const T = 13.5;
const FRAMES = Math.round(T * FPS);
const DIR = '/tmp/heroframes';

/* easing helpers */
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const seg = (t, s, d) => clamp((t - s) / d);
const lerp = (a, b, p) => a + (b - a) * p;
const eOut2 = (p) => 1 - (1 - p) * (1 - p);
const eIn3 = (p) => p * p * p;
const eInOut2 = (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
const eInOut3 = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
const eOutSine = (p) => Math.sin((p * Math.PI) / 2);
const backOut = (p, s = 1.5) => 1 + (s + 1) * Math.pow(p - 1, 3) + s * Math.pow(p - 1, 2);

const STARS = Array.from({ length: 46 }, (_, i) => ({
  x: (i * 53) % 1200,
  y: 20 + ((i * 79) % 330),
  r: 0.6 + ((i * 13) % 10) / 7,
  ph: (i % 9) * 0.7,
}));

function state(t) {
  const fadeO = clamp(1 - seg(t, 0, 0.6)) + seg(t, T - 0.6, 0.6);

  let busX;
  if (t < 9.0) busX = lerp(880, 0, eInOut3(seg(t, 0.8, 2.4)));
  else busX = lerp(0, -1320, eIn3(seg(t, 9.0, 3.2)));
  const wheelR = ((880 - busX) / 213) * 360;

  let doorS = 1;
  if (t >= 3.4) doorS = lerp(1, 0.08, eInOut2(seg(t, 3.4, 0.5)));
  if (t >= 8.2) doorS = lerp(0.08, 1, eInOut2(seg(t, 8.2, 0.5)));

  const boardP = seg(t, 7.0, 0.8);
  let cgO = t >= 3.7 ? eOut2(seg(t, 3.7, 0.3)) : 0;
  cgO *= 1 - boardP;
  const childO = 1 - boardP;

  let cgX = 0;
  if (t < 5.4) cgX = lerp(0, -150, eInOut2(seg(t, 3.9, 1.5)));
  else if (t < 7.6) cgX = lerp(-150, -40, eInOut2(seg(t, 6.3, 1.3)));
  else cgX = -40;

  let chX = 0;
  let chY = 0;
  let chR = 0;
  if (t >= 5.4) {
    const lp = clamp(seg(t, 5.4, 0.7));
    chX = lerp(0, 20, backOut(lp));
    chY = lerp(0, -44, backOut(lp));
    chR = lerp(0, -5, backOut(lp));
  }
  if (t >= 6.3) {
    const rp = eInOut2(seg(t, 6.3, 1.3));
    chX = lerp(20, 130, rp);
    chY = -44;
    chR = -5;
  }

  let spk = t >= 5.5 ? clamp(seg(t, 5.5, 0.5)) : 0;
  if (t >= 6.2) spk *= 1 - clamp(seg(t, 6.2, 0.5));

  const dawnO = eInOut2(seg(t, 8.4, 2.4));
  const sunY = lerp(120, -150, eOut2(seg(t, 8.4, 2.6)));
  const sunO = eOut2(seg(t, 8.4, 2.0));
  const nightO = 1 - clamp(seg(t, 8.4, 1.6));
  const hlO = t < 8.8 ? eOut2(seg(t, 0.6, 0.4)) : lerp(1, 0, eOut2(seg(t, 8.8, 0.6)));
  const coneO = lerp(0.7, 0.16, dawnO);
  const glowO = lerp(0.85, 0.18, dawnO) * (0.9 + 0.1 * Math.sin(t * 2));
  const breath = 1 + 0.018 * Math.sin(t * 2.4);
  const cam = lerp(1.0, 1.045, eOutSine(clamp(t / T)));

  return { fadeO, busX, wheelR, doorS, cgO, childO, cgX, chX, chY, chR, spk, dawnO, sunY, sunO, nightO, hlO, coneO, glowO, breath, cam };
}

function busGroup(s) {
  return `<g transform="translate(${s.busX} 0)">
    <path d="M520 432 L 360 392 L 360 506 L 520 470 Z" fill="url(#h-headlight)" opacity="${s.hlO}"/>
    <rect x="520" y="300" width="520" height="172" rx="30" fill="url(#h-bus)" stroke="#C9D8E8" stroke-width="2"/>
    <path d="M550 300 q -30 0 -30 26 v 8 h 520 v -8 q 0 -26 -30 -26 Z" fill="#2766A1"/>
    <rect x="520" y="332" width="520" height="9" fill="#1F5184"/>
    <path d="M520 348 q 0 -10 12 -10 h 30 v 60 h -42 Z" fill="#BFE0F2" opacity="0.9"/>
    <g fill="#BFE0F2" opacity="0.9"><rect x="648" y="348" width="58" height="50" rx="7"/><rect x="716" y="348" width="58" height="50" rx="7"/><rect x="848" y="348" width="58" height="50" rx="7"/><rect x="916" y="348" width="58" height="50" rx="7"/><rect x="984" y="348" width="44" height="50" rx="7"/></g>
    <rect x="560" y="312" width="120" height="16" rx="3" fill="#16293A"/>
    <text x="620" y="324" text-anchor="middle" font-size="11" font-family="Arial, sans-serif" font-weight="700" fill="#FBE2B0" letter-spacing="1">NEW HOME</text>
    <text x="812" y="438" text-anchor="middle" font-size="30" font-family="Georgia, serif" font-weight="700" fill="#1F5184" letter-spacing="1">HORIZON</text>
    <g transform="translate(630 408) scale(${s.doorS} 1) translate(-630 -408)"><rect x="566" y="350" width="64" height="116" rx="8" fill="#9FC4DE" stroke="#1F5184" stroke-width="2"/><line x1="598" y1="352" x2="598" y2="464" stroke="#1F5184" stroke-width="2"/></g>
    <circle cx="524" cy="436" r="7" fill="#FFF1C2"/><circle cx="524" cy="456" r="5" fill="#FFD27A"/>
    <rect x="514" y="452" width="16" height="22" rx="6" fill="#9FB4CC"/>
    <g transform="rotate(${s.wheelR} 620 474)"><circle cx="620" cy="474" r="34" fill="#1A2738"/><circle cx="620" cy="474" r="34" fill="none" stroke="#3A4C64" stroke-width="7" stroke-dasharray="6 14"/><circle cx="620" cy="474" r="12" fill="#54688A"/></g>
    <g transform="rotate(${s.wheelR} 900 474)"><circle cx="900" cy="474" r="34" fill="#1A2738"/><circle cx="900" cy="474" r="34" fill="none" stroke="#3A4C64" stroke-width="7" stroke-dasharray="6 14"/><circle cx="900" cy="474" r="12" fill="#54688A"/></g>
  </g>`;
}

function childGroup(s) {
  return `<g opacity="${s.childO}" transform="translate(${s.chX} ${s.chY}) rotate(${s.chR} 447 519) translate(447 519) scale(1 ${s.breath}) translate(-447 -519)">
    <ellipse cx="447" cy="519" rx="34" ry="7" fill="#0C1828" opacity="0.4"/>
    <rect x="404" y="498" width="22" height="20" rx="5" fill="#9C6B3F"/>
    <path d="M409 498 q 6 -8 12 0" stroke="#7E5430" stroke-width="2.5" fill="none"/>
    <path d="M432 516 q -4 -34 14 -40 q 18 6 14 40 Z" fill="#2E5E8C"/>
    <path d="M432 516 q 14 -10 30 0 q -2 6 -15 6 q -13 0 -15 -6 Z" fill="#1F4570"/>
    <path d="M434 514 q 12 -8 26 0 l -2 5 q -11 -5 -22 0 Z" fill="#24507A"/>
    <path d="M436 494 q -8 12 0 22" stroke="#2E5E8C" stroke-width="7" fill="none" stroke-linecap="round"/>
    <circle cx="447" cy="470" r="14" fill="#F1C7A0"/>
    <path d="M434 466 q 13 -16 26 0 q -4 -10 -13 -10 q -9 0 -13 10 Z" fill="#3A2A22"/>
    <path d="M458 462 a 14 14 0 0 1 0 16" stroke="#FFE3A6" stroke-width="2" fill="none" opacity="0.8"/>
    <g transform="translate(0 -14)" opacity="${s.spk}"><path d="M470 440 l 4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 Z" fill="#FFE08A"/></g>
  </g>`;
}

function caregiverGroup(s) {
  return `<g opacity="${s.cgO}" transform="translate(${s.cgX} 0)">
    <ellipse cx="596" cy="519" rx="22" ry="6" fill="#0C1828" opacity="0.4"/>
    <rect x="589" y="476" width="8" height="42" rx="4" fill="#243B57"/>
    <rect x="599" y="476" width="8" height="42" rx="4" fill="#1E3550"/>
    <path d="M584 440 q 12 -8 24 0 l 4 40 q -16 8 -32 0 Z" fill="#2766A1"/>
    <path d="M586 452 q -16 6 -22 20" stroke="#2766A1" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M606 452 q 8 6 8 16" stroke="#2766A1" stroke-width="8" fill="none" stroke-linecap="round"/>
    <circle cx="596" cy="426" r="13" fill="#E8B894"/>
    <path d="M584 424 q 12 -15 24 0 q -3 -11 -12 -11 q -9 0 -12 11 Z" fill="#2A1E18"/>
  </g>`;
}

function frameSVG(t) {
  const s = state(t);
  const stars = STARS.map((st) => {
    const o = (0.55 + 0.45 * Math.sin(t * 2 + st.ph)) * s.nightO;
    return `<circle cx="${st.x}" cy="${st.y}" r="${st.r}" fill="#EAF2FF" opacity="${o.toFixed(3)}"/>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" width="${W}" height="${H}">
  <defs>
    <linearGradient id="h-sky-night" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0B1B33"/><stop offset="45%" stop-color="#142A4C"/><stop offset="100%" stop-color="#27406B"/></linearGradient>
    <linearGradient id="h-sky-dawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#214E7E"/><stop offset="42%" stop-color="#E89B6C"/><stop offset="72%" stop-color="#F6C57E"/><stop offset="100%" stop-color="#FBE2B0"/></linearGradient>
    <radialGradient id="h-sun-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FFF4D6"/><stop offset="35%" stop-color="#F9C66B"/><stop offset="100%" stop-color="#F9C66B" stop-opacity="0"/></radialGradient>
    <linearGradient id="h-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#23364F"/><stop offset="100%" stop-color="#16263C"/></linearGradient>
    <linearGradient id="h-cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FFE3A6" stop-opacity="0.75"/><stop offset="100%" stop-color="#FFE3A6" stop-opacity="0"/></linearGradient>
    <radialGradient id="h-pool" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FFE3A6" stop-opacity="0.6"/><stop offset="100%" stop-color="#FFE3A6" stop-opacity="0"/></radialGradient>
    <linearGradient id="h-bus" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FBF8F2"/><stop offset="100%" stop-color="#E7EEF6"/></linearGradient>
    <radialGradient id="h-headlight" cx="0%" cy="50%" r="90%"><stop offset="0%" stop-color="#FFF4D0" stop-opacity="0.85"/><stop offset="100%" stop-color="#FFF4D0" stop-opacity="0"/></radialGradient>
  </defs>
  <g transform="translate(600 380) scale(${s.cam}) translate(-600 -380)">
    <rect width="1200" height="760" fill="url(#h-sky-night)"/>
    <rect width="1200" height="760" fill="url(#h-sky-dawn)" opacity="${s.dawnO}"/>
    <g opacity="${s.nightO}"><circle cx="250" cy="150" r="34" fill="#FBE9C6" opacity="0.9"/><circle cx="250" cy="150" r="58" fill="#FBE9C6" opacity="0.12"/></g>
    ${stars}
    <g transform="translate(0 ${s.sunY})" opacity="${s.sunO}"><circle cx="900" cy="300" r="150" fill="url(#h-sun-glow)"/><circle cx="900" cy="300" r="58" fill="#FFEFC2"/></g>
    <path d="M0 520 Q 220 452 460 506 T 900 496 T 1200 510 V760 H0 Z" fill="#2B4D74" opacity="0.55"/>
    <path d="M0 540 Q 320 486 640 528 T 1200 524 V760 H0 Z" fill="#24405F" opacity="0.7"/>
    <rect y="515" width="1200" height="245" fill="url(#h-ground)"/>
    <ellipse cx="445" cy="520" rx="150" ry="22" fill="url(#h-pool)" opacity="${(s.coneO + 0.2).toFixed(3)}"/>
    <g opacity="0.5"><rect x="120" y="700" width="70" height="7" rx="3.5" fill="#3C5575"/><rect x="320" y="700" width="70" height="7" rx="3.5" fill="#3C5575"/><rect x="520" y="700" width="70" height="7" rx="3.5" fill="#3C5575"/><rect x="720" y="700" width="70" height="7" rx="3.5" fill="#3C5575"/><rect x="920" y="700" width="70" height="7" rx="3.5" fill="#3C5575"/></g>
    <g>
      <rect x="436" y="150" width="8" height="372" rx="4" fill="#33485F"/>
      <g transform="rotate(-18 440 132)"><rect x="404" y="120" width="74" height="26" rx="4" fill="#1C3A5C" stroke="#3E5C80" stroke-width="2"/><line x1="421" y1="121" x2="421" y2="145" stroke="#3E5C80" stroke-width="1.2"/><line x1="440" y1="121" x2="440" y2="145" stroke="#3E5C80" stroke-width="1.2"/><line x1="459" y1="121" x2="459" y2="145" stroke="#3E5C80" stroke-width="1.2"/></g>
      <path d="M440 158 q 28 4 34 26" stroke="#33485F" stroke-width="7" fill="none" stroke-linecap="round"/>
      <rect x="462" y="182" width="30" height="13" rx="6" fill="#43607F"/>
      <ellipse cx="477" cy="196" rx="16" ry="7" fill="#FFE3A6" opacity="${s.glowO.toFixed(3)}"/>
      <path d="M477 198 L 300 520 L 654 520 Z" fill="url(#h-cone)" opacity="${s.coneO.toFixed(3)}"/>
    </g>
    ${busGroup(s)}
    ${childGroup(s)}
    ${caregiverGroup(s)}
  </g>
  <rect width="1200" height="760" fill="#08111f" opacity="${clamp(s.fadeO).toFixed(3)}"/>
</svg>`;
}

async function main() {
  if (existsSync(DIR)) rmSync(DIR, { recursive: true, force: true });
  mkdirSync(DIR, { recursive: true });

  console.log(`Rendering ${FRAMES} frames at ${W}x${H}...`);
  let posterBuf = null;
  for (let f = 0; f < FRAMES; f += 1) {
    const t = f / FPS;
    const buf = Buffer.from(frameSVG(t));
    const png = await sharp(buf).png().toBuffer();
    await sharp(png).toFile(`${DIR}/f${String(f).padStart(4, '0')}.png`);
    if (Math.abs(t - 9.2) < 0.5 / FPS) posterBuf = png;
    if (f % 48 === 0) console.log(`  frame ${f}/${FRAMES}`);
  }

  if (posterBuf) {
    await sharp(posterBuf).jpeg({ quality: 82 }).toFile('public/hero-poster.jpg');
    console.log('poster written');
  }

  console.log('Encoding MP4...');
  const args = [
    '-y',
    '-framerate', String(FPS),
    '-i', `${DIR}/f%04d.png`,
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-profile:v', 'high',
    '-crf', '23',
    '-movflags', '+faststart',
    'public/hero.mp4',
  ];
  const res = spawnSync(ffmpeg, args, { stdio: 'inherit' });
  if (res.status !== 0) throw new Error('ffmpeg failed');
  rmSync(DIR, { recursive: true, force: true });
  console.log('Done: public/hero.mp4');
}

main();
