import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const assetsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'assets', 'bbcbitesize-geography');

const escapeXml = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

function frame(title, caption, inner, width, height) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
  <title>${escapeXml(title)}</title>
  <desc>${escapeXml(caption)}</desc>
  <rect width="${width}" height="${height}" rx="18" fill="#f4f7fb"/>
  <text x="${width / 2}" y="36" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#1f2937">${escapeXml(title)}</text>
  <text x="${width / 2}" y="62" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" fill="#475569">${escapeXml(caption)}</text>
  ${inner}
</svg>
`;
}

function schoolMap() {
  const inner = `
  <polygon points="680,78 668,108 692,108" fill="#1d4e89"/>
  <text x="680" y="128" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#1d4e89">N</text>
  <rect x="300" y="118" width="150" height="70" rx="10" fill="#fdba74" stroke="#9a3412" stroke-width="3"/>
  <text x="375" y="160" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#7c2d12">Shop</text>
  <rect x="90" y="250" width="150" height="70" rx="10" fill="#d6d3d1" stroke="#44403c" stroke-width="3"/>
  <text x="165" y="292" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#292524">Church</text>
  <rect x="300" y="250" width="150" height="70" rx="10" fill="#c4b5fd" stroke="#5b21b6" stroke-width="3"/>
  <text x="375" y="292" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#4c1d95">School</text>
  <rect x="510" y="250" width="150" height="70" rx="10" fill="#86efac" stroke="#166534" stroke-width="3"/>
  <text x="585" y="292" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#14532d">Park</text>
  <rect x="70" y="400" width="620" height="54" rx="12" fill="#7dd3fc" stroke="#0369a1" stroke-width="3"/>
  <text x="380" y="434" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#0c4a6e">River</text>
  `;
  return frame('A map of the area around school', 'North is at the top.', inner, 760, 500);
}

function symbolMap() {
  const inner = `
  <polygon points="680,78 668,108 692,108" fill="#1d4e89"/>
  <text x="680" y="128" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#1d4e89">N</text>
  <rect x="36" y="90" width="250" height="210" rx="12" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
  <text x="161" y="118" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#1f2937">Key</text>
  <rect x="58" y="138" width="28" height="18" fill="#111827"/>
  <text x="98" y="153" font-family="Arial, sans-serif" font-size="16" fill="#1f2937">School</text>
  <circle cx="72" cy="184" r="12" fill="#16a34a"/>
  <text x="98" y="190" font-family="Arial, sans-serif" font-size="16" fill="#1f2937">Park</text>
  <line x1="52" y1="222" x2="92" y2="222" stroke="#dc2626" stroke-width="6"/>
  <text x="98" y="228" font-family="Arial, sans-serif" font-size="16" fill="#1f2937">Main road</text>
  <path d="M52 258 Q64 248 76 258 T100 258" fill="none" stroke="#0284c7" stroke-width="4"/>
  <text x="112" y="264" font-family="Arial, sans-serif" font-size="16" fill="#1f2937">River</text>
  <line x1="330" y1="280" x2="700" y2="280" stroke="#dc2626" stroke-width="8"/>
  <rect x="430" y="262" width="40" height="36" fill="#111827"/>
  <circle cx="450" cy="180" r="18" fill="#16a34a"/>
  <path d="M330 390 Q400 370 470 390 T610 390 T700 390" fill="none" stroke="#0284c7" stroke-width="6"/>
  `;
  return frame('A map that uses a key', 'North is at the top. The map has symbols, not names.', inner, 760, 460);
}

function gridSquare() {
  const xs = [170, 290, 410, 530];
  const ys = [480, 370, 260, 150];
  const eastings = ['31', '32', '33', '34'];
  const northings = ['10', '11', '12', '13'];
  const inner = `
  ${xs.map((x) => `<line x1="${x}" y1="150" x2="${x}" y2="480" stroke="#93c5fd" stroke-width="3"/>`).join('')}
  ${ys.map((y) => `<line x1="170" y1="${y}" x2="530" y2="${y}" stroke="#93c5fd" stroke-width="3"/>`).join('')}
  ${xs.map((x, index) => `<text x="${x}" y="514" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#1d4e89">${eastings[index]}</text>`).join('')}
  ${ys.map((y, index) => `<text x="148" y="${y + 6}" text-anchor="end" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#1d4e89">${northings[index]}</text>`).join('')}
  <text x="350" y="322" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#7c2d12">Church</text>
  <text x="470" y="212" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#14532d">Wood</text>
  `;
  return frame('Part of a map grid', 'Eastings run along the bottom. Northings run up the side.', inner, 640, 560);
}

function contours() {
  const rings = (cx, radii) => radii.map((radius) =>
    `<ellipse cx="${cx}" cy="230" rx="${radius}" ry="${Math.round(radius * 0.62)}" fill="none" stroke="#1d4e89" stroke-width="3"/>`,
  ).join('');
  const inner = `
  <text x="180" y="120" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#1f2937">Hill A</text>
  <text x="520" y="120" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#1f2937">Hill B</text>
  ${rings(180, [130, 86, 42])}
  ${rings(520, [78, 64, 50, 36, 22])}
  `;
  return frame('Contour lines on two hills', 'Each line joins places of the same height.', inner, 720, 420);
}

function riverCourse() {
  const inner = `
  <path d="M40 250 C140 250 160 180 230 210 C300 240 300 300 390 280 C470 262 500 220 620 240" fill="none" stroke="#0284c7" stroke-width="8" stroke-linecap="round"/>
  <path d="M230 80 C240 140 250 170 236 206" fill="none" stroke="#0284c7" stroke-width="5" stroke-linecap="round"/>
  <polygon points="630,240 608,230 608,250" fill="#0284c7"/>
  <rect x="640" y="150" width="90" height="180" rx="8" fill="#bae6fd" stroke="#0369a1"/>
  <text x="685" y="246" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#0c4a6e">Sea</text>
  <text x="70" y="220" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#1e3a8a">Source</text>
  <text x="168" y="78" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#1e3a8a">Tributary</text>
  <text x="560" y="200" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#1e3a8a">Mouth</text>
  <text x="360" y="330" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">The arrow shows the way the water flows.</text>
  `;
  return frame('A river from the hills to the sea', 'Labels mark parts of the river.', inner, 760, 400);
}

function latitudeLines() {
  const inner = `
  <circle cx="360" cy="250" r="150" fill="#dbeafe" stroke="#1d4e89" stroke-width="4"/>
  <ellipse cx="360" cy="130" rx="78" ry="16" fill="none" stroke="#b45309" stroke-width="3"/>
  <ellipse cx="360" cy="190" rx="128" ry="22" fill="none" stroke="#b45309" stroke-width="3"/>
  <ellipse cx="360" cy="250" rx="150" ry="28" fill="none" stroke="#1d4ed8" stroke-width="4"/>
  <ellipse cx="360" cy="320" rx="120" ry="22" fill="none" stroke="#b45309" stroke-width="3"/>
  <circle cx="360" cy="108" r="5" fill="#1f2937"/>
  <circle cx="360" cy="392" r="5" fill="#1f2937"/>
  <text x="360" y="96" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#1f2937">N</text>
  <text x="360" y="418" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#1f2937">S</text>
  <text x="530" y="134" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#9a3412">A</text>
  <text x="560" y="196" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#9a3412">B</text>
  <text x="548" y="256" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#1d4ed8">C</text>
  <text x="530" y="326" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#9a3412">D</text>
  `;
  return frame('Lines of latitude', 'N is the North Pole. S is the South Pole. The lines go around the Earth.', inner, 720, 470);
}

const originals = [
  ['school-map.svg', schoolMap()],
  ['symbol-map.svg', symbolMap()],
  ['grid-square.svg', gridSquare()],
  ['contours.svg', contours()],
  ['river-course.svg', riverCourse()],
  ['latitude-lines.svg', latitudeLines()],
];

const borrowed = [
  'compass-points.jpg',
  'compass-needle.jpg',
  'water-cycle.png',
  'fieldwork-hill.jpg',
];

export async function writeGeographyVisuals(directory) {
  await mkdir(directory, { recursive: true });
  await Promise.all(originals.map(([name, svg]) => writeFile(path.join(directory, name), svg, 'utf8')));
  await Promise.all(borrowed.map((name) => copyFile(path.join(assetsDir, name), path.join(directory, name))));
  return [...originals.map(([name]) => name), ...borrowed];
}
