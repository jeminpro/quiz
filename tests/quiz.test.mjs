import test from 'node:test';
import assert from 'node:assert/strict';
import { eligibleQuestions, formatDuration, gradeItems, isCorrect, selectQuestions } from '../src/lib/quiz.ts';
import { groupSubjectsBySource, sourceIdFromEntryId } from '../src/lib/contentSources.ts';

const questions = [
  { id: 'one', subject: 'Maths', sourceId: 'chatgpt', topics: ['Fractions'], choices: [], correctChoiceIds: ['A'], stem: '', explanation: '' },
  { id: 'two', subject: 'Maths', sourceId: 'chatgpt', topics: ['Fractions', 'Geometry'], choices: [], correctChoiceIds: ['A', 'C'], stem: '', explanation: '' },
  { id: 'three', subject: 'Science', sourceId: 'chatgpt', topics: ['Plants'], choices: [], correctChoiceIds: ['B'], stem: '', explanation: '' },
  { id: 'four', subject: 'Maths', sourceId: 'oak-national-academy', topics: ['Geometry'], choices: [], correctChoiceIds: ['B'], stem: '', explanation: '' },
];

test('single and multiple answer marking requires the exact set', () => {
  assert.equal(isCorrect(questions[0], ['A']), true);
  assert.equal(isCorrect(questions[0], ['A', 'B']), false);
  assert.equal(isCorrect(questions[1], ['C', 'A']), true);
  assert.equal(isCorrect(questions[1], ['A']), false);
  assert.equal(isCorrect(questions[1], ['A', 'C', 'D']), false);
  assert.equal(isCorrect(questions[1], ['A', 'A']), false);
  assert.equal(gradeItems([questions[0]], {})[0].correct, false);
});

test('topic and wrong-answer pools stay within the chosen source and subject', () => {
  const progress = [
    { questionId: 'one', subject: 'Maths', topics: ['Fractions'], latestCorrect: true, everWrong: true },
    { questionId: 'two', subject: 'Maths', topics: ['Fractions', 'Geometry'], latestCorrect: false, everWrong: true },
    { questionId: 'three', subject: 'Science', topics: ['Plants'], latestCorrect: false, everWrong: true },
  ];
  assert.deepEqual(eligibleQuestions(questions, progress, 'Maths', 'chatgpt', ['Geometry'], 'all').map(q => q.id), ['two']);
  assert.deepEqual(eligibleQuestions(questions, progress, 'Maths', 'chatgpt', [], 'still-missed').map(q => q.id), ['two']);
  assert.deepEqual(eligibleQuestions(questions, progress, 'Maths', 'chatgpt', [], 'ever-missed').map(q => q.id), ['one', 'two']);
  assert.deepEqual(eligibleQuestions(questions, progress, 'Maths', 'oak-national-academy', [], 'all').map(q => q.id), ['four']);
});

test('subjects are grouped under every source that provides them', () => {
  assert.deepEqual(groupSubjectsBySource(questions), [
    { sourceId: 'chatgpt', subjects: [{ name: 'Maths', count: 2 }, { name: 'Science', count: 1 }] },
    { sourceId: 'oak-national-academy', subjects: [{ name: 'Maths', count: 1 }] },
  ]);
});

test('question paths require a registered source and subject folder', () => {
  assert.equal(sourceIdFromEntryId('chatgpt/pe/001'), 'chatgpt');
  assert.equal(sourceIdFromEntryId('oak-national-academy/maths/001'), 'oak-national-academy');
  assert.throws(() => sourceIdFromEntryId('pe/001'), /known source\/subject folder/);
  assert.throws(() => sourceIdFromEntryId('unknown/pe/001'), /known source\/subject folder/);
});

test('selection never duplicates questions and all includes the whole pool', () => {
  assert.equal(selectQuestions(questions, 15, () => 0).length, 4);
  assert.deepEqual(new Set(selectQuestions(questions, 'all', () => 0).map(q => q.id)).size, 4);
  assert.equal(selectQuestions(questions, 2, () => 0).length, 2);
});

test('elapsed time display rounds down to seconds', () => {
  assert.equal(formatDuration(61099), '1m 01s');
});
