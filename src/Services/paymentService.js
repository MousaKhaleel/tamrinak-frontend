const API_URL = process.env.REACT_APP_API_URL || "https://localhost:7160";

const parseResponse = async (response) => {
  const contentType = response.headers.get("Content-Type");

  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  } else {
    return await response.text();
  }
};

export const createPayment = async (paymentData, authToken) => {
  try {
    const response = await fetch(`${API_URL}/api/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
      body: JSON.stringify(paymentData),
    });

    const result = await parseResponse(response);

    if (!response.ok) {
      const message = typeof result === "string" ? result : result.message || response.statusText;
      throw new Error(message);
    }

    return result;
  } catch (error) {
    console.error("Failed to create payment:", error);
    throw error;
  }
};

export const createStripePaymentIntent = async (paymentIntentRequest, authToken) => {
  try {
    const response = await fetch(`${API_URL}/api/payment/stripe/create-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
      body: JSON.stringify(paymentIntentRequest),
    });

    const result = await parseResponse(response);

    if (!response.ok) {
      const message = typeof result === "string" ? result : result.message || response.statusText;
      throw new Error(message);
    }

    return result;
  } catch (error) {
    console.error("Failed to create Stripe PaymentIntent:", error);
    throw error;
  }
};
