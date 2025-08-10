package main

import (
	"my-golang-service/providers/database"
	httpserver "my-golang-service/server/http"
)

func main() {
	db := database.ConnectDatabase()
	httpserver.HandleRequests(db)
}
