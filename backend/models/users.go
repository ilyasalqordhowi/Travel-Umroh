package models

type Users struct {
	Id       int    `json:"id"`
	Email    string `json:"email" form:"email"`
	Password string `json:"-" form:"password"`

}