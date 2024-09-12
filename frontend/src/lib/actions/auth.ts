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

async function register(username: string, password: string, name: string) {
  try {
    return await fetch('http://localhost:8000/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, name }),
      credentials: 'include',
    });
  } catch (error) {
    console.error(error);
  }
}

export { login, register };
