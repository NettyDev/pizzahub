FROM oven/bun:alpine AS base

FROM base AS builder

WORKDIR /app

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN rm -rf node_modules && rm -rf .next
RUN bun install
RUN bun --bun run build

FROM base

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

CMD ["bun", "server.js"]