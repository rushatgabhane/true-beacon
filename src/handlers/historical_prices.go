package handlers

import (
	"net/http"
)

func HelloWorld(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello world!"))
}

func GetHistoricalPrices(w http.ResponseWriter, r *http.Request) {
}

funct AddHistoricalPrices(w http.ResponseWriter, r *http.Request) {
	
}