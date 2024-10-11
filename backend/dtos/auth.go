package dtos

type LoginForm struct {
	Email    string `form:"email"`
	Password string `form:"password"`
}
type Token struct {
	Token string `json:"token"`
}