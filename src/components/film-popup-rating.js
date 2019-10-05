import AbstractComponent from '../components/abstract-component.js';

import {USER_RATINGS} from '../constants.js';

export default class FilmPopupRating extends AbstractComponent {
  constructor({title, poster, userRating}) {
    super();
    this._title = title;
    this._poster = poster;
    this._userRating = userRating;
  }

  getTemplate() {
    return `<section class="film-details__user-rating-wrap">
      <div class="film-details__user-rating-controls">
        <button class="film-details__watched-reset" type="button">Undo</button>
      </div>

      <div class="film-details__user-score">
        <div class="film-details__user-rating-poster">
          <img src="./images/posters/${this._poster}" alt="film-poster" class="film-details__user-rating-img">
        </div>

        <section class="film-details__user-rating-inner">
          <h3 class="film-details__user-rating-title">${this._title}</h3>

          <p class="film-details__user-rating-feelings">How you feel it?</p>

          <div class="film-details__user-rating-score">
            ${USER_RATINGS.map((rating) => `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${rating}" id="rating-${rating}" ${rating === this._userRating ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-${rating}">${rating}</label>`).join(``)}
          </div>
        </section>
      </div>
    </section>`;
  }
}
