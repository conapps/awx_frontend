import auth from './auth.js';

class FetchCRUD {
  baseURL = process.env.REACT_APP_API + '/api/v1/';

  constructor({ resource } = {}) {
    this.baseURL = this.baseURL + resource + '/';
  }

  fetchIndex = () =>
    fetch(this.baseURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.accessToken}`
      }
    });

  fetchCreate = body =>
    fetch(this.baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.accessToken}`
      },
      body: JSON.stringify(body)
    });

  refreshTokens = async () => {
    return auth.refreshTokens();
  };
}

export default FetchCRUD;
