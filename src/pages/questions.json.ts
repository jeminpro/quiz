import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { sourceIdFromEntryId } from '../lib/contentSources';

export const GET: APIRoute = async () => {
  const entries = await getCollection('questions');
  const ids = entries.map((entry) => entry.data.id);
  if (new Set(ids).size !== ids.length) throw new Error('Duplicate question IDs');
  const questions = entries.map((entry) => {
    if (!entry.body?.trim()) throw new Error(`Question ${entry.data.id} has no body`);
    return { ...entry.data, sourceId: sourceIdFromEntryId(entry.id), stem: entry.body };
  });
  return new Response(JSON.stringify(questions), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
