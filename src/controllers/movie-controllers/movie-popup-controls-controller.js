import API from '../../api/api.js';

import FilmPopupControls from '../../components/film/film-popup-controls.js';

import {PageGlobalSetting, renderElement} from '../../util.js';

export default class MoviePopupControlsController {
  constructor(container, filmData, onDataChange) {
    this._container = container;
    this._filmData = filmData;
    this._onDataChange = onDataChange;

    this._api = new API({endPoint: PageGlobalSetting.END_POINT, authorization: PageGlobalSetting.AUTHORIZATION});

    this._filmPopupControls = new FilmPopupControls(this._filmData.userDetails);

    this._init();
  }

  updateView(updatedFilmData) {
    this._filmPopupControls.removeElement();

    this._filmData = updatedFilmData;
    this._filmPopupControls = new FilmPopupControls(this._filmData.userDetails);

    this._init();
  }

  _init() {
    renderElement(this._container, this._filmPopupControls.getElement());
    this._filmPopupControls.getElement().addEventListener(`change`, this._onPopupControlsClick.bind(this));
  }

  _onPopupControlsClick(evt) {
    const updatedFilmData = {
      'watchlist': () => {
        this._filmData.userDetails.watchlist = evt.target.checked;
        return this._filmData;
      },
      'watched': () => {
        this._filmData.userDetails.alreadyWatched = evt.target.checked;

        if (!this._filmData.userDetails.alreadyWatched) {
          this._filmData.userDetails.personalRating = 0;
        }

        return this._filmData;
      },
      'favorite': () => {
        this._filmData.userDetails.favorite = evt.target.checked;
        return this._filmData;
      }
    };

    this._onDataChange(`update`, updatedFilmData[evt.target.id](), `popup`);

    // Создать или удалить блок рейтинга в зависимости от кнопки Просмотренные
    if (!this._filmData.userDetails.alreadyWatched) {
      this._onDataChange(`delete-rating`, this._filmData, ``);
    } else {
      this._onDataChange(`update-rating`, this._filmData, ``);
    }
  }
}
