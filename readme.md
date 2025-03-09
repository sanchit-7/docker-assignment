# Docker Assignment: Multi-Container MERN Stack Application

## Assignment Overview

This assignment demonstrates understanding of Docker containerization by implementing a complete multi-container application architecture using the MERN stack (MongoDB, Express, React, Node.js).

## Objectives

- [x] Create multi-stage Dockerfiles for frontend and backend services
- [x] Implement a MongoDB container with data persistence
- [x] Configure container orchestration using Docker Compose
- [x] Establish inter-container communication via a bridge network
- [x] Apply resource constraints to containers
- [x] Implement development and production environments
- [x] Ensure proper volume mapping for development workflows

## Project Structure

```
.
├── docker-compose.yml              # Container orchestration configuration
├── dockerized-node-app/            # Backend service
│   ├── Dockerfile                  # Multi-stage build for Node.js
│   ├── package.json
│   └── ...
├── dockerized-react-app/           # Frontend service
│   ├── Dockerfile                  # Multi-stage build for React/Vite
│   ├── package.json
│   └── ...
└── README.md                       # This documentation file
```

## Implementation Details

### 1. Backend Service (Node.js)

The Node.js backend is containerized using a multi-stage Dockerfile:
- Base stage for dependency installation
- Development stage with hot-reloading
- Production stage with minimal dependencies

```dockerfile
# Simplified version of backend Dockerfile
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM base AS development
COPY . .
CMD ["npm", "run", "dev"]

FROM node:18-alpine AS production
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .
CMD ["node", "app.js"]
```

### 2. Frontend Service (React with Vite)

The React frontend uses Vite for development and is containerized with a multi-stage approach:
- Base stage for dependency installation
- Development stage with hot-reloading
- Build stage for creating production assets
- Production stage using Nginx to serve static files

### 3. Database Service (MongoDB)

A MongoDB container is implemented with:
- Volume persistence for data storage
- Network connectivity to the backend
- Resource constraints limiting memory usage

### 4. Container Orchestration

Docker Compose is used to orchestrate all containers:

```yaml
services:
  database:
    image: mongo:latest
    # Configuration details...
    deploy:
      resources:
        limits:
          memory: 512M  # Memory constraints

  backend:
    build:
      context: ./dockerized-node-app
      target: development
    # Configuration details...
    deploy:
      resources:
        limits:
          cpus: '0.5'  # CPU constraints
          
  frontend:
    build:
      context: ./dockerized-react-app
      target: development
    # Configuration details...

networks:
  app-network:
    driver: bridge

volumes:
  mongo-data:
```

## Running the Assignment

### Prerequisites
- Docker (20.10+)
- Docker Compose (2.0+)

### Development Environment

```bash
# Start all containers in development mode
docker-compose up

# Access the applications
Frontend: http://localhost:3000
Backend API: http://localhost:8080
MongoDB: mongodb://localhost:27017
```

### Production Build

```bash
# Build using production targets
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```

## Technical Challenges & Solutions

### Challenge 1: Multi-Stage Builds
**Solution:** Implemented separate stages for development and production to optimize container size and build times.

### Challenge 2: Inter-container Communication
**Solution:** Created a custom bridge network and used service names as hostnames.

### Challenge 3: Development Workflow
**Solution:** Configured volume mounts to enable code changes without rebuilding containers.

### Challenge 4: Resource Management
**Solution:** Applied CPU and memory constraints to prevent resource contention.

## Learning Outcomes

- Practical experience with Docker multi-stage builds
- Understanding of container networking and communication
- Implementation of resource constraints for container optimization
- Configuration of development and production environments
- Management of data persistence with Docker volumes

## References

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Node.js Docker Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [MongoDB with Docker](https://hub.docker.com/_/mongo)