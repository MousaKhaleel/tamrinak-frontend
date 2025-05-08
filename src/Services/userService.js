const API_URL = process.env.API_URL || "https://localhost:7160"; // Adjust the API URL as needed

export const addRole = async (userId, role) => {
  return await fetch(`${API_URL}/api/User/AddRole`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, role })
  }).then(res => res.json());
};

export const getUserRoles = async (userId) => {
  return await fetch(`${API_URL}/api/User/GetUserRoles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  }).then(res => res.json());
};

export const getUserRolesByEmail = async (email) => {
  return await fetch(`${API_URL}/api/User/GetUserRolesEmail`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  }).then(res => res.json());
};

export const getBasicInfoUserList = async () => {
  return await fetch(`${API_URL}/api/User/BasicInfoUserList`)
    .then(res => res.json());
};

export const getUserById = async (id) => {
  return await fetch(`${API_URL}/api/User/${id}`)
    .then(res => res.json());
};

export const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/api/User/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete user');
  }

  return await response.json();
};

export const uploadProfilePicture = async (formData) => {
  return await fetch(`${API_URL}/api/User/upload-profile-picture`, {
    method: 'PATCH',
    body: formData
  }).then(res => res.json());
};

export const deleteProfilePicture = async () => {
  return await fetch(`${API_URL}/api/User/delete-profile-picture`, {
    method: 'DELETE'
  }).then(res => res.json());
};

export const changeProfilePicture = async (formData) => {
  return await fetch(`${API_URL}/api/User/change-profile-picture`, {
    method: 'PATCH',
    body: formData
  }).then(res => res.json());
};

export const getProfilePicture = async () => {
  return await fetch(`${API_URL}/api/User/profile-picture`)
    .then(res => res.blob());
};

export const getProfile = async (token) => {
  if (!token) {
    throw new Error('No token found');
  }

  return await fetch(`${API_URL}/api/User/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(res => res.json());
};
