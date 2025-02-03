import { createElement, createInput } from './ui.js';
import { letters, numbers, levels } from '../assets/data/data.js';
import { isGameActive } from './main.js';
import {
  levelContainer,
  numberContainer,
  letterContainer,
} from './components.js';

levels.forEach((level, index) => {
  const radioWrapper = createElement({
    classes: ['level__radio-wrapper'],
  });
  levelContainer.appendChild(radioWrapper);

  const radioButton = createInput({
    type: 'radio',
    name: 'difficulty',
    value: level.value,
    classes: ['level__radio-button'],
    checked: index === 0,
  });
  radioWrapper.appendChild(radioButton);

  if (index === 0) {
    radioButton.checked = true;
  }

  const label = createElement({
    tag: 'label',
    classes: ['level__radio-label'],
    text: level.label,
  });
  radioWrapper.appendChild(label);
});

export let keysCreated = false;
export let keys = [];

//creation virtual keyboard
function createKeys() {
  numbers.map((el) => {
    const number = createElement({
      tag: 'button',
      classes: ['keyboard__letter-key'],
      text: el,
    });
    numberContainer.appendChild(number);
  });

  letters.map((el) => {
    const letter = createElement({
      tag: 'button',
      classes: ['keyboard__letter-key'],
      text: el,
    });
    letterContainer.appendChild(letter);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  keys = document.querySelectorAll('.keyboard__letter-key');
  if (keys.length > 0) {
    keysCreated = true;
  } else {
    console.log('No keys found in DOM.');
  }
});

function showKeys(level) {
  numberContainer.classList.add('keyboard__number-container--hidden');

  letterContainer.classList.add('keyboard__letter-container--hidden');

  if (level === 'easy' || level === 'hard') {
    numberContainer.classList.remove('keyboard__number-container--hidden');
  }

  if (level === 'medium' || level === 'hard') {
    letterContainer.classList.remove('keyboard__letter-container--hidden');
  }
}

createKeys();

showKeys('easy');

export let selectedLevel = 'easy';

function levelChange(newLevel) {
  selectedLevel = newLevel;
  showKeys(selectedLevel);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input[name="difficulty"]').forEach((input) => {
    input.addEventListener('change', () => {
      if (isGameActive()) {
        console.log('You cannot change the level during the game.');
        document.querySelector(
          `input[value="${selectedLevel}"]`,
        ).checked = true;
        return;
      }
      const newLevel = document.querySelector(
        'input[name="difficulty"]:checked',
      ).value;
      levelChange(newLevel);
    });
  });
});
