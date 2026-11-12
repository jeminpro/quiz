/** @typedef {{ topic: string, stem: string, correct: string, wrong: [string, string, string], explanation: string }} RawQuestion */

export const topics = {
  sounds: 'Sounds and spelling',
  words: 'New words in familiar text',
  sentences: 'Building sentences',
  grammar: 'Grammar patterns',
  reading: 'Reading simple writing',
  numbers: 'Number and word patterns',
  phrases: 'Familiar phrases',
  english: 'Comparing with English',
};

/** Primary BBC Bitesize pages used as the topic source. Real-language items cite the matching page. */
export const pages = {
  french: 'https://www.bbc.co.uk/bitesize/subjects/z39d7ty',
  speaking: 'https://www.bbc.co.uk/bitesize/topics/zjcbrj6',
  greetings: 'https://www.bbc.co.uk/bitesize/articles/z4c3382',
  yourself: 'https://www.bbc.co.uk/bitesize/articles/zgnwr2p',
  weather: 'https://www.bbc.co.uk/bitesize/articles/zcskbqt',
  food: 'https://www.bbc.co.uk/bitesize/articles/zfmq4xs',
  clothes: 'https://www.bbc.co.uk/bitesize/articles/z474bdm',
  colours: 'https://www.bbc.co.uk/bitesize/articles/zw7hsk7',
  spanishGreetings: 'https://www.bbc.co.uk/bitesize/articles/z4bnpg8',
  spanishFood: 'https://www.bbc.co.uk/bitesize/articles/zwfbp4j',
  spanishHobbies: 'https://www.bbc.co.uk/bitesize/articles/zft496f',
  spanishNumbers: 'https://www.bbc.co.uk/bitesize/articles/z9cthcw',
  spanishColours: 'https://www.bbc.co.uk/bitesize/articles/z8g8jsg',
};

export function source(url) {
  return ` Source: BBC Bitesize — ${url}`;
}

/** @returns {RawQuestion} */
export function q(topic, stem, correct, wrong1, wrong2, wrong3, explanation) {
  return { topic, stem, correct, wrong: [wrong1, wrong2, wrong3], explanation };
}
