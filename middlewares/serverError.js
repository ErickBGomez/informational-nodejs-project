const serverErrorMiddleware = (req, res) => {
  res.status(500).send("500 - Internal server error!");
};

module.exports = serverErrorMiddleware;
