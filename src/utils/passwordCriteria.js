// Password validation criteria and scoring rules
export const CRITERIA = {
  MIN_LENGTH: 8,
  STRONG_LENGTH: 12,
  MAX_SCORE: 100
};

export const PATTERNS = {
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  numbers: /[0-9]/,
  symbols: /[!@#$%^&*()_+\-=\[\]{};:'",.<>/?]/,
  consecutiveChars: /(.)\1{2,}/,
  commonWords: /password|123456|qwerty|admin/i
};