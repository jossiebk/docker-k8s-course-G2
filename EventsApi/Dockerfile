FROM golang:1.26-alpine AS build

WORKDIR /app

COPY go.mod ./

RUN go mod download

COPY . .

RUN go build -o EventsApi .

FROM alpine:latest

WORKDIR /app

COPY --from=build /app/EventsApi .

EXPOSE 6003

CMD ["./EventsApi"]