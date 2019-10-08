import AbstractComponent from '../abstract-component.js';

export default class NoFilms extends AbstractComponent {
  constructor(text) {
    super();
    this._text = text;
  }

  getTemplate() {
    return `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="no-result">${this._text}</div>
    </section>`;
  }
}
