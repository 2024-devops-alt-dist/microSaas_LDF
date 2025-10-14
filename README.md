# Docker - Quick Start Guide

Follow these steps to get the application up and running using Docker.

## Prerequisites

Make sure you have Docker Desktop installed and running on your machine.

**Step 1: Configure Environment Variables**
Create a file named .env in the root of your project and define the necessary environment variables for the database connection and any other configuration. You can use the .env.example file as a reference.

**Step 2: Launch the Application**
Navigate to the root of your project in your terminal and run the following command. This will build the frontend and backend images, start the containers, and connect them to the MongoDB database.

`docker-compose up --build`

Once all services are up and running, you can access the application at the following URLs:

**Frontend:** [http://localhost:8080](http://localhost:8080)

**Backend (API):** [http://localhost:3000](http://localhost:3000)

## 📚 Useful Commands

Stop the application: `docker-compose down` (stops and removes containers, but preserves database data).

View the status of services: `docker-compose ps`

View logs: `docker-compose logs -f`.
