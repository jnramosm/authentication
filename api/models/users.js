const utils = require("../utils");
const { connection } = require("../database");

const register = async (user = {}) => {
  if (!user.email) throw new Error(`"email" is required`);

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
};
