import StatisticUserRank from '../components/statistic-user-rank.js';

import {renderElement, getRankUser, Position} from '../util.js';

export default class StatisticUserRankController {
  constructor(container, filmsData) {
    this._container = container;
    this._filmData = filmsData;

    this._statisticUserRank = new StatisticUserRank(getRankUser(this._filmData));

    this._init();
  }

  update(updatedFilmsData) {
    this._statisticUserRank.removeElement();

    this._updateData(updatedFilmsData);
  }

  _updateData(updatedFilmsData) {
    this._filmsData = updatedFilmsData;

    this._updateView(this._filmsData);
  }

  _updateView(updatedFilmsData) {
    this._statisticUserRank = new StatisticUserRank(getRankUser(updatedFilmsData));

    if (!(getRankUser(updatedFilmsData))) {
      return;
    }

    renderElement(this._container, this._statisticUserRank.getElement(), Position.AFTERBEGIN);
  }

  _init() {
    renderElement(this._container, this._statisticUserRank.getElement());
  }
}
