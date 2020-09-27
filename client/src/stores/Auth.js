import {action, observable, runInAction} from 'mobx';
import notification from '../utils/notification';

class Auth {
  @observable inProgress = false;
  @observable status = '';

  constructor(rootStore) {
    this.api = rootStore.api;
    this.appState = rootStore.appState;
    this.user = rootStore.user;
    this.storage = rootStore.storage;
  }

  @action
  async register(creds) {
    this.inProgress = true;
    try {
      const data = await this.api.reg.register(creds);
      notification.success(data.message);
      runInAction(() => (this.status = data?.status));
    } catch (e) {
      e.errors.map(err => {
        notification.error(err.msg);
      })
    } finally {
      runInAction(() => (this.inProgress = false));
    }
  }

  @action
  async login(creds) {
    this.inProgress = true;
    try {
      const data = await this.api.auth.login(creds);
      this.auth(data);
    } catch (e) {
      notification.error(e.message);
    } finally {
      runInAction(() => (this.inProgress = false));
    }
  }

  async auth(data) {
    const {accessToken, refreshToken} = data;
    this.storage.setJson('tokens', {accessToken, refreshToken});
    await this.appState.init();
  }


  @action logout() {
    this.storage.clear();
    this.user.clear();
    this.appState.check = false;
  }

}

export default Auth;
