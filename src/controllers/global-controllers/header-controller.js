import Search from '../../components/search/search.js';

import UserRankController from '../user-rank-controller/user-rank-controller.js';

import {PageGlobalSetting, renderElement} from '../../util.js';

export default class HeaderController {
  constructor(filmsData, onSearchEvent) {
    this._filmsData = filmsData;
    this._onSearchEvent = onSearchEvent;

    this._container = document.querySelector(`.header`);
    this._symbolsCountToSearch = PageGlobalSetting.SYMBOLS_COUNT_TO_SEARCH;

    this._search = new Search();
    this._searchingMode = false;

    this._userRankController = null;

    this._init();
  }

  updateUserRank(filmsData) {
    this._userRankController.updateView(filmsData);
  }

  _init() {
    renderElement(this._container, this._search.getElement());

    this._search.getElement().querySelector(`.search__field`).addEventListener(`input`, this._onSearchInput.bind(this));
    this._search.getElement().querySelector(`.search__reset`).addEventListener(`click`, this._onResetInputButtonClick.bind(this));

    this._userRankController = new UserRankController(this._container, this._filmsData);
  }

  _onSearchInput(evt) {
    const {value} = evt.target;
    let filmsFound = [];

    if (value.length > this._symbolsCountToSearch) {
      filmsFound = this._filmsData.filter((filmData) => filmData.filmInfo.title.replace(/[\s.,%]/g, ``).toLowerCase().includes(value.replace(/[\s.,%]/g, ``).toLowerCase()));

      this._searchingMode = true;
      this._onSearchEvent(filmsFound, this._searchingMode);
      return;
    }

    this._searchingMode = false;
    this._onSearchEvent(filmsFound, this._searchingMode);
  }

  _onResetInputButtonClick() {
    if (this._searchingMode) {
      this._searchingMode = false;
      this._onSearchEvent(this._filmsData, this._searchingMode);
    }
  }
}
