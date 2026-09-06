#!/usr/bin/env node
import net from "net";
import dns from "dns/promises";
import { config } from "dotenv";
import fs from "fs";

if (fs.existsSync(".env.local")) config({ path: ".env.local", override: true });
else if (fs.existsSync(".env")) config({ path: ".env", override: true });

const raw = process.env.DATABASE_URL;
if (!raw) {
  console.error("FAIL: DATABASE_URL missing");
  process.exit(1);
}

const u = new URL(raw.replace(/^mysql:\/\//, "http://"));
const host = u.hostname;
const port = Number(u.port || 3306);
const db = u.pathname.replace(/^\//, "");
console.log(`ping ${host}:${port} db=${db}`);

// 127.0.0.1 is already an IP — do not call resolve4 (that is for hostnames)
if (net.isIP(host)) {
  console.log("dns", `skipped (literal IP ${host})`);
} else {
  console.log("dns", (await dns.resolve4(host)).join(","));
}

const result = await new Promise((resolve) => {
  const s = net.connect({ host, port, family: 4 });
  const t = setTimeout(() => {
    s.destroy();
    resolve("TIMEOUT");
  }, 10000);
  s.on("connect", () => {
    clearTimeout(t);
    s.end();
    resolve("OK");
  });
  s.on("error", (e) => {
    clearTimeout(t);
    resolve("ERR:" + e.message);
  });
});

console.log("tcp", result);
process.exit(result === "OK" ? 0 : 2);
