async function addOrder(symbol: string, quantity: number, price: number) {
  try {
    const response = await fetch('http://localhost:8000/order/place_order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        symbol,
        quantity,
        price,
      }),
      credentials: 'include',
    });
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

export { addOrder };
