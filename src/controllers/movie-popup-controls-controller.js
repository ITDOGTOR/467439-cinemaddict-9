import FilmPopupControls from '../components/film-popup-controls.js';

import {renderElement} from '../util.js';

export default class MoviePopupControlsController {
  constructor(container, filmData, onDataChange, onControlWatchedChange) {
    this._container = container;
    this._filmData = filmData;
    this._onDataChange = onDataChange;
    this._onControlWatchedChange = onControlWatchedChange;

    this._filmPopupControls = new FilmPopupControls(this._filmData);

    this._init();
  }

  _init() {
    renderElement(this._container, this._filmPopupControls.getElement());
    this._filmPopupControls.getElement().addEventListener(`change`, this._onControlsClick.bind(this));
  }

  _onControlsClick(evt) {
    const updatedFilmData = this._filmData;

    switch (evt.target.id) {
      case `watchlist`:
        updatedFilmData.inWatchlist = evt.target.checked;
        break;
      case `watched`:
        updatedFilmData.isWatched = evt.target.checked;

        if (!updatedFilmData.isWatched) {
          updatedFilmData.userRating = null;
        }

        break;
      case `favorite`:
        updatedFilmData.isFavorite = evt.target.checked;
        break;
    }

    this._onControlWatchedChange(updatedFilmData.isWatched);
    this._onDataChange(updatedFilmData, this._filmData);
  }

  setFalseIsWatched() {
    const updatedFilmData = this._filmData;

    this._filmPopupControls.getElement().querySelector(`#watched`).checked = false;
    updatedFilmData.isWatched = false;
    this._onDataChange(updatedFilmData, this._filmData);
  }
}
