# I HAVE NODE V 18 INSTALLED SO I USE THIS TO PREVENT APP BREAKING AND ALO ITS KIND OF LIGTWEIGHT
FROM node:18-alpine

# Sets my  working directory
WORKDIR /app

# Copies my requirements
COPY package*.json ./

# Installs only production dependencies and will ignore those for development
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Expose backend port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]

