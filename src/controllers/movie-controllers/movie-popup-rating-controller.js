import FilmPopupRating from '../../components/film/film-popup-rating.js';
import FilmPopupUserRating from '../../components/film/film-popup-user-rating.js';

import {renderElement} from '../../util.js';

export default class MoviePopupRatingController {
  constructor(container, userRatingContainer, filmData, onDataChange) {
    this._container = container;
    this._userRatingContainer = userRatingContainer;
    this._filmData = filmData;
    this._onDataChange = onDataChange;

    this._filmPopupRating = new FilmPopupRating(this._filmData);
    this._filmPopupUserRating = new FilmPopupUserRating(this._filmData);

    this._init();
  }

  updateView(updatedFilmData) {
    this._filmPopupRating.removeElement();
    this._filmPopupUserRating.removeElement();

    this._filmData = updatedFilmData;
    this._filmPopupRating = new FilmPopupRating(this._filmData);

    this._init();
  }

  deleteView() {
    this._filmPopupRating.removeElement();
    this._filmPopupUserRating.removeElement();
  }


  block() {
    this._filmPopupRating.getElement().style.opacity = `0.1`;
    this._filmPopupRating.getElement().querySelectorAll(`.film-details__user-rating-input`).disabled = true;
  }

  unblock() {
    this._filmPopupRating.getElement().style.opacity = `1`;
    this._filmPopupRating.getElement().querySelectorAll(`.film-details__user-rating-input`).disabled = false;
  }

  onError(filmData) {
    this.updateView(filmData);
    this._filmPopupRating.getElement().style.animation = `shake ${600 / 1000}s`;
  }

  _init() {
    if (this._filmData.userDetails.alreadyWatched) {
      renderElement(this._container, this._filmPopupRating.getElement());
    }

    if (this._filmData.userDetails.personalRating !== 0) {
      renderElement(this._userRatingContainer, this._filmPopupUserRating.getElement());
    }

    this._filmPopupRating.getElement().addEventListener(`change`, this._onRatingSelect.bind(this));
    this._filmPopupRating.getElement().querySelector(`.film-details__watched-reset`).addEventListener(`click`, this._onUndoButtonClick.bind(this));
  }

  _renderUserRating(filmData) {
    if (this._userRatingContainer.contains(this._filmPopupUserRating.getElement())) {
      this._filmPopupUserRating.removeElement();
    }

    this._filmPopupUserRating = new FilmPopupUserRating(filmData);
    renderElement(this._userRatingContainer, this._filmPopupUserRating.getElement());
  }

  _onRatingSelect(evt) {
    const valueRating = parseInt(evt.target.value, 10);

    if (valueRating !== 0) {
      this._filmData.userDetails.personalRating = valueRating;
      this._renderUserRating(this._filmData);
    } else {
      this._filmData.userDetails.personalRating = 0;
    }

    this._onDataChange(`update-rating`, this._filmData, ``);
    this.block();
  }

  _onUndoButtonClick(evt) {
    evt.preventDefault();

    this._filmData.userDetails.personalRating = 0;
    this._filmData.userDetails.alreadyWatched = false;

    this._onDataChange(`delete-rating`, this._filmData, ``);
    this.block();
    document.querySelector(`#watched`).checked = false;
  }
}
