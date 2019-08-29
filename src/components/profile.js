import {createElement, unrenderElement} from '../util.js';

export default class Profile {
  constructor(rank) {
    this._rank = rank;
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
    return `<section class="header__profile profile">
      <p class="profile__rating">${this._rank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
  }
}
