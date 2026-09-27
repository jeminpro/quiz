# Brightside Quiz

A static, family-focused Astro quiz app for broad FSCE-inspired practice. It is **not** an official FSCE paper. The question bank is public when the site is published; Firebase sign-in protects pupil profiles and results.

## Run locally

Requirements: Node.js 24 and pnpm 11.25.0.

1. Run `pnpm install`.
2. Copy `.env.example` to `.env` and fill in the Firebase web app settings.
3. Run `pnpm dev` and open the URL Astro prints (including `/quiz/`).
4. Run `pnpm check`, `pnpm test`, and `pnpm build` before publishing.

The site builds without Firebase settings but shows a setup message instead of sign-in. The Firebase web settings are public configuration values; Firestore Security Rules protect data.

## Firebase setup

1. Create a Firebase project and register a **Web app**. Copy its `apiKey`, `authDomain`, `projectId`, and `appId` into `.env` using the names in `.env.example`.
2. Enable **Authentication → Sign-in method → Google**. Add `jeminpro.github.io` to **Authentication → Settings → Authorized domains**. Add `localhost` for local development if it is absent.
3. Create a **Cloud Firestore** database. Deploy `firestore.rules` from this repository with the Firebase CLI, for example `firebase deploy --only firestore:rules --project YOUR_PROJECT_ID`. The first deployment must happen before using profiles.
4. Sign in on the site with any Google account, then create a pupil profile to start a test.

Profiles and their results live under `families/<account-uid>/profiles/<profile-id>`. Each Google account has its own profiles and reports. Anyone using the same signed-in account can switch between its pupil profiles.

### If sign-in works but Firestore says “Missing or insufficient permissions”

Google Authentication and Firestore access are separate steps. The deployed Firestore rules must match [`firestore.rules`](firestore.rules) in the same Firebase project shown on the app's error screen. The rules allow any signed-in user to access data only under their own UID.

1. Deploy the rules: `firebase deploy --only firestore:rules --project YOUR_PROJECT_ID`. Publishing to GitHub Pages does **not** deploy Firestore rules. If you do not use the Firebase CLI, open **Firestore Database → Rules** in the Firebase console, paste the contents of `firestore.rules`, and click **Publish**.
2. Check that the project ID on the app's error screen matches the Firebase console project. Then use **Retry access**.

If **pupil profiles** or **pupil progress** is denied, check the live rules and the Firebase project ID. No account approval document is required.

## GitHub Pages setup

The Astro configuration targets `https://jeminpro.github.io/quiz/`. If you rename the repository or use a custom domain, update `site` and `base` in `astro.config.mjs`.

In the GitHub repository, choose **Settings → Pages → Build and deployment → GitHub Actions**. Add these **repository secrets** under **Settings → Secrets and variables → Actions → Secrets**:

- `PUBLIC_FIREBASE_API_KEY`
- `PUBLIC_FIREBASE_AUTH_DOMAIN`
- `PUBLIC_FIREBASE_PROJECT_ID`
- `PUBLIC_FIREBASE_APP_ID`

The workflow validates those variables, checks the app, tests it, builds the static site, and deploys it on pushes to `main`. Firestore rules are deployed separately with the Firebase CLI.

## Add questions

Add one `.md` file per question in `src/content/questions/`. For example:

```md
---
id: 01J8X5K2Q3M4N6P7R8T9VWXYZ0
subject: Maths
topics: [Fractions]
choices:
  - { id: A, text: "1/2" }
  - { id: B, text: "3/4" }
  - { id: C, text: "1/4" }
correctChoiceIds: [C]
explanation: "One of four equal parts is **1/4**."
---
A shape has four equal parts. One part is shaded. What fraction is shaded?
```

Use a stable, unique ULID for each question's `id`. A ULID sorts lexicographically by creation time. You can omit `id` when writing a new Markdown question and run `pnpm questions:ids` to generate it; keep that ULID when editing the question. The command replaces a missing ID or an old UUID, and rejects any other invalid or duplicate ID. Choice IDs such as `A` and `B` remain short labels. Use two or more choices and list one or more correct choice IDs. Multiple-answer questions are marked correct only when the exact set is selected. Markdown is supported in the question and explanation; choice text is plain text. Put images in `public/questions/` and reference them as `![Description](/questions/filename.svg)`. Keep image files that appear in saved tests so old reviews still display them.

`pnpm build` validates required fields, duplicate IDs, answer references, and non-empty question bodies. The bank includes all 120 questions from the supplied Gloucestershire PE practice file, grouped into its six topics, plus six sample questions in other subjects. The earlier sample PE question was removed so the PE subject matches the supplied file exactly.

To regenerate the PE files from the same source format, run `pnpm import:pe "C:\path\to\FSCE_Gloucestershire_PE_120_Multiple_Choice_Questions.md"`. The importer retains each existing question's ULID, and generates one only for a new file. It writes files to `src/content/questions/pe/`. It requires 120 numbered questions, 120 matching answers, and six sections of 20 questions; it stops if anything is missing or mismatched. Add `--check` to compare generated files without changing them.

## Behaviour and limits

- A test's elapsed time runs from starting to submitting, including time spent in a background tab. An unfinished test is discarded on refresh or close.
- Submitted answers wait in the current browser session until Firestore saves them. Use **Retry saving** if a connection error occurs.
- Historical reviews save a copy of each question, choices, answer, and explanation at submission time. Do not delete static images used by historical questions.
- “Still missed” uses the latest completed answer per question; “Ever missed” includes questions answered incorrectly at least once.
- This app trusts the signed-in browser for scoring. The public static question bank and client-side scoring are unsuitable for a secure exam.
