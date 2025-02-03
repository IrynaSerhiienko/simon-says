import {
  body,
  overlay,
  modalWindow,
  currentRound,
  gameResult,
  closeModalButton,
  imageModalGifContainer,
  imageModalGif,
} from './components.js';

export function createModal(parameters) {
  const { text, round = '', gifSrc = '' } = parameters;
  currentRound.textContent = round;
  gameResult.textContent = text;

  body.appendChild(overlay);
  overlay.appendChild(modalWindow);
  modalWindow.append(currentRound, gameResult, closeModalButton);

  if (gifSrc) {
    imageModalGif.src = gifSrc;
    imageModalGifContainer.appendChild(imageModalGif);
    modalWindow.appendChild(imageModalGifContainer);
  }

  overlay.addEventListener('click', handlerOverlay);
  document.addEventListener('keydown', handlerEscapeKey);
  closeModalButton.addEventListener('click', handlerCloseModalButton);
}

function handlerOverlay(event) {
  if (
    !modalWindow.contains(event.target) &&
    !event.target.classList.contains('modal__button--close')
  ) {
    closeModal();
  }
}

function handlerCloseModalButton() {
  closeModal();
}

function handlerEscapeKey(event) {
  if (event.key === 'Escape' && overlay.style.display !== 'none') {
    closeModal();
  }
}

function closeModal() {
  body.removeChild(overlay);
  overlay.removeEventListener('click', handlerOverlay);
  closeModalButton.removeEventListener('click', handlerCloseModalButton);
  document.removeEventListener('keydown', handlerEscapeKey);
  body.style.overflow = 'auto';
}
