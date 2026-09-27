import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isUlid, monotonicUlidFactory } from './ulid.mjs';

const root = fileURLToPath(new URL('../src/content/questions/', import.meta.url));
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const nextId = monotonicUlidFactory();
const seen = new Map();
let changed = 0;

async function collect(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collect(filename));
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(filename);
  }
  return files;
}

const files = (await collect(root)).sort((left, right) => left.localeCompare(right));
for (const filename of files) {
  const original = await readFile(filename, 'utf8');
  const frontmatter = original.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatter) throw new Error(`Missing frontmatter: ${filename}`);
  const idLine = frontmatter[1].match(/^id:[ \t]*(.*?)[ \t]*\r?$/m);
  const oldId = idLine?.[1] ?? '';
  const id = !oldId || uuidPattern.test(oldId) ? nextId() : oldId;
  if (!isUlid(id)) throw new Error(`Invalid ULID ${oldId}: ${filename}`);
  if (seen.has(id)) throw new Error(`Duplicate question ID ${id}: ${seen.get(id)} and ${filename}`);
  seen.set(id, filename);
  if (id === oldId) continue;
  const newline = original.includes('\r\n') ? '\r\n' : '\n';
  const updated = idLine
    ? original.replace(/^id:[^\r\n]*(\r?\n)/m, `id: ${id}${newline}`)
    : original.replace(/^---\r?\n/, `---${newline}id: ${id}${newline}`);
  await writeFile(filename, updated, 'utf8');
  changed++;
}

console.log(`Checked ${seen.size} questions; assigned ${changed} ULIDs.`);
