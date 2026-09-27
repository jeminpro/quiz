import type { Question } from './types';

export const contentSources: Record<string, string> = {
  chatgpt: 'ChatGPT',
  'oak-national-academy': 'Oak National Academy',
};

export function sourceIdFromEntryId(entryId: string): string {
  const parts = entryId.replaceAll('\\', '/').split('/');
  const sourceId = parts[0];
  if (parts.length !== 3 || !sourceId || !parts[1] || !parts[2] || !Object.hasOwn(contentSources, sourceId)) {
    throw new Error(`Question ${entryId} must be inside a known source/subject folder`);
  }
  return sourceId;
}

export function groupSubjectsBySource(questions: Question[]): { sourceId: string; subjects: { name: string; count: number }[] }[] {
  const groups = new Map<string, Map<string, number>>();
  for (const question of questions) {
    const subjects = groups.get(question.sourceId) ?? new Map<string, number>();
    subjects.set(question.subject, (subjects.get(question.subject) ?? 0) + 1);
    groups.set(question.sourceId, subjects);
  }
  return [...groups].sort(([a], [b]) => contentSources[a].localeCompare(contentSources[b]))
    .map(([sourceId, subjects]) => ({
      sourceId,
      subjects: [...subjects].sort(([a], [b]) => a.localeCompare(b))
        .map(([name, count]) => ({ name, count })),
    }));
}
