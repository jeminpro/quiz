import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type Auth, type User } from 'firebase/auth';
import {
  collection, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, writeBatch,
  type Firestore, getFirestore,
} from 'firebase/firestore';
import type { Attempt, AttemptItem, PendingAttempt, Profile, Progress } from './types';

const config = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

export const isConfigured = Object.values(config).every(Boolean);
export const firebaseProjectId = config.projectId as string | undefined;
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
if (isConfigured) {
  app = initializeApp(config);
  auth = getAuth(app);
  db = getFirestore(app);
}

function database(): Firestore {
  if (!db) throw new Error('Firebase is not configured. See README.md.');
  return db;
}

function authentication(): Auth {
  if (!auth) throw new Error('Firebase is not configured. See README.md.');
  return auth;
}

function profilePath(uid: string, profileId: string): string {
  return `families/${uid}/profiles/${profileId}`;
}

export function observeUser(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(authentication(), callback);
}

export async function signIn(): Promise<void> {
  await signInWithPopup(authentication(), new GoogleAuthProvider());
}

export async function signOutUser(): Promise<void> {
  await signOut(authentication());
}

export async function listProfiles(uid: string): Promise<Profile[]> {
  const result = await getDocs(collection(database(), 'families', uid, 'profiles'));
  return result.docs.map((snapshot) => ({ id: snapshot.id, ...snapshot.data() } as Profile))
    .sort((a, b) => a.createdAt - b.createdAt);
}

export async function createProfile(uid: string, name: string): Promise<Profile> {
  const profile: Profile = { id: crypto.randomUUID(), name: name.trim(), createdAt: Date.now() };
  await setDoc(doc(database(), profilePath(uid, profile.id)), profile);
  return profile;
}

export async function renameProfile(uid: string, profileId: string, name: string): Promise<void> {
  await updateDoc(doc(database(), profilePath(uid, profileId)), { name: name.trim() });
}

export async function listProgress(uid: string, profileId: string): Promise<Progress[]> {
  const result = await getDocs(collection(database(), `${profilePath(uid, profileId)}/progress`));
  return result.docs.map((snapshot) => snapshot.data() as Progress);
}

export async function toggleBookmark(uid: string, profileId: string, item: Progress, bookmarked: boolean): Promise<void> {
  await setDoc(doc(database(), `${profilePath(uid, profileId)}/progress/${item.questionId}`),
    { questionId: item.questionId, subject: item.subject, topics: item.topics, bookmarked }, { merge: true });
}

export async function listAttempts(uid: string, profileId: string): Promise<Attempt[]> {
  const result = await getDocs(query(collection(database(), `${profilePath(uid, profileId)}/attempts`), orderBy('completedAt', 'desc')));
  return result.docs.map((snapshot) => snapshot.data() as Attempt).filter((attempt) => attempt.status === 'complete');
}

export async function getAttempt(uid: string, profileId: string, attemptId: string): Promise<Attempt | null> {
  const snapshot = await getDoc(doc(database(), `${profilePath(uid, profileId)}/attempts/${attemptId}`));
  if (!snapshot.exists()) return null;
  const attempt = snapshot.data() as Attempt;
  return attempt.status === 'complete' ? attempt : null;
}

export async function getAttemptItems(uid: string, profileId: string, attemptId: string): Promise<AttemptItem[]> {
  const result = await getDocs(collection(database(), `${profilePath(uid, profileId)}/attempts/${attemptId}/items`));
  return result.docs.map((snapshot) => snapshot.data() as AttemptItem).sort((a, b) => a.order - b.order);
}

export async function saveAttempt(uid: string, pending: PendingAttempt): Promise<void> {
  const { attempt, items } = pending;
  const base = `${profilePath(uid, attempt.profileId)}/attempts/${attempt.id}`;
  const attemptRef = doc(database(), base);
  const existing = await getDoc(attemptRef);
  if (existing.exists() && existing.data().status === 'complete') return;
  await setDoc(attemptRef, { ...attempt, status: 'saving' });

  // Small batches keep even an "all questions" test within Firestore's write limit.
  for (let start = 0; start < items.length; start += 150) {
    const batch = writeBatch(database());
    for (const item of items.slice(start, start + 150)) {
      batch.set(doc(database(), `${base}/items/${String(item.order).padStart(6, '0')}`), item);
    }
    await batch.commit();
  }

  for (let start = 0; start < items.length; start += 150) {
    const batch = writeBatch(database());
    for (const item of items.slice(start, start + 150)) {
      const question = item.question;
      const progressRef = doc(database(), `${profilePath(uid, attempt.profileId)}/progress/${question.id}`);
      const update: Progress = {
        questionId: question.id,
        subject: question.subject,
        topics: question.topics,
        latestCorrect: item.correct,
        latestAt: attempt.completedAt,
      };
      if (!item.correct) update.everWrong = true;
      batch.set(progressRef, update, { merge: true });
    }
    await batch.commit();
  }
  await updateDoc(attemptRef, { status: 'complete' });
}
