require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

//DB connection
const connection = (cb) => {
  const client = new MongoClient(process.env.DATABASE, {
    useNewUrlParser: true,
  });
  client.connect((err) => {
    if (err) throw new Error(`Database connection error: ${err}`);
    else {
      const db = client.db(process.env.DB_NAME);
      cb(db);
    }
  });
};

module.exports = {
  connection,
};
