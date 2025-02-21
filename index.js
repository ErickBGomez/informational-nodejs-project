// const http = require("http");
// const process = require("process");
const loadHtml = require("./modules/loadHtml");

// const server = http.createServer();

// server.on("request", (req, res) => {
//   // Ignore favicon requests
//   if (req.url === "/favicon.ico") return;

//   // Find html file based in req.url value, and return their respective status code and file content
//   const { status, content } = loadHtml(req.url);

//   // Send content response
//   res.writeHead(status, { "Content-Type": "text/html" });
//   res.write(content);
//   res.end();
// });

// server.listen(8080, () => {
//   console.log("Server initialized!");

//   // Handle exit signal
//   process.on("SIGINT", () => {
//     console.log("\nServer stopped!");
//     process.exit();
//   });
// });

const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const notFoundMiddleware = require("./middleware/notFound");
const serverErrorMiddleware = require("./middleware/serverError");

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
    console.log(name);

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
