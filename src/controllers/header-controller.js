import Search from '../components/search.js';

import UserController from '../controllers/user-controller.js';

import {renderElement} from '../util.js';

export default class HeaderController {
  constructor(filmsData) {
    this._filmsData = filmsData;
    this._container = document.querySelector(`.header`);

    this._search = new Search();

    this._userController = null;

    this._init();
  }

  _init() {
    renderElement(this._container, this._search.getElement());
    this._renderUserProfile(this._container, this._filmsData);
  }

  _renderUserProfile(container, filmsData) {
    this._userController = new UserController(container, filmsData);
  }
}
