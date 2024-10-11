package repository

import (
	"backend-travel/lib"
	"backend-travel/models"
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
)
func FindAllKabupaten() []models.Kabupaten {
	db := lib.DB()
	defer db.Close(context.Background())

	rows, _ := db.Query(context.Background(),
		`Select * from kabupaten_kota order by "id" asc`,
	)
	kabupaten, err := pgx.CollectRows(rows, pgx.RowToStructByPos[models.Kabupaten])
	if err != nil {
		fmt.Println(err)
	}
	return kabupaten
}