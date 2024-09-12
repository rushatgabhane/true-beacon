package handlers

import (
	"net/http"
	db "true-beacon/src/db/sqlc"
)

type UserHandler struct {
	Queries *db.Queries
}

func (h *UserHandler) Login(w http.ResponseWriter, r *http.Request) {}

func (h *UserHandler) Register(w http.ResponseWriter, r *http.Request) {}
