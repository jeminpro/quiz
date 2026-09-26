export interface Choice { id: string; text: string }
export interface Question {
  id: string;
  subject: string;
  topics: string[];
  choices: Choice[];
  correctChoiceIds: string[];
  explanation: string;
  stem: string;
}
export interface Profile { id: string; name: string; createdAt: number }
export interface Progress {
  questionId: string;
  subject: string;
  topics: string[];
  latestCorrect?: boolean;
  everWrong?: boolean;
  bookmarked?: boolean;
  latestAt?: number;
}
export interface Attempt {
  id: string;
  profileId: string;
  subject: string;
  topics: string[];
  source: 'all' | 'still-missed' | 'ever-missed';
  startedAt: number;
  completedAt: number;
  durationMs: number;
  total: number;
  correct: number;
  status: 'saving' | 'complete';
}
export interface AttemptItem {
  order: number;
  question: Question;
  selectedChoiceIds: string[];
  correct: boolean;
}
export interface PendingAttempt { attempt: Attempt; items: AttemptItem[] }
