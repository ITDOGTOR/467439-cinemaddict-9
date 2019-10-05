import Search from '../components/search.js';

import UserController from '../controllers/user-controller.js';

import {renderElement} from '../util.js';

export default class HeaderController {
  constructor(filmsData, onSearchDataChange) {
    this._filmsData = filmsData;
    this._onSearchDataChange = onSearchDataChange;
    this._container = document.querySelector(`.header`);
    this._searchJobCount = 2;

    this._search = new Search();
    this._searchingMode = null;

    this._userController = null;

    this._init();
  }

  update(filmsData) {
    this._userController.update(filmsData);
  }

  _init() {
    renderElement(this._container, this._search.getElement());
    this._renderUserProfile(this._container, this._filmsData);

    this._search.getElement().querySelector(`.search__field`).addEventListener(`input`, this._onSearchInput.bind(this));
    this._search.getElement().querySelector(`.search__reset`).addEventListener(`click`, this._onResetInputButtonClick.bind(this));
  }

  _renderUserProfile(container, filmsData) {
    this._userController = new UserController(container, filmsData);
  }

  _onSearchInput(evt) {
    const {value} = evt.target;

    if (value.length > this._searchJobCount) {
      const filmsFound = this._filmsData.filter((filmData) => filmData.title.toLowerCase().includes(value.toLowerCase()));

      this._searchingMode = true;
      this._onSearchDataChange(filmsFound, this._searchingMode);
      return;
    }

    this._searchingMode = false;
    this._onSearchDataChange(this._filmsData, this._searchingMode);
  }

  _onResetInputButtonClick() {
    if (this._searchingMode) {
      this._searchingMode = false;
      this._onSearchDataChange(this._filmsData, this._searchingMode);
    }
  }
}
