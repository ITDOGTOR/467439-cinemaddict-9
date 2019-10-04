import HeaderController from '../src/controllers/header-controller.js';
import MainController from '../src/controllers/main-controller.js';
import FooterController from '../src/controllers/footer-controller.js';

import {filmsData} from '../src/data.js';

const onDataChange = (films) => {
  copyFilmsData = films;
};

let copyFilmsData = filmsData.slice();

const headerController = new HeaderController(copyFilmsData);
const mainController = new MainController(copyFilmsData, onDataChange);
const footerController = new FooterController(copyFilmsData);
