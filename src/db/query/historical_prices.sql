-- name: GetHistoricalPrices :many
SELECT date, price, instrument FROM historical_prices;

-- name: AddHistoricalPrice :one
INSERT INTO historical_prices (
    date,
    price,
    instrument
) 
VALUES (?, ?, ?) RETURNING *;
