import StatisticInfo from '../components/statistic-info.js';

import {renderElement, getDurationFilmFromMinutes, getGenresCount} from '../util.js';

export default class StatisticInfoController {
  constructor(container, filmsData) {
    this._container = container;
    this._filmsData = filmsData;

    this._statisticInfo = new StatisticInfo(this._getStatistic(this._filmsData));

    this._init();
  }

  update(updatedFilmsData) {
    this._statisticInfo.removeElement();

    this._updateData(updatedFilmsData);
  }

  _updateData(updatedFilmsData) {
    this._filmsData = updatedFilmsData;

    this._updateView(this._filmsData);
  }

  _updateView(updatedFilmsData) {
    this._statisticInfo = new StatisticInfo(this._getStatistic(updatedFilmsData));

    renderElement(this._container, this._statisticInfo.getElement());
  }

  _init() {
    renderElement(this._container, this._statisticInfo.getElement());
  }

  _getStatistic(filmsData) {
    const watched = filmsData.filter((filmData) => filmData.isWatched);
    const duration = !watched.length ? 0 : watched.map((filmData) => filmData.duration).reduce((acc, durationFilm) => acc + durationFilm);
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
