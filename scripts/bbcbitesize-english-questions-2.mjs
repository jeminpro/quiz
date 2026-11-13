import { pages, q, topics as T } from './bbcbitesize-english-shared.mjs';

const prefix = pages.prefix;
const speech = pages.speech;
const apostrophe = pages.apostrophe;
const fronted = pages.fronted;
const punctuation = pages.punctuation;
const ks1 = pages.ks1;

/** @type {import('./bbcbitesize-english-shared.mjs').RawQuestion[]} */
export const questionsPartTwo = [
  q(
    T.affixes,
    `The class is building opposites by adding a prefix to the front of a word. The root word is happy.

Which word means not happy?`,
    'unhappy',
    'rehappy',
    'happyful',
    'overhappy',
    'Un- usually means not, so unhappy means not happy. Re- would mean again, and -ful or over- do not make this opposite.',
    prefix,
  ),
  q(
    T.affixes,
    `The art group smudged a poster, so they need to do it again. The root word is do.

Which word means do again?`,
    'redo',
    'undo',
    'overdo',
    'misdo',
    'Re- usually means again, so redo means do it again. Un- means not, over- means too much, and mis- means wrongly.',
    prefix,
  ),
  q(
    T.affixes,
    `Jonah heard the instruction wrongly and went to the wrong door.

Which word matches heard wrongly?`,
    'misheard',
    'reheard',
    'unheard',
    'overheard',
    'Mis- often means wrongly, so misheard matches hearing the instruction the wrong way. The other prefixes mean again, not, or too much.',
    prefix,
  ),
  q(
    T.affixes,
    `The freezer is covered in ice. The caretaker says she will defrost it before lunch.

What does defrost mean here?`,
    'remove the frost',
    'add a thicker layer of frost',
    'frost the freezer again',
    'cook the freezer for too long',
    'De- can mean remove, so defrost means take the frost away. Adding frost, doing it again, or overcooking are different prefixes.',
    prefix,
  ),
  q(
    T.affixes,
    `The jug is full, but someone keeps pouring. Water spills down the side.

Which word means fill too much?`,
    'overfill',
    'refill',
    'unfill',
    'prefill',
    'Over- means too much, so overfill matches pouring after the jug is full. Refill means fill again, and un- would reverse the action.',
    prefix,
  ),
  q(
    T.affixes,
    `A PE diagram has an arrow going the opposite way to the clock hands. The label is anticlockwise.

Which explanation is most accurate?`,
    'Anti- means against, so the arrow goes against the clock direction.',
    'Anti- means again, so the arrow repeats the clock direction.',
    'Anti- means under, so the arrow is below the clock.',
    'Anti- means too much, so the arrow is a very fast clock.',
    'Anti- means against or opposite, so anticlockwise is the opposite direction from the clock. It does not mean again, under, or too much.',
    prefix,
  ),
  q(
    T.affixes,
    `Imani is writing a book about her own life. She calls it an autobiography.

Which explanation fits the prefix auto-?`,
    'Auto- means self, so the book is about her own life.',
    'Auto- means again, so she is copying someone else\'s book.',
    'Auto- means not, so the book is not about a life.',
    'Auto- means under, so the book is kept below a shelf.',
    'Auto- means self or own. An autobiography is a life story written by the person who lived it.',
    prefix,
  ),
  q(
    T.affixes,
    `The school council wants to beautify the quiet garden. They will add flowers and paint the bench.

What does beautify mean?`,
    'make the garden beautiful',
    'make the garden the opposite of beautiful',
    'visit the garden again',
    'name a person who is already beautiful',
    'The suffix -ify can turn an idea into a verb meaning make that thing. Beautify means make beautiful, which matches the flowers and paint.',
    prefix,
  ),
  q(
    T.affixes,
    `The adjective is active. The class needs a verb that means make something active.

Which word does that job?`,
    'activate',
    'unactive',
    'activer',
    'activeing',
    'The suffix -ate can turn a word into a verb, so activate means make active. Un- would make an opposite, and activer or activeing are not the verb form.',
    prefix,
  ),
  q(
    T.affixes,
    `A science step says "Leave the jelly to solidify." At the start it is liquid. Later it holds its shape.

What does solidify mean?`,
    'make or become solid',
    'make the jelly less solid',
    'make the jelly solid again after it was never solid',
    'give the jelly a solid name but leave it liquid',
    'The suffix -ify means make or become. Solidify matches a liquid that later holds its shape.',
    prefix,
  ),
  q(
    T.affixes,
    `The puzzle cannot be solved. The root word is possible, and the prefix changes because possible begins with p.

Which word means not possible?`,
    'impossible',
    'repossible',
    'overpossible',
    'prepossible',
    'Before p, the prefix in- becomes im- and still means not, so impossible means not possible. Re-, over- and pre- have different meanings.',
    prefix,
  ),
  q(
    T.affixes,
    `The bus times change every week, so they are not regular. Regular begins with r.

Which word means not regular?`,
    'irregular',
    'unregular',
    'reregular',
    'overregular',
    'Before r, in- becomes ir- and still means not, so irregular means not regular. The other spellings are not the prefix pattern for this root.',
    prefix,
  ),
  q(
    T.affixes,
    `The story draft is messy. The writer wants to write it again, not just look at it.

Which word means write again?`,
    'rewrite',
    'writing',
    'wrote',
    'unwrite',
    'Re- means again, so rewrite means write again. Writing and wrote are verb forms without that meaning, and unwrite is not the word for a second draft.',
    prefix,
  ),
  q(
    T.affixes,
    `Two sunflowers are being compared. One is taller than the other, but it is not the tallest in the garden.

Which word compares just those two?`,
    'taller',
    'tallest',
    'untall',
    'retall',
    'The suffix -er compares two things, so taller fits one sunflower against the other. Tallest would mean the most tall of a whole group.',
    prefix,
  ),
  q(
    T.affixes,
    `Every tree in the park has been measured. One oak is taller than all the others.

Which word means the most tall?`,
    'tallest',
    'taller',
    'tallful',
    'untall',
    'The suffix -est means the most when a whole group is compared, so tallest fits. Taller compares only two, and the other words are not comparison suffixes.',
    prefix,
  ),
  q(
    T.affixes,
    `The shed door is locked. The caretaker opens it with a key.

Which word means the opposite of lock?`,
    'unlock',
    'relock',
    'overlock',
    'lockest',
    'Un- reverses lock, so unlock matches opening the door. Relock would lock it again, and overlock and lockest do not mean open.',
    prefix,
  ),
  q(
    T.affixes,
    `The class vote is split. Some children do not agree with the plan.

Which word means not agree?`,
    'disagree',
    'reagree',
    'overagree',
    'agreeify',
    'Dis- often makes a negative, so disagree means not agree. Re- would mean agree again, and over- would mean too much.',
    prefix,
  ),
  q(
    T.affixes,
    `A report has one main title. Under it, a smaller heading introduces the results.

Which word names that smaller heading?`,
    'subheading',
    'unheading',
    'reheading',
    'headingest',
    'Sub- means under, so a subheading sits under the main heading. The other prefixes do not mean under.',
    prefix,
  ),
  q(
    T.affixes,
    `Dirty water goes through a filter so it becomes pure enough to study.

Which verb means make pure?`,
    'purify',
    'unpure',
    'repure',
    'purest',
    'The suffix -ify means make, so purify means make pure. Unpure is not the verb, repure is not a real word here, and purest is a comparison.',
    prefix,
  ),
  q(
    T.affixes,
    `The prefix un- is added to the whole root word happy. No letter is dropped from happy.

Which spelling is correct?`,
    'unhappy',
    'unappy',
    'unhapy',
    'uhappy',
    'A prefix is added to the front of the whole root, so unhappy keeps every letter of happy. The other spellings delete a letter.',
    prefix,
  ),
  q(
    T.punctuation,
    `Maya calls across the playground that the bus has arrived. The writer wants her exact words marked as speech.

Which sentence does that?`,
    'Maya said, "The bus is here."',
    'Maya said the bus is here.',
    '"Maya said," The bus is here.',
    'Maya "said the bus is here."',
    'Inverted commas go around the exact words, and the comma sits before the speech when the speaker is named first. The other versions mark the wrong part or leave the speech unmarked.',
    speech,
  ),
  q(
    T.punctuation,
    `Theo asks a question out loud. The question mark belongs with the words he says.

Which sentence is punctuated correctly?`,
    '"Where is the glue?" asked Theo.',
    '"Where is the glue," asked Theo.',
    '"Where is the glue"? asked Theo.',
    'Where is the glue? "asked Theo."',
    'The question mark stays inside the inverted commas because it is part of Theo\'s speech. A comma, a mark outside the speech, or marks around the speaker are the wrong pattern.',
    speech,
  ),
  q(
    T.punctuation,
    `Mia says "I found a glove." Then Dad answers "Where was it?"

Which plan helps the reader follow the two speakers?`,
    'Start a new line when Dad answers, with his words in their own inverted commas.',
    'Keep both speakers in one line and use no inverted commas.',
    'Put Dad\'s words inside the same inverted commas as Mia\'s words.',
    'Leave out the names so the reader can guess who speaks.',
    'A new speaker starts a new line, and each person\'s exact words need their own inverted commas. Sharing one set of marks, or using none, hides who is speaking.',
    speech,
  ),
  q(
    T.punctuation,
    `One dog owns the bowl by the door. The label must show that single owner.

Which label is correct?`,
    "the dog's bowl",
    'the dogs bowl',
    "the dogs' bowl",
    "the dog's bowls'",
    'For one owner, add apostrophe s: the dog\'s bowl. Dogs\' would mean more than one dog, and a plural with no apostrophe does not show an owner.',
    apostrophe,
  ),
  q(
    T.punctuation,
    `Three teachers share one staffroom. The sign must show that all three own it together.

Which sign is correct?`,
    "the teachers' staffroom",
    "the teacher's staffroom",
    'the teachers staffroom',
    "the teacher's' staffroom",
    'Teachers already ends in s, so the plural owners take an apostrophe after the s. Teacher\'s would mean only one teacher.',
    apostrophe,
  ),
  q(
    T.punctuation,
    `A shelf label means more than one book. Nobody is being shown as the owner.

Which sentence is correct?`,
    'The books are on the shelf.',
    "The book's are on the shelf.",
    "The books' are on the shelf.",
    "The book's is on the shelf.",
    'A simple plural does not need an apostrophe. Apostrophes here would wrongly suggest that a book owns something.',
    apostrophe,
  ),
  q(
    T.punctuation,
    `The robot has lost a wheel. The sentence must show that the wheel belongs to the robot.

Which sentence is correct?`,
    'Its wheel is missing.',
    "It's wheel is missing.",
    "Its' wheel is missing.",
    'It wheel is missing.',
    'Its with no apostrophe shows belonging. It\'s means it is, which does not fit in front of wheel.',
    apostrophe,
  ),
  q(
    T.punctuation,
    `The contracted form of do not is needed on a short poster.

Which spelling is correct?`,
    "don't",
    "do'nt",
    "dont'",
    'do\'not',
    'The apostrophe replaces the missing o in not, so don\'t is the contraction. The other spellings put the apostrophe in the wrong place.',
    apostrophe,
  ),
  q(
    T.punctuation,
    `Before lunch is a fronted adverbial. It tells the reader when the planting happened, and it needs a comma after it.

Which sentence follows that rule?`,
    'Before lunch, we planted the seeds.',
    'Before lunch we planted the seeds.',
    'Before, lunch we planted the seeds.',
    'Before lunch we, planted the seeds.',
    'A fronted adverbial is usually followed by a comma, so the comma comes after Before lunch. The other commas split the phrase or the verb in the wrong place.',
    fronted,
  ),
  q(
    T.punctuation,
    `The shopping list is glue, card, scissors and tape. Commas should separate the items.

Which sentence is clearest?`,
    'We need glue, card, scissors and tape.',
    'We need glue card scissors and tape.',
    'We need, glue card scissors, and tape.',
    'We, need glue, card scissors and, tape.',
    'Commas in a list separate the items. One comma at the start, or commas that split the verb, do not do that job.',
    punctuation,
  ),
  q(
    T.punctuation,
    `Which sentence is a question and has the right end mark?`,
    'Where did you put the rulers?',
    'Where did you put the rulers.',
    'Put the rulers in the box.',
    'The rulers are in the box.',
    'A question asks for something and ends with a question mark. The other sentences are a command or statements, or a question with the wrong mark.',
    ks1,
  ),
  q(
    T.punctuation,
    `Someone shouts a warning because a ball is flying towards the window. The feeling is strong.

Which ending is best?`,
    'Watch out!',
    'Watch out.',
    'Watch out?',
    'Watch out,',
    'An exclamation mark fits a sudden warning said with strong feeling. A full stop is too flat, and a question mark or comma does not finish the warning.',
    ks1,
  ),
  q(
    T.punctuation,
    `A simple statement needs a capital letter and a full stop.

Which sentence is written correctly?`,
    'The gate is shut.',
    'the gate is shut',
    'the Gate is Shut',
    'The gate is shut?',
    'A statement starts with a capital letter and ends with a full stop. Random capitals or a question mark change the sentence.',
    ks1,
  ),
  q(
    T.punctuation,
    `At the top of the hill tells the reader where the kite flew. It is a fronted adverbial.

Which sentence uses the comma correctly?`,
    'At the top of the hill, the kite caught the wind.',
    'At the top of the hill the kite caught the wind.',
    'At the top, of the hill the kite caught the wind.',
    'At the top of the hill the kite, caught the wind.',
    'The comma comes after the whole fronted adverbial, At the top of the hill. Splitting the phrase or the verb puts the pause in the wrong place.',
    fronted,
  ),
  q(
    T.punctuation,
    `Ben speaks first. His exact words are "My sock is wet." The speech should start with a capital letter.

Which sentence is correct?`,
    'Ben said, "My sock is wet."',
    'Ben said, "my sock is wet."',
    'Ben said "My sock is wet".',
    'Ben said, my sock is wet.',
    'When the speaker comes first, use a comma, then inverted commas, and start the speech with a capital letter. The full stop stays inside the marks.',
    speech,
  ),
  q(
    T.punctuation,
    `The children, as a group, own the paintings. Children is a plural that does not end in s.

Which label is correct?`,
    "the children's paintings",
    "the childrens' paintings",
    'the childrens paintings',
    "the children's' paintings",
    'A plural that does not end in s takes apostrophe s, so children\'s shows the group owns the paintings. Childrens is not the possessive spelling.',
    apostrophe,
  ),
  q(
    T.punctuation,
    `Ella tells the class "The cake is ready." The writer needs the spoken words to be obvious.

Which sentence makes the spoken words clear?`,
    'Ella said, "The cake is ready."',
    'Ella said the cake is ready.',
    '"Ella said the cake is ready."',
    'Ella, said the cake is ready.',
    'Inverted commas around The cake is ready show those are Ella\'s exact words. Without them the sentence is only a report, and marking the whole line makes someone else seem to be speaking.',
    speech,
  ),
  q(
    T.punctuation,
    `Two events need to stay as two sentences: the rain stopped, and then the class went outside.

Which punctuation is clearest?`,
    'The rain stopped. We went outside.',
    'The rain stopped we went outside.',
    'The rain stopped, we went outside.',
    'The rain. Stopped we went outside.',
    'A full stop separates two complete sentences. A comma between them, or no break at all, runs the two ideas together.',
    punctuation,
  ),
  q(
    T.punctuation,
    `The coach says "Sit down" as a command. The writer puts the comma inside the inverted commas.

Which explanation is most accurate?`,
    'The comma stays inside because it belongs to the spoken words, and the sentence is not finished yet.',
    'The comma shows that Sit down is a question.',
    'The inverted commas should go around the coach\'s name only.',
    'A question mark is needed whenever anyone speaks.',
    'When the speaker is named after the speech, a comma inside the inverted commas leads into said. The words are a command, not a question.',
    speech,
  ),
  q(
    T.punctuation,
    `A road sign can be misread as Slow children crossing, as if the children are slow. The writer wants drivers to slow down.

Which version makes that meaning clear?`,
    'Slow, children crossing.',
    'Slow children crossing.',
    'Slow children, crossing.',
    'Slow children crossing?',
    'The comma after Slow separates the command from the children, so drivers are told to slow down. Without it, slow seems to describe the children.',
    punctuation,
  ),
];
