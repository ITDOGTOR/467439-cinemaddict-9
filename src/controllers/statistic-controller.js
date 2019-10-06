import moment from 'moment';

import StatisticContainer from '../components/statictic-container.js';

import StatisticUserRankController from '../controllers/statistic-user-rank-controller.js';
import StatisticFiltersController from '../controllers/statistic-filters-controller.js';
import StatisticInfoController from '../controllers/statistic-info-controller.js';
import StatisticChartController from '../controllers/statistic-chart-controller.js';

import {renderElement} from '../util.js';

export default class StatisticController {
  constructor(container, filmsData) {
    this._container = container;
    this._filmsData = filmsData;

    this._statisticContainer = new StatisticContainer();

    this._statisticUserRankController = new StatisticUserRankController(this._statisticContainer.getElement(), this._filmsData);
    this._statisticFiltersController = new StatisticFiltersController(this._statisticContainer.getElement(), this._onStatisticDataChange.bind(this));
    this._statisticInfoController = new StatisticInfoController(this._statisticContainer.getElement(), this._filmsData);
    this._statisticChartController = new StatisticChartController(this._statisticContainer.getElement(), this._filmsData);

    this._init();
  }

  show() {
    if (this._statisticContainer.getElement().classList.contains(`visually-hidden`)) {
      this._statisticContainer.getElement().classList.remove(`visually-hidden`);
    }
  }

  hide() {
    this._statisticContainer.getElement().classList.add(`visually-hidden`);
  }

  update(updatedFilmsData) {
    this._statisticUserRankController.update(updatedFilmsData);
    this._statisticInfoController.update(updatedFilmsData);
    this._statisticChartController.updateChart(updatedFilmsData);
  }

  _init() {
    this.hide();
    renderElement(this._container, this._statisticContainer.getElement());
  }

  _onStatisticDataChange(filterItem) {
    switch (filterItem) {
      case `all-time`:
        this.update(this._filmsData);
        break;
      case `today`:
        const filterToday = this._filmsData.filter((filmData) => moment().isSame(filmData.watchingDate, `day`));
        this.update(filterToday);
        break;
      case `week`:
        const filterWeek = this._filmsData.filter((filmData) => moment().isSame(filmData.watchingDate, `week`));
        this.update(filterWeek);
        break;
      case `month`:
        const filterMonth = this._filmsData.filter((filmData) => moment().isSame(filmData.watchingDate, `month`));
        this.update(filterMonth);
        break;
      case `year`:
        const filterYear = this._filmsData.filter((filmData) => moment().isSame(filmData.watchingDate, `year`));
        this.update(filterYear);
        break;
    }
  }
}
