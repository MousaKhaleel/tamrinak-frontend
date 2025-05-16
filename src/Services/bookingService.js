const API_URL = process.env.API_URL || "https://localhost:7160";

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

  let responseData;
  const text = await response.text();

  try {
    responseData = JSON.parse(text);
  } catch {
    responseData = { message: text }; // fallback for non-JSON errors
  }

  if (!response.ok) {
    console.error("Booking error:", responseData);
    throw new Error(responseData.message || "Booking failed");
  }

  return responseData;
};


// Get a specific booking by ID
export const getBooking = async (bookingId) => {
  const response = await fetch(`${API_URL}/api/Booking/booking/${bookingId}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Fetching booking failed");
  }

  return await response.json();
};

// Get all bookings for a user
export const getUserBookings = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/api/Booking/user-bookings/${userId}`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch user bookings");
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    throw error; // Re-throw to allow calling code to handle it
  }
};

// Delete a booking
export const deleteBooking = async (bookingId) => {
  const response = await fetch(`${API_URL}/api/Booking/booking/${bookingId}`, {
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
  const response = await fetch(`${API_URL}/api/Booking/booking/${bookingId}`, {
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
