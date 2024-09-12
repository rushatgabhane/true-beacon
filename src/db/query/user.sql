-- name: AddUser :one
INSERT INTO user (
    name,
    username,
    password
) VALUES (?, ?, ?) RETURNING *;

-- name: GetPasswordByUsername :one
SELECT password FROM user WHERE username = ?;
