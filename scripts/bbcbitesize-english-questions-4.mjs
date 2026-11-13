import { pages, q, topics as T } from './bbcbitesize-english-shared.mjs';

const homophones = pages.spelling;
const audience = pages.ks2;
const ks1 = pages.ks1;

/** @type {import('./bbcbitesize-english-shared.mjs').RawQuestion[]} */
export const questionsPartFour = [
  q(
    T.homophones,
    `The family left some coats on the park bench. The coats belong to them.

Which word shows that belonging?`,
    'The family left their coats on the bench.',
    'The family left there coats on the bench.',
    'The family left they\'re coats on the bench.',
    'The family left they coats on the bench.',
    'Their shows that the coats belong to the family. There is a place, and they\'re means they are.',
    homophones,
  ),
  q(
    T.homophones,
    `A map note tells the reader the place to stand. It does not mean that an object belongs to someone.

Which sentence uses the place word?`,
    'Stand over there, by the oak.',
    'Stand over their, by the oak.',
    'Stand over they\'re, by the oak.',
    'Stand over they, by the oak.',
    'There points to a place. Their would show belonging, and they\'re would mean they are, which does not fit before by the oak.',
    homophones,
  ),
  q(
    T.homophones,
    `The bell has rung and the children are late. The writer wants the short form of they are.

Which sentence is correct?`,
    'They\'re late for the bell.',
    'Their late for the bell.',
    'There late for the bell.',
    'They late for the bell.',
    'They\'re means they are, so it fits they are late. Their and there do not mean they are.',
    homophones,
  ),
  q(
    T.homophones,
    `Jo is going towards the library. The sentence needs the word that shows direction.

Which sentence is correct?`,
    'Jo walked to the library.',
    'Jo walked too the library.',
    'Jo walked two the library.',
    'Jo walked toe the library.',
    'To shows direction towards the library. Too means also or more than enough, and two is the number.',
    homophones,
  ),
  q(
    T.homophones,
    `The bag is very heavy. The writer wants the word that means more than enough, not the number 2.

Which sentence is correct?`,
    'This bag is too heavy.',
    'This bag is to heavy.',
    'This bag is two heavy.',
    'This bag is toe heavy.',
    'Too means more than enough, so the bag is heavier than it should be. To is a direction word, and two is a number.',
    homophones,
  ),
  q(
    T.homophones,
    `There are 2 pencils in the pot. The writer must use the number word.

Which sentence is correct?`,
    'I can see two pencils.',
    'I can see to pencils.',
    'I can see too pencils.',
    'I can see toe pencils.',
    'Two is the number. To and too sound the same but mean direction or more than enough.',
    homophones,
  ),
  q(
    T.homophones,
    `The coat on the peg belongs to the reader. The sign is speaking to that person.

Which sentence shows the coat belongs to them?`,
    'Your coat is on the peg.',
    'You\'re coat is on the peg.',
    'Yore coat is on the peg.',
    'You coat is on the peg.',
    'Your shows belonging. You\'re means you are, so you are coat does not make sense.',
    homophones,
  ),
  q(
    T.homophones,
    `The teacher means you are the line leader today. A contraction is needed.

Which sentence is correct?`,
    'You\'re the line leader today.',
    'Your the line leader today.',
    'You the line leader today.',
    'Yore the line leader today.',
    'You\'re means you are, which matches the line-leader job. Your would need a belonging noun after it, such as your turn.',
    homophones,
  ),
  q(
    T.homophones,
    `A bird noise comes from the hedge. The children notice the sound. They are not talking about this place.

Which sentence matches the sound?`,
    'I can hear a bird in the hedge.',
    'I can here a bird in the hedge.',
    'I can ear a bird in the hedge.',
    'I can her a bird in the hedge.',
    'Hear is the verb for taking in a sound. Here means this place, so it does not fit after can.',
    homophones,
  ),
  q(
    T.homophones,
    `The register is in this place, on the desk, not somewhere the children listen.

Which sentence uses the place word?`,
    'The register is here on the desk.',
    'The register is hear on the desk.',
    'The register is her on the desk.',
    'The register is hare on the desk.',
    'Here means in this place. Hear is about sound, and hare is an animal.',
    homophones,
  ),
  q(
    T.homophones,
    `From the coach window the class looks out at the wide water. The sentence needs the looking verb and the word for that water.

Which sentence is correct?`,
    'We can see the sea from the coach.',
    'We can sea the see from the coach.',
    'We can see the see from the coach.',
    'We can sea the sea from the coach.',
    'See is the looking verb, and sea is the water. The other lines swap those jobs.',
    homophones,
  ),
  q(
    T.homophones,
    `A black-and-yellow insect lands on a blossom. The sentence needs the insect, not the verb to be, and the blossom, not baking powder.

Which sentence is correct?`,
    'A bee landed on the flower.',
    'A be landed on the flower.',
    'A bee landed on the flour.',
    'A be landed on the flour.',
    'Bee is the insect. Be is a verb, and flour is the baking powder, so those words do not name the insect on the flower.',
    homophones,
  ),
  q(
    T.homophones,
    `The wind pushed a blue scarf along the path. One word must be the colour, and the other must be the past of blow.

Which sentence keeps both meanings?`,
    'The wind blew the blue scarf along the path.',
    'The wind blue the blew scarf along the path.',
    'The wind blue the blue scarf along the path.',
    'The wind blew the blew scarf along the path.',
    'Blew is the past of blow, and blue is the colour. Swapping them makes the wind a colour or the scarf an action.',
    homophones,
  ),
  q(
    T.homophones,
    `The owl hunts after the sun has set. The sentence is about that time, not about a person in armour.

Which sentence matches the time?`,
    'The owl hunted at night.',
    'The owl hunted at knight.',
    'The owl hunted at nite.',
    'The owl hunted at knit.',
    'Night is the time after day. Knight is a person in armour, even though the words sound the same.',
    homophones,
  ),
  q(
    T.homophones,
    `The children need their coats on before they go outside. The sentence tells them to put the coats on. It is not asking about a place.

Which sentence is correct?`,
    'Wear your coat outside.',
    'Where your coat outside.',
    'Ware your coat outside.',
    'Were your coat outside.',
    'Wear means put on the coat. Where asks about a place, and were is a past verb.',
    homophones,
  ),
  q(
    T.homophones,
    `The class is choosing between the hall and the field. The sentence must ask about the place.

Which sentence is the right question?`,
    'Where shall we practise?',
    'Wear shall we practise?',
    'Were shall we practise?',
    'Ware shall we practise?',
    'Where asks about a place. Wear would tell someone to put something on, which is not the question.',
    homophones,
  ),
  q(
    T.homophones,
    `The team was successful in a single race. The sentence needs the past of win and the number.

Which sentence is correct?`,
    'They won one race.',
    'They one won race.',
    'They won won race.',
    'They one one race.',
    'Won is the past of win, and one is the number. Each word is needed once, in that order, for a single race that the team won.',
    homophones,
  ),
  q(
    T.homophones,
    `A story character in a pointed hat chose one cloak from the box. The question must ask about the choice and name that character.

Which sentence is correct?`,
    'Which cloak did the witch choose?',
    'Witch cloak did the which choose?',
    'Which cloak did the which choose?',
    'Witch cloak did the witch choose?',
    'Which asks about the choice of cloak, and witch is the character. The other lines give the character\'s name to the question word.',
    homophones,
  ),
  q(
    T.homophones,
    `The morning is wet with rain and wind. The sentence names that outdoor condition. It is not a choice between two options.

Which sentence matches the rain?`,
    'The weather is wet this morning.',
    'The whether is wet this morning.',
    'The weather is wet this whether.',
    'The whether is wet this whether.',
    'Weather is rain, sun and wind. Whether introduces a choice, so it does not name the wet morning.',
    homophones,
  ),
  q(
    T.homophones,
    `Two children want a slice of the same cake. The sentence is about a part of the cake, not about quiet or the end of a war.

Which sentence is correct?`,
    'May I have a piece of cake?',
    'May I have a peace of cake?',
    'May I have a peas of cake?',
    'May I have a piece of peace?',
    'Piece means a part, so it is a part of the cake. Peace means calm or no war, which is a different word.',
    homophones,
  ),
  q(
    T.audience,
    `Jonah is writing a bedtime story for his four-year-old sister. She is just learning to listen to simple sentences.

Which opening is the best choice?`,
    'Sam the duck liked the pond. He splashed and quacked.',
    'The malevolent drake hurtled through the impenetrable brambles after his quarry.',
    'With the merest glimmer of dusk, the waterfowl commenced his lonely nocturnal vigil.',
    'The boy screamed as thunder tore the duck away and the storm howled.',
    'Short, friendly sentences suit a four-year-old. The other openings use difficult words, old-fashioned style, or a frightening scene.',
    ks1,
  ),
  q(
    T.audience,
    `A notice on the school gate must tell parents what is happening, where, and when. It is not a story.

Which notice is the best choice?`,
    'Choir club is in the hall on Thursday at 3.15.',
    'Come if you want, maybe, somewhere, sometime.',
    'The celestial chorus shall congregate forthwith in yonder chamber.',
    'I like singing, and my dog is called Pip.',
    'The hall, Thursday and 3.15 give parents the facts they need. A vague note, very difficult words, or a pet story does not work as a gate notice.',
    audience,
  ),
  q(
    T.audience,
    `Isha is writing yesterday\'s diary entry in her own voice. She forgot her gloves and her hands hurt from the cold.

Which sentence fits the diary?`,
    'I forgot my gloves, so my hands were freezing.',
    'You forgot his gloves, so their hands were freezing.',
    'Gloves are items worn on the hands in cold weather.',
    'Once upon a time a glove lived in a tall castle.',
    'A diary about yourself uses I and says what happened. Mixed pronouns, a definition, or a fairy-tale opening do not fit this entry.',
    audience,
  ),
  q(
    T.audience,
    `The results box in a science book must say what the class observed. Story language is for a different page.

Which sentence belongs in the results box?`,
    'The water turned blue after one minute.',
    'The potion was a dragon\'s tear and the beaker began to sing.',
    'Once upon a time a brave liquid fought the powder.',
    'The blue colour was as sad as a lost cloud.',
    'A result states what happened, and the colour change after one minute can be checked. Dragons, battles and a sad cloud are story choices, not results.',
    audience,
  ),
  q(
    T.audience,
    `A poem about leaves says "the leaves whispered" instead of "the leaves moved".

Why is whispered the better choice for the poem?`,
    'It makes the leaves sound gentle, as if they were quietly alive.',
    'It shows that the leaves are using inverted commas.',
    'It changes the poem into a past perfect science report.',
    'It is a homophone of moved, so the meaning stays exactly the same.',
    'Whispered gives the leaves a quiet, living sound, which is why a poet might choose it. It is not a punctuation mark, a tense label, or a word that means the same as moved.',
    audience,
  ),
  q(
    T.audience,
    `Instructions for building a model must be easy to follow in order. A story opening would slow the builder down.

Which line is the best first instruction?`,
    'Cut along the solid line.',
    'Long ago, in a land of paper, a brave tab woke from a dream.',
    'The scissors felt as happy as a holiday.',
    'What a magnificent solid line that was, dear reader!',
    'Cut along the solid line tells the builder the first action. A story, a feeling about the scissors, or an exclamation does not give the step.',
    audience,
  ),
  q(
    T.audience,
    `A Year 2 class is reading a poster about washing hands. The words need to be direct and easy.

Which sentence is the best choice for the poster?`,
    'Wash your hands with soap.',
    'One ought to cleanse one\'s extremities with a cleansing agent.',
    'The soap whispered secrets to the brave little taps.',
    'Did the ancient monarchs consider hygiene, and what is a germ?',
    'Wash your hands with soap is short and tells the reader what to do. A difficult sentence, a story about soap, or a history question does not suit this poster.',
    ks1,
  ),
  q(
    T.audience,
    `The school newsletter is for families. It should sound friendly and clear, and it must include the date of the fair.

Which sentence is the best choice?`,
    'The summer fair is on Saturday 12 July in the playground.',
    'A fair, perhaps, if the stars align and the date remains unspoken.',
    'The aforementioned assemblage shall occur at a time heretofore undisclosed.',
    'I once went to a fair and ate a lot of cake.',
    'Families need the day, the date and the place. Hiding the date, using very difficult words, or telling a personal cake story misses the newsletter job.',
    audience,
  ),
  q(
    T.audience,
    `A character is scared but trying to be brave. The writer can choose said, whispered, or roared for the line "I am fine."

Which choice best matches a scared, quiet voice?`,
    'whispered',
    'roared',
    'laughed',
    'sang',
    'Whispered matches a quiet, uneasy voice. Roared, laughed and sang would make the character sound loud, amused, or cheerful instead.',
    audience,
  ),
  q(
    T.audience,
    `A football report for the school website must say the score. The reader was not at the match.

Which sentence gives the clearest information?`,
    'Year 5 beat Year 4 by three goals to one.',
    'We did the thing and it was good.',
    'The spherical object entered the net-like structure on several occasions.',
    'You should have been there, so I will not say the score.',
    'Three goals to one tells a reader who missed the match what happened. Vague words, a puzzle of difficult nouns, or refusing the score does not inform them.',
    audience,
  ),
  q(
    T.audience,
    `An invitation for grandparents needs a place, a time, and a welcome. It should not sound like a warning sign.

Which invitation is the best choice?`,
    'Please join us in the hall on Friday at 2 pm. We would love to see you.',
    'Enter at your own risk. Time and place unknown.',
    'The congregation of elders is commanded to appear forthwith.',
    'I like my grandma. The end.',
    'Please join us gives a welcome, a place and a time. A warning, an order, or a private note with no details is the wrong kind of invitation.',
    audience,
  ),
  q(
    T.audience,
    `The writer is explaining a new word in a reading book for Year 3. The explanation should be simpler than the word scarce.

Which explanation is the best choice?`,
    'Scarce means there is not much of it.',
    'Scarce means a paucity of available commodities.',
    'Scarce means a type of dance.',
    'Scarce means the same as overflowing.',
    'There is not much of it explains scarce in words a Year 3 reader can use. A harder sentence, a dance, or the opposite meaning would not help.',
    audience,
  ),
  q(
    T.audience,
    `A play script shows who speaks. The line is for the character Jo, and the words are "Look behind you."

Which layout is the best choice?`,
    'Jo: Look behind you.',
    'Look behind you, with no name, in a paragraph of story.',
    'The narrator says that somebody might have looked.',
    'Behind you look Jo the words in a jumble.',
    'Jo: before the line shows the actor what to say. A story paragraph, a narrator\'s guess, or jumbled words would not work as Jo\'s script line.',
    audience,
  ),
  q(
    T.audience,
    `A headline for a class newspaper should be short and say what happened. The article is about a lost hamster that was found.

Which headline is the best choice?`,
    'Lost hamster found in the library',
    'Something happened today',
    'A small mammal of the family Cricetidae was located',
    'Read on and you might find out, or you might not',
    'Lost hamster found in the library tells the news in a few clear words. A vague line, a scientific name, or a headline that hides the news does not do the job.',
    audience,
  ),
  q(
    T.audience,
    `The same event can be told in different ways. For a sad page in a story, the rain has just spoiled the picnic.

Which sentence best matches the sad mood?`,
    'The rain slid into the sandwiches and nobody spoke.',
    'The rain was a hilarious surprise and everyone cheered.',
    'Rain is water that falls from clouds.',
    'The picnic was at 12.04 and the rainfall was 2 mm.',
    'Sandwiches ruined and silence fit a sad moment. Cheering reverses the mood, and a definition or a data line belongs in a different kind of text.',
    audience,
  ),
  q(
    T.audience,
    `A set of rules for the art room should tell children what to do. Jokes would make the rules easy to miss.

Which rule is the best choice?`,
    'Put the lids back on the paints.',
    'Lids are optional if you feel like a pirate.',
    'The lids, those small round hats of destiny, may rest wherever they please.',
    'What is a lid, and who can say?',
    'Put the lids back on the paints is a clear instruction. A joke, a playful description, or a question does not keep the art room rule clear.',
    audience,
  ),
  q(
    T.audience,
    `Before a test, the class reads the question twice. One child wants to circle any word he does not know.

Is that a useful check?`,
    'Yes, because a known word can change what the question is asking.',
    'No, because questions should be answered before they are read.',
    'No, because only the shortest word can matter.',
    'Yes, because every unknown word should be copied out as the answer.',
    'Reading carefully and noticing an unknown word helps the reader understand the question. Answering unread, ignoring long words, or copying a word as the answer would not.',
    audience,
  ),
  q(
    T.audience,
    `A writer finishes a story and reads it aloud. Two sentences repeat "Then he went. Then he went."

What should the writer do next?`,
    'Change one sentence so the action is more precise and the repeat is gone.',
    'Add Then he went a third time so the pattern is longer.',
    'Delete the whole story because one phrase was repeated.',
    'Replace both sentences with a diagram and no words.',
    'Reading aloud shows the repeated phrase. Replacing one with a precise action improves the story without throwing the whole piece away.',
    audience,
  ),
  q(
    T.audience,
    `The audience is a new Reception class. The text is a label under a picture of a cat.

Which label is the best choice?`,
    'A cat',
    'A domestic feline exhibiting crepuscular behaviour',
    'The cat, whose whiskers were long, sat upon the mat which belonged to the cook.',
    'See the previous chapter for the cat\'s full history.',
    'A cat matches a simple picture label for a very young class. A difficult definition, a long sentence, or a note about another chapter does not.',
    ks1,
  ),
  q(
    T.audience,
    `A letter of apology to a neighbour must sound sorry and say what will happen next. The broken flowerpot was an accident.

Which sentence is the best choice?`,
    'I am sorry I broke the flowerpot. I will replace it on Saturday.',
    'The flowerpot was in the way, so it is your fault.',
    'I am writing to discuss the socioeconomic context of pottery.',
    'Oops. Anyway, the match was brilliant.',
    'The apology names the mistake and the next step. Blaming the neighbour, a difficult essay opening, or changing the subject does not repair the situation.',
    audience,
  ),
];
