# Used Node 14 Alpine for  compatibility because i tried 18 and there were issues with compatibility with react
FROM node:14-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files 
COPY package*.json ./
# install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
