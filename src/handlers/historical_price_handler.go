package handlers

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
	db "true-beacon/src/db/sqlc"
)

type HistoricalPricesHandler struct {
	Queries *db.Queries
}

func (h *HistoricalPricesHandler) GetHistoricalPrices(w http.ResponseWriter, r *http.Request) {
	fromDate, err := time.Parse("2006-01-02", r.URL.Query().Get("from_date"))
	if err != nil {
		log.Println("failed to parse from date: ", err)
		http.Error(w, "invalid from_date", http.StatusBadRequest)
		return
	}

	toDate, err := time.Parse("2006-01-02", r.URL.Query().Get("to_date"))
	if err != nil {
		log.Println("failed to parse to date: ", err)
		http.Error(w, "invalid to_date", http.StatusBadRequest)
		return
	}

	instrument := r.URL.Query().Get("symbol")
	if instrument == "" {
		http.Error(w, "symbol is required", http.StatusBadRequest)
		return
	}

	res, err := h.Queries.GetHistoricalPriceBySymbolAndDate(r.Context(), db.GetHistoricalPriceBySymbolAndDateParams{
		Instrument: instrument,
		Date:       fromDate,
		Date_2:     toDate,
	})
	if err != nil {
		http.Error(w, "oops! something went wrong", http.StatusInternalServerError)
		return
	}

	if res == nil {
		res = []db.GetHistoricalPriceBySymbolAndDateRow{}
	}

	jsonRes, err := json.Marshal(res)
	if err != nil {
		log.Println("failed to marshal response: ", err)
		http.Error(w, "oops! something went wrong", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonRes)
}

func (h *HistoricalPricesHandler) AddHistoricalPrices(w http.ResponseWriter, r *http.Request) {
	prices, err := readCSVFile()
	if err != nil {
		log.Println("failed to read csv file: ", err)
		http.Error(w, "oops! something went wrong", http.StatusInternalServerError)
		return
	}

	for i, data := range prices {
		if i == 0 { // skip header
			continue
		}

		var f float64
		fmt.Sscanf(data[2], "%f", &f)
		priceInPaise := int64(f*100 + 0.5)

		parsedDate, err := time.Parse("2006-01-02 15:04:05-07:00", data[1])
		if err != nil {
			log.Println("failed to parse date: ", err)
			http.Error(w, "oops! something went wrong", http.StatusInternalServerError)
			return
		}

		_, err = h.Queries.AddHistoricalPrice(r.Context(), db.AddHistoricalPriceParams{
			Date:       parsedDate,
			Price:      priceInPaise,
			Instrument: data[3],
		})
		if err != nil {
			log.Println("failed to add historical price: ", err)
			http.Error(w, "oops! something went wrong", http.StatusInternalServerError)
			return
		}
	}
	w.WriteHeader(http.StatusCreated)
}

func readCSVFile() ([][]string, error) {
	file, err := os.Open("historical_prices.csv")
	if err != nil {
		log.Println("Failed to open file: %s", err)
	}
	defer file.Close()

	reader := csv.NewReader(file)
	return reader.ReadAll()
}
