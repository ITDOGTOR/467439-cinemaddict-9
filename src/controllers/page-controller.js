import Sort from '../components/sort.js';
import FilmsContainer from '../components/films-container.js';
import FilmCard from '../components/film-card.js';
import FilmPopup from '../components/film-popup.js';
import Comment from '../components/comment.js';
import ShowMoreButton from '../components/show-more-button.js';
import NoFilms from '../components/no-films.js';

import {renderElement, unrenderElement, Key} from '../util.js';
import {FILM_CARD_COUNT} from '../constants.js';

const {render, extraRender} = FILM_CARD_COUNT;

export default class PageController {
  constructor(container, films) {
    this._container = container;
    this._films = films;
    this._sort = new Sort();
    this._filmsContainer = new FilmsContainer();
    this._showMoreButton = new ShowMoreButton();
    this._noFilms = new NoFilms();
    this._unrenderedFilms = null;
  }

  _renderFilm(container, film) {
    const filmCard = new FilmCard(film);
    const filmPopup = new FilmPopup(film);
    const bodyElement = document.querySelector(`body`);

    const onEscKeyDown = (evt) => {
      if (evt.key === Key.ESCAPE_IE || evt.key === Key.ESCAPE) {
        filmPopup.removeElement();
        bodyElement.classList.remove(`hide-overflow`);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    filmCard.getElement().addEventListener(`click`, () => {
      renderElement(bodyElement, filmPopup.getElement());
      bodyElement.classList.add(`hide-overflow`);

      const commentsContainer = filmPopup.getElement().querySelector(`.film-details__comments-list`);
      film.comments.forEach((comment) => renderElement(commentsContainer, new Comment(comment).getElement()));

      document.addEventListener(`keydown`, onEscKeyDown);

      filmPopup.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, (evt) => {
        evt.preventDefault();
        filmPopup.removeElement();
        bodyElement.classList.remove(`hide-overflow`);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

      filmPopup.getElement().querySelector(`.film-details__comment-input`).addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

      filmPopup.getElement().querySelector(`.film-details__comment-input`).addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });
    });

    renderElement(container, filmCard.getElement());
  }

  _renderFilms(container, films, count) {
    films.splice(0, count).forEach((film) => this._renderFilm(container, film));
  }

  _renderShowMoreButton(films) {
    if (films.length > render) {
      renderElement(this._filmsContainer.getElement().querySelector(`.films-list`), this._showMoreButton.getElement());
    }
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._sort.getElement().querySelectorAll(`a`).forEach((link) => link.classList.remove(`sort__button--active`));
    evt.target.classList.add(`sort__button--active`);

    const allFilmsContainer = this._filmsContainer.getElement().querySelector(`#all-films`);

    const getSortedFilms = (callback) => {
      const sortedFilms = this._films.slice().sort((a, b) => callback(a, b));
      this._renderShowMoreButton(sortedFilms);
      this._renderFilms(allFilmsContainer, sortedFilms, render);
      this._unrenderedFilms = sortedFilms;
    };

    allFilmsContainer.innerHTML = ``;

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

    if (!this._films.length) {
      renderElement(this._container, this._noFilms.getElement());
      return;
    }

    renderElement(this._container, this._filmsContainer.getElement());

    const allFilmsContainer = this._filmsContainer.getElement().querySelector(`#all-films`);
    const topRatedFilmsContainer = this._filmsContainer.getElement().querySelector(`#top-rated`);
    const mostCommentedFilmsContainer = this._filmsContainer.getElement().querySelector(`#most-commented`);

    this._renderFilms(allFilmsContainer, copyFilms, render);
    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    this._renderShowMoreButton(this._films);
    this._unrenderedFilms = copyFilms;
    this._renderFilms(topRatedFilmsContainer, copyFilmsTopRated, extraRender);
    this._renderFilms(mostCommentedFilmsContainer, copyFilmsMostCommented, extraRender);

    this._showMoreButton.getElement().addEventListener(`click`, () => {
      if (this._unrenderedFilms.length) {
        this._renderFilms(allFilmsContainer, this._unrenderedFilms, render);

        if (!this._unrenderedFilms.length) {
          unrenderElement(this._showMoreButton.getElement());
        }
      }
    });
  }
}
