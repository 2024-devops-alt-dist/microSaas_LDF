##### STAGE 1: Development #####
# Use the official Node.js image as the base image
FROM node:current-alpine AS development

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install

# Copy the rest of the application files
COPY . .

##### STAGE 2: Build #####
# Use the official Node.js image as the base image
FROM development AS builder

# Build the application
RUN npm run build

#### STAGE 3: Run ####

# Use the official Nginx image as the base image
FROM nginx:alpine AS production

# remove the default nginx website
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

# Copy the built application from the previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start the application
CMD ["nginx", "-g", "daemon off;"]