FROM golang:alpine AS builder

RUN apk add build-base
COPY backend /src
RUN cd /src/cmd/AnyAppStart/ && CGO_ENABLED=0 go build -o /AnyAppStart .


FROM alpine:3

RUN apk add --no-cache docker tzdata openssh

WORKDIR /app
COPY --from=builder /AnyAppStart /app/

ENTRYPOINT ["./AnyAppStart"]