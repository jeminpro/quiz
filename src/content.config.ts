import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { ULID_PATTERN } from '../scripts/ulid.mjs';

const questions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/questions' }),
  schema: z.object({
    id: z.string().regex(ULID_PATTERN, 'Invalid ULID'),
    subject: z.string().min(1),
    topics: z.array(z.string().min(1)).min(1),
    choices: z.array(z.object({ id: z.string().min(1), text: z.string().min(1) })).min(2),
    correctChoiceIds: z.array(z.string().min(1)).min(1),
    explanation: z.string().min(1),
  }).superRefine((question, context) => {
    const ids = question.choices.map((choice) => choice.id);
    if (new Set(ids).size !== ids.length) {
      context.addIssue({ code: 'custom', message: 'Choice IDs must be unique' });
    }
    if (new Set(question.correctChoiceIds).size !== question.correctChoiceIds.length ||
      question.correctChoiceIds.some((id) => !ids.includes(id))) {
      context.addIssue({ code: 'custom', message: 'Correct choice IDs must exist and be unique' });
    }
  }),
});

export const collections = { questions };
