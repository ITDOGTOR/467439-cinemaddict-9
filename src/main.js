import AllFilms from '../src/components/all-films.js';
import Search from '../src/components/search.js';
import Profile from '../src/components/profile.js';
import MainNavigation from '../src/components/main-navigation.js';
import Filter from '../src/components/filter.js';
import PageController from '../src/controllers/page-controller.js';

import {filmsList, filtersList, getRankProfile} from '../src/data.js';
import {renderElement} from '../src/util.js';

const copyFilms = filmsList.slice();

const renderFilter = (filter) => {
  const filterElement = new Filter(filter);
  const filtersContainer = main.querySelector(`.main-navigation`);

  renderElement(filtersContainer, filterElement.getElement());
};

const renderFilters = (filters) => filters.forEach((filter) => renderFilter(filter));

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const rankProfile = getRankProfile(copyFilms.filter((it) => it.isWatched).length);

renderElement(header, new Search().getElement());
renderElement(header, new Profile(rankProfile).getElement());
renderElement(footer, new AllFilms(filmsList.length).getElement());
renderElement(main, new MainNavigation().getElement());
renderFilters(filtersList);
const pageController = new PageController(main, copyFilms);
pageController.init();
