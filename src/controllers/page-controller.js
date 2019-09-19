import Sort from '../components/sort.js';
import MovieController from '../controllers/movie-controller.js';
import FilmsContainer from '../components/films-container.js';
import AllFilmsList from '../components/all-films-list.js';
import TopRatedFilmsList from '../components/top-rated-films-list.js';
import MostCommentedFilmsList from '../components/most-commented-films-list.js';
import ShowMoreButton from '../components/show-more-button.js';
import NoFilms from '../components/no-films.js';

import {renderElement, unrenderElement} from '../util.js';
import {FILM_CARD_COUNT} from '../constants.js';

const {render, extraRender} = FILM_CARD_COUNT;

export default class PageController {
  constructor(container, films) {
    this._container = container;
    this._films = films;
    this._sort = new Sort();
    this._filmsContainer = new FilmsContainer();
    this._allFilmsList = new AllFilmsList();
    this._topRatedFilmsList = new TopRatedFilmsList();
    this._mostCommentedFilmsList = new MostCommentedFilmsList();
    this._showMoreButton = new ShowMoreButton();
    this._noFilms = new NoFilms();

    this._unrenderedFilms = null;
    this._visibleFilms = render;

    this._subscriptions = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
  }

  _renderFilmsContainers() {
    const getSortedDown = (callback) => this._films.slice().sort((a, b) => callback(a, b));

    const renderNewDataFilms = (container, filmsList, count = this._visibleFilms) => {
      container.getElement().querySelector(`.films-list__container`).innerHTML = ``;
      this._renderFilms(container.getElement().querySelector(`.films-list__container`), filmsList.slice(), count);
    };

    const copyFilms = this._films.slice();
    const copyFilmsTopRated = getSortedDown((a, b) => b.rating - a.rating);
    const copyFilmsMostCommented = getSortedDown((a, b) => b.comments.length - a.comments.length);

    renderNewDataFilms(this._allFilmsList, copyFilms);
    renderNewDataFilms(this._topRatedFilmsList, copyFilmsTopRated, extraRender);
    renderNewDataFilms(this._mostCommentedFilmsList, copyFilmsMostCommented, extraRender);
  }

  _renderFilms(container, filmsList, count = render) {
    filmsList.splice(0, count).forEach((film) => {
      const movieController = new MovieController(container, film, this._onDataChange, this._onChangeView);
      this._subscriptions.push(movieController.setDefaultView.bind(movieController));
    });
  }

  _renderShowMoreButton(films) {
    if (films.length > render) {
      renderElement(this._allFilmsList.getElement(), this._showMoreButton.getElement());
    }
  }

  _onDataChange(oldData, control) {
    const currentFilm = this._films[this._films.findIndex((it) => it === oldData)];

    switch (control) {
      case `watchlist`:
        currentFilm.inWatchlist = !currentFilm.inWatchlist ? true : false;
        break;
      case `watched`:
        currentFilm.isWatched = !currentFilm.isWatched ? true : false;
        break;
      case `favorite`:
        currentFilm.isFavorite = !currentFilm.isFavorite ? true : false;
        break;
    }

    this._renderFilmsContainers();
  }

  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._sort.getElement().querySelectorAll(`a`).forEach((link) => link.classList.remove(`sort__button--active`));
    evt.target.classList.add(`sort__button--active`);

    const getSortedFilms = (callback) => {
      const sortedFilms = this._films.slice().sort((a, b) => callback(a, b));
      this._renderFilms(this._allFilmsList.getElement().querySelector(`.films-list__container`), sortedFilms, this._visibleFilms);
      this._unrenderedFilms = sortedFilms;
    };

    this._allFilmsList.getElement().querySelector(`.films-list__container`).innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `date`:
        getSortedFilms(((a, b) => b.releaseDate - a.releaseDate));
        break;
      case `rating`:
        getSortedFilms((a, b) => b.rating - a.rating);
        break;
      case `default`:
        getSortedFilms(() => true);
        break;
    }
  }

  init() {
    const getSortedDown = (callback) => this._films.slice().sort((a, b) => callback(a, b));

    const copyFilms = this._films.slice();
    const copyFilmsTopRated = getSortedDown((a, b) => b.rating - a.rating);
    const copyFilmsMostCommented = getSortedDown((a, b) => b.comments.length - a.comments.length);

    renderElement(this._container, this._sort.getElement());
    renderElement(this._container, this._filmsContainer.getElement());

    if (!this._films.length) {
      renderElement(this._filmsContainer.getElement(), this._noFilms.getElement());
      return;
    }

    renderElement(this._filmsContainer.getElement(), this._allFilmsList.getElement());
    this._renderFilms(this._allFilmsList.getElement().querySelector(`.films-list__container`), copyFilms);
    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    this._renderShowMoreButton(this._films);
    this._unrenderedFilms = copyFilms;

    if (copyFilmsTopRated.length) {
      renderElement(this._filmsContainer.getElement(), this._topRatedFilmsList.getElement());
      this._renderFilms(this._topRatedFilmsList.getElement().querySelector(`.films-list__container`), copyFilmsTopRated, extraRender);
    }

    if (copyFilmsMostCommented.length) {
      renderElement(this._filmsContainer.getElement(), this._mostCommentedFilmsList.getElement());
      this._renderFilms(this._mostCommentedFilmsList.getElement().querySelector(`.films-list__container`), copyFilmsMostCommented, extraRender);
    }

    this._showMoreButton.getElement().addEventListener(`click`, () => {
      if (this._unrenderedFilms.length) {
        this._renderFilms(this._allFilmsList.getElement().querySelector(`.films-list__container`), this._unrenderedFilms);
        this._visibleFilms = this._films.length - this._unrenderedFilms.length;

        if (!this._unrenderedFilms.length) {
          unrenderElement(this._showMoreButton.getElement());
        }
      }
    });
  }
}
