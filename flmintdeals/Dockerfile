# Use Node.js 18 alpine
FROM node:18-alpine AS base

# Install dependencies for building native modules
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Set environment to development
ENV NODE_ENV=development

# Build the admin panel (required even in dev mode for Cloud Run)
RUN npm run build

# Expose the port Cloud Run expects
EXPOSE 8080

# Set the PORT environment variable for Cloud Run
ENV PORT=8080

# Define the command to run the application in development mode
CMD ["npm", "run", "develop"]