import Menu from '../components/menu.js';

import {renderElement, removeActiveClassElements, Position} from '../util.js';

export default class MenuController {
  constructor(container, filmsData, onMenuDataChange) {
    this._container = container;
    this._filmsData = filmsData;
    this._onMenuDataChange = onMenuDataChange;

    this._menu = new Menu(this._getFiltersCount(this._filmsData));

    this._init();
  }

  update(updatedFilmsData) {
    this._menu.removeElement();

    this._updateData(updatedFilmsData);
  }

  _updateData(updatedFilmsData) {
    this._filmsData = updatedFilmsData;

    this._updateView(this._filmsData);
  }

  _updateView(updatedFilmsData) {
    this._menu = new Menu(this._getFiltersCount(updatedFilmsData));


    renderElement(this._container, this._menu.getElement(), Position.AFTERBEGIN);
    this._menu.getElement().addEventListener(`click`, this._onMenuClick.bind(this));
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

    this._onMenuDataChange(evt.target.href.split(`#`)[1]);
  }
}
