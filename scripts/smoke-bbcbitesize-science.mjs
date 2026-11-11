const base = process.env.QUIZ_BASE ?? 'http://localhost:4321/quiz';
const questions = await (await fetch(`${base}/questions.json`)).json();
const bbc = questions.filter((question) => question.sourceId === 'bbcbitesize' && question.subject === 'Science');
if (bbc.length !== 210) throw new Error(`Expected 210 BBC Science questions, got ${bbc.length}`);

const topics = [...new Set(bbc.flatMap((question) => question.topics))].sort();
const withImg = bbc.filter((question) => question.stem.includes('/questions/bbcbitesize/science/'));
const sampleText = bbc.find((question) => !question.stem.includes('!['));
const sampleImg = withImg[0];
if (!sampleText || sampleText.choices.length !== 4 || sampleText.correctChoiceIds.length !== 1) {
  throw new Error('Text sample invalid');
}
if (!sampleImg) throw new Error('No image question found');

const match = sampleImg.stem.match(/\((\/questions[^)]+)\)/);
if (!match) throw new Error('Image path missing from stem');
const imageResponse = await fetch(`${base}${match[1]}`);
if (!imageResponse.ok) throw new Error(`Image fetch failed: ${imageResponse.status}`);
const imageBody = await imageResponse.text();
if (!imageBody.includes('<svg')) throw new Error('Image response is not SVG');

console.log(JSON.stringify({
  bbcScience: bbc.length,
  topics,
  withImages: withImg.length,
  sampleTextId: sampleText.id,
  sampleImageId: sampleImg.id,
  imagePath: match[1],
  imageBytes: imageBody.length,
}, null, 2));
