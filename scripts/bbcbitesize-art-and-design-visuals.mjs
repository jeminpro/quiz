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

function colourWheel() {
  const colours = [
    { name: 'Yellow', fill: '#f6c945' },
    { name: 'Orange', fill: '#f08a24' },
    { name: 'Red', fill: '#d64545' },
    { name: 'Purple', fill: '#7d5cbf' },
    { name: 'Blue', fill: '#3a74e0' },
    { name: 'Green', fill: '#2f9a57' },
  ];
  const cx = 430;
  const cy = 250;
  const radius = 132;
  const wedges = colours.map((colour, index) => {
    const start = -Math.PI / 2 + (index - 0.5) * (Math.PI / 3);
    const end = start + Math.PI / 3;
    const x0 = cx + radius * Math.cos(start);
    const y0 = cy + radius * Math.sin(start);
    const x1 = cx + radius * Math.cos(end);
    const y1 = cy + radius * Math.sin(end);
    const mid = (start + end) / 2;
    const labelX = cx + (radius + 58) * Math.cos(mid);
    const labelY = cy + (radius + 58) * Math.sin(mid);
    return `<path d="M ${cx} ${cy} L ${x0.toFixed(1)} ${y0.toFixed(1)} A ${radius} ${radius} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z" fill="${colour.fill}" stroke="#1f2937" stroke-width="2"/>
    <text x="${labelX.toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#1f2937">${colour.name}</text>`;
  }).join('\n');
  return svgDocument({
    width: 860,
    height: 500,
    title: 'A colour wheel',
    caption: 'Yellow is at the top, then orange, red, purple, blue and green. Red is opposite green, blue is opposite orange, and yellow is opposite purple.',
    body: `${wedges}
    <circle cx="${cx}" cy="${cy}" r="34" fill="#f4f7fb" stroke="#1f2937" stroke-width="2"/>
    <text x="430" y="470" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">Opposite colours sit across the wheel from each other.</text>`,
  });
}

function hatchingTones() {
  const vertical = (x, gap) => {
    let marks = '';
    for (let lineX = x + 16; lineX < x + 190; lineX += gap) {
      marks += `<line x1="${lineX}" y1="106" x2="${lineX}" y2="274" stroke="#1f2937" stroke-width="2"/>`;
    }
    return marks;
  };
  let cross = '';
  for (let lineX = 636; lineX < 810; lineX += 10) {
    cross += `<line x1="${lineX}" y1="106" x2="${lineX}" y2="274" stroke="#1f2937" stroke-width="2"/>`;
  }
  for (let offset = 0; offset < 28; offset += 1) {
    const y = 100 + offset * 12;
    cross += `<line x1="628" y1="${y}" x2="812" y2="${y + 70}" stroke="#1f2937" stroke-width="2"/>`;
  }
  return svgDocument({
    width: 860,
    height: 390,
    title: 'Three ways of hatching',
    caption: 'Square 1 has lines far apart. Square 2 has lines close together. Square 3 has lines that cross.',
    body: `<clipPath id="h1"><rect x="40" y="90" width="200" height="200"/></clipPath>
    <clipPath id="h2"><rect x="330" y="90" width="200" height="200"/></clipPath>
    <clipPath id="h3"><rect x="620" y="90" width="200" height="200"/></clipPath>
    <rect x="40" y="90" width="200" height="200" fill="#fff" stroke="#1f2937" stroke-width="3"/>
    <g clip-path="url(#h1)">${vertical(40, 28)}</g>
    <rect x="330" y="90" width="200" height="200" fill="#fff" stroke="#1f2937" stroke-width="3"/>
    <g clip-path="url(#h2)">${vertical(330, 10)}</g>
    <rect x="620" y="90" width="200" height="200" fill="#fff" stroke="#1f2937" stroke-width="3"/>
    <g clip-path="url(#h3)">${cross}</g>
    <text x="140" y="330" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#1f2937">Square 1</text>
    <text x="430" y="330" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#1f2937">Square 2</text>
    <text x="720" y="330" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#1f2937">Square 3</text>`,
  });
}

function textureMarks() {
  const frame = (x, label) => `
    <rect x="${x}" y="80" width="180" height="180" fill="#fff" stroke="#1f2937" stroke-width="3"/>
    <text x="${x + 90}" y="300" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#1f2937">${label}</text>`;
  let waves = '';
  for (let y = 110; y < 240; y += 28) {
    waves += `<path d="M 50 ${y} Q 90 ${y - 16} 130 ${y} T 210 ${y}" fill="none" stroke="#1d4e89" stroke-width="3"/>`;
  }
  let jagged = '';
  for (let y = 110; y < 250; y += 16) {
    jagged += `<path d="M 270 ${y} l 12 -8 l 10 12 l 14 -10 l 12 11 l 16 -9 l 14 10 l 12 -8 l 18 9" fill="none" stroke="#6b4f2a" stroke-width="2"/>`;
  }
  let curves = '';
  for (let y = 110; y < 245; y += 18) {
    curves += `<path d="M 490 ${y} Q 560 ${y + 8} 650 ${y}" fill="none" stroke="#334155" stroke-width="3"/>`;
  }
  let flicks = '';
  for (let y = 108; y < 245; y += 22) {
    for (let x = 710; x < 860; x += 24) {
      flicks += `<path d="M ${x} ${y + 10} q 8 -14 16 2" fill="none" stroke="#64748b" stroke-width="2"/>`;
    }
  }
  return svgDocument({
    width: 920,
    height: 350,
    title: 'Four kinds of mark',
    caption: 'Panel 1 has long smooth waves. Panel 2 has short jagged marks. Panel 3 has even parallel curves. Panel 4 has soft flicks.',
    body: `${frame(30, '1 Waves')}
    ${frame(250, '2 Jagged')}
    ${frame(470, '3 Curves')}
    ${frame(690, '4 Flicks')}
    ${waves}${jagged}${curves}${flicks}`,
  });
}

function patternTiles() {
  const leaf = (x) => `<g transform="translate(${x} 108)">
      <path d="M 70 20 C 110 50 110 110 70 140 C 30 110 30 50 70 20 Z" fill="#2f9a57" stroke="#1f2937" stroke-width="3"/>
      <path d="M 70 36 L 70 124" fill="none" stroke="#1f2937" stroke-width="3"/>
    </g>`;
  const star = `<g transform="translate(470 125)">
      <polygon points="70,10 84,48 124,48 92,72 104,112 70,88 36,112 48,72 16,48 56,48" fill="#e6a317" stroke="#1f2937" stroke-width="3"/>
    </g>`;
  const tile = (x, label) => `
    <rect x="${x}" y="90" width="180" height="180" fill="#fff" stroke="#1f2937" stroke-width="3"/>
    <text x="${x + 90}" y="310" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#1f2937">${label}</text>`;
  return svgDocument({
    width: 920,
    height: 360,
    title: 'A repeating tile pattern',
    caption: 'Tiles 1, 2 and 4 each show the same leaf. Tile 3 shows a star.',
    body: `${tile(30, 'Tile 1')}${tile(250, 'Tile 2')}${tile(470, 'Tile 3')}${tile(690, 'Tile 4')}
    ${leaf(30)}${leaf(250)}${leaf(690)}${star}`,
  });
}

function landscapeLayers() {
  return svgDocument({
    width: 860,
    height: 460,
    title: 'A landscape drawing',
    caption: 'A large dark tree stands at the bottom. A smaller house sits in the middle. Pale hills are higher up, under a pale sky.',
    body: `
    <rect x="70" y="70" width="720" height="330" fill="#d9ecf8" stroke="#1f2937" stroke-width="3"/>
    <path d="M 70 190 C 180 150 260 170 360 160 C 480 148 560 180 790 150 L 790 400 L 70 400 Z" fill="#d5e2ea"/>
    <path d="M 250 250 L 330 210 L 410 250 L 390 250 L 390 300 L 270 300 L 270 250 Z" fill="#f4efe4" stroke="#1f2937" stroke-width="3"/>
    <rect x="318" y="262" width="24" height="28" fill="#8fb8d6" stroke="#1f2937"/>
    <path d="M 70 400 L 790 400 L 790 330 C 640 300 520 340 400 360 C 250 384 150 350 70 370 Z" fill="#2f6b3a"/>
    <rect x="150" y="250" width="28" height="150" fill="#6b4f2a"/>
    <circle cx="164" cy="230" r="70" fill="#1f6b3a" stroke="#143d22" stroke-width="3"/>
    <text x="430" y="450" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">Nearer things are larger and lower. Further things are smaller and paler.</text>`,
  });
}

function focalPoint() {
  let dots = '';
  const spots = [[120, 120], [180, 200], [240, 110], [300, 240], [360, 140], [430, 220], [500, 120], [560, 200], [640, 130], [700, 230], [760, 150], [150, 280], [260, 300], [390, 300], [520, 280], [680, 300], [220, 160], [600, 170]];
  for (const [x, y] of spots) {
    dots += `<circle cx="${x}" cy="${y}" r="14" fill="#94a3b8"/>`;
  }
  return svgDocument({
    width: 860,
    height: 400,
    title: 'Shapes on a page',
    caption: 'Many small grey circles are scattered on the page. One circle is larger and red.',
    body: `${dots}
    <circle cx="400" cy="190" r="48" fill="#d64545" stroke="#1f2937" stroke-width="3"/>
    <text x="430" y="370" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">One shape is larger than the others, and it is a different colour.</text>`,
  });
}

function sphereLight() {
  return svgDocument({
    width: 860,
    height: 420,
    title: 'A ball and a light',
    caption: 'An arrow shows the light coming from the left. The left of the ball is bright, the right is dark, and the shadow on the ground falls to the right.',
    body: `
    <line x1="90" y1="180" x2="230" y2="180" stroke="#e6a317" stroke-width="8"/>
    <polygon points="230,180 200,164 200,196" fill="#e6a317"/>
    <text x="120" y="150" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#1f2937">Light</text>
    <ellipse cx="390" cy="300" rx="150" ry="28" fill="#cbd5e1"/>
    <ellipse cx="470" cy="308" rx="90" ry="18" fill="#64748b"/>
    <circle cx="390" cy="190" r="90" fill="#94a3b8" stroke="#1f2937" stroke-width="3"/>
    <path d="M 390 100 A 90 90 0 0 1 390 280 A 70 90 0 0 0 390 100 Z" fill="#475569"/>
    <circle cx="350" cy="160" r="22" fill="#f8fafc"/>
    <text x="430" y="380" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">The bright patch is on the side the light comes from.</text>`,
  });
}

function reliefPrint() {
  return svgDocument({
    width: 920,
    height: 420,
    title: 'A relief print',
    caption: 'The printing plate has a raised backwards R. The cut-away part is lower. The print shows a forwards R, which is a mirror of the plate.',
    body: `
    <rect x="70" y="90" width="300" height="220" rx="8" fill="#e7d3b1" stroke="#1f2937" stroke-width="3"/>
    <text x="220" y="78" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#1f2937">Printing plate</text>
    <g transform="translate(220 230) scale(-1 1)">
      <text text-anchor="middle" font-family="Georgia, serif" font-size="150" font-weight="700" fill="#6b4f2a">R</text>
    </g>
    <text x="220" y="350" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">Raised letter, written backwards</text>
    <rect x="520" y="90" width="300" height="220" rx="8" fill="#fff" stroke="#1f2937" stroke-width="3"/>
    <text x="670" y="78" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#1f2937">Print</text>
    <text x="670" y="230" text-anchor="middle" font-family="Georgia, serif" font-size="150" font-weight="700" fill="#1f2937">R</text>
    <text x="670" y="350" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">The letter has flipped the right way</text>`
  });
}

function posterPair() {
  return svgDocument({
    width: 920,
    height: 460,
    title: 'Two posters',
    caption: 'Poster 1 has a large title and a large time on a quiet background. Poster 2 has a busy pattern, a small title and a tiny time.',
    body: `
    <rect x="70" y="80" width="340" height="300" fill="#fffaf0" stroke="#1f2937" stroke-width="3"/>
    <text x="240" y="150" text-anchor="middle" font-family="Arial, sans-serif" font-size="42" font-weight="700" fill="#1f2937">ART SHOW</text>
    <rect x="200" y="180" width="80" height="16" fill="#d64545"/>
    <rect x="232" y="180" width="16" height="70" fill="#d64545"/>
    <text x="240" y="300" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#1d4e89">Friday 3 pm</text>
    <text x="240" y="420" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#1f2937">Poster 1</text>
    <rect x="500" y="80" width="340" height="300" fill="#fff" stroke="#1f2937" stroke-width="3"/>
    <g stroke="#cbd5e1" stroke-width="8">
      <line x1="500" y1="100" x2="840" y2="160"/>
      <line x1="500" y1="140" x2="840" y2="200"/>
      <line x1="500" y1="180" x2="840" y2="240"/>
      <line x1="500" y1="220" x2="840" y2="280"/>
      <line x1="500" y1="260" x2="840" y2="320"/>
      <line x1="500" y1="300" x2="840" y2="360"/>
    </g>
    <text x="670" y="200" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#94a3b8">art show and other words</text>
    <text x="760" y="350" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="#f8d37a">Friday 3 pm</text>
    <text x="670" y="420" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#1f2937">Poster 2</text>`,
  });
}

function logoSizes() {
  return svgDocument({
    width: 920,
    height: 420,
    title: 'Two logos, large and small',
    caption: 'Logo 1 is a bold circle and tree. It stays clear when small. Logo 2 is a detailed building and tiny writing. When small, it becomes a smudge.',
    body: `
    <text x="230" y="70" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#1f2937">Logo 1</text>
    <circle cx="180" cy="180" r="70" fill="#1d4e89"/>
    <rect x="168" y="190" width="24" height="40" fill="#f8fafc"/>
    <circle cx="180" cy="160" r="28" fill="#2f9a57"/>
    <circle cx="400" cy="180" r="22" fill="#1d4e89"/>
    <rect x="396" y="184" width="8" height="14" fill="#f8fafc"/>
    <circle cx="400" cy="174" r="9" fill="#2f9a57"/>
    <text x="180" y="290" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">Large</text>
    <text x="400" y="290" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">Small</text>
    <text x="690" y="70" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#1f2937">Logo 2</text>
    <rect x="560" y="120" width="160" height="110" fill="#fff" stroke="#1f2937"/>
    <rect x="600" y="150" width="80" height="80" fill="#e2e8f0" stroke="#1f2937"/>
    <polygon points="590,150 640,110 690,150" fill="#d64545" stroke="#1f2937"/>
    <rect x="612" y="170" width="12" height="16" fill="#93c5fd"/>
    <rect x="632" y="170" width="12" height="16" fill="#93c5fd"/>
    <rect x="652" y="170" width="12" height="16" fill="#93c5fd"/>
    <rect x="612" y="194" width="12" height="16" fill="#93c5fd"/>
    <rect x="632" y="194" width="12" height="16" fill="#93c5fd"/>
    <rect x="652" y="194" width="12" height="16" fill="#93c5fd"/>
    <text x="640" y="246" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" fill="#1f2937">Northside School Library Club</text>
    <circle cx="820" cy="180" r="22" fill="#94a3b8"/>
    <text x="640" y="290" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">Large</text>
    <text x="820" y="290" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">Small</text>
    <text x="460" y="370" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">The small logos show what happens when each design is shrunk.</text>`,
  });
}

export async function writeArtVisuals(directory) {
  await mkdir(directory, { recursive: true });
  const files = [
    ['colour-wheel.svg', colourWheel()],
    ['hatching-tones.svg', hatchingTones()],
    ['texture-marks.svg', textureMarks()],
    ['pattern-tiles.svg', patternTiles()],
    ['landscape-layers.svg', landscapeLayers()],
    ['focal-point.svg', focalPoint()],
    ['sphere-light.svg', sphereLight()],
    ['relief-print.svg', reliefPrint()],
    ['poster-pair.svg', posterPair()],
    ['logo-sizes.svg', logoSizes()],
  ];
  await Promise.all(files.map(([name, contents]) => writeFile(path.join(directory, name), contents, 'utf8')));
  return files.map(([name]) => name);
}
