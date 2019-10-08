
import AbstractComponent from '../abstract-component.js';

export default class FilmPopupUserRating extends AbstractComponent {
  constructor({userDetails}) {
    super();
    this._personalRating = userDetails.personalRating;
  }

  getTemplate() {
    return `<p class="film-details__user-rating">Your rate ${this._personalRating}</p>`;
  }
}
