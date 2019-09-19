import moment from 'moment';
import AbstractComponent from '../components/abstract-component.js';

import {USER_RATINGS} from '../constants.js';
import {renderElement, createElement, unrenderElement} from '../util.js';

export default class FilmPopup extends AbstractComponent {
  constructor({poster, title, originalTitle, rating, userRating, director, writers, actors, releaseDate, duration, country, genres, description, ageRating, comments, inWatchlist, isWatched, isFavorite}) {
    super();
    this._poster = poster;
    this._title = title;
    this._originalTitle = originalTitle;
    this._rating = rating;
    this._userRating = userRating;
    this._director = director;
    this._writers = writers;
    this._actors = actors;
    this._releaseDate = releaseDate;
    this._duration = duration;
    this._country = country;
    this._genres = genres;
    this._description = description;
    this._ageRating = ageRating;
    this._comments = comments;
    this._inWatchlist = inWatchlist;
    this._isWatched = isWatched;
    this._isFavorite = isFavorite;

    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    const deleteUserRating = () => {
      this.getElement().querySelectorAll(`.film-details__user-rating-input`).forEach((input) => {
        input.checked = false;
      });
      unrenderElement(this.getElement().querySelector(`.film-details__user-rating`));
    };

    this.getElement().querySelector(`#watched`).addEventListener(`change`, (evt) => {
      evt.preventDefault();

      if (!(this.getElement(`.form-details__middle-container`).classList.contains(`visually-hidden`))) {
        deleteUserRating();
      }

      this.getElement().querySelector(`.form-details__middle-container`).classList.toggle(`visually-hidden`);
    });

    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, (evt) => {
      const emojiContainer = this.getElement().querySelector(`.film-details__add-emoji-label`);
      emojiContainer.innerHTML = ``;

      switch (evt.target.value) {
        case `smile`:
          renderElement(emojiContainer, createElement(`<img src="./images/emoji/smile.png" width="55" height="55" alt="emoji">`));
          break;
        case `sleeping`:
          renderElement(emojiContainer, createElement(`<img src="./images/emoji/sleeping.png" width="55" height="55" alt="emoji">`));
          break;
        case `puke`:
          renderElement(emojiContainer, createElement(`<img src="./images/emoji/puke.png" width="55" height="55" alt="emoji">`));
          break;
        case `angry`:
          renderElement(emojiContainer, createElement(`<img src="./images/emoji/angry.png" width="55" height="55" alt="emoji">`));
          break;
      }
    });
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
              <img class="film-details__poster-img" src="./images/posters/${this._poster}" alt="">

              <p class="film-details__age">${this._ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${this._title}</h3>
                  <p class="film-details__title-original">Original: ${this._originalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${this._rating}</p>
                  ${this._userRating ? `<p class="film-details__user-rating">Your rate ${String(this._userRating)}</p>` : ``}
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
                  <td class="film-details__cell">${this._duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${this._country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${this._genres.length > 1 ? `Genres` : `Genre`}</td>
                  <td class="film-details__cell">
                    ${Array.from(this._genres).map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``)}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${this._description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._inWatchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._isWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._isFavorite ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__middle-container ${this._isWatched ? `` : `visually-hidden`}">
          <section class="film-details__user-rating-wrap">
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
                  ${USER_RATINGS.map((userRating) => `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${userRating}" id="rating-${userRating} " ${userRating === this._userRating ? `checked` : ``}>
                  <label class="film-details__user-rating-label" for="rating-${userRating}">${userRating}</label>`).join(``)}

                </div>
              </section>
            </div>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>

            <ul class="film-details__comments-list">

            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`;
  }
}
