import MenuController from '../controllers/menu-controller.js';
import SortController from '../controllers/sort-controller.js';
import FilmsController from '../controllers/films-controller.js';
import SearchResultController from '../controllers/search-result-controller.js';

export default class MainController {
  constructor(filmsData, onDataChange) {
    this._filmsData = filmsData;
    this._onDataChangeMain = onDataChange;
    this._container = document.querySelector(`.main`);

    this._searchResultController = new SearchResultController(this._container, this._filmsData);
    this._menuController = new MenuController(this._container, this._filmsData, this._onMenuDataChange.bind(this));
    this._sortController = new SortController(this._container, this._filmsData, this._onSortDataChange.bind(this));
    this._filmsController = new FilmsController(this._container, filmsData, this._onDataChange.bind(this));
  }

  updateAll() {
    this._menuController.update(this._filmsData);
    this._filmsController.update(this._filmsData);
    this._sortController.setDefaultView();
  }

  showSearch(filmsFound, searchingMode) {
    if (searchingMode) {
      this._menuController.hide();
      this._sortController.hide();
      this._filmsController.hide();
      this._filmsController.updateMainFilmsList(filmsFound);
      this._searchResultController.show(filmsFound);
      return;
    }

    this._menuController.show();
    this._sortController.show();
    this._filmsController.update(filmsFound);
    this._searchResultController.hide();
  }

  _onSortDataChange(sortedFilmsData) {
    this._filmsController.onSortDataChange();
    this._filmsController.updateMainFilmsList(sortedFilmsData);
  }

  _onMenuDataChange(menuItem) {
    this._filmsController.onMenuDataChange();
    this._sortController.setDefaultView();

    switch (menuItem) {
      case `all`:
        this._filmsController.update(this._filmsData.slice());
        break;
      case `watchlist`:
        this._filmsController.update(this._filmsData.slice().filter((filmData) => filmData.inWatchlist));
        break;
      case `history`:
        this._filmsController.update(this._filmsData.slice().filter((filmData) => filmData.isWatched));
        break;
      case `favorites`:
        this._filmsController.update(this._filmsData.slice().filter((filmData) => filmData.isFavorite));
    }
  }

  _onDataChange(newData, oldData) {
    const filmDataIndex = this._filmsData.findIndex((filmData) => filmData === oldData);

    this._filmsData[filmDataIndex] = newData;
    this._onDataChangeMain(this._filmsData);
    this.updateAll();
  }
}
