import SearchResult from '../../components/search/search-result.js';

import {Position, renderElement} from '../../util.js';

export default class SearchResultController {
  constructor(container) {
    this._container = container;

    this._filmsFound = [];

    this._searchResult = new SearchResult(this._filmsFound);
  }

  show(filmsFound) {
    this._searchResult.removeElement();

    this._filmsFound = filmsFound;
    this._init(filmsFound);
  }

  hide() {
    this._searchResult.removeElement();
  }

  _init(filmsData) {
    this._searchResult = new SearchResult(filmsData);

    renderElement(this._container, this._searchResult.getElement(), Position.AFTERBEGIN);
  }
}
