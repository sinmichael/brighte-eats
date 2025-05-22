FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source files
COPY . .

# Build application
RUN npm run build

# Expose the port the app runs on
EXPOSE 4000

# Use node to run the compiled application
CMD ["node", "dist/server.js"]