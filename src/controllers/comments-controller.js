import moment from 'moment';

import CommentsContainer from '../components/comments-container.js';
import Comments from '../components/comments.js';

import {renderElement, Key, unrenderElement} from '../util.js';

export default class CommentsController {
  constructor(container, filmData, onFocusChange, onDataChange) {
    this._container = container;
    this._filmData = filmData;
    this._commentsData = filmData.comments;
    this._onFocusChange = onFocusChange;
    this._onDataChange = onDataChange;

    this._commentsContainer = new CommentsContainer();
    this._comments = null;

    this._init();
  }

  _init() {
    renderElement(this._container, this._commentsContainer.getElement());

    this._comments = new Comments(this._commentsData);
    renderElement(this._commentsContainer.getElement(), this._comments.getElement());

    [...this._comments.getElement().querySelectorAll(`.film-details__comment`)].forEach((comment) => {
      this._onRemoveCommentButtonClick(comment);
    });

    this._comments.getElement().querySelector(`.film-details__comment-input`).addEventListener(`keydown`, this._createNewComment.bind(this));

    this._comments.getElement().querySelector(`.film-details__comment-input`).addEventListener(`focus`, () => {
      this._onFocusChange(true);
    });

    this._comments.getElement().querySelector(`.film-details__comment-input`).addEventListener(`blur`, () => {
      this._onFocusChange(false);
    });

    this._comments.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._onEmojiSelect.bind(this));
  }

  _createNewComment(evt) {
    const emotionImg = this._container.querySelector(`.film-details__add-emoji-label img`);

    if ((evt.metaKey || evt.ctrlKey) && evt.key === Key.ENTER) {
      if (evt.target.value === ``) {
        return;
      }

      const commentData = {
        commentator: `Cpt. Silver`,
        comment: evt.target.value,
        emotion: emotionImg.alt,
        commentDate: moment(Date.now()).format(`YY/MM/DD HH:MM`),
      };

      const updatedCommentsData = [...this._filmData.comments, commentData];
      const updatedFilmData = this._filmData;
      updatedFilmData.comments = updatedCommentsData;

      evt.target.value = ``;
      this._onDataChange(updatedFilmData, this._filmData);
    }
  }

  _onRemoveCommentButtonClick(currentComment) {
    currentComment.querySelector(`.film-details__comment-delete`).addEventListener(`click`, (evt) => {
      evt.preventDefault();

      unrenderElement(currentComment);

      this._onDataChange(null, this._commentsData);
      this._comments = new Comments(this._commentsData);
    });
  }

  _onEmojiSelect(evt) {
    const emotionImg = this._container.querySelector(`.film-details__add-emoji-label img`);

    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    emotionImg.classList.remove(`visually-hidden`);

    emotionImg.src = `./images/emoji/${evt.target.value}.png`;
    emotionImg.alt = `${evt.target.value}`;
  }
}
