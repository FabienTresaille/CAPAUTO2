FROM node:20-alpine AS base

# --- Dependencies ---
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# --- Builder ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Initialize database with demo data during build
RUN mkdir -p data && npm run seed

# --- Runner ---
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone build
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Create data directory for SQLite before copy
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data

# Copy generated database as a template for initial seed
COPY --from=builder --chown=nextjs:nodejs /app/capauto.db ./capauto.db.template

# Create uploads directory
RUN mkdir -p /app/public/uploads/vehicles && \
    chown -R nextjs:nodejs /app/public/uploads

COPY --chmod=755 docker-entrypoint.sh ./
RUN sed -i 's/\r$//' docker-entrypoint.sh

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "server.js"]
