FROM node:16

WORKDIR /trade-app
COPY package.json .
RUN npm install
COPY . .
CMD node server.js