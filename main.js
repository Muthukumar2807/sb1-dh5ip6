import './style.css';
import { createPasswordChecker } from './src/passwordChecker.js';

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>Password Strength Checker</h1>
    <div id="passwordChecker"></div>
  </div>
`;

createPasswordChecker(document.querySelector('#passwordChecker'));