import { Hono } from "hono";
import { createHTTPHandler } from "@trpc/server/adapters/standalone";
import { appRouter } from "./trpc/router"; // sesuaikan path ke router kamu
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { cors } from "hono/cors";

const app = new Hono();

createHTTPHandler({
  router: appRouter,
  createContext: () => ({}),
});

app.use("/trpc/*", cors());
app.all("/trpc/*", (c) => {
  return fetchRequestHandler({
    endpoint: "/trpc",
    req: c.req.raw, // Hono → raw Request
    router: appRouter,
    createContext: () => ({}),
  });
});

export default app;
