package repository

import (
	"backend-travel/lib"
	"backend-travel/models"
	"context"

	"github.com/jackc/pgx/v5"
)
func FindUserByEmail(email string) (models.Users, error) {
	db := lib.DB()
	defer db.Close(context.Background())

	sql := `SELECT * FROM role WHERE email=$1`

	row, err := db.Query(context.Background(), sql, email)

	if err != nil {
		return models.Users{}, err
	}

	user, err := pgx.CollectOneRow(row, pgx.RowToStructByPos[models.Users])

	if err != nil {
		return models.Users{}, err
	}

	return user, nil
}