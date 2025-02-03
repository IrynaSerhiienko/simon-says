import { currentCounter, totalCounter } from './components.js';

const totalRounds = 5;

export function updateCounter(currentRound) {
  currentCounter.textContent = `${currentRound}`;
  totalCounter.textContent = `/${totalRounds}`;
}
