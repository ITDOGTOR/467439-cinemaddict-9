import StatisticFilters from '../../components/statistic/statistic-filters.js';

import {renderElement} from '../../util.js';

export default class StatisticFiltersController {
  constructor(container, onStatisticEvent) {
    this._container = container;
    this._onStatisticEvent = onStatisticEvent;

    this._statisticFilters = new StatisticFilters();

    this._init();
  }

  updateView(container) {
    this._statisticFilters.removeElement();

    this._statisticFilters = new StatisticFilters();
    renderElement(container, this._statisticFilters.getElement());

    this._statisticFilters.getElement().addEventListener(`change`, this._onFiltersClick.bind(this));
  }

  _init() {
    renderElement(this._container, this._statisticFilters.getElement());

    this._statisticFilters.getElement().addEventListener(`change`, this._onFiltersClick.bind(this));
  }

  _onFiltersClick(evt) {
    this._onStatisticEvent(evt.target.value);
  }
}
