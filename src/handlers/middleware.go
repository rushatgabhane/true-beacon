package handlers

import (
	"database/sql"
	"net/http"
	"time"
	db "true-beacon/src/db/sqlc"
)

type Middleware struct {
	Queries *db.Queries
}

func (m *Middleware) IsAuthenticated(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("session")
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		expiry, err := m.Queries.GetExipryBySession(r.Context(), sql.NullString{String: cookie.Value, Valid: true})
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		if !expiry.Valid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		if expiry.Time.Before(time.Now()) {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	})
}
