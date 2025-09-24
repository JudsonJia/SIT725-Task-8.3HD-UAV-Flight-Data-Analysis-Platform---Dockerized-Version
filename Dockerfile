# Use Node.js official image as base
FROM node:18-alpine

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json from root
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Create uploads directory
RUN mkdir -p uploads

# Change working directory to where server.js is located
WORKDIR /app/UAV_Analysis_Platform

# Expose the port
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]