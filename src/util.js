const Key = {
  ESCAPE_IE: `Escape`,
  ESCAPE: `Esc`,
  ENTER: `Enter`,
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

const removeActiveClassElements = (element, className, defaultState = false) => {
  [...element.getElement().querySelectorAll(`.${className}`)].forEach((item) => item.classList.remove(`${className}--active`));

  if (defaultState) {
    element.getElement().querySelectorAll(`.${className}`)[0].classList.add(`${className}--active`);
  }
};

const getRankUser = (filmsData) => {
  const watchedFilms = filmsData.filter((filmData) => filmData.isWatched).length;

  if (watchedFilms === 0) {
    return ``;
  }
  if (watchedFilms <= 10) {
    return `Novice`;
  }
  if (watchedFilms <= 20) {
    return `Fan`;
  }
  if (watchedFilms >= 21) {
    return `Movie Buff`;
  }

  return `undefined`;
};

const getRandomInt = ({min, max}) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomArrayElement = (array) => array[Math.floor((Math.random() * array.length) + 0)];
const getRandomArrayElements = (array, elementCount) => array.slice().sort(() => Math.random() - 0.5).slice(0, elementCount);
const getRandomDate = () => Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000;
const getRandomBoolean = () => Boolean(Math.random() > 0.5);

export {getRandomInt, getRandomArrayElement, getRandomArrayElements, getRandomDate, getRandomBoolean, createElement, renderElement, unrenderElement, removeActiveClassElements, getRankUser, Key, Position};
