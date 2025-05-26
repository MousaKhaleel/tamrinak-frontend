import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js'; // Import Elements
import { loadStripe } from '@stripe/stripe-js'; // Import loadStripe
import { getFieldAvailability } from "../../Services/bookingService";

import {
  getField,
  getFieldPhotoList,
} from "../../Services/fieldService"; // Adjust path if needed
import {
  getFieldReviews,
  createReview,
  likeReview,
  createReviewReply,
  getReviewReplies
} from "../../Services/reviewService"; // Adjust path if needed
import { bookField } from "../../Services/bookingService"; // Adjust path if needed
import { createPayment, createStripePaymentIntent } from "../../Services/paymentService"; // Import createStripePaymentIntent

import './FieldDetails.css'; // Make sure your CSS path is correct
import { useAuth } from '../../Context/AuthContext';
import DefaultImage from "../../Assets/Defaults/default-featured-image.png";
import StarRating from "../Review/StarRating";
import ReviewList from "../Review/ReviewList";
import ReviewForm from "../Review/ReviewForm";
import { FaMapMarkerAlt, FaClock, FaPhone, FaMoneyBillWave, FaLightbulb, FaHome } from 'react-icons/fa';
import { GiTennisCourt } from 'react-icons/gi';
import StatusDialog from './../UI/StatusDialog/StatusDialog';
import StripeCheckoutForm from '../../Components/Payment/StripeCheckoutForm';

// Load Stripe.js outside of a component’s render to avoid recreating the Stripe object on every render.
// Replace "YOUR_STRIPE_PUBLISHABLE_KEY" with your actual Stripe Publishable Key
const stripePromise = loadStripe("YOUR_STRIPE_PUBLISHABLE_KEY");

function FieldDetails() {
  const { fieldId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [field, setField] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState({
    fieldId,
    bookingDate: "",
    startTime: "",
    endTime: "",
    numberOfPeople: 1,
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [showSlots, setShowSlots] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogError, setDialogError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // For disabling button during booking/payment initiation

  // Payment Method State
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Cash"); // Default to Cash
  const [clientSecret, setClientSecret] = useState(null); // To store Stripe client secret
  const [stripePaymentProcessing, setStripePaymentProcessing] = useState(false); // To manage Stripe payment loading state

  // Review states (existing)
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [viewingReplies, setViewingReplies] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getField(fieldId);
        setField(data);

        const photoList = await getFieldPhotoList(fieldId);
        const urls = photoList.map(photo => photo.imageData);
        setImages(urls);

        await loadReviews();
      } catch (err) {
        console.error(err);
        setError("فشل في جلب بيانات الملعب أو الصور.");
      } finally {
        setLoading(false);
      }
    };

    if (fieldId) fetchData();
    else navigate("/");
  }, [fieldId, navigate]);

  const loadReviews = async () => {
    setReviewLoading(true);
    setReviewError(null);
    try {
      const { reviews, averageRating, reviewCount } = await getFieldReviews(fieldId);
      setReviews(reviews);
      setAverageRating(averageRating || 0);
      setReviewCount(reviewCount || 0);
    } catch (err) {
      console.error(err);
      setReviewError("فشل في تحميل التقييمات");
    } finally {
      setReviewLoading(false);
    }
  };

  const handleCheckAvailability = async () => {
  console.log("🟡 Button clicked"); // ADD THIS LINE
  if (!bookingData.bookingDate) {
    setDialogMessage("يرجى اختيار التاريخ أولاً.");
    setDialogError(true);
    setDialogOpen(true);
    return;
  }

  try {
    console.log("📡 Sending request to backend...");
    setCheckingAvailability(true);
    const result = await getFieldAvailability(fieldId, bookingData.bookingDate);
    console.log("✅ Received slots:", result); // CHECK THIS
    setAvailableSlots(result || []);
    setShowSlots(true);
  } catch (err) {
    console.error("❌ Error fetching availability:", err);
    setDialogMessage("حدث خطأ أثناء جلب المواعيد المتاحة.");
    setDialogError(true);
    setDialogOpen(true);
  } finally {
    setCheckingAvailability(false);
  }
};


  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setClientSecret(null); // Clear any previous client secret when a new booking attempt starts

    const { bookingDate, startTime, endTime, numberOfPeople } = bookingData;

    if (!bookingDate || !startTime || !endTime) {
      setDialogMessage("يرجى تعبئة جميع حقول الحجز (التاريخ، وقت البداية، وقت النهاية).");
      setDialogError(true);
      setDialogOpen(true);
      setIsSubmitting(false);
      return;
    }

    if (endTime <= startTime) {
      setDialogMessage("وقت النهاية يجب أن يكون بعد وقت البداية.");
      setDialogError(true);
      setDialogOpen(true);
      setIsSubmitting(false);
      return;
    }

    if (!field || !field.pricePerHour || field.pricePerHour <= 0) {
      setDialogMessage("سعر الساعة للملعب غير محدد أو غير صالح. لا يمكن المتابعة بالدفع.");
      setDialogError(true);
      setDialogOpen(true);
      setIsSubmitting(false);
      return;
    }

    // Calculate duration and amount for payment
    let calculatedAmount = 0;
    try {
      const [startH, startM] = startTime.split(':').map(Number);
      const [endH, endM] = endTime.split(':').map(Number);
      const startDateObj = new Date(0, 0, 0, startH, startM, 0);
      const endDateObj = new Date(0, 0, 0, endH, endM, 0);
      const durationInMilliseconds = endDateObj - startDateObj;

      if (durationInMilliseconds <= 0) {
        throw new Error("مدة الحجز غير صالحة.");
      }
      const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
      calculatedAmount = durationInHours * field.pricePerHour;
      if (calculatedAmount <= 0) {
        throw new Error("قيمة الحجز يجب أن تكون أكبر من صفر.");
      }
    } catch (calcError) {
      setDialogMessage(`خطأ في حساب مدة أو قيمة الحجز: ${calcError.message}`);
      setDialogError(true);
      setDialogOpen(true);
      setIsSubmitting(false);
      return;
    }


    try {
      const transformedData = {
        fieldId: Number(fieldId),
        bookingDate: bookingDate,
        startTime: startTime + ":00", // Assuming backend expects HH:mm:ss
        endTime: endTime + ":00",      // Assuming backend expects HH:mm:ss
        numberOfPeople: Number(numberOfPeople),
      };

      // --- 1. Create Booking ---
      // IMPORTANT: Assume bookField returns { id: bookingId, ... } on success
      const bookingConfirmation = await bookField(transformedData, user.token);

      if (!bookingConfirmation || !bookingConfirmation.bookingId) {
        console.error("Booking response missing ID:", bookingConfirmation);
        setDialogMessage("تم الحجز ولكن لم يتم استلام معرف الحجز. يرجى مراجعة الإدارة.");
        setDialogError(true); // Or a warning
        setDialogOpen(true);
        // Reset form as booking *might* have been made on backend without confirmation
        setBookingData({ fieldId, bookingDate: "", startTime: "", endTime: "", numberOfPeople: 1 });
        setIsSubmitting(false);
        return;
      }
      const newBookingId = bookingConfirmation.bookingId;
      // Store the booking ID temporarily for Stripe payment if needed
      setBookingData(prev => ({ ...prev, bookingId: newBookingId }));

      const amountInSmallestUnit = Math.round(calculatedAmount * 100); // Stripe expects amount in cents/smallest unit

      // --- 2. Handle Payment ---
      if (selectedPaymentMethod === "Cash") {
        const paymentDetails = {
          bookingId: newBookingId,
          membershipId: null, // Or pass if available/relevant
          amount: parseFloat(calculatedAmount.toFixed(2)),
          method: 0, // 0 for Cash, as per C# enum (Cash, Stripe)
          transactionId: null,
        };
        try {
          await createPayment(paymentDetails, user.token);
          setDialogMessage("تم الحجز وتسجيل الدفع النقدي بنجاح!");
          setDialogError(false);
        } catch (paymentError) {
          console.error("Cash payment recording failed:", paymentError);
          setDialogMessage(
            `تم الحجز بنجاح، ولكن فشل تسجيل الدفع النقدي: ${paymentError.message}. يرجى إبلاغ الإدارة لتأكيد الدفع.`
          );
          setDialogError(true); // Indicate an issue with payment part
        }
        setDialogOpen(true);
        setBookingData({ // Reset form on successful booking submission path
          fieldId,
          bookingDate: "",
          startTime: "",
          endTime: "",
          numberOfPeople: 1,
        });

      } else if (selectedPaymentMethod === "Stripe") {
        setStripePaymentProcessing(true); // Indicate Stripe flow is starting
        try {
          const paymentRequest = {
            bookingId: newBookingId,
            membershipId: null, // or a valid ID if it's a membership
            amount: amountInSmallestUnit/10,
            currency: "jod"
          };
          //console.log(newBookingId+"")
          const paymentSessionResponse = await createStripePaymentIntent(paymentRequest, user.token);

          const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
          
          await stripe.redirectToCheckout({
             sessionId: paymentSessionResponse.sessionId,
          //setClientSecret(paymentIntentResponse.clientSecret);
          });
          // Do NOT show dialog here; the StripeCheckoutForm will handle its own UI feedback
          // The form will render and user will input card details.
        } catch (stripeIntentError) {
          console.error("Failed to create Stripe Payment Intent:", stripeIntentError);
          setDialogMessage(`فشل في تهيئة الدفع بالبطاقة: ${stripeIntentError.message || "خطأ غير معروف."}`);
          setDialogError(true);
          setDialogOpen(true);
          setStripePaymentProcessing(false);
        }
      } else {
        // Fallback if no specific payment method logic applies but booking was successful
        setDialogMessage("تم الحجز بنجاح!");
        setDialogError(false);
        setDialogOpen(true);
      }

      // Reset form if cash payment or if Stripe intent creation succeeded and form is now shown
      if (selectedPaymentMethod === "Cash" || (selectedPaymentMethod === "Stripe" && clientSecret)) {
        setBookingData({
          fieldId,
          bookingDate: "",
          startTime: "",
          endTime: "",
          numberOfPeople: 1,
        });
      }


    } catch (bookingError) { // Catches errors from bookField primarily
      setDialogMessage(bookingError.message || "فشل عملية الحجز.");
      setDialogError(true);
      setDialogOpen(true);
    } finally {
      setIsSubmitting(false); // Always reset submission state
    }
  };

  const handleStripePaymentSuccess = (paymentIntent) => {
    setDialogMessage("تم الدفع بنجاح!");
    setDialogError(false);
    setDialogOpen(true);
    setClientSecret(null); // Clear client secret after successful payment
    setStripePaymentProcessing(false);
    // Reset booking form data
    setBookingData({
      fieldId,
      bookingDate: "",
      startTime: "",
      endTime: "",
      numberOfPeople: 1,
    });
  };

  const handleStripePaymentError = (errorMessage) => {
    setDialogMessage(`فشل الدفع: ${errorMessage}`);
    setDialogError(true);
    setDialogOpen(true);
    setStripePaymentProcessing(false);
  };


  // Review handlers (handleSubmitReview, handleLikeReview, handleSubmitReply, handleViewReplies)
  const handleSubmitReview = async (reviewData) => {
    try {
      await createReview({
        facilityId: null,
        fieldId: Number(fieldId),
        rating: reviewData.rating,
        comment: reviewData.comment
      }, user.token);
      await loadReviews();
      setShowReviewForm(false);
    } catch (error) {
      setReviewError(error.message || "فشل في إضافة التقييم");
    }
  };

  const handleLikeReview = async (reviewId) => {
    try {
      await likeReview(reviewId, user.token);
      await loadReviews();
    } catch (error) {
      setReviewError(error.message || "فشل في تسجيل الإعجاب");
    }
  };

  const handleSubmitReply = async (reviewId, replyText) => {
    try {
      await createReviewReply(reviewId, replyText, user.token);
      await loadReviews(); // Reload reviews to show the new reply
      setReplyingTo(null);
    } catch (error) {
      setReviewError(error.message || "فشل في إضافة الرد");
    }
  };

  const handleViewReplies = async (reviewId) => {
    if (viewingReplies === reviewId) {
      setViewingReplies(null); // Hide replies if already viewing
      // Optionally, reset replies in state to collapse them visually
      setReviews(currentReviews => currentReviews.map(r => r.id === reviewId ? { ...r, replies: undefined } : r));

    } else {
      try {
        const replies = await getReviewReplies(reviewId);
        setReviews(currentReviews => currentReviews.map(review =>
          review.id === reviewId ? { ...review, replies: replies || [] } : review
        ));
        setViewingReplies(reviewId);
      } catch (error) {
        setReviewError(error.message || "فشل في تحميل الردود");
      }
    }
  };


  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>جاري التحميل...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>{error}</div>;
  if (!field) return <div style={{ textAlign: 'center', padding: '2rem' }}>الملعب غير موجود.</div>;

  // Calculate amount for display and Stripe form if a time range is selected
  let currentBookingAmount = 0;
  if (bookingData.startTime && bookingData.endTime && field && field.pricePerHour) {
    try {
      const [startH, startM] = bookingData.startTime.split(':').map(Number);
      const [endH, endM] = bookingData.endTime.split(':').map(Number);
      const startDateObj = new Date(0, 0, 0, startH, startM, 0);
      const endDateObj = new Date(0, 0, 0, endH, endM, 0);
      const durationInMilliseconds = endDateObj - startDateObj;
      if (durationInMilliseconds > 0) {
        const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
        currentBookingAmount = (durationInHours * field.pricePerHour).toFixed(2);
      }
    } catch (e) {
      // Ignore calculation errors for display purposes, will be caught on submit
      currentBookingAmount = 0;
    }
  }

  return (
    <Elements stripe={stripePromise}> {/* Wrap your component with Elements */}
      <div dir="rtl" style={{ fontFamily: 'Tajawal, sans-serif', padding: '2rem' }}>
        <header><h1>{field.name}</h1></header>

        <div className="main-container">
          <div className="slider-container">
            {images.length > 0 ? (
              images.map((url, idx) => (
                <img key={idx} src={url} alt={`${field.name} ${idx + 1}`} className="slider-image" />
              ))
            ) : (
              <img src={DefaultImage} alt={field.name} className="slider-image" />
            )}
          </div>

          {/* <div className="map-container">
            <iframe
              src={field.locationMap}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="خريطة الموقع"
            />
          </div> */}

          <div className="details">
            {/* ... (existing field details sections) ... */}
            <div className="detail-section"><strong><GiTennisCourt /> الرياضة:</strong> <p>{field.sport?.name || 'غير محدد'}</p></div>
            <div className="detail-section"><strong><FaMapMarkerAlt/> العنوان:</strong> <p>{field.locationDesc}</p></div>
            {/* <div className="detail-section"><strong><FaMapMarkerAlt/> الموقع على الخريطة:</strong> <p>{field.locationMap || 'غير متوفر'}</p></div> */}
            <div className="detail-section"><strong><FaMoneyBillWave /> السعر لكل ساعة:</strong> <p>{field.pricePerHour ? `${field.pricePerHour} د.أ` : "اتصل للاستعلام"}</p></div>
            <div className="detail-section"><strong><FaPhone/> رقم التواصل:</strong> <p>{field.phoneNumber}</p></div>
            <div className="detail-section"><strong>سعة الملعب:</strong> <p>{field.capacity} أشخاص</p></div>
            <div className="detail-section"><strong><FaClock /> أوقات العمل:</strong> <p>{field.openTime} - {field.closeTime}</p></div>
            <div className="detail-section"><strong>الإضاءة:</strong> <p><FaLightbulb style={{ color: field.hasLighting ? '#ffc107' : '#6c757d' }} /> {field.hasLighting ? 'متوفرة' : 'غير متوفرة'}</p></div>
            <div className="detail-section"><strong>النوع:</strong> <p><FaHome style={{ marginLeft: '5px' }} /> {field.isIndoor ? 'داخلي' : 'خارجي'}</p></div>
            <div className="detail-section"><strong>الحالة:</strong> <p>{field.isAvailable ? 'متاح للحجز' : 'غير متاح للحجز حالياً'}</p></div>
            <div className="rating-summary"><StarRating rating={averageRating} /> <span>{reviewCount > 0 ? `${averageRating.toFixed(1)} من 5 (${reviewCount} تقييمات)` : "لا توجد تقييمات بعد"}</span></div>
            

            {field.isAvailable && (
              <>
                <h3 style={{ marginTop: '2rem' }}>احجز هذا الملعب</h3>
                <StatusDialog
                  open={dialogOpen}
                  onClose={() => setDialogOpen(false)}
                  title={dialogError ? "خطأ" : "نجاح"}
                  message={dialogMessage}
                  isError={dialogError}
                />
        
                <form className="booking-form" onSubmit={handleBookingSubmit}>
                  <div className="form-group">
                    <label htmlFor="bookingDate">التاريخ:</label>
                    <input type="date" id="bookingDate" name="bookingDate" value={bookingData.bookingDate} onChange={handleBookingChange} required />
                  </div>
                          <div className="form-group">
        <button type="button" className="btn btn-info" onClick={handleCheckAvailability} disabled={!bookingData.bookingDate || checkingAvailability}>
          {checkingAvailability ? "جارٍ التحميل..." : "عرض المواعيد المتاحة"}
        </button>
        
      </div>
      {showSlots && availableSlots.length > 0 && (
      <div className="available-slots-box">
        <h4>الأوقات المتاحة في {bookingData.bookingDate}:</h4>
        <ul>
         {availableSlots.map((slot, index) => {
  const formatTime = (timeStr) => {
    const [hour, minute] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);

    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <li key={index}>
      من <strong>{formatTime(slot.startTime)}</strong> إلى <strong>{formatTime(slot.endTime)}</strong>
    </li>
  );
})}

        </ul>
      </div>
    )}
                  <div className="form-group">
                    <label htmlFor="startTime">الوقت من:</label>
                    <input type="time" id="startTime" name="startTime" value={bookingData.startTime} onChange={handleBookingChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="endTime">إلى:</label>
                    <input type="time" id="endTime" name="endTime" value={bookingData.endTime} onChange={handleBookingChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="numberOfPeople">عدد الأشخاص:</label>
                    <input type="number" id="numberOfPeople" name="numberOfPeople" min="1" max={field.capacity || 25} value={bookingData.numberOfPeople} onChange={handleBookingChange} required />
                  </div>

                  {/* Payment Method Selection */}
                  <div className="form-group">
                    <label>طريقة الدفع:</label>
                    <div style={{ display: 'flex', gap: '15px', marginTop: '5px' }}>
                      <label htmlFor="paymentCash" style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                          type="radio"
                          id="paymentCash"
                          name="paymentMethod"
                          value="Cash"
                          checked={selectedPaymentMethod === "Cash"}
                          onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                          style={{ marginRight: '5px' }}
                        />
                        نقداً
                      </label>
                      <label htmlFor="paymentStripe" style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                          type="radio"
                          id="paymentStripe"
                          name="paymentMethod"
                          value="Stripe"
                          checked={selectedPaymentMethod === "Stripe"}
                          onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                          style={{ marginRight: '5px' }}
                        />
                        بطاقة ائتمانية
                      </label>
                    </div>
                  </div>

                  {/* Show the submit button if Cash is selected or if Stripe flow hasn't started */}
                  {selectedPaymentMethod === "Cash" && (
                    <button className="reserve-btn" type="submit" disabled={isSubmitting || !user}>
                      {isSubmitting ? 'جاري الحجز...' : (user ? `احجز الآن (${currentBookingAmount} د.أ)` : 'يرجى تسجيل الدخول للحجز')}
                    </button>
                  )}
                  {/* Show a "Continue to Payment" button for Stripe if not yet processing */}
                  {selectedPaymentMethod === "Stripe" && !clientSecret && !isSubmitting && (
                    <button className="reserve-btn" type="submit" disabled={!user}>
                      {user ? `المتابعة للدفع (${currentBookingAmount} د.أ)` : 'يرجى تسجيل الدخول للحجز'}
                    </button>
                  )}
                  {!user && <p style={{ color: 'red', marginTop: '10px' }}>يجب تسجيل الدخول لتتمكن من الحجز.</p>}
                </form>

                {/* Stripe Payment Form */}
                {selectedPaymentMethod === "Stripe" && clientSecret && (
                  <div style={{ marginTop: '2rem' }}>
                    <StripeCheckoutForm
                      clientSecret={clientSecret}
                      bookingId={bookingData.bookingId} // Ensure bookingId is available from state
                      amountInSmallestUnit={Math.round(currentBookingAmount * 100)} // Pass calculated amount to Stripe form
                      currency="jod" // Ensure this matches your backend's currency
                      authToken={user.token}
                      onSuccessfulPayment={handleStripePaymentSuccess}
                      onPaymentError={handleStripePaymentError}
                      fieldName={field.name}
                    />
                  </div>
                )}
                {selectedPaymentMethod === "Stripe" && isSubmitting && !clientSecret && (
                  <div style={{ textAlign: 'center', marginTop: '20px', color: '#555' }}>
                    جاري تجهيز بيانات الدفع...
                  </div>
                )}
              </>
            )}
            {!field.isAvailable && (
              <div className="alert alert-warning" style={{ marginTop: '2rem' }}>
                هذا الملعب غير متاح للحجز حالياً
              </div>
            )}
          </div>

        </div>
          

    {showSlots && availableSlots.length === 0 && (
      <p style={{ color: "red", marginTop: "10px" }}>لا توجد أوقات متاحة في هذا اليوم.</p>
    )}

        {/* Reviews Section */}
        <section className="reviews-section" style={{ marginTop: '3rem' }}>
          <div className="reviews-header">
            <h2>تقييمات الملعب</h2>
            {user && (
              <button onClick={() => setShowReviewForm(!showReviewForm)} className="btn btn-primary">
                {showReviewForm ? 'إلغاء' : 'أضف تقييمك'}
              </button>
            )}
          </div>
          {reviewError && <div className="alert alert-danger">{reviewError}</div>}
          {showReviewForm && <ReviewForm onSubmit={handleSubmitReview} onCancel={() => setShowReviewForm(false)} />}
          {reviewLoading ? (
            <div>جاري تحميل التقييمات...</div>
          ) : (
            <ReviewList
              reviews={reviews}
              onLike={handleLikeReview}
              onReply={handleSubmitReply}
              onViewReplies={handleViewReplies}
              viewingReplies={viewingReplies}
              currentUserId={user?.id} // Ensure user object might be null initially
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
            />
          )}
        </section>
      
      </div>
    </Elements> // Close Elements provider
  );
}

export default FieldDetails;