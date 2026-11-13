import { questionsPartOne } from './bbcbitesize-english-questions-1.mjs';
import { questionsPartTwo } from './bbcbitesize-english-questions-2.mjs';
import { questionsPartThree } from './bbcbitesize-english-questions-3.mjs';
import { questionsPartFour } from './bbcbitesize-english-questions-4.mjs';
import { questionsPartFive } from './bbcbitesize-english-questions-5.mjs';

/** @typedef {import('./bbcbitesize-english-shared.mjs').RawQuestion} RawQuestion */

/** @type {RawQuestion[]} */
export const questions = [
  ...questionsPartOne,
  ...questionsPartTwo,
  ...questionsPartThree,
  ...questionsPartFour,
  ...questionsPartFive,
];
