const API_URL = process.env.API_URL || "https://localhost:7160";

const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }

  return await response.text();
};

// Field Reviews
export const getFieldReviews = async (fieldId) => {
  const response = await fetch(`${API_URL}/api/review/field/${fieldId}`);
  if (!response.ok) throw new Error('Failed to fetch reviews');
  const reviews = await parseResponse(response);

  const averageRating = Array.isArray(reviews) && reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  return {
    reviews,
    averageRating,
    reviewCount: Array.isArray(reviews) ? reviews.length : 0
  };
};

// Facility Reviews
export const getFacilityReviews = async (facilityId) => {
  const response = await fetch(`${API_URL}/api/review/facility/${facilityId}`);
  if (!response.ok) throw new Error('Failed to fetch facility reviews');
  const reviews = await parseResponse(response);

  const averageRating = Array.isArray(reviews) && reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  return {
    reviews,
    averageRating,
    reviewCount: Array.isArray(reviews) ? reviews.length : 0
  };
};

// Single Review
export const getReview = async (reviewId) => {
  const response = await fetch(`${API_URL}/api/review/${reviewId}`);
  if (!response.ok) throw new Error('Failed to fetch review');
  return await parseResponse(response);
};

// Create Review
export const createReview = async (reviewData, token) => {
  const response = await fetch(`${API_URL}/api/review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(reviewData)
  });
  if (!response.ok) throw new Error('Failed to create review');
  return await parseResponse(response);
};

// Delete Review
export const deleteReview = async (reviewId, token) => {
  const response = await fetch(`${API_URL}/api/review/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error('Failed to delete review');
  return await parseResponse(response);
};

// My Reviews
export const getMyReviews = async (token) => {
  const response = await fetch(`${API_URL}/api/review/my-reviews`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error('Failed to fetch user reviews');
  return await parseResponse(response);
};

// Like Review
export const likeReview = async (reviewId, token) => {
  const response = await fetch(`${API_URL}/api/review/${reviewId}/like`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error('Failed to like review');
  return await parseResponse(response);
};

// Create Reply
export const createReviewReply = async (reviewId, comment, token) => {
  const response = await fetch(`${API_URL}/api/review/reply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ reviewId, comment })
  });
  if (!response.ok) throw new Error('Failed to create reply');
  return await parseResponse(response);
};

// Get Replies
export const getReviewReplies = async (reviewId) => {
  const response = await fetch(`${API_URL}/api/review/${reviewId}/replies`);
  if (!response.ok) throw new Error('Failed to fetch replies');
  return await parseResponse(response);
};

// Update Reply
export const updateReviewReply = async (replyId, replyData, token) => {
  const response = await fetch(`${API_URL}/api/review/reply/${replyId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(replyData)
  });
  if (!response.ok) throw new Error('Failed to update reply');
  return await parseResponse(response);
};

// Delete Reply
export const deleteReviewReply = async (replyId, token) => {
  const response = await fetch(`${API_URL}/api/review/reply/${replyId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error('Failed to delete reply');
  return await parseResponse(response);
};
