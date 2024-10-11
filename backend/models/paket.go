package models
type Paket struct{
    Id int `json:"id"`
    Name string `json:"paket" db:"name"`
}