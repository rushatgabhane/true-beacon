package main

import (
	"context"
	"database/sql"
	_ "embed"
	"log"
	"net/http"
	"true-beacon/src/handlers"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	_ "github.com/mattn/go-sqlite3"
)

//go:embed src/db/schema.sql
var ddl string

func main() {
    db, err := sql.Open("sqlite3", "true_beacon.db")
    if err != nil {
        log.Fatal("error opening database", err)
        return
	}
    
    ctx := context.Background()
    if _, err := db.ExecContext(ctx, ddl); err != nil {
        log.Fatal("error creating tables", err)
        return
    }

    r := chi.NewRouter()
    r.Use(middleware.Logger)

	// Public Routes
    r.Group(func(r chi.Router) {
        r.Get("/", handlers.HelloWorld)
        r.Post("/user/login", handlers.Login)
        r.Post("/user/register", handlers.Register)
        r.Post("/historical-data", handlers.AddHistoricalPrices)
    })

    // Routes that require authentication
    r.Group(func(r chi.Router) {
        // r.Use(middleware.BasicAuth())
        r.Get("/historical-data", handlers.GetHistoricalPrices)
    })

    http.ListenAndServe(":8000", r)
}
