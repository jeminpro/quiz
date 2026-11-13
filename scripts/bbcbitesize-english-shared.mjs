/** @typedef {{ topic: string, stem: string, correct: string, wrong: [string, string, string], explanation: string }} RawQuestion */

export const topics = {
  tense: 'Tense and verbs',
  meaning: 'Word meaning',
  affixes: 'Prefixes and suffixes',
  punctuation: 'Punctuation',
  sentences: 'Sentences and clauses',
  cohesion: 'Cohesion',
  homophones: 'Homophones',
  audience: 'Audience and purpose',
  figurative: 'Figurative language',
  classes: 'Word classes',
};

/** Primary BBC Bitesize pages used as the Year 1–5 topic source. */
export const pages = {
  ks1: 'https://www.bbc.co.uk/bitesize/subjects/zgkw2hv',
  ks2: 'https://www.bbc.co.uk/bitesize/subjects/zv48q6f',
  grammar: 'https://www.bbc.co.uk/bitesize/topics/zwwp8mn',
  punctuation: 'https://www.bbc.co.uk/bitesize/topics/zvwwxnb',
  spelling: 'https://www.bbc.co.uk/bitesize/topics/zw68h4j',
  tense: 'https://www.bbc.co.uk/bitesize/articles/ztndcmn',
  fronted: 'https://www.bbc.co.uk/bitesize/articles/zp937p3',
  relative: 'https://www.bbc.co.uk/bitesize/articles/zsrt4qt',
  modal: 'https://www.bbc.co.uk/bitesize/articles/zkn796f',
  nounPhrase: 'https://www.bbc.co.uk/bitesize/articles/z3nfw6f',
  apostrophe: 'https://www.bbc.co.uk/bitesize/articles/zx9ydxs',
  pronoun: 'https://www.bbc.co.uk/bitesize/articles/zhttqyc',
  speech: 'https://www.bbc.co.uk/bitesize/articles/ztcp97h',
  paragraph: 'https://www.bbc.co.uk/bitesize/articles/z9n73k7',
  synonym: 'https://www.bbc.co.uk/bitesize/articles/zrhgnk7',
  prefix: 'https://www.bbc.co.uk/bitesize/articles/z439bqt',
  figurative: 'https://www.bbc.co.uk/bitesize/articles/zxk7kty',
};

export function source(url) {
  return ` Source: BBC Bitesize — ${url}`;
}

/** @returns {RawQuestion} */
export function q(topic, stem, correct, wrong1, wrong2, wrong3, explanation, page) {
  return {
    topic,
    stem,
    correct,
    wrong: [wrong1, wrong2, wrong3],
    explanation: `${explanation}${source(page)}`,
  };
}
