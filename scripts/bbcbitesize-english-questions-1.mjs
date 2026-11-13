import { pages, q, topics as T } from './bbcbitesize-english-shared.mjs';

const tense = pages.tense;
const meaning = pages.synonym;

/** @type {import('./bbcbitesize-english-shared.mjs').RawQuestion[]} */
export const questionsPartOne = [
  q(
    T.tense,
    `Priya is finishing her Monday diary. Every sentence is about yesterday.

Which sentence keeps the past tense?`,
    'I kicked the ball and it flew into the net.',
    'I kick the ball and it flies into the net.',
    'I am kicking the ball and it is flying into the net.',
    'I will kick the ball and it will fly into the net.',
    'A diary about yesterday needs past verbs such as kicked and flew. The other sentences are happening now or have not happened yet.',
    tense,
  ),
  q(
    T.tense,
    `Sam's plant note is a habit: the plant grows a little every morning, not just once.

Which sentence matches that regular habit?`,
    'The plant grows a little every morning.',
    'The plant grew a little on one morning last year.',
    'The plant was growing during one afternoon.',
    'The plant will grow once next Friday.',
    'A habit that happens regularly is written in the present, so grows fits. The other verbs point to one past moment or to the future.',
    tense,
  ),
  q(
    T.tense,
    `Aisha wants the reader to see that the running was still going on when the bell rang.

Which sentence shows an action in progress?`,
    'Aisha was running when the bell rang.',
    'Aisha ran, and then the bell rang.',
    'Aisha runs every time a bell rings.',
    'Aisha will run after the bell tomorrow.',
    'Was running is the past progressive, so the running continued over time. Ran only says the action happened, and the other sentences are a habit or the future.',
    tense,
  ),
  q(
    T.tense,
    `Noah's story begins "Last summer we camped by the lake." The next sentence must stay in that same past time.

Which sentence fits?`,
    'We toasted bread and told stories.',
    'We toast bread and tell stories.',
    'We are toasting bread and telling stories.',
    'We will toast bread and tell stories.',
    'Last summer is in the past, so toasted and told keep the time clear. Present and future verbs would jump to a different time.',
    tense,
  ),
  q(
    T.tense,
    `Mina is writing the class pet rota. The jobs happen every week, including this Friday and next Friday.

Which sentence fits a regular job?`,
    'Each Friday, Maya feeds the fish.',
    'Each Friday, Maya fed the fish.',
    'Each Friday, Maya was feeding the fish.',
    'Each Friday, Maya will have fed the fish.',
    'Feeds is the present form for something that happens regularly. The other forms describe one past action or a finished future action.',
    tense,
  ),
  q(
    T.tense,
    `Leo is captioning a video of his swimming lesson. He wants to show that the swimming went on for the whole lesson, not just that it happened.

Which caption is best?`,
    'Leo was swimming lengths for the whole lesson.',
    'Leo swam.',
    'Leo swims on Tuesdays in the summer.',
    'Leo will swim again next term.',
    'Was swimming shows an action continuing over time. Swam only records that it happened, and the other captions are a habit or the future.',
    tense,
  ),
  q(
    T.tense,
    `The class timeline has a box labelled Now. The chicks are in the incubator at this moment.

Which sentence belongs in the Now box?`,
    'The chicks are hatching in the incubator.',
    'The chicks hatched last week.',
    'The chicks will hatch next month.',
    'The chicks had hatched before the holiday.',
    'Are hatching is the present progressive, so it matches something happening now. The other sentences are past or future.',
    tense,
  ),
  q(
    T.tense,
    `Ben is editing one moment in yesterday's story. He dropped his pencil and then picked it up.

Which version keeps one tense?`,
    'Ben dropped his pencil and picked it up.',
    'Ben dropped his pencil and picks it up.',
    'Ben drops his pencil and picked it up.',
    'Ben was dropping his pencil and picks it up.',
    'Both actions are in the past, so dropped and picked stay together. Mixing past with picks makes the time confusing.',
    tense,
  ),
  q(
    T.tense,
    `Holly's hall sign tells people what they do in every assembly, not what they did once.

Which sentence fits the sign?`,
    'Everyone walks in quietly and sits down.',
    'Everyone walked in quietly and sat down.',
    'Everyone was walking in quietly yesterday.',
    'Everyone had walked in before the holiday.',
    'Walks and sits are present verbs for a routine. The other sentences describe a past assembly.',
    tense,
  ),
  q(
    T.tense,
    `Jack's story has already said "The door creaked open." The next line happens at that same moment in the past.

Which line should come next?`,
    'A cold wind rushed through the hall.',
    'A cold wind rushes through the hall.',
    'A cold wind is rushing through the hall.',
    'A cold wind will rush through the hall.',
    'Creaked is past, so rushed keeps the story in the past. The other verbs move the wind into the present or the future.',
    tense,
  ),
  q(
    T.tense,
    `Amira's job chart has a tick for today. She wants a sentence that shows today's watering is already finished.

Which sentence fits?`,
    'Amira has watered the class plants.',
    'Amira waters the class plants every Monday.',
    'Amira is watering the class plants.',
    'Amira will water the class plants tomorrow.',
    'Has watered links a finished action to now, which matches the tick. The others are a habit, an action still happening, or the future.',
    tense,
  ),
  q(
    T.tense,
    `Tom wrote "Yesterday I swimmed two lengths." Swim does not add -ed to make the past tense.

Which correction is right?`,
    'Yesterday I swam two lengths.',
    'Yesterday I swum two lengths.',
    'Yesterday I swimming two lengths.',
    'Yesterday I swim two lengths.',
    'Swam is the simple past of swim. Swum, swimming and swim do not fit a finished action yesterday.',
    tense,
  ),
  q(
    T.tense,
    `Grace wrote "She eated her apple at break." Eat is an irregular verb.

Which correction is right?`,
    'She ate her apple at break.',
    'She eaten her apple at break.',
    'She eating her apple at break.',
    'She eat her apple at break.',
    'Ate is the past tense of eat. Eaten needs a helper such as has, and eating or eat do not show a finished past action on their own.',
    tense,
  ),
  q(
    T.tense,
    `Rafi's note about this morning mixes the times:

The bus was late. I run to the gate. My bag falls open.

Which rewrite keeps one time?`,
    'The bus was late. I ran to the gate. My bag fell open.',
    'The bus is late. I run to the gate. My bag falls open.',
    'The bus was late. I run to the gate. My bag will fall open.',
    'The bus will be late. I ran to the gate. My bag falls open.',
    'This morning is in the past, so was, ran and fell belong together. The other versions still jump between times.',
    tense,
  ),
  q(
    T.tense,
    `The baby is upset at this moment. Which sentence uses the -ing form correctly?`,
    'The baby is crying.',
    'The baby is cry.',
    'The baby crying now.',
    'The baby is cried.',
    'A present action in progress uses is plus the -ing verb, so is crying is complete. The other lines leave out is, leave out -ing, or use the wrong verb form.',
    tense,
  ),
  q(
    T.tense,
    `Yesterday a rabbit moved in little jumps across the grass. The verb is hop, which has a short vowel and ends in one consonant.

Which word is the correct past tense?`,
    'hopped',
    'hoped',
    'hopied',
    'hops',
    'Hop doubles the p before -ed, so the past tense is hopped. Hoped is the past of hope, and hops is present.',
    tense,
  ),
  q(
    T.tense,
    `Ella is in the middle of creating a card for her dad. The verb is make, which ends in a silent e.

Which word completes "She is ___ a card"?`,
    'making',
    'makeing',
    'macking',
    'makes',
    'Drop the silent e before -ing, so make becomes making. Makeing, macking and makes do not fit after is.',
    tense,
  ),
  q(
    T.tense,
    `The class waited under the canopy, and the rain kept falling the whole time they waited.

Which sentence shows that the waiting and the rain went on together?`,
    'They were waiting while the rain fell.',
    'They waited, and only then did one drop fall.',
    'They wait outside on every rainy day.',
    'They will wait if it rains next week.',
    'Were waiting shows the wait was in progress while the rain fell. The other sentences split the events, describe a habit, or move to the future.',
    tense,
  ),
  q(
    T.tense,
    `The sentence must start with Tomorrow. The museum visit has not happened yet.

Which ending fits?`,
    'Tomorrow we will visit the museum.',
    'Tomorrow we visited the museum.',
    'Tomorrow we were visiting the museum.',
    'Tomorrow we have visited the museum.',
    'Tomorrow needs a future verb, so will visit fits. Visited, were visiting and have visited all describe something that has already happened.',
    tense,
  ),
  q(
    T.tense,
    `In Rafi's story the fox has already crept closer. The next action happens at that same past moment.

The fox crept closer. It sees the hen.

Which fix for the second sentence keeps the time clear?`,
    'It saw the hen.',
    'It is seeing the hen.',
    'It will see the hen.',
    'It see the hen.',
    'Crept is past, so saw stays in the past. Is seeing and will see change the time, and see does not agree with it.',
    tense,
  ),
  q(
    T.meaning,
    `The story says the cave was dim, not completely dark. A torch was not needed, but it was hard to see the walls.

Which word is closest to dim here?`,
    'gloomy',
    'dazzling',
    'tiny',
    'noisy',
    'Dim describes low light, so gloomy is the close meaning. Dazzling is very bright, and tiny and noisy describe size and sound.',
    meaning,
  ),
  q(
    T.meaning,
    `The first draft says "The puppy was happy." The next line says it leapt, barked and spun in circles.

Which stronger word fits that behaviour?`,
    'excited',
    'miserable',
    'sleepy',
    'furious',
    'Leaping and spinning show more than quiet happiness, so excited fits the evidence. Miserable, sleepy and furious do not match those actions.',
    meaning,
  ),
  q(
    T.meaning,
    `A hall notice says the room must stay silent during the test.

Which word is the opposite of silent?`,
    'noisy',
    'quiet',
    'calm',
    'still',
    'Noisy is the opposite of silent. Quiet, calm and still are similar to silent, so they are not opposites.',
    meaning,
  ),
  q(
    T.meaning,
    `The class is collecting the word family for joy. A word family shares the meaning, not just the first letter.

Which word belongs in that family?`,
    'joyful',
    'jealous',
    'jumpy',
    'juicy',
    'Joyful is built from joy and keeps the meaning. Jealous, jumpy and juicy only look a little alike at the start.',
    meaning,
  ),
  q(
    T.meaning,
    `The path between the hedges was so narrow that two people could not walk side by side.

Which word means the opposite of narrow here?`,
    'wide',
    'thin',
    'long',
    'straight',
    'Wide is the opposite of narrow. Thin is similar to narrow, and long and straight describe different features of a path.',
    meaning,
  ),
  q(
    T.meaning,
    `In the story, Dad whispered the secret instead of using said.

What does whispered add?`,
    'The words were quiet, as if they should not be overheard.',
    'The words were shouted across the playground.',
    'Dad was writing the secret, not speaking it.',
    'The sentence has changed from the past to the future.',
    'Whispered keeps the meaning of speaking but makes it quiet and secret. It does not mean shouting, writing, or a change of tense.',
    meaning,
  ),
  q(
    T.meaning,
    `A tree label says "ancient oak". The oak has stood in the playground for more than a hundred years.

Which meaning of ancient fits?`,
    'very old',
    'very young',
    'made of metal',
    'easy to climb',
    'Ancient means very old, which matches an oak that has stood for more than a hundred years. The other meanings do not fit the label.',
    meaning,
  ),
  q(
    T.meaning,
    `The teacher writes "a big problem" because it stopped the whole class from finishing. She does not mean a problem that is tall or heavy.

Which word keeps that meaning?`,
    'serious',
    'tall',
    'wide',
    'heavy',
    'Here big means important and hard to solve, so serious fits. Tall, wide and heavy are size words and do not match this problem.',
    meaning,
  ),
  q(
    T.meaning,
    `The cook warns "The soup is scalding" and tells the children to wait before they taste it.

Which meaning fits scalding?`,
    'extremely hot',
    'ice cold',
    'only very salty',
    'still frozen',
    'Scalding means hot enough to burn, so the children should wait. Cold, salty and frozen do not match the warning.',
    meaning,
  ),
  q(
    T.meaning,
    `Which word is in the same family as help and still means something about giving help?`,
    'helpful',
    'helmet',
    'hello',
    'heap',
    'Helpful is built from help. Helmet, hello and heap are different words that only begin with a similar sound.',
    meaning,
  ),
  q(
    T.meaning,
    `The sentence is "She trudged home." The next sentence says her bag was heavy and she was tired.

Which meaning of trudged fits?`,
    'walked slowly and with effort',
    'sprinted lightly',
    'drove home in a car',
    'skipped and sang',
    'A heavy bag and tiredness show a slow, effortful walk, so trudged fits. Sprinting, driving and skipping do not match that evidence.',
    meaning,
  ),
  q(
    T.meaning,
    `The writer wants a clear contrast: "The morning was bright, but the afternoon was ___."

Which word makes the opposite?`,
    'gloomy',
    'sunny',
    'brilliant',
    'dazzling',
    'Gloomy contrasts with bright. Sunny, brilliant and dazzling are similar to bright, so they do not make a contrast after but.',
    meaning,
  ),
  q(
    T.meaning,
    `A museum label calls a cracked cup precious. The label also says it belonged to a sailor in 1850.

Which explanation is most accurate?`,
    'The cup matters a lot, even though it is cracked.',
    'The cup is new and was cheap to buy.',
    'Precious means the cup is a kind of animal.',
    'Precious means the cup is too big to lift.',
    'Precious means something is highly valued. The date shows why the cracked cup still matters, so age and price are not the meaning.',
    meaning,
  ),
  q(
    T.meaning,
    `A diary says "The trip was nice. The guide was nice. The lunch was nice." The guide answered every question clearly.

Which change is more precise for the guide?`,
    'The guide was helpful.',
    'The guide was terrible.',
    'The guide was invisible.',
    'The guide was ancient.',
    'Helpful keeps the positive meaning and matches a guide who answered every question. Terrible reverses it, and invisible and ancient do not fit the evidence.',
    meaning,
  ),
  q(
    T.meaning,
    `Owen stood at the side of the stage and would not go on until his friend went with him. The story says he was reluctant.

Which explanation fits reluctant?`,
    'He did not really want to go on.',
    'He ran on stage at once.',
    'He was the only child who could sing.',
    'He had already left the hall.',
    'Reluctant means unwilling. Waiting at the side matches that. The other explanations invent a different action or fact.',
    meaning,
  ),
  q(
    T.meaning,
    `Which pair are synonyms, words with a similar meaning?`,
    'begin and start',
    'begin and end',
    'start and stop',
    'open and close',
    'Begin and start can often replace each other. End, stop and close are opposites of the words beside them.',
    meaning,
  ),
  q(
    T.meaning,
    `A report says "The river was rapid" because sticks on the surface were racing past the bridge.

Which word is closest to rapid here?`,
    'fast',
    'slow',
    'dry',
    'square',
    'Rapid means fast, and the racing sticks are the evidence. Slow is the opposite, and dry and square do not describe the water\'s speed.',
    meaning,
  ),
  q(
    T.meaning,
    `The spare key is described as minute. It is hard to see on the table, and nobody is talking about time.

Which meaning fits?`,
    'tiny',
    'sixty seconds',
    'enormous',
    'late',
    'Here minute means tiny, which is why the key is hard to see. The time meaning, and enormous or late, do not fit the clue.',
    meaning,
  ),
  q(
    T.meaning,
    `The sentence needs an opposite: "Give a generous slice, not a ___ one."

Which word completes the contrast?`,
    'tiny',
    'huge',
    'kind',
    'extra',
    'Generous here means large, so tiny is the opposite. Huge, kind and extra stay on the same side of the contrast.',
    meaning,
  ),
  q(
    T.meaning,
    `After the long hike, the children were famished and asked for lunch at once.

Which word could replace famished?`,
    'starving',
    'full',
    'asleep',
    'angry',
    'Famished means very hungry, so starving fits children who want lunch at once. Full is the opposite, and asleep and angry are different feelings.',
    meaning,
  ),
];
