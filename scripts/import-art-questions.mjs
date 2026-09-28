import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { isUlid } from './ulid.mjs';

const sourcePath = process.argv.find((arg, index) => index > 1 && arg !== '--check');
const checkOnly = process.argv.includes('--check');
if (!sourcePath) {
  console.error('Usage: node scripts/import-art-questions.mjs <source.md> [--check]');
  process.exit(1);
}

const source = await readFile(sourcePath, 'utf8');
const blocks = [...source.matchAll(/```yaml\s*\r?\n([\s\S]*?)\r?\n```/g)].map((match) => match[1]);

function quotedValue(block, field) {
  const match = block.match(new RegExp(`^${field}:\\s*("(?:[^"\\\\]|\\\\.)*")\\s*$`, 'm'));
  if (!match) throw new Error(`Missing or invalid ${field}`);
  return JSON.parse(match[1]);
}

function scalarValue(block, field) {
  const match = block.match(new RegExp(`^${field}:\\s*(\\S+)\\s*$`, 'm'));
  if (!match) throw new Error(`Missing or invalid ${field}`);
  return match[1];
}

const questions = blocks.map((block, index) => {
  const id = scalarValue(block, 'id');
  const subject = scalarValue(block, 'subject');
  const topicMatch = block.match(/^topics:\s*\[\s*("(?:[^"\\]|\\.)*")\s*\]\s*$/m);
  const correctMatch = block.match(/^correctChoiceIds:\s*\[([A-D])\]\s*$/m);
  const choices = [...block.matchAll(/^\s*-\s*\{\s*id:\s*([A-D]),\s*text:\s*("(?:[^"\\]|\\.)*")\s*\}\s*$/gm)]
    .map((match) => ({ id: match[1], text: JSON.parse(match[2]) }));
  if (!isUlid(id)) throw new Error(`Question ${index + 1}: invalid ULID ${id}`);
  if (subject !== 'Art') throw new Error(`Question ${index + 1}: expected subject Art, found ${subject}`);
  if (!topicMatch) throw new Error(`Question ${index + 1}: expected exactly one topic`);
  if (choices.map((choice) => choice.id).join('') !== 'ABCD') {
    throw new Error(`Question ${index + 1}: expected choices A, B, C, D`);
  }
  if (!correctMatch) throw new Error(`Question ${index + 1}: invalid correct choice`);
  return {
    id,
    subject,
    topic: JSON.parse(topicMatch[1]),
    question: quotedValue(block, 'question'),
    choices,
    correctChoiceId: correctMatch[1],
    explanation: quotedValue(block, 'explanation'),
  };
});

if (questions.length !== 120) throw new Error(`Expected 120 questions, found ${questions.length}`);
if (new Set(questions.map((question) => question.id)).size !== questions.length) {
  throw new Error('Question IDs must be unique');
}

const outputDir = fileURLToPath(new URL('../src/content/questions/chatgpt/art/', import.meta.url));
if (!checkOnly) await mkdir(outputDir, { recursive: true });
for (const [index, question] of questions.entries()) {
  const filename = path.join(outputDir, `${String(index + 1).padStart(3, '0')}.md`);
  const content = [
    '---',
    `id: ${question.id}`,
    `subject: ${question.subject}`,
    `topics: [${JSON.stringify(question.topic)}]`,
    'choices:',
    ...question.choices.flatMap((choice) => [
      `  - id: ${choice.id}`,
      `    text: ${JSON.stringify(choice.text)}`,
    ]),
    `correctChoiceIds: [${question.correctChoiceId}]`,
    `explanation: ${JSON.stringify(question.explanation)}`,
    '---',
    question.question,
    '',
  ].join('\n');
  const previous = await readFile(filename, 'utf8').catch((error) => {
    if (error.code === 'ENOENT') return null;
    throw error;
  });
  if (checkOnly && previous === null) throw new Error(`Imported file is missing: ${filename}`);
  if (checkOnly && previous !== content) throw new Error(`Imported file differs: ${filename}`);
  if (!checkOnly) await writeFile(filename, content, 'utf8');
}

const topicCounts = new Map();
for (const question of questions) topicCounts.set(question.topic, (topicCounts.get(question.topic) ?? 0) + 1);
console.log(`${checkOnly ? 'Verified' : 'Imported'} ${questions.length} Art questions across ${topicCounts.size} topics.`);
for (const [name, count] of topicCounts) console.log(`- ${name}: ${count}`);
