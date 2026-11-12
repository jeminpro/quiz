# FSCE-style BBC Bitesize question bank prompt

Set `SUBJECT` once in the Prompt block, then copy everything from **Prompt** onward into a new agent chat.

Examples: `Science`, `History`, `Geography`, `Music`, `Maths`, `Art and Design`, `Design and Technology`, `Physical Education`, `Computing`, `English`.

---

## Prompt

```text
SUBJECT = History
```

You are building an FSCE-style multiple-choice question bank in this quiz repo.

### Subject binding

Use the subject defined above as `SUBJECT`.
Derive `SUBJECT_FOLDER` from it as a stable lowercase slug (`Science` → `science`, `Art and Design` → `art_and_design`, `Design and Technology` → `design_technology`, `Physical Education` → `pe`).
Wherever this prompt says “the subject”, it means `SUBJECT`.

### Goal

Create original quiz questions for category **`bbcbitesize`** and subject **`SUBJECT`**, suitable for the Gloucestershire FSCE Year 7 entrance familiarisation style, using BBC Bitesize KS1/KS2 content for Years 1–5 as the topic source.

- Write **original stems, choices, and explanations**. Do not copy BBC Bitesize quiz text verbatim.
- When a question needs a picture, **prefer the BBC Bitesize image itself** (see Images), with a clear source reference. This bank is for **private family self-study**, not public redistribution.

Hard limit: **no more than 300 questions**. Prefer fewer excellent questions over padding. Aim for about **200** unless the subject’s Year 1–5 coverage is naturally thinner.

Work in careful steps. Quality matters more than speed.

### Before writing questions

1. Read the FSCE children’s familiarisation guide sample multiple-choice question for the subject in:
   `temp/FSCE Gloucestershire/GuideForChildrenGloucestershire.pdf`
   Capture the **wording pattern**: short scenario, four options A–D, one best answer, distractors that fail for a clear reason (wrong method, extra variable, guess instead of measure/evidence, reversed cause, etc.).

2. Read the FSCE parents’ guide section for the subject in:
   `temp/FSCE Gloucestershire/GuideForParentsGloucestershire.pdf`
   Capture the **topics and skills** the test is looking for (knowledge + how children think/apply, not trivia alone).

3. Find BBC Bitesize **KS1 and KS2** pages for the subject and review Years **1–5** topic coverage. Use those topics as the content map. Skip Year 6-only material unless the parents’ guide clearly includes it for this subject.

4. Study existing good examples in this repo:
   - Science bank: `src/content/questions/bbcbitesize/science/`
   - Schema: `src/content.config.ts`
   - Category registration: `src/lib/contentSources.ts`
   - Generator pattern: `scripts/generate-bbcbitesize-science.mjs` (and related science scripts) if regenerating in bulk

Ask me clarifying questions only if something critical is ambiguous. Otherwise proceed.

### Question style rules (FSCE format)

- Exactly **4 choices**, ids `A` `B` `C` `D`.
- Exactly **one** correct answer (`correctChoiceIds` length 1), unless the children’s guide sample for this subject clearly uses multi-select — default to single best answer.
- Stem: a short everyday / school scenario, then a clear question such as:
  - “Which plan is best?”
  - “Which conclusion fits the evidence?”
  - “What should they do next?”
  - “Which explanation is most accurate?”
- Distractors must be **plausible mistakes**, not silly nonsense.
- Language a primary child can read. Earlier-year ideas use shorter stems; later ideas may use the parents’-guide vocabulary.
- Explanation: **1–2 sentences** saying why the best answer works. If a BBC image or page was used, append a short source line (see Images).
- One topic string per question (for the app topic filter). Use clear, stable topic names grouped from the parents’ guide + Bitesize map.
- Rotate the correct option letter across the bank (do not put almost every answer on A).
- Original question wording only. Do not paste Bitesize quiz questions or answer text.

### What to include / exclude

Include:
- Year 1–5 knowledge and skills aligned to the parents’ guide for the subject
- Application, comparison, fair method, evidence-based choice, and “best explanation” items where natural for the subject
- A small share of “working like a learner in this subject” items if the parents’ guide emphasises process (planning, checking, improving), not only facts

Exclude:
- Year 6-only Bitesize topics not supported by the parents’ guide
- Ranking / ordering, matching, free-text fill-in, or other formats this app cannot mark cleanly as A–D choice
- Games, songs, and entertainment pages that are not real curriculum content

### Images

**Default:** text-only, like most FSCE samples.

**When a picture is needed** (map, timeline, diagram, artefact photo, notation, labelled figure, etc.):

1. Prefer the **BBC Bitesize image** from the relevant guide page instead of inventing a new diagram every time.
2. Put the image in the stem as markdown, using either:
   - the direct BBC image URL, or
   - a locally saved copy under `public/questions/bbcbitesize/SUBJECT_FOLDER/` if the remote URL is unstable/offline use is needed
3. Always credit the source in the explanation, including the Bitesize page URL, for example:
   - `Source: BBC Bitesize — https://www.bbc.co.uk/bitesize/...`
4. If no suitable BBC image exists, fall back to a simple original SVG and still cite the Bitesize topic page that informed the question when useful.
5. Do not scrape whole Bitesize pages or bulk-download unrelated media. Only pull the specific image needed for that question.

Example stem pattern:

```md
![Food chain diagram](https://...bbc.../example.png)

Look at the diagram. Which living thing is the producer?

...
explanation: "Grass makes its own food, so it is the producer. Source: BBC Bitesize — https://www.bbc.co.uk/bitesize/..."
```

Note: BBC content remains BBC copyright. This workflow is intended only for private family self-study with attribution, not for publishing or sharing the bank publicly.

### Repo technical requirements

1. Ensure `bbcbitesize: 'BBC Bitesize'` exists in `src/lib/contentSources.ts`.
2. Write questions as markdown files in:
   `src/content/questions/bbcbitesize/SUBJECT_FOLDER/`
3. Each file must match the content schema, with `subject` set to `SUBJECT`:

```md
---
id: <ULID>
subject: <SUBJECT>
topics: ["Topic Name"]
choices:
  - id: A
    text: "..."
  - id: B
    text: "..."
  - id: C
    text: "..."
  - id: D
    text: "..."
correctChoiceIds: [B]
explanation: "One or two sentences for a child. Source: BBC Bitesize — https://www.bbc.co.uk/bitesize/..."
---
Stem text here. Optional image markdown above or within the stem.
```

4. Use ULID ids from `scripts/ulid.mjs` / `monotonicUlidFactory`.
5. Prefer a generator script that writes from reviewed question data (as with science), so the bank can be regenerated cleanly.
6. Validate before finishing:
   - unique ids and stems
   - 4 unique choices, correct id exists
   - local image paths exist; remote BBC image URLs are well-formed and open successfully when checked
   - image questions include a BBC source URL in the explanation when a Bitesize image/page was used
   - subject/category appear in `questions.json`
   - run relevant unit tests

### Suggested process

1. Extract FSCE sample wording + parents’ topic list for the subject.
2. Build a topic quota table covering Years 1–5 (total ≤ 300).
3. Author high-quality questions in batches by topic.
4. For visual questions, reuse the matching BBC Bitesize image with attribution; otherwise keep text-only or use a simple original SVG.
5. Generate markdown + any local image assets.
6. Validate and smoke-check.

### Done when

- The subject appears under BBC Bitesize in the app.
- About 180–220 (max 300) strong FSCE-style questions are present.
- Topics are filterable and balanced.
- Visual questions use BBC images with source links where possible, or simple originals as fallback.
- Validation/tests pass.

Start by confirming the FSCE sample style and parents’ topic list for the subject, then implement.
