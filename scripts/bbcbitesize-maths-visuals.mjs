import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

function rectangle() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="420" viewBox="0 0 640 420" role="img">
  <title>A rectangle 4 cm long and 3 cm wide</title>
  <desc>A rectangle drawn in the ratio 4 to 3. The bottom side is labelled 4 cm and the left side is labelled 3 cm.</desc>
  <rect width="640" height="420" fill="#f8fafc"/>
  <text x="320" y="42" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#1e293b">Rectangle</text>
  <rect x="170" y="80" width="320" height="240" fill="#ffffff" stroke="#1d4ed8" stroke-width="4"/>
  <text x="330" y="352" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#1e293b">4 cm</text>
  <text x="128" y="208" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#1e293b" transform="rotate(-90 128 208)">3 cm</text>
</svg>
`;
}

export async function writeMathsVisuals(dir) {
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'rectangle-4-by-3.svg'), rectangle(), 'utf8');
  return ['rectangle-4-by-3.svg'];
}
