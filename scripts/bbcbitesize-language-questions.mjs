import { questionsPartOne } from './bbcbitesize-language-questions-1.mjs';
import { questionsPartTwo } from './bbcbitesize-language-questions-2.mjs';
import { questionsPartThree } from './bbcbitesize-language-questions-3.mjs';
import { questionsPartFour } from './bbcbitesize-language-questions-4.mjs';

/** @typedef {import('./bbcbitesize-language-shared.mjs').RawQuestion} RawQuestion */

/** @type {RawQuestion[]} */
export const questions = [
  ...questionsPartOne,
  ...questionsPartTwo,
  ...questionsPartThree,
  ...questionsPartFour,
];
