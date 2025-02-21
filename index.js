const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const notFoundMiddleware = require("./middlewares/notFound");
const serverErrorMiddleware = require("./middlewares/serverError");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const fileOptions = {
  root: path.join(__dirname, "html"),
};

app.get(
  "/",
  (req, res, next) => {
    res.sendFile("index.html", fileOptions, (e) => {
      if (e) next();
    });
  },
  notFoundMiddleware,
  serverErrorMiddleware
);

app.get(
  "/:name",
  (req, res, next) => {
    const { name } = req.params;

    res.sendFile(`${name}.html`, fileOptions, (e) => {
      if (e) next();
    });
  },
  notFoundMiddleware,
  serverErrorMiddleware
);

app.listen(PORT, () => {
  console.log("Server initialized!");
});
