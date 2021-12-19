FROM node:14.18-alpine as builder

WORKDIR /app

COPY package.json ./

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install

COPY . ./

EXPOSE 5000
