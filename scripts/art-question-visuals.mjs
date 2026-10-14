import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const photoPools = {
  portrait: ['portrait-georg-gisze.jpg', 'portrait-red-feather.jpg', 'portrait-elizabeth-i.jpg', 'toulouse-ballet-dancers.jpg'],
  style: ['heade-magnolias.jpg', 'seurat-grande-jatte.jpg', 'abstract-primary.jpg', 'mondrian-composition.jpg', 'monet-water-lilies.jpg', 'abstract-contrasting.jpg'],
  landscape: ['watercolour-landscape.jpg', 'monet-cliff-walk.jpg', 'watercolour-haymaking.jpg', 'turner-snow-storm.jpg', 'winter-blue-house.jpg', 'monet-beach.jpg'],
  material: ['charcoal-figure.jpg', 'watercolour-onderdonk.png', 'durer-rhinoceros.jpg', 'hokusai-great-wave.jpg', 'charcoal-torso.jpg', 'rodin-thinker.jpg'],
  design: ['toulouse-moulin-rouge-poster.jpg', 'recycling-symbol.png', 'mondrian-composition.jpg', 'morris-strawberry-thief.jpg', 'abstract-primary.jpg', 'durer-rhinoceros.jpg'],
  mood: ['winter-woman-blue.jpg', 'monet-beach.jpg', 'winter-kuindzhi.jpg', 'turner-snow-storm.jpg', 'caravaggio-calling.jpg', 'toulouse-ballet-dancers.jpg'],
  movement: ['toulouse-ballet-dancers.jpg', 'hokusai-great-wave.jpg', 'rodin-thinker.jpg', 'seurat-grande-jatte.jpg'],
  pattern: ['morris-strawberry-thief.jpg', 'mondrian-composition.jpg', 'abstract-primary.jpg', 'abstract-red-blue.jpg'],
};

const escapeXml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const rotate = (items, offset, count = 4) => Array.from({ length: count }, (_, index) => items[(index + offset) % items.length]);

function svgShell(prompt, body, definitions = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700" viewBox="0 0 1200 700" role="img">
  <title>Visual evidence for an Art and Design question</title>
  <desc>${escapeXml(prompt)}</desc>
  <defs>${definitions}</defs>
  <rect width="1200" height="700" rx="28" fill="#f7f3ea"/>
  <text x="600" y="48" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="#27231f">Study the four visual examples</text>
  ${body}
</svg>\n`;
}

function panel(index, inner, fill = '#fffdf8') {
  const x = index % 2 === 0 ? 42 : 622;
  const y = index < 2 ? 78 : 386;
  return `<g transform="translate(${x} ${y})">
    <rect width="536" height="270" rx="18" fill="${fill}" stroke="#413b34" stroke-width="3"/>
    <circle cx="30" cy="30" r="19" fill="#222"/><text x="30" y="37" text-anchor="middle" font-family="Arial" font-size="20" font-weight="700" fill="white">${String.fromCharCode(65 + index)}</text>
    ${inner}
  </g>`;
}

function choosePhotoPool(prompt, topicNumber) {
  const value = prompt.toLowerCase();
  if (/portrait|face|person|people|character/.test(value)) return photoPools.portrait;
  if (/poster|logo|cover|packag|chair|sign|advert|badge/.test(value)) return photoPools.design;
  if (/sculpt|material|watercolour|paint medium|charcoal|collage|print|mould|model/.test(value)) return photoPools.material;
  if (/sad|calm|peace|danger|mood|mystery|joy|lonely|isolat|tension|threat/.test(value)) return photoPools.mood;
  if (/movement|motion|running|dynamic|flowing/.test(value)) return photoPools.movement;
  if (/pattern|repeat|texture|line|shape/.test(value)) return photoPools.pattern;
  if (/landscape|depth|distance|foreground|background|scene|forest/.test(value)) return photoPools.landscape;
  if ([7].includes(topicNumber)) return photoPools.material;
  if ([8, 12, 17].includes(topicNumber)) return photoPools.design;
  if ([9].includes(topicNumber)) return photoPools.mood;
  return photoPools.style;
}

function photoGrid(prompt, topicNumber, questionIndex) {
  const images = rotate(choosePhotoPool(prompt, topicNumber), questionIndex, 4);
  const body = images.map((file, index) => panel(index,
    `<image href="${file}" x="16" y="14" width="504" height="242" preserveAspectRatio="xMidYMid slice"/>`, '#ede7dc')).join('\n');
  return svgShell(prompt, body);
}

function colourStudy(prompt, questionIndex) {
  const palettes = [
    ['#ef6b3b', '#f4b942', '#7f1d1d', '#fff1c1'],
    ['#b7d7f0', '#5d88b3', '#eaf6ff', '#263b59'],
    ['#f50057', '#00c2ff', '#ffe600', '#222222'],
    ['#8aa37b', '#d9c7a2', '#6b7d55', '#f4efe5'],
  ];
  const body = rotate(palettes, questionIndex).map((colours, index) => panel(index, `
    <rect x="70" y="42" width="396" height="176" rx="14" fill="${colours[3]}"/>
    <circle cx="268" cy="130" r="68" fill="${colours[0]}"/>
    <rect x="92" y="72" width="74" height="116" rx="8" fill="${colours[1]}"/>
    <path d="M360 72l76 116H284z" fill="${colours[2]}"/>`)).join('\n');
  return svgShell(prompt, body);
}

function lightStudy(prompt, questionIndex) {
  const definitions = Array.from({ length: 4 }, (_, index) => {
    const cx = [28, 72, 50, 35][(index + questionIndex) % 4];
    const cy = [24, 28, 72, 50][(index + questionIndex) % 4];
    return `<radialGradient id="light${index}" cx="${cx}%" cy="${cy}%" r="68%"><stop offset="0" stop-color="#fff"/><stop offset=".2" stop-color="#ddd"/><stop offset="1" stop-color="#2d3038"/></radialGradient>`;
  }).join('');
  const body = Array.from({ length: 4 }, (_, index) => {
    const shadowX = [292, 170, 270, 230][(index + questionIndex) % 4];
    const shadowWidth = [150, 95, 180, 120][index];
    return panel(index, `
      <path d="M82 56h92M82 56l30-18M82 56l28 22" stroke="#e3a21a" stroke-width="8" stroke-linecap="round"/>
      <ellipse cx="${shadowX}" cy="212" rx="${shadowWidth / 2}" ry="18" fill="#17202a" opacity=".35"/>
      <circle cx="252" cy="132" r="86" fill="url(#light${index})" stroke="#30343b" stroke-width="3"/>`);
  }).join('\n');
  return svgShell(prompt, body, definitions);
}

function patternStudy(prompt, questionIndex) {
  const body = Array.from({ length: 4 }, (_, index) => {
    const variant = (index + questionIndex) % 4;
    const marks = Array.from({ length: 12 }, (_, mark) => {
      const column = mark % 6;
      const row = Math.floor(mark / 6);
      const x = 72 + column * 72 + (variant === 3 && row ? 18 : 0);
      const y = 78 + row * 90;
      const colour = mark === 8 && variant === 2 ? '#e05b47' : ['#376a6f', '#d69d3f', '#78518b'][mark % 3];
      if (variant === 0) return `<circle cx="${x}" cy="${y}" r="24" fill="${colour}"/>`;
      if (variant === 1) return `<path d="M${x} ${y - 28}l28 50h-56z" fill="${colour}"/>`;
      return `<rect x="${x - 25}" y="${y - 25}" width="50" height="50" rx="${variant === 3 ? 5 : 22}" fill="${colour}" transform="rotate(${mark * 7} ${x} ${y})"/>`;
    }).join('');
    return panel(index, marks);
  }).join('\n');
  return svgShell(prompt, body);
}

function compositionStudy(prompt, questionIndex) {
  const layouts = [
    [[270, 138, 62], [140, 190, 30], [390, 190, 30]],
    [[120, 90, 55], [210, 160, 40], [300, 205, 25]],
    [[270, 120, 44], [270, 195, 32], [270, 62, 24]],
    [[110, 190, 55], [330, 105, 40], [430, 205, 25]],
  ];
  const body = rotate(layouts, questionIndex).map((layout, index) => panel(index, `
    <path d="M35 220h466" stroke="#91a78b" stroke-width="8"/>
    ${layout.map(([cx, cy, r], shape) => shape === 1
      ? `<rect x="${cx - r}" y="${cy - r}" width="${r * 2}" height="${r * 2}" fill="#d39845"/>`
      : `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${shape ? '#6687aa' : '#b94f55'}"/>`).join('')}`)).join('\n');
  return svgShell(prompt, body);
}

function designStudy(prompt, questionIndex) {
  const body = Array.from({ length: 4 }, (_, index) => {
    const variant = (index + questionIndex) % 4;
    const titleWidth = [310, 180, 390, 245][variant];
    const contrast = ['#17324d', '#9c978f', '#ae1827', '#2e6b52'][variant];
    return panel(index, `
      <rect x="70" y="30" width="396" height="210" rx="10" fill="${variant === 1 ? '#bdb8af' : '#f5f1e8'}" stroke="#655f58"/>
      <rect x="92" y="50" width="${titleWidth}" height="34" rx="5" fill="${contrast}"/>
      <circle cx="180" cy="150" r="48" fill="${contrast}" opacity="${variant === 1 ? '.45' : '1'}"/>
      <rect x="250" y="116" width="170" height="14" rx="7" fill="#544f49"/>
      <rect x="250" y="145" width="136" height="10" rx="5" fill="#8b837a"/>
      <rect x="250" y="171" width="154" height="10" rx="5" fill="#8b837a"/>
      <rect x="250" y="204" width="96" height="18" rx="5" fill="${contrast}"/>`);
  }).join('\n');
  return svgShell(prompt, body);
}

function differenceStudy(prompt, questionIndex) {
  const changedPanel = questionIndex % 4;
  const body = Array.from({ length: 4 }, (_, index) => {
    const changed = index === changedPanel;
    const count = changed && questionIndex % 3 === 0 ? 3 : 4;
    const objectX = changed && questionIndex % 3 === 1 ? 352 : 308;
    const accent = changed && questionIndex % 3 === 2 ? '#e14a45' : '#3778a6';
    return panel(index, `
      <path d="M68 214h400M92 214V86h352v128" fill="#e9dfce" stroke="#554e46" stroke-width="4"/>
      <rect x="${objectX}" y="126" width="62" height="88" fill="${accent}"/>
      <circle cx="172" cy="150" r="42" fill="#d9a941"/>
      ${Array.from({ length: count }, (_, item) => `<circle cx="${122 + item * 70}" cy="74" r="17" fill="#5b8c68"/>`).join('')}
      <path d="M338 210l${changed ? 70 : 48} 24" stroke="#423b35" stroke-width="10" stroke-linecap="round" opacity=".45"/>`);
  }).join('\n');
  return svgShell(prompt, body);
}

function sequenceStudy(prompt, questionIndex) {
  const rotations = [0, 45, 90, 135];
  const sequence = Array.from({ length: 4 }, (_, index) => {
    const size = 22 + index * 9;
    return `<g transform="translate(${130 + index * 190} 185) rotate(${rotations[index]})"><path d="M0 -${size}L${size} ${size}L-${size} ${size}z" fill="${index % 2 ? '#d7843d' : '#397b8b'}"/></g>${index < 3 ? `<text x="${225 + index * 190}" y="195" font-size="42" fill="#4d4842">→</text>` : ''}`;
  }).join('');
  const body = `<rect x="55" y="88" width="1090" height="205" rx="18" fill="#fffdf8" stroke="#413b34" stroke-width="3"/>${sequence}
  <text x="600" y="336" text-anchor="middle" font-family="Arial" font-size="22" font-weight="700" fill="#27231f">Which option continues the rule?</text>` +
    Array.from({ length: 4 }, (_, index) => {
      const x = 80 + index * 280;
      const rotation = rotations[(index + questionIndex + 1) % 4];
      const size = 44 + ((index + questionIndex) % 3) * 8;
      return `<g transform="translate(${x} 385)"><rect width="240" height="240" rx="18" fill="#fffdf8" stroke="#413b34" stroke-width="3"/><circle cx="28" cy="28" r="18" fill="#222"/><text x="28" y="35" text-anchor="middle" font-family="Arial" font-size="19" font-weight="700" fill="white">${String.fromCharCode(65 + index)}</text><g transform="translate(120 132) rotate(${rotation})"><path d="M0 -${size}L${size} ${size}L-${size} ${size}z" fill="${index % 2 ? '#397b8b' : '#d7843d'}"/></g></g>`;
    }).join('');
  return svgShell(prompt, body);
}

function renderVisual(topicNumber, questionIndex, prompt) {
  if (topicNumber === 3) return colourStudy(prompt, questionIndex);
  if (topicNumber === 4) return lightStudy(prompt, questionIndex);
  if (topicNumber === 5) return patternStudy(prompt, questionIndex);
  if ([6, 11].includes(topicNumber)) return compositionStudy(prompt, questionIndex);
  if ([8, 12, 17].includes(topicNumber)) return designStudy(prompt, questionIndex);
  if (topicNumber === 10) return differenceStudy(prompt, questionIndex);
  if (topicNumber === 13) return sequenceStudy(prompt, questionIndex);
  return photoGrid(prompt, topicNumber, questionIndex);
}

export async function createQuestionVisual({ topicNumber, questionIndex, prompt, outputNumber, outputDir }) {
  await mkdir(outputDir, { recursive: true });
  const filename = `visual-${String(outputNumber).padStart(3, '0')}.svg`;
  const target = path.join(outputDir, filename);
  for (let attempt = 1; attempt <= 8; attempt++) {
    try {
      await writeFile(target, renderVisual(topicNumber, questionIndex, prompt), 'utf8');
      break;
    } catch (error) {
      if (attempt === 8 || !['EBUSY', 'EPERM', 'UNKNOWN'].includes(error.code)) throw error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 75));
    }
  }
  return {
    file: filename,
    alt: `Four visual examples for: ${prompt}`,
  };
}
