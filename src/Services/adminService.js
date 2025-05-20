const API_URL = process.env.API_URL || "https://localhost:7160";

// User related endpoints
export const getUsers = async () => {
    return await fetch(`${API_URL}/api/admin/users`, {
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }).then(res => {
        if (!res.ok) {
            throw new Error('Failed to fetch users');
        }
        return res.json();
    });
};

export const getAdminUserById = async (id) => {
  return await fetch(`${API_URL}/api/admin/users/${id}`, {
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

export const addRole = async (userId, role) => {
  return await fetch(`${API_URL}/api/admin/users/${userId}/add-role`, {
    method: 'POST',
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({ role })
  }).then(res => res.json());
};

export const removeRole = async (userId, role) => {
  return await fetch(`${API_URL}/api/admin/users/${userId}/remove-role`, {
    method: 'POST',
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({ role })
  }).then(res => res.json());
};

export const getUserBookings = async (id) => {
  return await fetch(`${API_URL}/api/admin/users/${id}/bookings`, {
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

export const getUserMemberships = async (id) => {
  return await fetch(`${API_URL}/api/admin/users/${id}/memberships`, {
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

export const getUserPayments = async (id) => {
  return await fetch(`${API_URL}/api/admin/users/${id}/payments`, {
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

export const getUserReviews = async (userId) => {
  return await fetch(`${API_URL}/api/admin/users/${userId}/reviews`, {
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

// Venue Requests
export const getVenueRequests = async () => {
  return await fetch(`${API_URL}/api/admin/venue-requests`, {
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

export const approveVenueRequest = async (userId) => {
  return await fetch(`${API_URL}/api/admin/venue-requests/${userId}/approve`, {
    method: 'POST',
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

export const rejectVenueRequest = async (userId) => {
  return await fetch(`${API_URL}/api/admin/venue-requests/${userId}/reject`, {
    method: 'POST',
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

// Stats
export const getFieldBookingStats = async (fieldId) => {
  return await fetch(`${API_URL}/api/admin/fields/${fieldId}/bookings/stats`, {
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

export const getFacilityMembershipStats = async (facilityId) => {
  return await fetch(`${API_URL}/api/admin/facilities/${facilityId}/memberships/stats`, {
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

// Venue Managers
export const getVenueManagers = async () => {
  return await fetch(`${API_URL}/api/admin/venue-managers`, {
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

// Reviews
export const getReviews = async () => {
  return await fetch(`${API_URL}/api/admin/reviews`, {
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

export const getReviewById = async (id) => {
  return await fetch(`${API_URL}/api/admin/reviews/${id}`, {
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

export const deleteReview = async (id) => {
  return await fetch(`${API_URL}/api/admin/reviews/${id}`, {
    method: 'DELETE',
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

export const verifyReview = async (id) => {
  return await fetch(`${API_URL}/api/admin/reviews/${id}/verify`, {
    method: 'PATCH',
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

export const getReviewReplies = async (id) => {
  return await fetch(`${API_URL}/api/admin/reviews/${id}/replies`, {
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

export const resetReviewLikes = async (id) => {
  return await fetch(`${API_URL}/api/admin/reviews/${id}/reset-likes`, {
    method: 'PATCH',
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

export const lockReview = async (id) => {
  return await fetch(`${API_URL}/api/admin/reviews/${id}/lock`, {
    method: 'PATCH',
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

export const unlockReview = async (id) => {
  return await fetch(`${API_URL}/api/admin/reviews/${id}/unlock`, {
    method: 'PATCH',
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

export const bulkVerifyReviews = async (reviewIds) => {
  return await fetch(`${API_URL}/api/admin/reviews/bulk-verify`, {
    method: 'PATCH',
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({ reviewIds })
  }).then(res => res.json());
};

// Payments
export const getPayments = async () => {
  return await fetch(`${API_URL}/api/admin/payments`, {
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

export const getPaymentById = async (id) => {
  return await fetch(`${API_URL}/api/admin/payments/${id}`, {
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

export const confirmPayment = async (id) => {
  return await fetch(`${API_URL}/api/admin/payments/${id}/confirm`, {
    method: 'PATCH',
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

export const refundPayment = async (id) => {
  return await fetch(`${API_URL}/api/admin/payments/${id}/refund`, {
    method: 'PATCH',
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

// Original functions (kept for backward compatibility)
export const getUserRoles = async (userId) => {
  return await fetch(`${API_URL}/api/User/UserRoles`, {
    method: 'POST',
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({ userId })
  }).then(res => res.json());
};

export const getUserRolesByEmail = async (email) => {
  return await fetch(`${API_URL}/api/User/UserRolesByEmail/${email}`, {
    method: 'GET',
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};

export const getBasicInfoUserList = async () => {
  return await fetch(`${API_URL}/api/User/BasicInfoUserList`, {
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  }).then(res => res.json());
};