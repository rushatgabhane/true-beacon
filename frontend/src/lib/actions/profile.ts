async function getProfile() {
  try {
    const response = await fetch('http://localhost:8000/user/profile', {
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

export { getProfile };
