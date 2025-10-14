# STAGE 1: Build

# Use the official Node.js image as the base image
FROM node:current-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# STAGE 2: Run

# Use the official Node.js image as the base image
FROM node:current-alpine AS production

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY --from=build /app/package.json ./

# Install dependencies
RUN npm install --only=production

# Copy the built application from the previous stage
COPY --from=build /app/dist ./dist

ENV NODE_ENV=production

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dist/main"]