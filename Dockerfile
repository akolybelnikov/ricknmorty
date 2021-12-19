FROM golang:1.17-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

WORKDIR /go/src/app

COPY go.mod go.sum ./

RUN go mod download

COPY graphql-server ./graphql-server

WORKDIR /go/src/app/graphql-server

RUN go build -o server .

EXPOSE 8080
