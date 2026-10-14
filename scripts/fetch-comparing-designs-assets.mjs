import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const outputDir = path.join(root, 'public', 'questions', 'chatgpt', 'art-and-design');
const sourcesPath = path.join(outputDir, 'SOURCES.md');

const assets = [
  ['judgement-177-school-badge.png', 'Emblem of Wuling School (1927).svg', 'Simple historic school emblem built from a small number of bold, distinctive shapes', 'Public domain'],
  ['judgement-178-story-event.jpg', 'Beatrix potter peter rabbit and mr mcgregor013935).jpg', 'Beatrix Potter illustration clearly showing Peter Rabbit meeting Mr McGregor', 'Public domain'],
  ['judgement-179-child-book-cover.jpg', 'Peter Rabbit first edition 1902a.jpg', 'Children’s book cover with an approachable animal character and simple title treatment', 'Public domain'],
  ['judgement-180-product-ad.png', '1926 Coca-Cola Refresh yourself advertisement.png', 'Advertisement using scale, placement and contrast to emphasise its product', 'Public domain'],
  ['judgement-181-stackable-chairs.jpg', 'Plastic stacking chairs designed by Robin Day.jpg', 'Compact polypropylene chairs designed to stack and use space efficiently', 'CC0'],
  ['judgement-182-formal-pattern.jpg', 'Morris St James 1880.jpg', 'Finished coordinated wallpaper pattern designed for the formal setting of St James’s Palace', 'Public domain'],
  ['judgement-183-information-poster.jpg', 'William sommer exhibit poster.jpg', 'Exhibition poster arranging its heading, image and event details with open space', 'Public domain'],
  ['judgement-184-moving-animal-sculpture.jpg', 'Rearing horse MET 126016.jpg', 'Animal sculpture using a rearing pose, lifted legs and directional forms to suggest movement', 'CC0'],
  ['judgement-185-child-illustration.png', 'Peter-rabbit.PNG', 'Clear children’s illustration with recognisable characters and relevant action', 'Public domain'],
  ['judgement-186-poster-hierarchy.jpg', 'Exhibition Poster2024.jpg', 'Event poster with a distinct heading, main image and supporting details', 'CC0'],
  ['judgement-187-small-icon.png', 'Telegram 2019 simple logo.svg', 'Simple recognisable silhouette that remains legible at small sizes', 'Public domain text logo'],
  ['judgement-188-morning.jpg', 'Claude Monet - The Portal of Rouen Cathedral in Morning Light (1894) - Getty Center 2001.33.jpg', 'Monet’s Rouen Cathedral in morning light', 'Public domain'],
  ['judgement-188-sunset.jpg', 'Claude Monet - Rouen Cathedral, Facade (Sunset).JPG', 'Monet’s Rouen Cathedral at sunset', 'Public domain'],
  ['judgement-189-functional-chair.jpg', 'LCW (Lounge Chair Wood) Chair by Charles and Ray Eames, Honolulu Museum of Art 4410.1.JPG', 'Moulded plywood chair combining a coherent form with practical seating', 'CC0'],
  ['judgement-190-mood-expressions.jpg', "Facial expressions - The Cartoonist's Art.jpg", 'Character studies showing clearly different moods through changed facial expression and head position', 'Public domain'],
  ['judgement-191-road-symbol.png', 'Pedestrian-crosswalk-sign.svg', 'Road sign using a simple pedestrian silhouette for rapid recognition', 'Public domain'],
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

const heading = '## Comparing Designs and Making Judgements';
const section = [
  heading,
  '',
  ...assets.map(([localName, commonsName, description, license]) => {
    const page = `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(commonsName).replaceAll('%2F', '/')}`;
    return `- \`${localName}\` - ${description} (${license}): ${page}`;
  }),
  '',
].join('\n');

const existingSources = await readFile(sourcesPath, 'utf8');
const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const sectionPattern = new RegExp(`(?:^|\\n)${escapedHeading}\\n[\\s\\S]*?(?=\\n## |$)`);
const nextSources = sectionPattern.test(existingSources)
  ? existingSources.replace(sectionPattern, `\n${section.trimEnd()}`)
  : `${existingSources.trimEnd()}\n\n${section}`;
await writeFile(sourcesPath, `${nextSources.trimEnd()}\n`, 'utf8');
console.log(`Downloaded ${assets.length} references for 15 questions and updated SOURCES.md.`);
