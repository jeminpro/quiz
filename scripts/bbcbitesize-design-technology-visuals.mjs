import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const escapeXml = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

function svgDocument({ width, height, title, caption, body }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
  <title>${escapeXml(title)}</title>
  <desc>${escapeXml(caption)}</desc>
  <rect width="${width}" height="${height}" rx="18" fill="#f4f7fb"/>
  <text x="${width / 2}" y="36" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#1f2937">${escapeXml(title)}</text>
  ${body}
</svg>
`;
}

function label(x, y, text, size = 18) {
  return `<text x="${x}" y="${y}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${size}" font-weight="700" fill="#1f2937">${escapeXml(text)}</text>`;
}

function note(y, text, width) {
  return `<text x="${width / 2}" y="${y}" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">${escapeXml(text)}</text>`;
}

function lever() {
  return svgDocument({
    width: 860,
    height: 420,
    title: 'A lever',
    caption: 'A beam rests on a triangular fulcrum. The left end is labelled Effort. The right end is labelled Load.',
    body: `
    <defs>
      <marker id="down" markerWidth="10" markerHeight="10" refX="5" refY="8" orient="auto">
        <path d="M 0 0 L 10 0 L 5 10 Z" fill="#1d4e89"/>
      </marker>
    </defs>
    <polygon points="430,250 390,310 470,310" fill="#94a3b8" stroke="#1f2937" stroke-width="3"/>
    <rect x="120" y="228" width="620" height="18" rx="4" fill="#d97706" stroke="#1f2937" stroke-width="3"/>
    <rect x="640" y="176" width="90" height="52" fill="#f8fafc" stroke="#1f2937" stroke-width="3"/>
    <line x1="180" y1="140" x2="180" y2="210" stroke="#1d4e89" stroke-width="4" marker-end="url(#down)"/>
    ${label(180, 120, 'Effort')}
    ${label(430, 350, 'Fulcrum')}
    ${label(685, 160, 'Load')}
    ${note(400, 'The beam can turn where it is supported.', 860)}`,
  });
}

function slider() {
  return svgDocument({
    width: 860,
    height: 380,
    title: 'A slider',
    caption: 'A straight strip passes through a slot in a piece of card. The slot is labelled Guide. The strip is labelled Slider.',
    body: `
    <rect x="140" y="110" width="580" height="160" rx="8" fill="#e2e8f0" stroke="#1f2937" stroke-width="3"/>
    <rect x="170" y="168" width="520" height="36" rx="4" fill="#0f172a"/>
    <rect x="120" y="160" width="620" height="52" rx="6" fill="#f59e0b" stroke="#1f2937" stroke-width="3"/>
    ${label(430, 148, 'Guide')}
    ${label(430, 250, 'Slider')}
    ${note(340, 'The strip can move along the slot.', 860)}`,
  });
}

function wheelAxle() {
  return svgDocument({
    width: 860,
    height: 400,
    title: 'A wheel and axle',
    caption: 'Two wheels are fixed to one axle. The axle rests in two holders.',
    body: `
    <circle cx="180" cy="190" r="70" fill="#cbd5e1" stroke="#1f2937" stroke-width="4"/>
    <circle cx="180" cy="190" r="14" fill="#1f2937"/>
    <circle cx="680" cy="190" r="70" fill="#cbd5e1" stroke="#1f2937" stroke-width="4"/>
    <circle cx="680" cy="190" r="14" fill="#1f2937"/>
    <rect x="180" y="176" width="500" height="28" fill="#d97706" stroke="#1f2937" stroke-width="3"/>
    <path d="M300 210 v50 h70 v-50" fill="none" stroke="#1d4e89" stroke-width="6"/>
    <path d="M490 210 v50 h70 v-50" fill="none" stroke="#1d4e89" stroke-width="6"/>
    ${label(180, 300, 'Wheel')}
    ${label(430, 160, 'Axle')}
    ${label(680, 300, 'Wheel')}
    ${label(430, 290, 'Axle holder')}
    ${note(360, 'Each wheel is fixed to the axle.', 860)}`,
  });
}

function gears() {
  return svgDocument({
    width: 860,
    height: 440,
    title: 'Two meshed gears',
    caption: 'Gear A is smaller and has a clockwise arrow. Gear B is larger. Their teeth meet.',
    body: `
    <circle cx="300" cy="200" r="78" fill="#93c5fd" stroke="#1f2937" stroke-width="8" stroke-dasharray="10 8"/>
    <circle cx="300" cy="200" r="18" fill="#1f2937"/>
    <path d="M300 112 a70 70 0 0 1 62 48" fill="none" stroke="#1d4e89" stroke-width="4"/>
    <polygon points="364,148 386,136 358,132" fill="#1d4e89"/>
    <circle cx="492" cy="214" r="130" fill="#fdba74" stroke="#1f2937" stroke-width="8" stroke-dasharray="12 10"/>
    <circle cx="492" cy="214" r="22" fill="#1f2937"/>
    ${label(300, 390, 'A')}
    ${label(492, 390, 'B')}
    ${label(300, 78, 'A turns this way', 16)}
    ${note(420, 'The teeth of A and B are meshed.', 860)}`,
  });
}

function cam() {
  return svgDocument({
    width: 860,
    height: 460,
    title: 'A cam mechanism',
    caption: 'A round cam sits on a shaft. A follower rests on the cam between two slide guides.',
    body: `
    <rect x="330" y="90" width="20" height="160" fill="#64748b" stroke="#1f2937" stroke-width="3"/>
    <rect x="500" y="90" width="20" height="160" fill="#64748b" stroke="#1f2937" stroke-width="3"/>
    <rect x="390" y="100" width="70" height="130" fill="#f59e0b" stroke="#1f2937" stroke-width="3"/>
    <circle cx="425" cy="310" r="80" fill="#93c5fd" stroke="#1f2937" stroke-width="4"/>
    <circle cx="470" cy="310" r="14" fill="#1f2937"/>
    <rect x="456" y="296" width="28" height="120" fill="#d97706" stroke="#1f2937" stroke-width="3"/>
    <path d="M560 270 a34 34 0 0 1 18 40" fill="none" stroke="#1d4e89" stroke-width="4"/>
    <polygon points="586,304 608,314 580,322" fill="#1d4e89"/>
    ${label(425, 80, 'Follower')}
    ${label(250, 180, 'Slide')}
    ${label(250, 320, 'Cam')}
    ${label(620, 400, 'Shaft')}
    ${note(440, 'The follower rests on the cam.', 860)}`,
  });
}

function structures() {
  return svgDocument({
    width: 860,
    height: 440,
    title: 'Two structures',
    caption: 'Picture A is a fence of posts and rails. Picture B is a hollow dome.',
    body: `
    ${label(230, 80, 'A')}
    <rect x="90" y="300" width="16" height="70" fill="#92400e"/>
    <rect x="210" y="300" width="16" height="70" fill="#92400e"/>
    <rect x="330" y="300" width="16" height="70" fill="#92400e"/>
    <rect x="90" y="160" width="16" height="150" fill="#b45309" stroke="#1f2937"/>
    <rect x="210" y="160" width="16" height="150" fill="#b45309" stroke="#1f2937"/>
    <rect x="330" y="160" width="16" height="150" fill="#b45309" stroke="#1f2937"/>
    <rect x="90" y="180" width="256" height="12" fill="#d97706" stroke="#1f2937"/>
    <rect x="90" y="230" width="256" height="12" fill="#d97706" stroke="#1f2937"/>
    ${label(640, 80, 'B')}
    <path d="M500 330 A140 140 0 0 1 780 330 Z" fill="#bfdbfe" stroke="#1f2937" stroke-width="4"/>
    <path d="M530 330 A110 110 0 0 1 750 330" fill="none" stroke="#1d4e89" stroke-width="2" stroke-dasharray="6 6"/>
    ${note(400, 'A is a fence. B is a dome.', 860)}`,
  });
}

function corrugation() {
  return svgDocument({
    width: 860,
    height: 420,
    title: 'Two pieces of card',
    caption: 'A is one flat sheet. B has a zig-zag layer between two flat sheets.',
    body: `
    ${label(230, 90, 'A')}
    <rect x="80" y="180" width="300" height="28" fill="#e2e8f0" stroke="#1f2937" stroke-width="3"/>
    ${label(640, 90, 'B')}
    <rect x="480" y="140" width="320" height="16" fill="#e2e8f0" stroke="#1f2937" stroke-width="3"/>
    <path d="M480 168 l20 28 l20 -28 l20 28 l20 -28 l20 28 l20 -28 l20 28 l20 -28 l20 28 l20 -28 l20 28 l20 -28 l20 28 l20 -28 l20 28" fill="none" stroke="#b45309" stroke-width="4"/>
    <rect x="480" y="210" width="320" height="16" fill="#e2e8f0" stroke="#1f2937" stroke-width="3"/>
    ${note(360, 'A and B are two ways of making a piece of card.', 860)}`,
  });
}

function circuit(open) {
  const leftWire = open
    ? '<line x1="150" y1="110" x2="150" y2="150" stroke="#1f2937" stroke-width="4"/><line x1="150" y1="230" x2="150" y2="330" stroke="#1f2937" stroke-width="4"/><line x1="150" y1="156" x2="210" y2="112" stroke="#1f2937" stroke-width="4"/><circle cx="150" cy="156" r="6" fill="#1f2937"/><circle cx="150" cy="230" r="6" fill="#1f2937"/>'
    : '<line x1="150" y1="110" x2="150" y2="330" stroke="#1f2937" stroke-width="4"/>';
  return svgDocument({
    width: 860,
    height: 440,
    title: open ? 'A circuit with the switch open' : 'A circuit with the switch closed',
    caption: open
      ? 'A cell and a bulb are joined by wires, but the switch on the left is open, leaving a gap.'
      : 'A cell, a bulb and a closed switch are joined by wires in one loop.',
    body: `
    <line x1="150" y1="110" x2="690" y2="110" stroke="#1f2937" stroke-width="4"/>
    <line x1="690" y1="110" x2="690" y2="330" stroke="#1f2937" stroke-width="4"/>
    <line x1="690" y1="330" x2="150" y2="330" stroke="#1f2937" stroke-width="4"/>
    ${leftWire}
    <circle cx="420" cy="110" r="28" fill="#fef3c7" stroke="#1f2937" stroke-width="3"/>
    <line x1="400" y1="90" x2="440" y2="130" stroke="#1f2937" stroke-width="3"/>
    <line x1="440" y1="90" x2="400" y2="130" stroke="#1f2937" stroke-width="3"/>
    <line x1="390" y1="330" x2="390" y2="360" stroke="#1f2937" stroke-width="4"/>
    <line x1="450" y1="318" x2="450" y2="372" stroke="#1f2937" stroke-width="8"/>
    ${label(210, 280, 'Switch')}
    ${label(420, 70, 'Bulb')}
    ${label(420, 400, 'Cell')}
    ${note(430, open ? 'The switch is open.' : 'The switch is closed.', 860)}`,
  });
}

function foodGroups() {
  const rows = [
    ['Fruit and vegetables', 620],
    ['Potatoes, bread, rice, pasta and other starchy foods', 600],
    ['Beans, pulses, fish, eggs, meat and other proteins', 360],
    ['Dairy and alternatives', 320],
    ['Oils and spreads', 120],
  ];
  const bars = rows.map(([name, width], index) => {
    const y = 80 + index * 58;
    return `<text x="40" y="${y + 22}" font-family="Arial, sans-serif" font-size="15" fill="#1f2937">${escapeXml(name)}</text>
    <rect x="40" y="${y + 28}" width="${width}" height="18" rx="4" fill="#3a74e0"/>`;
  }).join('\n');
  return svgDocument({
    width: 860,
    height: 460,
    title: 'Shares of a healthy diet',
    caption: 'Five bars show food groups. Fruit and vegetables, and starchy foods, have the longest bars. Oils and spreads have the shortest.',
    body: `
    ${bars}
    ${note(430, 'A longer bar means a larger share of what we eat.', 860)}`,
  });
}

export async function writeDesignTechnologyVisuals(directory) {
  await mkdir(directory, { recursive: true });
  const files = [
    ['lever.svg', lever()],
    ['slider.svg', slider()],
    ['wheel-axle.svg', wheelAxle()],
    ['gears.svg', gears()],
    ['cam.svg', cam()],
    ['structures.svg', structures()],
    ['corrugation.svg', corrugation()],
    ['circuit-closed.svg', circuit(false)],
    ['circuit-open.svg', circuit(true)],
    ['food-groups.svg', foodGroups()],
  ];
  await Promise.all(files.map(([name, contents]) => writeFile(path.join(directory, name), contents, 'utf8')));
  return files.map(([name]) => name);
}
