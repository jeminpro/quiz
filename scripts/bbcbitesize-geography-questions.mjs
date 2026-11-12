import { questionsPartOne } from './bbcbitesize-geography-questions-1.mjs';
import { questionsPartTwo } from './bbcbitesize-geography-questions-2.mjs';

/** @typedef {import('./bbcbitesize-geography-questions-1.mjs').RawQuestion} RawQuestion */

/** @type {RawQuestion[]} */
export const questions = [...questionsPartOne, ...questionsPartTwo];
