FROM node:22-alpine

WORKDIR /app

COPY . .
COPY .env .

RUN npm install

EXPOSE 7000

CMD ["node", "server.js"]