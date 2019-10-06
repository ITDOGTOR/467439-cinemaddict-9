
import AbstractComponent from '../components/abstract-component.js';

export default class StatisticInfo extends AbstractComponent {
  constructor({watchedCount, totalDuration, topGenre}) {
    super();
    this._watchedCount = watchedCount;
    this._hours = totalDuration.hours;
    this._minutes = totalDuration.minutes;
    this._topGenre = topGenre;
  }

  getTemplate() {
    return `<ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${this._watchedCount ? this._watchedCount : 0} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${this._hours ? this._hours : 0} <span class="statistic__item-description">h</span> ${this._minutes ? this._minutes : 0} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${this._topGenre ? this._topGenre : `undefined`}</p>
      </li>
    </ul>`;
  }
}
