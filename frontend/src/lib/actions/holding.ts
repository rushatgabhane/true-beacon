async function getHoldings() {
  try {
    return await fetch('http://localhost:8000/portfolio/holdings', {
      method: 'GET',
      credentials: 'include',
    });
  } catch (error) {
    console.error(error);
  }
}

export { getHoldings };
