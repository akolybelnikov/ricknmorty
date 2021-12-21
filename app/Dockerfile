FROM node:14.18-alpine as builder

WORKDIR /app

COPY package.json ./

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install --silent

COPY . ./

RUN npm run build

FROM nginx:1.16.0-alpine

#!/bin/sh

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 5000 80

CMD ["nginx", "-g", "daemon off;"]
