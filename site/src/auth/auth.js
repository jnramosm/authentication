class Auth {
  constructor() {
    this.authenticated = false;
    this.accessToken = "";
  }

  setAccessToken(token) {
    this.accessToken = token;
    if (token === "") {
      this.authenticated = false;
    } else this.authenticated = true;
  }

  setAuthentication(state) {
    this.authenticated = state;
  }

  isAuthenticated() {
    return this.authenticated;
  }

  getAccessToken() {
    return this.accessToken;
  }
}

export default new Auth();
