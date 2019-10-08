import moment from 'moment';

import AbstractComponent from '../abstract-component.js';

import {getDurationFilmFromMinutes} from '../../util.js';

export default class FilmPopup extends AbstractComponent {
  constructor({filmInfo}) {
    super();
    this._poster = filmInfo.poster;
    this._ageRating = filmInfo.ageRating;
    this._title = filmInfo.title;
    this._alternativeTitle = filmInfo.alternativeTitle;
    this._totalRating = filmInfo.totalRating;
    this._director = filmInfo.director;
    this._writers = filmInfo.writers;
    this._actors = filmInfo.actors;
    this._releaseDate = filmInfo.release.date;
    this._runtime = filmInfo.runtime;
    this._releaseCountry = filmInfo.release.releaseCountry;
    this._genre = filmInfo.genre;
    this._description = filmInfo.description;
  }

  getTemplate() {
    return `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${this._poster}" alt="">

              <p class="film-details__age">${this._ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${this._title}</h3>
                  <p class="film-details__title-original">Original: ${this._alternativeTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${this._totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${this._director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${this._writers.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${this._actors.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${moment(this._releaseDate).format(`DD MMMM YYYY`)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${getDurationFilmFromMinutes(this._runtime)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${this._releaseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genre${this._genre.length ? `s` : ``}</td>
                  <td class="film-details__cell">
                    ${(this._genre).map((item) => `<span class="film-details__genre">${item}</span>`).join(``)}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${this._description}
              </p>
            </div>
          </div>

        </div>

        <div class="form-details__middle-container"></div>

      </form>
    </section>`;
  }
}
