const API_URL = process.env.API_URL;

export const register = async (userData) => {//TODO use
  const response = await fetch(`https://localhost:7160/api/User/Register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed");
  }

  return await response.json();
};

export const login = async (credentials) => {
  const response = await fetch(`https://localhost:7160/api/Authentication/Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return await response.json(); // Should return { jwtToken, expiration }, name, role, id (?)
};

//TODO: logout, confim email, rest password