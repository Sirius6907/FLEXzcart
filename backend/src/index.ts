import "dotenv/config";
import express from "express";
import cors from "cors";

import fs from "node:fs";
import path from "node:path";

import * as Sentry from "@sentry/node";

import { clerkMiddleware } from "@clerk/express";
import { clerkWebhookHandler } from "./webhooks/clerk";
import { getEnv } from "./lib/env";
import keepAliveCron from "./lib/cron";

import productRouter from "./routes/productRouter";
import meRouter from "./routes/meRouter";
import streamRouter from "./routes/streamRouter";
import chekoutRouter from "./routes/chekoutRouter";
import adminRouter from "./routes/adminRouter";
import orderRouter from "./routes/orderRouter";

import { polarWebhookHandler } from "./webhooks/polar";
import { sentryClerkUserMiddleware } from "./middleware/sentryClerkUser";

const env = getEnv();
const app = express();

const rawJson = express.raw({ type: "application/json", limit: "1mb" });

// it's important that you don't parse the webhook event data, it should be in the raw format
app.post("/webhooks/clerk", rawJson, (req, res) => {
  void clerkWebhookHandler(req, res);
});
app.post("/webhooks/polar", rawJson, (req, res) => {
  void polarWebhookHandler(req, res);
});

app.use(express.json());
app.use(cors());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

// --- Static Files and SPA Handling ---
// We do this BEFORE clerkMiddleware so that the frontend assets and index.html
// are served without being intercepted by global authentication logic.
const possiblePublicDirs = [
  path.resolve(__dirname, "..", "public"),
  path.resolve(process.cwd(), "public"),
  path.resolve(__dirname, "public"),
];

let publicDir = possiblePublicDirs[0];
for (const dir of possiblePublicDirs) {
  if (fs.existsSync(dir) && fs.existsSync(path.join(dir, "index.html"))) {
    publicDir = dir;
    break;
  }
}

console.log("Using public directory for static assets:", publicDir);

if (fs.existsSync(publicDir)) {
  const indexHtmlPath = path.join(publicDir, "index.html");
  if (fs.existsSync(indexHtmlPath)) {
    console.log("✅ index.html found in public directory.");
  } else {
    console.warn("⚠️ public directory found but index.html is MISSING at:", indexHtmlPath);
  }
  
  // Serve static files (js, css, images)
  app.use(express.static(publicDir, {
    index: false // We'll handle index.html manually for SPA routing
  }));

  // Catch-all SPA route for GET requests that are NOT API or Webhooks
  // Note: Using (.*) for Express 5 compatibility
  app.get("(.*)", (req, res, next) => {
    // Only handle GET/HEAD
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    // Skip API and Webhooks
    if (req.path.startsWith("/api") || req.path.startsWith("/webhooks")) return next();
    
    // Serve index.html
    res.sendFile(indexHtmlPath, (err) => {
      if (err) {
        console.error("Error sending index.html:", err);
        next(err);
      }
    });
  });
} else {
  console.warn("❌ Public directory NOT found. Looking in:", possiblePublicDirs);
}

// --- API and Authentication ---
app.use(clerkMiddleware());
app.use(sentryClerkUserMiddleware);

app.use("/api/me", meRouter);
app.use("/api/products", productRouter);
app.use("/api/stream", streamRouter);
app.use("/api/checkout", chekoutRouter);
app.use("/api/admin", adminRouter);
app.use("/api/orders", orderRouter);

// sentry will be attached to the response object
Sentry.setupExpressErrorHandler(app);

app.use(
  (_err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const sentryId = (res as express.Response & { sentry?: string }).sentry;

    res.status(500).json({
      error: "Internal server error",
      ...(sentryId !== undefined && { sentryId }),
    });
  },
);

app.listen(env.PORT, () => {
  console.log("Listening on port:", env.PORT);
  if (env.NODE_ENV === "production") {
    keepAliveCron.start();
  }
});
