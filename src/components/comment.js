import {createElement, unrenderElement} from '../util.js';

export default class Comment {
  constructor({commentator, comment, emotion, commentDate}) {
    this._commentator = commentator;
    this._comment = comment;
    this._emotion = emotion;
    this._commentDate = new Date(commentDate);
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    unrenderElement(this._element);
    this._element = null;
  }

  getTemplate() {
    return `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${this._emotion}.png" width="55" height="55" alt="emoji">
      </span>
      <div>
        <p class="film-details__comment-text">${this._comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${this._commentator}</span>
          <span class="film-details__comment-day">${this._commentDate.toDateString()}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
  }
}
