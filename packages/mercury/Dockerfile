FROM node:12-alpine

WORKDIR /app/

COPY package.json /app/

RUN yarn install

COPY . /app/

#CMD npm run start:prod
CMD node dist/main.js
