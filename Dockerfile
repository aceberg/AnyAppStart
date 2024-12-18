FROM golang:alpine AS builder

RUN apk add build-base
COPY . /src
RUN cd /src/cmd/QuickStart/ && CGO_ENABLED=0 go build -o /QuickStart .


FROM alpine

WORKDIR /app

RUN apk add --no-cache arp-scan tzdata \
    && mkdir /data/QuickStart

COPY --from=builder /QuickStart /app/

ENTRYPOINT ["./QuickStart"]