package main

import (
	"context"
	"database/sql"
	_ "embed"
	"log"
	db "true-beacon/src/db/sqlc"
	"true-beacon/src/handlers"

	_ "github.com/mattn/go-sqlite3"
)

//go:embed src/db/schema.sql
var ddl string

type Server struct {
	DbSourceName string

	HistoricalPricesHandler *handlers.HistoricalPricesHandler
	UserHandler             *handlers.UserHandler
	ProfileHandler          *handlers.ProfileHandler
	OrderHandler            *handlers.OrderHandler
	HoldingHandler          *handlers.HoldingHandler
}

func (s *Server) Init() *Server {
	database, err := sql.Open("sqlite3", s.DbSourceName)
	if err != nil {
		log.Fatal("error opening database", err)
		return nil
	}

	ctx := context.Background()
	if _, err := database.ExecContext(ctx, ddl); err != nil {
		log.Fatal("error creating tables", err)
		return nil
	}
	queries := db.New(database)
	s.HistoricalPricesHandler = &handlers.HistoricalPricesHandler{Queries: queries}
	s.UserHandler = &handlers.UserHandler{Queries: queries}

	return s
}
