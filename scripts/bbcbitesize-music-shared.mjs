/** @typedef {{ topic: string, stem: string, correct: string, wrong: [string, string, string], explanation: string }} RawQuestion */

export const topics = {
  pulse: 'Pulse, rhythm and duration',
  pitch: 'Pitch and melody',
  dynamics: 'Dynamics and tempo',
  timbre: 'Timbre, texture and instruments',
  structure: 'Structure and form',
  notation: 'Notation',
  listening: 'Listening and musical styles',
  composing: 'Composing and improving',
};

export const pages = {
  pulse: 'https://www.bbc.co.uk/bitesize/articles/zn82h4j',
  styles: 'https://www.bbc.co.uk/bitesize/articles/zks2p9q',
  dynamics: 'https://www.bbc.co.uk/bitesize/articles/zcbwmbk',
  tempo: 'https://www.bbc.co.uk/bitesize/articles/zr3g8p3',
  write: 'https://www.bbc.co.uk/bitesize/articles/z8c39ty',
  read: 'https://www.bbc.co.uk/bitesize/articles/zhptywx',
  notation: 'https://www.bbc.co.uk/bitesize/articles/z3fysrd',
  timbre: 'https://www.bbc.co.uk/bitesize/articles/z9ffng8',
  structure: 'https://www.bbc.co.uk/bitesize/articles/zffv46f',
  melody: 'https://www.bbc.co.uk/bitesize/articles/zp99cj6',
  compose: 'https://www.bbc.co.uk/bitesize/articles/z7td239',
  orchestra: 'https://www.bbc.co.uk/bitesize/articles/z222p9q',
  body: 'https://www.bbc.co.uk/bitesize/articles/zkjj6rd',
  holst: 'https://www.bbc.co.uk/bitesize/articles/ztxv46f',
  clyne: 'https://www.bbc.co.uk/bitesize/articles/zwdtywx',
  world: 'https://www.bbc.co.uk/bitesize/articles/z4w8239',
  beethoven: 'https://www.bbc.co.uk/bitesize/articles/zvyxs82',
};

export function source(url) {
  return ` Source: BBC Bitesize — ${url}`;
}

/** @returns {RawQuestion} */
export function q(topic, stem, correct, wrong1, wrong2, wrong3, explanation) {
  return { topic, stem, correct, wrong: [wrong1, wrong2, wrong3], explanation };
}

export const stickPattern = '![Stick notation: three sticks close together, then two sticks with wider gaps](/questions/bbcbitesize/music/stick-pattern.png)';
export const pitchCircles = '![Graphic score: six circles read from left to right, sitting middle, high, middle, low, middle, then high](/questions/bbcbitesize/music/pitch-circles.png)';
export const louderCircles = '![Graphic score: four circles that become larger from left to right](/questions/bbcbitesize/music/louder-circles.png)';
export const staffFour = '![A short tune on a staff, beginning with a treble clef and a 4/4 time signature](/questions/bbcbitesize/music/staff-four-four.png)';
export const guitarTab = '![A guitar tab: a grid of strings with black dots showing finger places](/questions/bbcbitesize/music/guitar-tab.png)';
export const ternaryForm = '![Three sections in a row, labelled A, B, then A. The two A boxes match. The B box is different.](/questions/bbcbitesize/music/ternary-form.svg)';
export const rondoForm = '![Five sections labelled A, B, A, C, A. Every A box matches. B and C are different from A and from each other.](/questions/bbcbitesize/music/rondo-form.svg)';
