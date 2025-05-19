const API_URL = process.env.API_URL || "https://localhost:7160"; // Adjust the API URL as needed

// Add Role to User
export const addRole = async (userId, role) => {
  return await fetch(`${API_URL}/api/User/AddRole`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({ userId, role })
  }).then(res => res.json());
};

// Get User Roles by ID
export const getUserRoles = async (userId) => {
  return await fetch(`${API_URL}/api/User/UserRoles/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

// Get User Roles by Email
export const getUserRolesByEmail = async (email) => {
  return await fetch(`${API_URL}/api/User/UserRolesByEmail/${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

// Get Basic User Info List
export const getBasicInfoUserList = async () => {
  return await fetch(`${API_URL}/api/User/BasicInfoUserList`, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

// Get User by ID
export const getUserById = async (id) => {
  return await fetch(`${API_URL}/api/User/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

// Delete User
export const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/api/User/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete user');
  }

  return await response.json();
};

// Delete Profile Picture
export const deleteProfilePicture = async () => {
  return await fetch(`${API_URL}/api/User/delete-profile-picture`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

// Upload Profile Picture
export const uploadProfilePicture = async (file, userId) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_URL}/api/User/profile-picture?userId=${userId}`, {
      method: 'PATCH',
      body: formData,
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

// Get Profile Picture
export const getProfilePicture = async (userId) => {
  try {
    const res = await fetch(`${API_URL}/api/User/profile-picture?userId=${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to load profile picture');
    }
    const data = await res.json();
    return data?.Base64Image || null;
  } catch (error) {
    console.error('Error fetching profile picture:', error);
    throw error;
  }
};

// Get User Profile
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

// Request Venue Ownership
export const requestVenueOwnership = async () => {
  const res = await fetch(`${API_URL}/api/User/request-venue-ownership`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'فشل في إرسال الطلب.');
  }

  return res.json();
};
