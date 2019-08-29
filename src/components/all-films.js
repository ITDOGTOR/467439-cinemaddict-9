import {createElement, unrenderElement} from '../util.js';

export default class AllFilms {
  constructor(filmsCount) {
    this._filmsCount = filmsCount;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    unrenderElement(this._element);
    this._element = null;
  }

  getTemplate() {
    return `<section class="footer__statistics">
      <p>${this._filmsCount} movies inside</p>
    </section>`;
  }
}
