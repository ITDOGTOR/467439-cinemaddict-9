import FilmCard from '../components/film-card.js';
import FilmPopup from '../components/film-popup.js';
import Comment from '../components/comment.js';

import {renderElement, Key} from '../util.js';

export default class MovieController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._filmCard = new FilmCard(data);
    this._filmPopup = new FilmPopup(data);

    this.init();
  }

  init() {
    const bodyElement = document.querySelector(`body`);

    const onPopupOpen = () => {
      const onEscKeyDown = (evt) => {
        if (evt.key === Key.ESCAPE_IE || evt.key === Key.ESCAPE) {
          this._filmPopup.removeElement();
          bodyElement.classList.remove(`hide-overflow`);
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      };

      this._onChangeView();

      renderElement(bodyElement, this._filmPopup.getElement());
      bodyElement.classList.add(`hide-overflow`);

      const commentsContainer = this._filmPopup.getElement().querySelector(`.film-details__comments-list`);
      this._filmCard._comments.forEach((comment) => renderElement(commentsContainer, new Comment(comment).getElement()));

      this._filmPopup.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._filmPopup.removeElement();
        bodyElement.classList.remove(`hide-overflow`);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

      this._filmPopup.getElement().querySelector(`.film-details__comment-input`).addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

      this._filmPopup.getElement().querySelector(`.film-details__comment-input`).addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const switchControlType = (controlType) => {
      switch (controlType) {
        case `watchlist`:
          this._onDataChange(this._data, `watchlist`);
          break;
        case `watched`:
          this._onDataChange(this._data, `watched`);
          break;
        case `favorite`:
          this._onDataChange(this._data, `favorite`);
          break;
      }
    };

    this._filmCard.getElement().querySelector(`.film-card__controls`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      evt.target.classList.toggle(`film-card__controls-item--active`);
      switchControlType(evt.target.dataset.controlType);
    });

    this._filmPopup.getElement().querySelector(`.film-details__controls`).addEventListener(`change`, (evt) => {
      evt.preventDefault();
      switchControlType(evt.target.id);
    });

    this._filmCard.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => onPopupOpen());
    this._filmCard.getElement().querySelector(`.film-card__title`).addEventListener(`click`, () => onPopupOpen());
    this._filmCard.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, () => onPopupOpen());

    renderElement(this._container, this._filmCard.getElement());
  }

  setDefaultView() {
    if (document.body.contains(this._filmPopup.getElement())) {
      this._filmPopup.removeElement();
    }
  }
}
