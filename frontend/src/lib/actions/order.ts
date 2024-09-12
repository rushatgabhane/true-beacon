async function addOrder(symbol: string, quantity: number, price: number) {
  try {
    return await fetch('http://localhost:8000/order/place_order', {
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
  } catch (error) {
    console.error(error);
  }
}

export { addOrder };
