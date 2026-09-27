import type { AttemptItem, Progress, Question } from './types';

export function isCorrect(question: Question, selectedChoiceIds: string[]): boolean {
  const selected = new Set(selectedChoiceIds);
  return selected.size === question.correctChoiceIds.length &&
    question.correctChoiceIds.every((id) => selected.has(id));
}

export function eligibleQuestions(
  questions: Question[],
  progress: Progress[],
  subject: string,
  sourceId: string,
  topics: string[],
  source: 'all' | 'still-missed' | 'ever-missed',
): Question[] {
  const progressById = new Map(progress.map((item) => [item.questionId, item]));
  return questions.filter((question) => {
    if (question.subject !== subject || question.sourceId !== sourceId) return false;
    if (topics.length && !question.topics.some((topic) => topics.includes(topic))) return false;
    if (source === 'all') return true;
    const state = progressById.get(question.id);
    return source === 'still-missed' ? state?.latestCorrect === false : state?.everWrong === true;
  });
}

export function selectQuestions(pool: Question[], count: number | 'all', random = Math.random): Question[] {
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return count === 'all' ? shuffled : shuffled.slice(0, count);
}

export function gradeItems(questions: Question[], answers: Record<string, string[]>): AttemptItem[] {
  return questions.map((question, order) => {
    const selectedChoiceIds = answers[question.id] ?? [];
    return { order, question, selectedChoiceIds, correct: isCorrect(question, selectedChoiceIds) };
  });
}

export function formatDuration(ms: number): string {
  const seconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ${String(seconds % 60).padStart(2, '0')}s`;
}
