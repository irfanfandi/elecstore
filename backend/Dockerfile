# Dockerfile
FROM oven/bun:1

RUN apt-get update && apt-get install -y \
    libssl3 \
    openssl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN bun install

EXPOSE 4000

CMD ["bun", "run", "src/index.ts"]
