export function createElement(parameters = {}) {
  const { tag = 'div', classes = [], id = '', text = '' } = parameters;

  const element = document.createElement(tag);
  element.id = id;
  if (classes.length) {
    element.classList.add(...classes);
  }
  element.textContent = text;

  return element;
}

export function createInput(parameters = {}) {
  const {
    type = 'text',
    value = '',
    placeholder = '',
    name = '',
    checked = false,
    disabled = false,
    ...rest
  } = parameters;
  const input = createElement({ tag: 'input', ...rest });

  input.type = type;
  input.value = value;
  input.placeholder = placeholder;
  input.checked = checked;
  input.name = name;

  if (disabled) {
    input.disabled = true;
  }

  return input;
}

export function createImage(parameters = {}) {
  const { src = '', alt = 'image', ...rest } = parameters;
  const img = createElement({ tag: 'img', ...rest });

  img.src = src;
  img.alt = alt;

  return img;
}

export function createAudio(parameters = {}) {
  const { autoplay = false, src, ...rest } = parameters;
  const audio = createElement({ tag: 'audio', ...rest });

  audio.setAttribute('autoplay', '');

  const source = document.createElement('source');
  source.src = src;
  source.type = 'audio/mp3';
  audio.appendChild(source);

  return audio;
}
