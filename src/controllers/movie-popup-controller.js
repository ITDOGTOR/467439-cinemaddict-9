import FilmPopup from '../components/film-popup.js';

import MoviePopupControlsController from '../controllers/movie-popup-controls-controller.js';
import MoviePopupRatingController from '../controllers/movie-popup-rating-controller.js';
import CommentsController from '../controllers/comments-controller.js';

import {renderElement, Key} from '../util.js';

export default class MoviePopupController {
  constructor(container, filmData, onDataChange, onViewChange) {
    this._container = container;
    this._filmData = filmData;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._filmPopup = new FilmPopup(this._filmData);
    this._userRatingContainer = this._filmPopup.getElement().querySelector(`.film-details__rating`);

    this._moviePopupControlsController = new MoviePopupControlsController(this._filmPopup.getElement().querySelector(`.form-details__top-container`), this._filmData, this._onDataChange, this._onControlWatchedChange.bind(this));

    this._moviePopupRatingRatingController = new MoviePopupRatingController(this._filmPopup.getElement().querySelector(`.form-details__middle-container`), this._userRatingContainer, this._filmData, this._onDataChange, this._onControlWatchedChange.bind(this));

    this._commentsController = new CommentsController(this._filmPopup.getElement().querySelector(`.film-details__inner`), this._filmData, this._onFocusChange.bind(this), this._onDataChange);

    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._init();
  }

  _init() {
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._onViewChange();

    renderElement(this._container, this._filmPopup.getElement());

    this._filmPopup.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
      this._container.classList.remove(`hide-overflow`);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      this._filmPopup.removeElement();
    });
  }

  _onEscKeyDown(evt) {
    if (evt.key === Key.ESCAPE_IE || evt.key === Key.ESCAPE) {
      this._filmPopup.removeElement();
      this._container.classList.remove(`hide-overflow`);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _setDefaultView() {
    if (this._container.contains(this._filmPopup.getElement())) {
      this._filmPopup.removeElement();
    }
  }

  _onControlWatchedChange(watchedStatus = false) {
    if (watchedStatus) {
      this._filmPopup.getElement().querySelector(`.form-details__middle-container`).classList.remove(`visually-hidden`);
      return;
    }

    this._filmPopup.getElement().querySelector(`.form-details__middle-container`).classList.add(`visually-hidden`);
    this._moviePopupControlsController.setFalseIsWatched();
    this._moviePopupRatingRatingController.removeUserRating();
  }

  _onFocusChange(status) {
    if (status) {
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      return;
    }

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }
}
