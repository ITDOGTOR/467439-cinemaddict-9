import Footer from '../../components/footer/footer.js';

import {renderElement} from '../../util.js';

export default class FooterController {
  constructor(filmsData) {
    this._filmsData = filmsData;

    this._container = document.querySelector(`.footer`);

    this._footer = new Footer(filmsData.length);
  }

  init() {
    renderElement(this._container, this._footer.getElement());
  }
}
