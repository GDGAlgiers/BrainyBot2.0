# Base image for node latest version
FROM node:latest

# Creating directory
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Copying and installing packages
COPY package.json /usr/src/bot
RUN npm install

# Copying file
COPY . /usr/src/bot

# Start bot
CMD ["npm", "start"]