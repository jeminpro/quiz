import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateSync, crc32 } from 'node:zlib';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import {
  findContentImages,
  linesFromTextItems,
  locateQuiz,
  questionsFromLines,
  findTickPoints,
} from './import-oak-quizzes.mjs';

const SOURCE_ROOT = 'C:/temp';
const QUESTION_ROOT = fileURLToPath(new URL('../src/content/questions/oak-national-academy/', import.meta.url));
const PUBLIC_ROOT = fileURLToPath(new URL('../public/questions/oak-national-academy/', import.meta.url));

function pngChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type), data]);
  const checksum = Buffer.alloc(4);
  checksum.writeUInt32BE(crc32(body) >>> 0);
  return Buffer.concat([length, body, checksum]);
}

function encodePng(width, height, rgba) {
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const row = y * (stride + 1);
    raw[row] = 0;
    rgba.copy(raw, row + 1, y * stride, (y + 1) * stride);
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk('IHDR', header),
    pngChunk('IDAT', deflateSync(raw)),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

function rgbaFromImage(image) {
  const { width, height, data, kind } = image;
  const pixels = width * height;
  const rgba = Buffer.alloc(pixels * 4);
  const source = Buffer.from(data);
  if (kind === 2 && source.length >= pixels * 3) {
    for (let index = 0; index < pixels; index += 1) {
      rgba[index * 4] = source[index * 3];
      rgba[index * 4 + 1] = source[index * 3 + 1];
      rgba[index * 4 + 2] = source[index * 3 + 2];
      rgba[index * 4 + 3] = 255;
    }
    return rgba;
  }
  if (kind === 3 && source.length >= pixels * 4) return source.subarray(0, pixels * 4);
  return null;
}

function imagesForQuestion(question, images) {
  const top = question.top + 28;
  const bottom = question.bottom - 18;
  return images
    .filter((image) => {
      const center = (image.y0 + image.y1) / 2;
      return center <= top && center >= bottom;
    })
    .sort((a, b) => b.y1 - a.y1);
}

async function loadImage(page, name) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Image timed out: ${name}`)), 8000);
    page.objs.get(name, (data) => {
      clearTimeout(timer);
      resolve(data);
    });
  });
}

async function indexQuestions() {
  const index = new Map();
  const folders = await readdir(QUESTION_ROOT, { withFileTypes: true });
  for (const folder of folders) {
    if (!folder.isDirectory()) continue;
    const directory = path.join(QUESTION_ROOT, folder.name);
    for (const name of await readdir(directory)) {
      if (!name.endsWith('.md')) continue;
      const file = path.join(directory, name);
      const text = await readFile(file, 'utf8');
      const subject = text.match(/^subject: (.+)$/m)?.[1];
      const topic = text.match(/^topics: \[(.+)\]$/m)?.[1];
      const bodyMatch = text.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/);
      if (!subject || !topic || !bodyMatch) continue;
      const stem = bodyMatch[1].replace(/!\[[^\]]*]\([^)]*\)\s*/g, '').trim();
      const topicName = JSON.parse(`[${topic}]`)[0];
      const choices = [...text.matchAll(/^ {4}text: (".*")$/gm)].map((match) => JSON.parse(match[1])).join('\n');
      const key = `${subject}\n${topicName}\n${stem}\n${choices}`;
      const record = { file, text, id: name.slice(0, -3), folder: folder.name };
      const existing = index.get(key);
      if (existing) existing.push(record);
      else index.set(key, [record]);
    }
  }
  return index;
}

async function collectPdfs() {
  const files = [];
  async function walk(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(directory, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.name.toLowerCase() === 'exit-quiz-answers.pdf') files.push(full);
    }
  }
  await walk(SOURCE_ROOT);
  return files;
}

async function mapPool(items, limit, worker) {
  let next = 0;
  async function run() {
    while (next < items.length) {
      const current = next;
      next += 1;
      await worker(items[current], current);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
}

function imageMarkdown(urls) {
  return urls.map((url) => `![Picture for the question](${url})`).join('\n\n');
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const limitArg = process.argv.find((arg) => arg.startsWith('--limit='));
  const limit = limitArg ? Number(limitArg.slice('--limit='.length)) : Infinity;
  const onlySubject = process.argv.find((arg) => arg.startsWith('--subject='))?.slice('--subject='.length);
  const match = process.argv.find((arg) => arg.startsWith('--match='))?.slice('--match='.length).toLowerCase();
  const index = await indexQuestions();
  const pdfs = (await collectPdfs())
    .map((file) => ({ file, location: locateQuiz(file) }))
    .filter((entry) => entry.location && (!onlySubject || entry.location.subjectKey === onlySubject) && (!match || entry.file.toLowerCase().includes(match)))
    .slice(0, Number.isFinite(limit) ? limit : undefined);
  console.log(`Quizzes to read: ${pdfs.length}`);
  let attached = 0;
  let imagesWritten = 0;
  let missing = 0;
  const missingSamples = [];
  const claimed = new Set();

  await mapPool(pdfs, 3, async (entry, indexNumber) => {
    if ((indexNumber + 1) % 100 === 0) console.log(`Read ${indexNumber + 1} of ${pdfs.length}`);
    const data = new Uint8Array(await readFile(entry.file));
    const document = await pdfjs.getDocument({ data, disableWorker: true, isEvalSupported: false, verbosity: 0 }).promise;
    try {
      for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
        const page = await document.getPage(pageNumber);
        const [text, operators] = await Promise.all([page.getTextContent(), page.getOperatorList()]);
        const parsed = questionsFromLines(linesFromTextItems(text.items), findTickPoints(operators));
        const figures = findContentImages(operators);
        for (const question of parsed.questions) {
          const figuresForQuestion = imagesForQuestion(question, figures);
          if (!figuresForQuestion.length) continue;
          const choiceKey = question.choices.map((choice) => choice.text).join('\n');
          const records = index.get(`${entry.location.subject}\n${entry.location.topic}\n${question.stem}\n${choiceKey}`);
          const record = records?.find((candidate) => !claimed.has(candidate.file));
          if (!record) {
            missing += 1;
            if (missingSamples.length < 12) missingSamples.push(`${entry.location.topic}: ${question.stem}`);
            continue;
          }
          claimed.add(record.file);
          const urls = [];
          for (const [figureIndex, figure] of figuresForQuestion.entries()) {
            let bitmap;
            try {
              bitmap = await loadImage(page, figure.name);
            } catch {
              continue;
            }
            const rgba = rgbaFromImage(bitmap);
            if (!rgba) continue;
            const suffix = figuresForQuestion.length > 1 ? `-${figureIndex + 1}` : '';
            const filename = `${record.id}${suffix}.png`;
            const url = `/questions/oak-national-academy/${record.folder}/${filename}`;
            if (!dryRun) {
              const directory = path.join(PUBLIC_ROOT, record.folder);
              await mkdir(directory, { recursive: true });
              await writeFile(path.join(directory, filename), encodePng(bitmap.width, bitmap.height, rgba));
            }
            urls.push(url);
          }
          if (!urls.length) continue;
          const bodyMatch = record.text.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/);
          const stem = bodyMatch[1].replace(/!\[[^\]]*]\([^)]*\)\s*/g, '').trim();
          const updated = `${record.text.slice(0, record.text.length - bodyMatch[1].length)}${imageMarkdown(urls)}\n\n${stem}\n`;
          if (!dryRun && updated !== record.text) await writeFile(record.file, updated);
          record.text = updated;
          attached += 1;
          imagesWritten += urls.length;
        }
      }
    } finally {
      await document.cleanup();
      await document.loadingTask?.destroy();
    }
  });

  console.log(`Questions with pictures: ${attached}`);
  console.log(`Pictures saved: ${imagesWritten}`);
  console.log(`Unmatched pictured questions: ${missing}`);
  for (const sample of missingSamples) console.log(`  unmatched: ${sample}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
