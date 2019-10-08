import MainFilmsList from '../../components/films-lists/main-films-list.js';
import NoFilms from '../../components/films-lists/no-films.js';
import ShowMoreButton from '../../components/button/show-more-button.js';

import MovieController from '../movie-controllers/movie-controller.js';

import {Position, PageGlobalSetting, renderElement, getSortedFilmsData, getFilteredFilmsData} from '../../util.js';

export default class FilmsController {
  constructor(container, filmsData, onDataChange, openMoviePopupEvent) {
    this._container = container;
    this._filmsData = filmsData;
    this._onDataChange = onDataChange;
    this._openMoviePopupEvent = openMoviePopupEvent;

    this._startRender = 0;
    this._showMoreRender = PageGlobalSetting.RENDER;
    this._renderFilms = PageGlobalSetting.RENDER;
    this._sortType = `default`;
    this._filterType = `all`;

    this._mainFilmsList = new MainFilmsList();
    this._noFilms = new NoFilms();
    this._showMoreButton = new ShowMoreButton();

    this._init();
  }

  hide() {
    this._renderNoFilms(true);
    this._mainFilmsList.removeElement();
    this._renderShowMoreButton(true);
  }

  updateView(sortType, filterType, updatedFilmsData) {
    this._renderNoFilms(true);
    this._mainFilmsList.removeElement();

    this._sortType = sortType;
    this._filterType = filterType;
    this._filmsData = updatedFilmsData;
    this._renderFilms = PageGlobalSetting.RENDER;

    this._mainFilmsList = new MainFilmsList();

    this._init();
  }

  searchMode(filmsFound, status) {
    if (status) {
      this.updateView(this._sortType, this._filterType, filmsFound);
    }
  }

  _init() {
    renderElement(this._container, this._mainFilmsList.getElement(), Position.AFTERBEGIN);

    let filmsData = this._filmsData;
    filmsData = getFilteredFilmsData(getSortedFilmsData(filmsData, this._sortType), this._filterType);

    this._checkFilmsInContainer(filmsData);
    this._createFilms(filmsData);
  }

  _createFilms(filmsData) {
    filmsData.slice(this._startRender, this._renderFilms)
      .forEach((filmData) => this._renderFilm(this._mainFilmsList.getElement()
      .querySelector(`.films-list__container`), filmData));
  }

  _renderFilm(container, filmData) {
    const movieController = new MovieController(container, filmData, this._onDataChange, this._openMoviePopupEvent, `films-list`);

    movieController.init();
  }

  _renderShowMoreButton(remove = false) {
    this._showMoreButton.removeElement();

    if (remove) {
      return;
    }

    this._showMoreButton = new ShowMoreButton();
    renderElement(this._mainFilmsList.getElement(), this._showMoreButton.getElement());
  }

  _renderNoFilms(remove = false) {
    this._noFilms.removeElement();

    if (remove) {
      return;
    }

    this._noFilms = new NoFilms();
    renderElement(this._container, this._noFilms.getElement(), Position.AFTERBEGIN);
  }

  _checkFilmsInContainer(filmsData) {
    if (filmsData.length > this._renderFilms) {
      this._renderShowMoreButton();
      this._showMoreButton.getElement().addEventListener(`click`, this._onShowMoreButtonClick.bind(this));
    }

    if (!filmsData.length) {
      this._mainFilmsList.removeElement();
      this._renderShowMoreButton(true);
      this._renderNoFilms();
    }
  }

  _onShowMoreButtonClick() {
    this._filmsData.slice(this._renderFilms, this._renderFilms + this._showMoreRender).forEach((filmData) => this._renderFilm(this._mainFilmsList.getElement().querySelector(`.films-list__container`), filmData));

    this._renderFilms += this._showMoreRender;

    if (this._filmsData.length <= this._renderFilms) {
      this._renderShowMoreButton(true);
    }
  }
}
