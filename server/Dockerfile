FROM node:20-bullseye

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy server code
COPY . ./

# Expose port
EXPOSE 8000

# Step 6: Command to run your server
CMD ["npm", "run", "dev"]