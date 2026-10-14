import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const outputDir = path.join(root, 'public', 'questions', 'chatgpt', 'art-and-design');
const sourcesPath = path.join(outputDir, 'SOURCES.md');

const assets = [
  ['applying-204-bird-illustration.jpg', '-Bird illustration- (48752723812).jpg', 'William Swainson bird illustration', 'Public domain'],
  ['applying-205-rainy-night.jpg', 'Rainy night in San Francisco (52768468996).jpg', 'Rainy street at night with wet reflections', 'CC BY 2.0'],
  ['applying-206-readable-poster.jpg', 'Federal Theatre Project presents "Created equal" by John Hunter Booth LCCN98516893.jpg', 'Federal Theatre Project poster with bold visual hierarchy', 'Public domain'],
  ['applying-207-walking-sculpture.jpg', 'Walking Man, Arto Chakmachyan, Yerevan 02.jpg', 'Arto Chakmachyan, Walking Man sculpture', 'CC BY-SA 4.0'],
  ['applying-208-forest-depth.jpg', 'Dülmen, Börnste, Waldweg -- 2015 -- 4649.jpg', 'Forest path with overlapping trees and visible depth', 'CC BY-SA 4.0'],
  ['applying-209-repeat-pattern.png', 'Abstract repeating pattern 47 by Ernest A Batchelder.png', 'Ernest A. Batchelder repeating design', 'Public domain'],
  ['applying-210-weathered.jpg', 'Rust on metal.jpg', 'Weathered, rusty metal texture', 'Public domain'],
  ['applying-210-polished.jpg', 'Shiny Metal (99999729).jpeg', 'Polished metal with sharp highlights and reflections', 'CC BY 3.0'],
  ['applying-211-frightening-character.jpg', 'Brother Lustig and the devils.jpg', 'Philipp Grot Johann illustration of frightening characters', 'Public domain'],
  ['applying-212-modern-package.jpg', 'White-Box-of-Chocolates.jpg', 'White product box with a restrained layout and clear forms', 'CC0'],
  ['applying-213-morning.jpg', 'Claude Monet - The Portal of Rouen Cathedral in Morning Light (1894) - Getty Center 2001.33.jpg', 'Claude Monet, Rouen Cathedral in Morning Light', 'Public domain'],
  ['applying-213-sunset.jpg', 'Claude Monet - Rouen Cathedral, Facade (Sunset).JPG', 'Claude Monet, Rouen Cathedral at Sunset', 'Public domain'],
  ['applying-214-history-display.jpg', 'Display, Todd County Historical Society Museum interior-01.jpg', 'Historical museum display with objects and period interpretation', 'CC BY-SA 4.0'],
  ['applying-215-cat-silhouette.png', 'Black Cat.svg', 'Clear and recognisable cat silhouette', 'CC0'],
  ['applying-216-windsock.jpg', 'Windsock blowing in the breeze (Unsplash).jpg', 'Fabric windsock curving in the wind', 'CC0'],
  ['applying-217-seamless-tile.png', 'Geometric Pattern.svg', 'Seamless geometric tile pattern', 'CC0'],
  ['applying-218-patterned-glass.jpg', 'Ornamentglas B - Ansicht 1.jpg', 'Patterned transparent glass showing distorted background colours', 'CC BY-SA 4.0'],
];

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function downloadAsset(localName, commonsName) {
  const target = path.join(outputDir, localName);
  try {
    await access(target);
    console.log(`Kept existing ${localName}`);
    return;
  } catch {
    // Continue to download the missing file.
  }

  const redirectUrl = `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(commonsName)}?width=1200`;
  let response;
  for (let attempt = 1; attempt <= 6; attempt++) {
    response = await fetch(redirectUrl, {
      headers: { 'User-Agent': 'QuizContentBuilder/1.0 (educational question assets)' },
      redirect: 'follow',
    });
    if (response.ok) break;
    if (attempt === 6) throw new Error(`${localName}: HTTP ${response.status}`);
    await sleep(attempt * 5000);
  }

  await writeFile(target, Buffer.from(await response.arrayBuffer()));
  console.log(`Downloaded ${localName}`);
  await sleep(1800);
}

await mkdir(outputDir, { recursive: true });
for (const [localName, commonsName] of assets) {
  await downloadAsset(localName, commonsName);
}

const marker = '\n## Applying Art Knowledge to New Situations\n';
const section = [
  '## Applying Art Knowledge to New Situations',
  '',
  ...assets.map(([localName, commonsName, description, license]) => {
    const page = `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(commonsName).replaceAll('%2F', '/')}`;
    return `- \`${localName}\` - ${description} (${license}): ${page}`;
  }),
  '',
].join('\n');

const existingSources = await readFile(sourcesPath, 'utf8');
const nextSources = `${existingSources.split(marker)[0].trimEnd()}\n\n${section}`;
await writeFile(sourcesPath, nextSources, 'utf8');
console.log(`Downloaded ${assets.length} topic-specific references and updated SOURCES.md.`);
