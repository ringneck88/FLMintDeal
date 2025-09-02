FROM node:20-alpine
RUN npm install -g yarn

WORKDIR /app

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Create data directory
RUN mkdir -p /data

# Build the application
RUN yarn build

# Remove dev dependencies to reduce image size
RUN yarn install --production --frozen-lockfile && yarn cache clean

# Create non-root user and set permissions
RUN addgroup -g 1001 -S nodejs && adduser -S strapi -u 1001
RUN chown -R strapi:nodejs /app /data

USER strapi
EXPOSE 8080

CMD ["yarn", "start"]