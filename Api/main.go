package main

import (
	"github.com/joho/godotenv"
	"gitlab.clirisgroup.com/internal/account-admin-tool/Api/server"
)

func main() {
	godotenv.Load(".env")
	server.Run()
}
