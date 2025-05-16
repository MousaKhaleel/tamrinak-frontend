//TODO
const API_URL = process.env.API_URL || "https://localhost:7160";

// Helper function to handle responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
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

    // First check if the response is JSON
    const contentType = response.headers.get('content-type');
    let responseData;
    
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      const text = await response.text();
      throw new Error(text || `HTTP error! status: ${response.status}`);
    }

    if (!response.ok) {
      console.error('Backend error details:', responseData);
      throw new Error(
        responseData.message || 
        responseData.title || 
        `Request failed with status ${response.status}`
      );
    }

    return responseData;
  } catch (error) {
    console.error('Failed to create membership:', error);
    throw new Error(
      error.message || 
      'Network error - failed to reach the server'
    );
  }
};

// GET /api/Membership/user
export const getUserMemberships = async () => {
  const response = await fetch(`${API_URL}/api/Membership/user`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}` // If authentication is required
    }
  });
  return handleResponse(response);
};

// GET /api/Membership/{id}
export const getMembershipById = async (id) => {
  const response = await fetch(`${API_URL}/api/Membership/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}` // If authentication is required
    }
  });
  return handleResponse(response);
};

// DELETE /api/Membership/{id}
export const deleteMembership = async (id) => {
  const response = await fetch(`${API_URL}/api/Membership/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}` // If authentication is required
    }
  });
  return handleResponse(response);
};

// PUT /api/Membership/{id}/cancel
export const cancelMembership = async (id) => {
  const response = await fetch(`${API_URL}/api/Membership/${id}/cancel`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}` // If authentication is required
    }
  });
  return handleResponse(response);
};