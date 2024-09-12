package handlers

import (
	"encoding/json"
	"net/http"
)

type ProfileHandler struct{}

type Profile struct {
	UserID   string `json:"user_id"`
	UserType string `json:"user_type"`
	Email    string `json:"email"`
	UserName string `json:"user_name"`
	Broker   string `json:"broker"`
}

type ProfileResponse struct {
	Status string  `json:"status"`
	Data   Profile `json:"data"`
}

func (h *ProfileHandler) GetProfile(w http.ResponseWriter, r *http.Request) {
	profile := Profile{
		UserID:   "AB1234",
		UserType: "individual",
		Email:    "xxxyyy@gmail.com",
		UserName: "AxAx Bxx",
		Broker:   "ZERODHA",
	}

	response := ProfileResponse{
		Status: "success",
		Data:   profile,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
