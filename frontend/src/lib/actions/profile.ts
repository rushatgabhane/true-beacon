async function getProfile() {
  try {
    return await fetch('http://localhost:8000/user/profile', {
      method: 'GET',
      credentials: 'include',
    });
  } catch (error) {
    console.error(error);
  }
}

export { getProfile };
