import moment from 'moment';

import AbstractComponent from '../abstract-component.js';

import {PageGlobalSetting, getDurationFilmFromMinutes} from '../../util.js';

export default class FilmCard extends AbstractComponent {
  constructor({comments, filmInfo, userDetails}) {
    super();
    this._title = filmInfo.title;
    this._totalRating = filmInfo.totalRating;
    this._date = filmInfo.release.date;
    this._runtime = filmInfo.runtime;
    this._genre = filmInfo.genre;
    this._poster = filmInfo.poster;
    this._description = filmInfo.description;
    this._comments = comments;
    this._watchlist = userDetails.watchlist;
    this._alreadyWatched = userDetails.alreadyWatched;
    this._favorite = userDetails.favorite;
  }

  getTemplate() {
    return `<article class="film-card">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${moment(this._date).format(`YYYY`)}</span>
        <span class="film-card__duration">${getDurationFilmFromMinutes(this._runtime)}</span>
        <span class="film-card__genre">${this._genre[0] || ``}</span>
      </p>
      <img src="${this._poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${this._description.length > PageGlobalSetting.FILM_CARD_DESCRIPTION_EXCESS_LENGTH ? this._description.slice(0, PageGlobalSetting.FILM_CARD_DESCRIPTION_LENGTH) + `...` : this._description}</p>
      <a class="film-card__comments">${this._comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._watchlist ? `film-card__controls-item--active` : ``}" data-control-type="watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._alreadyWatched ? `film-card__controls-item--active` : ``}" data-control-type="watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${this._favorite ? `film-card__controls-item--active` : ``}" data-control-type="favorite">Mark as favorite</button>
      </form>
    </article>`;
  }
}
