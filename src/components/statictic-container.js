import AbstractComponent from '../components/abstract-component.js';

export default class StatisticContainer extends AbstractComponent {
  getTemplate() {
    return `<section class="statistic"></section>`;
  }
}
