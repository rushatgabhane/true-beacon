async function getHistoricalData(
  symbol: string,
  fromDate: string,
  toDate: string
) {
  try {
    const response = await fetch(
      'http://localhost:8000/historical-data?' +
        new URLSearchParams({
          symbol,
          from_date: fromDate,
          to_date: toDate,
        }).toString(),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );
    if (response.status === 401) {
      window.location.href = '/login';
      return;
    }

    return response.json();
  } catch (error) {
    console.error(error);
    window.location.href = '/login';
  }
}

export { getHistoricalData };
