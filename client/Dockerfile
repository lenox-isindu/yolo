# Build the React app using node 14 image since the react sript is not comaptible with my node 18
FROM node:14-alpine AS build

# Sets up our working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app contents
COPY . .

# This will initalize the build as im not using npmstart to build directly
RUN npm run build

# Serve the app using 'serve' this i have configure in my package .json since i nneded a productio environment npm was bringing conflicts
FROM node:14-alpine

# Install 'serve' globally
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy the build output or result
COPY --from=build /app/build ./build

# Expose port
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "build", "-l", "3000"]
