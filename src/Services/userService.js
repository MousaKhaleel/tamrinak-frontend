import { useAuth } from '../Context/AuthContext';
const API_URL = process.env.API_URL || "https://localhost:7160"; // Adjust the API URL as needed

//TODO check

const userService = {
  addRole: async (userId, role) => {
    return await fetch(`${API_URL}/api/User/AddRole`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, role })
    }).then(res => res.json());
  },

  getUserRoles: async (userId) => {
    return await fetch(`${API_URL}/api/User/GetUserRoles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    }).then(res => res.json());
  },

  getUserRolesByEmail: async (email) => {
    return await fetch(`${API_URL}/api/User/GetUserRolesEmail`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    }).then(res => res.json());
  },

  getBasicInfoUserList: async () => {
    return await fetch(`${API_URL}/api/User/BasicInfoUserList`)
      .then(res => res.json());
  },

  getUserById: async (id) => {
    return await fetch(`${API_URL}/api/User/${id}`)
      .then(res => res.json());
  },

  deleteUser: async (id) => {
    return await fetch(`${API_URL}/api/User/${id}`, {
      method: 'DELETE'
    }).then(res => res.json());
  },

  uploadProfilePicture: async (formData) => {
    return await fetch(`${API_URL}/api/User/upload-profile-picture`, {
      method: 'PATCH',
      body: formData // must be FormData with correct headers automatically set
    }).then(res => res.json());
  },

  deleteProfilePicture: async () => {
    return await fetch(`${API_URL}/api/User/delete-profile-picture`, {
      method: 'DELETE'
    }).then(res => res.json());
  },

  changeProfilePicture: async (formData) => {
    return await fetch(`${API_URL}/api/User/change-profile-picture`, {
      method: 'PATCH',
      body: formData
    }).then(res => res.json());
  },

  getProfilePicture: async () => {
    return await fetch(`${API_URL}/api/User/profile-picture`)
      .then(res => res.blob()); // Assuming the image is returned as a blob
  },

  getProfile: async (token) => {
    if (!token) {
      throw new Error('No token found');
    }
  
    return await fetch(`${API_URL}/api/User/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Add Authorization header
      }
    })
    .then(res => res.json());
  },
};  
