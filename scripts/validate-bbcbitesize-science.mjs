import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ULID_PATTERN } from './ulid.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dir = path.join(root, 'src', 'content', 'questions', 'bbcbitesize', 'science');
const files = (await readdir(dir)).filter((name) => name.endsWith('.md'));
const ids = new Set();
const stems = new Set();
let withImage = 0;
const missing = [];

for (const file of files) {
  const text = await readFile(path.join(dir, file), 'utf8');
  const id = text.match(/^id: (.+)$/m)?.[1];
  const subject = text.match(/^subject: (.+)$/m)?.[1];
  const topics = text.match(/^topics: (.+)$/m)?.[1];
  const correct = text.match(/^correctChoiceIds: \[(.+)\]$/m)?.[1];
  const explanation = text.match(/^explanation: (.+)$/m)?.[1];
  const body = text.split('---').slice(2).join('---').trim();
  if (!id || !ULID_PATTERN.test(id) || ids.has(id)) throw new Error(`bad id in ${file}`);
  ids.add(id);
  if (subject !== 'Science') throw new Error(`subject in ${file}`);
  if (!topics || !explanation || !correct || !body) throw new Error(`incomplete ${file}`);
  const choiceIds = [...text.matchAll(/^[ \t]*- id: ([A-D])$/gm)].map((match) => match[1]);
  if (choiceIds.length !== 4 || new Set(choiceIds).size !== 4) throw new Error(`choices in ${file}`);
  for (const choiceId of correct.split(', ')) {
    if (!choiceIds.includes(choiceId)) throw new Error(`correct missing in ${file}`);
  }
  const key = body.replace(/\s+/g, ' ').toLowerCase();
  if (stems.has(key)) throw new Error(`duplicate stem in ${file}`);
  stems.add(key);
  const images = [...body.matchAll(/!\[[^\]]*]\(([^)]+)\)/g)].map((match) => match[1]);
  if (images.length) withImage += 1;
  for (const image of images) {
    const relative = image.replace(/^\//, '');
    try {
      await access(path.join(root, 'public', relative));
    } catch {
      missing.push(`${image} from ${file}`);
    }
  }
}

if (missing.length) throw new Error(`Missing images:\n${missing.join('\n')}`);
console.log(JSON.stringify({ files: files.length, withImage, missing: 0 }, null, 2));
