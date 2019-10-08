import AbstractComponent from '../abstract-component.js';

export default class SearchResult extends AbstractComponent {
  constructor(filmsFound) {
    super();
    this._filmsFound = filmsFound;
  }

  getTemplate() {
    return `<div class="result">
      <p class="result__text">Result <span class="result__count">${this._filmsFound.length}</span></p>
    </div>`;
  }
}
