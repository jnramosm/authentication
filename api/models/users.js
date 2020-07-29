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

module.exports = {
  register,
  getByEmail,
  login,
  updateToken,
};
