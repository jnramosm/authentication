const bcrytp = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateCode = (len) => {
  var length = len,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

const createAccesToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.SECRET_JWT_ACCESS,
    { expiresIn: "1d" }
  );
};

const createRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, tokenVersion: user.tokenVersion + 1 },
    process.env.SECRET_JWT_REFRESH,
    { expiresIn: "10d" }
  );
};

const hashPassword = (password) => {
  return bcrytp.hashSync(password, 12);
};

module.exports = {
  generateCode,
  createAccesToken,
  createRefreshToken,
  hashPassword,
};
