const names = [
  'PUBLIC_FIREBASE_API_KEY',
  'PUBLIC_FIREBASE_AUTH_DOMAIN',
  'PUBLIC_FIREBASE_PROJECT_ID',
  'PUBLIC_FIREBASE_APP_ID',
];
const missing = names.filter((name) => !process.env[name]);
if (missing.length) {
  console.error(`Missing Firebase build settings: ${missing.join(', ')}. Check repository Actions secrets.`);
  process.exitCode = 1;
}
