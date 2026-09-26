import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const sourcePath = process.argv.find((arg, index) => index > 1 && arg !== '--check');
const checkOnly = process.argv.includes('--check');
if (!sourcePath) {
  console.error('Usage: node scripts/import-pe-questions.mjs <source.md> [--check]');
  process.exit(1);
}

const source = await readFile(sourcePath, 'utf8');
const lines = source.split(/\r?\n/);
const questions = [];
const answers = new Map();
let section = 'questions';
let topic = '';
let current = null;

function finishQuestion() {
  if (!current) return;
  const choiceIds = current.choices.map((choice) => choice.id).join('');
  if (choiceIds !== 'ABCD') throw new Error(`Question ${current.number}: expected A, B, C, D; found ${choiceIds}`);
  questions.push(current);
  current = null;
}

for (const rawLine of lines) {
  const line = rawLine.trim();
  if (line === '## Answers and short explanations') {
    finishQuestion();
    section = 'answers';
    topic = '';
    continue;
  }
  if (line === '## Sources and scope') break;

  if (section === 'questions') {
    if (line.startsWith('## ')) {
      finishQuestion();
      topic = line.slice(3);
      continue;
    }
    const questionMatch = line.match(/^\*\*(\d+)\.\s+(.+)\*\*$/);
    if (questionMatch) {
      finishQuestion();
      if (!topic) throw new Error(`Question ${questionMatch[1]} has no topic`);
      current = { number: Number(questionMatch[1]), topic, stem: questionMatch[2], choices: [] };
      continue;
    }
    const choiceMatch = line.match(/^([A-D])\.\s+(.+)$/);
    if (choiceMatch) {
      if (!current) throw new Error(`Choice ${choiceMatch[1]} has no question`);
      current.choices.push({ id: choiceMatch[1], text: choiceMatch[2] });
      continue;
    }
    if (line && current) throw new Error(`Unexpected line in question ${current.number}: ${line}`);
  } else {
    if (line.startsWith('### ')) {
      topic = line.slice(4);
      continue;
    }
    const answerMatch = line.match(/^(\d+)\.\s+\*\*([A-D])\*\*\s+[—–-]\s+(.+)$/);
    if (answerMatch) {
      const number = Number(answerMatch[1]);
      if (answers.has(number)) throw new Error(`Duplicate answer ${number}`);
      answers.set(number, { choiceId: answerMatch[2], explanation: answerMatch[3], topic });
      continue;
    }
    if (line && answers.size && !line.startsWith('Check these')) {
      throw new Error(`Unexpected answer line: ${line}`);
    }
  }
}
finishQuestion();

if (questions.length !== 120 || answers.size !== 120) {
  throw new Error(`Expected 120 questions and 120 answers, found ${questions.length} and ${answers.size}`);
}
const topicCounts = new Map();
for (const [index, question] of questions.entries()) {
  if (question.number !== index + 1) throw new Error(`Missing or out-of-order question at ${index + 1}`);
  const answer = answers.get(question.number);
  if (!answer || answer.topic !== question.topic) throw new Error(`Answer topic mismatch for question ${question.number}`);
  if (!answer.explanation || !question.choices.some((choice) => choice.id === answer.choiceId)) {
    throw new Error(`Invalid answer for question ${question.number}`);
  }
  topicCounts.set(question.topic, (topicCounts.get(question.topic) ?? 0) + 1);
}
if (topicCounts.size !== 6 || [...topicCounts.values()].some((count) => count !== 20)) {
  throw new Error(`Expected six topics of 20 questions, found ${JSON.stringify([...topicCounts])}`);
}

const outputDir = fileURLToPath(new URL('../src/content/questions/pe/gloucestershire/', import.meta.url));
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
if (!checkOnly) await mkdir(outputDir, { recursive: true });
for (const question of questions) {
  const answer = answers.get(question.number);
  const number = String(question.number).padStart(3, '0');
  const filename = path.join(outputDir, `${number}.md`);
  const previous = await readFile(filename, 'utf8').catch((error) => {
    if (error.code === 'ENOENT') return null;
    throw error;
  });
  if (checkOnly && previous === null) throw new Error(`Imported file is missing: ${filename}`);
  const previousId = previous?.match(/^id:[ \t]*(.*?)[ \t]*\r?$/m)?.[1];
  const id = previousId && uuidPattern.test(previousId) ? previousId : randomUUID();
  const content = [
    '---',
    `id: ${id}`,
    'subject: Physical Education',
    `topics: [${JSON.stringify(question.topic)}]`,
    'choices:',
    ...question.choices.flatMap((choice) => [
      `  - id: ${choice.id}`,
      `    text: ${JSON.stringify(choice.text)}`,
    ]),
    `correctChoiceIds: [${answer.choiceId}]`,
    `explanation: ${JSON.stringify(answer.explanation)}`,
    '---',
    question.stem,
    '',
  ].join('\n');
  if (checkOnly) {
    if (previous !== content) throw new Error(`Imported file differs: ${filename}`);
  } else {
    await writeFile(filename, content, 'utf8');
  }
}
console.log(`${checkOnly ? 'Verified' : 'Imported'} ${questions.length} PE questions across ${topicCounts.size} topics.`);
for (const [name, count] of topicCounts) console.log(`- ${name}: ${count}`);
