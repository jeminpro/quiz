import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const assetsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'assets', 'bbcbitesize-music');

const photos = [
  'stick-pattern.png',
  'pitch-circles.png',
  'louder-circles.png',
  'staff-four-four.png',
  'guitar-tab.png',
];

function frame(title, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="280" viewBox="0 0 760 280" role="img">
  <title>${title}</title>
  <rect width="760" height="280" rx="18" fill="#f4f7fb"/>
  <text x="380" y="42" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#1f2937">${title}</text>
  ${body}
</svg>
`;
}

function section(x, letter, fill, label) {
  return `
  <rect x="${x}" y="90" width="112" height="100" rx="14" fill="${fill}" stroke="#1e3a8a" stroke-width="3"/>
  <text x="${x + 56}" y="148" text-anchor="middle" font-family="Arial, sans-serif" font-size="36" font-weight="700" fill="#1e3a8a">${letter}</text>
  <text x="${x + 56}" y="220" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" fill="#334155">${label}</text>`;
}

function ternaryForm() {
  return frame(
    'A ternary plan',
    `${section(70, 'A', '#dbeafe', 'first idea')}
    <text x="214" y="150" font-family="Arial, sans-serif" font-size="28" fill="#64748b">→</text>
    ${section(250, 'B', '#fde68a', 'new idea')}
    <text x="394" y="150" font-family="Arial, sans-serif" font-size="28" fill="#64748b">→</text>
    ${section(430, 'A', '#dbeafe', 'first idea')}`,
  );
}

function rondoForm() {
  const box = (x, letter, fill) => `
  <rect x="${x}" y="100" width="100" height="88" rx="12" fill="${fill}" stroke="#1e3a8a" stroke-width="3"/>
  <text x="${x + 50}" y="154" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" font-weight="700" fill="#1e3a8a">${letter}</text>`;
  return frame(
    'A rondo plan',
    `${box(50, 'A', '#dbeafe')}
    <text x="158" y="152" font-family="Arial, sans-serif" font-size="24" fill="#64748b">→</text>
    ${box(180, 'B', '#fde68a')}
    <text x="288" y="152" font-family="Arial, sans-serif" font-size="24" fill="#64748b">→</text>
    ${box(310, 'A', '#dbeafe')}
    <text x="418" y="152" font-family="Arial, sans-serif" font-size="24" fill="#64748b">→</text>
    ${box(440, 'C', '#bbf7d0')}
    <text x="548" y="152" font-family="Arial, sans-serif" font-size="24" fill="#64748b">→</text>
    ${box(570, 'A', '#dbeafe')}
    <text x="380" y="240" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#334155">Matching A boxes are the same music. B and C are different.</text>`,
  );
}

export async function writeMusicVisuals(directory) {
  await mkdir(directory, { recursive: true });
  await mkdir(assetsDir, { recursive: true });
  for (const name of photos) {
    await copyFile(path.join(assetsDir, name), path.join(directory, name));
  }
  const diagrams = [
    ['ternary-form.svg', ternaryForm()],
    ['rondo-form.svg', rondoForm()],
  ];
  for (const [name, svg] of diagrams) {
    await writeFile(path.join(directory, name), svg, 'utf8');
  }
  return [...photos, ...diagrams.map(([name]) => name)];
}
