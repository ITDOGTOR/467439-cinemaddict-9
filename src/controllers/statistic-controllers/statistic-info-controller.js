import StatisticInfo from '../../components/statistic/statistic-info.js';

import {renderElement, getDurationFilmFromMinutes, getGenresCount} from '../../util.js';

export default class StatisticInfoController {
  constructor(container, filmsData) {
    this._container = container;
    this._filmsData = filmsData;

    this._statisticInfo = new StatisticInfo(this._getStatistic(this._filmsData));

    this._init();
  }

  updateView(container, updatedFilmsData) {
    this._statisticInfo.removeElement();

    this._filmsData = updatedFilmsData;
    this._statisticInfo = new StatisticInfo(this._getStatistic(updatedFilmsData));

    renderElement(container, this._statisticInfo.getElement());
  }

  _init() {
    renderElement(this._container, this._statisticInfo.getElement());
  }

  _getStatistic(filmsData) {
    const watched = filmsData.filter(({userDetails}) => userDetails.alreadyWatched);
    const duration = !watched.length ? 0 : watched.map(({filmInfo}) => filmInfo.runtime)
      .reduce((acc, runtimeFilm) => acc + runtimeFilm);
    const topGenre = !watched.length ? `` : this._getTopGenre(watched);

    return {
      watchedCount: watched.length,
      totalDuration: {
        hours: getDurationFilmFromMinutes(duration, `hours`),
        minutes: getDurationFilmFromMinutes(duration, `minutes`),
      },
      topGenre,
    };
  }

  _getTopGenre(filmsWatched) {
    let maxValue;
    let topGenre;

    for (let [key, value] of Object.entries(getGenresCount(filmsWatched))) {
      if (!maxValue || value > maxValue) {
        maxValue = value;
        topGenre = key;
      }
    }

    return topGenre;
  }
}
