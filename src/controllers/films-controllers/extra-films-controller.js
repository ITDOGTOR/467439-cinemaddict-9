import TopRatedFilmsList from '../../components/films-lists/top-rated-films-list.js';
import MostCommentedFilmsList from '../../components/films-lists/most-commented-films-list.js';

import MovieController from '../movie-controllers/movie-controller.js';

import {PageGlobalSetting, renderElement} from '../../util.js';

export default class ExtraFilmsController {
  constructor(container, filmsData, onDataChange, openMoviePopupEvent) {
    this._container = container;
    this._filmsData = filmsData;
    this._onDataChange = onDataChange;
    this._openMoviePopupEvent = openMoviePopupEvent;

    this._startRender = 0;
    this._extraRenderFilms = PageGlobalSetting.EXTRA_RENDER;

    this._topRatedFilmsList = new TopRatedFilmsList();
    this._mostCommentedFilmsList = new MostCommentedFilmsList();

    this._init();
  }

  show() {
    this.updateView(this._filmsData);
  }

  hide() {
    this._topRatedFilmsList.removeElement();
    this._mostCommentedFilmsList.removeElement();
  }

  updateView(updatedFilmsData) {
    this._topRatedFilmsList.removeElement();
    this._mostCommentedFilmsList.removeElement();

    this._filmsData = updatedFilmsData;
    this._topRatedFilmsList = new TopRatedFilmsList();
    this._mostCommentedFilmsList = new MostCommentedFilmsList();

    this._init();
  }

  _init() {
    renderElement(this._container, this._topRatedFilmsList.getElement());
    renderElement(this._container, this._mostCommentedFilmsList.getElement());

    this._createFilms(this._filmsData);
  }

  _createFilms(filmsData) {
    filmsData.slice().sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating).slice(this._startRender, this._extraRenderFilms)
      .forEach((filmData) => this._renderFilm(this._topRatedFilmsList.getElement()
      .querySelector(`.films-list__container`), filmData));

    filmsData.slice().sort((a, b) => b.comments.length - a.comments.length).slice(this._startRender, this._extraRenderFilms)
      .forEach((filmData) => this._renderFilm(this._mostCommentedFilmsList.getElement()
      .querySelector(`.films-list__container`), filmData));
  }

  _renderFilm(container, filmData) {
    const movieController = new MovieController(container, filmData, this._onDataChange, this._openMoviePopupEvent, `films-list`);

    movieController.init();
  }
}
