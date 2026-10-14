import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const outputDir = path.join(root, 'public', 'questions', 'chatgpt', 'art-and-design');
const sourcesPath = path.join(outputDir, 'SOURCES.md');

const assets = [
  ['colour-025-warm-still-life.jpg', 'Pierre Bonnard - Nature morte jaune et rouge.jpg', 'Pierre Bonnard still life dominated by warm yellows, oranges and reds', 'Artwork public domain; photograph CC BY-SA 4.0'],
  ['colour-026-cool-winter.jpg', 'Charles Rosen - The blue House (Village in Winter).jpg', 'Winter village dominated by cool blues, blue-greys and muted whites', 'Public domain'],
  ['colour-027-saturation-comparison.jpg', 'Saturation comparison.jpg', 'The same photograph shown at different saturation levels', 'CC BY-SA 3.0'],
  ['colour-028-complementary-object-grid.png', 'RGB scheme contrast of complementary colors.svg', 'Small coloured ellipses set against their contrasting complementary backgrounds', 'CC BY-SA 4.0'],
  ['colour-029-dramatic-sunset.jpg', 'Red and Purple Sunset.jpg', 'Dramatic sunset combining saturated red, orange and purple clouds', 'CC BY 4.0'],
  ['colour-030-strong-contrast.jpg', 'Piet Mondrian - Composition with Blue, Red, Yellow, and Black - 65.5 - Minneapolis Institute of Arts.jpg', 'Distinct areas of red, yellow and blue divided by black and white', 'Public domain'],
  ['colour-031-limited-palette.jpg', 'Whistler Gray and Gold.jpg', 'Whistler painting unified by a limited grey-and-gold palette', 'Public domain'],
  ['colour-032-readable-poster.png', 'Keep Calm and Carry On Poster.svg', 'Poster using high-contrast white lettering on a plain red background', 'Public domain'],
  ['colour-033-cheerful-colour.jpg', "Robert Delaunay - Symphonie colorée - 1917 - Musée d'art moderne de la Ville de Paris.jpg", 'Bright rainbow-like colour arranged in a lively painting', 'Public domain'],
  ['colour-034-warm-cool-wheel.png', 'Warm and cool colors.png', 'Colour wheel divided into cool blues and greens and warm reds and oranges', 'CC BY-SA 4.0'],
  ['colour-035-complementary-colours.jpg', 'Orange and Blue Complement Each Other -Explored April 2, 2017 - Flickr - Anne Worner.jpg', 'Orange flower made prominent by its complementary blue surroundings', 'CC BY-SA 2.0'],
  ['colour-036-earth-palette.jpg', 'Asher Brown Durand, Pastoral Landscape, 1861, NGA 72881.jpg', 'Calm natural landscape built from muted greens, browns and earth tones', 'CC0'],
  ['colour-037-subject-separation.jpg', 'Martin Johnson Heade - Magnolias - 47.1157 - Museum of Fine Arts.jpg', 'Pale magnolia flowers clearly separated from dark blue velvet', 'Public domain'],
  ['colour-038-balanced-bright-colour.jpg', 'Robert Delaunay - Simultaneous Contrasts-Sun and Moon - 1912.jpg', 'Bright colours balanced through repeated arcs distributed around the composition', 'Public domain'],
  ['colour-039-red-focal-point.jpg', 'Red Umbrella.jpg', 'A saturated red umbrella forming a focal point in a subdued street scene', 'CC BY 2.0'],
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

const heading = '## Colour and Visual Effects';
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
const sectionPattern = new RegExp(`(?:^|\\n)${heading.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}\\n[\\s\\S]*?(?=\\n## |$)`);
const nextSources = sectionPattern.test(existingSources)
  ? existingSources.replace(sectionPattern, `\n${section.trimEnd()}`)
  : `${existingSources.trimEnd()}\n\n${section}`;
await writeFile(sourcesPath, `${nextSources.trimEnd()}\n`, 'utf8');
console.log(`Downloaded ${assets.length} topic-specific references and updated SOURCES.md.`);
