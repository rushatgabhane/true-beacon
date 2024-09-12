package handlers

import (
	"database/sql"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"time"
	db "true-beacon/src/db/sqlc"

	"github.com/google/uuid"
	"github.com/mattn/go-sqlite3"
	"golang.org/x/crypto/bcrypt"
)

type UserHandler struct {
	Queries *db.Queries
}

func (h *UserHandler) Login(w http.ResponseWriter, r *http.Request) {
	user := &db.User{}
	err := json.NewDecoder(r.Body).Decode(user)
	if err != nil || user.Username == "" || user.Password == "" {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	storedPassword, err := h.Queries.GetPasswordByUsername(r.Context(), user.Username)
	if err != nil {
		if err == sql.ErrNoRows {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		log.Println("error reading password: ", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	if err = bcrypt.CompareHashAndPassword([]byte(storedPassword), []byte(user.Password)); err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	session := uuid.NewString()
	expiry := time.Now().Add(15 * time.Minute)

	_, err = h.Queries.SetSessionAndExpiryByUsername(r.Context(), db.SetSessionAndExpiryByUsernameParams{
		Session:  sql.NullString{String: session, Valid: true},
		Expiry:   sql.NullTime{Time: expiry, Valid: true},
		Username: user.Username,
	})
	if err != nil {
		log.Println("error setting session and expiry: ", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "session",
		Value:    session,
		Expires:  expiry,
		HttpOnly: true,
		Path:     "/",
	})
}

func (h *UserHandler) Register(w http.ResponseWriter, r *http.Request) {
	user := &db.User{}
	err := json.NewDecoder(r.Body).Decode(user)
	if err != nil || user.Username == "" || user.Password == "" || user.Name == "" {
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
		Name:     user.Name,
	})

	if err != nil {
		// Check if the error is a unique constraint violation
		var sqliteErr sqlite3.Error
		if errors.As(err, &sqliteErr) && sqliteErr.Code == sqlite3.ErrConstraint {
			log.Println("user already exists: ", err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		log.Println("error adding user: ", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	session := uuid.NewString()
	expiry := time.Now().Add(15 * time.Minute)

	_, err = h.Queries.SetSessionAndExpiryByUsername(r.Context(), db.SetSessionAndExpiryByUsernameParams{
		Session:  sql.NullString{String: session, Valid: true},
		Expiry:   sql.NullTime{Time: expiry, Valid: true},
		Username: user.Username,
	})
	if err != nil {
		log.Println("error setting session and expiry: ", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "session",
		Value:    session,
		Expires:  expiry,
		HttpOnly: true,
		Path:     "/",
	})
	w.WriteHeader(http.StatusCreated)
}
