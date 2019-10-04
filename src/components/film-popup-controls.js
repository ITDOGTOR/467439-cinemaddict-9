import AbstractComponent from '../components/abstract-component.js';

export default class FilmPopupControls extends AbstractComponent {
  constructor({inWatchlist, isWatched, isFavorite}) {
    super();
    this._inWatchlist = inWatchlist;
    this._isWatched = isWatched;
    this._isFavorite = isFavorite;
  }

  getTemplate() {
    return `<section class="film-details__controls">
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._inWatchlist ? `checked` : ``}>
      <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._isWatched ? `checked` : ``}>
      <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._isFavorite ? `checked` : ``}>
      <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
    </section>`;
  }
}
