const API_URL = process.env.REACT_APP_API_URL;

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/User/Register`, {
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
  const response = await fetch(`${API_URL}/Authentication/Login`, {
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

  return await response.json(); // Should return { jwtToken, expiration }
};
