const API_URL = process.env.REACT_APP_API_URL || "https://localhost:7160";

const parseResponse = async (response) => {
  const contentType = response.headers.get("Content-Type");

  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  } else {
    return await response.text();
  }
};

export const addOffer = async (facilityId, durationInMonths, price) => {
  try {
    const response = await fetch(`${API_URL}/api/membership-offer/add-offer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        facilityId,
        durationInMonths,
        price,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await parseResponse(response);
  } catch (error) {
    console.error("Error adding offer:", error);
    throw error;
  }
};

export const getOffersByFacilityId = async (facilityId) => {
  try {
    const response = await fetch(
      `${API_URL}/api/membership-offer/get/${facilityId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await parseResponse(response);
  } catch (error) {
    console.error("Error fetching offers:", error);
    throw error;
  }
};

export const removeOffer = async (offerId) => {
  try {
    const response = await fetch(
      `${API_URL}/api/membership-offer/remove/${offerId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await parseResponse(response);
  } catch (error) {
    console.error("Error removing offer:", error);
    throw error;
  }
};

export const updateOffer = async (offerId, durationInMonths, price) => {
  try {
    const response = await fetch(
      `${API_URL}/api/membership-offer/update/${offerId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          durationInMonths,
          price,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await parseResponse(response);
  } catch (error) {
    console.error("Error updating offer:", error);
    throw error;
  }
};