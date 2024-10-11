package models

type Kabupaten struct{
    Id int `json:"id"`
	ProvinsiId int `json:"provinsi_id" db:"provinsi"`
    Name string `json:"kabupaten_kota" db:"name"`

}