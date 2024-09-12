async function getHoldings() {
  try {
    const response = await fetch('http://localhost:8000/portfolio/holdings', {
      method: 'GET',
      credentials: 'include',
    });
    if (response.status !== 200) {
      return;
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export { getHoldings };
