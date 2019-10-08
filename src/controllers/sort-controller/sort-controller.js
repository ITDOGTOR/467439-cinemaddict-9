import Sort from '../../components/sort/sort.js';

import {Position, removeActiveClassElements, renderElement} from '../../util.js';

export default class SortController {
  constructor(container, filmsData, onSortEvent) {
    this._container = container;
    this._filmsData = filmsData;
    this._onSortEvent = onSortEvent;

    this._lastSortType = `default`;

    this._sort = new Sort();

    this._init();
  }

  show() {
    this.updateView(this._filmsData);
  }

  hide() {
    this._sort.removeElement();
  }

  updateView(updatedFilmsData) {
    this._sort.removeElement();

    this._filmsData = updatedFilmsData;
    this._sort = new Sort();

    removeActiveClassElements(this._sort, `sort__button`);
    this._sort.getElement().querySelector(`[data-sort-type="${this._lastSortType}"]`).classList.add(`sort__button--active`);

    this._init();
  }

  _init() {
    renderElement(this._container, this._sort.getElement(), Position.AFTERBEGIN);
    this._sort.getElement().addEventListener(`click`, this._onSortClick.bind(this));
  }

  _onSortClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    if (!(evt.target.classList.contains(`sort__button--active`))) {
      removeActiveClassElements(this._sort, `sort__button`);
      evt.target.classList.add(`sort__button--active`);

      const getSortType = {
        'default': () => {
          this._lastSortType = `default`;
          return this._lastSortType;
        },
        'date': () => {
          this._lastSortType = `date`;
          return this._lastSortType;
        },
        'rating': () => {
          this._lastSortType = `rating`;
          return this._lastSortType;
        }
      };

      this._onSortEvent(getSortType[evt.target.dataset.sortType]());
    }
  }
}
