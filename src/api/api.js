import FilmModel from '../models/film-model.js';
import CommentModel from '../models/comment-model.js';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

export const ServerStatus = {
  SUCCESS: 200,
  REDIRECTION: 300
};

const checkStatus = (response) => {
  if (response.status >= ServerStatus.SUCCESS && response.status < ServerStatus.REDIRECTION) {
    return response;
  }

  throw new Error(`${response.status}: ${response.statusText}`);
};

const toJSON = (response) => {
  return response.json();
};

export default class API {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: `movies`})
      .then(toJSON)
      .then(FilmModel.parseFilms);
  }

  getComments(filmId) {
    return this._load({url: `comments/${filmId}`})
      .then(toJSON)
      .then(CommentModel.parseComments);
  }

  updateFilm({id, data}) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON)
      .then(FilmModel.parseFilm);
  }

  createComment({id, data}) {
    return this._load({
      url: `comments/${id}`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(toJSON);
  }

  deleteComment(id) {
    return this._load({
      url: `comments/${id}`,
      method: Method.DELETE
    });
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((error) => {
        throw new Error(`fetch error: ${error}`);
      });
  }
}
