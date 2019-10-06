const TITLES = [
  `The Shawshank Redemption`,
  `The Godfather`,
  `The Dark Knight`,
  `The Lord of the Rings: The Fellowship of the Ring`,
  `The Lord of the Rings: The Two Towers`,
  `The Lord of the Rings: The Return of the King`,
  `Pulp Fiction`,
  `Fight Club`,
  `Forrest Gump`,
  `Il buono, il brutto, il cattivo`,
  `The Matrix`,
  `Sen to Chihiro no kamikakushi`,
  `The Green Mile`,
  `La vita è bella`,
  `Léon`
];

const RATINGS = [
  `9.3`,
  `9.2`,
  `9.0`,
  `8.8`,
  `8.7`,
  `8.9`,
  `8.6`
];

const USER_RATINGS = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9
];

const YEARS = [
  782145154000,
  70303631000,
  1218699174000,
  814993324000
];

const DURATIONS = [
  142,
  175,
  152,
  178,
  201,
  116,
  110,
  189
];

const GENRES = [
  `Drama`,
  `Crime`,
  `Action`,
  `Adventure`,
  `Fantasy`,
  `Romance`,
  `Western`,
  `Animation`,
  `Comedy`
];

const POSTERS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const DIRECTORS = [
  `Frank Darabont`,
  `Francis Ford Coppola`,
  `Christopher Nolan`,
  `Quentin Tarantino`
];

const WRITERS = [
  `Stephen King`,
  `Frank Darabont`,
  `Mario Puzo`,
  `Francis Ford Coppola`,
  `Jonathan Nolan`,
  `Christopher Nolan`,
  `Quentin Tarantino`,
  `Roger Avary`
];

const ACTORS = [
  `Tim Robbins`,
  `Morgan Freeman`,
  `Bob Gunton`,
  `Marlon Brando`,
  `Al Pacino`,
  `James Caan`,
  `Christian Bale`,
  `Heath Ledger`,
  `Aaron Eckhart`,
  `John Travolta`,
  `Uma Thurman`,
  `Samuel L. Jackson`
];

const COUNTRIES = [
  `USA`,
  `Russia`,
  `France`,
  `Italy`,
  `Spain`,
  `Germany`
];

const AGE_RATINGS = [
  18,
  6,
  0,
  14,
  8
];

const COMMENTATORS = [
  `Джон Уик`,
  `Альфа Самка`,
  `Юрий Музыченко`,
  `Тилль Линдеманн`,
  `Курт Кобейн`,
  `Жора Крыжовников`
];

const COMMENTS = [
  `Это ШЕДЕВРРРРРР!`,
  `Какое унылое и скучное дерьмище!!!`,
  `Какой ДЦП это снимал???`,
  `Фильм атстой. Пайду лучши в майнкрафт паиграю`,
  `С позиции десятилетнего кинокритика, могу сказать что этот фильм действительно неплох. Отличная актёрская игра. Живое окружение. У этого режиссёра уже выходили отличные фильмы, но этот, венец его творения. 10/10`,
  `Моя оценка 6, не больше.`,
  `-10. Шыдэвор`
];

const EMOTIONS = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

const COMMENT_COUNT = {
  min: 0,
  max: 10,
};

const PARAMETER_COUNT = {
  min: 1,
  max: 3,
  default: 3,
};

const FILM_CARD_COUNT = {
  min: 0,
  max: 50,
  render: 5,
  extraRender: 2,
};

const MAX_SYMBOLS_DESCRIPTION = 140;
const PERMISSION_SYMBOLS_DESCRIPTION = 139;

export {
  TITLES,
  RATINGS,
  USER_RATINGS,
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
  MAX_SYMBOLS_DESCRIPTION,
  PERMISSION_SYMBOLS_DESCRIPTION
};
