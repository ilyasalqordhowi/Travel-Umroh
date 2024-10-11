package models

type Provinsi struct{
    Id int `json:"id"`
    Name string `json:"provinsi" db:"name"`
}