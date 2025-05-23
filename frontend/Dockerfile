# Dockerfile
FROM oven/bun:1

WORKDIR /app

COPY . .

RUN bun install

RUN bun run build

EXPOSE 5173

CMD ["bun", "run", "dev"]