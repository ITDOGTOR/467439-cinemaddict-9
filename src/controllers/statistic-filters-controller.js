import StatisticFilters from '../components/statistic-filters.js';

import {renderElement} from '../util.js';

export default class StatisticFiltersController {
  constructor(container, onStatisticDataChange) {
    this._container = container;
    this._onStatisticDataChange = onStatisticDataChange;

    this._statisticFilters = new StatisticFilters();

    this._init();
  }

  _init() {
    renderElement(this._container, this._statisticFilters.getElement());

    this._statisticFilters.getElement().addEventListener(`change`, this._onFiltersClick.bind(this));
  }

  _onFiltersClick(evt) {
    this._onStatisticDataChange(evt.target.value);
  }
}
