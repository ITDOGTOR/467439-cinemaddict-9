import FilmsContainer from '../../components/films-lists/films-container.js';

import MenuController from '../menu-controller/menu-controller.js';
import SortController from '../sort-controller/sort-controller.js';
import FilmsController from '../films-controllers/films-controller.js';
import ExtraFilmsControllers from '../films-controllers/extra-films-controller.js';
import StatisticController from '../statistic-controllers/statistic-controller.js';

import MoviePopupController from '../movie-controllers/movie-popup-controller.js';
import SearchResultController from '../search-controller/search-result-controller.js';

import {renderElement, removeActiveClassElements} from '../../util.js';

export default class MainController {
  constructor(filmsData, onDataChange) {
    this._filmsData = filmsData;
    this._onDataChange = onDataChange;

    this._container = document.querySelector(`.main`);
    this._containerForMoviePopup = document.querySelector(`body`);

    this._sortType = `default`;
    this._filterType = `all`;

    this._filmsContainer = new FilmsContainer();

    this._searchResultController = new SearchResultController(this._container);

    this._sortController = new SortController(this._container, this._filmsData, this._onSortEvent.bind(this));
    this._menuController = new MenuController(this._container, this._filmsData, this._onMenuEvent.bind(this));
    this._filmsController = new FilmsController(this._filmsContainer.getElement(), this._filmsData, this._onDataChange, this._openMoviePopupEvent.bind(this));
    this._extraFilmsController = new ExtraFilmsControllers(this._filmsContainer.getElement(), this._filmsData, this._onDataChange, this._openMoviePopupEvent.bind(this));
    this._statisticController = new StatisticController(this._container, this._filmsData);

    this._moviePopupController = null;

    this._init();
  }

  updateFilmsData(updatedFilmsData) {
    this._filmsData = updatedFilmsData;
  }

  updateMenuItems(updatedFilmsData) {
    this._sortController.show();
    this._menuController.updateView(updatedFilmsData);

    if (this._container.querySelector(`.result`)) {
      this._searchResultController.hide();
      this._containerForMoviePopup.querySelector(`.search__field`).value = ``;
    }
  }

  updateFilmsList(updatedFilmsData) {
    this._filmsController.updateView(this._sortType, this._filterType, updatedFilmsData);
  }

  updateExtraFilmsList(updatedFilmsData) {
    this._extraFilmsController.updateView(updatedFilmsData);
  }

  updatePopupControls(updatedFilmData) {
    this._moviePopupController.updateControls(updatedFilmData);
  }

  updatePopupUserRating(updatedFilmData) {
    this._moviePopupController.updateUserRating(updatedFilmData);
  }

  deletePopupUserRating() {
    this._moviePopupController.deleteUserRating();
  }

  updatePopupComments(updatedCommentsData) {
    this._moviePopupController.updateComments(updatedCommentsData);
  }

  showSearch(filmsFound, searchingMode) {
    if (searchingMode) {
      if (this._container.querySelector(`.sort`)) {
        this._sortController.hide();
      }

      if (this._container.querySelector(`.main-navigation`)) {
        this._menuController.hide();
      }

      this._filmsController.searchMode(filmsFound, searchingMode);
      this._searchResultController.show(filmsFound);
      return;
    }

    if (!this._container.querySelector(`.sort`)) {
      this._sortController.show();
    }

    if (!this._container.querySelector(`.main-navigation`)) {
      this._menuController.show();
    }

    if (this._container.querySelector(`.statistic`)) {
      this._statisticController.hide();
      this._sortController.show();
      this._menuController.show();
      this._extraFilmsController.show(filmsFound);
    }

    this._filmsController.updateView(this._sortType, this._filterType, this._filmsData);
    this._searchResultController.hide();
  }

  _init() {
    renderElement(this._container, this._filmsContainer.getElement());
  }

  _onMenuEvent(menuItem) {
    if (menuItem === `stats`) {
      this._filterType = `all`;
    } else {
      this._filterType = menuItem;
    }

    if (menuItem !== `stats` && this._container.querySelector(`.statistic`)) {
      this._statisticController.hide();
      this._sortController.show();
      this._menuController.show();
      this._extraFilmsController.show(this._filmsData);
    }

    switch (menuItem) {
      case `all`:
        this._filmsController.updateView(this._sortType, this._filterType, this._filmsData);
        break;
      case `watchlist`:
        this._filmsController.updateView(this._sortType, this._filterType, this._filmsData);
        break;
      case `history`:
        this._filmsController.updateView(this._sortType, this._filterType, this._filmsData);
        break;
      case `favorites`:
        this._filmsController.updateView(this._sortType, this._filterType, this._filmsData);
        break;
      case `stats`:
        this._sortController.hide();
        this._filmsController.hide();
        this._extraFilmsController.hide();
        this._statisticController.show(this._filmsData);
        break;
    }
  }

  _onSortEvent(sortType) {
    this._sortType = sortType;
    this._filmsController.updateView(sortType, this._filterType, this._filmsData);
  }

  _openMoviePopupEvent(filmData) {
    if (this._containerForMoviePopup.querySelector(`.film-details`)) {
      return;
    }

    this._moviePopupController = new MoviePopupController(this._containerForMoviePopup, filmData, this._onDataChange);
  }
}
