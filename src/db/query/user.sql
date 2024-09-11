-- name: GetAllUsers :many
SELECT user_id, user_type, email, username, broker, name FROM user;

-- name: GetUserByUserID :one
SELECT user_id, user_type, email, username, broker, name FROM user WHERE user_id = ?;

-- name: GetUserByUsername :one
SELECT user_id, user_type, email, username, broker, name FROM user WHERE username = ?;
