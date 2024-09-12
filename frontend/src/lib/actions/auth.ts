async function login(username: string, password: string) {
  try {
    return await fetch('http://localhost:8000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });
  } catch (error) {
    console.error(error);
  }
}

export { login };
