import HeaderController from '../controllers/header-controller.js';
import MainController from '../controllers/main-controller.js';
import FooterController from '../controllers/footer-controller.js';

import {filmsData} from '../data.js';

export default class PageController {
  constructor() {
    this._headerController = null;
    this._mainController = null;
    this._footerController = null;

    this._copyFilmsData = null;
  }

  init() {
    this._copyFilmsData = filmsData.slice();

    this._headerController = new HeaderController(this._copyFilmsData, this._onSearchDataChange.bind(this));
    this._mainController = new MainController(this._copyFilmsData, this._onDataChange.bind(this));
    this._footerController = new FooterController(this._copyFilmsData);
  }

  _onDataChange(films) {
    this._copyFilmsData = films;
    this._headerController.update(this._copyFilmsData);
    this._mainController.updateAll(this._copyFilmsData);
  }

  _onSearchDataChange(filmsFound, searchingMode) {
    this._mainController.showSearch(filmsFound, searchingMode);
  }
}
