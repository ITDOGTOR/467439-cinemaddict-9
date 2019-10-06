import {
  TITLES,
  RATINGS,
  YEARS,
  DURATIONS,
  GENRES,
  POSTERS,
  DESCRIPTIONS,
  DIRECTORS,
  WRITERS,
  ACTORS,
  COUNTRIES,
  AGE_RATINGS,
  COMMENTATORS,
  COMMENTS,
  EMOTIONS,
  COMMENT_COUNT,
  PARAMETER_COUNT,
  FILM_CARD_COUNT,
} from '../src/constants.js';
import {getRandomArrayElement, getRandomDate, getRandomBoolean, getRandomArrayElements, getRandomInt} from '../src/util.js';

const getComment = () => ({
  commentator: getRandomArrayElement(COMMENTATORS),
  comment: getRandomArrayElement(COMMENTS),
  emotion: getRandomArrayElement(EMOTIONS),
  commentDate: getRandomDate(),
});

const getFilmCard = () => ({
  poster: getRandomArrayElement(POSTERS),
  title: getRandomArrayElement(TITLES),
  originalTitle: getRandomArrayElement(TITLES),
  rating: getRandomArrayElement(RATINGS),
  userRating: null,
  director: getRandomArrayElement(DIRECTORS),
  writers: getRandomArrayElements(WRITERS, PARAMETER_COUNT.default),
  actors: getRandomArrayElements(ACTORS, PARAMETER_COUNT.default),
  releaseDate: getRandomArrayElement(YEARS),
  duration: getRandomArrayElement(DURATIONS),
  country: getRandomArrayElement(COUNTRIES),
  genres: getRandomArrayElements(GENRES, getRandomInt(PARAMETER_COUNT)),
  description: getRandomArrayElements(DESCRIPTIONS, getRandomInt(PARAMETER_COUNT)).join(` `),
  ageRating: getRandomArrayElement(AGE_RATINGS),
  comments: Array.from(Array(getRandomInt(COMMENT_COUNT))).map(getComment),
  inWatchlist: getRandomBoolean(),
  isWatched: getRandomBoolean(),
  isFavorite: getRandomBoolean(),
  watchingDate: getRandomDate(),
});

const filmsData = Array.from(Array(getRandomInt(FILM_CARD_COUNT))).map(getFilmCard);

const getRankProfile = (rank) => {
  if (rank === 0) {
    return ``;
  }
  if (rank <= 10) {
    return `Novice`;
  }
  if (rank <= 20) {
    return `Fan`;
  }

  return `Movie Buff`;
};

export {filmsData, getRankProfile};
