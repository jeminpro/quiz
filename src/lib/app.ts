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
const mobileNav = document.querySelector<HTMLElement>('#mobile-nav')!;
const headerProfile = document.querySelector<HTMLElement>('#header-profile')!;
const headerSignOut = document.querySelector<HTMLElement>('#header-sign-out')!;
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
let reviewAvailable = false;
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
  mobileNav.innerHTML = '';
  headerProfile.innerHTML = '';
  headerSignOut.innerHTML = '';
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
  nav.innerHTML = '';
  mobileNav.innerHTML = '';
  headerProfile.innerHTML = '';
  headerSignOut.innerHTML = '';
  if (!user) return;
  headerSignOut.innerHTML = '<button type="button" class="text-button sign-out" aria-label="Sign out of Brightside Quiz">Sign out</button>';
  headerSignOut.querySelector('button')?.addEventListener('click', async () => {
    try { await signOutUser(); } catch (error) { showError(error); }
  });
  if (!profile) return;
  const links = [
    { href: path('/'), label: 'Home', page: '/' },
    { href: path('/quiz/'), label: 'Practice', page: '/quiz' },
    { href: path('/history/'), label: 'History', page: '/history' },
    { href: path('/progress/'), label: 'Progress', page: '/progress' },
  ];
  const current = route() === '/results' ? '/history' : route();
  const items = links.map(({ href, label, page }) =>
    `<a href="${href}" ${current === page ? 'aria-current="page"' : ''}>${label}</a>`).join('');
  nav.innerHTML = items;
  mobileNav.innerHTML = items;
  headerProfile.innerHTML = `<a class="profile-switch" href="${path('/profiles/')}" aria-label="Switch profile, current profile ${escapeHtml(profile.name)}">
    <span class="profile-mini" aria-hidden="true">${escapeHtml(profile.name.slice(0, 1).toUpperCase())}</span>
    <span class="profile-name">${escapeHtml(profile.name)}</span></a>`;
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
  app.innerHTML = `<section class="hero signed-out-hero"><div class="eyebrow">THOUGHTFUL PRACTICE, ONE QUESTION AT A TIME</div>
    <h1>A clearer way to keep practising.</h1>
    <p>Choose a pupil, pick a subject, and work through questions at your own pace.</p>
    <button type="button" class="primary" id="sign-in">Continue with Google <span aria-hidden="true">→</span></button>
    <p class="fine-print">Profiles and results stay private to your Google account.</p></section>`;
  app.querySelector('#sign-in')?.addEventListener('click', async () => {
    clearMessage();
    try { await signIn(); } catch (error) { showError(error); }
  });
}

async function renderProfiles(): Promise<void> {
  app.innerHTML = `<div class="page-heading"><div><div class="eyebrow">PUPIL PROFILES</div><h1>Who’s practising?</h1>
    <p>Choose a profile so each pupil’s progress stays separate.</p></div></div>
    <div class="card-grid">${profiles.map((person) => `<article class="card profile-card">
      <div class="avatar">${escapeHtml(person.name.slice(0, 1).toUpperCase())}</div>
      <h2>${escapeHtml(person.name)}</h2><div class="profile-actions">
      <button type="button" class="primary select-profile" data-id="${escapeHtml(person.id)}">Continue as ${escapeHtml(person.name)}</button>
      <button type="button" class="text-button rename-profile" aria-expanded="false">Rename</button></div>
      <form class="rename-form" data-id="${escapeHtml(person.id)}" hidden>
        <label>New name<input name="name" maxlength="40" required autocomplete="off" value="${escapeHtml(person.name)}" /></label>
        <div class="form-actions"><button type="submit" class="primary">Save name</button><button type="button" class="secondary cancel-rename">Cancel</button></div>
      </form>
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
    const form = button.closest('.profile-card')!.querySelector<HTMLFormElement>('.rename-form')!;
    button.addEventListener('click', () => {
      form.hidden = !form.hidden;
      button.setAttribute('aria-expanded', String(!form.hidden));
      if (!form.hidden) form.querySelector('input')?.focus();
    });
    form.querySelector('.cancel-rename')?.addEventListener('click', () => {
      form.hidden = true;
      button.setAttribute('aria-expanded', 'false');
      button.focus();
    });
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const person = profiles.find((item) => item.id === form.dataset.id);
      if (!person || !user) return;
      const nextName = (form.elements.namedItem('name') as HTMLInputElement).value.trim().slice(0, 40);
      if (!nextName || nextName === person.name) { form.hidden = true; return; }
      try {
        await renameProfile(user.uid, person.id, nextName);
        person.name = nextName;
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
  return pending ? `<div class="notice warning"><strong>A completed practice session is waiting to save.</strong>
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
    <h1>Make progress at your pace.</h1><p>Choose a subject, focus on a topic, or revisit questions you missed.</p>
    <a class="button primary" href="${path('/quiz/')}">Start practice <span aria-hidden="true">→</span></a></section>
    <div class="stat-grid"><div class="stat"><strong>${attempts.length}</strong><span>completed practices</span></div>
    <div class="stat"><strong>${missed}</strong><span>questions to revisit</span></div>
    <div class="stat"><strong>${subjects.length}</strong><span>subjects available</span></div></div>
    ${latest ? `<section class="latest card"><div><div class="eyebrow">PICK UP WHERE YOU LEFT OFF</div><h2>Latest: ${escapeHtml(latest.subject)}</h2>
      <p>${latest.correct} of ${latest.total} correct · ${formatDuration(latest.durationMs)}</p></div>
      <a class="button secondary" href="${path('/results/', { id: latest.id })}">Review answers <span aria-hidden="true">→</span></a></section>` : ''}
    <div class="section-heading"><h2>Choose a subject</h2><a href="${path('/quiz/')}">All practice →</a></div>
    <div class="subject-grid">${subjects.map((subject) => `<a class="subject-card" href="${path('/quiz/', { subject })}">
      <span class="subject-mark">${escapeHtml(subject.slice(0, 1))}</span><strong>${escapeHtml(subject)}</strong>
      <small>${questions.filter((question) => question.subject === subject).length} questions <span aria-hidden="true">→</span></small></a>`).join('')}</div>`;
  wireRetry();
}

function renderQuizSetup(defaultSubject?: string, defaultSource?: string, defaultTopic?: string): void {
  const subjects = [...new Set(questions.map((question) => question.subject))];
  if (!subjects.length) {
    app.innerHTML = '<div class="empty">No questions are available yet. Add Markdown files to the question bank.</div>';
    return;
  }
  const subject = subjects.includes(defaultSubject ?? '') ? defaultSubject! : subjects[0];
  const source = ['all', 'still-missed', 'ever-missed'].includes(defaultSource ?? '') ? defaultSource : 'all';
  app.innerHTML = `${pendingBanner()}<div class="page-heading"><div><div class="eyebrow">NEW PRACTICE</div><h1>Set up your practice</h1>
    <p>Choose what to work on. You can move between questions before submitting.</p></div></div>
    <form id="test-setup" class="card setup-card">
      <div class="setup-section"><div class="setup-step">01</div><div class="setup-fields">
        <h2>Choose a subject</h2><label for="subject">Subject</label><select id="subject" name="subject">${subjects.map((item) =>
          `<option value="${escapeHtml(item)}" ${item === subject ? 'selected' : ''}>${escapeHtml(item)}</option>`).join('')}</select>
        <fieldset><legend>Topics</legend><div id="topic-options" class="chip-list"></div>
          <p class="hint">Leave all unselected to include every topic.</p></fieldset>
      </div></div>
      <div class="setup-section"><div class="setup-step">02</div><div class="setup-fields">
        <h2>Choose your questions</h2><div class="setup-row"><div><label for="source">Question set</label><select id="source" name="source">
          <option value="all" ${source === 'all' ? 'selected' : ''}>All available questions</option>
          <option value="still-missed" ${source === 'still-missed' ? 'selected' : ''}>Questions still missed</option>
          <option value="ever-missed" ${source === 'ever-missed' ? 'selected' : ''}>Questions missed before</option></select></div>
        <div><label for="count">Number of questions</label><select id="count" name="count">
          <option value="15">15</option><option value="30">30</option><option value="all">All available</option></select></div></div>
      </div></div>
      <div class="setup-footer"><div id="pool-count" class="pool-count" aria-live="polite"></div>
        <button type="submit" class="primary">Start practice <span aria-hidden="true">→</span></button></div>
    </form>`;
  wireRetry();
  const form = app.querySelector<HTMLFormElement>('#test-setup')!;
  const topicOptions = app.querySelector<HTMLElement>('#topic-options')!;
  let presetTopic = defaultTopic;
  const updateTopics = () => {
    const selectedSubject = (form.elements.namedItem('subject') as HTMLSelectElement).value;
    const topics = [...new Set(questions.filter((question) => question.subject === selectedSubject).flatMap((question) => question.topics))].sort();
    topicOptions.innerHTML = topics.map((topic) => `<label class="chip"><input type="checkbox" name="topic" value="${escapeHtml(topic)}" ${topic === presetTopic ? 'checked' : ''} />${escapeHtml(topic)}</label>`).join('');
    presetTopic = undefined;
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
    app.querySelector('#pool-count')!.textContent = available
      ? `${requested} question${requested === 1 ? '' : 's'} in this practice · ${available} available`
      : 'No questions match these choices. Try another topic or question set.';
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
    reviewAvailable = false;
    renderActiveQuestion();
  });
  updateTopics();
}

function renderActiveQuestion(): void {
  if (!active) return;
  const question = active.questions[active.index];
  const multi = question.correctChoiceIds.length > 1;
  const selected = new Set(active.answers[question.id] ?? []);
  const answered = active.questions.filter((item) => active!.answers[item.id]?.length).length;
  const percent = Math.round((active.index + 1) / active.questions.length * 100);
  app.innerHTML = `<div class="test-top"><div><div class="eyebrow">${escapeHtml(active.subject.toUpperCase())}</div>
    <h1>Question ${active.index + 1} <span class="muted">of ${active.questions.length}</span></h1></div>
    <span class="test-progress">${answered} answered</span></div>
    <div class="progress-track" role="progressbar" aria-label="Question progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}"><span style="width:${percent}%"></span></div>
    <section class="card question-card"><div class="question-meta">${question.topics.map(escapeHtml).join(' · ')}</div>
      <div class="question-stem prose">${markdown(question.stem)}</div>
      <fieldset class="answer-fieldset"><legend>${multi ? 'Select all answers that apply' : 'Choose one answer'}</legend>
      <div class="choice-list">${question.choices.map((choice) => `<label class="choice ${selected.has(choice.id) ? 'chosen' : ''}">
        <input type="${multi ? 'checkbox' : 'radio'}" name="answer" value="${escapeHtml(choice.id)}" ${selected.has(choice.id) ? 'checked' : ''} />
        <span class="choice-key" aria-hidden="true">${escapeHtml(choice.id)}</span><span>${escapeHtml(choice.text)}</span></label>`).join('')}</div></fieldset></section>
    <div class="test-actions"><button type="button" class="secondary" id="previous" ${active.index === 0 ? 'disabled' : ''}>← Previous</button>
      ${reviewAvailable ? '<button type="button" class="text-button" id="return-to-review">Back to review</button>' : '<span>You can change answers before submitting.</span>'}
      <button type="button" class="primary" id="next">${active.index === active.questions.length - 1 ? 'Review answers' : 'Next question →'}</button></div>`;
  focusQuizView();
  for (const input of app.querySelectorAll<HTMLInputElement>('input[name="answer"]')) {
    input.addEventListener('change', () => {
      active!.answers[question.id] = [...app.querySelectorAll<HTMLInputElement>('input[name="answer"]:checked')].map((item) => item.value);
      for (const label of app.querySelectorAll<HTMLElement>('.choice')) label.classList.toggle('chosen', !!label.querySelector('input:checked'));
    });
  }
  app.querySelector('#previous')?.addEventListener('click', () => { active!.index--; renderActiveQuestion(); });
  app.querySelector('#return-to-review')?.addEventListener('click', renderQuizReview);
  app.querySelector('#next')?.addEventListener('click', async () => {
    if (!active) return;
    if (active.index < active.questions.length - 1) { active.index++; renderActiveQuestion(); return; }
    renderQuizReview();
  });
}

function focusQuizView(): void {
  window.scrollTo({ top: 0, behavior: 'auto' });
  const heading = app.querySelector<HTMLElement>('h1');
  if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
}

function renderQuizReview(): void {
  if (!active) return;
  reviewAvailable = true;
  const answered = active.questions.filter((item) => active!.answers[item.id]?.length).length;
  const unanswered = active.questions.length - answered;
  app.innerHTML = `<div class="page-heading"><div><div class="eyebrow">READY TO FINISH</div>
    <h1>Review your answers</h1><p>${answered} of ${active.questions.length} answered${unanswered ? ` · ${unanswered} unanswered` : ''}.</p></div></div>
    <section class="card review-summary"><h2>Questions</h2><p>Select a question to change its answer.</p>
      <div class="question-jump-list">${active.questions.map((item, index) => {
        const selected = active!.answers[item.id] ?? [];
        return `<button type="button" class="question-jump ${selected.length ? 'answered' : 'unanswered'}" data-index="${index}"
          aria-label="Question ${index + 1}, ${selected.length ? 'answered' : 'unanswered'}">
          <span>${index + 1}</span><small>${selected.length ? 'Answered' : 'Unanswered'}</small></button>`;
      }).join('')}</div></section>
    ${unanswered ? `<div class="notice warning" role="status">${unanswered} question${unanswered === 1 ? ' is' : 's are'} unanswered. You can still submit.</div>` : ''}
    <div class="test-actions"><button type="button" class="secondary" id="back-to-question">← Back to questions</button>
      <button type="button" class="primary" id="submit-test">Submit practice</button></div>`;
  focusQuizView();
  for (const button of app.querySelectorAll<HTMLButtonElement>('.question-jump')) {
    button.addEventListener('click', () => {
      active!.index = Number(button.dataset.index);
      renderActiveQuestion();
    });
  }
  app.querySelector('#back-to-question')?.addEventListener('click', renderActiveQuestion);
  app.querySelector<HTMLButtonElement>('#submit-test')?.addEventListener('click', (event) => {
    (event.currentTarget as HTMLButtonElement).disabled = true;
    void submitActiveTest();
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
  if (!id) { app.innerHTML = '<div class="empty">Choose a practice from History to review it.</div>'; return; }
  const attempt = await getAttempt(user.uid, profile.id, id);
  if (!attempt) { app.innerHTML = '<div class="empty">This completed practice was not found in this pupil’s history.</div>'; return; }
  const items = await getAttemptItems(user.uid, profile.id, id);
  await refreshProgress();
  const hasMissed = progress.some((item) => item.subject === attempt.subject && item.latestCorrect === false);
  const view = new URLSearchParams(location.search).get('view') === 'wrong' ? 'wrong' : 'all';
  const shown = view === 'wrong' ? items.filter((item) => !item.correct) : items;
  app.innerHTML = `<div class="page-heading"><div><div class="eyebrow">PRACTICE RESULT</div><h1>${escapeHtml(attempt.subject)}</h1>
    <p>${new Date(attempt.completedAt).toLocaleDateString()} · ${formatDuration(attempt.durationMs)}</p></div>
    <a class="button secondary" href="${path('/history/')}">All history</a></div>
    <div class="result-hero"><div class="score-ring" style="--score:${Math.round(attempt.correct / attempt.total * 100)}%" aria-hidden="true"><span>${Math.round(attempt.correct / attempt.total * 100)}%</span></div>
      <div class="result-copy"><div class="eyebrow">PRACTICE COMPLETE</div><h2>${attempt.correct} of ${attempt.total} correct</h2>
      <p>Review your answers, then choose what to practise next.</p>
      <div class="result-actions">${hasMissed ? `<a class="button primary" href="${path('/quiz/', { subject: attempt.subject, source: 'still-missed' })}">Practice missed questions</a>` : ''}
        <a class="button ${hasMissed ? 'secondary' : 'primary'}" href="${path('/quiz/', { subject: attempt.subject })}">New practice</a></div></div></div>
    <nav class="tabs" aria-label="Result review filters"><a class="${view === 'all' ? 'active' : ''}" ${view === 'all' ? 'aria-current="page"' : ''} href="${path('/results/', { id })}">All questions (${items.length})</a>
      <a class="${view === 'wrong' ? 'active' : ''}" ${view === 'wrong' ? 'aria-current="page"' : ''} href="${path('/results/', { id, view: 'wrong' })}">Wrong or unanswered (${items.length - attempt.correct})</a></nav>
    <div class="review-list">${shown.length ? shown.map((item) => reviewCard(item.question, item.order + 1, item.selectedChoiceIds, item.correct)).join('') :
      '<div class="empty">No incorrect answers in this practice. Nicely done!</div>'}</div>`;
  wireBookmarks();
}

function reviewCard(question: Question, number: number, selectedIds: string[], correct: boolean): string {
  const state = progress.find((item) => item.questionId === question.id);
  return `<article class="card review-card"><div class="review-header"><span class="result-pill ${correct ? 'right' : 'wrong'}">${correct ? 'Correct' : selectedIds.length ? 'Incorrect' : 'Unanswered'}</span>
    <span>Question ${number} · ${escapeHtml(question.subject)} · ${question.topics.map(escapeHtml).join(', ')}</span>
    <button type="button" class="bookmark" data-id="${escapeHtml(question.id)}" aria-label="${state?.bookmarked ? 'Remove bookmark' : 'Bookmark question'}">${state?.bookmarked ? '★ Saved' : '☆ Bookmark'}</button></div>
    <div class="review-stem prose">${markdown(question.stem)}</div>
    <ul class="answer-list">${question.choices.map((choice) => `<li class="${question.correctChoiceIds.includes(choice.id) ? 'answer-correct' : selectedIds.includes(choice.id) ? 'answer-wrong' : ''}">
      <strong>${escapeHtml(choice.id)}.</strong> ${escapeHtml(choice.text)}
      ${selectedIds.includes(choice.id) ? '<small>Your choice</small>' : ''}
      ${question.correctChoiceIds.includes(choice.id) ? '<small>Correct answer</small>' : ''}</li>`).join('')}</ul>
    <div class="explanation"><strong>Explanation</strong><div class="prose">${markdown(question.explanation)}</div></div></article>`;
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
  app.innerHTML = `<div class="page-heading"><div><div class="eyebrow">HISTORY</div><h1>${escapeHtml(profile.name)}’s practice history</h1>
    <p>Every completed session, newest first.</p></div><a class="button primary" href="${path('/quiz/')}">New practice</a></div>
    ${attempts.length ? `<div class="history-list">${attempts.map((attempt) => `<a class="history-row card" href="${path('/results/', { id: attempt.id })}">
      <div class="history-details"><strong>${escapeHtml(attempt.subject)}</strong><small>${new Date(attempt.completedAt).toLocaleString()} · ${attempt.total} questions · ${formatDuration(attempt.durationMs)}</small></div>
      <span class="history-score"><strong>${Math.round(attempt.correct / attempt.total * 100)}%</strong><small>${attempt.correct}/${attempt.total} correct</small></span>
      <span class="row-arrow" aria-hidden="true">→</span></a>`).join('')}</div>` :
      `<div class="card empty"><h2>No completed sessions yet</h2><p>Your results will appear here after your first practice.</p>
        <a class="button primary" href="${path('/quiz/')}">Start practice</a></div>`}`;
}

async function renderProgress(): Promise<void> {
  if (!user || !profile) return;
  const attempts = await listAttempts(user.uid, profile.id);
  const subjects = [...new Set(questions.map((question) => question.subject))];
  const topicStats = new Map<string, { subject: string; topic: string; wrong: number; seen: number }>();
  for (const item of progress) for (const topic of item.topics) {
    const key = `${item.subject} · ${topic}`;
    const stat = topicStats.get(key) ?? { subject: item.subject, topic, wrong: 0, seen: 0 };
    if (item.latestCorrect !== undefined) {
      stat.seen++;
      if (!item.latestCorrect) stat.wrong++;
    }
    topicStats.set(key, stat);
  }
  const weakTopics = [...topicStats.values()].filter((stat) => stat.wrong > 0)
    .sort((a, b) => b.wrong - a.wrong);
  const bookmarked = progress.filter((item) => item.bookmarked);
  app.innerHTML = `<div class="page-heading"><div><div class="eyebrow">PROGRESS</div><h1>${escapeHtml(profile.name)}’s report</h1>
    <p>Your answer accuracy and the topics worth revisiting.</p></div></div>
    <div class="report-grid">${subjects.map((subject) => {
      const subjectAttempts = attempts.filter((attempt) => attempt.subject === subject);
      const total = subjectAttempts.reduce((sum, attempt) => sum + attempt.total, 0);
      const correct = subjectAttempts.reduce((sum, attempt) => sum + attempt.correct, 0);
      const accuracy = total ? Math.round(correct / total * 100) : 0;
      return `<article class="card report-card"><h2>${escapeHtml(subject)}</h2>
        <div class="report-value"><strong>${total ? `${accuracy}%` : '—'}</strong><span>answer accuracy</span></div>
        <div class="report-track" role="progressbar" aria-label="${escapeHtml(subject)} answer accuracy" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${accuracy}"><span style="width:${accuracy}%"></span></div>
        <p>${subjectAttempts.length} completed practices · ${total} answers</p>
        <a class="report-link" href="${path('/quiz/', { subject })}">Practise ${escapeHtml(subject)} <span aria-hidden="true">→</span></a></article>`;
    }).join('')}</div>
    <section class="card report-section"><h2>Topics to revisit</h2>
      ${weakTopics.length ? `<ul class="plain-list">${weakTopics.map((stat) => `<li><span><strong>${escapeHtml(stat.topic)}</strong><small>${escapeHtml(stat.subject)} · ${stat.wrong} still missed</small></span>
        <a href="${path('/quiz/', { subject: stat.subject, source: 'still-missed', topic: stat.topic })}">Practise missed <span aria-hidden="true">→</span></a></li>`).join('')}</ul>` :
        '<p>No currently missed topics. Start practising to build this report.</p>'}</section>
    <section class="card report-section"><h2>Bookmarked questions</h2>
      ${bookmarked.length ? `<ul class="plain-list">${bookmarked.map((item) => {
        const question = questions.find((candidate) => candidate.id === item.questionId);
        return `<li><details><summary>${escapeHtml(item.subject)} · ${escapeHtml(item.topics.join(', '))}<small>${escapeHtml(question?.stem.slice(0, 100) ?? item.questionId)}</small></summary>
          ${question ? `<div class="prose">${markdown(question.stem)}</div><p><strong>Answer:</strong> ${question.choices.filter((choice) => question.correctChoiceIds.includes(choice.id)).map((choice) => escapeHtml(choice.text)).join(', ')}</p>
          <div class="prose">${markdown(question.explanation)}</div>` : '<p>This question is no longer in the current bank. Its past results still hold a snapshot.</p>'}</details>
          <button class="bookmark" type="button" data-id="${escapeHtml(item.questionId)}" aria-label="Remove bookmark">★ Saved</button></li>`;
      }).join('')}</ul>` : '<p>Bookmark questions from a result review to find them here.</p>'}</section>`;
  wireBookmarks();
}

async function renderPage(): Promise<void> {
  clearMessage();
  renderNav();
  if (!profile || route() === '/profiles') return renderProfiles();
  if (route() === '/quiz') {
    const params = new URLSearchParams(location.search);
    return renderQuizSetup(params.get('subject') ?? undefined, params.get('source') ?? undefined, params.get('topic') ?? undefined);
  }
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
    reviewAvailable = false;
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
