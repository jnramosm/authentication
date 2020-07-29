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

module.exports = {
  register,
};
