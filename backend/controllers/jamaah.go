package controllers

import (
	"backend-travel/dtos"
	"backend-travel/lib"
	"backend-travel/repository"
	"fmt"
	"net/http"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func CreateJamaah(c *gin.Context) {
	var jamaah dtos.Jamaah
	if err := c.ShouldBindJSON(&jamaah); err != nil {
		fmt.Println(err, "ini")
		lib.HandlerBadRequest(c, err.Error())
		return
	}

	id, err := repository.AddJamaah(jamaah) 
	if err != nil {
		lib.HandlerBadRequest(c, err.Error())
		return
	}

	jamaah.ID = id 
	lib.HandlerOK(c, "Jamaah added successfully", jamaah, nil)
}


func UpdateJamaah(c *gin.Context) {
	var jamaah dtos.Jamaah
	idStr := c.Param("id") 

	
	id, err := strconv.Atoi(idStr)
	if err != nil {
		lib.HandlerBadRequest(c, "Invalid ID format")
		return
	}

	if err := c.ShouldBindJSON(&jamaah); err != nil {
		lib.HandlerBadRequest(c, err.Error())
		return
	}

	
	err = repository.UpdateJamaah(jamaah, id)
	if err != nil {
		lib.HandlerBadRequest(c, err.Error())
		return
	}

	lib.HandlerOK(c, "Jamaah updated successfully", jamaah, nil)
}
func FindJamaahByIDHandler(c *gin.Context) {
    idStr := c.Param("id")
    id, err := strconv.Atoi(idStr)
    if err != nil {
        lib.HandlerBadRequest(c, "Invalid ID format")
        return
    }

    jamaah, err := repository.FindJamaahByID(id)
    if err != nil {
        lib.HandlerNotFound(c, "Jamaah not found")
        return
    }

    lib.HandlerOK(c, "Jamaah found", jamaah, nil)
}

func GetAllJamaahHandler(c *gin.Context) {
    jamaahs, err := repository.GetAllJamaah()
    if err != nil {
        lib.HandlerBadRequest(c, "Failed to retrieve jamaah data")
        return
    }

    lib.HandlerOK(c, "Jamaah data retrieved successfully", jamaahs, nil)
}


func UploadLampiranKTP(ctx *gin.Context) {
    id := ctx.GetInt("jamaahId")
    file, err := ctx.FormFile("lampiranKTP")
    if err != nil {
        lib.HandlerBadRequest(ctx, "File doesn't exist!")
        return
    }

    fileExt := strings.ToLower(filepath.Ext(file.Filename))
    allowExt := map[string]bool{".jpg": true, ".jpeg": true, ".png": true, ".pdf": true}

    if !allowExt[fileExt] {
        lib.HandlerBadRequest(ctx, "The file extension is prohibited!")
        return
    }

    newFile := uuid.New().String() + fileExt
    directory := "./img/lampiranKTP/"
    if err := ctx.SaveUploadedFile(file, directory+newFile); err != nil {
        lib.HandlerBadRequest(ctx, "Upload failed!")
        return
    }

    fileName := "/img/lampiranKTP/" + newFile
    jamaah, err := repository.UpdateLampiranKTP(dtos.Jamaah{LampiranKTP: &fileName}, id)
    if err != nil {
        lib.HandlerBadRequest(ctx, "Failed to update Jamaah!")
        return
    }

    lib.HandlerOK(ctx, "Lampiran KTP has been uploaded successfully", nil, jamaah)
}

func UploadLampiranKK(ctx *gin.Context) {
    id := ctx.GetInt("jamaahId")
    file, err := ctx.FormFile("lampiranKK")
    if err != nil {
        lib.HandlerBadRequest(ctx, "File doesn't exist!")
        return
    }

    fileExt := strings.ToLower(filepath.Ext(file.Filename))
    allowExt := map[string]bool{".jpg": true, ".jpeg": true, ".png": true, ".pdf": true}

    if !allowExt[fileExt] {
        lib.HandlerBadRequest(ctx, "The file extension is prohibited!")
        return
    }

    newFile := uuid.New().String() + fileExt
    directory := "./img/lampiranKK/"
    if err := ctx.SaveUploadedFile(file, directory+newFile); err != nil {
        lib.HandlerBadRequest(ctx, "Upload failed!")
        return
    }

    fileName := "/img/lampiranKK/" + newFile
    jamaah, err := repository.UpdateLampiranKK(dtos.Jamaah{LampiranKK: &fileName}, id)
    if err != nil {
        lib.HandlerBadRequest(ctx, "Failed to update Jamaah!")
        return
    }

    lib.HandlerOK(ctx, "Lampiran KK has been uploaded successfully", nil, jamaah)
}

func UploadLampiranFotoDiri(ctx *gin.Context) {
    id := ctx.GetInt("jamaahId")
    file, err := ctx.FormFile("lampiranFotoDiri")
    if err != nil {
        lib.HandlerBadRequest(ctx, "File doesn't exist!")
        return
    }

    fileExt := strings.ToLower(filepath.Ext(file.Filename))
    allowExt := map[string]bool{".jpg": true, ".jpeg": true, ".png": true, ".pdf": true}

    if !allowExt[fileExt] {
        lib.HandlerBadRequest(ctx, "The file extension is prohibited!")
        return
    }

    newFile := uuid.New().String() + fileExt
    directory := "./img/lampiranDiri/"
    if err := ctx.SaveUploadedFile(file, directory+newFile); err != nil {
        lib.HandlerBadRequest(ctx, "Upload failed!")
        return
    }

    fileName := "/img/lampiranDiri/" + newFile
    jamaah, err := repository.UpdateLampiranFotoDiri(dtos.Jamaah{LampiranFotoDiri: &fileName}, id)
    if err != nil {
        lib.HandlerBadRequest(ctx, "Failed to update Jamaah!")
        return
    }

    lib.HandlerOK(ctx, "Lampiran Foto Diri has been uploaded successfully", nil, jamaah)
}

func UploadLampiranPaspor(ctx *gin.Context) {
    id := ctx.GetInt("jamaahId")
    file, err := ctx.FormFile("lampiranPaspor")
    if err != nil {
        lib.HandlerBadRequest(ctx, "File doesn't exist!")
        return
    }

    fileExt := strings.ToLower(filepath.Ext(file.Filename))
    allowExt := map[string]bool{".jpg": true, ".jpeg": true, ".png": true, ".pdf": true}

    if !allowExt[fileExt] {
        lib.HandlerBadRequest(ctx, "The file extension is prohibited!")
        return
    }

    newFile := uuid.New().String() + fileExt
    directory := "./img/lampiranPaspor/"
    if err := ctx.SaveUploadedFile(file, directory+newFile); err != nil {
        lib.HandlerBadRequest(ctx, "Upload failed!")
        return
    }

    fileName := "/img/lampiranPaspor/" + newFile
    jamaah, err := repository.UpdateLampiranPaspor(dtos.Jamaah{LampiranPaspor: &fileName}, id)
    if err != nil {
        lib.HandlerBadRequest(ctx, "Failed to update Jamaah!")
        return
    }

    lib.HandlerOK(ctx, "Lampiran Paspor has been uploaded successfully", nil, jamaah)
}

func GetAllKabupatenHandler(c *gin.Context) {
    kabupaten := repository.FindAllKabupaten()
    if kabupaten == nil {
        lib.HandlerBadRequest(c, "Failed to retrieve kabupaten data")
        return
    }

    lib.HandlerOK(c, "Kabupaten data retrieved successfully", kabupaten, nil)
}

func FindAllPaketHandler(c *gin.Context) {
	paket := repository.FindAllPaket()
	lib.HandlerOK(c, "Paket data retrieved successfully", paket, nil)
}
func FindAllProvinsiHandler(c *gin.Context) {
	provinsi := repository.FindAllProvinsil()
	
	lib.HandlerOK(c, "Provinsi data retrieved successfully", provinsi, nil)
}
func FindAllKamarHandler(c *gin.Context) {
    kamar := repository.FindAllKamar()
   

    lib.HandlerOK(c, "Kamar data retrieved successfully", kamar, nil)
}
func DeleteJamaah(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid ID"})
		return
	}

	err = repository.DeleteJamaahByID(id)
	if err != nil {
		if err.Error() == "no rows in result set" {
			c.JSON(http.StatusNotFound, gin.H{"message": "Jamaah not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Error deleting Jamaah", "error": err.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Jamaah deleted successfully"})
}