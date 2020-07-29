// require("dotenv").config;

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { routes } = require("./routes");

const app = express();
const port = 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.json({ type: "application/json" }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded());

routes(app);

app.listen(process.env.PORT || port, () =>
  console.log(`Listening at port ${port}`)
);
