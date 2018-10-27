import find from 'lodash/find.js';
import auth from './auth.js';
import emitter from './emitter.js';

class FetchCRUD {
  items = [];
  baseURL = process.env.REACT_APP_API + '/api/v1/';

  constructor({ resource } = {}) {
    this.resource = resource;
    this.baseURL = this.baseURL + resource + '/';
  }

  emitUpdate() {
    emitter.emit(`${this.resource}:update:start`);
    emitter.emit(`${this.resource}:update`);
    emitter.emit(`${this.resource}:update:end`);
  }

  _index = () =>
    fetch(this.baseURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.accessToken}`
      }
    });

  fetchIndex = async () => {
    let response = await this._index();

    if (response.ok === false && (await response.text()) === 'Unauthorized') {
      await this.refreshTokens();
      response = await this._index();
    }

    emitter.emit(`${this.resource}:index`);

    return response.json();
  };

  _create = body =>
    fetch(this.baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.accessToken}`
      },
      body: JSON.stringify(body)
    });

  fetchCreate = async body => {
    let response = await this._create(body);

    if (response.ok === false && (await response.text()) === 'Unauthorized') {
      await this.refreshTokens();
      response = await this._create(body);
    }

    emitter.emit(`${this.resource}:create`);

    return response.json();
  };

  _get = id =>
    fetch(this.baseURL + `${id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.accessToken}`
      }
    });

  fetchGet = async id => {
    let item = find(this.items, item => item.id === id);

    if (item !== undefined) return item;

    let response = await this._get(id);

    if (response.ok === false && (await response.text()) === 'Unauthorized') {
      await this.refreshTokens();
      response = await this._get(id);
    }

    return await response.json();
  };

  _delete = id =>
    fetch(this.baseURL + `${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.accessToken}`
      }
    });

  fetchDelete = async id => {
    let response = await this._delete(id);

    if (response.ok === false && (await response.text()) === 'Unauthorized') {
      await this.refreshTokens();
      response = await this._delete(id);
    }

    emitter.emit(`${this.resource}:delete:${id}`);

    return response.text();
  };

  refreshTokens = async () => {
    return auth.refreshTokens();
  };
}

export default FetchCRUD;
