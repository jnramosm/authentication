const utils = require("../utils");
const { users } = require("../controllers");

const routes = (app) => {
  app.post("/register", users.register);

  app.post("/login", users.login);

  app.post("/refresh_token", users.refresh_token);

  app.post("/logout", users.logout);
};

module.exports = {
  routes,
};
