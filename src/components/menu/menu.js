import AbstractComponent from '../abstract-component.js';

export default class Menu extends AbstractComponent {
  constructor({watchlist, alreadyWatched, favorite}) {
    super();
    this._watchlist = watchlist;
    this._alreadyWatched = alreadyWatched;
    this._favorite = favorite;
  }

  getTemplate() {
    return `<nav class="main-navigation">
      <a href="#all" data-menu-item="all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" data-menu-item="watchlist" class="main-navigation__item">Watchlist
      <span class="main-navigation__item-count">${this._watchlist}</span></a>
      <a href="#history" data-menu-item="history" class="main-navigation__item">History
      <span class="main-navigation__item-count">${this._alreadyWatched}</span></a>
      <a href="#favorites" data-menu-item="favorites" class="main-navigation__item">Favorites
      <span class="main-navigation__item-count">${this._favorite}</span></a>
      <a href="#stats" data-menu-item="stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`;
  }
}
