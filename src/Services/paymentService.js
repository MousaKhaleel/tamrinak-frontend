//TODO
const API_URL = process.env.REACT_APP_API_URL || "https://localhost:7160"; // It's common to use REACT_APP_ prefix for env vars in React

export const createPayment = async (paymentData, authToken) => {
  try {
    const response = await fetch(`${API_URL}/api/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`, // Use the authToken parameter
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to create payment:", error);
    throw error; // Re-throw to be caught by the caller
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
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to create Stripe PaymentIntent:", error);
    throw error;
  }
};