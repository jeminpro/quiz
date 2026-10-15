import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const outputDir = path.join(root, 'public', 'questions', 'chatgpt', 'art-and-design');
const sourcesPath = path.join(outputDir, 'SOURCES.md');

const assets = [
  ['evidence-239-child-logo.png', 'Every Kid in a Park logo.png', 'Colourful child-focused logo combining simple outdoor imagery with clear, approachable lettering', 'Public domain'],
  ['evidence-240-dramatic-painting.png', 'J.M.W. Turner Slave Ship ( Slavers Throwing Overboard the Dead and Dying, Typhoon Coming On). 1840.png', 'Turner seascape using intense light-dark contrast, storm lighting and sweeping diagonal movement', 'CC0'],
  ['evidence-244-impasto.jpg', 'Impasto detail.jpg', 'Close view of raised paint ridges, brush marks and visible canvas texture', 'CC BY-SA 4.0'],
  ['evidence-245-symmetrical-pattern.jpg', 'Blackwork Print with a Symmetric Grotesque Pattern MET DP827190.jpg', 'Decorative pattern whose corresponding forms mirror one another across a vertical axis', 'CC0'],
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

const heading = '## Evidence-Based Reasoning';
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
console.log(`Downloaded ${assets.length} evidence-based reasoning references and updated SOURCES.md.`);
