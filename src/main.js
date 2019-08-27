import {createSearchTemplate} from '../src/components/search.js';
import {createProfileTemplate} from '../src/components/profile.js';
import {createMainNavigationTemplate} from '../src/components/main-navigation.js';
import {createFilterTemplate} from '../src/components/filter.js';
import {createSortingTemplate} from '../src/components/sorting.js';
import {createFilmsBlockTemplate} from '../src/components/films.js';
import {createFilmCardTemplate} from '../src/components/film-card.js';
import {createShowMoreButtonTemplate} from '../src/components/show-more-button.js';
import {createAllFilmsTemplate} from '../src/components/all-films.js';
import {films, filters, getRankProfile} from '../src/data.js';
import {FILM_CARD_COUNT} from '../src/constants.js';

const {firstRender, extraRender, moreRender} = FILM_CARD_COUNT;
const filmsArray = films.slice();
const filmsArrayExtra = films.splice(0, extraRender);

const renderTemplate = (container, template, place = `beforeEnd`) => container.insertAdjacentHTML(place, template);
const renderListTemplate = (container, list, template, place = `beforeEnd`) => container.insertAdjacentHTML(place, list.map(template).join(``));

const mainHeaderElement = document.querySelector(`.header`);
const siteFooterElement = document.querySelector(`.footer`);

renderTemplate(mainHeaderElement, createSearchTemplate());
renderTemplate(mainHeaderElement, createProfileTemplate(getRankProfile(filmsArray.filter((it) => it.isWatched).length)));
renderTemplate(siteFooterElement, createAllFilmsTemplate(filmsArray.length));

const siteMainElement = document.querySelector(`.main`);

renderTemplate(siteMainElement, createMainNavigationTemplate());

const siteMenuElement = siteMainElement.querySelector(`.main-navigation`);

renderListTemplate(siteMenuElement, filters, createFilterTemplate);

renderTemplate(siteMainElement, createSortingTemplate());
renderTemplate(siteMainElement, createFilmsBlockTemplate());

const filmsListElement = siteMainElement.querySelector(`.films-list`);
const filmsListContainerElements = siteMainElement.querySelectorAll(`.films-list__container`);

filmsListContainerElements.forEach((element) => {
  if (filmsListElement.contains(element) && !(filmsListElement.classList.contains(`films-list--extra`))) {
    renderListTemplate(element, filmsArray.splice(0, firstRender), createFilmCardTemplate);
  } else {
    renderListTemplate(element, filmsArrayExtra, createFilmCardTemplate);
  }
});

renderTemplate(filmsListElement, createShowMoreButtonTemplate());

const renderMoreFilmsHandler = () => {
  if (filmsArray.length) {
    renderListTemplate(filmsListContainerElements[0], filmsArray.splice(0, moreRender), createFilmCardTemplate);

    if (!filmsArray.length) {
      showMoreElement.style.display = `none`;
      showMoreElement.removeEventListener(`click`, renderMoreFilmsHandler);
    }
  }
};

const showMoreElement = filmsListElement.querySelector(`.films-list__show-more`);

showMoreElement.addEventListener(`click`, renderMoreFilmsHandler);
