const API_URL = process.env.API_URL || "https://localhost:7160";

// Helper function to parse response as JSON or text
async function parseResponse(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/api/User/Register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await parseResponse(response);
  if (!response.ok) {
    throw new Error(data.message || data || "Registration failed");
  }
  return data;
};

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/api/Authentication/Login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await parseResponse(response);
  if (!response.ok) {
    throw new Error(data.message || data || "Login failed");
  }
  return data; // e.g., { jwtToken, expiration, name, role, id }
};

export const logout = async () => {
  const response = await fetch(`${API_URL}/api/Authentication/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await parseResponse(response);
  if (!response.ok) {
    throw new Error(data.message || data || "Logout failed");
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

  const data = await parseResponse(response);
  if (!response.ok) {
    throw new Error(data.message || data || "Sending confirmation email failed");
  }
};

export const confirmEmail = async (token) => {
  const response = await fetch(`${API_URL}/api/Authentication/confirm-email?token=${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await parseResponse(response);
  if (!response.ok) {
    throw new Error(data.message || data || "Email confirmation failed");
  }
  return data;
};

export const forgotPassword = async (email, token) => {
  const response = await fetch(`${API_URL}/api/Authentication/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(email),
  });

  const data = await parseResponse(response);
  if (!response.ok) {
    throw new Error(data.message || data || "Forgot password request failed");
  }
};

export const resetPassword = async (token, newPassword) => {
  const response = await fetch(`${API_URL}/api/Authentication/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Token: token,
      NewPassword: newPassword,
    }),
  });

  const data = await parseResponse(response);
  if (!response.ok) {
    throw new Error(data.message || data || "Password reset failed");
  }
  return data;
};
