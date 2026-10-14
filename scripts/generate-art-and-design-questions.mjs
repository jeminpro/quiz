import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isUlid, monotonicUlidFactory } from './ulid.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const sourcePath = path.join(root, 'temp', 'artsa and design questions.md');
const outputDir = path.join(root, 'src', 'content', 'questions', 'chatgpt', 'art_and_design');
const firstGeneratedFile = 13;

const image = (file, alt) => ({ file, alt });

const topicConfig = {
  2: {
    images: [
      image('heade-magnolias.jpg', 'Carefully observed white magnolias with realistic form and surface detail.'),
      image('seurat-grande-jatte.jpg', 'A park scene assembled from many controlled dots of colour.'),
      image('mondrian-composition.jpg', 'An abstract arrangement of straight black lines and blocks of primary colour.'),
      image('monet-water-lilies.jpg', 'Water lilies suggested with loose layered dabs of paint.'),
    ],
    distractors: [
      'The image with the brightest frame, regardless of its visual treatment',
      'The image that uses every available colour equally',
      'The image with the largest physical dimensions',
      'The image whose title sounds most realistic',
      'The image with the widest empty border',
      'The newest-looking image, regardless of style',
    ],
  },
  3: {
    images: [
      image('monet-haystacks-summer.jpg', 'Warm sunlight spreads across haystacks in a pale summer field.'),
      image('monet-haystacks-snow.jpg', 'Cool blue shadows cross a snowy field around two haystacks.'),
      image('monet-water-lilies.jpg', 'A blue-green pond is dotted with soft pink and white water lilies.'),
      image('toulouse-moulin-rouge-poster.jpg', 'A bold poster uses flat warm colour, dark silhouettes and large lettering.'),
    ],
    distractors: [
      'Use as many unrelated colours as possible with equal emphasis',
      'Match the main object exactly to its background',
      'Judge the effect only by the amount of white paint',
      'Remove all contrast between important information and its background',
      'Colour cannot affect mood, emphasis or readability',
      'Always use black alone to communicate a natural or calm atmosphere',
    ],
  },
  4: {
    images: [
      image('caravaggio-calling.jpg', 'A beam of light cuts across a dark interior and models the figures with strong contrast.'),
      image('heade-magnolias.jpg', 'Highlights and gradual shadows make pale flowers appear rounded.'),
      image('turner-snow-storm.jpg', 'Swirling light and dark paint make a storm feel deep and turbulent.'),
      image('rodin-thinker.jpg', 'Light and shadow describe the solid three-dimensional form of a bronze figure.'),
    ],
    distractors: [
      'Use one flat tone across every surface',
      'Place equal shadows on both sides, regardless of the light source',
      'Make the cast shadow float away from the object',
      'Use the same tone for the object and its background',
      'Ignore the direction of light when adding highlights',
      'Replace shading with a thicker outline around every edge',
    ],
  },
  5: {
    images: [
      image('durer-rhinoceros.jpg', 'A rhinoceros is described through varied outlines, hatching and textured marks.'),
      image('hokusai-great-wave.jpg', 'Repeated curling lines create the shape and movement of a wave.'),
      image('morris-strawberry-thief.jpg', 'Birds, leaves and flowers repeat in a dense decorative textile pattern.'),
      image('mondrian-composition.jpg', 'A regular structure of verticals, horizontals and geometric colour blocks.'),
    ],
    distractors: [
      'Use identical straight lines to represent every surface',
      'Change the spacing randomly in a regular pattern',
      'Remove every repeated unit from the design',
      'Use only one shape and place it once',
      'Keep every mark equal in length, direction and pressure',
      'Avoid contrast so that no element can become a focal point',
    ],
  },
  6: {
    images: [
      image('seurat-grande-jatte.jpg', 'Figures of different sizes overlap across a carefully balanced park scene.'),
      image('heade-magnolias.jpg', 'Four pale flowers form a low horizontal focus against dark cloth.'),
      image('mondrian-composition.jpg', 'Unequal rectangles balance one another through placement and colour.'),
      image('monet-beach.jpg', 'Boats, people, shoreline and sky create foreground, middle ground and distance.'),
    ],
    distractors: [
      'Give every object exactly the same visual emphasis',
      'Put all objects into one corner without considering balance',
      'Remove overlap, scale changes and perspective',
      'Fill every empty space with another competing detail',
      'Hide the main subject by matching it to the background',
      'Make headings, images and supporting details equally prominent',
    ],
  },
  7: {
    images: [
      image('hokusai-great-wave.jpg', 'A colour woodblock print built from carved shapes and repeatable inked impressions.'),
      image('durer-rhinoceros.jpg', 'A detailed printed image made from carved lines and hatched marks.'),
      image('rodin-thinker.jpg', 'A solid bronze sculpture designed to be viewed from different angles.'),
      image('monet-water-lilies.jpg', 'An oil painting with layered visible paint marks across its surface.'),
    ],
    distractors: [
      'Choose a material only because its colour is attractive',
      'Watercolour cannot be diluted or layered',
      'Collage uses only one unbroken painted surface',
      'Use a one-off drawing method when identical copies are required',
      'Texture can only be drawn and can never be physically raised',
      'Heavy stone is always the best material for a lightweight model',
    ],
  },
  8: {
    images: [
      image('recycling-symbol.png', 'A simple green recycling symbol made from three recognisable arrows.'),
      image('toulouse-moulin-rouge-poster.jpg', 'A poster combines large lettering, a bold silhouette and a limited palette.'),
      image('mondrian-composition.jpg', 'A simple high-contrast design remains clear when viewed small.'),
      image('morris-strawberry-thief.jpg', 'A decorative textile communicates a natural theme through birds and plants.'),
    ],
    distractors: [
      'Add as much text and decoration as the space can hold',
      'Use low contrast so that the main message blends into the background',
      'Choose imagery unrelated to the intended purpose',
      'Rely on colour alone and remove every recognisable shape',
      'Make the smallest supporting detail the strongest focal point',
      'Ignore the audience and where the design will be seen',
    ],
  },
  9: {
    images: [
      image('turner-snow-storm.jpg', 'A dark swirling storm creates danger and uncertainty around a small boat.'),
      image('monet-beach.jpg', 'A spacious beach, pale light and resting boats create a calmer mood.'),
      image('caravaggio-calling.jpg', 'Strong directional light gives an indoor scene tension and drama.'),
      image('toulouse-ballet-dancers.jpg', 'Repeated leaping figures and diagonal movement make a stage feel energetic.'),
    ],
    distractors: [
      'Mood depends only on the title printed beside an artwork',
      'Every dark colour always communicates exactly the same emotion',
      'The frame determines the expression of every figure',
      'Empty space can never contribute to meaning',
      'Movement is shown only by adding written speed lines',
      'Facial expression cannot affect interpretation',
    ],
  },
  10: {
    images: [
      image('mondrian-composition.jpg', 'A geometric arrangement whose line, colour and position can be compared systematically.'),
      image('morris-strawberry-thief.jpg', 'A repeated pattern of birds, strawberries, leaves and flowers.'),
      image('seurat-grande-jatte.jpg', 'A crowded scene containing many small figures and carefully placed objects.'),
      image('monet-beach.jpg', 'A coastal scene with boats, people, shoreline and bands of sky.'),
    ],
    distractors: [
      'Choose the first image that looks generally similar',
      'Compare only the frames and ignore the pictured details',
      'Assume every repeated element has the same count and position',
      'Ignore the direction of shadows and perspective lines',
      'Use the title instead of visible evidence',
      'Compare overall colour only and never inspect individual features',
    ],
  },
  11: {
    images: [
      image('seurat-grande-jatte.jpg', 'A complex scene organised around a strong foreground figure and repeated verticals.'),
      image('monet-cliff-walk.jpg', 'Two figures stand clearly against open sky and a sloping cliff.'),
      image('mondrian-composition.jpg', 'A memorable arrangement uses limited colour, straight lines and unequal blocks.'),
      image('rodin-thinker.jpg', 'A three-dimensional figure uses a compact pose and strong silhouette.'),
    ],
    distractors: [
      'Add unrelated detail until every area is equally busy',
      'Reduce contrast between text and its background',
      'Make all natural forms perfectly symmetrical',
      'Remove overlap and every clue of depth',
      'Give the background more detail than the main subject',
      'Use an indistinct silhouette with many tiny features',
    ],
  },
  12: {
    images: [
      image('recycling-symbol.png', 'A compact symbol uses a simple recognisable silhouette.'),
      image('toulouse-moulin-rouge-poster.jpg', 'A poster creates hierarchy with large text, bold shapes and limited colour.'),
      image('rodin-thinker.jpg', 'A sculpture uses balance, pose and a clear outline to communicate an idea.'),
      image('morris-strawberry-thief.jpg', 'A coordinated decorative pattern repeats natural motifs and colours.'),
    ],
    distractors: [
      'Choose the design with the greatest number of tiny details',
      'Judge appearance without considering use or audience',
      'Prefer the least readable layout because it looks complex',
      'Select an unstable object that does not fit its available space',
      'Make every part of the design equally prominent',
      'Ignore whether the imagery communicates the intended message',
    ],
  },
  13: {
    images: [
      image('morris-strawberry-thief.jpg', 'Bird and plant motifs repeat across a decorative surface.'),
      image('mondrian-composition.jpg', 'Rectangles and lines create an ordered geometric structure.'),
      image('recycling-symbol.png', 'Three arrows repeat around a central point in a rotational sequence.'),
      image('hokusai-great-wave.jpg', 'Curves and foam shapes repeat with changes of scale and direction.'),
    ],
    distractors: [
      'Restart with an unrelated shape, colour and direction',
      'Ignore the repeated unit and choose at random',
      'Reverse only one stage without following the established rule',
      'Remove an element whenever the sequence adds one',
      'Change spacing even though the pattern keeps it consistent',
      'Break symmetry by altering only one side',
    ],
  },
  14: {
    images: [
      image('durer-rhinoceros.jpg', 'Fine lines and varied hatching describe an animal and its textured surface.'),
      image('caravaggio-calling.jpg', 'Directional light and deep shadow create a dramatic indoor scene.'),
      image('toulouse-moulin-rouge-poster.jpg', 'Large text and bold shapes communicate clearly from a distance.'),
      image('monet-beach.jpg', 'Overlap, scale and bands of land, water and sky create spatial depth.'),
    ],
    distractors: [
      'Use the same technique without considering the new purpose',
      'Remove the most distinctive features of the subject',
      'Keep lighting identical even when the time and weather change',
      'Make distant objects larger and sharper than near ones',
      'Use tiny low-contrast text for information seen from far away',
      'Choose imagery unrelated to the intended place, period or audience',
    ],
  },
  15: {
    images: [
      image('heade-magnolias.jpg', 'A realistic close study with careful detail, smooth form and controlled lighting.'),
      image('mondrian-composition.jpg', 'An abstract grid dominated by line, shape and primary colour.'),
      image('monet-cliff-walk.jpg', 'A landscape with loose marks, overlapping figures and atmospheric distance.'),
      image('toulouse-moulin-rouge-poster.jpg', 'A graphic poster using simplified silhouettes, bold type and flat colour.'),
    ],
    distractors: [
      'Choose the two works with the most similar frames',
      'Select the image with the longest title',
      'Judge every work only by its subject',
      'Ignore brushwork, proportion, contrast and composition',
      'Choose the physically largest file',
      'Treat every simplified image as fully realistic',
    ],
  },
  16: {
    images: [
      image('monet-haystacks-summer.jpg', 'Short layered marks and warm light describe a summer field.'),
      image('monet-haystacks-snow.jpg', 'Related marks and composition describe haystacks under cool winter light.'),
      image('turner-snow-storm.jpg', 'Strong contrast and circular movement create a dramatic scene.'),
      image('recycling-symbol.png', 'A simple symmetrical symbol is designed for quick recognition.'),
    ],
    distractors: [
      'A personal guess with no visible supporting feature',
      'The artwork title alone, without checking the image',
      'The size of the downloaded file',
      'The colour of the frame rather than the design',
      'A claim that one clue proves authorship with certainty',
      'A judgement unrelated to the intended purpose',
    ],
  },
  17: {
    images: [
      image('recycling-symbol.png', 'A clear symbol communicates an environmental idea quickly.'),
      image('toulouse-moulin-rouge-poster.jpg', 'A poster balances headline, image and supporting information.'),
      image('rodin-thinker.jpg', 'A strong three-dimensional pose creates a recognisable silhouette.'),
      image('morris-strawberry-thief.jpg', 'Repeated leaves, flowers and birds form a controlled natural pattern.'),
    ],
    distractors: [
      'Use unrelated imagery and give every element equal emphasis',
      'Choose materials for appearance alone and ignore function',
      'Flatten every pose and remove directional lines',
      'Hide important information in the smallest text',
      'Represent every surface with the same marks and highlights',
      'Fill the background with more detail than the main subject',
    ],
  },
};

function parseSections(source) {
  const result = new Map();
  for (const match of source.matchAll(/^## (\d+)\. ([^\r\n]+)\r?\n([\s\S]*?)(?=^## \d+\.|(?![\s\S]))/gm)) {
    const number = Number(match[1]);
    const items = [...match[3].matchAll(/^\d+\.\s+(.+)$/gm)].map((item) => item[1].trim());
    result.set(number, { title: match[2].trim(), items });
  }
  return result;
}

function cleanAnswer(value) {
  return value.replaceAll('**', '').replace(/\s+/g, ' ').trim();
}

function answerChoice(value) {
  const match = value.match(/^\*\*(.+?)\*\*/);
  if (!match) throw new Error(`Answer does not start with a bold summary: ${value}`);
  return match[1].replace(/:\s*$/, '').trim();
}

function imageGrid(images) {
  const rows = [];
  for (let index = 0; index < images.length; index += 2) {
    const left = images[index];
    const right = images[index + 1];
    rows.push(`| Visual ${index + 1} | Visual ${index + 2} |`);
    rows.push('|:--:|:--:|');
    rows.push(`| ![${left.alt}](/questions/chatgpt/art-and-design/${left.file}) | ![${right.alt}](/questions/chatgpt/art-and-design/${right.file}) |`);
    rows.push('');
  }
  return rows.join('\n').trim();
}

function orderedChoices(correct, distractors, topicNumber, questionIndex) {
  const start = (questionIndex * 3 + topicNumber) % distractors.length;
  const wrong = [0, 1, 2].map((offset) => distractors[(start + offset) % distractors.length]);
  const correctIndex = (topicNumber + questionIndex) % 4;
  const values = [...wrong];
  values.splice(correctIndex, 0, correct);
  return {
    choices: values.map((text, index) => ({ id: String.fromCharCode(65 + index), text })),
    correctChoiceId: String.fromCharCode(65 + correctIndex),
  };
}

const source = await readFile(sourcePath, 'utf8');
const [questionSource, answerSource] = source.split(/\r?\n---\r?\n# Answer Keys and Explanations\r?\n/);
if (!questionSource || !answerSource) throw new Error('Could not split questions from answer keys');

const questionsByTopic = parseSections(questionSource);
const answersByTopic = parseSections(answerSource);
const expectedTopicCounts = new Map([
  [2, 12], [3, 15], [4, 15], [5, 18], [6, 18], [7, 18], [8, 20], [9, 18],
  [10, 15], [11, 15], [12, 15], [13, 12], [14, 15], [15, 15], [16, 12], [17, 10],
]);
const expectedTotal = [...expectedTopicCounts.values()].reduce((sum, count) => sum + count, 0);

await mkdir(outputDir, { recursive: true });
const existingFiles = await readdir(outputDir);
const existingIds = new Map();
for (const filename of existingFiles.filter((name) => /^\d{3}\.md$/.test(name))) {
  const match = (await readFile(path.join(outputDir, filename), 'utf8')).match(/^id:\s*(\S+)$/m);
  if (match && isUlid(match[1])) existingIds.set(filename, match[1]);
}

const nextId = monotonicUlidFactory();
let outputIndex = firstGeneratedFile;
let generated = 0;

for (const [topicNumber, expectedCount] of expectedTopicCounts) {
  const questionSection = questionsByTopic.get(topicNumber);
  const answerSection = answersByTopic.get(topicNumber);
  const config = topicConfig[topicNumber];
  if (!questionSection || !answerSection || !config) throw new Error(`Missing data for topic ${topicNumber}`);
  if (questionSection.title !== answerSection.title) throw new Error(`Topic ${topicNumber} heading mismatch`);
  if (questionSection.items.length !== expectedCount || answerSection.items.length !== expectedCount) {
    throw new Error(`Topic ${topicNumber} expected ${expectedCount} questions and answers, found ${questionSection.items.length}/${answerSection.items.length}`);
  }

  for (let questionIndex = 0; questionIndex < expectedCount; questionIndex++) {
    const filename = `${String(outputIndex).padStart(3, '0')}.md`;
    const id = existingIds.get(filename) ?? nextId();
    const answer = answerSection.items[questionIndex];
    const { choices, correctChoiceId } = orderedChoices(
      answerChoice(answer), config.distractors, topicNumber, questionIndex,
    );
    const content = [
      '---',
      `id: ${id}`,
      'subject: "Art & Design"',
      `topics: [${JSON.stringify(questionSection.title)}]`,
      'choices:',
      ...choices.flatMap((choice) => [
        `  - id: ${choice.id}`,
        `    text: ${JSON.stringify(choice.text)}`,
      ]),
      `correctChoiceIds: [${correctChoiceId}]`,
      `explanation: ${JSON.stringify(cleanAnswer(answer))}`,
      '---',
      'Study the visual references, then answer the question.',
      '',
      imageGrid(config.images),
      '',
      questionSection.items[questionIndex],
      '',
      'Choose the answer that is best supported by the visual evidence and art or design principles.',
      '',
    ].join('\n');
    await writeFile(path.join(outputDir, filename), content, 'utf8');
    outputIndex++;
    generated++;
  }
}

if (generated !== expectedTotal) throw new Error(`Expected ${expectedTotal} generated questions, wrote ${generated}`);
console.log(`Generated ${generated} Art & Design questions across topics 2-17.`);
