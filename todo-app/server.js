const http = require("node:http");

const port = Number.parseInt(process.env.PORT || "3000", 10);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error("PORT must be an integer between 1 and 65535");
  process.exit(1);
}

const server = http.createServer((_request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  response.end("Todo app server is running\\n");
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Server started in port ${port}`);
});
