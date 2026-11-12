import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ULID_PATTERN } from './ulid.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dir = path.join(root, 'src', 'content', 'questions', 'bbcbitesize', 'history');
const files = (await readdir(dir)).filter((name) => name.endsWith('.md'));
const ids = new Set();
const stems = new Set();
const topics = new Map();
const letters = { A: 0, B: 0, C: 0, D: 0 };
let withImage = 0;
const missing = [];

if (files.length < 180 || files.length > 300) {
  throw new Error(`Expected 180–300 history questions, got ${files.length}`);
}

for (const file of files) {
  const text = await readFile(path.join(dir, file), 'utf8');
  const id = text.match(/^id: (.+)$/m)?.[1];
  const subject = text.match(/^subject: (.+)$/m)?.[1];
  const topicLine = text.match(/^topics: (.+)$/m)?.[1];
  const correct = text.match(/^correctChoiceIds: \[(.+)\]$/m)?.[1];
  const explanation = text.match(/^explanation: (.+)$/m)?.[1];
  const body = text.split('---').slice(2).join('---').trim();
  if (!id || !ULID_PATTERN.test(id) || ids.has(id) || file !== `${id}.md`) throw new Error(`bad id in ${file}`);
  ids.add(id);
  if (subject !== 'History') throw new Error(`subject in ${file}`);
  if (!topicLine || !explanation || !correct || !body) throw new Error(`incomplete ${file}`);
  const topic = JSON.parse(topicLine)[0];
  topics.set(topic, (topics.get(topic) ?? 0) + 1);
  const choiceIds = [...text.matchAll(/^[ \t]*- id: ([A-D])$/gm)].map((match) => match[1]);
  const choiceTexts = [...text.matchAll(/^[ \t]*text: (".*")$/gm)].map((match) => JSON.parse(match[1]));
  if (choiceIds.join('') !== 'ABCD' || new Set(choiceTexts).size !== 4) throw new Error(`choices in ${file}`);
  const correctIds = correct.split(', ').map((item) => item.trim());
  if (correctIds.length !== 1 || !choiceIds.includes(correctIds[0])) throw new Error(`correct missing in ${file}`);
  letters[correctIds[0]] += 1;
  const key = body.replace(/\s+/g, ' ').toLowerCase();
  if (stems.has(key)) throw new Error(`duplicate stem in ${file}`);
  stems.add(key);
  const images = [...body.matchAll(/!\[[^\]]*]\(([^)]+)\)/g)].map((match) => match[1]);
  if (images.length) {
    withImage += 1;
    if (!explanation.includes('https://www.bbc.co.uk/bitesize/')) {
      throw new Error(`image question missing Bitesize source in ${file}`);
    }
  }
  for (const image of images) {
    if (/^https?:\/\//.test(image)) {
      if (!image.includes('bbc')) missing.push(`${image} from ${file}`);
      continue;
    }
    const relative = image.replace(/^\//, '');
    try {
      await access(path.join(root, 'public', relative));
    } catch {
      missing.push(`${image} from ${file}`);
    }
  }
}

if (missing.length) throw new Error(`Missing images:\n${missing.join('\n')}`);
const thin = [...topics.entries()].filter(([, count]) => count < 8);
if (thin.length) throw new Error(`Topics below 8: ${thin.map(([topic, count]) => `${topic} ${count}`).join(', ')}`);

console.log(JSON.stringify({
  files: files.length,
  withImage,
  letters,
  topics: Object.fromEntries([...topics.entries()].sort(([a], [b]) => a.localeCompare(b))),
}, null, 2));
