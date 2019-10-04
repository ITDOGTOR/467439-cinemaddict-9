import FilmCard from '../components/film-card.js';

import MoviePopupController from '../controllers/movie-popup-controller.js';

import {renderElement} from '../util.js';

export default class MovieController {
  constructor(container, filmData, onDataChange, onViewChange, subscriptions) {
    this._container = container;
    this._containerForPopup = document.querySelector(`body`);
    this._filmData = filmData;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._subscription = subscriptions;

    this._filmCard = new FilmCard(this._filmData);

    this._moviePopupController = null;
  }

  init() {
    renderElement(this._container, this._filmCard.getElement());

    [...this._filmCard.getElement().querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`)].forEach((element) => element.addEventListener(`click`, () => {
      this._containerForPopup.classList.add(`hide-overflow`);
      this._moviePopupController = new MoviePopupController(this._containerForPopup, this._filmData, this._onDataChange, this._onViewChange);
      this._subscription.push(this._moviePopupController._setDefaultView.bind(this._moviePopupController)); // ! Временное решение
    }));

    this._filmCard.getElement().querySelector(`.film-card__controls`).addEventListener(`click`, this._onFilmControlsClick.bind(this));
  }

  _onFilmControlsClick(evt) {
    evt.preventDefault();

    evt.target.classList.toggle(`film-card__controls-item--active`);

    const updatedFilmData = this._filmData;

    switch (evt.target.dataset.controlType) {
      case `watchlist`:
        updatedFilmData.inWatchlist = evt.target.classList.contains(`film-card__controls-item--active`);
        this._onDataChange(updatedFilmData, this._filmData);
        break;
      case `watched`:
        updatedFilmData.isWatched = evt.target.classList.contains(`film-card__controls-item--active`);
        this._onDataChange(updatedFilmData, this._filmData);
        break;
      case `favorite`:
        updatedFilmData.isFavorite = evt.target.classList.contains(`film-card__controls-item--active`);
        this._onDataChange(updatedFilmData, this._filmData);
        break;
    }
  }
}
