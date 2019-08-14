import {createSearchTemplate} from '../src/components/search.js';
import {createProfileTemplate} from '../src/components/profile.js';
import {createMainNavigationTemplate} from '../src/components/main-navigation.js';
import {createSortingTemplate} from '../src/components/sorting.js';
import {createFilmsBlockTemplate} from '../src/components/films.js';
import {createFilmCardTemplate} from '../src/components/film-card.js';
import {createShowMoreButtonTemplate} from '../src/components/show-more-button.js';

const FILMS_CARD_COUNT = 5;
const FILMS_CARD_EXTRA_COUNT = 2;

const renderTemplate = (container, template, place) => container.insertAdjacentHTML(place, template);

const mainHeaderElement = document.querySelector(`.header`);

renderTemplate(mainHeaderElement, createSearchTemplate(), `beforeEnd`);
renderTemplate(mainHeaderElement, createProfileTemplate(), `beforeEnd`);

const siteMainElement = document.querySelector(`.main`);

renderTemplate(siteMainElement, createMainNavigationTemplate(), `beforeEnd`);
renderTemplate(siteMainElement, createSortingTemplate(), `beforeEnd`);
renderTemplate(siteMainElement, createFilmsBlockTemplate(), `beforeEnd`);

const filmsListElement = siteMainElement.querySelector(`.films-list`);
const filmsListContainerElements = siteMainElement.querySelectorAll(`.films-list__container`);

filmsListContainerElements.forEach((element) => {
  if (filmsListElement.contains(element) && !(filmsListElement.classList.contains(`films-list--extra`))) {
    new Array(FILMS_CARD_COUNT).fill(``).forEach(() => renderTemplate(element, createFilmCardTemplate(), `beforeEnd`));
  } else {
    new Array(FILMS_CARD_EXTRA_COUNT).fill(``).forEach(() => renderTemplate(element, createFilmCardTemplate(), `beforeEnd`));
  }
});

renderTemplate(filmsListElement, createShowMoreButtonTemplate(), `beforeEnd`);
