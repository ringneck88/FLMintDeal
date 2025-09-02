FROM node:20-alpine
RUN npm install -g yarn

WORKDIR /app

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy all source code
COPY . .

# Make data directory
RUN mkdir -p /data

# Set runtime environment to development to skip build issues
ENV NODE_ENV=development

# Skip building entirely and just start
USER 1001
EXPOSE 8080
CMD ["yarn", "develop"]