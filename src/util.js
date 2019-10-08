import moment from 'moment';

export const Key = {
  ESCAPE_IE: `Escape`,
  ESCAPE: `Esc`,
  ENTER: `Enter`,
};

export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

export const PageGlobalSetting = {
  AUTHORIZATION: `Basic frg88a9dZgfwjHdKvLcsO46=${Math.random()}`,
  END_POINT: `https://htmlacademy-es-9.appspot.com/cinemaddict`,
  COMMENT_EMOTIONS: [`smile`, `sleeping`, `puke`, `angry`],
  STATISTIC_FILTERS: [`all-time`, `today`, `week`, `month`, `year`],
  FILM_CARD_DESCRIPTION_LENGTH: 139,
  FILM_CARD_DESCRIPTION_EXCESS_LENGTH: 140,
  SYMBOLS_COUNT_TO_SEARCH: 2,
  RENDER: 5,
  EXTRA_RENDER: 2,
  PERSONAL_RATING_POINTS: {
    START: 1,
    END: 9
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const renderElement = (container, element, place = Position.BEFOREEND) => {
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

export const unrenderElement = (element) => {
  if (element) {
    element.remove();
  }
};

export const removeActiveClassElements = (element, className, defaultState = false, noGetElement = false) => {
  if (noGetElement) {
    [...element.querySelectorAll(`.${className}`)].forEach((item) => item.classList.remove(`${className}--active`));

    element.querySelectorAll(`.${className}`)[0].classList.add(`${className}--active`);
    return;
  }

  [...element.getElement().querySelectorAll(`.${className}`)].forEach((item) => item.classList.remove(`${className}--active`));

  if (defaultState) {
    element.getElement().querySelectorAll(`.${className}`)[0].classList.add(`${className}--active`);
  }
};

export const getUserRank = (filmsData) => {
  const watchedFilmsList = filmsData.filter(({userDetails}) => userDetails.alreadyWatched).length;

  if (watchedFilmsList === 0) {
    return ``;
  }
  if (watchedFilmsList <= 10) {
    return `Novice`;
  }
  if (watchedFilmsList <= 20) {
    return `Fan`;
  }
  if (watchedFilmsList >= 21) {
    return `Movie Buff`;
  }

  return `undefined`;
};

export const getDurationFilmFromMinutes = (timeInMinutes, time = `all`) => {
  const hours = Math.trunc(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;

  if (time === `hours`) {
    return hours;
  }

  if (time === `minutes`) {
    return minutes;
  }

  return `${hours}h ${minutes}m`;
};

export const getGenresCount = (filmsWatched) => {
  const genres = !filmsWatched.length ? {0: 0} : filmsWatched
    .map((film) => film.filmInfo.genre).reduce((acc, genre) => acc.concat(genre))
      .map((name) => {
        return {
          count: 1,
          name,
        };
      }).reduce((acc, genre) => {
        acc[genre.name] = (acc[genre.name] || 0) + genre.count;
        return acc;
      }, {});

  return genres;
};

export const getSortedFilmsData = (filmsData, sortType) => {
  const sortedFilmsList = {
    'default': () => filmsData,
    'date': () => filmsData.slice().sort((a, b) => moment(b.filmInfo.release.date) -
      moment(a.filmInfo.release.date)),
    'rating': () => filmsData.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating)
  };

  return sortedFilmsList[sortType]();
};

export const getFilteredFilmsData = (filmsData, filterType) => {
  const filteredFilmsList = {
    'all': () => filmsData,
    'watchlist': () => filmsData.filter(({userDetails}) => userDetails.watchlist),
    'history': () => filmsData.filter(({userDetails}) => userDetails.alreadyWatched),
    'favorites': () => filmsData.filter(({userDetails}) => userDetails.favorite),
    'stats': () => filmsData
  };

  return filteredFilmsList[filterType]();
};
