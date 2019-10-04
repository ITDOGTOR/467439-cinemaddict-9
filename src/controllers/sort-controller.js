import moment from 'moment';

import Sort from '../components/sort.js';

import {renderElement, removeActiveClassElements} from '../util.js';

export default class SortController {
  constructor(container, filmsData, onSortDataChange) {
    this._container = container;
    this._filmsData = filmsData;
    this._onSortDataChange = onSortDataChange;

    this._sort = new Sort();

    this._init();
  }

  setDefaultView() {
    removeActiveClassElements(this._sort, `sort__button`, true);
  }

  _init() {
    renderElement(this._container, this._sort.getElement());
    this._sort.getElement().addEventListener(`click`, this._onSortLinkClick.bind(this));
  }

  _sortFilms(filmsData, sortName) {
    switch (sortName) {
      case `default`:
        this._onSortDataChange(filmsData);
        break;
      case `date`:
        this._onSortDataChange(filmsData.slice().sort((a, b) => moment(b.releaseDate).format(`YYYY`) - moment(a.releaseDate).format(`YYYY`)));
        break;
      case `rating`:
        this._onSortDataChange(filmsData.slice().sort((a, b) => b.rating - a.rating));
        break;
    }
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    const filterName = this._container.querySelector(`.main-navigation__item.main-navigation__item--active`).href.split(`#`)[1];

    if (!(evt.target.classList.contains(`sort__button--active`))) {
      removeActiveClassElements(this._sort, `sort__button`);
      evt.target.classList.add(`sort__button--active`);

      switch (filterName) {
        case `all`:
          this._sortFilms(this._filmsData, evt.target.dataset.sortType);
          break;
        case `watchlist`:
          this._sortFilms(this._filmsData.slice().filter((filmData) => filmData.inWatchlist), evt.target.dataset.sortType);
          break;
        case `history`:
          this._sortFilms(this._filmsData.slice().filter((filmData) => filmData.isWatched), evt.target.dataset.sortType);
          break;
        case `favorites`:
          this._sortFilms(this._filmsData.slice().filter((filmData) => filmData.isFavorite), evt.target.dataset.sortType);
          break;
      }
    }
  }
}
