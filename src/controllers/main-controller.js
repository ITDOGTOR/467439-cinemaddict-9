import MenuController from '../controllers/menu-controller.js';
import SortController from '../controllers/sort-controller.js';
import FilmsController from '../controllers/films-controller.js';
import StatisticController from '../controllers/statistic-controller.js';
import SearchResultController from '../controllers/search-result-controller.js';

export default class MainController {
  constructor(filmsData, onDataChange) {
    this._filmsData = filmsData;
    this._onDataChangeMain = onDataChange;
    this._container = document.querySelector(`.main`);

    this._searchResultController = new SearchResultController(this._container, this._filmsData);
    this._menuController = new MenuController(this._container, this._filmsData, this._onMenuDataChange.bind(this));
    this._sortController = new SortController(this._container, this._filmsData, this._onSortDataChange.bind(this));
    this._filmsController = new FilmsController(this._container, this._filmsData, this._onDataChange.bind(this));
    this._statisticController = new StatisticController(this._container, this._filmsData);
  }

  updateAll(updatedFilmsData) {
    this._menuController.update(updatedFilmsData);
    this._filmsController.update(updatedFilmsData);
    this._statisticController.update(updatedFilmsData);
    this._sortController.setDefaultView();
  }

  showSearch(filmsFound, searchingMode) {
    if (searchingMode) {
      this._menuController.hide();
      this._sortController.hide();
      this._statisticController.hide();
      this._filmsController.hide();
      this._searchResultController.show(filmsFound);
      this._filmsController.updateMainFilmsList(filmsFound);
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

  // ! Оптимизировать окна
  _onMenuDataChange(menuItem) {
    this._filmsController.onMenuDataChange();
    this._sortController.setDefaultView();

    switch (menuItem) {
      case `all`:
        this._sortController.show();
        this._filmsController.allShow();
        this._filmsController.update(this._filmsData.slice());
        this._statisticController.hide();
        break;
      case `watchlist`:
        this._sortController.show();
        this._filmsController.allShow();
        this._filmsController.update(this._filmsData.slice().filter((filmData) => filmData.inWatchlist));
        this._statisticController.hide();
        break;
      case `history`:
        this._sortController.show();
        this._filmsController.allShow();
        this._filmsController.update(this._filmsData.slice().filter((filmData) => filmData.isWatched));
        this._statisticController.hide();
        break;
      case `favorites`:
        this._sortController.show();
        this._filmsController.allShow();
        this._filmsController.update(this._filmsData.slice().filter((filmData) => filmData.isFavorite));
        this._statisticController.hide();
        break;
      case `stats`:
        this._sortController.hide();
        this._filmsController.allHide();
        this._statisticController.show();
        break;
    }
  }

  _onDataChange(newData, oldData) {
    const filmDataIndex = this._filmsData.findIndex((filmData) => filmData === oldData);

    if (newData === null) {
      this._filmsData = [...this._filmsData.slice(0, filmDataIndex), ...this._filmsData.slice(filmDataIndex + 1)];
    } else {
      this._filmsData[filmDataIndex] = newData;
    }

    this._onDataChangeMain(this._filmsData);
  }
}
