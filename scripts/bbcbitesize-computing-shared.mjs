/** @typedef {{ topic: string, stem: string, correct: string, wrong: [string, string, string], explanation: string }} RawQuestion */

export const topics = {
  algorithms: 'Algorithms and precise instructions',
  debugging: 'Debugging and logical reasoning',
  decomposition: 'Decomposition',
  sequence: 'Sequence, selection and repetition',
  inputs: 'Inputs, outputs and variables',
  systems: 'Computer systems and robots',
  networks: 'Networks and the internet',
  search: 'Search and trusted information',
  content: 'Creating digital content',
  safety: 'Staying safe online',
};

export const pages = {
  algorithmKs1: 'https://www.bbc.co.uk/bitesize/topics/z3tbwmn/articles/z3whpv4',
  algorithm34: 'https://www.bbc.co.uk/bitesize/topics/zs7s4wx/articles/zqrq7ty',
  algorithm56: 'https://www.bbc.co.uk/bitesize/topics/zs7s4wx/articles/zx4ybqt',
  sensible: 'https://www.bbc.co.uk/bitesize/topics/z3tbwmn/articles/zpcj2v4',
  programKs1: 'https://www.bbc.co.uk/bitesize/topics/z3tbwmn/articles/zykx6sg',
  devices: 'https://www.bbc.co.uk/bitesize/topics/z3tbwmn/articles/z6vkwnb',
  robotKs1: 'https://www.bbc.co.uk/bitesize/topics/z3tbwmn/articles/zqnc4wx',
  bugsKs1: 'https://www.bbc.co.uk/bitesize/topics/z3tbwmn/articles/ztgjq6f',
  connectKs1: 'https://www.bbc.co.uk/bitesize/topics/z3tbwmn/articles/zv9mtrd',
  internetKs1: 'https://www.bbc.co.uk/bitesize/topics/z3tbwmn/articles/zgwnsbk',
  systemKs1: 'https://www.bbc.co.uk/bitesize/topics/zymykqt/articles/z9myvcw',
  safeKs1: 'https://www.bbc.co.uk/bitesize/topics/zymykqt/articles/zym3b9q',
  privateKs1: 'https://www.bbc.co.uk/bitesize/topics/zymykqt/articles/zwbq7ty',
  kindKs1: 'https://www.bbc.co.uk/bitesize/topics/zymykqt/articles/zrmqm39',
  trustKs1: 'https://www.bbc.co.uk/bitesize/topics/zymykqt/articles/z9ntn9q',
  decomposition34: 'https://www.bbc.co.uk/bitesize/topics/zs7s4wx/articles/z8ngr82',
  decomposition56: 'https://www.bbc.co.uk/bitesize/topics/zs7s4wx/articles/zxxdqfr',
  logic34: 'https://www.bbc.co.uk/bitesize/topics/zs7s4wx/articles/zxgdwmn',
  logic56: 'https://www.bbc.co.uk/bitesize/topics/zs7s4wx/articles/zgwckty',
  programs34: 'https://www.bbc.co.uk/bitesize/topics/zs7s4wx/articles/z23q7ty',
  selection: 'https://www.bbc.co.uk/bitesize/topics/zs7s4wx/articles/zd3pf82',
  inputs34: 'https://www.bbc.co.uk/bitesize/topics/zs7s4wx/articles/zx8hpv4',
  inputs56: 'https://www.bbc.co.uk/bitesize/topics/zs7s4wx/articles/z7wckty',
  variables34: 'https://www.bbc.co.uk/bitesize/topics/zs7s4wx/articles/zw3dwmn',
  variables56: 'https://www.bbc.co.uk/bitesize/topics/zs7s4wx/articles/zmftn9q',
  sensors: 'https://www.bbc.co.uk/bitesize/topics/zs7s4wx/articles/zx3q7ty',
  robots: 'https://www.bbc.co.uk/bitesize/topics/zs7s4wx/articles/zxjsfg8',
  debug34: 'https://www.bbc.co.uk/bitesize/topics/zs7s4wx/articles/ztkx6sg',
  debug56: 'https://www.bbc.co.uk/bitesize/topics/zs7s4wx/articles/zjmj2v4',
  network34: 'https://www.bbc.co.uk/bitesize/topics/zs7s4wx/articles/z78nydm',
  network56: 'https://www.bbc.co.uk/bitesize/topics/zs7s4wx/articles/z9n6p4j',
  internet34: 'https://www.bbc.co.uk/bitesize/topics/zs7s4wx/articles/z3tbgk7',
  internet56: 'https://www.bbc.co.uk/bitesize/topics/zs7s4wx/articles/zjbf3j6',
  web34: 'https://www.bbc.co.uk/bitesize/topics/zs7s4wx/articles/z2nbgk7',
  search34: 'https://www.bbc.co.uk/bitesize/topics/zs7s4wx/articles/ztbjq6f',
  search56: 'https://www.bbc.co.uk/bitesize/topics/zs7s4wx/articles/znhmtrd',
  changed: 'https://www.bbc.co.uk/bitesize/topics/zv63d2p/articles/zprj7ty',
  collaborate: 'https://www.bbc.co.uk/bitesize/topics/zv63d2p/articles/zfwmh4j',
  reliable34: 'https://www.bbc.co.uk/bitesize/topics/zv63d2p/articles/zt9thyc',
  reliable56: 'https://www.bbc.co.uk/bitesize/topics/zv63d2p/articles/zjr8qyc',
  malware: 'https://www.bbc.co.uk/bitesize/topics/zv63d2p/articles/zcmbgk7',
  footprints: 'https://www.bbc.co.uk/bitesize/topics/zv63d2p/articles/z8kdqfr',
  respect: 'https://www.bbc.co.uk/bitesize/topics/zv63d2p/articles/zx66p4j',
  safety56: 'https://www.bbc.co.uk/bitesize/topics/zv63d2p/articles/zfmhfdm',
  dataOnline: 'https://www.bbc.co.uk/bitesize/topics/zv63d2p/articles/ztq6nk7',
  write: 'https://www.bbc.co.uk/bitesize/topics/zbhgjxs/articles/z2s49j6',
  charts: 'https://www.bbc.co.uk/bitesize/topics/zf2f9j6/articles/z83wjxs',
  data56: 'https://www.bbc.co.uk/bitesize/topics/zf2f9j6/articles/z8yk87h',
  images: 'https://www.bbc.co.uk/bitesize/topics/zf2f9j6/articles/zcjs3qt',
  animation: 'https://www.bbc.co.uk/bitesize/topics/zf2f9j6/articles/zt2yg2p',
  photos: 'https://www.bbc.co.uk/bitesize/topics/zf2f9j6/articles/zpkts82',
  store: 'https://www.bbc.co.uk/bitesize/topics/zf2f9j6/articles/ztwnvj6',
  searchTools: 'https://www.bbc.co.uk/bitesize/topics/zf2f9j6/articles/zmr76rd',
};

export const images = {
  jumper: 'https://ichef.bbci.co.uk/images/ic/480xn/p0cbjd56.png',
  recipe: 'https://ichef.bbci.co.uk/images/ic/480xn/p0d3psjq.png',
  directions: 'https://ichef.bbci.co.uk/images/ic/480xn/p0cbjff3.png',
  cake: 'https://ichef.bbci.co.uk/images/ic/480xn/p0cbjl32.png',
  boat: 'https://ichef.bbci.co.uk/images/ic/480xn/p0cf9r6v.png',
  blocks: 'https://ichef.bbci.co.uk/images/ic/480xn/p0cfd9q9.png',
  logo: 'https://ichef.bbci.co.uk/images/ic/480xn/p0cfdb11.png',
  doorBug: 'https://ichef.bbci.co.uk/images/ic/480xn/p0ck5d81.png',
  doorFixed: 'https://ichef.bbci.co.uk/images/ic/480xn/p0ck60p5.png',
  library: '/questions/bbcbitesize/computing/library-bug.svg',
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
