const http = require("http");
const fs = require("fs");
const { loadHtml } = require("./loadHtml");

const server = http.createServer();

server.on("request", (req, res) => {
  if (req.url === "/favicon.ico") return;

  let status, content;

  try {
    status = 200;
    content = loadHtml(req.url);
  } catch (e) {
    status = 500;
    content = "Internal server error!";
  } finally {
    res.writeHead(status, { "Content-Type": "text/html" });
    res.write(content);
    res.end();
  }
});

server.listen(8080, () => {
  console.log("Server initialized!");
});
