import { CRITERIA, PATTERNS } from './passwordCriteria.js';

export function calculateStrength(password) {
  let score = 0;
  const checks = [];

  // Base length check
  if (password.length >= CRITERIA.MIN_LENGTH) {
    score += 20;
    checks.push({ passed: true, message: 'Minimum length requirement met' });
  } else {
    checks.push({ passed: false, message: 'Password should be at least 8 characters' });
  }

  // Extra length points
  if (password.length >= CRITERIA.STRONG_LENGTH) {
    score += 10;
    checks.push({ passed: true, message: 'Strong length bonus' });
  }

  // Character variety checks
  if (PATTERNS.lowercase.test(password)) {
    score += 10;
    checks.push({ passed: true, message: 'Contains lowercase letters' });
  } else {
    checks.push({ passed: false, message: 'Add lowercase letters' });
  }

  if (PATTERNS.uppercase.test(password)) {
    score += 15;
    checks.push({ passed: true, message: 'Contains uppercase letters' });
  } else {
    checks.push({ passed: false, message: 'Add uppercase letters' });
  }

  if (PATTERNS.numbers.test(password)) {
    score += 15;
    checks.push({ passed: true, message: 'Contains numbers' });
  } else {
    checks.push({ passed: false, message: 'Add numbers' });
  }

  if (PATTERNS.symbols.test(password)) {
    score += 15;
    checks.push({ passed: true, message: 'Contains special characters' });
  } else {
    checks.push({ passed: false, message: 'Add special characters' });
  }

  // Deductions
  if (PATTERNS.consecutiveChars.test(password)) {
    score -= 15;
    checks.push({ passed: false, message: 'Avoid repeated characters' });
  }

  if (PATTERNS.commonWords.test(password)) {
    score -= 20;
    checks.push({ passed: false, message: 'Avoid common password patterns' });
  }

  // Ensure score stays within bounds
  score = Math.max(0, Math.min(score, CRITERIA.MAX_SCORE));

  return {
    score,
    strength: getStrengthLabel(score),
    checks
  };
}

function getStrengthLabel(score) {
  if (score >= 80) return 'Very Strong';
  if (score >= 60) return 'Strong';
  if (score >= 40) return 'Moderate';
  if (score >= 20) return 'Weak';
  return 'Very Weak';
}