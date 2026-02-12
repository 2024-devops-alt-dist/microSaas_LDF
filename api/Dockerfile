#### STAGE 1: Development ####

# Use the official Node.js image as the base image
FROM node:22-alpine AS development

RUN apk update && apk upgrade --no-cache

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

#### STAGE 2: Build ####
FROM development AS builder

# Build the application
RUN npm run build

#### STAGE 3: Run ####

FROM node:22-alpine AS production

WORKDIR /app

COPY --from=builder /app/package.json ./

RUN npm install --only=production

# Copy the built application from the previous stage
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production

EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]