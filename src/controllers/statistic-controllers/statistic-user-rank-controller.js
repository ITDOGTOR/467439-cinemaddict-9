import StatisticUserRank from '../../components/statistic/statistic-user-rank.js';

import {Position, renderElement, getUserRank} from '../../util.js';

export default class StatisticUserRankController {
  constructor(container, filmsData) {
    this._container = container;
    this._filmData = filmsData;

    this._statisticUserRank = new StatisticUserRank(getUserRank(this._filmData));

    this._init();
  }

  updateView(container, updatedFilmsData) {
    this._statisticUserRank.removeElement();

    this._filmsData = updatedFilmsData;
    this._statisticUserRank = new StatisticUserRank(getUserRank(updatedFilmsData));

    // Отменить рендер из-за недостатка статистики
    if (!(getUserRank(updatedFilmsData))) {
      return;
    }

    renderElement(container, this._statisticUserRank.getElement(), Position.AFTERBEGIN);
  }

  _init() {
    renderElement(this._container, this._statisticUserRank.getElement(), Position.AFTERBEGIN);
  }
}
