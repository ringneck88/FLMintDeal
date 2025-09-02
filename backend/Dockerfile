# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (for better caching)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy application code
COPY . .

# Set minimal environment variables needed for build
ENV NODE_ENV=production
ENV APP_KEYS="build-key-1,build-key-2"
ENV API_TOKEN_SALT="build-salt"
ENV ADMIN_JWT_SECRET="build-secret"
ENV TRANSFER_TOKEN_SALT="build-transfer-salt"
ENV JWT_SECRET="build-jwt-secret"
ENV ENCRYPTION_KEY="build-encryption-key"

# Build the application
RUN yarn build

# Remove devDependencies to reduce image size
RUN yarn install --production --frozen-lockfile

# Expose port (matches Fly.io configuration)
EXPOSE 8080

# Create data directory for SQLite database
RUN mkdir -p /data && chmod 755 /data

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S strapi -u 1001

# Change ownership to strapi user and data directory
RUN chown -R strapi:nodejs /app /data
USER strapi

# Start the application
CMD ["yarn", "start"]