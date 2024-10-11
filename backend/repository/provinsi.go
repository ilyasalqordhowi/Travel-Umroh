package repository

import (
	"backend-travel/lib"
	"backend-travel/models"
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
)
func FindAllProvinsil() []models.Provinsi{
	db := lib.DB()
	defer db.Close(context.Background())

	rows, _ := db.Query(context.Background(),
		`select * from "provinsi" order by "id" asc`,
	)
	provinsi, err := pgx.CollectRows(rows, pgx.RowToStructByPos[models.Provinsi])
	if err != nil {
		fmt.Println(err)
	}
	return provinsi
}