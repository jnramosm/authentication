class Auth {
  constructor() {
    this.authenticated = false;
    this.accessToken = "";
    this.email = "";
  }

  setAccessToken(token) {
    this.accessToken = token;
    if (token === "") {
      this.authenticated = false;
    } else {
      this.authenticated = true;
    }
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

  getEmail() {
    return this.email;
  }
  setEmail(email) {
    this.email = email;
  }
}

export default new Auth();
