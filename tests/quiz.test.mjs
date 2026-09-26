import test from 'node:test';
import assert from 'node:assert/strict';
import { eligibleQuestions, formatDuration, gradeItems, isCorrect, selectQuestions } from '../src/lib/quiz.ts';

const questions = [
  { id: 'one', subject: 'Maths', topics: ['Fractions'], choices: [], correctChoiceIds: ['A'], stem: '', explanation: '' },
  { id: 'two', subject: 'Maths', topics: ['Fractions', 'Geometry'], choices: [], correctChoiceIds: ['A', 'C'], stem: '', explanation: '' },
  { id: 'three', subject: 'Science', topics: ['Plants'], choices: [], correctChoiceIds: ['B'], stem: '', explanation: '' },
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

test('topic and wrong-answer pools stay within the chosen subject', () => {
  const progress = [
    { questionId: 'one', subject: 'Maths', topics: ['Fractions'], latestCorrect: true, everWrong: true },
    { questionId: 'two', subject: 'Maths', topics: ['Fractions', 'Geometry'], latestCorrect: false, everWrong: true },
    { questionId: 'three', subject: 'Science', topics: ['Plants'], latestCorrect: false, everWrong: true },
  ];
  assert.deepEqual(eligibleQuestions(questions, progress, 'Maths', ['Geometry'], 'all').map(q => q.id), ['two']);
  assert.deepEqual(eligibleQuestions(questions, progress, 'Maths', [], 'still-missed').map(q => q.id), ['two']);
  assert.deepEqual(eligibleQuestions(questions, progress, 'Maths', [], 'ever-missed').map(q => q.id), ['one', 'two']);
});

test('selection never duplicates questions and all includes the whole pool', () => {
  assert.equal(selectQuestions(questions, 15, () => 0).length, 3);
  assert.deepEqual(new Set(selectQuestions(questions, 'all', () => 0).map(q => q.id)).size, 3);
  assert.equal(selectQuestions(questions, 2, () => 0).length, 2);
});

test('elapsed time display rounds down to seconds', () => {
  assert.equal(formatDuration(61099), '1m 01s');
});
