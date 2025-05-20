const API_URL = process.env.API_URL || "https://localhost:7160";

// Field Reviews
export const getFieldReviews = async (fieldId) => {
  const response = await fetch(`${API_URL}/api/review/field/${fieldId}`);
  if (!response.ok) throw new Error('Failed to fetch reviews');
  const reviews = await response.json();
  
  // Calculate average if not provided by backend
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;
  
  return {
    reviews,
    averageRating,
    reviewCount: reviews.length
  };
};

// Facility Reviews
export const getFacilityReviews = async (facilityId) => {
  const response = await fetch(`${API_URL}/api/review/facility/${facilityId}`);
  if (!response.ok) throw new Error('Failed to fetch facility reviews');
  const reviews = await response.json();
  
  // Calculate average if not provided by backend
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;
  
  return {
    reviews,
    averageRating,
    reviewCount: reviews.length
  };
};

// Single Review Operations
export const getReview = async (reviewId) => {
  const response = await fetch(`${API_URL}/api/review/${reviewId}`);
  if (!response.ok) throw new Error('Failed to fetch review');
  return await response.json();
};

export const createReview = async (reviewData, token) => {
  const response = await fetch(`${API_URL}/api/review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      facilityId: reviewData.facilityId,
      rating: reviewData.rating,
      comment: reviewData.comment
    })
  });
  if (!response.ok) throw new Error('Failed to create review');
  return await response.json();
};

export const deleteReview = async (reviewId, token) => {
  const response = await fetch(`${API_URL}/api/review/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error('Failed to delete review');
  return await response.json();
};

// User Reviews
export const getMyReviews = async (token) => {
  const response = await fetch(`${API_URL}/api/review/my-reviews`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error('Failed to fetch user reviews');
  return await response.json();
};

// Review Likes
export const likeReview = async (reviewId, token) => {
  const response = await fetch(`${API_URL}/api/review/${reviewId}/like`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error('Failed to like review');
  return await response.json();
};

// Review Replies
export const createReviewReply = async (reviewId, comment, token) => {
  const response = await fetch(`${API_URL}/api/review/reply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      reviewId,
      comment
    })
  });
  if (!response.ok) throw new Error('Failed to create reply');
  return await response.json();
};

export const getReviewReplies = async (reviewId) => {
  const response = await fetch(`${API_URL}/api/review/${reviewId}/replies`);
  if (!response.ok) throw new Error('Failed to fetch replies');
  return await response.json();
};

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
  return await response.json();
};

export const deleteReviewReply = async (replyId, token) => {
  const response = await fetch(`${API_URL}/api/review/reply/${replyId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error('Failed to delete reply');
  return await response.json();
};