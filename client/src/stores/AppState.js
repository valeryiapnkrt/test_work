import {action, observable, runInAction } from 'mobx';

/**
 * Класс AppState
 * Состояние приложения
 */
class AppState {
  /** текущий статус приложения */
  @observable status = 'init';
  @observable check = false;

  constructor(rootStore) {
    this.api = rootStore.api.app;
    this.user = rootStore.user;
    this.storage = rootStore.storage;
  }

  /**
   * Метод для инициализации приложения
   * Если в localStorage есть JWT, то устанавливает данные юзера в класс User
   */

@action
  async init() {
    const tokens = this.storage.getJSON('tokens');
    if (tokens && tokens.accessToken) {
      this.user.setInfo(tokens.accessToken);
      this.check = true
    }
    runInAction(() => (this.status = 'run'));
  }
}

export default AppState;
