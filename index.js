const http = require("http");
const { loadHtml } = require("./modules/loadHtml");

const server = http.createServer();

server.on("request", (req, res) => {
  if (req.url === "/favicon.ico") return;

  const { status, content } = loadHtml(req.url);

  res.writeHead(status, { "Content-Type": "text/html" });
  res.write(content);
  res.end();
});

server.listen(8080, () => {
  console.log("Server initialized!");
});
