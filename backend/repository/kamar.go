package repository

import (
	"backend-travel/lib"
	"backend-travel/models"
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
)
func FindAllKamar() []models.Kamar {
	db := lib.DB()
	defer db.Close(context.Background())

	rows, _ := db.Query(context.Background(),
		`Select * from kamar order by "id" asc`,
	)
	kamar, err := pgx.CollectRows(rows, pgx.RowToStructByPos[models.Kamar])
	if err != nil {
		fmt.Println(err)
	}
	return kamar
}