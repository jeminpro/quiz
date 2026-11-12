import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const escapeXml = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

function timeline({ title, caption, events, width = 1080, height = 300 }) {
  const left = 78;
  const axisRight = width - 36;
  const lastX = axisRight - 36;
  const y = 128;
  const span = lastX - left;
  const ticks = events.map((event, index) => {
    const x = left + (span * index) / (events.length - 1);
    const lines = event.label.split('\n');
    const text = lines.map((line, lineIndex) =>
      `<text x="${x}" y="${y + 36 + lineIndex * 18}" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" fill="#1f2937">${escapeXml(line)}</text>`,
    ).join('\n    ');
    return `
    <line x1="${x}" y1="${y - 14}" x2="${x}" y2="${y + 14}" stroke="#1d4e89" stroke-width="3"/>
    <circle cx="${x}" cy="${y}" r="7" fill="#1d4e89"/>
    ${text}`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
  <title>${escapeXml(title)}</title>
  <desc>${escapeXml(caption)}</desc>
  <rect width="${width}" height="${height}" rx="18" fill="#f4f7fb"/>
  <text x="${width / 2}" y="42" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#1f2937">${escapeXml(title)}</text>
  <text x="${width / 2}" y="72" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">${escapeXml(caption)}</text>
  <line x1="${left}" y1="${y}" x2="${axisRight}" y2="${y}" stroke="#1d4e89" stroke-width="4"/>
  <polygon points="${axisRight},${y} ${axisRight - 14},${y - 8} ${axisRight - 14},${y + 8}" fill="#1d4e89"/>
  ${ticks}
  <text x="24" y="268" font-family="Arial, sans-serif" font-size="14" fill="#64748b">earlier</text>
  <text x="${width - 24}" y="268" text-anchor="end" font-family="Arial, sans-serif" font-size="14" fill="#64748b">later</text>
</svg>
`;
}

export async function writeHistoryVisuals(directory) {
  await mkdir(directory, { recursive: true });
  const files = [
    [
      'britain-timeline.svg',
      timeline({
        title: 'A timeline of Britain',
        caption: 'Time runs from left (earlier) to right (later).',
        events: [
          { label: 'Stone Age' },
          { label: 'Romans\nAD 43' },
          { label: 'Anglo-\nSaxons' },
          { label: 'Vikings' },
          { label: '1066' },
          { label: 'Great Fire\n1666' },
          { label: 'Victorians' },
          { label: 'Moon landing\n1969' },
        ],
      }),
    ],
    [
      'living-memory-timeline.svg',
      timeline({
        title: 'Some events older people remember',
        caption: 'Time runs from left (earlier) to right (later).',
        events: [
          { label: 'VE Day\n1945' },
          { label: 'Windrush\n1948' },
          { label: 'Grandad born\n1955' },
          { label: 'Moon landing\n1969' },
          { label: 'Child born\n2016' },
        ],
        width: 860,
        height: 300,
      }),
    ],
  ];

  await Promise.all(files.map(([name, svg]) => writeFile(path.join(directory, name), svg, 'utf8')));
  return files.map(([name]) => name);
}
