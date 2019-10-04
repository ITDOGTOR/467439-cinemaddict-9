import AbstractComponent from '../components/abstract-component.js';

export default class Footer extends AbstractComponent {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return `<section class="footer__statistics">
      <p>${this._filmsCount} movies inside</p>
    </section>`;
  }
}
