import { createServer } from "node:http";

const PORT = Number(process.env.PORT) || 3000;

const server = createServer((req, res) => {
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.url === "/api/health" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    });

    res.end(JSON.stringify({
      status: "ok",
      service: "accessibility-audit-api"
    }));
    return;
  }

  res.writeHead(404, {
    "Content-Type": "application/json; charset=utf-8"
  });

  res.end(JSON.stringify({
    error: "Not found"
  }));
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`API available at http://127.0.0.1:${PORT}`);
});
