import DOMPurify from 'dompurify';
import { marked } from 'marked';
import type { User } from 'firebase/auth';
import {
  createProfile, firebaseProjectId, getAttempt, getAttemptItems, isConfigured, listAttempts,
  listProfiles, listProgress, observeUser, renameProfile, saveAttempt, signIn, signOutUser,
  toggleBookmark,
} from './firebase';
import { eligibleQuestions, formatDuration, gradeItems, selectQuestions } from './quiz';
import { contentSources, groupSubjectsBySource } from './contentSources';
import type { Attempt, PendingAttempt, Profile, Progress, Question } from './types';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const app = document.querySelector<HTMLElement>('#app')!;
const headerProfile = document.querySelector<HTMLElement>('#header-profile')!;
const headerMenu = document.querySelector<HTMLElement>('#header-menu')!;
const status = document.querySelector<HTMLElement>('#status')!;
let user: User | null = null;
let profiles: Profile[] = [];
let profile: Profile | undefined;
let questions: Question[] = [];
let progress: Progress[] = [];
let active: {
  questions: Question[];
  subject: string;
  sourceId: string;
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

function attemptSourceName(attempt: Attempt): string | undefined {
  if (attempt.sourceId) return contentSources[attempt.sourceId] ?? attempt.sourceId;
  return attempt.subject === 'Physical Education' ? contentSources.chatgpt : undefined;
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
  headerProfile.innerHTML = '';
  headerMenu.innerHTML = '';
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

function closeHeaderMenu(restoreFocus = false): void {
  const trigger = headerMenu.querySelector<HTMLButtonElement>('.menu-trigger');
  const panel = headerMenu.querySelector<HTMLElement>('.menu-panel');
  if (!trigger || !panel || panel.hidden) return;
  panel.hidden = true;
  trigger.setAttribute('aria-expanded', 'false');
  if (restoreFocus) trigger.focus();
}

document.addEventListener('click', (event) => {
  if (!headerMenu.contains(event.target as Node)) closeHeaderMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && headerMenu.querySelector('.menu-trigger[aria-expanded="true"]')) {
    event.preventDefault();
    closeHeaderMenu(true);
  }
});
headerMenu.addEventListener('focusout', () => {
  requestAnimationFrame(() => {
    if (!headerMenu.contains(document.activeElement)) closeHeaderMenu();
  });
});

function renderHeader(): void {
  headerProfile.innerHTML = '';
  headerMenu.innerHTML = '';
  if (!user) return;
  const current = route() === '/results' ? '/history' : route();
  headerMenu.innerHTML = `<button type="button" class="menu-trigger" aria-label="More options" aria-expanded="false" aria-controls="header-menu-panel">
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><circle cx="12" cy="5" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="12" cy="19" r="1.8"/></svg></button>
    <nav id="header-menu-panel" class="menu-panel" aria-label="More options" hidden>
      ${profile ? `<a href="${path('/history/')}" ${current === '/history' ? 'aria-current="page"' : ''}>History</a>
      <a href="${path('/progress/')}" ${current === '/progress' ? 'aria-current="page"' : ''}>Progress</a>` : ''}
      <button type="button" class="menu-sign-out">Sign out</button>
    </nav>`;
  const trigger = headerMenu.querySelector<HTMLButtonElement>('.menu-trigger')!;
  const panel = headerMenu.querySelector<HTMLElement>('.menu-panel')!;
  trigger.addEventListener('click', () => {
    const opening = panel.hidden;
    panel.hidden = !opening;
    trigger.setAttribute('aria-expanded', String(opening));
    if (opening) panel.querySelector<HTMLElement>('a, button')?.focus();
    else trigger.focus();
  });
  headerMenu.querySelector('.menu-sign-out')?.addEventListener('click', async () => {
    closeHeaderMenu(true);
    try { await signOutUser(); } catch (error) { showError(error); }
  });
  if (!profile) return;
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
  renderHeader();
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
        renderHeader();
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
  const groups = groupSubjectsBySource(questions);
  app.innerHTML = `${pendingBanner()}<section class="home-subjects" aria-labelledby="subjects-title">
    <div class="page-heading"><div><h1 id="subjects-title">Choose a subject</h1></div></div>
    ${groups.length ? `<div class="source-filter"><label for="source-filter">Filter by source</label>
      <select id="source-filter"><option value="all">All sources</option>${groups.map(({ sourceId }) =>
        `<option value="${escapeHtml(sourceId)}">${escapeHtml(contentSources[sourceId])}</option>`).join('')}</select></div>
      ${groups.map(({ sourceId, subjects }) => `<section class="source-group" data-source-id="${escapeHtml(sourceId)}" aria-labelledby="source-${escapeHtml(sourceId)}">
        <h2 id="source-${escapeHtml(sourceId)}">${escapeHtml(contentSources[sourceId])}</h2>
        <div class="subject-grid">${subjects.map(({ name: subject, count }) => {
      const subjectAttempts = attempts.filter((attempt) => attempt.subject === subject &&
        (attempt.sourceId === sourceId || (!attempt.sourceId && subject === 'Physical Education' && sourceId === 'chatgpt')));
      const latest = subjectAttempts[0];
      return `<a class="subject-card" href="${path('/setup/', { subject, sourceId })}">
        <strong>${escapeHtml(subject)}</strong>
        <span class="subject-card-details">
          <span>${count} question${count === 1 ? '' : 's'}</span>
          <span>${subjectAttempts.length} practice${subjectAttempts.length === 1 ? '' : 's'}</span>
          <span>${latest ? new Date(latest.completedAt).toLocaleDateString('en-GB') : 'Not started'}</span>
        </span>
        <span class="subject-card-arrow" aria-hidden="true">→</span></a>`;
    }).join('')}</div></section>`).join('')}` : '<div class="card empty">No subjects are available yet.</div>'}</section>`;
  wireRetry();
  const filter = app.querySelector<HTMLSelectElement>('#source-filter');
  filter?.addEventListener('change', () => {
    for (const group of app.querySelectorAll<HTMLElement>('.source-group')) {
      group.hidden = filter.value !== 'all' && group.dataset.sourceId !== filter.value;
    }
  });
  filter?.dispatchEvent(new Event('change'));
}

function renderQuizSetup(subject: string, sourceId: string): void {
  document.title = 'Set up your test · Brightside Quiz';
  app.innerHTML = `${pendingBanner()}<a class="back-link" href="${path('/')}">← Back to subjects</a>
    <form id="test-setup" class="card setup-card">
      <div class="setup-header"><h1>Set up your test</h1>
        <p class="setup-context"><span>Source: <strong>${escapeHtml(contentSources[sourceId])}</strong></span>
          <span>Subject: <strong>${escapeHtml(subject)}</strong></span></p></div>
      <div class="setup-section setup-fields">
        <fieldset><legend>Topics</legend><div id="topic-select" class="topic-select">
          <button type="button" id="topic-trigger" class="topic-trigger" aria-expanded="false" aria-controls="topic-menu" aria-describedby="topic-hint">
            <span id="topic-summary">All topics</span><span class="select-caret" aria-hidden="true"></span></button>
          <div id="topic-menu" class="topic-menu" hidden><div id="topic-options" class="topic-options"></div>
            <button type="button" id="clear-topics" class="clear-topics">Clear selection</button></div>
        </div><p id="topic-hint" class="hint">No selection includes all topics.</p></fieldset>
      </div>
      <div class="setup-section setup-fields">
        <h2>Choose your questions</h2><div class="setup-row"><div><label for="question-set">Question set</label><select id="question-set" name="source" aria-describedby="question-set-help">
          <option value="all">All</option>
          <option value="new" selected>New questions only</option>
          <option value="still-missed">Incorrect on latest attempt</option>
          <option value="ever-missed">Incorrect at least once</option></select>
          <p id="question-set-help" class="field-help">Questions not included in a previously submitted test.</p></div>
        <div><label for="count">Maximum questions</label><select id="count" name="count">
          <option value="10">10</option><option value="20" selected>20</option><option value="30">30</option><option value="all">All</option></select></div></div>
      </div>
      <div class="setup-footer"><div id="pool-count" class="pool-count" aria-live="polite"></div>
        <button type="submit" class="primary">Start</button></div>
    </form>`;
  wireRetry();
  const form = app.querySelector<HTMLFormElement>('#test-setup')!;
  const topicOptions = app.querySelector<HTMLElement>('#topic-options')!;
  const topicSelect = app.querySelector<HTMLElement>('#topic-select')!;
  const topicTrigger = app.querySelector<HTMLButtonElement>('#topic-trigger')!;
  const topicMenu = app.querySelector<HTMLElement>('#topic-menu')!;
  const topicSummary = app.querySelector<HTMLElement>('#topic-summary')!;
  const clearTopics = app.querySelector<HTMLButtonElement>('#clear-topics')!;
  const questionSet = app.querySelector<HTMLSelectElement>('#question-set')!;
  const questionSetHelp = app.querySelector<HTMLElement>('#question-set-help')!;
  const questionSetHelpText: Record<Attempt['source'], string> = {
    all: 'Every question matching your topics.',
    new: 'Questions not included in a previously submitted test.',
    'still-missed': 'Questions marked incorrect or unanswered on their most recent attempt.',
    'ever-missed': 'Questions ever marked incorrect or unanswered, even if answered correctly later.',
  };
  const topicInputs = () => [...topicOptions.querySelectorAll<HTMLInputElement>('input[name="topic"]')];
  const closeTopicMenu = (restoreFocus = false) => {
    if (topicMenu.hidden) return;
    topicMenu.hidden = true;
    topicTrigger.setAttribute('aria-expanded', 'false');
    if (restoreFocus) topicTrigger.focus();
  };
  const openTopicMenu = (focus: 'none' | 'first' | 'last' = 'none') => {
    topicMenu.hidden = false;
    topicTrigger.setAttribute('aria-expanded', 'true');
    if (focus !== 'none') {
      const inputs = topicInputs();
      inputs[focus === 'first' ? 0 : inputs.length - 1]?.focus();
    }
  };
  const updateTopicSummary = () => {
    const selected = topicInputs().filter((input) => input.checked);
    topicSummary.textContent = selected.length === 0 ? 'All topics'
      : selected.length === 1 ? selected[0].value : `${selected.length} topics selected`;
    clearTopics.disabled = selected.length === 0;
  };
  const updateTopics = () => {
    const topics = [...new Set(questions.filter((question) => question.subject === subject && question.sourceId === sourceId)
      .flatMap((question) => question.topics))].sort();
    topicOptions.innerHTML = topics.map((topic) => `<label class="topic-option"><input type="checkbox" name="topic" value="${escapeHtml(topic)}" /><span>${escapeHtml(topic)}</span></label>`).join('');
    updateTopicSummary();
    updateCount();
  };
  const selection = () => ({
    topics: [...form.querySelectorAll<HTMLInputElement>('input[name="topic"]:checked')].map((input) => input.value),
    source: (form.elements.namedItem('source') as HTMLSelectElement).value as Attempt['source'],
    count: (form.elements.namedItem('count') as HTMLSelectElement).value,
  });
  const updateCount = () => {
    const selected = selection();
    const available = eligibleQuestions(questions, progress, subject, sourceId, selected.topics, selected.source).length;
    const requested = selected.count === 'all' ? available : Math.min(Number(selected.count), available);
    app.querySelector('#pool-count')!.textContent = available
      ? `${requested} question${requested === 1 ? '' : 's'} in this test · ${available} available`
      : 'No questions match these choices. Try another topic or question set.';
    (form.querySelector('button[type="submit"]') as HTMLButtonElement).disabled = available === 0 || !!pending;
  };
  questionSet.addEventListener('change', () => {
    questionSetHelp.textContent = questionSetHelpText[questionSet.value as Attempt['source']];
    updateCount();
  });
  form.querySelector('#count')?.addEventListener('change', updateCount);
  topicOptions.addEventListener('change', () => { updateTopicSummary(); updateCount(); });
  topicTrigger.addEventListener('click', () => {
    if (topicMenu.hidden) openTopicMenu(); else closeTopicMenu();
  });
  topicTrigger.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      openTopicMenu(event.key === 'ArrowDown' ? 'first' : 'last');
    }
  });
  topicMenu.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeTopicMenu(true);
      return;
    }
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    const inputs = topicInputs();
    const current = inputs.indexOf(document.activeElement as HTMLInputElement);
    if (current < 0) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? inputs.length - 1
      : (current + (event.key === 'ArrowDown' ? 1 : -1) + inputs.length) % inputs.length;
    inputs[next]?.focus();
  });
  clearTopics.addEventListener('click', () => {
    for (const input of topicInputs()) input.checked = false;
    updateTopicSummary();
    updateCount();
    topicInputs()[0]?.focus();
  });
  document.addEventListener('click', (event) => {
    if (!topicSelect.contains(event.target as Node)) closeTopicMenu();
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const selected = selection();
    const pool = eligibleQuestions(questions, progress, subject, sourceId, selected.topics, selected.source);
    if (!pool.length) return;
    active = {
      questions: selectQuestions(pool, selected.count === 'all' ? 'all' : Number(selected.count)),
      subject, sourceId, topics: selected.topics, source: selected.source,
      startedAt: Date.now(), answers: {}, index: 0,
    };
    reviewAvailable = false;
    window.history.pushState(null, '', path('/test/'));
    renderActiveQuestion();
  });
  updateTopics();
}

function renderActiveQuestion(): void {
  if (!active) return;
  document.title = 'Test · Brightside Quiz';
  const question = active.questions[active.index];
  const multi = question.correctChoiceIds.length > 1;
  const selected = new Set(active.answers[question.id] ?? []);
  const answered = active.questions.filter((item) => active!.answers[item.id]?.length).length;
  const percent = Math.round((active.index + 1) / active.questions.length * 100);
  app.innerHTML = `<div class="test-top"><div><div class="eyebrow">${escapeHtml(contentSources[active.sourceId])} · ${escapeHtml(active.subject.toUpperCase())}</div>
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
    id: crypto.randomUUID(), profileId: profile.id, subject: active.subject, sourceId: active.sourceId, topics: active.topics,
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
  const view = new URLSearchParams(location.search).get('view') === 'wrong' ? 'wrong' : 'all';
  const shown = view === 'wrong' ? items.filter((item) => !item.correct) : items;
  app.innerHTML = `<div class="page-heading"><div><div class="eyebrow">PRACTICE RESULT</div><h1>${escapeHtml(attempt.subject)}</h1>
    <p>${attemptSourceName(attempt) ? `${escapeHtml(attemptSourceName(attempt))} · ` : ''}${new Date(attempt.completedAt).toLocaleDateString()} · ${formatDuration(attempt.durationMs)}</p></div>
    <a class="button secondary" href="${path('/history/')}">All history</a></div>
    <div class="result-hero"><div class="score-ring" style="--score:${Math.round(attempt.correct / attempt.total * 100)}%" aria-hidden="true"><span>${Math.round(attempt.correct / attempt.total * 100)}%</span></div>
      <div class="result-copy"><div class="eyebrow">PRACTICE COMPLETE</div><h2>${attempt.correct} of ${attempt.total} correct</h2>
      <p>Review your answers, then choose a subject from the home page when you are ready to practise again.</p>
      <div class="result-actions"><a class="button primary" href="${path('/')}">Back to subjects</a></div></div></div>
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
    ${question.explanation.trim() ? `<div class="explanation"><strong>Explanation</strong><div class="prose">${markdown(question.explanation)}</div></div>` : ''}</article>`;
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
    <p>Every completed session, newest first.</p></div><a class="button secondary" href="${path('/')}">Back to subjects</a></div>
    ${attempts.length ? `<div class="history-list">${attempts.map((attempt) => `<a class="history-row card" href="${path('/results/', { id: attempt.id })}">
      <div class="history-details"><strong>${escapeHtml(attempt.subject)}</strong><small>${attemptSourceName(attempt) ? `${escapeHtml(attemptSourceName(attempt))} · ` : ''}${new Date(attempt.completedAt).toLocaleString()} · ${attempt.total} questions · ${formatDuration(attempt.durationMs)}</small></div>
      <span class="history-score"><strong>${Math.round(attempt.correct / attempt.total * 100)}%</strong><small>${attempt.correct}/${attempt.total} correct</small></span>
      <span class="row-arrow" aria-hidden="true">→</span></a>`).join('')}</div>` :
      `<div class="card empty"><h2>No completed sessions yet</h2><p>Your results will appear here after your first practice.</p>
        <a class="button primary" href="${path('/')}">Choose a subject</a></div>`}`;
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
    <p>Your answer accuracy and the topics worth revisiting.</p></div><a class="button secondary" href="${path('/')}">Back to subjects</a></div>
    <div class="report-grid">${subjects.map((subject) => {
      const subjectAttempts = attempts.filter((attempt) => attempt.subject === subject);
      const total = subjectAttempts.reduce((sum, attempt) => sum + attempt.total, 0);
      const correct = subjectAttempts.reduce((sum, attempt) => sum + attempt.correct, 0);
      const accuracy = total ? Math.round(correct / total * 100) : 0;
      return `<article class="card report-card"><h2>${escapeHtml(subject)}</h2>
        <div class="report-value"><strong>${total ? `${accuracy}%` : '—'}</strong><span>answer accuracy</span></div>
        <div class="report-track" role="progressbar" aria-label="${escapeHtml(subject)} answer accuracy" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${accuracy}"><span style="width:${accuracy}%"></span></div>
        <p>${subjectAttempts.length} completed practices · ${total} answers</p></article>`;
    }).join('')}</div>
    <section class="card report-section"><h2>Topics to revisit</h2>
      ${weakTopics.length ? `<ul class="plain-list">${weakTopics.map((stat) => `<li><span><strong>${escapeHtml(stat.topic)}</strong><small>${escapeHtml(stat.subject)} · ${stat.wrong} still missed</small></span></li>`).join('')}</ul>` :
        '<p>No currently missed topics. Start practising to build this report.</p>'}</section>
    <section class="card report-section"><h2>Bookmarked questions</h2>
      ${bookmarked.length ? `<ul class="plain-list">${bookmarked.map((item) => {
        const question = questions.find((candidate) => candidate.id === item.questionId);
        return `<li><details><summary>${escapeHtml(item.subject)} · ${escapeHtml(item.topics.join(', '))}<small>${escapeHtml(question?.stem.slice(0, 100) ?? item.questionId)}</small></summary>
          ${question ? `<div class="prose">${markdown(question.stem)}</div><p><strong>Answer:</strong> ${question.choices.filter((choice) => question.correctChoiceIds.includes(choice.id)).map((choice) => escapeHtml(choice.text)).join(', ')}</p>
          ${question.explanation.trim() ? `<div class="prose">${markdown(question.explanation)}</div>` : ''}` : '<p>This question is no longer in the current bank. Its past results still hold a snapshot.</p>'}</details>
          <button class="bookmark" type="button" data-id="${escapeHtml(item.questionId)}" aria-label="Remove bookmark">★ Saved</button></li>`;
      }).join('')}</ul>` : '<p>Bookmark questions from a result review to find them here.</p>'}</section>`;
  wireBookmarks();
}

async function renderPage(): Promise<void> {
  clearMessage();
  renderHeader();
  if (!profile || route() === '/profiles') return renderProfiles();
  if (route() === '/setup') {
    const params = new URLSearchParams(location.search);
    const subject = params.get('subject');
    const sourceId = params.get('sourceId');
    if (!subject || !sourceId || !questions.some((question) => question.subject === subject && question.sourceId === sourceId)) {
      window.location.replace(path('/'));
      return;
    }
    return renderQuizSetup(subject, sourceId);
  }
  if (route() === '/test') {
    if (active) return renderActiveQuestion();
    window.location.replace(path('/'));
    return;
  }
  if (route() === '/history') return renderHistory();
  if (route() === '/results') return renderResults();
  if (route() === '/progress') return renderProgress();
  return renderHome();
}

window.addEventListener('popstate', () => { void renderPage(); });

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
