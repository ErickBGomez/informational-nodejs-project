const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const notFoundMiddleware = require("./middlewares/notFound");
const serverErrorMiddleware = require("./middlewares/serverError");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Create options to handle the absolute path of the HTML files
const fileOptions = {
  root: path.join(__dirname, "html"),
};

// Set index route
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

// Set route for each page
app.get(
  "/:name",
  (req, res, next) => {
    const { name } = req.params;

    res.sendFile(`${name}.html`, fileOptions, (e) => {
      // If the file is not found, call the next middleware (notFoundMiddleware)
      if (e) next();
    });
  },
  notFoundMiddleware,
  serverErrorMiddleware
);

// Open server
app.listen(PORT, () => {
  console.log("Server initialized!");
});
