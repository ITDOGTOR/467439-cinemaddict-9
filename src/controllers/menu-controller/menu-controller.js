import Menu from '../../components/menu/menu.js';

import {Position, removeActiveClassElements, renderElement} from '../../util.js';

export default class MenuController {
  constructor(container, filmsData, onMenuEvent) {
    this._container = container;
    this._filmsData = filmsData;
    this._onMenuEvent = onMenuEvent;

    this._lastActiveMenuItem = `all`;

    this._menu = new Menu(this._getFiltersCount(this._filmsData));

    this._init();
  }

  show() {
    this.updateView(this._filmsData);
  }

  hide() {
    this._menu.removeElement();
  }

  updateView(updatedFilmsData) {
    this._menu.removeElement();

    this._filmsData = updatedFilmsData;
    this._menu = new Menu(this._getFiltersCount(updatedFilmsData));

    removeActiveClassElements(this._menu, `main-navigation__item`);
    this._menu.getElement().querySelector(`[data-menu-item="${this._lastActiveMenuItem}"]`).classList.add(`main-navigation__item--active`);

    this._init();
  }

  _init() {
    renderElement(this._container, this._menu.getElement(), Position.AFTERBEGIN);
    this._menu.getElement().addEventListener(`click`, this._onMenuFiltersEvent.bind(this));
  }

  _getFiltersCount(filmsData) {
    const calculateFiltersCount = (films, filter) => {
      const filterFilmsList = {
        'watchlist': () => films.filter(({userDetails}) => userDetails.watchlist).length,
        'history': () => films.filter(({userDetails}) => userDetails.alreadyWatched).length,
        'favorite': () => films.filter(({userDetails}) => userDetails.favorite).length
      };

      return filterFilmsList[filter]();
    };

    return {
      watchlist: calculateFiltersCount(filmsData, `watchlist`),
      alreadyWatched: calculateFiltersCount(filmsData, `history`),
      favorite: calculateFiltersCount(filmsData, `favorite`),
    };
  }

  _onMenuFiltersEvent(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    if (!(evt.target.classList.contains(`main-navigation__item--active`))) {
      removeActiveClassElements(this._menu, `main-navigation__item`);
      evt.target.classList.add(`main-navigation__item--active`);

      this._lastActiveMenuItem = evt.target.dataset.menuItem === `stats` ? `all` : evt.target.dataset.menuItem;
      this._onMenuEvent(evt.target.dataset.menuItem);
    }
  }
}
