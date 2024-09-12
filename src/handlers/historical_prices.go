package handlers

import (
	"net/http"
	db "true-beacon/src/db/sqlc"
)

type HistoricalPricesHandler struct {
	Queries *db.Queries
}

func (h *HistoricalPricesHandler) HelloWorld(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello world!"))
	// res, err := h.Queries.GetAllUsers(r.Context())
}

func (h *HistoricalPricesHandler) GetHistoricalPrices(w http.ResponseWriter, r *http.Request) {
	res, err := h.Queries.GetAllHistoricalPrices(r.Context())
	return w.Write()
}

func (h *HistoricalPricesHandler) AddHistoricalPrices(w http.ResponseWriter, r *http.Request) {
	rows := 
}