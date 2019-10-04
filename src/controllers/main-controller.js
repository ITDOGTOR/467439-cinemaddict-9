import MenuController from '../controllers/menu-controller.js';
import SortController from '../controllers/sort-controller.js';
import FilmsController from '../controllers/films-controller.js';

export default class MainController {
  constructor(filmsData, onDataChange) {
    this._filmsData = filmsData;
    this._onDataChangeMain = onDataChange;
    this._container = document.querySelector(`.main`);

    this._menuController = new MenuController(this._container, this._filmsData);
    this._sortController = new SortController(this._container, this._filmsData, this._onSortDataChange.bind(this));
    this._filmsController = new FilmsController(this._container, filmsData, this._onDataChange.bind(this));
  }

  _onSortDataChange(sortedFilmsData) {
    this._filmsController.onSortDataChange();
    this._filmsController.updateMainFilmsList(sortedFilmsData);
  }

  _onDataChange(newData, oldData) {
    const filmDataIndex = this._filmsData.findIndex((filmData) => filmData === oldData);

    this._filmsData[filmDataIndex] = newData;
    this._onDataChangeMain(this._filmsData);
    this._filmsController.update(this._filmsData);
    this._sortController.setDefaultView();
  }
}
