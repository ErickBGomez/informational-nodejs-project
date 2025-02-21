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

const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const fileOptions = {
  root: __dirname,
};

app.get("/", (req, res, next) => {
  res.sendFile("./html/index.html", fileOptions);
});

app.get("/:name", (req, res, next) => {
  const options = {
    root: __dirname,
  };

  const { name } = req.params;

  res.sendFile(`./html/${name}.html`, options, (e) => {
    if (e)
      res.sendFile("./html/404.html", options, (er) => {
        if (er) res.send(500, "500 - Internal server error");
      });
    else console.log("sent");
  });
});

app.listen(PORT, () => {
  console.log("Server initialized!");
});
