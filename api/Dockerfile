#### STAGE 1: Development ####

# Use the official Node.js image as the base image
FROM node:current-alpine AS development

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

FROM node:current-alpine AS production

WORKDIR /app

COPY --from=build /app/package.json ./

RUN npm install --only=production

# Copy the built application from the previous stage
COPY --from=build /app/dist ./dist

ENV NODE_ENV=production

EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]