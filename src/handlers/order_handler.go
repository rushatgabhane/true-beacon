package handlers

import (
	"encoding/json"
	"net/http"
)

type OrderHandler struct {
}

type Order struct {
	Message string `json:"message"`
	OrderID string `json:"order_id"`
}

type OrderResponse struct {
	Status string `json:"status"`
	Data   Order  `json:"data"`
}

func (h *OrderHandler) AddOrder(w http.ResponseWriter, r *http.Request) {
	o := OrderResponse{
		Status: "success",
		Data: Order{
			Message: "Order Placed Successfully",
			OrderID: "151220000000000",
		},
	}

	jsonRes, _ := json.Marshal(o)

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonRes)
}
