import UserRank from '../../components/user-rank/user-rank.js';

import {getUserRank, renderElement} from '../../util.js';

export default class UserRankController {
  constructor(container, filmsData) {
    this._container = container;
    this._filmsData = filmsData;

    this._userRank = new UserRank(getUserRank(this._filmsData));

    this._init();
  }

  updateView(updatedFilmsData) {
    this._userRank.removeElement();

    this._filmsData = updatedFilmsData;
    this._userRank = new UserRank(getUserRank(this._filmsData));

    this._init();
  }

  _init() {
    renderElement(this._container, this._userRank.getElement());
  }
}
