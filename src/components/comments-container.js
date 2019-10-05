import AbstractComponent from '../components/abstract-component.js';

export default class CommentsContainer extends AbstractComponent {
  getTemplate() {
    return `<div class="form-details__bottom-container"></div>`;
  }
}
