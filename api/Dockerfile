FROM node:18-alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .


RUN apt-get update && apt-get install -y netcat-openbsd

CMD ["sh", "-c", "until nc -z db 3306; do echo 'Waiting for MySQL...'; sleep 2; done; node server.js"]

