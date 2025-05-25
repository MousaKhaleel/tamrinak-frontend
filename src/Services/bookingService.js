const API_URL = process.env.API_URL || "https://localhost:7160";

// Helper function to parse response as JSON or fallback to text message
const parseResponse = async (response) => {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
};

// Book a field
export const bookField = async (bookingData, token) => {
  const response = await fetch(`${API_URL}/api/Booking/book-field`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(bookingData),
  });

  const responseData = await parseResponse(response);

  if (!response.ok) {
    console.error("Booking error:", responseData);
    throw new Error(responseData.message || "Booking failed");
  }

  return responseData;
};

// Get a specific booking by ID
export const getBooking = async (bookingId) => {
  const response = await fetch(`${API_URL}/api/Booking/booking/${bookingId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
  });

  const responseData = await parseResponse(response);

  if (!response.ok) {
    throw new Error(responseData.message || "Fetching booking failed");
  }

  return responseData;
};

// Get all bookings for a user
export const getUserBookings = async (userId) => {
  const response = await fetch(`${API_URL}/api/Booking/user-bookings/${userId}`, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
  });

  const responseData = await parseResponse(response);

  if (!response.ok) {
    throw new Error(responseData.message || "Failed to fetch user bookings");
  }

  return responseData;
};

// Delete a booking
export const deleteBooking = async (bookingId) => {
  const response = await fetch(`${API_URL}/api/Booking/booking/${bookingId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });

  const responseData = await parseResponse(response);

  if (!response.ok) {
    throw new Error(responseData.message || "Deleting booking failed");
  }
};

// Cancel a booking
export const cancelBooking = async (bookingId) => {
  const response = await fetch(`${API_URL}/api/Booking/cancel-booking/${bookingId}`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });

  const responseData = await parseResponse(response);

  if (!response.ok) {
    throw new Error(responseData.message || "Canceling booking failed");
  }
};

// Mark a booking as paid
export const payForBooking = async (bookingId) => {
  const response = await fetch(`${API_URL}/api/Booking/${bookingId}/pay`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });

  const responseData = await parseResponse(response);

  if (!response.ok) {
    throw new Error(responseData.message || "Payment failed");
  }
};

// Change (update) booking info
export const changeBooking = async (bookingId, updatedData) => {
  const response = await fetch(`${API_URL}/api/Booking/booking/${bookingId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(updatedData),
  });

  const responseData = await parseResponse(response);

  if (!response.ok) {
    throw new Error(responseData.message || "Updating booking failed");
  }

  return responseData;
};

// Check availability
export const getAvailability = async (queryParams = "") => {
  const response = await fetch(`${API_URL}/api/Booking/availability${queryParams}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });

  const responseData = await parseResponse(response);

  if (!response.ok) {
    throw new Error(responseData.message || "Fetching availability failed");
  }

  return responseData;
};
