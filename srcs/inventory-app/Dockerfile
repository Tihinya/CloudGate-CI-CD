# Use Node.js LTS version as the base image
FROM node:22-alpine

WORKDIR /app

COPY . .
COPY .env .

RUN npm install

EXPOSE 5000

CMD ["node", "server.js"]