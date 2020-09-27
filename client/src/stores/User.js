import {action, observable, runInAction} from 'mobx';
import jwtDecode from 'jwt-decode';
import notification from '@utils/notification';

/**
 * Класс User
 * Содержит
 *  - информацию о юзере из JWT полученного при авторизации
 *  - метод для установки информации из JWT в store этого класса
 *  - методы юзера
 */
class User {

  @observable inProgress = false;
  @observable info = {};
  @observable contacts = [];
  @observable contact = {};

  constructor(rootStore) {
    this.storage = rootStore.storage;
    this.api = rootStore.api.user;
  }

  @action setInfo(token) {
    try {
      const userInfo = jwtDecode(token);
      this.info = {...userInfo};
    } catch (e) {
      this.storage.clear();
    }
  }

  @action clear() {
    this.info = {};
  }

  @action
  async getContacts() {
    this.inProgress = true;
    try {
      const data = await this.api.getContacts();
      runInAction(() => this.contacts = data.contacts);
    } catch (e) {
      notification.error(e.message);
    } finally {
      runInAction(() => (this.inProgress = false));
    }
  }

  @action
  async addContact(data) {
    this.inProgress = true;
    try {
      const res = await this.api.addContact(data);
      notification.success(res.message);
      this.getContacts();
      return true;
    } catch (e) {
      return false;
    } finally {
      runInAction(() => (this.inProgress = false));
    }
  }

  @action
  async saveContact(id, data) {
    this.inProgress = true;
    try {
      await this.api.saveContact(id, data);
      await this.getContacts();
    } catch (e) {
      notification.error(e.message);
    } finally {
      runInAction(() => (this.inProgress = false));
    }
  }

  @action
  async deleteContact(id) {
    this.inProgress = true;
    try {
      const data = await this.api.deleteContact(id);
      notification.success(data.message);
      this.getContacts();
    } catch (e) {
      notification.error(e.message);
    } finally {
      runInAction(() => (this.inProgress = false));
    }
  }
}

export default User;
