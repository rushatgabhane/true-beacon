package main

import (
	"net/http"
	"true-beacon/src/handlers"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	r := chi.NewRouter()
    r.Use(middleware.Logger)

	HistoricalPrices := handlers.HistoricalPrices{
		ID: 0,
	}

	// Public Routes
    r.Group(func(r chi.Router) {
        r.Get("/", HistoricalPrices.HelloWorld)
        // r.Get("/{AssetUrl}", GetAsset)
        // r.Get("/manage/url/{path}", FetchAssetDetailsByURL)
        // r.Get("/manage/id/{path}", FetchAssetDetailsByID)
    })

    // Private Routes
    // Require Authentication
    // r.Group(func(r chi.Router) {
    //     r.Use(AuthMiddleware)
    //     r.Post("/manage", CreateAsset)
    // })
    http.ListenAndServe(":8000", r)
}
