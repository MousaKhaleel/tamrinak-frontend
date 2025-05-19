const API_URL = process.env.API_URL || "https://localhost:7160";

    export const addRole = async (userId, role) => {
      return await fetch(`${API_URL}/api/User/AddRole`, {
        method: 'PATCH',
    headers: { "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
     },
        body: JSON.stringify({ userId, role })
      }).then(res => res.json());
    }

    export const getUserRoles = async (userId) => {
      return await fetch(`${API_URL}/api/User/UserRoles`, {
        method: 'POST',
    headers: { "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
     },
        body: JSON.stringify({ userId })
      }).then(res => res.json());
    }

export const getUserRolesByEmail = async (email) => {
  return await fetch(`${API_URL}/api/User/UserRolesByEmail/${email}`, {
    method: 'GET',
    headers: { "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
     }
  }).then(res => res.json());
}

    export const getBasicInfoUserList = async () => {
      return await fetch(`${API_URL}/api/User/BasicInfoUserList`, {
        headers: { "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }).then(res => res.json());
    };