const http = require("http");
const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

const PORT = process.env.PORT || 3000;
const randomString = randomUUID();
const startedAt = new Date();
const logs = [];

function addLog() {
  const entry = {
    timestamp: new Date().toISOString(),
    message: randomString
  };

  logs.push(entry);
  if (logs.length > 100) logs.shift();

  console.log(`${entry.timestamp}: ${entry.message}`);
}

addLog();
setInterval(addLog, 5000);

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "ok" }));
  }

  if (req.url === "/api/status") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    });

    return res.end(JSON.stringify({
      status: "running",
      app: "Log Output",
      randomString,
      startedAt: startedAt.toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      intervalSeconds: 5,
      totalLogEntries: logs.length,
      logs: [...logs].reverse()
    }));
  }

  if (req.url === "/" || req.url === "/index.html") {
    const file = path.join(__dirname, "public", "index.html");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    return fs.createReadStream(file).pipe(res);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Log Output dashboard listening on port ${PORT}`);
});
