import { questionsPartOne } from './bbcbitesize-maths-questions-1.mjs';
import { questionsPartTwo } from './bbcbitesize-maths-questions-2.mjs';
import { questionsPartThree } from './bbcbitesize-maths-questions-3.mjs';
import { questionsPartFour } from './bbcbitesize-maths-questions-4.mjs';
import { questionsPartFive } from './bbcbitesize-maths-questions-5.mjs';

/** @type {import('./bbcbitesize-maths-shared.mjs').RawQuestion[]} */
export const questions = [
  ...questionsPartOne,
  ...questionsPartTwo,
  ...questionsPartThree,
  ...questionsPartFour,
  ...questionsPartFive,
];
