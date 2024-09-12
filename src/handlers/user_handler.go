package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	db "true-beacon/src/db/sqlc"

	"golang.org/x/crypto/bcrypt"
)

type UserHandler struct {
	Queries *db.Queries
}

func (h *UserHandler) Login(w http.ResponseWriter, r *http.Request) {

}

func (h *UserHandler) Register(w http.ResponseWriter, r *http.Request) {
	user := &db.User{}
	err := json.NewDecoder(r.Body).Decode(user)
	if err != nil || user.Username == "" || user.Password == "" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 8)
	if err != nil {
		log.Println("error hashing password: ", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	_, err = h.Queries.AddUser(r.Context(), db.AddUserParams{
		Username: user.Username,
		Password: string(hashedPassword),
	})
	if err != nil {
		log.Println("error adding user: ", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
}
