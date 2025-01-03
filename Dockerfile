FROM golang:alpine AS builder

RUN apk add build-base
COPY . /src
RUN cd /src/cmd/AnyAppStart/ && CGO_ENABLED=0 go build -o /AnyAppStart .


FROM alpine

WORKDIR /app

RUN apk add --no-cache arp-scan tzdata \
    && mkdir /data/AnyAppStart

COPY --from=builder /AnyAppStart /app/

ENTRYPOINT ["./AnyAppStart"]