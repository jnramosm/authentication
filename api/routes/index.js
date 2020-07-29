const utils = require("../utils");
const { users } = require("../controllers");

const routes = (app) => {
  app.get("/", (req, res) => {
    res.send("Hello world");
  });

  app.post("/register", users.register);

  app.post("/login", users.login);
};

module.exports = {
  routes,
};
