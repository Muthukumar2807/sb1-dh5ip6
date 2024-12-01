import { calculateStrength } from './utils/strengthCalculator.js';

export function createPasswordChecker(containerElement) {
  const template = `
    <div class="password-checker">
      <div class="input-group">
        <input type="password" id="passwordInput" placeholder="Enter password" class="password-input">
        <button id="togglePassword" type="button" class="toggle-password">👁️</button>
      </div>
      <div class="strength-meter">
        <div id="strengthBar" class="strength-bar"></div>
      </div>
      <div id="strengthLabel" class="strength-label"></div>
      <ul id="checksList" class="checks-list"></ul>
    </div>
  `;

  containerElement.innerHTML = template;

  const passwordInput = containerElement.querySelector('#passwordInput');
  const togglePassword = containerElement.querySelector('#togglePassword');
  const strengthBar = containerElement.querySelector('#strengthBar');
  const strengthLabel = containerElement.querySelector('#strengthLabel');
  const checksList = containerElement.querySelector('#checksList');

  function updateStrengthIndicator(password) {
    const result = calculateStrength(password);
    
    // Update strength bar
    strengthBar.style.width = `${result.score}%`;
    strengthBar.className = `strength-bar ${result.strength.toLowerCase().replace(' ', '-')}`;
    
    // Update strength label
    strengthLabel.textContent = `${result.strength} (${result.score}%)`;
    
    // Update checks list
    checksList.innerHTML = result.checks
      .map(check => `
        <li class="${check.passed ? 'pass' : 'fail'}">
          ${check.passed ? '✓' : '✗'} ${check.message}
        </li>
      `)
      .join('');
  }

  // Event listeners
  passwordInput.addEventListener('input', (e) => {
    updateStrengthIndicator(e.target.value);
  });

  togglePassword.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    togglePassword.textContent = type === 'password' ? '👁️' : '🔒';
  });

  // Initial update
  updateStrengthIndicator('');
}