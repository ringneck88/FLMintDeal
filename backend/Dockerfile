# Multi-stage build for better optimization
FROM node:20-alpine AS base
RUN npm install -g yarn
WORKDIR /app

# Dependencies stage
FROM base AS deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Build stage
FROM base AS builder
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .

# Set build environment variables
ENV NODE_ENV=production
ENV DATABASE_CLIENT=sqlite
ENV DATABASE_FILENAME=/tmp/build.db

# Build the application
RUN yarn build

# Production stage
FROM base AS runner

# Install only production dependencies
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile && yarn cache clean

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/config ./config
COPY --from=builder /app/database ./database
COPY --from=builder /app/src ./src

# Create data directory for SQLite database
RUN mkdir -p /data && chmod 755 /data

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S strapi -u 1001

# Change ownership
RUN chown -R strapi:nodejs /app /data
USER strapi

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/_health || exit 1

# Start the application
CMD ["yarn", "start"]