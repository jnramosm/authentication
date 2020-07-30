const utils = require("../utils");
const { connection } = require("../database");

const register = async (user = {}) => {
  connection(async (db) => {
    const userDB = await db.collection("users").findOne({ email: user.email });
    if (userDB)
      throw new Error(`This user is already registered (${userDB.email})`);

    const hash = utils.hashPassword(user.password);

    await db.collection("users").updateOne(
      {},
      {
        $set: {
          email: user.email,
          password: hash,
        },
      },
      { upsert: true }
    );
  });
};

const login = (user = {}, cb) => {
  connection((db) => {
    db.collection("users").findOne({ email: user.email }, (err, userDb) => {
      if (err) console.log(err);
      const validate = utils.comparePassword(user.password, userDb.password);

      if (validate) {
        const accessToken = utils.createAccesToken(userDb);
        const refreshToken = utils.createRefreshToken(userDb);
        const tokens = {
          accessToken,
          refreshToken,
        };
        cb(tokens);
        // console.log(tokens);
        // return tokens;
      } else cb({ accessToken: "", refreshToken: "" });
    });
  });
};

const refresh_token = (refreshToken, cb) => {
  if (!refreshToken)
    cb({ accessToken: "", refreshToken }, null, "No refresh token");
  let payload = null;
  try {
    payload = utils.verify(refreshToken);
  } catch (e) {
    console.log(e);
    cb({ accessToken: "", refreshToken }, null, "Error verifying token");
  }

  connection(async (db) => {
    let userDb = await db.collection("users").findOne({ email: payload.email });
    if (!userDb) cb({ accessToken: "", refreshToken }, null, "No user found");

    if (userDb.tokenVersion !== payload.tokenVersion)
      return cb({ accessToken: "", refreshToken }, null, "Wrong refresh token");

    const accessToken = utils.createAccesToken(userDb);
    const refreshToken = utils.createRefreshToken(userDb);

    cb({ accessToken, refreshToken }, { email: userDb.email }, "Success");
  });
};

const updateToken = async (user = {}, accessToken) => {
  connection((db) => {
    db.collection("users").findOne(
      { email: user.email },
      async (err, userDb) => {
        if (err) console.log(err);
        await db.collection("users").updateOne(
          { _id: userDb._id },
          {
            $set: {
              accessToken: accessToken,
            },
            $inc: {
              tokenVersion: 1,
            },
          },
          {
            upsert: true,
          }
        );
      }
    );
  });
};

const getByEmail = async (user = {}) => {
  connection(async (db) => {
    const userDb = await db.collection("users").findOne({ email: user.email });

    const userPublic = { id: userDb._id, email: userDb.email };

    return userPublic;
  });
};

const get_username = (user = {}, accessToken, cb) => {
  connection((db) => {
    db.collection("users").findOne({ email: user.email }, (err, userDb) => {
      if (accessToken === userDb.accessToken) {
        const username = userDb.username;
        cb(username);
      } else cb("");
    });
  });
};

const set_username = (user = {}, accessToken, cb) => {
  connection(async (db) => {
    const userDb = await db.collection("users").findOne({ email: user.email });

    if (accessToken === userDb.accessToken) {
      await db.collection("users").updateOne(
        { email: user.email },
        {
          $set: {
            username: user.username,
          },
        },
        {
          upsert: true,
        }
      );
      cb(true);
    } else cb(false);
  });
};

module.exports = {
  register,
  getByEmail,
  login,
  updateToken,
  refresh_token,
  get_username,
  set_username,
};
