import Sort from '../components/sort.js';
import FilmsContainer from '../components/films-container.js';
import FilmCard from '../components/film-card.js';
import FilmPopup from '../components/film-popup.js';
import Comment from '../components/comment.js';
import ShowMoreButton from '../components/show-more-button.js';
import NoFilms from '../components/no-films.js';

import {renderElement, Key} from '../util.js';
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
  }

  _renderFilm(container, film) {
    const filmCard = new FilmCard(film);
    const filmPopup = new FilmPopup(film);

    const onEscKeyDown = (evt) => {
      if (evt.key === Key.ESCAPE_IE || evt.key === Key.ESCAPE) {
        filmPopup.removeElement();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    filmCard.getElement().addEventListener(`click`, () => {
      const bodyElement = document.querySelector(`body`);
      renderElement(bodyElement, filmPopup.getElement());

      const commentsContainer = filmPopup.getElement().querySelector(`.film-details__comments-list`);
      film.comments.forEach((comment) => renderElement(commentsContainer, new Comment(comment).getElement()));

      document.addEventListener(`keydown`, onEscKeyDown);

      filmPopup.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, (evt) => {
        evt.preventDefault();
        filmPopup.removeElement();
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

  init() {
    const renderFilms = (container, films, count) => {
      films.splice(0, count).forEach((film) => this._renderFilm(container, film));
    };

    const copyFilms = this._films.slice();
    const copyFilmsTopRated = this._films.slice(0, extraRender);
    const copyFilmsMostCommented = this._films.slice(0, extraRender);

    renderElement(this._container, this._sort.getElement());

    if (!this._films.length) {
      renderElement(this._container, this._noFilms.getElement());
      return;
    }

    renderElement(this._container, this._filmsContainer.getElement());

    const allFilmsContainer = this._filmsContainer.getElement().querySelector(`#all-films`);
    const topRatedFilmsContainer = this._filmsContainer.getElement().querySelector(`#top-rated`);
    const mostCommentedFilmsContainer = this._filmsContainer.getElement().querySelector(`#most-commented`);

    if (this._films.length > render) {
      renderElement(this._filmsContainer.getElement().querySelector(`.films-list`), this._showMoreButton.getElement());
    }

    renderFilms(allFilmsContainer, copyFilms, render);
    renderFilms(topRatedFilmsContainer, copyFilmsTopRated, extraRender);
    renderFilms(mostCommentedFilmsContainer, copyFilmsMostCommented, extraRender);

    const onMoreFilms = () => {
      if (copyFilms.length) {
        renderFilms(allFilmsContainer, copyFilms, render);

        if (!copyFilms.length) {
          showMoreButton.style.display = `none`;
          showMoreButton.removeEventListener(`click`, onMoreFilms);
        }
      }
    };

    const showMoreButton = this._showMoreButton.getElement();
    showMoreButton.addEventListener(`click`, onMoreFilms);
  }
}
