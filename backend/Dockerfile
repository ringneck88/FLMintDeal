# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (for better caching)
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

# Copy application code
COPY . .

# Build the application
RUN yarn build

# Expose port (matches Fly.io configuration)
EXPOSE 8080

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S strapi -u 1001

# Change ownership to strapi user
RUN chown -R strapi:nodejs /app
USER strapi

# Start the application
CMD ["yarn", "start"]