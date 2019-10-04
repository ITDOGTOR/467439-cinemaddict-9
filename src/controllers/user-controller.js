import UserProfile from '../components/user-profile.js';
import {renderElement, getRankUser} from '../util.js';

export default class UserController {
  constructor(container, filmsData) {
    this._container = container;
    this._filmsData = filmsData;

    this._userProfile = new UserProfile(getRankUser(this._filmsData));

    this._init();
  }

  _init() {
    renderElement(this._container, this._userProfile.getElement());
  }
}
