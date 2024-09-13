package main

import (
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
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
	r.Use(cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	}).Handler)

	// Public Routes
	r.Group(func(r chi.Router) {
		r.Post("/user/login", s.UserHandler.Login)
		r.Post("/user/register", s.UserHandler.Register)
	})

	// Routes that require authentication
	r.Group(func(r chi.Router) {
		r.Use(s.Middleware.IsAuthenticated)

		r.Get("/historical-data", s.HistoricalPricesHandler.GetHistoricalPrices)
		r.Post("/historical-data", s.HistoricalPricesHandler.AddHistoricalPrices)
		r.Get("/portfolio/holdings", s.HoldingHandler.GetHoldings)
		r.Get("/user/profile", s.ProfileHandler.GetProfile)
		r.Post("/order/place_order", s.OrderHandler.AddOrder)
		r.Get("/live-price", s.LivePriceHandler.GetLivePrice)
	})

	log.Println("server is running on port 8000")
	http.ListenAndServe(":8000", r)
}
