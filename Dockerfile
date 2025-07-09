FROM --platform=$BUILDPLATFORM tonistiigi/xx AS xx

FROM --platform=$BUILDPLATFORM golang:alpine AS builder

COPY --from=xx / /

WORKDIR /src

COPY backend/go.mod backend/go.sum ./
RUN go mod download

COPY backend/ .

ARG TARGETPLATFORM
RUN CGO_ENABLED=0 xx-go build -ldflags='-w -s' -o /AnyAppStart ./cmd/AnyAppStart


FROM alpine

WORKDIR /app

RUN apk add --no-cache docker tzdata openssh \
    && mkdir /data

COPY --from=builder /AnyAppStart /app/

ENTRYPOINT ["./AnyAppStart"]
