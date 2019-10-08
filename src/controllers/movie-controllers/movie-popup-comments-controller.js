import moment from 'moment';

import LocalCommentModel from '../../models/local-comment-model.js';

import FilmPopupCommentsContainer from '../../components/film/film-popup-comments-container.js';
import FilmPopupComments from '../../components/film/film-popup-comments.js';

import {Key, renderElement} from '../../util.js';

export default class MoviePopupCommentsController {
  constructor(container, filmDataByID, onDataChange, onFocusEvent) {
    this._container = container;
    this._filmDataByID = parseInt(filmDataByID, 10);
    this._onDataChange = onDataChange;
    this._onFocusEvent = onFocusEvent;

    this._commentsData = [];

    this._filmPopupCommentsContainer = new FilmPopupCommentsContainer();
    this._filmPopupComments = null;

    this._init();
  }

  updateView(updatedCommentsData) {
    this._filmPopupCommentsContainer.removeElement();

    this._commentsData = updatedCommentsData;
    this._filmPopupCommentsContainer = new FilmPopupCommentsContainer();
    this._filmPopupComments = new FilmPopupComments(updatedCommentsData);

    renderElement(this._container, this._filmPopupCommentsContainer.getElement());
    renderElement(this._filmPopupCommentsContainer.getElement(), this._filmPopupComments.getElement());

    const commentField = this._filmPopupComments.getElement().querySelector(`.film-details__comment-input`);

    commentField.addEventListener(`focus`, () => {
      this._onFocusEvent(true);
    });

    commentField.addEventListener(`blur`, () => {
      this._onFocusEvent(false);
    });

    commentField.addEventListener(`keydown`, this._createComment.bind(this));

    this._filmPopupComments.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._onEmojiSelect.bind(this));

    this._filmPopupComments.getElement().querySelectorAll(`.film-details__comment-delete`).forEach((deleteButton) => {
      deleteButton.addEventListener(`click`, (evt) => {
        this._deleteComment(evt);
      });
    });
  }

  _block() {
    this._filmPopupCommentsContainer.getElement().style.opacity = `0.3`;
    this._filmPopupComments.getElement().querySelector(`.film-details__comment-input`).disabled = true;
  }

  _blockDeleteButton(deleteButton) {
    deleteButton.disabled = true;
    deleteButton.textContent = `Deleting…`;
  }

  _init() {
    renderElement(this._container, this._filmPopupCommentsContainer.getElement());
  }

  _createComment(evt) {
    const emotionImg = this._container.querySelector(`.film-details__add-emoji-label img`);

    if (!((evt.metaKey || evt.ctrlKey) && evt.key === Key.ENTER)) {
      return;
    }

    if (evt.target.value === ``) {
      return;
    }

    const newComment = new LocalCommentModel({
      id: this._filmDataByID,
      comment: evt.target.value,
      date: moment(Date.now()).toISOString(),
      emotion: emotionImg.alt
    });

    this._onDataChange(`create-comment`, newComment, ``);
    this._block();
  }

  _deleteComment(evt) {
    evt.preventDefault();

    this._onDataChange(`delete-comment`, parseInt(evt.target.dataset.idDelete, 10), this._filmDataByID);
    this._blockDeleteButton(evt.target);
  }

  _onEmojiSelect(evt) {
    const emotionImg = this._container.querySelector(`.film-details__add-emoji-label img`);

    if (emotionImg.classList.contains(`visually-hidden`)) {
      emotionImg.classList.remove(`visually-hidden`);
    }

    emotionImg.src = `./images/emoji/${evt.target.value}.png`;
    emotionImg.alt = `${evt.target.value}`;
  }
}
