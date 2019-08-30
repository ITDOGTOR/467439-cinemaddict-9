import AbstractComponent from '../components/abstract-component.js';

export default class Filter extends AbstractComponent {
  constructor({id, title, count}) {
    super();
    this._id = id;
    this._title = title;
    this._count = count;
  }

  getTemplate() {
    return `<a href="#${this._id}" class="main-navigation__item ${this._id === `all` ? `main-navigation__item--active` : ``} ${this._title === `Stats` ? `main-navigation__item--additional` : ``}">${this._title} ${!this._count ? `` : `<span class="main-navigation__item-count">${this._count}</span>`}</a>`;
  }
}
