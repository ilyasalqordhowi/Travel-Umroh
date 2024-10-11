package routers

import (
	"backend-travel/controllers"

	"github.com/gin-gonic/gin"
)

func JamaahRouters(rg *gin.RouterGroup) {
	rg.GET("", controllers.GetAllJamaahHandler)
    rg.POST("/create", controllers.CreateJamaah)
    rg.PATCH("/update", controllers.UpdateJamaah)
    rg.POST("/lampiran/ktp", controllers.UploadLampiranKTP)
    rg.POST("/lampiran/kk", controllers.UploadLampiranKK)
    rg.POST("/lampiran/foto-diri", controllers.UploadLampiranFotoDiri)
    rg.POST("/lampiran/paspor", controllers.UploadLampiranPaspor)
    rg.GET("/:id", controllers.FindJamaahByIDHandler)
	rg.GET("/kabupaten", controllers.GetAllKabupatenHandler)
	rg.GET("/paket", controllers.FindAllPaketHandler)
	rg.GET("/provinsi", controllers.FindAllProvinsiHandler)
	rg.GET("/kamar", controllers.FindAllKamarHandler)
	rg.DELETE("/jamaah/:id", controllers.DeleteJamaah)
}
