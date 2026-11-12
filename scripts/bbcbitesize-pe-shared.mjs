/** @typedef {{ topic: string, stem: string, correct: string, wrong: [string, string, string], explanation: string }} RawQuestion */

export const topics = {
  run: 'Running, jumping, throwing and catching',
  attack: 'Attacking and defending',
  balance: 'Balance, control and coordination',
  strong: 'Strength, flexibility and stamina',
  technique: 'Technique, speed and agility',
  improve: 'Improving performance',
  health: 'Health and fitness',
  fair: 'Fair play and teamwork',
};

export const pages = {
  skills: 'https://www.bbc.co.uk/bitesize/articles/zjvc4xs',
  benefits: 'https://www.bbc.co.uk/bitesize/articles/zbvrcmn',
  jump: 'https://www.bbc.co.uk/bitesize/articles/zbchp4j',
  balance: 'https://www.bbc.co.uk/bitesize/articles/zx8bg7h',
  aim: 'https://www.bbc.co.uk/bitesize/articles/zfsdwnb',
  clap: 'https://www.bbc.co.uk/bitesize/articles/z7nwjsg',
  early: 'https://www.bbc.co.uk/bitesize/subjects/z338jsg',
  first: 'https://www.bbc.co.uk/bitesize/subjects/zkfgd2p',
  second: 'https://www.bbc.co.uk/bitesize/subjects/z8yrwmn',
};

export function source(url) {
  return ` Source: BBC Bitesize — ${url}`;
}

/** @returns {RawQuestion} */
export function q(topic, stem, correct, wrong1, wrong2, wrong3, explanation) {
  return { topic, stem, correct, wrong: [wrong1, wrong2, wrong3], explanation };
}
