-- name: GetAllProfiles :many
SELECT user_id, user_type, email, username, broker, name FROM profile;

-- name: GetProfileByUserID :one
SELECT user_id, user_type, email, username, broker, name FROM profile WHERE user_id = ?;

-- name: GetProfileByUsername :one
SELECT user_id, user_type, email, username, broker, name FROM profile WHERE username = ?;
