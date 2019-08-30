import AbstractComponent from '../components/abstract-component.js';

import {MAX_SYMBOLS_DESCRIPTION, PERMISSION_SYMBOLS_DESCRIPTION} from '../constants.js';

export default class FilmCard extends AbstractComponent {
  constructor({title, rating, releaseDate, duration, genres: genre, poster, description, comments, inWatchlist, isWatched, isFavorite}) {
    super();
    this._title = title;
    this._rating = rating;
    this._releaseDate = releaseDate;
    this._duration = duration;
    this._genre = genre;
    this._poster = poster;
    this._description = description;
    this._comments = comments;
    this._inWatchlist = inWatchlist;
    this._isWatched = isWatched;
    this._isFavorite = isFavorite;
  }

  getTemplate() {
    return `<article class="film-card">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${this._releaseDate.substr(-4)}</span>
        <span class="film-card__duration">${this._duration}</span>
        <span class="film-card__genre">${this._genre[0]}</span>
      </p>
      <img src="./images/posters/${this._poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${this._description.length > MAX_SYMBOLS_DESCRIPTION ? this._description.slice(0, PERMISSION_SYMBOLS_DESCRIPTION) + `...` : this._description}</p>
      <a class="film-card__comments">${this._comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._inWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._isWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${this._isFavorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>`;
  }
}
