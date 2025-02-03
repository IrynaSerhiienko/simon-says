import { numbers, letters } from '../assets/data/data.js';
import {
  setInputBlocked,
  enableNewGameButton,
  disableNewGameButton,
  enableRepeatButton,
  disableRepeatButton,
  isRepeatedSequence,
} from './main.js';
import { audioKeyClick } from './components.js';

// Generate a random sequence
export function generateSequence(level, length) {
  const maxLength = 10; // The maximum length of the sequence
  length = Math.min(length, maxLength); // Limit the length

  let availableSymbols = [];

  if (level === 'easy') {
    availableSymbols = [...numbers];
  }
  if (level === 'medium') {
    availableSymbols = [...letters];
  }
  if (level === 'hard') {
    availableSymbols = [...numbers, ...letters];
  }

  const sequence = [];
  for (let i = 0; i < length; i += 1) {
    const randomIndex = Math.floor(Math.random() * availableSymbols.length);
    sequence.push(availableSymbols[randomIndex]);
  }

  return sequence;
}

// Sequence display (example of key lighting)
export function displaySequence(sequence, keys) {
  setInputBlocked(true);
  disableNewGameButton(); // Blocking the button while displaying the sequence
  disableRepeatButton(); // Blocking the button while displaying the sequence
  // the current position in the sequence
  let index = 0;

  function highlightNextKey() {
    if (index < sequence.length) {
      // find the right key
      const key = Array.from(keys).find((k) => {
        return k.textContent === sequence[index].toString();
      });
      if (key) {
        key.classList.add('keyboard__letter-key--highlight');
        audioKeyClick.play();
        setTimeout(() => {
          key.classList.remove('keyboard__letter-key--highlight');
          index++;
          highlightNextKey();
        }, 1000);
      }
    } else {
      setInputBlocked(false);
      enableNewGameButton(); // Unlocking the button after the end of the display
      if (!isRepeatedSequence) {
        enableRepeatButton(); // Unlocking the button after the end of the display
      }
    }
  }
  highlightNextKey();
}
