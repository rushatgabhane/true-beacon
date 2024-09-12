package main

import (
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dbSourceName := os.Getenv("DB_SOURCE_NAME")

	server := &Server{DbSourceName: dbSourceName}
	s := server.Init()

	r := chi.NewRouter()
	r.Use(middleware.Logger)

	// Public Routes
	r.Group(func(r chi.Router) {
		r.Post("/user/login", s.UserHandler.Login)
		r.Post("/user/register", s.UserHandler.Register)
		r.Post("/historical-data", s.HistoricalPricesHandler.AddHistoricalPrices)
	})

	// Routes that require authentication
	r.Group(func(r chi.Router) {
		// r.Use(middleware.BasicAuth())

		r.Get("/historical-data", s.HistoricalPricesHandler.GetHistoricalPrices)
		r.Get("/portfolio/holdings", s.HoldingHandler.GetHoldings)
		r.Get("/user/profile", s.ProfileHandler.GetProfile)
		r.Post("/order/place_order", s.OrderHandler.CreateOrder)

	})

	http.ListenAndServe(":8000", r)
}
