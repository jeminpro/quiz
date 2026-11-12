import { mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { monotonicUlidFactory } from './ulid.mjs';
import { questions } from './bbcbitesize-history-questions.mjs';
import { writeHistoryVisuals } from './bbcbitesize-history-visuals.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const outputDir = path.join(root, 'src', 'content', 'questions', 'bbcbitesize', 'history');
const visualDir = path.join(root, 'public', 'questions', 'bbcbitesize', 'history');
const CHOICE_IDS = ['A', 'B', 'C', 'D'];

function rotateChoices(correct, wrong, offset) {
  const texts = [correct, ...wrong];
  const rotated = texts.map((_, index) => texts[(index + offset) % texts.length]);
  const correctIndex = (texts.length - (offset % texts.length)) % texts.length;
  return {
    choices: rotated.map((text, index) => ({ id: CHOICE_IDS[index], text })),
    correctChoiceIds: [CHOICE_IDS[correctIndex]],
  };
}

function toMarkdown(question) {
  return [
    '---',
    `id: ${question.id}`,
    'subject: History',
    `topics: [${JSON.stringify(question.topic)}]`,
    'choices:',
    ...question.choices.flatMap((choice) => [
      `  - id: ${choice.id}`,
      `    text: ${JSON.stringify(choice.text)}`,
    ]),
    `correctChoiceIds: [${question.correctChoiceIds.join(', ')}]`,
    `explanation: ${JSON.stringify(question.explanation)}`,
    '---',
    question.stem.trim(),
    '',
  ].join('\n');
}

function validate(rawQuestions) {
  if (rawQuestions.length < 180 || rawQuestions.length > 300) {
    throw new Error(`Expected 180–300 questions, got ${rawQuestions.length}`);
  }
  const stems = new Set();
  const topicCounts = new Map();
  for (const [index, question] of rawQuestions.entries()) {
    if (!question.topic || !question.stem?.trim() || !question.correct?.trim() || !question.explanation?.trim()) {
      throw new Error(`Incomplete question at index ${index}`);
    }
    if (!Array.isArray(question.wrong) || question.wrong.length !== 3 || question.wrong.some((choice) => !choice?.trim())) {
      throw new Error(`Question ${index} must have exactly 3 wrong answers`);
    }
    const choices = [question.correct, ...question.wrong].map((choice) => choice.trim().toLowerCase());
    if (new Set(choices).size !== 4) throw new Error(`Duplicate choice at index ${index}`);
    const key = question.stem.replace(/\s+/g, ' ').trim().toLowerCase();
    if (stems.has(key)) throw new Error(`Duplicate stem near index ${index}`);
    stems.add(key);
    if (question.stem.includes('![') && !question.explanation.includes('https://www.bbc.co.uk/bitesize/')) {
      throw new Error(`Image question ${index} is missing a Bitesize source URL`);
    }
    topicCounts.set(question.topic, (topicCounts.get(question.topic) ?? 0) + 1);
  }
  return topicCounts;
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const topicCounts = validate(questions);
  console.log(`Questions prepared: ${questions.length}`);
  for (const [topic, count] of [...topicCounts.entries()]) {
    console.log(`  ${topic}: ${count}`);
  }

  const nextId = monotonicUlidFactory();
  const built = questions.map((question, index) => {
    const { choices, correctChoiceIds } = rotateChoices(question.correct, question.wrong, index % 4);
    return {
      id: nextId(),
      topic: question.topic,
      stem: question.stem,
      explanation: question.explanation,
      choices,
      correctChoiceIds,
    };
  });

  const letters = { A: 0, B: 0, C: 0, D: 0 };
  for (const question of built) letters[question.correctChoiceIds[0]] += 1;
  console.log('Correct letters:', letters);

  if (dryRun) return;

  const visuals = await writeHistoryVisuals(visualDir);
  console.log(`Wrote ${visuals.length} diagrams to ${visualDir}`);

  await mkdir(outputDir, { recursive: true });
  const existing = await readdir(outputDir).catch(() => []);
  await Promise.all(
    existing.filter((name) => name.endsWith('.md')).map((name) => rm(path.join(outputDir, name))),
  );

  for (const question of built) {
    await writeFile(path.join(outputDir, `${question.id}.md`), toMarkdown(question), 'utf8');
  }
  console.log(`Wrote ${built.length} questions to ${outputDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
