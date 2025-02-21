const path = require("path");

const fileOptions = {
  root: path.join(__dirname, "../html"),
};

// Middleware to handle 404 errors
const notFoundMiddleware = (req, res, next) => {
  res.status(404).sendFile("404.html", fileOptions, (e) => {
    if (e) next();
  });
};

module.exports = notFoundMiddleware;
