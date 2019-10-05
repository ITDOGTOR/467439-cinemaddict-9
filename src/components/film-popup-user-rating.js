
import AbstractComponent from '../components/abstract-component.js';

export default class FilmPopupUserRating extends AbstractComponent {
  constructor({userRating}) {
    super();
    this._userRating = userRating;
  }

  getTemplate() {
    return `<p class="film-details__user-rating">Your rate ${this._userRating}</p>`;
  }
}
