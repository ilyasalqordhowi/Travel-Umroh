package main

import (
	"backend-travel/routers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Static("/img/lampiranDiri/", "./img/lampiranDiri/")
	
    corsConfig := cors.DefaultConfig()
    corsConfig.AllowAllOrigins = true
    corsConfig.AllowHeaders = []string{
        "Origin", "Content-Type", "Authorization", "Content-Length",
    }
    r.Use(cors.New(corsConfig))
	routers.RouterCombine(r)
	r.Run("0.0.0.0:8888")
}