package repository

import (
	"backend-travel/lib"
	"backend-travel/models"
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
)
func FindAllPaket() []models.Paket {
	db := lib.DB()
	defer db.Close(context.Background())

	rows, _ := db.Query(context.Background(),
		`Select * from paket order by "id" asc`,
	)
	paket, err := pgx.CollectRows(rows, pgx.RowToStructByPos[models.Paket])
	if err != nil {
		fmt.Println(err)
	}
	return paket
}