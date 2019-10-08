import AbstractComponent from '../abstract-component.js';

import {PageGlobalSetting} from '../../util.js';

export default class FilmPopupRating extends AbstractComponent {
  constructor({filmInfo, userDetails}) {
    super();
    this._poster = filmInfo.poster;
    this._title = filmInfo.title;
    this._personalRating = userDetails.personalRating;
  }

  getTemplate() {
    return `<section class="film-details__user-rating-wrap">
      <div class="film-details__user-rating-controls">
        <button class="film-details__watched-reset" type="button">Undo</button>
      </div>

      <div class="film-details__user-score">
        <div class="film-details__user-rating-poster">
          <img src="${this._poster}" alt="film-poster" class="film-details__user-rating-img">
        </div>

        <section class="film-details__user-rating-inner">
          <h3 class="film-details__user-rating-title">${this._title}</h3>

          <p class="film-details__user-rating-feelings">How you feel it?</p>

          <div class="film-details__user-rating-score">
            ${new Array(PageGlobalSetting.PERSONAL_RATING_POINTS.END).fill().map((rating, index) => `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${index + PageGlobalSetting.PERSONAL_RATING_POINTS.START}" id="rating-${index + PageGlobalSetting.PERSONAL_RATING_POINTS.START}" ${index + PageGlobalSetting.PERSONAL_RATING_POINTS.START === this._personalRating ? `checked` : ``}>
            <label class="film-details__user-rating-label" for="rating-${index + 1}">${index + 1}</label>`).join(``)}
          </div>
        </section>
      </div>
    </section>`;
  }
}
