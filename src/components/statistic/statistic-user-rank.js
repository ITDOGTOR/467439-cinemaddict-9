import AbstractComponent from '../abstract-component.js';

export default class StatisticUserRank extends AbstractComponent {
  constructor(userRank) {
    super();
    this._userRank = userRank;
  }

  getTemplate() {
    return `<p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${this._userRank}</span>
    </p>`;
  }
}
