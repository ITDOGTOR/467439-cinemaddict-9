import AbstractComponent from '../components/abstract-component.js';

export default class NoFilms extends AbstractComponent {
  getTemplate() {
    return `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      
      <div class="no-result">There are no movies in our database</div>
    </section>`;
  }
}
