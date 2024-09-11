package handlers

import (
	"fmt"
	"net/http"
)

type HistoricalPrices struct {
	ID int `json:"id"`
}

func (h *HistoricalPrices) HelloWorld(w http.ResponseWriter, r *http.Request) {
	h.ID = 1

	w.Write([]byte(fmt.Sprintf("%d", h.ID)))
}