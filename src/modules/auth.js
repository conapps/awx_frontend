import isEmpty from 'lodash/isEmpty.js';

class Auth {
  baseURL = process.env.REACT_APP_API + '/api/auth';
  loading = false;
  error = undefined;

  getUser = () => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch (err) {
      return undefined;
    }
  };

  get accessToken() {
    return localStorage.getItem('accessToken');
  }

  set accessToken(accessToken) {
    localStorage.setItem('accessToken', accessToken);
  }

  get idToken() {
    return localStorage.getItem('idToken');
  }

  set idToken(idToken) {
    localStorage.setItem('idToken', idToken);
  }

  get refreshToken() {
    return localStorage.getItem('refreshToken');
  }

  set refreshToken(refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  }

  get user() {
    return this.getUser();
  }

  set user(data) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  get isAuthenticated() {
    return !isEmpty(this.getUser());
  }

  beginCall = () => {
    this.error = undefined;
    this.loading = true;
  };

  logout = () => {
    this.user = undefined;
    this.accessToken = undefined;
    this.idToken = undefined;
    this.refreshToken = undefined;
    this.error = undefined;
    this.loading = false;
    document.location.reload();
  };

  fetchRefreshTokens = credentials =>
    fetch(this.baseURL + '/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ token: this.refreshToken })
    });

  refreshTokens = async () => {
    this.beginCall();

    const response = await this.fetchRefreshTokens();

    if (response.ok === false) {
      return this.logout();
    }

    this.loading = false;

    const data = await response.json();
    this.accessToken = data.accessToken;
    this.idToken = data.idToken;
    this.refreshToken = data.refreshToken;
  };

  fetchLogin = credentials =>
    fetch(this.baseURL + '/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(credentials)
    });

  login = async credentials => {
    this.beginCall();

    const response = await this.fetchLogin(credentials);

    this.loading = false;

    if (response.ok === false) {
      const message = await response.json();
      this.error = message.error;
      return;
    }

    const data = await response.json();
    this.user = data.user;
    this.accessToken = data.accessToken;
    this.idToken = data.idToken;
    this.refreshToken = data.refreshToken;
  };
}

export default new Auth();
