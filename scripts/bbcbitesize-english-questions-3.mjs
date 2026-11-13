import { pages, q, topics as T } from './bbcbitesize-english-shared.mjs';

const relative = pages.relative;
const nounPhrase = pages.nounPhrase;
const modal = pages.modal;
const grammar = pages.grammar;
const pronoun = pages.pronoun;
const paragraph = pages.paragraph;
const fronted = pages.fronted;

/** @type {import('./bbcbitesize-english-shared.mjs').RawQuestion[]} */
export const questionsPartThree = [
  q(
    T.sentences,
    `The pool rule is a safety rule, not a choice. Running is not allowed.

Which sentence shows that the rule has to be followed?`,
    'Swimmers must walk, not run.',
    'Swimmers might walk, not run.',
    'Swimmers could walk, not run.',
    'Swimmers may walk, not run.',
    'Must shows obligation, so it fits a safety rule. Might, could and may leave the walking as a possibility or a choice.',
    modal,
  ),
  q(
    T.sentences,
    `Sports day might be outside, but the class will not know until the morning. The sky could go either way.

Which sentence matches that uncertainty?`,
    'We might have sports day outside.',
    'We must have sports day outside.',
    'We will have sports day outside.',
    'We have sports day outside every year.',
    'Might shows that the outdoor sports day is possible but not certain. Must, will and the regular present all sound more sure than the clue allows.',
    modal,
  ),
  q(
    T.sentences,
    `The party note says hats are allowed, but nobody has to wear one.

Which sentence gives that permission?`,
    'You may bring a hat.',
    'You must bring a hat.',
    'You might be forced to bring a hat.',
    'You should not bring a hat.',
    'May gives permission, so a hat is allowed. Must makes it compulsory, and the other sentences forbid the hat or force it.',
    modal,
  ),
  q(
    T.sentences,
    `The teacher is giving advice about editing, not a safety rule and not a guess.

Which sentence is the best advice?`,
    'You should check your spellings.',
    'You must never check your spellings.',
    'You might refuse to check your spellings.',
    'You can ignore every spelling.',
    'Should is used for advice, so checking spellings fits an editing tip. The other sentences tell the writer not to check.',
    modal,
  ),
  q(
    T.sentences,
    `The sky has turned black and thunder has just started over the field.

Which sentence best matches how likely the rain is?`,
    'It will rain very soon.',
    'It cannot rain, because the sky is clear.',
    'It might rain next year, but not from this storm.',
    'Rain is impossible while thunder is sounding.',
    'Black clouds and thunder are strong evidence that rain is about to happen, so will fits. The other sentences contradict the storm that is already there.',
    modal,
  ),
  q(
    T.sentences,
    `The forecast says the moon may show if the clouds break. It is likely, but not promised.

Which sentence matches that?`,
    'We will probably see the moon if the clouds clear.',
    'We will probably see the moon because the clouds are thick.',
    'We will certainly see the moon, although nobody can know.',
    'Probably means the moon is impossible tonight.',
    'Probably matches something likely, and the if-clause keeps it from being certain. Thick clouds would hide the moon, and certainly contradicts nobody can know.',
    modal,
  ),
  q(
    T.sentences,
    `The writer wants extra detail about the boy in the same sentence, not a new sentence.

Which sentence does that?`,
    'The boy who found the glove is in Year 4.',
    'The boy. Who found the glove. Is in Year 4.',
    'Who found the glove.',
    'The boy is in Year 4 who.',
    'Who found the glove is a relative clause next to boy, so the detail stays in one sentence. A relative clause cannot stand alone or sit after the verb with nothing to attach to.',
    relative,
  ),
  q(
    T.sentences,
    `The sentence is about a place: the hall used for singing.

Which relative pronoun fits the place?`,
    'This is the hall where we sing.',
    'This is the hall who we sing.',
    'This is the hall whose we sing.',
    'This is the hall when we sing.',
    'Where introduces a relative clause about a place. Who is for people, whose shows possession, and when is for time.',
    relative,
  ),
  q(
    T.sentences,
    `The extra detail is about a thing, the bike, not about a person.

Which sentence uses the right relative pronoun?`,
    'The bike which has a bell is mine.',
    'The bike who has a bell is mine.',
    'The bike where has a bell is mine.',
    'The bike when has a bell is mine.',
    'Which can add detail about a thing. Who is for people, and where or when do not fit a bike\'s bell.',
    relative,
  ),
  q(
    T.sentences,
    `The pencil case belongs to the girl. The relative clause must show that belonging.

Which sentence is correct?`,
    'I sit next to the girl whose pencil case is red.',
    'I sit next to the girl who pencil case is red.',
    'I sit next to the girl which pencil case is red.',
    'I sit next to the girl where pencil case is red.',
    'Whose shows that the pencil case belongs to the girl. Who, which and where do not show possession.',
    relative,
  ),
  q(
    T.sentences,
    `A story needs a clear picture of one particular dog, not just the word dog.

Which phrase gives the clearest picture?`,
    'the small, muddy dog with a blue lead',
    'dog',
    'the',
    'with',
    'An expanded noun phrase adds determiners, adjectives and extra detail, so the reader can picture that dog. Dog alone, or a single word such as the or with, does not do that.',
    nounPhrase,
  ),
  q(
    T.sentences,
    `The writer is still describing the same speckled hen. The extra words must not turn it into a different object.

Which phrase keeps the hen and adds detail?`,
    'the speckled hen with muddy feet',
    'the speckled tractor with muddy feet',
    'hen',
    'muddy',
    'The speckled hen with muddy feet still names the hen and adds a clear detail. Changing hen to tractor changes the meaning, and one word is not an expanded phrase.',
    nounPhrase,
  ),
  q(
    T.sentences,
    `The class stayed inside. The reason was the hail.

Which sentence shows that cause?`,
    'We stayed inside because the hail started.',
    'We stayed inside or the hail started.',
    'We stayed inside but then we went out in the hail.',
    'We stayed inside, the hail.',
    'Because links the staying inside to its cause, the hail. Or, but and a broken ending do not give that reason.',
    grammar,
  ),
  q(
    T.sentences,
    `The reading happens after lunch. The joining word must show time.

Which sentence is clearest?`,
    'After lunch, we read our poems.',
    'Because lunch, we read our poems.',
    'Who lunch, we read our poems.',
    'Although lunch we never read.',
    'After is the time link, so the poems are read once lunch has finished. Because, who and although do not tell the reader when the reading happens.',
    grammar,
  ),
  q(
    T.sentences,
    `The picnic place is beneath the oak, not beside the gate.

Which sentence shows the place?`,
    'The picnic is under the oak tree.',
    'The picnic is because the oak tree.',
    'The picnic is who the oak tree.',
    'The picnic is if the oak tree.',
    'Under is a preposition of place, so it shows where the picnic is. Because, who and if do not locate it.',
    grammar,
  ),
  q(
    T.sentences,
    `A recipe step must tell the cook what to do. It is a command, not a question or a comment.

Which line fits the recipe?`,
    'Slice the banana.',
    'Did you slice the banana?',
    'The banana was lovely.',
    'What a banana that is!',
    'Slice the banana tells the cook to do something. A question, a comment and an exclamation do not give the next step.',
    grammar,
  ),
  q(
    T.sentences,
    `A science result must state what happened. It should not give an order or ask a question.

Which sentence belongs in the results?`,
    'The ice melted in ten minutes.',
    'Melt the ice now.',
    'Did the ice melt?',
    'What a melt that was!',
    'The ice melted in ten minutes is a statement of the result. The other sentences are a command, a question and an exclamation.',
    grammar,
  ),
  q(
    T.sentences,
    `In the story, a huge crash surprises everyone. The sentence should show strong feeling, not ask a question.

Which sentence fits?`,
    'What a crash that was!',
    'What a crash that was?',
    'Was that a crash.',
    'Crash the drums.',
    'What a crash that was! is an exclamation. A question mark, a muddled question, or a command to crash the drums changes the job of the sentence.',
    grammar,
  ),
  q(
    T.sentences,
    `Two ideas are equal: the class can paint, or the class can draw. Neither choice is a reason for the other.

Which joining word fits?`,
    'We can paint or we can draw.',
    'We can paint because we can draw.',
    'We can paint although the hall is shut so nobody paints.',
    'We can paint who we can draw.',
    'Or joins two similar choices. Because would invent a cause, and the other lines do not offer two equal choices.',
    grammar,
  ),
  q(
    T.sentences,
    `The main fact is that the badge belongs to Nia. The writer also wants the reader to know it is red, in the same sentence.

Which sentence adds the detail cleanly?`,
    'The badge that is red belongs to Nia.',
    'The badge belongs to Nia that.',
    'That is red.',
    'Red. The badge. Nia.',
    'That is red is a relative clause next to badge, so the colour stays attached to the right noun. A clause cannot be left after the sentence or used on its own.',
    relative,
  ),
  q(
    T.cohesion,
    `Lucy was tired, so she went to bed early. The writer does not want to repeat Lucy.

Which second sentence links clearly?`,
    'She went to bed early.',
    'They went to bed early.',
    'He went to bed early.',
    'It went to bed early.',
    'She matches Lucy and avoids repeating her name. They, he and it point to the wrong person or thing.',
    pronoun,
  ),
  q(
    T.cohesion,
    `The children went to the park. In the next sentence, the writer wants one pronoun for the whole group.

Which sentence links the group?`,
    'They played on the swings.',
    'She played on the swings.',
    'He played on the swings.',
    'It played on the swings.',
    'They replaces the children, who are a group. She, he and it would mean one person or a thing, so the link would be wrong.',
    pronoun,
  ),
  q(
    T.cohesion,
    `The success belonged to Kevin and Maria together. A later sentence should show that shared belonging without repeating both names.

Which word does that?`,
    'The success was theirs.',
    'The success was hers only, and Kevin was left out.',
    'The success was its.',
    'The success was them.',
    'Theirs is a possessive pronoun for more than one owner, so it fits Kevin and Maria together. Hers would leave Kevin out, and its or them do not show their shared success.',
    pronoun,
  ),
  q(
    T.cohesion,
    `A thank-you letter has three different jobs: greeting the reader, giving the reasons, and closing. Each job is a new idea.

Which plan uses paragraphs well?`,
    'Start a new paragraph for the greeting, another for the reasons, and another for the closing.',
    'Put the greeting, reasons and closing in one block with no breaks.',
    'Start a new paragraph in the middle of a sentence.',
    'Give every single word its own paragraph.',
    'A new paragraph starts when the idea changes, so the greeting, reasons and closing can be separated. No breaks, or a break after every word, makes the letter harder to follow.',
    paragraph,
  ),
  q(
    T.cohesion,
    `Nia's draft has one paragraph about Monday's trip and then, without a break, a new day: "On Tuesday the class stayed in school."

What should she do?`,
    'Start a new paragraph when the day changes to Tuesday.',
    'Keep Tuesday in the Monday paragraph because both are school days.',
    'Delete the Tuesday sentences so the time never changes.',
    'Move the Tuesday idea into the middle of a Monday sentence.',
    'When the time changes, a new paragraph helps the reader. Tuesday is a new time, so it should not stay inside the Monday paragraph.',
    paragraph,
  ),
  q(
    T.cohesion,
    `A report paragraph is all about the river test. The next sentences are about a different experiment with paper planes.

Which choice keeps the paragraphs organised?`,
    'Start a new paragraph for the paper-plane experiment.',
    'Add the planes to the river paragraph because both happened at school.',
    'Hide the change by using no new line and no link.',
    'Put the plane results in the title instead of the report.',
    'A paragraph should stay on one topic. The planes are a new experiment, so they need their own paragraph rather than being mixed into the river test.',
    paragraph,
  ),
  q(
    T.cohesion,
    `These events are in order: filling the sink, floating the boat, then timing the race. The links should show that order.

Which version flows in time order?`,
    'First, we filled the sink. Then, we floated the boat. After that, we timed the race.',
    'After that, we timed the race. First, we filled the sink. Then, we floated the boat.',
    'Then, we floated the boat. After that, we filled the sink.',
    'First, we timed the race. Then, we filled the sink.',
    'First, then and after that only work if the events stay in the real order. The other versions time the race or float the boat before the sink is filled.',
    paragraph,
  ),
  q(
    T.cohesion,
    `The place phrase at the edge of the stage has been moved to the front, so the reader knows where the sound starts.

Which sentence uses it as a fronted adverbial of place?`,
    'At the edge of the stage, the microphone crackled.',
    'The microphone crackled at the edge of the stage.',
    'When the microphone crackled, the stage was a time.',
    'The microphone was loud, but the sentence never says where.',
    'At the edge of the stage comes first and tells the reader the place, so it is fronted. Putting the place at the end, or leaving it out, does not do that.',
    fronted,
  ),
  q(
    T.cohesion,
    `A story jumps from the classroom to the hall with no link. The reader needs to know the place has changed.

Which sentence makes the link?`,
    'In the hall, the choir was already standing.',
    'The choir was already standing.',
    'Yesterday the choir was standing in the classroom.',
    'She was already standing.',
    'In the hall tells the reader the new place. A sentence with no place, the old classroom, or she with nobody named does not make the move clear.',
    fronted,
  ),
  q(
    T.cohesion,
    `The pronoun in the second sentence must match the noun already used.

The gate was stiff. ___ needed oil.

Which word fits the gap?`,
    'It',
    'They',
    'She',
    'He',
    'It replaces the gate, which is one thing. They would mean more than one, and she or he would mean a person.',
    pronoun,
  ),
  q(
    T.cohesion,
    `Two girls, Hana and Beth, left their coats. The next sentence must mean both coats, not a third person.

Which sentence is clear?`,
    'Hana and Beth left their coats on the bench.',
    'Hana and Beth left her coat on the bench.',
    'Hana and Beth left its coats on the bench.',
    'Hana and Beth left your coat on the bench.',
    'Their matches two people and their coats. Her would mean one girl, its would mean a thing, and your would mean the reader.',
    pronoun,
  ),
  q(
    T.cohesion,
    `A paragraph about the castle ends. The next paragraph starts a new place: the woods. The opening must link back and move the reader on.

Which opening links the paragraphs?`,
    'After leaving the castle, the children entered the woods.',
    'The woods are made of trees, and castles were not mentioned.',
    'Meanwhile the castle paragraph should be repeated word for word.',
    'And. Then. Also. Next.',
    'After leaving the castle links the new woods paragraph to the place the reader has just left. A fresh fact with no link, or a string of single words, does not build that flow.',
    paragraph,
  ),
  q(
    T.cohesion,
    `The writer has used the name Omar in three sentences in a row. Omar is one boy.

Which edit keeps the meaning and sounds less repetitive?`,
    'Keep Omar in the first sentence, then use he.',
    'Change every Omar to they.',
    'Change every Omar to it.',
    'Delete the name and the pronoun, and leave the verbs alone.',
    'He can replace Omar after the reader knows who is meant. They and it do not match one boy, and a verb with no subject is unclear.',
    pronoun,
  ),
  q(
    T.cohesion,
    `Number links are needed for three steps in a model-making guide. The steps must stay in order: cut, fold, glue.

Which version is best?`,
    'Firstly, cut the card. Secondly, fold the tabs. Finally, glue the edges.',
    'Finally, cut the card. Firstly, glue the edges. Secondly, fold the tabs.',
    'Secondly, cut the card. Firstly, fold the tabs.',
    'Firstly, glue the edges before the card is cut.',
    'Firstly, secondly and finally show the order cut, then fold, then glue. Starting with finally, or gluing before cutting, breaks the sequence.',
    paragraph,
  ),
  q(
    T.cohesion,
    `The sentence "Maya picked up Maya's bag and Maya went out" repeats the name.

Which rewrite is clearest?`,
    'Maya picked up her bag and went out.',
    'Maya picked up his bag and went out.',
    'They picked up her bag and went out.',
    'Maya picked up its bag and they went out.',
    'Once Maya is named, her avoids repeating the name. His, its and they point to the wrong person or to more than one person.',
    pronoun,
  ),
  q(
    T.cohesion,
    `A news paragraph is about the new library. The writer then adds a sentence about a goal scored in a football match.

What should the writer do with the goal sentence?`,
    'Move it into a new paragraph, because it is a new topic.',
    'Leave it in the library paragraph, because both use words.',
    'Put it in the middle of the library title.',
    'Replace the library paragraph with only the football score.',
    'Paragraphs group one theme. A football goal is a new theme, so it should not stay in the library paragraph or take the library\'s place without a new section.',
    paragraph,
  ),
  q(
    T.cohesion,
    `The reader has just been told the time: it is noon. The next sentence happens later, at home time.

Which link shows the time move?`,
    'Later, at home time, the class collected their coats.',
    'At the same noon moment, home time began as well.',
    'Before noon, home time was already over.',
    'The coats were collected, with no time word at all.',
    'Later, at home time moves the reader forward from noon. Saying both times are the same moment, or giving no time word, hides the change.',
    fronted,
  ),
  q(
    T.cohesion,
    `The noun is the team. The pronoun in the next sentence must not sound like one player.

Which sentence matches the team?`,
    'The team won the cup. They cheered.',
    'The team won the cup. She cheered.',
    'The team won the cup. He cheered.',
    'The team won the cup. You cheered.',
    'They matches a team of people. She or he would mean one person, and you would mean the reader rather than the team.',
    pronoun,
  ),
  q(
    T.cohesion,
    `Every sentence in this paragraph is about how to plant the beans. One sentence does not belong: "My favourite colour is green."

What should the writer do?`,
    'Take that sentence out, because it is a different idea.',
    'Keep it, because green is a colour beans can be.',
    'Start the planting paragraph with the favourite colour.',
    'Change every planting sentence into a colour sentence.',
    'A paragraph should hold one theme. A favourite colour is not a planting step, so removing it keeps the paragraph clear.',
    paragraph,
  ),
  q(
    T.cohesion,
    `The sign says "Lost: one red glove. If found, return it to the office."

Which word does it point back to?`,
    'the red glove',
    'the office',
    'the person who finds it',
    'every glove in the school',
    'It replaces the one red glove already named. It does not mean the office, the finder, or every glove.',
    pronoun,
  ),
];
