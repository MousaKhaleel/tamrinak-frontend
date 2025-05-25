const API_URL = process.env.API_URL || "https://localhost:7160";

// Enhanced response handler to support both JSON and plain text
const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  let data;

  if (contentType?.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const message =
      typeof data === 'string' ? data : data.message || data.title || 'Request failed';
    throw new Error(message);
  }

  return data;
};

// POST /api/Membership/new
export const createMembership = async (addMembershipDto, token) => {
  try {
    const requestBody = {
      facilityId: Number(addMembershipDto.facilityId),
      offerId: addMembershipDto.offerId ? Number(addMembershipDto.offerId) : null
    };

    const response = await fetch(`${API_URL}/api/Membership/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to create membership:', error);
    throw new Error(error.message || 'Network error - failed to reach the server');
  }
};

// GET /api/Membership/user
export const getUserMemberships = async () => {
  const response = await fetch(`${API_URL}/api/Membership/user`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return await handleResponse(response);
};

// GET /api/Membership/{id}
export const getMembershipById = async (id) => {
  const response = await fetch(`${API_URL}/api/Membership/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return await handleResponse(response);
};

// DELETE /api/Membership/{id}
export const deleteMembership = async (id) => {
  const response = await fetch(`${API_URL}/api/Membership/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return await handleResponse(response);
};

// PUT /api/Membership/{id}/cancel
export const cancelMembership = async (id) => {
  const response = await fetch(`${API_URL}/api/Membership/${id}/cancel`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  return await handleResponse(response);
};
