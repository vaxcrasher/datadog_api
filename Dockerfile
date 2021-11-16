FROM node:16

# Create the app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install --verbose

# Bundle app source
COPY . .

# Expose 8080
EXPOSE 8080

# Start the app
CMD [ "node", "server.js" ]