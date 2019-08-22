import {
  FILM_CARD_TITLES,
  FILM_CARD_RATINGS,
  FILM_CARD_YEARS,
  FILM_CARD_DURATIONS,
  FILM_CARD_GENRES,
  FILM_CARD_POSTERS,
  FILM_CARD_DESCRIPTIONS,
  FILM_CARD_DIRECTORS,
  FILM_CARD_WRITERS,
  FILM_CARD_ACTORS,
  FILM_CARD_COUNTRIES,
  FILM_CARD_AGE_RATINGS,
  FILM_CARD_COMMENT_COUNT,
  FILM_CARD_DESCRIPTION_COUNT,
  FILM_CARD_GENRE_COUNT,
  FILM_CARD_COUNT
} from '../src/constants.js';
import {getRandomArrayElement, getRandomBoolean, getRandomInt} from '../src/util.js';

const getFilmCard = () => ({
  poster: getRandomArrayElement(FILM_CARD_POSTERS),
  title: getRandomArrayElement(FILM_CARD_TITLES),
  originalTitle: getRandomArrayElement(FILM_CARD_TITLES),
  rating: getRandomArrayElement(FILM_CARD_RATINGS),
  userRating: ``,
  director: getRandomArrayElement(FILM_CARD_DIRECTORS),
  writers: getRandomArrayElement(FILM_CARD_WRITERS),
  actors: getRandomArrayElement(FILM_CARD_ACTORS),
  releaseDate: getRandomArrayElement(FILM_CARD_YEARS),
  duration: getRandomArrayElement(FILM_CARD_DURATIONS),
  country: getRandomArrayElement(FILM_CARD_COUNTRIES),
  genres: Array.from(Array(getRandomInt(FILM_CARD_GENRE_COUNT))).map(() => getRandomArrayElement(FILM_CARD_GENRES)),
  description: Array.from(Array(getRandomInt(FILM_CARD_DESCRIPTION_COUNT))).map(() => getRandomArrayElement(FILM_CARD_DESCRIPTIONS)).join(` `),
  ageRating: getRandomArrayElement(FILM_CARD_AGE_RATINGS),
  comments: getRandomInt(FILM_CARD_COMMENT_COUNT),
  isWatchlist: getRandomBoolean(),
  isWatched: getRandomBoolean(),
  isFavorites: getRandomBoolean(),
});

const films = Array.from(Array(getRandomInt(FILM_CARD_COUNT))).map(getFilmCard);

const getRankProfile = (rank) => {
  if (rank > 0 && rank <= 10) {
    return `Novice`;
  } else if (rank > 10 && rank <= 20) {
    return `Fan`;
  } else if (rank > 21) {
    return `Movie Buff`;
  }

  return ``;
};

const filters = [
  {
    id: `all`,
    title: `All movies`,
    count: ``
  },
  {
    id: `watchlist`,
    title: `Watchlist`,
    count: films.filter((it) => it.isWatchlist).length
  },
  {
    id: `history`,
    title: `History`,
    count: films.filter((it) => it.isWatched).length
  },
  {
    id: `favorites`,
    title: `Favorites`,
    count: films.filter((it) => it.isFavorites).length
  },
  {
    id: `stats`,
    title: `Stats`,
    count: ``
  },
];

export {films, getRankProfile, filters};
