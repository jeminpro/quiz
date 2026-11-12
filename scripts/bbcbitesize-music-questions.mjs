import { questionsPartOne } from './bbcbitesize-music-questions-1.mjs';
import { questionsPartTwo } from './bbcbitesize-music-questions-2.mjs';
import { questionsPartThree } from './bbcbitesize-music-questions-3.mjs';

/** @typedef {import('./bbcbitesize-music-shared.mjs').RawQuestion} RawQuestion */

/** @type {RawQuestion[]} */
export const questions = [...questionsPartOne, ...questionsPartTwo, ...questionsPartThree];
