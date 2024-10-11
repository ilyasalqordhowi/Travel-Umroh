
FROM golang:1.23-alpine

WORKDIR /app

COPY . .

RUN go mod tidy


RUN go build -o backend-app

EXPOSE 8888