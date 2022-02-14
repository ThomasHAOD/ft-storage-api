FROM node:17

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 4001

CMD ["node", "dist/main"]