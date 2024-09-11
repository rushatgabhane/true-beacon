-- name: GetAllHistoricalPrices :many
SELECT date, price, instrument FROM historical_price;

-- name: AddHistoricalPrice :one
INSERT INTO historical_price (
    date,
    price,
    instrument
) 
VALUES (?, ?, ?) RETURNING *;
