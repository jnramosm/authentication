const { users } = require("../models");

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
  const result = await users.refresh_token(
    req.headers.cookie.split("=")[1],
    async (tokens, email, message) => {
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
        });
      } else return res.json({ message, accessToken: "" });
    }
  );
};

module.exports = {
  register,
  login,
  refresh_token,
};
