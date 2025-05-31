const API_URL = process.env.API_URL || "https://localhost:7160";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`
});

const handleResponse = async (res) => {
  if (!res.ok) {
    const contentType = res.headers.get("content-type");
    let errorMessage = `Request failed with status ${res.status}`;
    if (contentType && contentType.includes("application/json")) {
      const errorData = await res.json();
      errorMessage = errorData.message || JSON.stringify(errorData);
    } else {
      errorMessage = await res.text();
    }
    throw new Error(errorMessage);
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    return res.text();
  }
};

// User related endpoints
export const getUsers = async () => {
  return await fetch(`${API_URL}/api/admin/users`, {
    headers: getAuthHeaders()
  }).then(handleResponse);
};

export const getAdminUserById = async (id) => {
  return await fetch(`${API_URL}/api/admin/users/${id}`, {
    headers: getAuthHeaders()
  }).then(handleResponse);
};

export const addRole = async (userId, role) => {
  return await fetch(`${API_URL}/api/admin/users/${userId}/add-role`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ role })
  }).then(handleResponse);
};

export const removeRole = async (userId, role) => {
  return await fetch(`${API_URL}/api/admin/users/${userId}/remove-role`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ role })
  }).then(handleResponse);
};

export const getUserBookings = async (id) => {
  return await fetch(`${API_URL}/api/admin/users/${id}/bookings`, {
    headers: getAuthHeaders()
  }).then(handleResponse);
};

export const getUserMemberships = async (id) => {
  return await fetch(`${API_URL}/api/admin/users/${id}/memberships`, {
    headers: getAuthHeaders()
  }).then(handleResponse);
};

export const getUserPayments = async (id) => {
  return await fetch(`${API_URL}/api/admin/users/${id}/payments`, {
    headers: getAuthHeaders()
  }).then(handleResponse);
};

export const getUserReviews = async (userId) => {
  return await fetch(`${API_URL}/api/admin/users/${userId}/reviews`, {
    headers: getAuthHeaders()
  }).then(handleResponse);
};

// Venue Requests
export const getVenueRequests = async () => {
  return await fetch(`${API_URL}/api/admin/venue-requests`, {
    headers: getAuthHeaders()
  }).then(handleResponse);
};

export const approveVenueRequest = async (userId) => {
  return await fetch(`${API_URL}/api/admin/venue-requests/${userId}/approve`, {
    method: 'POST',
    headers: getAuthHeaders()
  }).then(handleResponse);
};

export const rejectVenueRequest = async (userId) => {
  return await fetch(`${API_URL}/api/admin/venue-requests/${userId}/reject`, {
    method: 'POST',
    headers: getAuthHeaders()
  }).then(handleResponse);
};

// Stats
export const getFieldBookingStats = async (fieldId) => {
  return await fetch(`${API_URL}/api/admin/fields/${fieldId}/bookings/stats`, {
    headers: getAuthHeaders()
  }).then(handleResponse);
};

export const getFacilityMembershipStats = async (facilityId) => {
  return await fetch(`${API_URL}/api/admin/facilities/${facilityId}/memberships/stats`, {
    headers: getAuthHeaders()
  }).then(handleResponse);
};

// Venue Managers
export const getVenueManagers = async () => {
  return await fetch(`${API_URL}/api/admin/venue-managers`, {
    headers: getAuthHeaders()
  }).then(handleResponse);
};

// Reviews
export const getReviews = async () => {
  return await fetch(`${API_URL}/api/admin/reviews`, {
    headers: getAuthHeaders()
  }).then(handleResponse);
};

export const getReviewById = async (id) => {
  return await fetch(`${API_URL}/api/admin/reviews/${id}`, {
    headers: getAuthHeaders()
  }).then(handleResponse);
};

export const deleteReview = async (id) => {
  return await fetch(`${API_URL}/api/admin/reviews/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  }).then(handleResponse);
};

export const verifyReview = async (id) => {
  return await fetch(`${API_URL}/api/admin/reviews/${id}/verify`, {
    method: 'PATCH',
    headers: getAuthHeaders()
  }).then(handleResponse);
};

export const getReviewReplies = async (id) => {
  return await fetch(`${API_URL}/api/admin/reviews/${id}/replies`, {
    headers: getAuthHeaders()
  }).then(handleResponse);
};

export const resetReviewLikes = async (id) => {
  return await fetch(`${API_URL}/api/admin/reviews/${id}/reset-likes`, {
    method: 'PATCH',
    headers: getAuthHeaders()
  }).then(handleResponse);
};

export const lockReview = async (id) => {
  return await fetch(`${API_URL}/api/admin/reviews/${id}/lock`, {
    method: 'PATCH',
    headers: getAuthHeaders()
  }).then(handleResponse);
};

export const unlockReview = async (id) => {
  return await fetch(`${API_URL}/api/admin/reviews/${id}/unlock`, {
    method: 'PATCH',
    headers: getAuthHeaders()
  }).then(handleResponse);
};

export const bulkVerifyReviews = async (reviewIds) => {
  return await fetch(`${API_URL}/api/admin/reviews/bulk-verify`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ reviewIds })
  }).then(handleResponse);
};

// Payments
export const getPayments = async () => {
  return await fetch(`${API_URL}/api/admin/payments`, {
    headers: getAuthHeaders()
  }).then(handleResponse);
};

export const getPaymentById = async (id) => {
  return await fetch(`${API_URL}/api/admin/payments/${id}`, {
    headers: getAuthHeaders()
  }).then(handleResponse);
};

export const confirmPayment = async (id) => {
  return await fetch(`${API_URL}/api/admin/payments/${id}/confirm`, {
    method: 'PATCH',
    headers: getAuthHeaders()
  }).then(handleResponse);
};

export const refundPayment = async (id) => {
  return await fetch(`${API_URL}/api/admin/payments/${id}/refund`, {
    method: 'PATCH',
    headers: getAuthHeaders()
  }).then(handleResponse);
};

// Original functions
export const getUserRoles = async (userId) => {
  return await fetch(`${API_URL}/api/User/UserRoles`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ userId })
  }).then(handleResponse);
};

export const getUserRolesByEmail = async (email) => {
  return await fetch(`${API_URL}/api/User/UserRolesByEmail/${email}`, {
    method: 'GET',
    headers: getAuthHeaders()
  }).then(handleResponse);
};

export const getBasicInfoUserList = async () => {
  return await fetch(`${API_URL}/api/User/BasicInfoUserList`, {
    headers: getAuthHeaders()
  }).then(handleResponse);
};

export const contactUs = async (name, email, message) => {
  return await fetch(`${API_URL}/api/admin/contact`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ name, email, message })
  }).then(handleResponse);
};
