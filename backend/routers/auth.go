package routers

import (
	"backend-travel/controllers"

	"github.com/gin-gonic/gin"
)
func AuthRouters(rg *gin.RouterGroup) {
	rg.POST("/login", controllers.AuthLogin)
	
}
