import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isUlid, monotonicUlidFactory } from './ulid.mjs';
import { createQuestionVisual } from './art-question-visuals.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const sourcePath = path.join(root, 'temp', 'artsa and design questions.md');
const outputDir = path.join(root, 'src', 'content', 'questions', 'chatgpt', 'art_and_design');
const visualOutputDir = path.join(root, 'public', 'questions', 'chatgpt', 'art-and-design');
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

async function writeFileWithRetry(filePath, content) {
  for (let attempt = 1; attempt <= 8; attempt++) {
    try {
      await writeFile(filePath, content, 'utf8');
      return;
    } catch (error) {
      if (attempt === 8 || !['EBUSY', 'EPERM', 'UNKNOWN'].includes(error.code)) throw error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 75));
    }
  }
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

const questionOnlineVisuals = new Map([
  [73, '![A brightly lit face and pearl forming a clear focal point against a dark background](/questions/chatgpt/art-and-design/composition-073-focal-point.jpg)'],
  [74, '![An off-centre seated figure balanced by a framed picture and curtain](/questions/chatgpt/art-and-design/composition-074-effective-placement.jpg)'],
  [75, '![Identical circles perceived differently when placed close together or spread apart](/questions/chatgpt/art-and-design/composition-075-proximity.png)'],
  [76, '![A narrowing avenue, overlapping trees and smaller distant forms creating strong depth](/questions/chatgpt/art-and-design/composition-076-depth.jpg)'],
  [77, '![A small bird made noticeable by its placement and the open space around it](/questions/chatgpt/art-and-design/composition-077-bird-negative-space.jpg)'],
  [78, '![Circles of different sizes and colours distributed across an abstract composition](/questions/chatgpt/art-and-design/composition-078-balanced-circles.jpg)'],
  [79, '![An interior made spacious by visible tiled floor and receding wall lines](/questions/chatgpt/art-and-design/composition-079-room-perspective.jpg)'],
  [80, '![A landscape separating rocky foreground, wooded middle ground and distant mountains](/questions/chatgpt/art-and-design/composition-080-landscape-layers.png)'],
  [81, '![A densely populated scene with many competing figures and activities](/questions/chatgpt/art-and-design/composition-081-crowded-scene.jpg)'],
  [82, '![A brightly lit face standing out clearly from a nearly black background](/questions/chatgpt/art-and-design/composition-073-focal-point.jpg)'],
  [83, '![An event poster with a distinct heading, main image and supporting details](/questions/chatgpt/art-and-design/judgement-186-poster-hierarchy.jpg)'],
  [85, '![A small bird and branch emphasised by a large area of open space](/questions/chatgpt/art-and-design/composition-077-bird-negative-space.jpg)'],
  [86, '![Perspective, overlap and decreasing scale making landscape features appear at different distances](/questions/chatgpt/art-and-design/composition-076-depth.jpg)'],
  [87, '![Successive horse positions creating a clear visual movement from left to right](/questions/chatgpt/art-and-design/composition-087-directional-movement.jpg)'],
  [88, '![A straight avenue and repeated trees directing attention toward the distant background](/questions/chatgpt/art-and-design/composition-076-depth.jpg)'],
  [89, '![A figure group arranged in a broad, stable triangular composition](/questions/chatgpt/art-and-design/composition-089-stable-triangle.jpg)'],
  [90, '![An advertisement using scale, placement and contrast to make its product prominent](/questions/chatgpt/art-and-design/judgement-180-product-ad.png)'],
  [25, '![A still life dominated by warm yellows, oranges and reds](/questions/chatgpt/art-and-design/colour-025-warm-still-life.jpg)'],
  [26, '![A winter village dominated by cool blues, blue-greys and muted whites](/questions/chatgpt/art-and-design/colour-026-cool-winter.jpg)'],
  [27, '![The same scene shown in highly saturated, moderately saturated and muted colour](/questions/chatgpt/art-and-design/colour-027-saturation-comparison.jpg)'],
  [28, '![Small coloured ellipses standing out against contrasting complementary backgrounds](/questions/chatgpt/art-and-design/colour-028-complementary-object-grid.png)'],
  [29, '![A dramatic sunset combining saturated red, orange and purple clouds](/questions/chatgpt/art-and-design/colour-029-dramatic-sunset.jpg)'],
  [30, '![Strongly separated red, yellow and blue areas divided by black and white](/questions/chatgpt/art-and-design/colour-030-strong-contrast.jpg)'],
  [31, '![A painting unified by a restricted palette of grey and gold](/questions/chatgpt/art-and-design/colour-031-limited-palette.jpg)'],
  [32, '![A poster with highly legible white lettering on a plain red background](/questions/chatgpt/art-and-design/colour-032-readable-poster.png)'],
  [33, '![A lively still life animated by bright rainbow-like areas of colour](/questions/chatgpt/art-and-design/colour-033-cheerful-colour.jpg)'],
  [34, '![A colour wheel divided between cool blues and greens and warm reds and oranges](/questions/chatgpt/art-and-design/colour-034-warm-cool-wheel.png)'],
  [35, '![An orange flower standing out strongly against complementary blue surroundings](/questions/chatgpt/art-and-design/colour-035-complementary-colours.jpg)'],
  [36, '![A calm natural landscape using muted greens, browns and earth tones](/questions/chatgpt/art-and-design/colour-036-earth-palette.jpg)'],
  [37, '![Pale magnolia flowers clearly separated from a dark blue background](/questions/chatgpt/art-and-design/colour-037-subject-separation.jpg)'],
  [38, '![Bright colours balanced through repeated arcs distributed around the composition](/questions/chatgpt/art-and-design/colour-038-balanced-bright-colour.jpg)'],
  [39, '![A saturated red umbrella forming the focal point in a subdued street scene](/questions/chatgpt/art-and-design/colour-039-red-focal-point.jpg)'],
  [177, '![A simple school emblem made from a few bold, distinctive shapes](/questions/chatgpt/art-and-design/judgement-177-school-badge.png)'],
  [178, '![A story illustration clearly showing Peter Rabbit meeting Mr McGregor](/questions/chatgpt/art-and-design/judgement-178-story-event.jpg)'],
  [179, '![A children’s book cover using an approachable animal character and simple title treatment](/questions/chatgpt/art-and-design/judgement-179-child-book-cover.jpg)'],
  [180, '![An advertisement using scale, placement and contrast to emphasise its product](/questions/chatgpt/art-and-design/judgement-180-product-ad.png)'],
  [181, '![Compact polypropylene chairs designed to stack and use space efficiently](/questions/chatgpt/art-and-design/judgement-181-stackable-chairs.jpg)'],
  [182, '![A coordinated repeating wallpaper pattern designed for the formal setting of St James’s Palace](/questions/chatgpt/art-and-design/judgement-182-formal-pattern.jpg)'],
  [183, '![An exhibition poster arranging its heading, image and event details with open space](/questions/chatgpt/art-and-design/judgement-183-information-poster.jpg)'],
  [184, '![A horse sculpture using a rearing pose, lifted legs and directional forms to suggest action](/questions/chatgpt/art-and-design/judgement-184-moving-animal-sculpture.jpg)'],
  [185, '![A clear children’s illustration with recognisable characters and understandable action](/questions/chatgpt/art-and-design/judgement-185-child-illustration.png)'],
  [186, '![An event poster with a distinct heading, main image and supporting details](/questions/chatgpt/art-and-design/judgement-186-poster-hierarchy.jpg)'],
  [187, '![A simple recognisable silhouette that remains legible at small sizes](/questions/chatgpt/art-and-design/judgement-187-small-icon.png)'],
  [188, '| Morning version | Sunset version |\n| --- | --- |\n| ![Rouen Cathedral painted in morning light](/questions/chatgpt/art-and-design/judgement-188-morning.jpg) | ![The same cathedral painted at sunset](/questions/chatgpt/art-and-design/judgement-188-sunset.jpg) |'],
  [189, '![A moulded plywood chair combining an appealing coherent form with practical seating](/questions/chatgpt/art-and-design/judgement-189-functional-chair.jpg)'],
  [190, '![Character studies showing clearly different moods through changed facial expression and head position](/questions/chatgpt/art-and-design/judgement-190-mood-expressions.jpg)'],
  [191, '![A road sign using a simple pedestrian silhouette for rapid recognition](/questions/chatgpt/art-and-design/judgement-191-road-symbol.png)'],
  [109, '![Clear recycling words and recognisable recycling symbols printed on cardboard packaging](/questions/chatgpt/art-and-design/purpose-109-recycle-message.jpg)'],
  [110, '![Mystery story cover using shadowy figures and suspenseful imagery](/questions/chatgpt/art-and-design/purpose-110-mystery-cover.jpg)'],
  [111, '![Fragile bottle protected inside a box by thick cushioning material](/questions/chatgpt/art-and-design/purpose-111-fragile-packaging.jpg)'],
  [112, '![Simple distinctive logo with a clear silhouette and very limited detail](/questions/chatgpt/art-and-design/purpose-112-small-logo.png)'],
  [113, '![High-contrast danger sign combining a clear warning word and warning symbol](/questions/chatgpt/art-and-design/purpose-113-danger-warning.jpg)'],
  [114, '![Paper and cardboard packaging using sustainable materials and natural colours](/questions/chatgpt/art-and-design/purpose-114-eco-packaging.jpg)'],
  [115, '![Book cover showing a spacecraft travelling among stars and planets](/questions/chatgpt/art-and-design/purpose-115-space-cover.jpg)'],
  [116, '![Child-friendly reading poster with a large picture-book illustration and clear reading message](/questions/chatgpt/art-and-design/purpose-116-reading-poster.jpg)'],
  [117, '![Illuminated exit sign using large lettering, a simple message and strong contrast](/questions/chatgpt/art-and-design/purpose-117-exit-sign.jpg)'],
  [118, '![Colourful crayon box using approachable artwork suitable for young children](/questions/chatgpt/art-and-design/purpose-118-child-packaging.jpg)'],
  [119, '![Recruitment advertisement with one strong focal figure and a concise readable message](/questions/chatgpt/art-and-design/purpose-119-clear-recruitment-poster.jpg)'],
  [120, '![Recognisable logo reduced to simple high-contrast black shapes on white](/questions/chatgpt/art-and-design/purpose-120-black-white-logo.jpg)'],
  [121, '![Rugged hard case using thick walls, sturdy latches and reinforced proportions](/questions/chatgpt/art-and-design/purpose-121-durable-case.jpg)'],
  [122, '![Historical exhibition poster using period illustration, typography and colours](/questions/chatgpt/art-and-design/purpose-122-historical-poster.jpg)'],
  [123, '![Calm uncluttered library reading nook with comfortable seating and gentle natural colours](/questions/chatgpt/art-and-design/purpose-123-reading-corner.jpg)'],
  [124, '![Simple bold recycling symbol with clear shapes and strong contrast](/questions/chatgpt/art-and-design/purpose-124-bold-recycling.png)'],
  [125, '![Art exhibition poster combining an attractive image, strong heading and event details](/questions/chatgpt/art-and-design/purpose-125-art-exhibition.jpg)'],
  [126, '![Carefully wrapped gift packages finished with coordinated paper, twine and natural decoration](/questions/chatgpt/art-and-design/purpose-126-gift-package.jpg)'],
  [127, '![Exhibition poster whose event date is difficult to find among many competing text styles](/questions/chatgpt/art-and-design/purpose-127-prominent-date.jpg)'],
  [128, '![Attractive exhibition poster with information organised into a clear visual hierarchy](/questions/chatgpt/art-and-design/purpose-128-clear-hierarchy.jpg)'],
  [204, '![Detailed watercolour study showing a small bird\'s markings](/questions/chatgpt/art-and-design/applying-204-bird-illustration.jpg)'],
  [205, '![Rainy city street at night with lights reflected on wet surfaces](/questions/chatgpt/art-and-design/applying-205-rainy-night.jpg)'],
  [206, '![Poster using large lettering and a strong central focal point](/questions/chatgpt/art-and-design/applying-206-readable-poster.jpg)'],
  [207, '![Walking sculpture with a forward-leaning body and striding legs](/questions/chatgpt/art-and-design/applying-207-walking-sculpture.jpg)'],
  [208, '![Forest path using overlapping trees and diminishing scale to create depth](/questions/chatgpt/art-and-design/applying-208-forest-depth.jpg)'],
  [209, '![Repeated motif arranged with consistent spacing across a square design](/questions/chatgpt/art-and-design/applying-209-repeat-pattern.png)'],
  [210, '| Weathered surface | Polished surface |\n| --- | --- |\n| ![Rust, irregular texture and muted colour on weathered metal](/questions/chatgpt/art-and-design/applying-210-weathered.jpg) | ![Smooth polished metal with sharp highlights and reflections](/questions/chatgpt/art-and-design/applying-210-polished.jpg) |'],
  [211, '![Storybook illustration using expressive figures, dark forms and dramatic composition](/questions/chatgpt/art-and-design/applying-211-frightening-character.jpg)'],
  [212, '![Simple bottle packaging using restrained colour and clear geometric forms](/questions/chatgpt/art-and-design/applying-212-modern-package.jpg)'],
  [213, '| Morning light | Sunset light |\n| --- | --- |\n| ![Rouen Cathedral painted in cool morning light](/questions/chatgpt/art-and-design/applying-213-morning.jpg) | ![The same cathedral painted with warm sunset light](/questions/chatgpt/art-and-design/applying-213-sunset.jpg) |'],
  [214, '![Historical museum display combining period objects, images and labels](/questions/chatgpt/art-and-design/applying-214-history-display.jpg)'],
  [215, '![A clear cat silhouette recognisable without internal detail](/questions/chatgpt/art-and-design/applying-215-cat-silhouette.png)'],
  [216, '![A fabric windsock forming flowing curves as it blows in the wind](/questions/chatgpt/art-and-design/applying-216-windsock.jpg)'],
  [217, '![A geometric pattern whose shapes meet continuously at every tile edge](/questions/chatgpt/art-and-design/applying-217-seamless-tile.png)'],
  [218, '![Patterned glass allowing background colours and light to remain visible](/questions/chatgpt/art-and-design/applying-218-patterned-glass.jpg)'],
  [234, '| Morning painting | Sunset painting |\n| --- | --- |\n| ![Rouen Cathedral in morning light, painted with loose layered brushstrokes](/questions/chatgpt/art-and-design/judgement-188-morning.jpg) | ![The same cathedral at sunset, painted with closely related loose layered brushstrokes](/questions/chatgpt/art-and-design/judgement-188-sunset.jpg) |'],
  [235, '![A calm landscape using gentle muted colours, soft atmospheric edges and a balanced arrangement](/questions/chatgpt/art-and-design/colour-036-earth-palette.jpg)'],
  [236, '![An exhibition poster with readable text and information organised into a clear visual hierarchy](/questions/chatgpt/art-and-design/purpose-128-clear-hierarchy.jpg)'],
  [237, '![A horse sculpture using a rearing pose, lifted legs and directional forms to suggest movement](/questions/chatgpt/art-and-design/judgement-184-moving-animal-sculpture.jpg)'],
  [238, '![A carefully observed bird study using accurate proportions and detailed markings](/questions/chatgpt/art-and-design/applying-204-bird-illustration.jpg)'],
  [239, '![A child-friendly logo using colourful outdoor imagery and clear, approachable lettering](/questions/chatgpt/art-and-design/evidence-239-child-logo.png)'],
  [240, '![A storm painting using intense contrast, dramatic light and sweeping diagonal movement](/questions/chatgpt/art-and-design/evidence-240-dramatic-painting.png)'],
  [241, '![A landscape using overlap, a narrowing avenue and decreasing scale to create depth](/questions/chatgpt/art-and-design/composition-076-depth.jpg)'],
  [242, '| Poster A | Poster B |\n| --- | --- |\n| ![An exhibition poster with open space, a large central image and clearly grouped information](/questions/chatgpt/art-and-design/judgement-183-information-poster.jpg) | ![An exhibition poster with a prominent heading, main image and supporting event details](/questions/chatgpt/art-and-design/judgement-186-poster-hierarchy.jpg) |'],
  [243, '| Morning mood | Sunset mood |\n| --- | --- |\n| ![Rouen Cathedral in cool pale morning light](/questions/chatgpt/art-and-design/judgement-188-morning.jpg) | ![The same cathedral in warmer, darker sunset light](/questions/chatgpt/art-and-design/judgement-188-sunset.jpg) |'],
  [244, '![A close view showing raised paint ridges, brush marks and areas of visible canvas texture](/questions/chatgpt/art-and-design/evidence-244-impasto.jpg)'],
  [245, '![A decorative pattern with corresponding forms mirrored across its vertical centre line](/questions/chatgpt/art-and-design/evidence-245-symmetrical-pattern.jpg)'],
]);

const questionsWithoutVisuals = new Set([84]);

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
    const prompt = questionSection.items[questionIndex];
    const onlineVisual = questionOnlineVisuals.get(outputIndex);
    const omitVisual = questionsWithoutVisuals.has(outputIndex);
    const visual = onlineVisual || omitVisual ? null : await createQuestionVisual({
      topicNumber,
      questionIndex,
      prompt,
      outputNumber: outputIndex,
      outputDir: visualOutputDir,
    });
    const { choices, correctChoiceId } = orderedChoices(
      answerChoice(answer), config.distractors, topicNumber, questionIndex,
    );
    const questionBody = omitVisual
      ? [
          prompt,
          '',
          'Choose the answer that best applies the composition principle described.',
        ]
      : [
          'Study the visual references, then answer the question.',
          '',
          onlineVisual ?? `![${visual.alt}](/questions/chatgpt/art-and-design/${visual.file})`,
          '',
          prompt,
          '',
          'Choose the answer that is best supported by the visual evidence and art or design principles.',
        ];
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
      ...questionBody,
      '',
    ].join('\n');
    await writeFileWithRetry(path.join(outputDir, filename), content);
    outputIndex++;
    generated++;
  }
}

if (generated !== expectedTotal) throw new Error(`Expected ${expectedTotal} generated questions, wrote ${generated}`);
console.log(`Generated ${generated} Art & Design questions across topics 2-17.`);
