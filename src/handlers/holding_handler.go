package handlers

import (
	"encoding/json"
	"net/http"
)

type HoldingHandler struct{}

type Holding struct {
	TradingSymbol       string  `json:"tradingsymbol"`
	Exchange            string  `json:"exchange"`
	ISIN                string  `json:"isin"`
	Quantity            int     `json:"quantity"`
	AuthorisedDate      string  `json:"authorised_date"`
	AveragePrice        float64 `json:"average_price"`
	LastPrice           float64 `json:"last_price"`
	ClosePrice          float64 `json:"close_price"`
	PNL                 float64 `json:"pnl"`
	DayChange           float64 `json:"day_change"`
	DayChangePercentage float64 `json:"day_change_percentage"`
}

type HoldingResponse struct {
	Status string    `json:"status"`
	Data   []Holding `json:"data"`
}

func (h *HoldingHandler) GetHoldings(w http.ResponseWriter, r *http.Request) {
	holdings := []Holding{
		{
			TradingSymbol:       "GOLDBEES",
			Exchange:            "BSE",
			ISIN:                "INF204KB17I5",
			Quantity:            2,
			AuthorisedDate:      "2021-06-08 00:00:00",
			AveragePrice:        40.67,
			LastPrice:           42.47,
			ClosePrice:          42.28,
			PNL:                 3.5999999999999943,
			DayChange:           0.18999999999999773,
			DayChangePercentage: 0.44938505203405327,
		},
		{
			TradingSymbol:       "IDEA",
			Exchange:            "NSE",
			ISIN:                "INE669E01016",
			Quantity:            5,
			AuthorisedDate:      "2021-06-08 00:00:00",
			AveragePrice:        8.466,
			LastPrice:           10,
			ClosePrice:          10.1,
			PNL:                 7.6700000000000035,
			DayChange:           -0.09999999999999964,
			DayChangePercentage: -0.9900990099009866,
		},
	}

	response := HoldingResponse{
		Status: "success",
		Data:   holdings,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
