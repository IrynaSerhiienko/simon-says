import { keyMapping } from '../assets/data/data.js';
import { selectedLevel, keysCreated, keys } from './level-selection.js';
import { generateSequence, displaySequence } from './random-sequence.js';
import { updateCounter } from './round-counter.js';
import {
  body,
  limitingContainer,
  mainContainer,
  gameName,
  levelCounterContainer,
  levelContainer,
  counterContainer,
  counterTitle,
  counter,
  currentCounter,
  totalCounter,
  wordContainer,
  keyboardContainer,
  numberContainer,
  letterContainer,
  buttonsContainer,
  buttonStart,
  buttonRepeat,
  buttonNewGame,
  buttonNext,
  audioKeyClick,
  audioKeyWrongClick,
  audioRoundCorrect,
  audioWin,
  audioGameOver,
} from './components.js';
import { createModal } from './modal.js';

body.appendChild(limitingContainer);
limitingContainer.appendChild(mainContainer);
levelCounterContainer.append(levelContainer, counterContainer);
counter.append(currentCounter, totalCounter);
counterContainer.append(counterTitle, counter);
buttonsContainer.append(buttonStart, buttonRepeat, buttonNext, buttonNewGame);
keyboardContainer.append(numberContainer, letterContainer);
mainContainer.append(
  gameName,
  levelCounterContainer,
  wordContainer,
  keyboardContainer,
  buttonsContainer,
  audioKeyClick,
  audioKeyWrongClick,
  audioRoundCorrect,
  audioWin,
  audioGameOver,
);

export let isRepeatedSequence = false; // Flag to track whether the "Repeat the sequence" button was pressed
let incorrectAttempts = 0; // Number of incorrect requests in the current round
let isInputBlocked = false;
export let currentRound = 0;
let userInputIndex = 0; // The index of the character that is expected from the user
let sequence = []; // Current random sequence
updateCounter(0);

export function setInputBlocked(status) {
  isInputBlocked = status;
}

buttonStart?.addEventListener('click', startGame);

export function isGameActive() {
  return !buttonNewGame.classList.contains('button__new-game--hidden');
}

function checkUserInput(symbol) {
  if (symbol === sequence[userInputIndex].toString()) {
    audioKeyClick.play();
    userInputIndex++;

    if (userInputIndex === sequence.length) {
      wordContainer.classList.remove('non-editable-input--error'); // Remove the red highlight
      wordContainer.classList.add('non-editable-input--correct'); // Add a green highlight
      setTimeout(() => {
        if (currentRound === 5) {
          currentRound = 0;
          end('Congratulations! You finished all rounds!');
          audioWin.play();
          createModal({
            text: 'Congratulations! You finished all rounds!',
            gifSrc: './src/assets/gif/win.gif',
          });
          disableRepeatButton();
        } else {
          end('The round is completed!');
          audioRoundCorrect.play();
          wordContainer.classList.remove('non-editable-input--hidden');
          counterContainer.classList.remove('round__container--hidden');
          buttonNext.classList.remove('button__next--hidden');
          buttonNewGame.classList.remove('button__new-game--hidden');
          buttonStart.classList.add('button__start--hidden');
          enableRepeatButton(); // Unlock the button for the next round
          createModal({
            text: 'round is completed!',
            round: currentRound,
            gifSrc: './src/assets/gif/round-correct1.gif',
          });
        }
        resetInputHighlighting();
      }, 1000);
    }
  } else {
    userInputIndex = 0;
    wordContainer.classList.remove('non-editable-input--correct'); // Remove the green highlight
    wordContainer.classList.add('non-editable-input--error'); // Add a red highlight
    incorrectAttempts++;
    if (incorrectAttempts === 1) {
      wordContainer.value = '';
      console.log('Wrong answer! You have one last request left');
      audioKeyWrongClick.play();
      setTimeout(() => {
        createModal({
          text: 'Wrong answer! You have one last request left.',
          gifSrc: './src/assets/gif/wrong-key.gif',
        });
      }, 1000);
      setTimeout(() => {
        resetInputHighlighting(); // Reset the backlight after the delay 1s
      }, 1000);
    } else if (incorrectAttempts === 2) {
      setTimeout(() => {
        currentRound = 0;
        incorrectAttempts = 0;
        end('You lost! Try again!');
        resetInputHighlighting(); // Reset the backlight after the delay 1s
      }, 1000);

      setTimeout(() => {
        createModal({
          text: 'You lost! Try again!',
          gifSrc: './src/assets/gif/you-lost.gif',
        });
      }, 1200);
      audioGameOver.play();
    }
  }
}

function startGame() {
  enableRepeatButton();

  isRepeatedSequence = false;
  incorrectAttempts = 0;
  // Delete old handlers
  removeVirtualKeyHandler();
  removePhysicalKeyHandler();

  // Add new handlers
  addVirtualKeyHandler();
  addPhysicalKeyHandler();

  counterContainer.classList.remove('round__container--hidden');
  wordContainer.classList.remove('non-editable-input--hidden');
  buttonRepeat.classList.remove('button__repeat--hidden');
  buttonNewGame.classList.remove('button__new-game--hidden');
  buttonStart.classList.add('button__start--hidden');

  currentRound++;
  updateCounter(currentRound);

  console.log('Current round:', currentRound);

  // Sequence generation and display
  const sequenceLength = 2 + (currentRound - 1) * 2;
  sequence = generateSequence(selectedLevel, sequenceLength);

  console.log('sequence:', sequence);

  setTimeout(() => {
    displaySequence(sequence, keys);
  }, 1000);
  // displaySequence(sequence, keys);
}

// The handler clicked on the buttons of the virtual keyboard
function handlerVirtualKeyClick(event) {
  if (isInputBlocked) {
    console.log('Entry from the virtual keyboard is blocked.');
    return;
  }
  const keyValue = event.target.textContent; // Get the text of the button
  wordContainer.value += keyValue; // Add text to the field

  // Backlight the key
  event.target.classList.add('keyboard__letter-key--highlight');
  setTimeout(() => {
    event.target.classList.remove('keyboard__letter-key--highlight');
  }, 300); // Highlight time

  checkUserInput(keyValue); // Check the input
}

// Adding handlers to virtual keys
function addVirtualKeyHandler() {
  if (keysCreated && keys.length > 0) {
    keys.forEach((key) => {
      key.addEventListener('click', handlerVirtualKeyClick);
    });
  }
}

// Remove handlers from virtual keys
function removeVirtualKeyHandler() {
  if (keysCreated && keys.length > 0) {
    keys.forEach((key) => {
      key.removeEventListener('click', handlerVirtualKeyClick);
    });
  }
}

// Handler for physical keyboard events
function handlePhysicalKeydown(event) {
  if (isInputBlocked) {
    console.log('Input from the physical keyboard is blocked.');
    event.preventDefault();
    return;
  }
  const key = keyMapping[event.code];
  if (key && isKeyValid(key, selectedLevel)) {
    wordContainer.value += key.toUpperCase();

    // Find the virtual key and highlight it
    const virtualKey = Array.from(keys).find(
      (k) => k.textContent === key.toUpperCase(),
    );
    if (virtualKey) {
      virtualKey.classList.add('keyboard__letter-key--highlight');
      setTimeout(() => {
        virtualKey.classList.remove('keyboard__letter-key--highlight');
      }, 300);
    }

    checkUserInput(key.toUpperCase());
  } else {
    console.log(`Invalid key for level "${selectedLevel}": ${event.code}`);
  }
}

// Adding a physical keyboard handler
function addPhysicalKeyHandler() {
  document.addEventListener('keydown', handlePhysicalKeydown);
}

// Remove the handler for the physical keyboard
function removePhysicalKeyHandler() {
  document.removeEventListener('keydown', handlePhysicalKeydown);
}

function end(message) {
  console.log(message);
  // Remove handlers
  removeVirtualKeyHandler();
  removePhysicalKeyHandler();

  // removeHandleNextButtonClick();

  // Reset the game
  counterContainer.classList.add('round__container--hidden');
  wordContainer.classList.add('non-editable-input--hidden');
  buttonRepeat.classList.add('button__repeat--hidden');
  buttonNewGame.classList.add('button__new-game--hidden');
  buttonStart.classList.remove('button__start--hidden');

  reset();
  updateCounter(currentRound);
}

function isKeyValid(key, level) {
  if (level === 'easy') {
    return /^[0-9]$/.test(key);
  }
  if (level === 'medium') {
    return /^[a-z]$/.test(key);
  }
  if (level === 'hard') {
    return /^[a-z0-9]$/.test(key);
  }
  return false;
}

function reset() {
  userInputIndex = 0;
  wordContainer.value = '';
  sequence = [];
}

buttonNewGame.addEventListener('click', () => {
  currentRound = 0; // Reset the round
  end('Game restarted by user.'); // End the current game
  buttonNext.classList.add('button__next--hidden');
});

export function disableNewGameButton() {
  buttonNewGame.classList.add('button__new-game--disabled');
  buttonNewGame.disabled = true;
}

export function enableNewGameButton() {
  buttonNewGame.classList.remove('button__new-game--disabled');
  buttonNewGame.disabled = false;
}

export function disableRepeatButton() {
  buttonRepeat.classList.add('button__repeat--disabled');
  buttonRepeat.disabled = true;
}

export function enableRepeatButton() {
  buttonRepeat.classList.remove('button__repeat--disabled');
  buttonRepeat.disabled = false;
}

function resetInputHighlighting() {
  wordContainer.classList.remove('non-editable-input--correct');
  wordContainer.classList.remove('non-editable-input--error');
}

function handleNextButtonClick() {
  buttonNext.classList.add('button__next--hidden');
  buttonRepeat.classList.remove('button__repeat--hidden');
  startGame();
}

function addHandleNextButtonClick() {
  buttonNext.addEventListener('click', handleNextButtonClick);
}

function removeHandleNextButtonClick() {
  buttonNext.removeEventListener('click', handleNextButtonClick);
}

addHandleNextButtonClick();

function handleRepeatButtonClick() {
  isRepeatedSequence = true;
  // incorrectAttempts = 0;
  wordContainer.value = '';
  userInputIndex = 0;
  displaySequence(sequence, keys);
  disableRepeatButton(); // Make the button inactive
}

buttonRepeat.addEventListener('click', handleRepeatButtonClick);
