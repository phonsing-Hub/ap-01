FROM node:20-alpine AS builder

WORKDIR /app
COPY . .
COPY .env.local .env.local
RUN apk add --no-cache curl bash
RUN curl -fsSL https://bun.sh/install | bash && \
    ln -s /root/.bun/bin/bun /usr/local/bin/bun

RUN bun install --frozen-lockfile
RUN bun run next build --no-lint

FROM oven/bun:1.1.13 AS runner

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lockb ./bun.lockb
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/src ./src

RUN bun install --production

ENV NODE_ENV=production
ENV PORT=4000
EXPOSE 4000

CMD ["bun", "next", "start"]