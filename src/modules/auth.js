import isEmpty from 'lodash/isEmpty.js';

class Auth {
  loading = false;

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

  login = async credentials => {
    const url = process.env.REACT_APP_API + '/api/auth/login/';

    this.loading = true;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(credentials)
    });

    this.loading = false;

    if (response.ok === false) {
      const message = await response.text();
      this.error = message;
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
