import AbstractComponent from '../abstract-component.js';

export default class TopRatedFilmsList extends AbstractComponent {
  getTemplate() {
    return `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container">
      </div>
    </section>`;
  }
}
