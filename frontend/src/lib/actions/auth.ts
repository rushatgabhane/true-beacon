async function login(username: string, password: string) {
  console.log('[login]: ', username);
  try {
    const response = await fetch('http://localhost:8000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

export { login };
