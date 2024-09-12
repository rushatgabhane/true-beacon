package handlers

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
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
	if err != nil {
		http.Error(w, "oops! something went wrong", http.StatusInternalServerError)
		return
	}

	jsonRes, err := json.Marshal(res)
	if err != nil {
		log.Println("failed to marshal response: ", err)
		http.Error(w, "oops! something went wrong", http.StatusInternalServerError)
		return
	}

	w.Write(jsonRes)
}

func (h *HistoricalPricesHandler) AddHistoricalPrices(w http.ResponseWriter, r *http.Request) {
	prices, err := readCSVFile()
	if err != nil {
		log.Println("failed to read csv file: ", err)
		http.Error(w, "oops! something went wrong", http.StatusInternalServerError)
		return
	}

	for _, data := range prices {
		// parsedDate, _ := time.Parse("2006-01-02 15:04:05-07:00", data[1])

		var f float64
		fmt.Sscanf(data[2], "%f", &f)
		price := int64(f*100 + 0.5)

		fmt.Println(price)

		// if err != nil {
		// 	log.Println("failed to convert price to integer: ", price, err)
		// 	http.Error(w, "oops! something went wrong", http.StatusInternalServerError)
		// 	return
		// }

		// h.Queries.AddHistoricalPrice(r.Context(), db.AddHistoricalPriceParams{
		// 	Date:       parsedDate,
		// 	Price:      int64(price * 100), // converting to paise
		// 	Instrument: data[3],
		// })
	}

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
