FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY .env .env

RUN node ace build

WORKDIR /app/build

EXPOSE 3333

CMD ["node", "bin/server.js"]
