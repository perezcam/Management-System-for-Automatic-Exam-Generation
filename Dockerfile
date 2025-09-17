FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

ENV LOG_LEVEL=debug

CMD ["npm run dev"]

