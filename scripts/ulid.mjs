import { randomBytes } from 'node:crypto';

const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
const TIME_LENGTH = 10;
const RANDOM_LENGTH = 16;

export const ULID_PATTERN = /^[0-9A-HJKMNP-TV-Z]{26}$/;

function encodeTime(time) {
  if (!Number.isInteger(time) || time < 0 || time > 0xffffffffffff) {
    throw new Error(`Cannot encode ULID time ${time}`);
  }
  let value = time;
  let encoded = '';
  for (let index = 0; index < TIME_LENGTH; index++) {
    encoded = ENCODING[value % 32] + encoded;
    value = Math.floor(value / 32);
  }
  return encoded;
}

function encodeRandom() {
  const bytes = randomBytes(10);
  let bits = 0n;
  for (const byte of bytes) bits = (bits << 8n) | BigInt(byte);
  let encoded = '';
  for (let index = 0; index < RANDOM_LENGTH; index++) {
    const shift = BigInt((RANDOM_LENGTH - 1 - index) * 5);
    encoded += ENCODING[Number((bits >> shift) & 31n)];
  }
  return encoded;
}

function incrementRandom(random) {
  const chars = [...random];
  for (let index = chars.length - 1; index >= 0; index--) {
    const value = ENCODING.indexOf(chars[index]);
    if (value < 0) throw new Error(`Invalid ULID randomness ${random}`);
    if (value < ENCODING.length - 1) {
      chars[index] = ENCODING[value + 1];
      return chars.join('');
    }
    chars[index] = ENCODING[0];
  }
  throw new Error('ULID randomness overflowed');
}

export function isUlid(value) {
  return ULID_PATTERN.test(value);
}

export function ulid(time = Date.now()) {
  return encodeTime(time) + encodeRandom();
}

export function monotonicUlidFactory() {
  let lastTime = 0;
  let lastRandom = '';
  return function nextUlid(time = Date.now()) {
    if (time <= lastTime) {
      lastRandom = incrementRandom(lastRandom);
      return encodeTime(lastTime) + lastRandom;
    }
    lastTime = time;
    lastRandom = encodeRandom();
    return encodeTime(time) + lastRandom;
  };
}
