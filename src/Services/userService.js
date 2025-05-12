const API_URL = process.env.API_URL || "https://localhost:7160"; // Adjust the API URL as needed

export const addRole = async (userId, role) => {
  return await fetch(`${API_URL}/api/User/AddRole`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, role })
  }).then(res => res.json());
};

export const getUserRoles = async (userId) => {
  return await fetch(`${API_URL}/api/User/UserRoles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  }).then(res => res.json());
};

export const getUserRolesByEmail = async (email) => {
  return await fetch(`${API_URL}/api/User/UserRolesByEmail/${email}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json());
}

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

export const uploadProfilePicture = async (file, userId) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_URL}/api/User/profile-picture?userId=${userId}`, {
      method: 'PATCH',
      body: formData,
      // Add authorization header if needed
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    const text = await response.text();
    try {
      const data = text ? JSON.parse(text) : {};
      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }
      return data;
    } catch (e) {
      throw new Error(text || 'Upload failed');
    }
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error(error.message || 'Failed to upload image');
  }
};


export const deleteProfilePicture = async () => {
  return await fetch(`${API_URL}/api/User/delete-profile-picture`, {
    method: 'DELETE'
  }).then(res => res.json());
};

export const getProfilePicture = async (userId) => {
  try {
    const res = await fetch(`${API_URL}/api/User/profile-picture?userId=${userId}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'فشل تحميل صورة الملف الشخصي');
    }
    const data = await res.json();
    return data?.Base64Image || null;
  } catch (error) {
    console.error('Error fetching profile picture:', error);
    throw error;
  }
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
