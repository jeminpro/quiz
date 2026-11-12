import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

function libraryBug() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="620" viewBox="0 0 800 620" role="img">
  <title>Library borrowing flowchart with a reversed decision</title>
  <desc>Start, then scan the library card, then the decision "Is the card valid?". The Yes arrow leads to "Stop. Do not lend a book". The No arrow leads to "Scan the book" and then "Lend the book".</desc>
  <rect width="800" height="620" fill="#f8fafc"/>
  <text x="400" y="36" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#1e293b">Borrowing a library book</text>
  <ellipse cx="400" cy="78" rx="70" ry="28" fill="#ffffff" stroke="#7c3aed" stroke-width="3"/>
  <text x="400" y="84" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#1e293b">Start</text>
  <line x1="400" y1="106" x2="400" y2="132" stroke="#db2777" stroke-width="3"/>
  <polygon points="400,132 394,144 406,144" fill="#db2777"/>
  <rect x="280" y="146" width="240" height="52" rx="8" fill="#ffffff" stroke="#7c3aed" stroke-width="3"/>
  <text x="400" y="178" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#1e293b">Scan library card</text>
  <line x1="400" y1="198" x2="400" y2="228" stroke="#db2777" stroke-width="3"/>
  <polygon points="400,228 394,240 406,240" fill="#db2777"/>
  <polygon points="400,236 560,310 400,384 240,310" fill="#ffffff" stroke="#7c3aed" stroke-width="3"/>
  <text x="400" y="304" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#1e293b">Is the card</text>
  <text x="400" y="328" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#1e293b">valid?</text>
  <line x1="240" y1="310" x2="130" y2="430" stroke="#db2777" stroke-width="3"/>
  <polygon points="130,430 122,416 142,418" fill="#db2777"/>
  <text x="168" y="360" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#9d174d">Yes</text>
  <rect x="40" y="436" width="230" height="72" rx="8" fill="#ffffff" stroke="#7c3aed" stroke-width="3"/>
  <text x="155" y="466" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#1e293b">Stop. Do not</text>
  <text x="155" y="490" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#1e293b">lend a book</text>
  <line x1="560" y1="310" x2="650" y2="430" stroke="#db2777" stroke-width="3"/>
  <polygon points="650,430 638,416 658,418" fill="#db2777"/>
  <text x="612" y="360" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#9d174d">No</text>
  <rect x="530" y="436" width="220" height="52" rx="8" fill="#ffffff" stroke="#7c3aed" stroke-width="3"/>
  <text x="640" y="468" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#1e293b">Scan the book</text>
  <line x1="640" y1="488" x2="640" y2="520" stroke="#db2777" stroke-width="3"/>
  <polygon points="640,520 634,508 646,508" fill="#db2777"/>
  <rect x="530" y="522" width="220" height="52" rx="8" fill="#ffffff" stroke="#7c3aed" stroke-width="3"/>
  <text x="640" y="554" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#1e293b">Lend the book</text>
</svg>
`;
}

export async function writeComputingVisuals(dir) {
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'library-bug.svg'), libraryBug(), 'utf8');
  return ['library-bug.svg'];
}
