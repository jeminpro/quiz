import { questionsPartOne } from './bbcbitesize-computing-questions-1.mjs';
import { questionsPartTwo } from './bbcbitesize-computing-questions-2.mjs';
import { questionsPartThree } from './bbcbitesize-computing-questions-3.mjs';
import { questionsPartFour } from './bbcbitesize-computing-questions-4.mjs';

/** @type {import('./bbcbitesize-computing-shared.mjs').RawQuestion[]} */
export const questions = [
  ...questionsPartOne,
  ...questionsPartTwo,
  ...questionsPartThree,
  ...questionsPartFour,
];
