import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const assetsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'assets', 'bbcbitesize-pe');

const photos = [
  'jump-start.jpg',
  'jump-swing.jpg',
  'jump-landing.jpg',
  'beanbag-balance.jpg',
  'aim-targets.jpg',
  'throw-balloon.jpg',
];

function attackSpace() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="460" viewBox="0 0 760 460" role="img">
  <title>A small game with Sam, Alex and a defender</title>
  <desc>Sam has the ball. Alex is free in open space. A defender is close to Sam. The goal is on the right.</desc>
  <rect width="760" height="460" rx="18" fill="#f4f7fb"/>
  <text x="380" y="36" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#1f2937">Where can Sam send the ball?</text>
  <rect x="40" y="70" width="680" height="300" rx="16" fill="#86efac" stroke="#166534" stroke-width="4"/>
  <rect x="688" y="160" width="18" height="120" fill="#e2e8f0" stroke="#334155" stroke-width="3"/>
  <text x="650" y="150" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#14532d">Goal</text>
  <circle cx="180" cy="230" r="28" fill="#2563eb" stroke="#1e3a8a" stroke-width="3"/>
  <text x="180" y="236" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#ffffff">Sam</text>
  <circle cx="214" cy="206" r="10" fill="#f8fafc" stroke="#0f172a" stroke-width="2"/>
  <circle cx="280" cy="210" r="28" fill="#dc2626" stroke="#7f1d1d" stroke-width="3"/>
  <text x="280" y="206" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#ffffff">Other</text>
  <text x="280" y="222" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#ffffff">team</text>
  <circle cx="520" cy="130" r="28" fill="#2563eb" stroke="#1e3a8a" stroke-width="3"/>
  <text x="520" y="136" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#ffffff">Alex</text>
  <text x="520" y="188" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" fill="#14532d">open space</text>
  <text x="380" y="400" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#334155">Blue players are on Sam's team. The red player is close to Sam. Alex is free.</text>
</svg>
`;
}

function jumpResults() {
  const row = (y, day, distance, shade) => `
  <rect x="120" y="${y}" width="520" height="52" fill="${shade}"/>
  <text x="200" y="${y + 33}" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#1f2937">${day}</text>
  <text x="500" y="${y + 33}" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#1e3a8a">${distance}</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="420" viewBox="0 0 760 420" role="img">
  <title>Noah's standing long jump results</title>
  <desc>Monday 1.10 metres, Wednesday 1.20 metres, Friday 1.35 metres. Same start line. Measured to the heels.</desc>
  <rect width="760" height="420" rx="18" fill="#f4f7fb"/>
  <text x="380" y="40" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#1f2937">Noah's standing long jumps</text>
  <text x="380" y="68" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" fill="#475569">Same start line each day. Distance measured to the heels.</text>
  <rect x="120" y="96" width="520" height="48" fill="#1d4e89"/>
  <text x="200" y="127" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#ffffff">Day</text>
  <text x="500" y="127" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#ffffff">Distance</text>
  ${row(144, 'Monday', '1.10 m', '#ffffff')}
  ${row(196, 'Wednesday', '1.20 m', '#e0f2fe')}
  ${row(248, 'Friday', '1.35 m', '#ffffff')}
  <rect x="120" y="96" width="520" height="204" fill="none" stroke="#94a3b8" stroke-width="2"/>
</svg>
`;
}

function safeLanding() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="460" viewBox="0 0 760 460" role="img">
  <title>Two ways of landing from a jump</title>
  <desc>Landing A has bent knees and feet under the body. Landing B has straight stiff legs and the body leaning back.</desc>
  <rect width="760" height="460" rx="18" fill="#f4f7fb"/>
  <text x="380" y="36" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#1f2937">Two landings</text>
  <line x1="80" y1="390" x2="300" y2="390" stroke="#94a3b8" stroke-width="4"/>
  <line x1="460" y1="390" x2="680" y2="390" stroke="#94a3b8" stroke-width="4"/>
  <circle cx="190" cy="120" r="24" fill="#fde68a" stroke="#1f2937" stroke-width="3"/>
  <line x1="190" y1="144" x2="190" y2="230" stroke="#1f2937" stroke-width="7" stroke-linecap="round"/>
  <line x1="190" y1="170" x2="145" y2="215" stroke="#1f2937" stroke-width="7" stroke-linecap="round"/>
  <line x1="190" y1="170" x2="235" y2="215" stroke="#1f2937" stroke-width="7" stroke-linecap="round"/>
  <line x1="190" y1="230" x2="155" y2="300" stroke="#1f2937" stroke-width="7" stroke-linecap="round"/>
  <line x1="155" y1="300" x2="155" y2="385" stroke="#1f2937" stroke-width="7" stroke-linecap="round"/>
  <line x1="190" y1="230" x2="225" y2="300" stroke="#1f2937" stroke-width="7" stroke-linecap="round"/>
  <line x1="225" y1="300" x2="225" y2="385" stroke="#1f2937" stroke-width="7" stroke-linecap="round"/>
  <text x="190" y="430" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#1f2937">Landing A</text>
  <circle cx="570" cy="110" r="24" fill="#fde68a" stroke="#1f2937" stroke-width="3"/>
  <line x1="560" y1="132" x2="590" y2="230" stroke="#1f2937" stroke-width="7" stroke-linecap="round"/>
  <line x1="575" y1="165" x2="545" y2="230" stroke="#1f2937" stroke-width="7" stroke-linecap="round"/>
  <line x1="580" y1="165" x2="610" y2="230" stroke="#1f2937" stroke-width="7" stroke-linecap="round"/>
  <line x1="590" y1="230" x2="545" y2="385" stroke="#1f2937" stroke-width="7" stroke-linecap="round"/>
  <line x1="590" y1="230" x2="640" y2="385" stroke="#1f2937" stroke-width="7" stroke-linecap="round"/>
  <text x="570" y="430" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#1f2937">Landing B</text>
</svg>
`;
}

export async function writePeVisuals(visualDir) {
  await mkdir(visualDir, { recursive: true });
  await mkdir(assetsDir, { recursive: true });
  for (const name of photos) {
    await copyFile(path.join(assetsDir, name), path.join(visualDir, name));
  }
  const diagrams = {
    'attack-space.svg': attackSpace(),
    'jump-results.svg': jumpResults(),
    'safe-landing.svg': safeLanding(),
  };
  for (const [name, svg] of Object.entries(diagrams)) {
    await writeFile(path.join(visualDir, name), svg, 'utf8');
  }
  return [...photos, ...Object.keys(diagrams)];
}
