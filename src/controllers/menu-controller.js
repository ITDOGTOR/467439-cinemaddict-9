import Menu from '../components/menu.js';

import {renderElement, removeActiveClassElements} from '../util.js';

export default class MenuController {
  constructor(container, filmsData) {
    this._container = container;
    this._filmsData = filmsData;

    this._menu = new Menu(this._getFiltersCount(this._filmsData));

    this._init();
  }

  _init() {
    renderElement(this._container, this._menu.getElement());
    this._menu.getElement().addEventListener(`click`, this._onMenuClick.bind(this));
  }

  _getFiltersCount(filmsData) {
    const calculateFiltersCount = (films, mode) => {
      let result = null;

      switch (mode) {
        case `watchlist`:
          result = films.filter((film) => film.inWatchlist).length;
          break;
        case `history`:
          result = films.filter((film) => film.isWatched).length;
          break;
        case `favorite`:
          result = films.filter((film) => film.isFavorite).length;
          break;
      }

      return result;
    };

    return {
      watchCount: calculateFiltersCount(filmsData, `watchlist`),
      watchedCount: calculateFiltersCount(filmsData, `history`),
      favoriteCount: calculateFiltersCount(filmsData, `favorite`),
    };
  }

  _onMenuClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    if (!(evt.target.classList.contains(`main-navigation__item--active`))) {
      removeActiveClassElements(this._menu, `main-navigation__item`);
      evt.target.classList.add(`main-navigation__item--active`);
    }
  }
}
