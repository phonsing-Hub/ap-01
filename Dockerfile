FROM oven/bun:1.1.13 AS builder

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile

RUN bun next build

# Stage 2: Run
FROM oven/bun:1.1.13 AS runner

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lockb ./bun.lockb
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/src ./src

COPY --from=builder /app/components.json ./components.json

RUN bun install --production

ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

CMD ["bun", "next", "start"]