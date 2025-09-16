FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV LOG_LEVEL=debug

CMD ["npm", "start"]
