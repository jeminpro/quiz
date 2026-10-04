import { readFile, readdir, mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import { monotonicUlidFactory } from './ulid.mjs';

const SOURCE_ROOT = 'C:/temp';
const OUTPUT_ROOT = fileURLToPath(new URL('../src/content/questions/oak-national-academy/', import.meta.url));
const CHOICE_IDS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const SUBJECTS = {
  arts_and_design: { folder: 'arts_and_design', subject: 'Art and Design' },
  computing: { folder: 'computing', subject: 'Computing' },
  design_technology: { folder: 'design_technology', subject: 'Design and Technology' },
  english: { folder: 'english', subject: 'English' },
  geography: { folder: 'geography', subject: 'Geography' },
  history: { folder: 'history', subject: 'History' },
  maths: { folder: 'maths', subject: 'Maths' },
  music: { folder: 'music', subject: 'Music' },
  science: { folder: 'science', subject: 'Science' },
};

const COMPUTING_EXCLUDE = new Set([
  'digital painting',
  'stop-frame animation',
  'audio production',
  'photo editing',
  'introduction to vector graphics',
  'video production',
]);

export function topicFromUnit(unit) {
  return unit.replace(/^\d+\s*-?\s*/, '').replace(/\s+/g, ' ').trim();
}

export function shouldKeepUnit(subjectKey, unit) {
  const name = unit.trim().toLowerCase();
  const topic = name.replace(/^\d+\s*-?\s*/, '');
  if (subjectKey === 'computing' && COMPUTING_EXCLUDE.has(topic)) return false;
  if (subjectKey === 'maths' && topic === 'coordinates') return false;
  if (subjectKey === 'maths' && /position and direction/.test(topic) && !/turn|angle|fraction/.test(topic)) return false;
  if (subjectKey === 'science' && /seasonal changes/.test(topic)) return false;
  return true;
}

export function fixLigatures(text) {
  return text.replace(/\u0000/g, (match, offset, source) => {
    const rest = source.slice(offset + match.length);
    const before = source.slice(0, offset);
    if (/di$/i.test(before) && /^(erent|erence|erences|icult|iculty|iculties)/i.test(rest)) return 'ff';
    if (/o$/i.test(before) && /^(ce|cial)(?![a-z])/i.test(rest)) return 'ffi';
    if (/^(at|ag|oor|ows?|ame|ash|avourful|avour|y|ying|ies|ex|ight|oat|ute|our|ower|annel)(?![a-z])/i.test(rest)) return 'fl';
    if (/^(e|ee|er|ect|ort|ice|icial|icient|ord|air)(?![a-z])/i.test(rest)) return 'ff';
    return 'fi';
  });
}

export function explainForChild(stem, answers) {
  const plain = answers.map((part) => part.replace(/[.]+$/, '').trim());
  const answer = joinAnswers(plain);
  const question = stem.replace(/\s+/g, ' ').trim().replace(/\?$/, '');
  if (/^true or false\b/i.test(question)) {
    const claim = question.replace(/^true or false\s*\??\s*[:.]?\s*/i, '').replace(/\?$/, '').trim();
    if (/^true$/i.test(answer)) return finish(claim);
    return claim ? `No. It is not true that ${lowercaseFirst(claim.replace(/\.$/, ''))}.` : 'No. That is not true.';
  }
  const call = question.match(/^what do we call (.+)$/i);
  if (call) return `${capitalise(answer)} is what we call ${call[1]}.`;
  const called = question.match(/^what (?:is|are) (.+?) called$/i);
  if (called) return `${capitalise(answer)} is what we call ${called[1]}.`;
  const blank = question.match(/^_+\s*(.+)$/);
  if (blank || question.includes('__________') || question.includes('___')) {
    const rest = (blank?.[1] ?? question).replace(/_+/g, '').trim();
    if (/^(is|are|was|were|means)\b/i.test(rest)) return finish(`${capitalise(answer)} ${rest}`);
    return `The blank should say ${answer}.`;
  }
  if (plain.length === 1 && /\b(is|are|was|were)\b/i.test(plain[0]) && plain[0].split(/\s+/).length > 6) {
    return finish(plain[0]);
  }
  const whatIs = question.match(/^what is (.+)$/i);
  if (whatIs && plain.length === 1 && !/\b(is|are|was|were)\b/i.test(plain[0])) {
    return finish(`${capitalise(answer)} is ${whatIs[1]}`);
  }
  if (/next number/i.test(question) && /^\d+$/.test(answer)) return `The next number is ${answer}.`;
  if (/missing number|number is missing/i.test(question) && /^\d+$/.test(answer)) return `The missing number is ${answer}.`;
  if (/^how (much|many|long|far)\b/i.test(question) && plain.length === 1) {
    return `${finish(answer)} That is ${lowercaseFirst(question)}.`;
  }
  if (plain.length > 1) return `${capitalise(answer)} are the right answers.`;
  return finish(answer);
}

function joinAnswers(answers) {
  if (answers.length <= 1) return answers[0] ?? '';
  if (answers.length === 2) return `${answers[0]} and ${answers[1]}`;
  return `${answers.slice(0, -1).join(', ')} and ${answers[answers.length - 1]}`;
}

function capitalise(text) {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function finish(text) {
  const sentence = capitalise(text).replace(/\s+/g, ' ').trim().replace(/\s+\./g, '.');
  return /[.!?]$/.test(sentence) ? sentence : `${sentence}.`;
}

function lowercaseFirst(text) {
  if (!text) return text;
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function isGreen(args) {
  const raw = Array.isArray(args) ? args[0] : args;
  if (typeof raw !== 'string' || !raw.startsWith('#')) return false;
  const value = Number.parseInt(raw.slice(1), 16);
  if (!Number.isFinite(value)) return false;
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  return green > 80 && green > red + 30 && green > blue + 20;
}

function multiplyMatrix(current, next) {
  const [a1, b1, c1, d1, e1, f1] = current;
  const [a2, b2, c2, d2, e2, f2] = next;
  return [
    a1 * a2 + c1 * b2,
    b1 * a2 + d1 * b2,
    a1 * c2 + c1 * d2,
    b1 * c2 + d1 * d2,
    a1 * e2 + c1 * f2 + e1,
    b1 * e2 + d1 * f2 + f1,
  ];
}

function applyMatrix(matrix, x, y) {
  return [matrix[0] * x + matrix[2] * y + matrix[4], matrix[1] * x + matrix[3] * y + matrix[5]];
}

export function findTickPoints(operatorList) {
  const { OPS } = pdfjs;
  const ticks = [];
  let matrix = [1, 0, 0, 1, 0, 0];
  const stack = [];
  let pendingGreen = false;
  for (let index = 0; index < operatorList.fnArray.length; index += 1) {
    const fn = operatorList.fnArray[index];
    const args = operatorList.argsArray[index];
    if (fn === OPS.save) stack.push(matrix);
    else if (fn === OPS.restore) matrix = stack.pop() ?? matrix;
    else if (fn === OPS.transform) matrix = multiplyMatrix(matrix, args);
    else if (fn === OPS.setFillRGBColor) pendingGreen = isGreen(args);
    else if (fn === OPS.constructPath && pendingGreen) {
      const bounds = args?.[2];
      if (bounds && bounds.length >= 4) {
        const [x, y] = applyMatrix(matrix, (bounds[0] + bounds[2]) / 2, (bounds[1] + bounds[3]) / 2);
        ticks.push({ x, y });
      }
      pendingGreen = false;
    }
  }
  return ticks;
}

function isNoiseLine(text) {
  return /exit quiz|oak national academy|open government licence|licensed on the|produced in partnership|terms & conditions|scratch is a project|scratchjr is a project|cc by|available for free|https?:|scratch\.org|image \d|foundation under|project of the|©/i.test(text);
}

export function linesFromTextItems(items) {
  const rows = [];
  for (const item of items) {
    const text = item.str ?? '';
    if (!text.trim()) continue;
    const y = item.transform[5];
    const x = item.transform[4];
    let row = rows.find((candidate) => Math.abs(candidate.y - y) < 2.2);
    if (!row) {
      row = { y, items: [] };
      rows.push(row);
    }
    row.items.push({ x, text, width: item.width || 0 });
  }
  return rows
    .sort((a, b) => b.y - a.y)
    .map((row) => {
      const parts = row.items.sort((a, b) => a.x - b.x);
      let text = '';
      let lastEnd = null;
      for (const part of parts) {
        if (lastEnd != null && part.x - lastEnd > 1.4) text += ' ';
        text += part.text;
        lastEnd = part.x + part.width;
      }
      return {
        y: row.y,
        x: parts[0].x,
        text: fixLigatures(text).replace(/\s+/g, ' ').trim(),
      };
    })
    .filter((line) => line.text && line.y > 80 && !isNoiseLine(line.text) && !(line.x > 400 && /^\d+$/.test(line.text)));
}

function cleanStem(stem) {
  const cleaned = stem
    .replace(/\(\s*tick\s+\d+\s+correct\s+answers?\s*\)/ig, '')
    .replace(/\btick\s+\d+\s+correct\s+answers?\b/ig, '')
    .replace(/\ban a\b/ig, 'a')
    .replace(/\s+/g, ' ')
    .replace(/\s+([?.!,])/g, '$1')
    .trim();
  return /^[a-z]/.test(cleaned) ? `________ ${cleaned}` : cleaned;
}

function skipKind(rawStem) {
  const stem = rawStem.toLowerCase();
  if (/use numbers|correct order|put these|rank the|in the correct order/.test(stem)) return 'ranking';
  if (/write the correct letter|in each box|match the/.test(stem)) return 'matching';
  if (/fill in the blank/.test(stem)) return 'fill-in';
  if (/\bwhich (image|picture|photo)\b|\bpictures below\b|\bimage below\b|\bshown below\b|\bthis (image|picture|photo|diagram|letter|shape|graph|map|drawing|symbol)\b|\bwhat is this\b|\blook at (the|this)\b|^this is a (view|picture|photo|image|map|graph|diagram)\b|\bwhich directions? would\b/.test(stem)) {
    return 'picture';
  }
  return null;
}

function promptFinished(text) {
  return /correct answers?\)?/i.test(text)
    || /fill in the blank/i.test(text)
    || /correct order/i.test(text)
    || /each box/i.test(text)
    || /use numbers/i.test(text)
    || (/\?\s*$/.test(text) && !/\(\s*tick\b/i.test(text));
}

export function questionsFromLines(lines, ticks) {
  const grouped = [];
  let current = null;
  for (const line of lines) {
    const numbered = line.text.match(/^(\d{1,2})\s+(.+)$/);
    const bareNumber = /^(\d{1,2})$/.test(line.text);
    const startsQuestion = line.x < 85 && ((numbered && Number(numbered[1]) >= 1 && Number(numbered[1]) <= 40) || bareNumber);
    if (startsQuestion) {
      if (current) grouped.push(current);
      current = {
        lines: numbered ? [{ ...line, text: numbered[2] }] : [],
      };
      continue;
    }
    if (current) current.lines.push(line);
  }
  if (current) grouped.push(current);

  const questions = [];
  const skipped = [];
  for (const group of grouped) {
    const stemLines = [];
    let index = 0;
    for (; index < group.lines.length; index += 1) {
      stemLines.push(group.lines[index].text);
      if (promptFinished(stemLines.join(' '))) {
        index += 1;
        break;
      }
    }
    const rawStem = stemLines.join(' ').replace(/\s+/g, ' ').trim();
    const choiceLines = group.lines.slice(index).filter((line) => !isNoiseLine(line.text) && line.text.length < 220);
    const kind = skipKind(rawStem);
    if (kind) {
      skipped.push(kind);
      continue;
    }
    if (choiceLines.length < 2) {
      skipped.push('too-few-choices');
      continue;
    }
    const top = group.lines[0]?.y ?? choiceLines[0].y;
    const bottom = choiceLines[choiceLines.length - 1].y;
    const questionTicks = ticks.filter((tick) => tick.y <= top + 8 && tick.y >= bottom - 8);
    const expected = rawStem.match(/tick\s+(\d+)/i);
    if (expected && questionTicks.length !== Number(expected[1])) {
      skipped.push('tick-count');
      continue;
    }
    if (questionTicks.length < 1) {
      skipped.push('no-tick');
      continue;
    }
    const used = new Set();
    const correctIndexes = [];
    let unmatched = false;
    for (const tick of questionTicks) {
      let best = null;
      let bestDistance = 15;
      choiceLines.forEach((choice, choiceIndex) => {
        if (used.has(choiceIndex)) return;
        if (tick.x > choice.x + 36) return;
        const distance = Math.abs(choice.y - tick.y);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = choiceIndex;
        }
      });
      if (best == null) {
        unmatched = true;
        break;
      }
      used.add(best);
      correctIndexes.push(best);
    }
    if (unmatched) {
      skipped.push('unmatched-tick');
      continue;
    }
    const stem = cleanStem(rawStem);
    if (!stem) {
      skipped.push('empty-stem');
      continue;
    }
    const choices = choiceLines.map((choice, choiceIndex) => ({
      id: CHOICE_IDS[choiceIndex],
      text: choice.text,
    }));
    if (choices.some((choice) => !choice.id || !choice.text)) {
      skipped.push('bad-choice');
      continue;
    }
    questions.push({
      stem,
      choices,
      correctChoiceIds: correctIndexes.sort((a, b) => a - b).map((choiceIndex) => CHOICE_IDS[choiceIndex]),
    });
  }
  return { questions, skipped };
}

async function readQuiz(file) {
  const data = new Uint8Array(await readFile(file));
  const document = await pdfjs.getDocument({ data, disableWorker: true, isEvalSupported: false, verbosity: 0 }).promise;
  try {
    const questions = [];
    const skipped = [];
    for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
      const page = await document.getPage(pageNumber);
      const [text, operators] = await Promise.all([page.getTextContent(), page.getOperatorList()]);
      const parsed = questionsFromLines(linesFromTextItems(text.items), findTickPoints(operators));
      questions.push(...parsed.questions);
      skipped.push(...parsed.skipped);
    }
    return { questions, skipped };
  } finally {
    await document.cleanup();
    await document.loadingTask?.destroy();
  }
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

function locateQuiz(file) {
  const parts = path.relative(SOURCE_ROOT, file).split(path.sep);
  if (parts.length < 4) return null;
  const [subjectKey, year, unit] = parts;
  const subject = SUBJECTS[subjectKey];
  if (!subject || !/^Year [1-5]$/.test(year) || !shouldKeepUnit(subjectKey, unit)) return null;
  return { ...subject, subjectKey, year, unit, topic: topicFromUnit(unit) };
}

function toMarkdown(question) {
  return [
    '---',
    `id: ${question.id}`,
    `subject: ${question.subject}`,
    `topics: [${JSON.stringify(question.topic)}]`,
    'choices:',
    ...question.choices.flatMap((choice) => [
      `  - id: ${choice.id}`,
      `    text: ${JSON.stringify(choice.text)}`,
    ]),
    `correctChoiceIds: [${question.correctChoiceIds.join(', ')}]`,
    `explanation: ${JSON.stringify(question.explanation)}`,
    '---',
    question.stem,
    '',
  ].join('\n');
}

async function mapPool(items, limit, worker) {
  const results = new Array(items.length);
  let next = 0;
  async function run() {
    while (next < items.length) {
      const current = next;
      next += 1;
      results[current] = await worker(items[current], current);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const limitArg = process.argv.find((arg) => arg.startsWith('--limit='));
  const limit = limitArg ? Number(limitArg.slice('--limit='.length)) : Infinity;
  const onlySubject = process.argv.find((arg) => arg.startsWith('--subject='))?.slice('--subject='.length);
  const match = process.argv.find((arg) => arg.startsWith('--match='))?.slice('--match='.length).toLowerCase();
  const pdfs = (await collectPdfs())
    .map((file) => ({ file, location: locateQuiz(file) }))
    .filter((entry) => entry.location && (!onlySubject || entry.location.subjectKey === onlySubject) && (!match || entry.file.toLowerCase().includes(match)))
    .slice(0, Number.isFinite(limit) ? limit : undefined);

  const keptUnits = new Map();
  for (const entry of pdfs) {
    const key = `${entry.location.subjectKey}\t${entry.location.topic}`;
    keptUnits.set(key, (keptUnits.get(key) ?? 0) + 1);
  }
  console.log(`Quizzes to read: ${pdfs.length}`);

  const parsed = await mapPool(pdfs, 4, async (entry, index) => {
    if ((index + 1) % 100 === 0) console.log(`Read ${index + 1} of ${pdfs.length}`);
    try {
      const quiz = await readQuiz(entry.file);
      return { ...entry, ...quiz };
    } catch (error) {
      console.error(`Failed ${entry.file}: ${error.message}`);
      return { ...entry, questions: [], skipped: ['error'], error: error.message };
    }
  });

  const skipCounts = new Map();
  const seen = new Set();
  const questions = [];
  for (const quiz of parsed) {
    for (const reason of quiz.skipped) skipCounts.set(reason, (skipCounts.get(reason) ?? 0) + 1);
    for (const question of quiz.questions) {
      const key = `${quiz.location.subject}\n${quiz.location.topic}\n${question.stem}\n${question.choices.map((choice) => choice.text).join('\n')}`;
      if (seen.has(key)) {
        skipCounts.set('duplicate', (skipCounts.get('duplicate') ?? 0) + 1);
        continue;
      }
      seen.add(key);
      questions.push({
        ...question,
        subject: quiz.location.subject,
        folder: quiz.location.folder,
        topic: quiz.location.topic,
        explanation: explainForChild(question.stem, question.correctChoiceIds.map((id) => question.choices.find((choice) => choice.id === id).text)),
        file: quiz.file,
      });
    }
  }

  console.log(`Questions: ${questions.length}`);
  console.log('Skipped:', [...skipCounts.entries()].map(([reason, count]) => `${reason}=${count}`).join(', ') || 'none');
  if (dryRun) {
    for (const question of questions.slice(0, 12)) {
      console.log('---');
      console.log(question.subject, '|', question.topic);
      console.log(question.stem);
      for (const choice of question.choices) {
        console.log(`${question.correctChoiceIds.includes(choice.id) ? '*' : ' '} ${choice.id}. ${choice.text}`);
      }
      console.log(question.explanation);
    }
    return;
  }

  const nextId = monotonicUlidFactory();
  for (const question of questions) question.id = nextId();
  const folders = [...new Set(questions.map((question) => question.folder))];
  for (const folder of folders) {
    const directory = path.join(OUTPUT_ROOT, folder);
    await mkdir(directory, { recursive: true });
    const existing = await readdir(directory);
    await Promise.all(existing.filter((name) => name.endsWith('.md')).map((name) => rm(path.join(directory, name))));
  }
  await mapPool(questions, 16, async (question) => {
    await writeFile(path.join(OUTPUT_ROOT, question.folder, `${question.id}.md`), toMarkdown(question), 'utf8');
  });
  const bySubject = new Map();
  for (const question of questions) bySubject.set(question.subject, (bySubject.get(question.subject) ?? 0) + 1);
  for (const [subject, count] of [...bySubject.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    console.log(`${subject}: ${count}`);
  }
  console.log('Done');
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
