import app from "./app";

const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;

Bun.serve({
  fetch: app.fetch,
  port,
});

console.log(`Server is running on http://localhost:${port}`);
