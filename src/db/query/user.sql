-- name: AddUser :one
INSERT INTO user (
    name,
    username,
    password
) VALUES (?, ?, ?) RETURNING *;

-- name: GetPasswordByUsername :one
SELECT password FROM user WHERE username = ?;

-- name: SetSessionAndExpiryByUsername :one
UPDATE user 
SET session = ?, expiry = ? 
WHERE username = ? 
RETURNING *;
