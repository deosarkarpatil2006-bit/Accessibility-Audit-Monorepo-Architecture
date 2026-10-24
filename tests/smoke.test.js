import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";

test("health endpoint returns a successful JSON response", async (t) => {
  const port = 3100 + Math.floor(Math.random() * 500);
  const baseUrl = `http://127.0.0.1:${port}`;

  const server = spawn(
    process.execPath,
    ["server/src/index.js"],
    {
      env: { ...process.env, PORT: String(port) },
      stdio: "ignore"
    }
  );

  t.after(() => {
    server.kill();
  });

  let response;

  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      response = await fetch(`${baseUrl}/api/health`);
      break;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  assert.ok(response, "Server should start within the timeout");
  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type"),
    /application\/json/
  );

  const body = await response.json();

  assert.equal(body.status, "ok");
  assert.equal(body.service, "accessibility-audit-api");
});

test("unknown routes return 404", async (t) => {
  const port = 3600 + Math.floor(Math.random() * 400);
  const server = spawn(
    process.execPath,
    ["server/src/index.js"],
    {
      env: { ...process.env, PORT: String(port) },
      stdio: "ignore"
    }
  );

  t.after(() => {
    server.kill();
  });

  let response;

  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      response = await fetch(`http://127.0.0.1:${port}/unknown`);
      break;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  assert.ok(response, "Server should start within the timeout");
  assert.equal(response.status, 404);
});
