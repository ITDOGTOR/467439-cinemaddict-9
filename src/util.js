const Key = {
  ESCAPE_IE: `Escape`,
  ESCAPE: `Esc`,
};

const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const renderElement = (container, element, place = Position.BEFOREEND) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
    case Position.AFTEREND:
      container.after(element);
      break;
  }
};

const unrenderElement = (element) => {
  if (element) {
    element.remove();
  }
};

const getRandomInt = ({min, max}) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomArrayElement = (array) => array[Math.floor((Math.random() * array.length) + 0)];
const getRandomArrayElements = (array, elementCount) => array.slice().sort(() => Math.random() - 0.5).slice(0, elementCount);
const getRandomBoolean = () => Boolean(Math.random() > 0.5);

export {getRandomInt, getRandomArrayElement, getRandomArrayElements, getRandomBoolean, createElement, renderElement, unrenderElement, Key, Position};
