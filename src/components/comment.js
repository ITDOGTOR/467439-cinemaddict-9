import moment from 'moment';
import AbstractComponent from '../components/abstract-component.js';

export default class Comment extends AbstractComponent {
  constructor({commentator, comment, emotion, commentDate}) {
    super();
    this._commentator = commentator;
    this._comment = comment;
    this._emotion = emotion;
    this._commentDate = new Date(commentDate);
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
          <span class="film-details__comment-day">${moment(this._commentDate, `YYYYMMDD`).fromNow()}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
  }
}
