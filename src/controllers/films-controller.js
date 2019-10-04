import FilmsContainer from '../components/films-container.js';
import MainFilmsList from '../components/main-films-list.js';
import TopRatedFilmsList from '../components/top-rated-films-list.js';
import MostCommentedFilmsList from '../components/most-commented-films-list.js';
import NoFilms from '../components/no-films.js';
import ShowMoreButton from '../components/show-more-button.js';

import MovieController from '../controllers/movie-controller.js';

import {FILM_CARD_COUNT} from '../constants.js';
import {renderElement, Position} from '../util.js';

export default class FilmsController {
  constructor(container, filmsData, onDataChange) {
    this._container = container;
    this._filmsData = filmsData;
    this._onDataChange = onDataChange;

    this._startRender = 0;
    this._renderFilms = FILM_CARD_COUNT.render;
    this._extraRenderFilms = FILM_CARD_COUNT.extraRender;

    this._filmsContainer = new FilmsContainer();
    this._mainFilmsList = new MainFilmsList();
    this._topRatedFilmsList = new TopRatedFilmsList();
    this._mostCommentedFilmsList = new MostCommentedFilmsList();
    this._noFilms = new NoFilms();
    this._showMoreButton = new ShowMoreButton();

    this._subscriptions = [];
    this._onViewChange = this._onViewChange.bind(this);

    this._init();
  }

  update(updatedFilmsData) {
    this._mainFilmsList.removeElement();
    this._topRatedFilmsList.removeElement();
    this._mostCommentedFilmsList.removeElement();
    this._showMoreButton.removeElement();

    this._updateData(updatedFilmsData);
  }

  _updateData(updatedFilmsData) {
    this._filmsData = updatedFilmsData;

    this._updateView(updatedFilmsData);
  }

  _updateView(updatedFilmsData) {
    this._mainFilmsList = new MainFilmsList();
    this._topRatedFilmsList = new TopRatedFilmsList();
    this._mostCommentedFilmsList = new MostCommentedFilmsList();

    renderElement(this._filmsContainer.getElement(), this._mainFilmsList.getElement());
    renderElement(this._filmsContainer.getElement(), this._topRatedFilmsList.getElement());
    renderElement(this._filmsContainer.getElement(), this._mostCommentedFilmsList.getElement());

    this._setFilms(updatedFilmsData);
    this._checkFilmsInContainer();
  }

  updateMainFilmsList(updatedFilmsData) {
    this._mainFilmsList.removeElement();

    this._updateMainFilmsData(updatedFilmsData);
  }

  _updateMainFilmsData(updatedFilmsData) {
    this._filmsData = updatedFilmsData;

    this._updateViewMainFilmsList(updatedFilmsData);
  }

  _updateViewMainFilmsList(updatedFilmsData) {
    this._mainFilmsList = new MainFilmsList();

    renderElement(this._filmsContainer.getElement(), this._mainFilmsList.getElement(), Position.AFTERBEGIN);

    this._checkFilmsInContainer();
    this._setMainFilms(updatedFilmsData);
  }

  onSortDataChange() {
    this._renderShowMoreButton();
  }

  _init() {
    renderElement(this._container, this._filmsContainer.getElement());
    renderElement(this._filmsContainer.getElement(), this._mainFilmsList.getElement());
    renderElement(this._filmsContainer.getElement(), this._topRatedFilmsList.getElement());
    renderElement(this._filmsContainer.getElement(), this._mostCommentedFilmsList.getElement());

    this._setFilms(this._filmsData);
    this._checkFilmsInContainer();
  }

  _setFilms(filmsData) {
    this._setMainFilms(filmsData);

    filmsData.slice().sort((a, b) => b.rating - a.rating).slice(this._startRender, this._extraRenderFilms).forEach((filmData) => this._renderFilm(this._topRatedFilmsList.getElement().querySelector(`.films-list__container`), filmData));

    filmsData.slice().sort((a, b) => b.releaseDate - a.releaseDate).slice(this._startRender, this._extraRenderFilms).forEach((filmData) => this._renderFilm(this._mostCommentedFilmsList.getElement().querySelector(`.films-list__container`), filmData));
  }

  _setMainFilms(filmsData) {
    filmsData.slice(this._startRender, this._renderFilms).forEach((filmData) => this._renderFilm(this._mainFilmsList.getElement().querySelector(`.films-list__container`), filmData));
  }

  _renderFilm(container, filmData) {
    const movieController = new MovieController(container, filmData, this._onDataChange, this._onViewChange, this._subscriptions);
    movieController.init();
  }

  _renderShowMoreButton() {
    this._showMoreButton.removeElement();
  }

  _renderNoFilms() {
    this._noFilms.removeElement();

    this._noFilms = new NoFilms();
    renderElement(this._container, this._noFilms.getElement());
  }

  _checkFilmsInContainer() {
    if (this._filmsData.length > this._renderFilms) {
      renderElement(this._mainFilmsList.getElement(), this._showMoreButton.getElement());
      this._showMoreButton.getElement().addEventListener(`click`, this._onShowMoreButtonClick.bind(this));
    }

    if (!this._filmsData.length) {
      this._mainFilmsList.removeElement();
      this._topRatedFilmsList.removeElement();
      this._mostCommentedFilmsList.removeElement();
      this._renderNoFilms();
    }
  }

  _onShowMoreButtonClick() {
    this._filmsData.slice(this._renderFilms, this._renderFilms + FILM_CARD_COUNT.render).forEach((filmData) => this._renderFilm(this._mainFilmsList.getElement().querySelector(`.films-list__container`), filmData));

    this._renderFilms += FILM_CARD_COUNT.render;

    if (this._filmsData.length <= this._renderFilms) {
      this._renderShowMoreButton();
    }
  }

  // ! Временное решение
  _onViewChange() {
    this._subscriptions.forEach((subscription) => subscription());
  }
}
