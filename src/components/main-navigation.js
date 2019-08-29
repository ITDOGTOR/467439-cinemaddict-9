import {createElement, unrenderElement} from '../util.js';

export default class MainNavigation {
  constructor() {
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
    return `<nav class="main-navigation">
    </nav>`;
  }
}
