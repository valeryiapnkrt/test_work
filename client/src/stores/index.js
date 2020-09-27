import {configure} from 'mobx';

import AppState from './AppState';
import Auth from './Auth';
import User from './User';

import * as auth from '../api/auth';
import * as reg from '../api/register';
import * as user from '../api/user'

import _localStorage from '../helpers/_localStorage';

configure({enforceActions: 'observed'});

/**
 * Подключение всех store в глобальный store
 * Методы из api глобальном store для использования в дочерних store
 */
class RootStore {
  constructor() {
    this.api = {
      auth,
      reg,
      user
    };
    this.storage = _localStorage;
    this.user = new User(this);
    this.appState = new AppState(this);
    this.auth = new Auth(this);
  }
}

export default new RootStore();
