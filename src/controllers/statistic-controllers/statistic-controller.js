import moment from 'moment';

import StatisticContainer from '../../components/statistic/statistic-container.js';

import StatisticUserRankController from './statistic-user-rank-controller.js';
import StatisticFiltersController from './statistic-filters-controller.js';
import StatisticInfoController from './statistic-info-controller.js';
import StatisticChartController from './statistic-chart-controller.js';

import {renderElement} from '../../util.js';

export default class StatisticController {
  constructor(container, filmsData) {
    this._container = container;
    this._filmsData = filmsData;

    this._statisticContainer = new StatisticContainer();

    this._statisticUserRankController = new StatisticUserRankController(this._statisticContainer.getElement(), this._filmsData);
    this._statisticFiltersController = new StatisticFiltersController(this._statisticContainer.getElement(), this._onStatisticEvent.bind(this));
    this._statisticInfoController = new StatisticInfoController(this._statisticContainer.getElement(), this._filmsData);
    this._statisticChartController = new StatisticChartController(this._statisticContainer.getElement(), this._filmsData);
  }

  show(updatedFilmsData) {
    renderElement(this._container, this._statisticContainer.getElement());

    this._statisticUserRankController.updateView(this._statisticContainer.getElement(), updatedFilmsData);
    this._statisticFiltersController.updateView(this._statisticContainer.getElement());
    this._statisticInfoController.updateView(this._statisticContainer.getElement(), updatedFilmsData);
    this._statisticChartController.updateChart(this._statisticContainer.getElement(), updatedFilmsData);
  }

  hide() {
    this._statisticContainer.removeElement();
  }

  updateView(updatedFilmsData) {
    renderElement(this._container, this._statisticContainer.getElement());

    this._statisticUserRankController.updateView(this._statisticContainer.getElement(), updatedFilmsData);
    this._statisticInfoController.updateView(this._statisticContainer.getElement(), updatedFilmsData);
    this._statisticChartController.updateChart(this._statisticContainer.getElement(), updatedFilmsData);
  }

  _onStatisticEvent(filterItem) {
    const statisticFilmsDataCount = {
      'all-time': () => this._filmsData,
      'today': () => this._filmsData.filter((filmData) => moment().isSame(filmData.userDetails.watchingDate, `day`)),
      'week': () => this._filmsData.filter((filmData) => moment().isSame(filmData.userDetails.watchingDate, `week`)),
      'month': () => this._filmsData.filter((filmData) => moment().isSame(filmData.userDetails.watchingDate, `month`)),
      'year': () => this._filmsData.filter((filmData) => moment().isSame(filmData.userDetails.watchingDate, `year`))
    };

    return this.updateView(statisticFilmsDataCount[filterItem]());
  }
}
