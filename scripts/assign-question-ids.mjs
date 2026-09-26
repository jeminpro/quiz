import { randomUUID } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../src/content/questions/', import.meta.url));
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const seen = new Map();
let changed = 0;

async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) { await visit(filename); continue; }
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    const original = await readFile(filename, 'utf8');
    const frontmatter = original.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!frontmatter) throw new Error(`Missing frontmatter: ${filename}`);
    const idLine = frontmatter[1].match(/^id:[ \t]*(.*?)[ \t]*\r?$/m);
    const oldId = idLine?.[1] ?? '';
    if (oldId && !uuidPattern.test(oldId)) throw new Error(`Invalid UUID ${oldId}: ${filename}`);
    const id = oldId || randomUUID();
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
}

await visit(root);
console.log(`Checked ${seen.size} questions; assigned ${changed} UUIDs.`);
