import { mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { monotonicUlidFactory } from './ulid.mjs';
import { questions } from './bbcbitesize-science-questions.mjs';
import { writeScienceVisuals } from './bbcbitesize-science-visuals.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const outputDir = path.join(root, 'src', 'content', 'questions', 'bbcbitesize', 'science');
const visualDir = path.join(root, 'public', 'questions', 'bbcbitesize', 'science');
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
    'subject: Science',
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
  if (rawQuestions.length > 300) {
    throw new Error(`Too many questions: ${rawQuestions.length}`);
  }
  const stems = new Set();
  const topicCounts = new Map();
  for (const [index, question] of rawQuestions.entries()) {
    if (!question.topic || !question.stem || !question.correct || !question.explanation) {
      throw new Error(`Incomplete question at index ${index}`);
    }
    if (!Array.isArray(question.wrong) || question.wrong.length !== 3) {
      throw new Error(`Question ${index} must have exactly 3 wrong answers`);
    }
    const key = question.stem.replace(/\s+/g, ' ').trim().toLowerCase();
    if (stems.has(key)) throw new Error(`Duplicate stem near index ${index}`);
    stems.add(key);
    topicCounts.set(question.topic, (topicCounts.get(question.topic) ?? 0) + 1);
  }
  return topicCounts;
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const topicCounts = validate(questions);
  console.log(`Questions prepared: ${questions.length}`);
  for (const [topic, count] of [...topicCounts.entries()].sort(([a], [b]) => a.localeCompare(b))) {
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
      image: question.image,
    };
  });

  if (dryRun) {
    for (const question of built.slice(0, 5)) {
      console.log('---');
      console.log(question.topic);
      console.log(question.stem.slice(0, 120).replaceAll('\n', ' '));
      for (const choice of question.choices) {
        console.log(`${question.correctChoiceIds.includes(choice.id) ? '*' : ' '} ${choice.id}. ${choice.text}`);
      }
    }
    return;
  }

  const visuals = await writeScienceVisuals(visualDir);
  console.log(`Wrote ${visuals.length} diagrams to ${visualDir}`);

  await mkdir(outputDir, { recursive: true });
  const existing = await readdir(outputDir).catch(() => []);
  await Promise.all(
    existing
      .filter((name) => name.endsWith('.md'))
      .map((name) => rm(path.join(outputDir, name))),
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
