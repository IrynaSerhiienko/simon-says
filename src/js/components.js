import { createElement, createInput, createAudio, createImage } from './ui.js';

export const body = document.body;
body.classList.add('body');

export const limitingContainer = createElement({
  classes: ['limiting-container'],
});

export const mainContainer = createElement({
  tag: 'section',
  classes: ['main-container'],
});

export const gameName = createElement({
  tag: 'h1',
  classes: ['title'],
  text: 'Simon Says',
});

export const levelCounterContainer = createElement({
  classes: ['level-counter-container'],
});

export const levelContainer = createElement({
  classes: ['level__level-container'],
});

export const counterContainer = createElement({
  classes: ['round__container', 'round__container--hidden'],
});

export const counterTitle = createElement({
  tag: 'p',
  classes: ['round__round-title'],
  text: 'round',
});

export const counter = createElement({
  classes: ['round__counter'],
});

export const currentCounter = createElement({
  classes: ['round__current-counter'],
});

export const totalCounter = createElement({
  classes: ['round__total-counter'],
});

export const wordContainer = createInput({
  type: 'text',
  placeholder: '',
  classes: ['non-editable-input', 'non-editable-input--hidden'],
  disabled: true,
});

export const buttonsContainer = createElement({
  classes: ['button__container'],
});

export const buttonStart = createElement({
  tag: 'button',
  classes: ['button__start'],
  text: 'Start',
});

export const buttonRepeat = createElement({
  tag: 'button',
  classes: ['button__repeat', 'button__repeat--hidden'],
  text: 'Repeat the sequence',
});

export const buttonNewGame = createElement({
  tag: 'button',
  classes: ['button__new-game', 'button__new-game--hidden'],
  text: 'New game',
});

export const buttonNext = createElement({
  tag: 'button',
  classes: ['button__next', 'button__next--hidden'],
  text: 'Next',
});

export const keyboardContainer = createElement({
  classes: ['keyboard__keyboard-container'],
});

export const numberContainer = createElement({
  classes: ['keyboard__number-container'],
});

export const letterContainer = createElement({
  classes: ['keyboard__letter-container'],
});

export const overlay = createElement({
  classes: ['modal__overlay'],
});

export const modalWindow = createElement({
  classes: ['modal__modal-window'],
});

export const gameResult = createElement({
  tag: 'p',
  classes: ['modal__game-result'],
});

export const currentRound = createElement({
  tag: 'span',
  classes: ['modal__round'],
});

export const closeModalButton = createElement({
  classes: ['modal__button--close'],
  text: 'X',
});

export const audioKeyWrongClick = createAudio({
  src: './src/assets/audio/key-wrong.mp3',
});

export const audioKeyClick = createAudio({
  src: './src/assets/audio/key-click.mp3',
});

export const audioWin = createAudio({
  src: './src/assets/audio/win.mp3',
});

export const audioGameOver = createAudio({
  src: './src/assets/audio/game-over.mp3',
});

export const audioRoundCorrect = createAudio({
  src: './src/assets/audio/round-correct.mp3',
});

export const imageModalGifContainer = createElement({
  classes: ['modal__gif-container'],
});

export const imageModalGif = createImage({
  classes: ['modal__gif'],
});
