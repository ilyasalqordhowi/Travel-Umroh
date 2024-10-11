package routers

import (
	"github.com/gin-gonic/gin"
)

func RouterCombine(r *gin.Engine){	
	AuthRouters(r.Group("/auth"))
	JamaahRouters(r.Group("/jamaah"))
}