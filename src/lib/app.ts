import DOMPurify from 'dompurify';
import { marked } from 'marked';
import type { User } from 'firebase/auth';
import {
  createProfile, firebaseProjectId, getAttempt, getAttemptItems, isConfigured, listAttempts,
  listProfiles, listProgress, observeUser, renameProfile, saveAttempt, signIn, signOutUser,
  toggleBookmark,
} from './firebase';
import { eligibleQuestions, formatDuration, gradeItems, selectQuestions } from './quiz';
import type { Attempt, PendingAttempt, Profile, Progress, Question } from './types';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const app = document.querySelector<HTMLElement>('#app')!;
const nav = document.querySelector<HTMLElement>('#nav')!;
const status = document.querySelector<HTMLElement>('#status')!;
let user: User | null = null;
let profiles: Profile[] = [];
let profile: Profile | undefined;
let questions: Question[] = [];
let progress: Progress[] = [];
let active: {
  questions: Question[];
  subject: string;
  topics: string[];
  source: Attempt['source'];
  startedAt: number;
  answers: Record<string, string[]>;
  index: number;
} | undefined;
let pending: PendingAttempt | undefined;

function path(page: string, params?: Record<string, string>): string {
  const url = `${base}${page}`;
  return params ? `${url}?${new URLSearchParams(params)}` : url;
}

function route(): string {
  return window.location.pathname.slice(base.length).replace(/\/$/, '') || '/';
}

function escapeHtml(value: unknown): string {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]!);
}

function markdown(value: string): string {
  const container = document.createElement('div');
  container.innerHTML = DOMPurify.sanitize(marked.parse(value) as string);
  for (const image of container.querySelectorAll('img')) {
    const src = image.getAttribute('src') ?? '';
    if (src.startsWith('/questions/')) image.setAttribute('src', `${base}${src}`);
    image.loading = 'lazy';
  }
  return container.innerHTML;
}

function message(text: string, kind: 'error' | 'success' = 'error'): void {
  status.textContent = text;
  status.className = `notice ${kind}`;
  status.hidden = false;
}

function clearMessage(): void { status.hidden = true; }

function showError(error: unknown): void {
  console.error(error);
  message(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
}

function errorCode(error: unknown): string | undefined {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    return String(error.code);
  }
  return undefined;
}

function renderFirestoreAccessError(step: string, error: unknown): void {
  console.error(`Firestore ${step} failed`, error);
  if (errorCode(error) !== 'permission-denied' || !user) {
    showError(error);
    app.innerHTML = '<div class="empty">Could not load your family data. Please try refreshing the page.</div>';
    return;
  }
  clearMessage();
  nav.innerHTML = '';
  app.innerHTML = `<div class="card empty access-error"><div class="eyebrow">FIRESTORE ACCESS</div>
    <h1>Sign-in worked, but the database denied access.</h1>
    <p>The <strong>${escapeHtml(step)}</strong> read was denied in Firebase project
      <code>${escapeHtml(firebaseProjectId ?? 'unknown')}</code>.</p>
    <p>Deploy this app’s <code>firestore.rules</code> to that project. The rules allow every signed-in user
      to access only their own profiles and results under <code>families/${escapeHtml(user.uid)}</code>.</p>
    <p><code>firebase deploy --only firestore:rules --project ${escapeHtml(firebaseProjectId ?? 'YOUR_PROJECT_ID')}</code></p>
    <p class="fine-print">Signed-in Firebase UID: <code>${escapeHtml(user.uid)}</code></p>
    <div class="error-actions"><button type="button" class="primary" id="retry-access">Retry access</button>
      <button type="button" class="secondary" id="sign-out">Sign out</button></div></div>`;
  app.querySelector('#retry-access')?.addEventListener('click', () => location.reload());
  app.querySelector('#sign-out')?.addEventListener('click', async () => {
    try { await signOutUser(); } catch (signOutError) { showError(signOutError); }
  });
}

function selectedKey(): string { return `family-quiz-profile:${user?.uid ?? ''}`; }
function pendingKey(): string { return `family-quiz-pending:${user?.uid ?? ''}:${profile?.id ?? ''}`; }

function setProfile(next: Profile): void {
  profile = next;
  localStorage.setItem(selectedKey(), next.id);
  window.location.href = path('/');
}

function renderNav(): void {
  if (!user) { nav.innerHTML = ''; return; }
  if (!profile) {
    nav.innerHTML = '<button type="button" class="text-button" id="sign-out">Sign out</button>';
    nav.querySelector('#sign-out')?.addEventListener('click', async () => {
      try { await signOutUser(); } catch (error) { showError(error); }
    });
    return;
  }
  nav.innerHTML = `
    <a href="${path('/')}">Home</a>
    <a href="${path('/quiz/')}">New test</a>
    <a href="${path('/history/')}">History</a>
    <a href="${path('/progress/')}">Progress</a>
    <a href="${path('/profiles/')}">${escapeHtml(profile.name)} ▾</a>
    <button type="button" class="text-button" id="sign-out">Sign out</button>`;
  nav.querySelector('#sign-out')?.addEventListener('click', async () => {
    try { await signOutUser(); } catch (error) { showError(error); }
  });
}

async function loadQuestions(): Promise<void> {
  const response = await fetch(path('/questions.json'));
  if (!response.ok) throw new Error('Could not load the question bank.');
  questions = await response.json() as Question[];
}

async function refreshProgress(): Promise<void> {
  if (!user || !profile) return;
  progress = await listProgress(user.uid, profile.id);
}

function renderSignedOut(): void {
  renderNav();
  app.innerHTML = `<section class="hero"><div class="eyebrow">FAMILY PRACTICE</div>
    <h1>A little practice, often.</h1>
    <p>Pick a pupil, choose a subject, and work through questions at your own pace.</p>
    <button type="button" class="primary" id="sign-in">Sign in with Google</button>
    <p class="fine-print">Anyone with a Google account can sign in. Profiles and results stay private to that account.</p></section>`;
  app.querySelector('#sign-in')?.addEventListener('click', async () => {
    clearMessage();
    try { await signIn(); } catch (error) { showError(error); }
  });
}

async function renderProfiles(): Promise<void> {
  app.innerHTML = `<div class="page-heading"><div><div class="eyebrow">PUPIL PROFILES</div><h1>Who’s practising?</h1>
    <p>Choose a profile so test reports stay separate.</p></div></div>
    <div class="card-grid">${profiles.map((person) => `<article class="card profile-card">
      <div class="avatar">${escapeHtml(person.name.slice(0, 1).toUpperCase())}</div>
      <h2>${escapeHtml(person.name)}</h2>
      <button type="button" class="primary select-profile" data-id="${escapeHtml(person.id)}">Choose profile</button>
      <button type="button" class="text-button rename-profile" data-id="${escapeHtml(person.id)}">Rename</button>
    </article>`).join('')}</div>
    <form id="create-profile" class="card form-card"><h2>Add a pupil</h2>
      <label for="profile-name">Name or nickname</label>
      <div class="inline-form"><input id="profile-name" name="name" maxlength="40" required autocomplete="off" placeholder="e.g. Alex" />
      <button type="submit" class="primary">Add profile</button></div></form>`;
  for (const button of app.querySelectorAll<HTMLButtonElement>('.select-profile')) {
    button.addEventListener('click', () => {
      const selected = profiles.find((person) => person.id === button.dataset.id);
      if (selected) setProfile(selected);
    });
  }
  for (const button of app.querySelectorAll<HTMLButtonElement>('.rename-profile')) {
    button.addEventListener('click', async () => {
      const person = profiles.find((item) => item.id === button.dataset.id);
      if (!person || !user) return;
      const nextName = window.prompt('New profile name', person.name)?.trim();
      if (!nextName || nextName === person.name) return;
      try {
        await renameProfile(user.uid, person.id, nextName.slice(0, 40));
        person.name = nextName.slice(0, 40);
        renderNav();
        await renderProfiles();
      } catch (error) { showError(error); }
    });
  }
  app.querySelector<HTMLFormElement>('#create-profile')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const input = app.querySelector<HTMLInputElement>('#profile-name')!;
    const name = input.value.trim();
    if (!name || !user) return;
    try {
      const created = await createProfile(user.uid, name);
      profiles.push(created);
      setProfile(created);
    } catch (error) { showError(error); }
  });
}

function pendingBanner(): string {
  return pending ? `<div class="notice warning"><strong>A submitted test is waiting to save.</strong>
    <button type="button" id="retry-save">Retry saving</button></div>` : '';
}

async function retryPending(): Promise<void> {
  if (!pending || !user) return;
  clearMessage();
  try {
    await saveAttempt(user.uid, pending);
    const id = pending.attempt.id;
    pending = undefined;
    sessionStorage.removeItem(pendingKey());
    window.location.href = path('/results/', { id });
  } catch (error) { showError(error); }
}

function wireRetry(): void {
  app.querySelector('#retry-save')?.addEventListener('click', retryPending);
}

async function renderHome(): Promise<void> {
  if (!profile || !user) return renderProfiles();
  const attempts = await listAttempts(user.uid, profile.id);
  const latest = attempts[0];
  const missed = progress.filter((item) => item.latestCorrect === false).length;
  const subjects = [...new Set(questions.map((question) => question.subject))];
  app.innerHTML = `${pendingBanner()}<section class="hero compact"><div class="eyebrow">WELCOME BACK, ${escapeHtml(profile.name.toUpperCase())}</div>
    <h1>Ready for a few questions?</h1><p>Choose a subject and practise one topic or a mix.</p>
    <a class="button primary" href="${path('/quiz/')}">Start a test <span aria-hidden="true">→</span></a></section>
    <div class="stat-grid"><div class="stat"><strong>${attempts.length}</strong><span>completed tests</span></div>
    <div class="stat"><strong>${missed}</strong><span>questions to revisit</span></div>
    <div class="stat"><strong>${subjects.length}</strong><span>subjects available</span></div></div>
    <div class="section-heading"><h2>Subjects</h2><a href="${path('/quiz/')}">Set up a test →</a></div>
    <div class="subject-grid">${subjects.map((subject) => `<a class="subject-card" href="${path('/quiz/', { subject })}">
      <span class="subject-mark">${escapeHtml(subject.slice(0, 1))}</span><strong>${escapeHtml(subject)}</strong>
      <small>${questions.filter((question) => question.subject === subject).length} questions</small></a>`).join('')}</div>
    ${latest ? `<section class="latest card"><div><div class="eyebrow">LATEST RESULT</div><h2>${escapeHtml(latest.subject)}</h2>
      <p>${latest.correct} of ${latest.total} correct · ${formatDuration(latest.durationMs)}</p></div>
      <a class="button secondary" href="${path('/results/', { id: latest.id })}">Review test</a></section>` : ''}`;
  wireRetry();
}

function renderQuizSetup(defaultSubject?: string): void {
  const subjects = [...new Set(questions.map((question) => question.subject))];
  if (!subjects.length) {
    app.innerHTML = '<div class="empty">No questions are available yet. Add Markdown files to the question bank.</div>';
    return;
  }
  const subject = subjects.includes(defaultSubject ?? '') ? defaultSubject! : subjects[0];
  app.innerHTML = `${pendingBanner()}<div class="page-heading"><div><div class="eyebrow">NEW TEST</div><h1>Make it your own.</h1>
    <p>Pick a subject, topics, and the number of questions.</p></div></div>
    <form id="test-setup" class="card setup-card">
      <label for="subject">Subject</label><select id="subject" name="subject">${subjects.map((item) =>
        `<option value="${escapeHtml(item)}" ${item === subject ? 'selected' : ''}>${escapeHtml(item)}</option>`).join('')}</select>
      <fieldset><legend>Topics</legend><div id="topic-options" class="chip-list"></div>
        <p class="hint">Select none to include every topic in this subject.</p></fieldset>
      <label for="source">Questions</label><select id="source" name="source">
        <option value="all">All available questions</option>
        <option value="still-missed">Still missed</option>
        <option value="ever-missed">Ever missed</option></select>
      <label for="count">Number of questions</label><select id="count" name="count">
        <option value="15">15</option><option value="30">30</option><option value="all">All available</option></select>
      <div id="pool-count" class="pool-count" aria-live="polite"></div>
      <button type="submit" class="primary">Start test</button>
    </form>`;
  wireRetry();
  const form = app.querySelector<HTMLFormElement>('#test-setup')!;
  const topicOptions = app.querySelector<HTMLElement>('#topic-options')!;
  const updateTopics = () => {
    const selectedSubject = (form.elements.namedItem('subject') as HTMLSelectElement).value;
    const topics = [...new Set(questions.filter((question) => question.subject === selectedSubject).flatMap((question) => question.topics))].sort();
    topicOptions.innerHTML = topics.map((topic) => `<label class="chip"><input type="checkbox" name="topic" value="${escapeHtml(topic)}" />${escapeHtml(topic)}</label>`).join('');
    updateCount();
  };
  const selection = () => ({
    subject: (form.elements.namedItem('subject') as HTMLSelectElement).value,
    topics: [...form.querySelectorAll<HTMLInputElement>('input[name="topic"]:checked')].map((input) => input.value),
    source: (form.elements.namedItem('source') as HTMLSelectElement).value as Attempt['source'],
    count: (form.elements.namedItem('count') as HTMLSelectElement).value,
  });
  const updateCount = () => {
    const selected = selection();
    const available = eligibleQuestions(questions, progress, selected.subject, selected.topics, selected.source).length;
    const requested = selected.count === 'all' ? available : Math.min(Number(selected.count), available);
    app.querySelector('#pool-count')!.textContent = `${available} available · This test will have ${requested} question${requested === 1 ? '' : 's'}.`;
    (form.querySelector('button[type="submit"]') as HTMLButtonElement).disabled = available === 0 || !!pending;
  };
  form.querySelector('#subject')?.addEventListener('change', updateTopics);
  form.querySelector('#source')?.addEventListener('change', updateCount);
  form.querySelector('#count')?.addEventListener('change', updateCount);
  topicOptions.addEventListener('change', updateCount);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const selected = selection();
    const pool = eligibleQuestions(questions, progress, selected.subject, selected.topics, selected.source);
    if (!pool.length) return;
    active = {
      questions: selectQuestions(pool, selected.count === 'all' ? 'all' : Number(selected.count)),
      subject: selected.subject, topics: selected.topics, source: selected.source,
      startedAt: Date.now(), answers: {}, index: 0,
    };
    renderActiveQuestion();
  });
  updateTopics();
}

function renderActiveQuestion(): void {
  if (!active) return;
  const question = active.questions[active.index];
  const multi = question.correctChoiceIds.length > 1;
  const selected = new Set(active.answers[question.id] ?? []);
  app.innerHTML = `<div class="test-top"><div><div class="eyebrow">${escapeHtml(active.subject.toUpperCase())}</div>
    <h1>Question ${active.index + 1} <span class="muted">of ${active.questions.length}</span></h1></div>
    <span class="test-progress">${Math.round((active.index + 1) / active.questions.length * 100)}% through</span></div>
    <div class="progress-track"><span style="width:${(active.index + 1) / active.questions.length * 100}%"></span></div>
    <section class="card question-card"><div class="question-meta">${question.topics.map(escapeHtml).join(' · ')}</div>
      <div class="question-stem prose">${markdown(question.stem)}</div>
      <p class="hint">${multi ? 'Select all answers that apply.' : 'Choose one answer.'}</p>
      <div class="choice-list">${question.choices.map((choice) => `<label class="choice ${selected.has(choice.id) ? 'chosen' : ''}">
        <input type="${multi ? 'checkbox' : 'radio'}" name="answer" value="${escapeHtml(choice.id)}" ${selected.has(choice.id) ? 'checked' : ''} />
        <span class="choice-key">${escapeHtml(choice.id)}</span><span>${escapeHtml(choice.text)}</span></label>`).join('')}</div></section>
    <div class="test-actions"><button type="button" class="secondary" id="previous" ${active.index === 0 ? 'disabled' : ''}>← Previous</button>
      <span>${Object.keys(active.answers).filter((id) => active!.answers[id].length).length} answered</span>
      <button type="button" class="primary" id="next">${active.index === active.questions.length - 1 ? 'Submit test' : 'Next →'}</button></div>`;
  for (const input of app.querySelectorAll<HTMLInputElement>('input[name="answer"]')) {
    input.addEventListener('change', () => {
      active!.answers[question.id] = [...app.querySelectorAll<HTMLInputElement>('input[name="answer"]:checked')].map((item) => item.value);
      for (const label of app.querySelectorAll<HTMLElement>('.choice')) label.classList.toggle('chosen', !!label.querySelector('input:checked'));
    });
  }
  app.querySelector('#previous')?.addEventListener('click', () => { active!.index--; renderActiveQuestion(); });
  app.querySelector('#next')?.addEventListener('click', async () => {
    if (!active) return;
    if (active.index < active.questions.length - 1) { active.index++; renderActiveQuestion(); return; }
    const unanswered = active.questions.filter((item) => !active!.answers[item.id]?.length).length;
    if (unanswered && !window.confirm(`${unanswered} question${unanswered === 1 ? ' is' : 's are'} unanswered. Submit anyway?`)) return;
    await submitActiveTest();
  });
}

async function submitActiveTest(): Promise<void> {
  if (!active || !user || !profile) return;
  const items = gradeItems(active.questions, active.answers);
  const completedAt = Date.now();
  const attempt: Attempt = {
    id: crypto.randomUUID(), profileId: profile.id, subject: active.subject, topics: active.topics,
    source: active.source, startedAt: active.startedAt, completedAt,
    durationMs: completedAt - active.startedAt, total: items.length,
    correct: items.filter((item) => item.correct).length, status: 'saving',
  };
  pending = { attempt, items };
  try { sessionStorage.setItem(pendingKey(), JSON.stringify(pending)); } catch { /* In-memory retry remains available. */ }
  app.innerHTML = '<div class="card saving"><div class="spinner"></div><h1>Saving your result…</h1><p>Please keep this tab open.</p></div>';
  await retryPending();
  if (pending) {
    app.innerHTML = `${pendingBanner()}<div class="card empty"><h1>We could not save yet.</h1><p>Your submitted answers are still here. Check your connection and retry.</p></div>`;
    wireRetry();
  }
}

async function renderResults(): Promise<void> {
  if (!user || !profile) return;
  const id = new URLSearchParams(location.search).get('id');
  if (!id) { app.innerHTML = '<div class="empty">Choose a test from History to review it.</div>'; return; }
  const attempt = await getAttempt(user.uid, profile.id, id);
  if (!attempt) { app.innerHTML = '<div class="empty">This completed test was not found in this pupil’s history.</div>'; return; }
  const items = await getAttemptItems(user.uid, profile.id, id);
  await refreshProgress();
  const view = new URLSearchParams(location.search).get('view') === 'wrong' ? 'wrong' : 'all';
  const shown = view === 'wrong' ? items.filter((item) => !item.correct) : items;
  app.innerHTML = `<div class="page-heading"><div><div class="eyebrow">TEST RESULT</div><h1>${escapeHtml(attempt.subject)}</h1>
    <p>${new Date(attempt.completedAt).toLocaleDateString()} · ${formatDuration(attempt.durationMs)}</p></div>
    <a class="button secondary" href="${path('/history/')}">All history</a></div>
    <div class="result-hero"><strong>${attempt.correct}<span> / ${attempt.total}</span></strong><div><h2>${Math.round(attempt.correct / attempt.total * 100)}% correct</h2>
    <p>Review what went well and what to practise again.</p></div></div>
    <div class="tabs"><a class="${view === 'all' ? 'active' : ''}" href="${path('/results/', { id })}">All questions (${items.length})</a>
      <a class="${view === 'wrong' ? 'active' : ''}" href="${path('/results/', { id, view: 'wrong' })}">Wrong or unanswered (${items.length - attempt.correct})</a></div>
    <div class="review-list">${shown.length ? shown.map((item) => reviewCard(item.question, item.order + 1, item.selectedChoiceIds, item.correct)).join('') :
      '<div class="empty">No incorrect answers in this test. Nicely done!</div>'}</div>`;
  wireBookmarks();
}

function reviewCard(question: Question, number: number, selectedIds: string[], correct: boolean): string {
  const state = progress.find((item) => item.questionId === question.id);
  return `<article class="card review-card"><div class="review-header"><span class="result-pill ${correct ? 'right' : 'wrong'}">${correct ? 'Correct' : 'Review'}</span>
    <span>Question ${number} · ${escapeHtml(question.subject)} · ${question.topics.map(escapeHtml).join(', ')}</span>
    <button type="button" class="bookmark" data-id="${escapeHtml(question.id)}" aria-label="${state?.bookmarked ? 'Remove bookmark' : 'Bookmark question'}">${state?.bookmarked ? '★ Saved' : '☆ Bookmark'}</button></div>
    <div class="prose">${markdown(question.stem)}</div>
    <ul class="answer-list">${question.choices.map((choice) => `<li class="${question.correctChoiceIds.includes(choice.id) ? 'answer-correct' : selectedIds.includes(choice.id) ? 'answer-wrong' : ''}">
      <strong>${escapeHtml(choice.id)}.</strong> ${escapeHtml(choice.text)}
      ${selectedIds.includes(choice.id) ? '<small>Your choice</small>' : ''}
      ${question.correctChoiceIds.includes(choice.id) ? '<small>Correct answer</small>' : ''}</li>`).join('')}</ul>
    <div class="explanation"><strong>Why?</strong><div class="prose">${markdown(question.explanation)}</div></div></article>`;
}

function wireBookmarks(): void {
  for (const button of app.querySelectorAll<HTMLButtonElement>('.bookmark')) {
    button.addEventListener('click', async () => {
      if (!user || !profile) return;
      const questionId = button.dataset.id!;
      const question = questions.find((item) => item.id === questionId);
      const existing = progress.find((item) => item.questionId === questionId);
      if (!question && !existing) return;
      const item: Progress = existing ?? {
        questionId, subject: question!.subject, topics: question!.topics,
      };
      try {
        await toggleBookmark(user.uid, profile.id, item, !item.bookmarked);
        item.bookmarked = !item.bookmarked;
        if (!existing) progress.push(item);
        button.textContent = item.bookmarked ? '★ Saved' : '☆ Bookmark';
        button.setAttribute('aria-label', item.bookmarked ? 'Remove bookmark' : 'Bookmark question');
      } catch (error) { showError(error); }
    });
  }
}

async function renderHistory(): Promise<void> {
  if (!user || !profile) return;
  const attempts = await listAttempts(user.uid, profile.id);
  app.innerHTML = `<div class="page-heading"><div><div class="eyebrow">HISTORY</div><h1>${escapeHtml(profile.name)}’s tests</h1>
    <p>Every completed test, newest first.</p></div><a class="button primary" href="${path('/quiz/')}">New test</a></div>
    ${attempts.length ? `<div class="history-list">${attempts.map((attempt) => `<a class="history-row card" href="${path('/results/', { id: attempt.id })}">
      <div><strong>${escapeHtml(attempt.subject)}</strong><small>${new Date(attempt.completedAt).toLocaleString()} · ${attempt.total} questions</small></div>
      <span>${attempt.correct}/${attempt.total}</span><small>${formatDuration(attempt.durationMs)}</small><b aria-hidden="true">→</b></a>`).join('')}</div>` :
      `<div class="card empty"><h2>No completed tests yet</h2><p>Start a test to see results here.</p></div>`}`;
}

async function renderProgress(): Promise<void> {
  if (!user || !profile) return;
  const attempts = await listAttempts(user.uid, profile.id);
  const subjects = [...new Set(questions.map((question) => question.subject))];
  const topicStats = new Map<string, { wrong: number; seen: number }>();
  for (const item of progress) for (const topic of item.topics) {
    const key = `${item.subject} · ${topic}`;
    const stat = topicStats.get(key) ?? { wrong: 0, seen: 0 };
    if (item.latestCorrect !== undefined) {
      stat.seen++;
      if (!item.latestCorrect) stat.wrong++;
    }
    topicStats.set(key, stat);
  }
  const weakTopics = [...topicStats].filter(([, stat]) => stat.wrong > 0)
    .sort((a, b) => b[1].wrong - a[1].wrong);
  const bookmarked = progress.filter((item) => item.bookmarked);
  app.innerHTML = `<div class="page-heading"><div><div class="eyebrow">PROGRESS</div><h1>${escapeHtml(profile.name)}’s report</h1>
    <p>A simple view of completed tests and questions to revisit.</p></div></div>
    <div class="report-grid">${subjects.map((subject) => {
      const subjectAttempts = attempts.filter((attempt) => attempt.subject === subject);
      const total = subjectAttempts.reduce((sum, attempt) => sum + attempt.total, 0);
      const correct = subjectAttempts.reduce((sum, attempt) => sum + attempt.correct, 0);
      return `<article class="card report-card"><h2>${escapeHtml(subject)}</h2><strong>${total ? Math.round(correct / total * 100) : '—'}${total ? '%' : ''}</strong>
        <p>${subjectAttempts.length} completed tests · ${total} answers</p></article>`;
    }).join('')}</div>
    <section class="card report-section"><h2>Topics to revisit</h2>
      ${weakTopics.length ? `<ul class="plain-list">${weakTopics.map(([topic, stat]) => `<li><span>${escapeHtml(topic)}</span><strong>${stat.wrong} still missed</strong></li>`).join('')}</ul>` :
        '<p>No currently missed topics. Take a test to build this report.</p>'}</section>
    <section class="card report-section"><h2>Bookmarked questions</h2>
      ${bookmarked.length ? `<ul class="plain-list">${bookmarked.map((item) => {
        const question = questions.find((candidate) => candidate.id === item.questionId);
        return `<li><details><summary>${escapeHtml(item.subject)} · ${escapeHtml(item.topics.join(', '))}<small>${escapeHtml(question?.stem.slice(0, 100) ?? item.questionId)}</small></summary>
          ${question ? `<div class="prose">${markdown(question.stem)}</div><p><strong>Answer:</strong> ${question.choices.filter((choice) => question.correctChoiceIds.includes(choice.id)).map((choice) => escapeHtml(choice.text)).join(', ')}</p>
          <div class="prose">${markdown(question.explanation)}</div>` : '<p>This question is no longer in the current bank. Its past tests still hold a snapshot.</p>'}</details>
          <button class="bookmark" type="button" data-id="${escapeHtml(item.questionId)}">★ Saved</button></li>`;
      }).join('')}</ul>` : '<p>Bookmark questions from a test review to find them here.</p>'}</section>`;
  wireBookmarks();
}

async function renderPage(): Promise<void> {
  clearMessage();
  renderNav();
  if (!profile || route() === '/profiles') return renderProfiles();
  if (route() === '/quiz') return renderQuizSetup(new URLSearchParams(location.search).get('subject') ?? undefined);
  if (route() === '/history') return renderHistory();
  if (route() === '/results') return renderResults();
  if (route() === '/progress') return renderProgress();
  return renderHome();
}

async function start(): Promise<void> {
  if (!isConfigured) {
    app.innerHTML = `<div class="card empty"><h1>Firebase setup needed</h1>
      <p>Add the public Firebase settings described in README.md, then rebuild the site.</p></div>`;
    return;
  }
  await loadQuestions();
  observeUser(async (nextUser) => {
    user = nextUser;
    profile = undefined;
    active = undefined;
    if (!user) { renderSignedOut(); return; }
    try {
      try { profiles = await listProfiles(user.uid); }
      catch (error) { renderFirestoreAccessError('pupil profiles', error); return; }
      profile = profiles.find((item) => item.id === localStorage.getItem(selectedKey()));
      pending = undefined;
      try {
        const saved = sessionStorage.getItem(pendingKey());
        if (saved) pending = JSON.parse(saved) as PendingAttempt;
      } catch { /* Ignore damaged session data. */ }
      try { await refreshProgress(); }
      catch (error) { renderFirestoreAccessError('pupil progress', error); return; }
      await renderPage();
    } catch (error) { showError(error); app.innerHTML = '<div class="empty">Could not load your family data. Please try refreshing the page.</div>'; }
  });
}

start().catch(showError);
