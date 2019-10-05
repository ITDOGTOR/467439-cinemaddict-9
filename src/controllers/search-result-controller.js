import SearchResult from '../components/search-result.js';

import {Position, renderElement} from '../util.js';

export default class SearchResultController {
  constructor(container, filmsFound) {
    this._container = container;
    this._filmsFound = filmsFound;

    this._searchResult = new SearchResult(this._filmsFound);
  }

  show(filmsFound) {
    this._filmsFound = filmsFound;

    this._searchResult.removeElement();
    this._renderResult(filmsFound);
  }

  hide() {
    this._searchResult.removeElement();
  }

  _renderResult(filmsData) {
    this._searchResult = new SearchResult(filmsData);

    renderElement(this._container, this._searchResult.getElement(), Position.AFTERBEGIN);
  }
}
