const API_URL = process.env.API_URL || "https://localhost:7160";

const adminService = {
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
};