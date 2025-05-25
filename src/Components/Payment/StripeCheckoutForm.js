import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPayment as recordInternalPayment } from '../../Services/paymentService'; // Adjust path

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: 'Tajawal, "Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": { color: "#aab7c4" },
      direction: "rtl", // For RTL text input
    },
    invalid: { color: "#fa755a", iconColor: "#fa755a" },
  },
};

const StripeCheckoutForm = ({ clientSecret, bookingId, amountInSmallestUnit, currency, authToken, onSuccessfulPayment, onPaymentError, fieldName }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [stripeError, setStripeError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      console.log("Stripe.js has not yet loaded.");
      return;
    }
    setIsProcessing(true);
    setStripeError(null);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        // billing_details: { name: 'Customer Name' }, // Optional
      },
    });

    if (error) {
      console.error("Stripe payment error:", error);
      const userMessage = error.type === "card_error" || error.type === "validation_error"
        ? error.message
        : "حدث خطأ غير متوقع أثناء معالجة الدفع.";
      setStripeError(userMessage);
      if (onPaymentError) onPaymentError(userMessage);
      setIsProcessing(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log("Stripe Payment Succeeded:", paymentIntent);
      // Optionally: Record this successful payment in your backend's /api/payment table
      try {
        const paymentDetails = {
          bookingId: bookingId,
          amount: parseFloat((amountInSmallestUnit / 100).toFixed(2)), // Convert back for your DB
          method: 1, // 1 for Stripe (assuming Cash is 0)
          transactionId: paymentIntent.id, // Stripe PaymentIntent ID
        };
        await recordInternalPayment(paymentDetails, authToken);
        console.log("Internal payment record updated for Stripe transaction.");
      } catch (recordError) {
        console.error("Failed to record Stripe payment internally:", recordError);
        // This is a non-critical error for the user if Stripe itself succeeded, but log it.
      }
      if (onSuccessfulPayment) onSuccessfulPayment(paymentIntent);
    } else if (paymentIntent) {
      setStripeError(`حالة الدفع: ${paymentIntent.status}. يرجى المحاولة مرة أخرى.`);
      if (onPaymentError) onPaymentError(`حالة الدفع: ${paymentIntent.status}`);
    }
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} dir="rtl">
      <label htmlFor="card-element" style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px', fontSize: '1.1em' }}>
        إدخال بيانات البطاقة لـ {fieldName}
      </label>
      <div style={{ border: '1px solid #eee', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>
        <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} />
      </div>
      {stripeError && <div role="alert" style={{ color: 'red', marginTop: '10px', marginBottom: '10px', textAlign: 'center' }}>{stripeError}</div>}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="reserve-btn" // Use your existing button styling
        style={{ width: '100%' }}
      >
        {isProcessing ? "جاري المعالجة..." : `ادفع ${ (amountInSmallestUnit / 100).toFixed(2)} د.أ الآن`}
      </button>
    </form>
  );
};

export default StripeCheckoutForm; // If in a separate file