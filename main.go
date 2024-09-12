package main

import (
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
    dbSourceName := os.Getenv("DB_SOURCE_NAME")
    
    s := &Server{DbSourceName: dbSourceName}
    r := chi.NewRouter()
    r.Use(middleware.Logger)

	// Public Routes
    r.Group(func(r chi.Router) {
        r.Get("/", s.HistoricalPricesHandler.HelloWorld)
        r.Post("/user/login", s.UserHandler.Login)
        r.Post("/user/register", s.UserHandler.Register)
        r.Post("/historical-data", s.HistoricalPricesHandler.AddHistoricalPrices)
    })

    // Routes that require authentication
    r.Group(func(r chi.Router) {
        // r.Use(middleware.BasicAuth())
        r.Get("/historical-data", s.HistoricalPricesHandler.GetHistoricalPrices)
    })

    http.ListenAndServe(":8000", r)
}
