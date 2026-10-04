import test from 'node:test';
import assert from 'node:assert/strict';
import { explainForChild, fixLigatures, shouldKeepUnit, topicFromUnit } from '../scripts/import-oak-quizzes.mjs';

test('topic names drop the unit number and keep the lesson title', () => {
  assert.equal(topicFromUnit('Creating animations in programs'), 'Creating animations in programs');
  assert.equal(topicFromUnit('01 - Changes within living memory - what changed'), 'Changes within living memory - what changed');
  assert.equal(topicFromUnit('01 Mark-making - using drawing tools and techniques'), 'Mark-making - using drawing tools and techniques');
});

test('unit filter follows the parent-guide subject aims', () => {
  assert.equal(shouldKeepUnit('computing', 'Creating animations in programs'), true);
  assert.equal(shouldKeepUnit('computing', 'Digital writing'), true);
  assert.equal(shouldKeepUnit('computing', 'Digital painting'), false);
  assert.equal(shouldKeepUnit('computing', 'Video production'), false);
  assert.equal(shouldKeepUnit('science', '02 Seasonal changes- autumn and winter'), false);
  assert.equal(shouldKeepUnit('science', '06 Everyday materials'), true);
  assert.equal(shouldKeepUnit('maths', '17 Position and direction'), false);
  assert.equal(shouldKeepUnit('maths', '17 Position and direction including fractions of turns'), true);
  assert.equal(shouldKeepUnit('maths', '15 Coordinates'), false);
  assert.equal(shouldKeepUnit('geography', 'Rivers what\'s special about them'), true);
  assert.equal(shouldKeepUnit('english', '01 Speaking and listening'), true);
});

test('missing ligatures become fi, fl, or ff', () => {
  assert.equal(fixLigatures('de\u0000nition'), 'definition');
  assert.equal(fixLigatures('a \u0000at shape'), 'a flat shape');
  assert.equal(fixLigatures('gira\u0000e'), 'giraffe');
  assert.equal(fixLigatures('butter\u0000y'), 'butterfly');
  assert.equal(fixLigatures('\u0000avour'), 'flavour');
  assert.equal(fixLigatures('di\u0000erent'), 'different');
  assert.equal(fixLigatures('o\u0000ce'), 'office');
  assert.equal(fixLigatures('o\u0000cial'), 'official');
});

test('explanations are short statements a child can read', () => {
  assert.equal(
    explainForChild('What do we call the place where we make a sprite move by adding blocks?', ['the programming area']),
    'The programming area is what we call the place where we make a sprite move by adding blocks.',
  );
  assert.equal(
    explainForChild('True or false? Artists can use their whole body to help them to draw.', ['True']),
    'Artists can use their whole body to help them to draw.',
  );
  assert.equal(
    explainForChild('________ is when an artist uses drawing tools to create marks on a surface.', ['mark-making']),
    'Mark-making is when an artist uses drawing tools to create marks on a surface.',
  );
  assert.equal(explainForChild('Count forwards from 1. What will the next number in the count be?', ['6']), 'The next number is 6.');
});
