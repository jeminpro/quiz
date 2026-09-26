const names = [
  'PUBLIC_FIREBASE_API_KEY',
  'PUBLIC_FIREBASE_AUTH_DOMAIN',
  'PUBLIC_FIREBASE_PROJECT_ID',
  'PUBLIC_FIREBASE_APP_ID',
];
const missing = names.filter((name) => !process.env[name]);
if (missing.length) {
  console.error(`Missing GitHub Actions variables: ${missing.join(', ')}`);
  process.exitCode = 1;
}
