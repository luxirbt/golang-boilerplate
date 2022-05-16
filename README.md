# Account Admin Tool

## Prerequisites

- Docker
- docker-compose

## Dev back

- `$ docker-compose up`

- If not using Docker :
- `$ cd Api && go run main.go`
- `$ cd frontend && yarn && yarn run dev`

## Prod/test instance

### First deployment

to run the app run the executable created using build
edit _./login-api.service_ then copy it

- run in background

  1. create ctl file

     - `$ cp ./aat-api.service /lib/systemd/system`

  2. enable the service

     - `$ systemctl enable aat-api.service`

  3. start the service

     - `$ systemctl start aat-api.service`

  4. check the status

     - `$ systemctl status aat-api.service`

- stop the service
  - `$ systemctl stop aat-api.service`

### Deployment - Frontend

- `$ cd frontend`
- `$ yarn`
- `$ yarn run build`
- `$ pm2 restart <id>`

### Deployment - Api

- `$ cd Api`
- `$ go build main.go`
- `$ systemctl restart aat-api.service`

## Test - API

### - test all modules

- `$ go test -v ./...`

### - test main

- `$ go test -v .`

### - test specific package

- `$ go test -v ./path/to/package`

### - clean cache

- `$ go clean -testcache`
