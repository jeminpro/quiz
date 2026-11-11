import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const escapeXml = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

function shell(title, desc, body, width = 900, height = 420) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
  <title>${escapeXml(title)}</title>
  <desc>${escapeXml(desc)}</desc>
  <rect width="${width}" height="${height}" rx="20" fill="#f4f7fb"/>
  ${body}
</svg>
`;
}

function circuitBase({ gap = false, switchOpen = false, label }) {
  const wireY = 210;
  const leftX = 80;
  const rightX = 820;
  const batteryX = 160;
  const bulbX = 450;
  const switchX = 680;
  const gapOpen = gap || switchOpen;
  return `
  <text x="450" y="48" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#1f2a37">${escapeXml(label)}</text>
  <rect x="${batteryX}" y="160" width="70" height="100" rx="8" fill="#fff" stroke="#334155" stroke-width="3"/>
  <line x1="${batteryX + 20}" y1="160" x2="${batteryX + 20}" y2="145" stroke="#334155" stroke-width="4"/>
  <line x1="${batteryX + 50}" y1="160" x2="${batteryX + 50}" y2="150" stroke="#334155" stroke-width="6"/>
  <text x="${batteryX + 35}" y="285" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">battery</text>
  <circle cx="${bulbX}" cy="${wireY}" r="34" fill="#fff7cc" stroke="#334155" stroke-width="3"/>
  <path d="M ${bulbX - 12} ${wireY - 8} L ${bulbX} ${wireY + 14} L ${bulbX + 12} ${wireY - 8}" fill="none" stroke="#334155" stroke-width="3"/>
  <text x="${bulbX}" y="285" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">bulb</text>
  <line x1="${leftX}" y1="${wireY}" x2="${batteryX}" y2="${wireY}" stroke="#334155" stroke-width="4"/>
  <line x1="${batteryX + 70}" y1="${wireY}" x2="${bulbX - 34}" y2="${wireY}" stroke="#334155" stroke-width="4"/>
  <line x1="${bulbX + 34}" y1="${wireY}" x2="${switchX - 30}" y2="${wireY}" stroke="#334155" stroke-width="4"/>
  ${gapOpen
    ? `<line x1="${switchX - 30}" y1="${wireY}" x2="${switchX + 10}" y2="${wireY - 40}" stroke="#334155" stroke-width="4"/>
       <circle cx="${switchX - 30}" cy="${wireY}" r="5" fill="#334155"/>
       <circle cx="${switchX + 30}" cy="${wireY}" r="5" fill="#334155"/>
       <line x1="${switchX + 30}" y1="${wireY}" x2="${rightX}" y2="${wireY}" stroke="#334155" stroke-width="4"/>
       <text x="${switchX}" y="285" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">${switchOpen ? 'open switch' : 'gap in wire'}</text>`
    : `<line x1="${switchX - 30}" y1="${wireY}" x2="${switchX + 30}" y2="${wireY}" stroke="#334155" stroke-width="4"/>
       <circle cx="${switchX - 30}" cy="${wireY}" r="5" fill="#334155"/>
       <circle cx="${switchX + 30}" cy="${wireY}" r="5" fill="#334155"/>
       <line x1="${switchX + 30}" y1="${wireY}" x2="${rightX}" y2="${wireY}" stroke="#334155" stroke-width="4"/>
       <text x="${switchX}" y="285" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">closed switch</text>`}
  <line x1="${rightX}" y1="${wireY}" x2="${rightX}" y2="320" stroke="#334155" stroke-width="4"/>
  <line x1="${rightX}" y1="320" x2="${leftX}" y2="320" stroke="#334155" stroke-width="4"/>
  <line x1="${leftX}" y1="320" x2="${leftX}" y2="${wireY}" stroke="#334155" stroke-width="4"/>
`;
}

function magnets(mode) {
  const attract = mode === 'attract';
  // Left magnet is always N|S, so its facing (right) face is S.
  // Attract: facing poles S-N. Repel: facing poles S-S.
  const facing = attract ? 'N' : 'S';
  const outer = attract ? 'S' : 'N';
  const facingFill = facing === 'N' ? '#fecaca' : '#bfdbfe';
  const outerFill = outer === 'N' ? '#fecaca' : '#bfdbfe';
  const facingInk = facing === 'N' ? '#7f1d1d' : '#1e3a8a';
  const outerInk = outer === 'N' ? '#7f1d1d' : '#1e3a8a';
  const note = attract ? 'Opposite poles face each other' : 'Like poles face each other';
  return shell('Bar magnets', note, `
  <text x="450" y="48" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#1f2a37">${escapeXml(note)}</text>
  <rect x="120" y="150" width="240" height="90" rx="12" fill="#e2e8f0" stroke="#334155" stroke-width="3"/>
  <rect x="120" y="150" width="120" height="90" rx="12" fill="#fecaca"/>
  <rect x="240" y="150" width="120" height="90" rx="12" fill="#bfdbfe"/>
  <text x="180" y="205" text-anchor="middle" font-family="Arial, sans-serif" font-size="36" font-weight="700" fill="#7f1d1d">N</text>
  <text x="300" y="205" text-anchor="middle" font-family="Arial, sans-serif" font-size="36" font-weight="700" fill="#1e3a8a">S</text>
  <rect x="540" y="150" width="240" height="90" rx="12" fill="#e2e8f0" stroke="#334155" stroke-width="3"/>
  <rect x="540" y="150" width="120" height="90" rx="12" fill="${facingFill}"/>
  <rect x="660" y="150" width="120" height="90" rx="12" fill="${outerFill}"/>
  <text x="600" y="205" text-anchor="middle" font-family="Arial, sans-serif" font-size="36" font-weight="700" fill="${facingInk}">${facing}</text>
  <text x="720" y="205" text-anchor="middle" font-family="Arial, sans-serif" font-size="36" font-weight="700" fill="${outerInk}">${outer}</text>
  <path d="M 380 195 L 520 195" stroke="#0f172a" stroke-width="4" marker-end="url(#arrow)"/>
  <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#0f172a"/></marker></defs>
  <text x="450" y="320" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#334155">${attract ? 'They pull together (attract)' : 'They push apart (repel)'}</text>
`);
}

function shadowScene(distance) {
  const near = distance === 'near';
  const objectX = near ? 280 : 420;
  const shadowWidth = near ? 220 : 90;
  const shadowX = 620;
  return shell('Torch and shadow', near ? 'Object close to the torch' : 'Object farther from the torch', `
  <text x="450" y="42" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#1f2a37">${near ? 'Object close to the light' : 'Object farther from the light'}</text>
  <rect x="70" y="150" width="90" height="50" rx="10" fill="#fef08a" stroke="#334155" stroke-width="3"/>
  <circle cx="160" cy="175" r="18" fill="#fde047" stroke="#334155" stroke-width="3"/>
  <text x="115" y="230" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">torch</text>
  <rect x="${objectX}" y="130" width="50" height="120" rx="8" fill="#64748b" stroke="#1f2937" stroke-width="3"/>
  <text x="${objectX + 25}" y="280" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">object</text>
  <rect x="600" y="100" width="18" height="200" fill="#94a3b8"/>
  <ellipse cx="${shadowX}" cy="300" rx="${shadowWidth / 2}" ry="18" fill="#1e293b" opacity="0.55"/>
  <text x="${shadowX}" y="350" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">${near ? 'larger shadow' : 'smaller shadow'}</text>
  <line x1="178" y1="175" x2="${objectX}" y2="140" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6 4"/>
  <line x1="178" y1="175" x2="${objectX}" y2="240" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6 4"/>
`);
}

const visuals = {
  'circuit-gap.svg': shell('Circuit with a gap', 'A series circuit with a break in the wire so the bulb is off', circuitBase({ gap: true, label: 'Circuit with a gap in the wire' })),
  'circuit-complete.svg': shell('Complete circuit', 'A closed series circuit so the bulb can light', circuitBase({ gap: false, label: 'Complete closed circuit' })),
  'circuit-switch-open.svg': shell('Open switch circuit', 'A series circuit with an open switch', circuitBase({ switchOpen: true, label: 'Circuit with an open switch' })),
  'magnets-attract.svg': magnets('attract'),
  'magnets-repel.svg': magnets('repel'),
  'shadow-near.svg': shadowScene('near'),
  'shadow-far.svg': shadowScene('far'),
  'classification-key.svg': shell('Classification key', 'A simple yes or no key for sorting animals', `
  <text x="450" y="42" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#1f2a37">Simple classification key</text>
  <rect x="300" y="70" width="300" height="56" rx="12" fill="#fff" stroke="#334155" stroke-width="3"/>
  <text x="450" y="105" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#1f2937">Does it have feathers?</text>
  <line x1="360" y1="126" x2="220" y2="180" stroke="#334155" stroke-width="3"/>
  <line x1="540" y1="126" x2="680" y2="180" stroke="#334155" stroke-width="3"/>
  <text x="250" y="165" font-family="Arial, sans-serif" font-size="16" fill="#047857">Yes</text>
  <text x="620" y="165" font-family="Arial, sans-serif" font-size="16" fill="#b91c1c">No</text>
  <rect x="120" y="180" width="200" height="50" rx="10" fill="#dcfce7" stroke="#166534" stroke-width="2"/>
  <text x="220" y="211" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#14532d">bird</text>
  <rect x="580" y="180" width="200" height="50" rx="10" fill="#fff" stroke="#334155" stroke-width="2"/>
  <text x="680" y="211" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#1f2937">Does it have fur?</text>
  <line x1="640" y1="230" x2="520" y2="290" stroke="#334155" stroke-width="3"/>
  <line x1="720" y1="230" x2="820" y2="290" stroke="#334155" stroke-width="3"/>
  <text x="560" y="270" font-family="Arial, sans-serif" font-size="16" fill="#047857">Yes</text>
  <text x="780" y="270" font-family="Arial, sans-serif" font-size="16" fill="#b91c1c">No</text>
  <rect x="430" y="290" width="180" height="50" rx="10" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="520" y="321" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#1e3a8a">mammal</text>
  <rect x="740" y="290" width="140" height="50" rx="10" fill="#fef3c7" stroke="#b45309" stroke-width="2"/>
  <text x="810" y="321" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#92400e">other</text>
`),
  'food-chain.svg': shell('Food chain', 'A simple food chain from grass to rabbit to fox', `
  <text x="450" y="42" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#1f2a37">A simple food chain</text>
  <rect x="70" y="150" width="160" height="80" rx="14" fill="#bbf7d0" stroke="#166534" stroke-width="3"/>
  <text x="150" y="198" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#14532d">grass</text>
  <text x="150" y="260" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">producer</text>
  <path d="M 250 190 L 320 190" stroke="#0f172a" stroke-width="5" marker-end="url(#a)"/>
  <rect x="340" y="150" width="160" height="80" rx="14" fill="#fecaca" stroke="#b91c1c" stroke-width="3"/>
  <text x="420" y="198" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#7f1d1d">rabbit</text>
  <text x="420" y="260" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">prey / consumer</text>
  <path d="M 520 190 L 590 190" stroke="#0f172a" stroke-width="5" marker-end="url(#a)"/>
  <rect x="610" y="150" width="160" height="80" rx="14" fill="#fdba74" stroke="#c2410c" stroke-width="3"/>
  <text x="690" y="198" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#7c2d12">fox</text>
  <text x="690" y="260" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">predator</text>
  <defs><marker id="a" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#0f172a"/></marker></defs>
  <text x="450" y="340" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#334155">Arrows show the direction energy travels in the food chain</text>
`),
  'plant-parts.svg': shell('Flowering plant parts', 'A flowering plant with root, stem, leaf and flower labelled', `
  <text x="450" y="40" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#1f2a37">Parts of a flowering plant</text>
  <ellipse cx="450" cy="110" rx="36" ry="28" fill="#f9a8d4" stroke="#9d174d" stroke-width="2"/>
  <circle cx="450" cy="110" r="10" fill="#fde047"/>
  <line x1="450" y1="138" x2="450" y2="300" stroke="#166534" stroke-width="10"/>
  <ellipse cx="390" cy="210" rx="45" ry="18" fill="#86efac" stroke="#166534" stroke-width="2"/>
  <ellipse cx="510" cy="240" rx="45" ry="18" fill="#86efac" stroke="#166534" stroke-width="2"/>
  <path d="M 450 300 Q 410 340 390 370 M 450 300 Q 490 340 510 370 M 450 300 Q 450 350 450 380" fill="none" stroke="#92400e" stroke-width="5"/>
  <text x="560" y="115" font-family="Arial, sans-serif" font-size="18" fill="#1f2937">flower</text>
  <line x1="490" y1="110" x2="550" y2="110" stroke="#64748b" stroke-width="2"/>
  <text x="560" y="245" font-family="Arial, sans-serif" font-size="18" fill="#1f2937">leaf</text>
  <line x1="555" y1="240" x2="550" y2="240" stroke="#64748b" stroke-width="2"/>
  <text x="300" y="270" font-family="Arial, sans-serif" font-size="18" fill="#1f2937">stem</text>
  <line x1="430" y1="260" x2="350" y2="265" stroke="#64748b" stroke-width="2"/>
  <text x="300" y="380" font-family="Arial, sans-serif" font-size="18" fill="#1f2937">roots</text>
  <line x1="420" y1="360" x2="350" y2="375" stroke="#64748b" stroke-width="2"/>
`),
};

export async function writeScienceVisuals(outputDir) {
  await mkdir(outputDir, { recursive: true });
  for (const [name, svg] of Object.entries(visuals)) {
    await writeFile(path.join(outputDir, name), svg, 'utf8');
  }
  return Object.keys(visuals);
}

export const scienceVisualNames = Object.keys(visuals);
