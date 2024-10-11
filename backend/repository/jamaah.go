package repository

import (
	"backend-travel/dtos"
	"backend-travel/lib"
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
)
func AddJamaah(jamaah dtos.Jamaah) (int, error) {
	conn := lib.DB()
	defer conn.Close(context.Background())

	var id int
	err := conn.QueryRow(context.Background(),
		`INSERT INTO jamaah (nama_lengkap, nik, tempat_lahir, tanggal_lahir, alamat, provinsi_id, kabupaten_kota_id, jenis_kelamin, no_paspor, masa_berlaku_paspor, lampiran_ktp, lampiran_kk, lampiran_foto_diri, lampiran_paspor, no_visa, berlaku_sampai, paket_id, kamar_id)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
		RETURNING id`,
		jamaah.NamaLengkap, jamaah.NIK, jamaah.TempatLahir, jamaah.TanggalLahir, jamaah.Alamat,
		jamaah.Provinsi, jamaah.KabKota, jamaah.JenisKelamin,
		jamaah.NoPaspor, jamaah.MasaBerlakuPaspor, jamaah.LampiranKTP, jamaah.LampiranKK,
		jamaah.LampiranFotoDiri, jamaah.LampiranPaspor, jamaah.NoVisa, jamaah.BerlakuSampai,
		jamaah.Paket, jamaah.Kamar).Scan(&id)

	if err != nil {
		return 0, err
	}

	return id, nil
}



func UpdateJamaah(data dtos.Jamaah, id int) error {

	db := lib.DB()
	defer db.Close(context.Background())

	
	dataSql := `
		UPDATE "jamaah" 
		SET 
			"nama_lengkap" = $1,
			"nik" = $2,
			"tempat_lahir" = $3,
			"tanggal_lahir" = $4,
			"alamat" = $5,
			"provinsi_id" = $6,
			"kabupaten_kota_id" = $7,
			"jenis_kelamin" = $8,
			"no_paspor" = $9,
			"masa_berlaku_paspor" = $10,
			"lampiran_ktp" = $11,
			"lampiran_kk" = $12,
			"lampiran_foto_diri" = $13,
			"lampiran_paspor" = $14,
			"no_visa" = $15,
			"berlaku_sampai" = $16,
			"paket_id" = $17,
			"kamar_id" = $18
		WHERE "id" = $19
	`

	_, err := db.Exec(context.Background(), dataSql,
		data.NamaLengkap,
		data.NIK,
		data.TempatLahir,
		data.TanggalLahir,
		data.Alamat,
		data.Provinsi,
		data.KabKota,
		data.JenisKelamin,
		data.NoPaspor,
		data.MasaBerlakuPaspor,
		data.LampiranKTP,
		data.LampiranKK,
		data.LampiranFotoDiri,
		data.LampiranPaspor,
		data.NoVisa,
		data.BerlakuSampai,
		data.Paket,
		data.Kamar,
		id,
	)

	if err != nil {
		return fmt.Errorf("failed to update jamaah: %v", err)
	}

	return nil
}
func FindJamaahByID(id int) (dtos.Jamaah, error) {
    db := lib.DB()
    defer db.Close(context.Background())

    sql := `SELECT "id", "nama_lengkap", "nik", "tempat_lahir", "tanggal_lahir", "alamat", 
            "provinsi_id", "kabupaten_kota_id", "jenis_kelamin", "no_paspor", 
            "masa_berlaku_paspor", "lampiran_ktp", "lampiran_kk", 
            "lampiran_foto_diri", "lampiran_paspor", "no_visa", 
            "berlaku_sampai", "paket_id", "kamar_id" 
            FROM "jamaah" 
            WHERE "id" = $1`

    query, err := db.Query(context.Background(), sql, id)
    if err != nil {
        return dtos.Jamaah{}, err
    }

    row, err := pgx.CollectOneRow(query, pgx.RowToStructByName[dtos.Jamaah])
    if err != nil {
        return dtos.Jamaah{}, err
    }

    return row, nil
}

func GetAllJamaah() ([]dtos.Jamaah, error) {
    db := lib.DB()
    defer db.Close(context.Background())

    sql := `SELECT "id", "nama_lengkap", "nik", "tempat_lahir", "tanggal_lahir", "alamat", 
            "provinsi_id", "kabupaten_kota_id", "jenis_kelamin", "no_paspor", 
            "masa_berlaku_paspor", "lampiran_ktp", "lampiran_kk", 
            "lampiran_foto_diri", "lampiran_paspor", "no_visa", 
            "berlaku_sampai", "paket_id", "kamar_id" 
            FROM "jamaah"`

    rows, err := db.Query(context.Background(), sql)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var jamaahs []dtos.Jamaah
    for rows.Next() {
        var jamaah dtos.Jamaah
        if err := rows.Scan(&jamaah.ID, &jamaah.NamaLengkap, &jamaah.NIK, &jamaah.TempatLahir,
            &jamaah.TanggalLahir, &jamaah.Alamat, &jamaah.Provinsi, &jamaah.KabKota,
            &jamaah.JenisKelamin, &jamaah.NoPaspor, &jamaah.MasaBerlakuPaspor,
            &jamaah.LampiranKTP, &jamaah.LampiranKK, &jamaah.LampiranFotoDiri,
            &jamaah.LampiranPaspor, &jamaah.NoVisa, &jamaah.BerlakuSampai,
            &jamaah.Paket, &jamaah.Kamar); err != nil {
            return nil, err
        }
        jamaahs = append(jamaahs, jamaah)
    }

    return jamaahs, nil
}

func UpdateLampiranKTP(data dtos.Jamaah, id int) (dtos.Jamaah, error) {
    db := lib.DB()
    defer db.Close(context.Background())

    sql := `UPDATE jamaah SET lampiran_ktp = $1 WHERE id = $2 RETURNING *`
    query, err := db.Query(context.Background(), sql, data.LampiranKTP, id)

    if err != nil {
        return dtos.Jamaah{}, err
    }

    row, err := pgx.CollectOneRow(query, pgx.RowToStructByPos[dtos.Jamaah])
    if err != nil {
        return dtos.Jamaah{}, err
    }

    return row, nil
}

func UpdateLampiranKK(data dtos.Jamaah, id int) (dtos.Jamaah, error) {
    db := lib.DB()
    defer db.Close(context.Background())

    sql := `UPDATE jamaah SET lampiran_kk = $1 WHERE id = $2 RETURNING *`
    query, err := db.Query(context.Background(), sql, data.LampiranKK, id)

    if err != nil {
        return dtos.Jamaah{}, err
    }

    row, err := pgx.CollectOneRow(query, pgx.RowToStructByPos[dtos.Jamaah])
    if err != nil {
        return dtos.Jamaah{}, err
    }

    return row, nil
}

func UpdateLampiranFotoDiri(data dtos.Jamaah, id int) (dtos.Jamaah, error) {
    db := lib.DB()
    defer db.Close(context.Background())

    sql := `UPDATE jamaah SET lampiran_foto_diri = $1 WHERE id = $2 RETURNING *`
    query, err := db.Query(context.Background(), sql, data.LampiranFotoDiri, id)

    if err != nil {
        return dtos.Jamaah{}, err
    }

    row, err := pgx.CollectOneRow(query, pgx.RowToStructByPos[dtos.Jamaah])
    if err != nil {
        return dtos.Jamaah{}, err
    }

    return row, nil
}

func UpdateLampiranPaspor(data dtos.Jamaah, id int) (dtos.Jamaah, error) {
    db := lib.DB()
    defer db.Close(context.Background())

    sql := `UPDATE jamaah SET lampiran_paspor = $1 WHERE id = $2 RETURNING *`
    query, err := db.Query(context.Background(), sql, data.LampiranPaspor, id)

    if err != nil {
        return dtos.Jamaah{}, err
    }

    row, err := pgx.CollectOneRow(query, pgx.RowToStructByPos[dtos.Jamaah])
    if err != nil {
        return dtos.Jamaah{}, err
    }

    return row, nil
}
func DeleteJamaahByID(id int) error {
	db := lib.DB()
	defer db.Close(context.Background())

	sql := `DELETE FROM jamaah WHERE id = $1`
	_, err := db.Exec(context.Background(), sql, id)
	if err != nil {
		return err
	}

	return nil
}