import API from '../../api/api.js';

import NoFilms from '../../components/films-lists/no-films.js';

import HeaderController from './header-controller.js';
import MainController from './main-controller.js';
import FooterController from './footer-controller.js';

import {PageGlobalSetting, setNoFilmsText, renderElement} from '../../util.js';

export default class PageController {
  constructor() {
    this._api = new API({endPoint: PageGlobalSetting.END_POINT, authorization: PageGlobalSetting.AUTHORIZATION});

    this._noFilms = new NoFilms();

    this._headerController = null;
    this._mainController = null;
    this._footerController = null;
  }

  init() {
    this._renderNoFilms(false, `loading`, document.querySelector(`.main`));

    this._api.getFilms().then((filmsData) => {
      this._onLoadFilmsEvent(true);
      this._headerController = new HeaderController(filmsData, this._onSearchEvent.bind(this));
      this._mainController = new MainController(filmsData, this._onDataChange.bind(this));
      this._footerController = new FooterController(filmsData);
      this._footerController.init();
    });
  }

  _renderNoFilms(remove = false, state = `no-result`, container) {
    this._noFilms.removeElement();

    if (remove) {
      return;
    }

    this._noFilms = new NoFilms(setNoFilmsText(state));
    renderElement(container, this._noFilms.getElement());
  }

  _onLoadFilmsEvent() {
    this._renderNoFilms(true);
  }

  _onSearchEvent(filmsFound, searchingMode) {
    this._mainController.showSearch(filmsFound, searchingMode);
  }

  _onDataChange(actionStatus, update, context) {
    switch (actionStatus) {
      case `update`:
        this._api.updateFilm({
          id: update.id,
          data: update.toRAW()
        })
          .then((filmData) => this._api.getFilms()
            .then((filmsData) => {
              this._mainController.updateFilmsData(filmsData);
              this._mainController.updateMenuItems(filmsData);
              this._headerController.updateUserRank(filmsData);

              switch (context) {
                case `films-list`:
                  this._mainController.updateFilmsList(filmsData);
                  this._mainController.updateExtraFilmsList(filmsData);
                  break;
                case `popup`:
                  this._mainController.updateFilmsList(filmsData);
                  this._mainController.updateExtraFilmsList(filmsData);
                  this._mainController.updatePopupControls(filmData);
              }
            }))
          .catch(() => this._mainController.rejectPopupControls());
        break;
      case `update-rating`:
        this._api.updateFilm({
          id: update.id,
          data: update.toRAW()
        })
          .then((filmData) => {
            this._mainController.updatePopupUserRating(filmData);
          })
            .then(() => this._api.getFilms()
              .then((filmsData) => {
                this._mainController.updateMenuItems(filmsData);
                this._mainController.updateFilmsList(filmsData);
                this._mainController.updateExtraFilmsList(filmsData);
              }))
            .catch(() => this._mainController.rejectPopupRating());
        break;
      case `delete-rating`:
        this._api.updateFilm({
          id: update.id,
          data: update.toRAW()
        })
          .then(() => {
            this._mainController.deletePopupUserRating();
          })
            .then(() => this._api.getFilms()
              .then((filmsData) => {
                this._mainController.updateMenuItems(filmsData);
                this._mainController.updateFilmsList(filmsData);
                this._mainController.updateExtraFilmsList(filmsData);
              }))
            .catch(() => this._mainController.rejectPopupRating());
        break;
      case `create-comment`:
        this._api.createComment({
          id: update.id,
          data: update.toRAW()
        })
          .then(() => this._api.getComments(update.id)
            .then((commentsData) => {
              this._mainController.updatePopupComments(commentsData);
            }))
          .then(() => this._api.getFilms()
            .then((filmsData) => {
              this._mainController.updateMenuItems(filmsData);
              this._mainController.updateFilmsList(filmsData);
              this._mainController.updateExtraFilmsList(filmsData);
            }));
        break;
      case `delete-comment`:
        this._api.deleteComment(update)
          .then(() => this._api.getComments(context)
            .then((commentsData) => {
              this._mainController.updatePopupComments(commentsData);
            }))
            .then(() => this._api.getFilms()
              .then((filmsData) => {
                this._mainController.updateMenuItems(filmsData);
                this._mainController.updateFilmsList(filmsData);
                this._mainController.updateExtraFilmsList(filmsData);
              }));
        break;
    }
  }
}
