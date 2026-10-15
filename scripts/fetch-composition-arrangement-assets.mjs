import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const outputDir = path.join(root, 'public', 'questions', 'chatgpt', 'art-and-design');
const sourcesPath = path.join(outputDir, 'SOURCES.md');

const assets = [
  ['composition-073-focal-point.jpg', 'Girl with a Pearl Earring.jpg', 'Portrait with one strongly lit face and pearl isolated against a dark background', 'Public domain'],
  ['composition-074-effective-placement.jpg', 'Whistlers Mother high res.jpg', 'Off-centre seated subject balanced by a framed picture and curtain', 'Public domain'],
  ['composition-075-proximity.png', 'Gestalt proximity.svg', 'Two arrangements demonstrating how close spacing groups identical circles', 'Public domain'],
  ['composition-076-depth.jpg', 'Hobbema Het laantje van Middelharnis.jpg', 'Landscape using a narrowing avenue, overlap and decreasing scale to create depth', 'Public domain'],
  ['composition-077-bird-negative-space.jpg', 'Ando Hiroshige - Small Bird (Swallow ?) on Cherry Branch - 1920.162 - Cleveland Museum of Art.tif', 'Small bird made noticeable by its placement on a branch and the surrounding open space', 'CC0'],
  ['composition-078-balanced-circles.jpg', 'Vassily Kandinsky, 1926 - Several Circles, Gugg 0910 25.jpg', 'Abstract arrangement distributing circles of different sizes and colours across the frame', 'Public domain'],
  ['composition-079-room-perspective.jpg', "Vermeer's The Music Lesson.jpg", 'Interior whose tiled floor and receding wall lines make the room appear spacious', 'Public domain'],
  ['composition-080-landscape-layers.png', 'Termas de Chillán (Onofre Jarpa).png', 'Landscape with a rocky foreground, trees in the middle ground and mountains in the background', 'Public domain'],
  ['composition-081-crowded-scene.jpg', 'Pieter Bruegel the Elder - Children’s Games 1017.jpg', 'Densely populated scene containing many competing figures and activities', 'Public domain'],
  ['composition-087-directional-movement.jpg', 'Muybridge horse gallop.jpg', 'Sequential horse positions creating a clear left-to-right visual flow', 'Public domain'],
  ['composition-089-stable-triangle.jpg', 'Virgin of the Rocks.jpg', 'Figure group arranged in a stable triangular composition', 'Public domain'],
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

const heading = '## Composition and Arrangement';
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
console.log(`Downloaded ${assets.length} composition references and updated SOURCES.md.`);
