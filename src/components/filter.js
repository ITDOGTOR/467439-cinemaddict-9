import {createElement, unrenderElement} from '../util.js';

export default class Filter {
  constructor({id, title, count}) {
    this._id = id;
    this._title = title;
    this._count = count;
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
    return `<a href="#${this._id}" class="main-navigation__item ${this._id === `all` ? `main-navigation__item--active` : ``} ${this._title === `Stats` ? `main-navigation__item--additional` : ``}">${this._title} ${!this._count ? `` : `<span class="main-navigation__item-count">${this._count}</span>`}</a>`;
  }
}
