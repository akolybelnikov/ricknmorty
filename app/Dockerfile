FROM node:14.18-alpine as builder

WORKDIR /app

COPY package.json /app/package.json

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

#!/bin/sh

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]