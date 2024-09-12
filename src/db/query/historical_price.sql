-- name: GetHistoricalPriceBySymbolAndDate :many
SELECT date, price, instrument FROM historical_price
WHERE date BETWEEN ? AND ? AND instrument = ? ORDER BY date ASC;

-- name: AddHistoricalPrice :one
INSERT INTO historical_price (
    date,
    price,
    instrument
) 
VALUES (?, ?, ?) RETURNING *;
