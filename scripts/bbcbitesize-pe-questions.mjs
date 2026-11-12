import { questionsPartOne } from './bbcbitesize-pe-questions-1.mjs';
import { questionsPartTwo } from './bbcbitesize-pe-questions-2.mjs';
import { questionsPartThree } from './bbcbitesize-pe-questions-3.mjs';

/** @typedef {import('./bbcbitesize-pe-shared.mjs').RawQuestion} RawQuestion */

/** @type {RawQuestion[]} */
export const questions = [...questionsPartOne, ...questionsPartTwo, ...questionsPartThree];
