import FilmCard from '../../components/film/film-card.js';

import {renderElement} from '../../util.js';

export default class MovieController {
  constructor(container, filmData, onDataChange, openMoviePopupEvent, context) {
    this._container = container;
    this._filmData = filmData;
    this._onDataChange = onDataChange;
    this._openMoviePopupEvent = openMoviePopupEvent;
    this._context = context;

    this._filmCard = new FilmCard(this._filmData);
  }

  init() {
    renderElement(this._container, this._filmCard.getElement());

    this._filmCard.getElement().querySelector(`.film-card__controls`)
      .addEventListener(`click`, this._onFilmControlsClick.bind(this));

    [...this._filmCard.getElement().querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`)].forEach((element) => element.addEventListener(`click`, () => {
      document.querySelector(`body`).classList.add(`hide-overflow`);
      this._openMoviePopupEvent(this._filmData);
    }));
  }

  _onFilmControlsClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `BUTTON`) {
      return;
    }

    evt.target.classList.toggle(`film-card__controls-item--active`);

    const updatedFilmData = {
      'watchlist': () => {
        this._filmData.userDetails.watchlist = evt.target.classList.contains(`film-card__controls-item--active`);
        return this._filmData;
      },
      'watched': () => {
        this._filmData.userDetails.alreadyWatched = evt.target.classList.contains(`film-card__controls-item--active`);

        if (!this._filmData.userDetails.alreadyWatched) {
          this._filmData.userDetails.personalRating = 0;
        }

        return this._filmData;
      },
      'favorite': () => {
        this._filmData.userDetails.favorite = evt.target.classList.contains(`film-card__controls-item--active`);
        return this._filmData;
      }
    };

    this._onDataChange(`update`, updatedFilmData[evt.target.dataset.controlType](), this._context);
  }
}
