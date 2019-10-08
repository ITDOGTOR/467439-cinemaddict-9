import API from '../../api/api.js';

import FilmPopup from '../../components/film/film-popup.js';

import MoviePopupControlsController from './movie-popup-controls-controller.js';
import MoviePopupRatingController from './movie-popup-rating-controller.js';
import MoviePopupCommentsController from './movie-popup-comments-controller.js';

import {Key, PageGlobalSetting, renderElement} from '../../util.js';

export default class MoviePopupController {
  constructor(container, filmData, onDataChange) {
    this._container = container;
    this._filmData = filmData;
    this._onDataChange = onDataChange;

    this._api = new API({endPoint: PageGlobalSetting.END_POINT, authorization: PageGlobalSetting.AUTHORIZATION});

    this._filmPopup = new FilmPopup(this._filmData);
    this._userRatingContainer = this._filmPopup.getElement().querySelector(`.film-details__rating`);

    this._moviePopupControlsController = new MoviePopupControlsController(this._filmPopup.getElement().querySelector(`.form-details__top-container`), this._filmData, this._onDataChange);

    this._moviePopupRatingRatingController = new MoviePopupRatingController(this._filmPopup.getElement().querySelector(`.form-details__middle-container`), this._userRatingContainer, this._filmData, this._onDataChange);

    this._moviePopupCommentsController = new MoviePopupCommentsController(this._filmPopup.getElement().querySelector(`.film-details__inner`), this._filmData.id, this._onDataChange, this._onFocusEvent.bind(this));

    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._init();
  }

  updateControls(updatedFilmData) {
    this._moviePopupControlsController.updateView(updatedFilmData);
  }

  updateUserRating(updatedFilmData) {
    this._moviePopupRatingRatingController.updateView(updatedFilmData);
  }

  deleteUserRating() {
    this._moviePopupRatingRatingController.deleteView();
  }

  updateComments(updatedCommentsData) {
    this._moviePopupCommentsController.updateView(updatedCommentsData);
  }

  _init() {
    renderElement(this._container, this._filmPopup.getElement());

    document.addEventListener(`keydown`, this._onEscKeyDown);

    this._filmPopup.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
      this._container.classList.remove(`hide-overflow`);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      this._filmPopup.removeElement();
    });

    this._api.getComments(this._filmData.id)
      .then((commentsData) => {
        this._moviePopupCommentsController.updateView(commentsData);
      });
  }

  _onEscKeyDown(evt) {
    if (evt.key === Key.ESCAPE_IE || evt.key === Key.ESCAPE) {
      this._filmPopup.removeElement();
      this._container.classList.remove(`hide-overflow`);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _onFocusEvent(status) {
    if (status) {
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      return;
    }

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }
}
