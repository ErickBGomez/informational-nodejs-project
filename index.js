const http = require("http");
const { loadHtml } = require("./modules/loadHtml");

const server = http.createServer();

server.on("request", (req, res) => {
  // Ignore favicon requests
  if (req.url === "/favicon.ico") return;

  // Find html file based in req.url value, and return their respective status code and file content
  const { status, content } = loadHtml(req.url);

  // Send content response
  res.writeHead(status, { "Content-Type": "text/html" });
  res.write(content);
  res.end();
});

server.listen(8080, () => {
  console.log("Server initialized!");
});
