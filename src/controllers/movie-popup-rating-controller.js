import FilmPopupRating from '../components/film-popup-rating.js';
import FilmPopupUserRating from '../components/film-popup-user-rating.js';

import {renderElement} from '../util.js';

export default class MoviePopupRatingController {
  constructor(container, userRatingContainer, filmData, onDataChange, onControlWatchedChange) {
    this._container = container;
    this._userRatingContainer = userRatingContainer;
    this._filmData = filmData;
    this._onDataChange = onDataChange;
    this._onControlWatchedChange = onControlWatchedChange;

    this._filmPopupRating = new FilmPopupRating(this._filmData);
    this._filmPopupUserRating = new FilmPopupUserRating(this._filmData);

    this._init();
  }

  removeUserRating() {
    [...this._filmPopupRating.getElement().querySelectorAll(`.film-details__user-rating-input`)].forEach((element) => {
      element.checked = false;
    });

    this._filmPopupUserRating.removeElement();
  }

  _init() {
    renderElement(this._container, this._filmPopupRating.getElement());

    if (this._filmData.userRating !== null) {
      renderElement(this._userRatingContainer, this._filmPopupUserRating.getElement());
    }

    this._filmPopupRating.getElement().addEventListener(`click`, this._onRatingSelect.bind(this));
    this._filmPopupRating.getElement().querySelector(`.film-details__watched-reset`).addEventListener(`click`, this._onUndoButtonClick.bind(this));
  }

  _setUserRating(valueRating) {
    const updatedFilmData = this._filmData;

    if (valueRating !== null) {
      updatedFilmData.userRating = parseInt(valueRating, 10);
      this._renderUserRating(updatedFilmData);
    } else {
      updatedFilmData.userRating = valueRating;
    }

    this._onDataChange(updatedFilmData, this._filmData);
  }

  _renderUserRating(filmData) {
    if (this._userRatingContainer.contains(this._filmPopupUserRating.getElement())) {
      this._filmPopupUserRating.removeElement();
    }

    this._filmPopupUserRating = new FilmPopupUserRating(filmData);
    renderElement(this._userRatingContainer, this._filmPopupUserRating.getElement());
  }

  _onRatingSelect(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    this._setUserRating(evt.target.value);
  }

  _onUndoButtonClick(evt) {
    evt.preventDefault();

    [...this._filmPopupRating.getElement().querySelectorAll(`.film-details__user-rating-input`)].forEach((element) => {
      element.checked = false;
    });

    this._setUserRating(null);
    this._onControlWatchedChange();
    this._filmPopupUserRating.removeElement();
  }
}
