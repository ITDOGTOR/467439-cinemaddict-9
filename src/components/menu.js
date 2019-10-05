import AbstractComponent from '../components/abstract-component.js';

export default class Menu extends AbstractComponent {
  constructor({watchCount, watchedCount, favoriteCount}) {
    super();
    this._watchCount = watchCount;
    this._watchedCount = watchedCount;
    this._favoriteCount = favoriteCount;
  }

  getTemplate() {
    return `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist
      <span class="main-navigation__item-count">${this._watchCount}</span></a>
      <a href="#history" class="main-navigation__item">History
      <span class="main-navigation__item-count">${this._watchedCount}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites
      <span class="main-navigation__item-count">${this._favoriteCount}</span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`;
  }
}
