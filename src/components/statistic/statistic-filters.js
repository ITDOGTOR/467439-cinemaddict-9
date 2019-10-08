import AbstractComponent from '../abstract-component.js';

import {PageGlobalSetting} from '../../util.js';

export default class StatisticFilters extends AbstractComponent {
  getTemplate() {
    return `<form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      ${PageGlobalSetting.STATISTIC_FILTERS.map((filter) => `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${filter}" value="${filter}" ${filter === `all-time` ? `checked` : ``}>
      <label for="statistic-${filter}" class="statistic__filters-label">${filter.charAt(0).toUpperCase() + filter.substr(1)}</label>`).join(``)}
    </form>`;
  }
}
