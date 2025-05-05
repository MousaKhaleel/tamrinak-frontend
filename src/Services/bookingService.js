const API_URL = process.env.API_URL || "https://localhost:7160";

// Book a field
export const bookField = async (bookingData) => {
  const response = await fetch(`${API_URL}/api/Booking/book-field`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Booking failed");
  }

  return await response.json();
};

// Get a specific booking by ID
export const getBooking = async (bookingId) => {
  const response = await fetch(`${API_URL}/api/Booking/get-booking/${bookingId}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Fetching booking failed");
  }

  return await response.json();
};

// Get all bookings for a user
export const getUserBookings = async (userId) => {
  const response = await fetch(`${API_URL}/api/Booking/user-bookings/${userId}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Fetching user bookings failed");
  }

  return await response.json();
};

// Delete a booking
export const deleteBooking = async (bookingId) => {
  const response = await fetch(`${API_URL}/api/Booking/delete-booking/${bookingId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Deleting booking failed");
  }
};

// Cancel a booking
export const cancelBooking = async (bookingId) => {
  const response = await fetch(`${API_URL}/api/Booking/cancel-booking/${bookingId}`, {
    method: "PATCH",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Canceling booking failed");
  }
};

// Mark a booking as paid
export const payForBooking = async (bookingId) => {
  const response = await fetch(`${API_URL}/api/Booking/${bookingId}/pay`, {
    method: "PATCH",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Payment failed");
  }
};

// Change (update) booking info
export const changeBooking = async (bookingId, updatedData) => {
  const response = await fetch(`${API_URL}/api/Booking/change-booking/${bookingId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Updating booking failed");
  }

  return await response.json();
};

// Check availability
export const getAvailability = async (queryParams = "") => {
  const response = await fetch(`${API_URL}/api/Booking/availability${queryParams}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Fetching availability failed");
  }

  return await response.json();
};
