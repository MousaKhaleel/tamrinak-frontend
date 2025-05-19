const API_URL = process.env.API_URL || "https://localhost:7160";

export const register = async (userData) => {//TODO use
  const response = await fetch(`${API_URL}/api/User/Register`, {
    method: "POST",
    headers: { "Content-Type": "application/json",
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
  const response = await fetch(`${API_URL}/api/Authentication/Login`, {
    method: "POST",
    headers: { "Content-Type": "application/json",
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
export const logout = async () => {
  const response = await fetch(`${API_URL}/api/Authentication/logout`, {
    method: "POST",
        headers: { "Content-Type": "application/json",
     },
    credentials: "include", // optional: include cookies if using them
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Logout failed");
  }
};

export const sendConfirmationEmail = async (token) => {
  const response = await fetch(`${API_URL}/api/Authentication/send-confirmation-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Sending confirmation email failed");
  }
};

export const confirmEmail = async (token) => {
  const response = await fetch(`${API_URL}/api/Authentication/confirm-email?token=${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
     },
  });

  if (!response.ok) {
    const errorMessage = await response.text(); // Use text() to get plain text
    throw new Error(errorMessage || "Email confirmation failed");
  }

  return response.text(); // Use text() to get plain text
};



export const forgotPassword = async (email, token) => {
  const response = await fetch(`${API_URL}/api/Authentication/forgot-password`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(email), // Send just the string
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Forgot password request failed");
  }
};

export const resetPassword = async (token, newPassword) => {
  const response = await fetch(`${API_URL}/api/Authentication/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      Token: token,
      NewPassword: newPassword 
    }),
  });

  const responseText = await response.text();
  
  try {
    const data = JSON.parse(responseText);
    if (!response.ok) {
      throw new Error(data.message || "Password reset failed");
    }
    return data;
  } catch {
    if (!response.ok) {
      throw new Error(responseText || "Password reset failed");
    }
    return { message: responseText };
  }
};
