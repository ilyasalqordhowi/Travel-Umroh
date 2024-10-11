package controllers

import (
	"backend-travel/dtos"
	"backend-travel/lib"
	"backend-travel/models"
	"backend-travel/repository"
	"fmt"

	"github.com/gin-gonic/gin"
)

func AuthLogin(c *gin.Context) {
	formLogin := dtos.LoginForm{}
	err := c.Bind(&formLogin)

	if err != nil {
		lib.HandlerBadRequest(c, "email and password is null")
		return
	}

	found, err := repository.FindUserByEmail(formLogin.Email)
	fmt.Println(err,"ini error")
	if err != nil {
		lib.HandlerBadRequest(c, "Wrong email and password")
		return
	}
	if found == (models.Users{}) {
		lib.HandlerUnauthorized(c, "Wrong email")
		return
	}

	isVerified := lib.Verify(formLogin.Password, found.Password)

	if !isVerified {
		lib.HandlerUnauthorized(c, "Wrong password")
		return
	} else {
		token := lib.GenerateUserTokenById(found.Id)
		lib.HandlerOK(c, "Login success", dtos.Token{Token: token}, nil)
	}
}

