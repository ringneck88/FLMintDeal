FROM node:20-alpine
RUN npm install -g yarn

# Create app directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install ALL dependencies (including dev) for building
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Create data directory
RUN mkdir -p /data

# Build the application
RUN yarn build

# Remove dev dependencies after build
RUN yarn install --production --frozen-lockfile && yarn cache clean

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S strapi -u 1001
RUN chown -R strapi:nodejs /app /data

USER strapi

EXPOSE 8080

CMD ["yarn", "start"]