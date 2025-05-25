// Centralized API helpers that gracefully handle both JSON and plain‑text responses
const API_URL = process.env.API_URL || "https://localhost:7160"; // Adjust the API URL as needed

/**
 * Attempt to parse a Response body as JSON; if that fails, return raw text.
 * Throws for non‑OK responses, propagating a usable error message in either case.
 */
const parseResponse = async (response) => {
  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch (_) {
    data = text; // plain text fallback
  }

  if (!response.ok) {
    // Extract message from JSON object or use raw text
    const message = typeof data === "object" && data !== null ? data.message : data;
    throw new Error(message || "Request failed");
  }

  return data; // could be an object or plain text
};

// Add Role to User
export const addRole = async (userId, role) => {
  const res = await fetch(`${API_URL}/api/User/AddRole`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ userId, role }),
  });
  return parseResponse(res);
};

// Get User Roles by ID
export const getUserRoles = async (userId) => {
  const res = await fetch(`${API_URL}/api/User/UserRoles/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return parseResponse(res);
};

// Get User Roles by Email
export const getUserRolesByEmail = async (email) => {
  const res = await fetch(`${API_URL}/api/User/UserRolesByEmail/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return parseResponse(res);
};

// Get Basic User Info List
export const getBasicInfoUserList = async () => {
  const res = await fetch(`${API_URL}/api/User/BasicInfoUserList`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return parseResponse(res);
};

// Get User by ID
export const getUserById = async (id) => {
  const res = await fetch(`${API_URL}/api/User/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return parseResponse(res);
};

// Delete User
export const deleteUser = async (id) => {
  const res = await fetch(`${API_URL}/api/User/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return parseResponse(res);
};

// Delete Profile Picture
export const deleteProfilePicture = async (userId) => {
  const res = await fetch(
    `${API_URL}/api/User/delete-profile-picture?userId=${userId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );
  return parseResponse(res);
};

// Upload Profile Picture (uses FormData)
export const uploadProfilePicture = async (file, userId) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(
    `${API_URL}/api/User/profile-picture?userId=${userId}`,
    {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return parseResponse(res);
};

// Get Profile Picture
export const getProfilePicture = async (userId) => {
  const res = await fetch(
    `${API_URL}/api/User/profile-picture?userId=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (res.status === 404) return null; // explicit no‑image response
  const data = await parseResponse(res);
  // API returns { Base64Image: "..." } on success, or plain text on error
  return typeof data === "object" ? data.Base64Image ?? null : data;
};

// Get User Profile
export const getProfile = async (token) => {
  if (!token) throw new Error("No token found");

  const res = await fetch(`${API_URL}/api/User/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return parseResponse(res);
};

// Request Venue Ownership
export const requestVenueOwnership = async () => {
  const res = await fetch(
    `${API_URL}/api/VenueManager/request-venue-ownership-existing-venue`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return parseResponse(res);
};

// Request Venue Manager
export const requestVenueManager = async () => {
  const res = await fetch(`${API_URL}/api/VenueManager/request-venue-manager`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return parseResponse(res);
};
