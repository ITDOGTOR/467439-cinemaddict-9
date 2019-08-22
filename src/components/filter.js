export const createFilterTemplate = ({id, title, count}) => {
  return `<a href="#${id}" class="main-navigation__item ${id === `all` ? `main-navigation__item--active` : ``} ${title === `Stats` ? `main-navigation__item--additional` : ``}">${title} ${!count ? `` : `<span class="main-navigation__item-count">${count}</span>`}</a>`;
};
