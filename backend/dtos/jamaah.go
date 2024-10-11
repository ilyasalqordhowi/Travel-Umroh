package dtos

import (
	"time"
)

type Jamaah struct {
	ID                   int        `json:"id" form:"id"`
	NamaLengkap          string     `json:"nama_lengkap" form:"nama_lengkap"`
	NIK                  string     `json:"nik" form:"nik"`
	TempatLahir          string     `json:"tempat_lahir" form:"tempat_lahir"`
	TanggalLahir         *time.Time `json:"tanggal_lahir" form:"tanggal_lahir"` // Gunakan pointer untuk menangani null
	Alamat               string     `json:"alamat" form:"alamat"`
	Provinsi             int        `json:"provinsi_id" form:"provinsi_id"`
	KabKota              int        `json:"kabupaten_kota_id" form:"kabupaten_kota_id"`
	JenisKelamin         int        `json:"jenis_kelamin" form:"jenis_kelamin"`
	NoPaspor             string     `json:"no_paspor" form:"no_paspor"`
	MasaBerlakuPaspor    *time.Time `json:"masa_berlaku_paspor" form:"masa_berlaku_paspor"` // Gunakan pointer
	LampiranKTP          *string    `json:"lampiran_ktp" form:"lampiran_ktp"` // Gunakan pointer
	LampiranKK           *string    `json:"lampiran_kk" form:"lampiran_kk"` // Gunakan pointer
	LampiranFotoDiri     *string    `json:"lampiran_foto_diri" form:"lampiran_foto_diri"` // Gunakan pointer
	LampiranPaspor       *string    `json:"lampiran_paspor" form:"lampiran_paspor"` // Gunakan pointer
	NoVisa               *string    `json:"no_visa" form:"no_visa"` // Gunakan pointer
	BerlakuSampai        *time.Time `json:"berlaku_sampai" form:"berlaku_sampai"` // Gunakan pointer
	Paket                int        `json:"paket_id" form:"paket"`
	Kamar                int        `json:"kamar_id" form:"kamar"`
}
