import UserProfile from '../components/user-profile.js';
import {renderElement, getRankUser} from '../util.js';

export default class UserController {
  constructor(container, filmsData) {
    this._container = container;
    this._filmsData = filmsData;

    this._userProfile = new UserProfile(getRankUser(this._filmsData));

    this._init();
  }

  update(updatedFilmData) {
    this._userProfile.removeElement();

    this._updateUserData(updatedFilmData);
  }

  _updateUserData(updatedFilmData) {
    this._filmsData = updatedFilmData;

    this._updateView(this._filmsData);
  }

  _updateView(updatedFilmData) {
    this._userProfile = new UserProfile(getRankUser(updatedFilmData));

    renderElement(this._container, this._userProfile.getElement());
  }

  _init() {
    renderElement(this._container, this._userProfile.getElement());
  }
}
