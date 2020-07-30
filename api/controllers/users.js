const { users } = require("../models");
const utils = require("../utils");

const register = async (req, res, next) => {
  try {
    await users.register(req.body);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }

  let user;
  try {
    user = await users.getByEmail(req.body);
  } catch (e) {
    console.log(e);
    return next(error, null);
  }

  res.json({ message: "Success" });
};

const login = (req, res, next) => {
  try {
    // const tokens = await users.login(req.body);
    users.login(req.body, async (tokens) => {
      if (tokens.accessToken !== "") {
        await users.updateToken(req.body, tokens.accessToken);

        res.cookie("jrm", tokens.refreshToken, {
          httpOnly: true,
          path: "/refresh_token",
          SameSite: "None",
          secure: true,
        });
        res.json({ message: "Success", accessToken: tokens.accessToken });
      } else res.json({ message: "Invalid credentials", accessToken: "" });
    });
    // console.log(tokens);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

const refresh_token = async (req, res, next) => {
  if (req.headers.cookie) {
    const refreshToken = req.headers.cookie.split("=")[1];
    await users.refresh_token(refreshToken, async (tokens, email, message) => {
      if (tokens.accessToken !== "") {
        await users.updateToken(email, tokens.accessToken);

        res.cookie("jrm", tokens.refreshToken, {
          httpOnly: true,
          path: "/refresh_token",
          SameSite: "None",
          secure: true,
        });
        res.json({
          message,
          accessToken: tokens.accessToken,
          email,
        });
      } else return res.json({ message, accessToken: "" });
    });
  } else res.json({ accessToken: "", message: "No refresh token" });
};

const logout = (req, res, next) => {
  res.cookie("jrm", "", {
    httpOnly: true,
    path: "/refresh_token",
    SameSite: "None",
    secure: true,
  });
  res.json({ message: "Success" });
};

const get_username = (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  users.get_username(req.body, accessToken, (username) => {
    if (username) res.json({ username });
    else res.json({ username: "" });
  });
};

const set_username = async (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  await users.set_username(req.body, accessToken, (ok) => {
    if (ok) res.json({ message: "Success" });
    else res.json({ message: "Invalid credentials" });
  });
};

module.exports = {
  register,
  login,
  refresh_token,
  logout,
  get_username,
  set_username,
};
