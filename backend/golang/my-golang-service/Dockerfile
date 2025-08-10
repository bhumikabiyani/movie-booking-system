FROM golang:1.22 AS builder
WORKDIR /app
COPY . .
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o main .

FROM debian:latest
WORKDIR /app
COPY --from=builder /app/main .
COPY config.yaml config.yaml
EXPOSE 8080
# Run the Go application
CMD ["./main"]