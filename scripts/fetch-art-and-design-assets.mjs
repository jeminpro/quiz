import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const outputDir = path.join(root, 'public', 'questions', 'chatgpt', 'art-and-design');
const sourcesPath = path.join(outputDir, 'SOURCES.md');

const assets = [
  ['portrait-red-feather.jpg', 'Portrait of a lady with a red feather - Tranquillo Cremona.jpg', 'Tranquillo Cremona, Portrait of a Lady with a Red Feather', 'Public domain'],
  ['portrait-elizabeth-i.jpg', 'Elizabeth I portrait, Marcus Gheeraerts the Younger c.1595.jpg', 'Marcus Gheeraerts the Younger, portrait of Elizabeth I', 'Public domain'],
  ['portrait-georg-gisze.jpg', 'Hans Holbein der Jüngere - Der Kaufmann Georg Gisze - Google Art Project.jpg', 'Hans Holbein the Younger, Georg Gisze', 'Public domain'],
  ['abstract-primary.jpg', "'no title, nr. 5.015 - a small abstract painting in primary colors, painted in acrylic paint and geometric forms by artist Fons Heijnsbroek in 1991 - free image of art in high resolution.tif", 'Fons Heijnsbroek, abstract painting no. 5.015', 'CC0'],
  ['abstract-contrasting.jpg', "Abstract modern painting art in contrasting color shapes on canvas with oil paint - title, 'no. 5.088' - painted in 1999 by artist Fons Heijnsbroek - free download art image in high resolution.jpg", 'Fons Heijnsbroek, abstract painting no. 5.088', 'CC0'],
  ['abstract-red-blue.jpg', "Abstract modern painting art in strong contrasting color shapes in reds, blue and black - on canvas and oil paint - title, 'no. 5.091' - painted in 1999 by Dutch artist Fons Heijnsbroek - free download art image in high resolution.jpg", 'Fons Heijnsbroek, abstract painting no. 5.091', 'CC0'],
  ['winter-blue-house.jpg', 'Charles Rosen - The blue House (Village in Winter).jpg', 'Charles Rosen, The Blue House (Village in Winter)', 'Public domain'],
  ['winter-woman-blue.jpg', 'Woman in Blue, La Frette, Winter Albert Marquet (1940).jpg', 'Albert Marquet, Woman in Blue, La Frette, Winter', 'Public domain'],
  ['winter-kuindzhi.jpg', 'Kuindzhi Winter 1890 1895.jpg', 'Arkhip Kuindzhi, Winter', 'Public domain'],
  ['chiaroscuro-madonna.jpg', 'Chiaroscuro light-and-shade image of a Madonna.jpg', 'Chiaroscuro study of a Madonna', 'Public domain'],
  ['charcoal-figure.jpg', 'Charcoal Drawing of Female Figure, Vanderpoel.jpg', 'John H. Vanderpoel, charcoal figure study', 'Public domain'],
  ['charcoal-torso.jpg', 'Charcoal Drawing of Male Torse, Showing Wedge Formation, Vanderpoel.jpg', 'John H. Vanderpoel, charcoal torso study', 'Public domain'],
  ['watercolour-landscape.jpg', 'Brooklyn Museum - Landscape - William Trost Richards.jpg', 'William Trost Richards, Landscape', 'Public domain'],
  ['watercolour-onderdonk.png', 'Robert Onderdonk landscape watercolor on paper.png', 'Robert Onderdonk, landscape watercolour', 'Public domain'],
  ['watercolour-haymaking.jpg', 'Haymaking - Impressionist Watercolor, Figures in Landscape by Henri Duhem c1920.jpg', 'Henri Duhem, Haymaking', 'Public domain'],
  ['bronze-juansher.jpg', 'Bronze sculpture of Juansher.jpg', 'Bronze sculpture of Juansher', 'Public domain'],
  ['clay-animal.jpg', 'Figure of a animal, clay, Sicily, 3000-2000 BC, AM Agrigento, 121068.jpg', 'Ancient clay animal figure', 'CC BY-SA 4.0'],
  ['paper-collage.jpg', 'Collage of printed elements centered on Women, Children, Family and Rural Life MET DP886499.jpg', 'Collage of printed elements', 'CC0'],
  ['paper-cutouts.jpg', 'Jean Goulden - Gouache, silver paint and pencil on paper cut outs collaged on paper.jpg', 'Jean Goulden, paper cut-out collage', 'Public domain'],
  ['chinese-woodblock.jpg', 'Chinese woodblock print - MET CP 481 (cropped).jpg', 'Chinese woodblock print', 'CC0'],
  ['utamaro-woodblock.jpg', 'Drying clothes. Woodblock print by Kitagawa Utamaro (CBL J 2538).jpg', 'Kitagawa Utamaro, Drying Clothes', 'Public domain'],
  ['warning-symbol.jpg', 'Matchbox label - Warning Symbol Czechoslovakia Mid-Century - Czechoslovakia (circa 1940s) - MBP1612871678.jpg', 'Czechoslovak warning-symbol matchbox label', 'Public domain'],
  ['book-cover-children.jpg', "Mother Earth's Children cover.jpg", "Mother Earth's Children book cover", 'Public domain'],
  ['book-cover-forest.jpg', 'The Children of the New Forest - 1911 book cover.jpg', 'The Children of the New Forest book cover', 'Public domain'],
  ['book-cover-party.png', 'The Childrens Party Book book cover.png', "The Children's Party Book cover", 'Public domain'],
  ['chair-simple.jpg', 'Chair MET 68.70.10.jpg', 'Chair from the Metropolitan Museum of Art', 'CC0'],
  ['chair-side.jpg', 'Side Chair MET 245766.jpg', 'Side chair from the Metropolitan Museum of Art', 'CC0'],
  ['painting-sadness.jpg', 'Amélie Lundahl Sadness.jpg', 'Amélie Lundahl, Sadness', 'Public domain'],
  ['painting-longing.jpg', 'Almeida Júnior - Saudade (Longing) - Google Art Project.jpg', 'Almeida Júnior, Longing', 'Public domain'],
  ['painting-calm-sea.jpg', 'Granville Redmond - Sailboats on calm seas.jpg', 'Granville Redmond, Sailboats on Calm Seas', 'Public domain'],
  ['painting-calm-evening.jpg', 'Julius Sergius von Klever — Calm of the Evening (1894).jpg', 'Julius Sergius von Klever, Calm of the Evening', 'Public domain'],
];

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function fetchWithRetry(url) {
  let response;
  for (let attempt = 1; attempt <= 5; attempt++) {
    response = await fetch(url, { headers: { 'User-Agent': 'QuizContentBuilder/1.0' } });
    if (response.ok) return response;
    if (response.status !== 429 || attempt === 5) return response;
    await sleep(attempt * 4000);
  }
  return response;
}

await mkdir(outputDir, { recursive: true });
const downloadedAssets = [];
for (const [localName, commonsName] of assets) {
  try {
    await access(path.join(outputDir, localName));
    console.log(`Kept existing ${localName}`);
    downloadedAssets.push([localName, commonsName, assets.find((entry) => entry[0] === localName)[2], assets.find((entry) => entry[0] === localName)[3]]);
    continue;
  } catch {
    // Download missing assets only, so reruns can safely resume after rate limits.
  }
  const api = new URL('https://commons.wikimedia.org/w/api.php');
  api.search = new URLSearchParams({
    action: 'query',
    titles: `File:${commonsName}`,
    prop: 'imageinfo',
    iiprop: 'url',
    iiurlwidth: '1100',
    format: 'json',
    origin: '*',
  });
  const metadata = await fetchWithRetry(api);
  if (!metadata.ok) {
    console.warn(`Skipped ${localName}: metadata request returned ${metadata.status}`);
    continue;
  }
  const page = Object.values((await metadata.json()).query.pages)[0];
  const url = page.imageinfo?.[0]?.thumburl ?? page.imageinfo?.[0]?.url;
  if (!url) {
    console.warn(`Skipped ${localName}: no downloadable image was found`);
    continue;
  }
  const response = await fetchWithRetry(url);
  if (!response.ok) {
    console.warn(`Skipped ${localName}: download returned ${response.status}`);
    continue;
  }
  await writeFile(path.join(outputDir, localName), Buffer.from(await response.arrayBuffer()));
  downloadedAssets.push([localName, commonsName, assets.find((entry) => entry[0] === localName)[2], assets.find((entry) => entry[0] === localName)[3]]);
  console.log(`Downloaded ${localName}`);
  await sleep(1200);
}

const existing = await readFile(sourcesPath, 'utf8');
const marker = '\n## Additional question-level references\n';
const additions = downloadedAssets.map(([localName, commonsName, description, license]) =>
  `- \`${localName}\` - ${description} (${license}): https://commons.wikimedia.org/wiki/File:${encodeURIComponent(commonsName).replaceAll('%2F', '/')}`,
).join('\n');
const nextSources = `${existing.split(marker)[0].trimEnd()}${marker}\n${additions}\n`;
await writeFile(sourcesPath, nextSources, 'utf8');
console.log(`Downloaded ${assets.length} additional references and updated SOURCES.md.`);
