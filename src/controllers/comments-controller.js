import CommentsContainer from '../components/comments-container.js';
import Comments from '../components/comments.js';

import {renderElement} from '../util.js';

export default class CommentsController {
  constructor(container, commentsData, onFocusChange) {
    this._container = container;
    this._commentsData = commentsData;
    this._onFocusChange = onFocusChange;

    this._commentsContainer = new CommentsContainer();
    this._comments = null;

    this._init();
  }

  _init() {
    renderElement(this._container, this._commentsContainer.getElement());

    this._comments = new Comments(this._commentsData);
    renderElement(this._commentsContainer.getElement(), this._comments.getElement());

    this._comments.getElement().querySelector(`.film-details__comment-input`).addEventListener(`focus`, () => {
      this._onFocusChange(true);
    });

    this._comments.getElement().querySelector(`.film-details__comment-input`).addEventListener(`blur`, () => {
      this._onFocusChange(false);
    });
  }
}
