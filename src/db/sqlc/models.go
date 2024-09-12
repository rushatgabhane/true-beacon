// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0

package db

import (
	"database/sql"
	"time"
)

type HistoricalPrice struct {
	ID         int64     `json:"id"`
	Date       time.Time `json:"date"`
	Price      int64     `json:"price"`
	Instrument string    `json:"instrument"`
}

type User struct {
	ID       int64          `json:"id"`
	Username string         `json:"username"`
	Name     string         `json:"name"`
	Password string         `json:"password"`
	Session  sql.NullString `json:"session"`
	Expiry   sql.NullTime   `json:"expiry"`
}
