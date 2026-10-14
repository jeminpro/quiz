import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const outputDir = path.join(root, 'public', 'questions', 'chatgpt', 'art-and-design');
const sourcesPath = path.join(outputDir, 'SOURCES.md');

const assets = [
  ['purpose-109-recycle-message.jpg', 'Recyclable Cardboard Packaging.jpg', 'Recycling message and recognisable recycling symbols printed on cardboard', 'CC BY 2.0'],
  ['purpose-110-mystery-cover.jpg', 'The Mystery at Lilac Inn (1930) front cover, 1940A-33 printing.jpg', 'Mystery story cover with suspenseful imagery', 'Public domain'],
  ['purpose-111-fragile-packaging.jpg', 'Packaging fragile items for delivery.jpg', 'Bottle protected inside a box with wood-wool cushioning', 'CC BY 2.0'],
  ['purpose-112-small-logo.png', 'Telegram 2019 simple logo.svg', 'Simple distinctive logo designed to remain clear at small sizes', 'Public domain text logo'],
  ['purpose-113-danger-warning.jpg', 'Danger sign.jpg', 'High-contrast danger sign with a clear warning word and symbol', 'Public domain'],
  ['purpose-114-eco-packaging.jpg', 'Eco-friendly cardboard packaging for takeaways.jpg', 'Paper and cardboard takeaway packaging with natural material cues', 'CC BY 2.0'],
  ['purpose-115-space-cover.jpg', 'A Honeymoon in Space cover.jpg', 'Book cover showing a spacecraft travelling through space', 'Public domain'],
  ['purpose-116-reading-poster.jpg', 'Little Miss Muffet 1940 poster.jpg', 'Child-friendly poster promoting reading through a picture-book scene', 'Public domain'],
  ['purpose-117-exit-sign.jpg', 'Glowing exit sign.jpg', 'Illuminated exit sign with large lettering and strong contrast', 'Public domain'],
  ['purpose-118-child-packaging.jpg', 'Cryrite box of crayons.jpg', 'Colourful crayon packaging made for children', 'Public domain'],
  ['purpose-119-clear-recruitment-poster.jpg', 'I want you for U.S. Army 3b48465u original.jpg', 'Recruitment advertisement with one focal figure and a concise readable message', 'Public domain'],
  ['purpose-120-black-white-logo.jpg', 'PS Black Logo.jpg', 'Recognisable black logo on a plain white background', 'Public domain text logo'],
  ['purpose-121-durable-case.jpg', 'Orange Hard Pelican Case (46363334931).jpg', 'Rugged hard case with sturdy proportions and protective construction', 'CC BY-SA 2.0'],
  ['purpose-122-historical-poster.jpg', 'Ausstellungsplakat zur Jahrhundertausstellung (Peter Behrens)-WUS03261.jpg', 'Peter Behrens historical exhibition poster from 1906', 'Public domain'],
  ['purpose-123-reading-corner.jpg', 'Reading nook (42177191191).jpg', 'Quiet library reading nook with comfortable seating', 'CC BY 2.0'],
  ['purpose-124-bold-recycling.png', 'Recycle001.svg', 'Simple bold recycling symbol with clear shapes and strong contrast', 'Public domain'],
  ['purpose-125-art-exhibition.jpg', 'William sommer exhibit poster.jpg', 'Art exhibition poster with an image, heading and event information', 'Public domain'],
  ['purpose-126-gift-package.jpg', 'Holiday Paper Gift Wrapping (Unsplash).jpg', 'Carefully wrapped gift parcels finished with twine and greenery', 'CC0'],
  ['purpose-127-prominent-date.jpg', 'OBMOKhU exhibition poster May 1920.jpg', 'Exhibition poster that makes its date part of the visible event information', 'Public domain'],
  ['purpose-128-clear-hierarchy.jpg', 'Exhibition Poster2024.jpg', 'Attractive exhibition poster organised with a clear information hierarchy', 'CC0'],
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

const marker = '\n## Art, Design and Purpose\n';
const section = [
  '## Art, Design and Purpose',
  '',
  ...assets.map(([localName, commonsName, description, license]) => {
    const page = `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(commonsName).replaceAll('%2F', '/')}`;
    return `- \`${localName}\` - ${description} (${license}): ${page}`;
  }),
  '',
].join('\n');

const existingSources = await readFile(sourcesPath, 'utf8');
const beforeSection = existingSources.split(marker)[0].trimEnd();
const afterSection = existingSources.includes(marker)
  ? existingSources.split(marker)[1].replace(/^.*?(?=\n## |$)/s, '').trimStart()
  : '';
const nextSources = `${beforeSection}\n\n${section}${afterSection ? `\n${afterSection}` : ''}`;
await writeFile(sourcesPath, nextSources, 'utf8');
console.log(`Downloaded ${assets.length} topic-specific references and updated SOURCES.md.`);
