package handlers

import (
	"net/http"
)

type ProfileHandler struct{}

func (h *ProfileHandler) GetProfile(w http.ResponseWriter, r *http.Request) {}
