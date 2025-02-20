const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  if (req.url === "/favicon.ico") return;

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(req.url);

  res.end();
});

server.listen(8080, () => {
  console.log("Server initialized!");
});
