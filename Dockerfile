FROM oven/bun:alpine AS base

FROM base AS builder

WORKDIR /app

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN bun install
RUN bunx prisma generate
RUN bun --bun run build

FROM base

COPY /prisma ./prisma
COPY /sql ./sql
COPY entrypoint.ts .
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV BETTER_AUTH_URL=http://localhost:3000
ENV DATABASE_URL="postgresql://postgres:password@database:5432/next"
ENV SMTP_HOST=mail
ENV SMTP_PORT=1025
ENV AI_URL=ai:11434
ENV LLM=gemma3:1b

ENTRYPOINT ["bun", "entrypoint.ts"]