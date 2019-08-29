import AllFilms from '../src/components/all-films.js';
import Search from '../src/components/search.js';
import Profile from '../src/components/profile.js';
import MainNavigation from '../src/components/main-navigation.js';
import Filter from '../src/components/filter.js';
import Sorting from '../src/components/sorting.js';
import FilmsContainer from '../src/components/films-container.js';
import FilmCard from '../src/components/film-card.js';
import FilmPopup from '../src/components/film-popup.js';
import Comment from '../src/components/comment.js';
import ShowMoreButton from '../src/components/show-more-button.js';
import NoFilms from '../src/components/no-films.js';

import {filmsList, filtersList, getRankProfile} from '../src/data.js';
import {FILM_CARD_COUNT} from '../src/constants.js';
import {renderElement} from '../src/util.js';

const {render, extraRender} = FILM_CARD_COUNT;

const copyFilms = filmsList.slice();
const copyFilmsTopRated = filmsList.slice(0, extraRender);
const copyFilmsMostCommented = filmsList.slice(0, extraRender);

const renderFilm = (container, filmMock) => {
  const filmCard = new FilmCard(filmMock);
  const filmPopup = new FilmPopup(filmMock);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      filmPopup.removeElement();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmCard.getElement().addEventListener(`click`, () => {
    renderElement(body, filmPopup.getElement());

    const commentsContainer = filmPopup.getElement().querySelector(`.film-details__comments-list`);
    filmMock.comments.forEach((comment) => renderElement(commentsContainer, new Comment(comment).getElement()));

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
};

const renderFilter = (filter) => {
  const filterElement = new Filter(filter);
  const filtersContainer = main.querySelector(`.main-navigation`);

  renderElement(filtersContainer, filterElement.getElement());
};

const renderFilms = (container, films, count) => films.splice(0, count).forEach((filmMock) => renderFilm(container, filmMock));
const renderFilters = (filters) => filters.forEach((filter) => renderFilter(filter));

const body = document.querySelector(`body`);
const header = body.querySelector(`.header`);
const main = body.querySelector(`.main`);
const footer = body.querySelector(`.footer`);
const rankProfile = getRankProfile(copyFilms.filter((it) => it.isWatched).length);

const renderMainComponents = () => {
  renderElement(header, new Search().getElement());
  renderElement(header, new Profile(rankProfile).getElement());
  renderElement(footer, new AllFilms(filmsList.length).getElement());
  renderElement(main, new MainNavigation().getElement());
  renderFilters(filtersList);
  renderElement(main, new Sorting().getElement());

  if (!copyFilms.length) {
    renderElement(main, new NoFilms().getElement());
    return;
  }

  const filmsMainContainer = new FilmsContainer();
  renderElement(main, filmsMainContainer.getElement());

  const allFilmsContainer = filmsMainContainer.getElement().querySelector(`#all-films`);
  const topRatedFilmsContainer = filmsMainContainer.getElement().querySelector(`#top-rated`);
  const mostCommentedFilmsContainer = filmsMainContainer.getElement().querySelector(`#most-commented`);
  const filmsListContainer = main.querySelector(`.films-list`);

  if (copyFilms.length > render) {
    renderElement(filmsListContainer, new ShowMoreButton().getElement());
  }

  renderFilms(allFilmsContainer, copyFilms, render);
  renderFilms(topRatedFilmsContainer, copyFilmsTopRated, extraRender);
  renderFilms(mostCommentedFilmsContainer, copyFilmsMostCommented, extraRender);
};

renderMainComponents();

const onMoreFilms = () => {
  if (copyFilms.length) {
    renderFilms(allFilmsContainer, copyFilms, render);

    if (!copyFilms.length) {
      showMoreButton.style.display = `none`;
      showMoreButton.removeEventListener(`click`, onMoreFilms);
    }
  }
};
const allFilmsContainer = document.querySelector(`#all-films`);
const showMoreButton = document.querySelector(`.films-list__show-more`);

if (showMoreButton) {
  showMoreButton.addEventListener(`click`, onMoreFilms);
}
