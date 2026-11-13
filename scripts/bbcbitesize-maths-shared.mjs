/** @typedef {{ topic: string, stem: string, correct: string, wrong: [string, string, string], explanation: string }} RawQuestion */

export const topics = {
  place: 'Place value and rounding',
  add: 'Addition and subtraction',
  multiply: 'Multiplication and division',
  factors: 'Factors, multiples and primes',
  fractions: 'Fractions',
  decimals: 'Decimals and percentages',
  measures: 'Measures and units',
  area: 'Perimeter, area and volume',
  shape: 'Shape and angles',
  data: 'Statistics and timetables',
};

export const pages = {
  oclock: 'https://www.bbc.co.uk/bitesize/articles/zs6tjsg',
  quarter: 'https://www.bbc.co.uk/bitesize/articles/zmbt2v4',
  tables: 'https://www.bbc.co.uk/bitesize/articles/z3c2gdm',
  angles: 'https://www.bbc.co.uk/bitesize/articles/zg68k7h',
  measureAngles: 'https://www.bbc.co.uk/bitesize/articles/zjrcvwx',
  shapes: 'https://www.bbc.co.uk/bitesize/articles/ztpwdmn',
  area: 'https://www.bbc.co.uk/bitesize/articles/zwqt6fr',
  ks1: 'https://www.bbc.co.uk/bitesize/subjects/zjxhfg8',
  year3: 'https://www.bbc.co.uk/bitesize/subjects/zdtwnk7',
  year4: 'https://www.bbc.co.uk/bitesize/subjects/zxv6g2p',
  year5: 'https://www.bbc.co.uk/bitesize/subjects/zykvwsg',
};

export const images = {
  clock3: 'https://ichef.bbci.co.uk/images/ic/480xn/p0kjb490.png',
  quarterPast: 'https://ichef.bbci.co.uk/images/ic/480xn/p0kjtdtp.png',
  morning: 'https://ichef.bbci.co.uk/images/ic/480xn/p0khvnss.png',
  colours: 'https://ichef.bbci.co.uk/images/ic/480xn/p0ksktgc.png',
  pizza: 'https://ichef.bbci.co.uk/images/ic/480xn/p0ktz2bn.png',
  pets: 'https://ichef.bbci.co.uk/images/ic/480xn/p0ksktlm.png',
  tally: 'https://ichef.bbci.co.uk/images/ic/480xn/p0ktyz5d.png',
  acute: 'https://ichef.bbci.co.uk/images/ic/480xn/p0k7m62m.png',
  angleSet: 'https://ichef.bbci.co.uk/images/ic/480xn/p0hf9g2m.png',
  angleBoard: 'https://ichef.bbci.co.uk/images/ic/480xn/p0l0pmbl.png',
  rectangle: '/questions/bbcbitesize/maths/rectangle-4-by-3.svg',
};

export function source(url) {
  return ` Source: BBC Bitesize — ${url}`;
}

export function picture(alt, url) {
  return `![${alt}](${url})`;
}

/** @returns {RawQuestion} */
export function q(topic, stem, correct, wrong1, wrong2, wrong3, explanation) {
  return { topic, stem, correct, wrong: [wrong1, wrong2, wrong3], explanation };
}
