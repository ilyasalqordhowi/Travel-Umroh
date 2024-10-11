package models
type Kamar struct{
    Id int `json:"id"`
    Name string `json:"kamar" db:"name"`
}