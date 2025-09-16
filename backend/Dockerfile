FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package.json ./
RUN npm install --omit=dev

# Copy source code
COPY . .

# Create data directory
RUN mkdir -p /data

# Build the application
RUN npm run build

# Create non-root user and set permissions
RUN addgroup -g 1001 -S nodejs && adduser -S strapi -u 1001
RUN chown -R strapi:nodejs /app /data

USER strapi
EXPOSE 8080

CMD ["npm", "start"]