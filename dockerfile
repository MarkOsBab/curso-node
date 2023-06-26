# Crea un contenedor de node
FROM node:alpine

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install

EXPOSE 8080
CMD ["npm", "run", "start:dev"]