import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { getFacility, getFacilityPhotoList } from "../../Services/facilityService";
import { createMembership } from "../../Services/membershipService";
import { createPayment, createStripePaymentIntent } from "../../Services/paymentService";
import './FacilityDetails.css'
import {
  getFacilityReviews,
  createReview,
  likeReview,
  createReviewReply,
  getReviewReplies
} from "../../Services/reviewService";
import { useAuth } from '../../Context/AuthContext';
import DefaultImage from "../../Assets/Defaults/default-featured-image.png";
import StarRating from "../Review/StarRating";
import ReviewList from "../Review/ReviewList";
import ReviewForm from "../Review/ReviewForm";
import { FaMapMarkerAlt, FaClock, FaPhone, FaMoneyBillWave } from 'react-icons/fa';
import StatusDialog from './../UI/StatusDialog/StatusDialog';
import StripeCheckoutForm from '../../Components/Payment/StripeCheckoutForm';

// Load Stripe.js
const stripePromise = loadStripe("pk_test_51RPR6zEPJ1mDrKAI475vu7BCG5kWllIQ0RuXMlSgASoAmDBMizJMnLwsZ3qfPZANbVQrNqfkJq0rUqvp80S8yv4i00kiBXJz7o");

function FacilityDetails() {
  const { facilityId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [facility, setFacility] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [membershipData, setMembershipData] = useState({
    facilityId,
  });

  // Payment state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Cash");
  const [clientSecret, setClientSecret] = useState(null);
  const [stripePaymentProcessing, setStripePaymentProcessing] = useState(false);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogError, setDialogError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Review states
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
        const data = await getFacility(facilityId);
        setFacility(data);

        const photoList = await getFacilityPhotoList(facilityId);
        const urls = photoList.map(photo => photo.imageData);
        setImages(urls);

        // Load reviews
        await loadReviews();
      } catch (err) {
        console.error(err);
        setError("فشل في جلب بيانات المرفق أو الصور.");
      } finally {
        setLoading(false);
      }
    };

    if (facilityId) fetchData();
    else navigate("/");
  }, [facilityId, navigate]);

  const loadReviews = async () => {
    setReviewLoading(true);
    setReviewError(null);
    try {
      const { reviews, averageRating, reviewCount } = await getFacilityReviews(facilityId);
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

  const handleMembershipSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setClientSecret(null);

    if (!facility || !facility.pricePerMonth || facility.pricePerMonth <= 0) {
      setDialogMessage("سعر الاشتراك الشهري غير محدد أو غير صالح. لا يمكن المتابعة بالدفع.");
      setDialogError(true);
      setDialogOpen(true);
      setIsSubmitting(false);
      return;
    }

    try {
      const addMembershipDto = {
        facilityId: facilityId,
        offerId: null,
      };

      const membershipResult = await createMembership(addMembershipDto, user.token);

      if (!membershipResult || !membershipResult.membershipId) {
        console.error("Membership response missing ID:", membershipResult);
        setDialogMessage("حدث خطأ أثناء إنشاء الاشتراك. يرجى مراجعة الإدارة.");
        setDialogError(true);
        setDialogOpen(true);
        setIsSubmitting(false);
        return;
      }

      const newMembershipId = membershipResult.membershipId;

      if (selectedPaymentMethod === "Cash") {
        const paymentDetails = {
          membershipId: newMembershipId,
          bookingId: null,
          amount: parseFloat(facility.pricePerMonth.toFixed(2)),
          method: 0,
          transactionId: null,
        };

        try {
          await createPayment(paymentDetails, user.token);
          setDialogMessage("تم إنشاء الاشتراك وتسجيل الدفع النقدي بنجاح!");
          setDialogError(false);
        } catch (paymentError) {
          console.error("Cash payment recording failed:", paymentError);
          setDialogMessage(
            `تم إنشاء الاشتراك بنجاح، ولكن فشل تسجيل الدفع النقدي: ${paymentError.message}. يرجى إبلاغ الإدارة لتأكيد الدفع.`
          );
          setDialogError(true);
        }
        setDialogOpen(true);

      } else if (selectedPaymentMethod === "Stripe") {
        setStripePaymentProcessing(true);
        try {
          const paymentIntentResponse = await createStripePaymentIntent(
            {
              amount: Math.round(facility.pricePerMonth * 100),
              currency: "JOD",
              membershipId: newMembershipId,
              bookingId: null,
            },
            user.token
          );
          setClientSecret(paymentIntentResponse.clientSecret);
        } catch (stripeIntentError) {
          console.error("Failed to create Stripe Payment Intent:", stripeIntentError);
          setDialogMessage(`فشل في تهيئة الدفع بالبطاقة: ${stripeIntentError.message || "خطأ غير معروف."}`);
          setDialogError(true);
          setDialogOpen(true);
          setStripePaymentProcessing(false);
        }
      } else {
        setDialogMessage("تم إنشاء الاشتراك بنجاح!");
        setDialogError(false);
        setDialogOpen(true);
      }

    } catch (error) {
      console.error('Membership creation error:', error);
      setDialogMessage(
        error.message ||
        "حدث خطأ غير متوقع أثناء محاولة إنشاء الاشتراك. يرجى المحاولة مرة أخرى لاحقًا"
      );
      setDialogError(true);
      setDialogOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStripePaymentSuccess = (paymentIntent) => {
    setDialogMessage("تم الدفع والاشتراك بنجاح!");
    setDialogError(false);
    setDialogOpen(true);
    setClientSecret(null);
    setStripePaymentProcessing(false);
  };

  const handleStripePaymentError = (errorMessage) => {
    setDialogMessage(`فشل الدفع: ${errorMessage}`);
    setDialogError(true);
    setDialogOpen(true);
    setStripePaymentProcessing(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmitReview = async (reviewData) => {
    try {
      await createReview({
        facilityId: Number(facilityId),
        fieldId: null,
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
      await loadReviews();
      setReplyingTo(null);
    } catch (error) {
      setReviewError(error.message || "فشل في إضافة الرد");
    }
  };

  const handleViewReplies = async (reviewId) => {
    if (viewingReplies === reviewId) {
      setViewingReplies(null);
    } else {
      try {
        const replies = await getReviewReplies(reviewId);
        setReviews(reviews.map(review =>
          review.id === reviewId ? { ...review, replies } : review
        ));
        setViewingReplies(reviewId);
      } catch (error) {
        setReviewError(error.message || "فشل في تحميل الردود");
      }
    }
  };

  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div>{error}</div>;
  if (!facility) return <div>المرفق غير موجود.</div>;

  return (
    <Elements stripe={stripePromise}>
      <div dir="rtl" style={{ fontFamily: 'Tajawal, sans-serif', padding: '2rem' }}>
        <header><h1>{facility.name}</h1></header>

        <div className="main-container">
          <div className="slider-container">
            {images.length > 0 ? (
              images.map((url, idx) => (
                <img key={idx} src={url} alt={`${facility.name} ${idx + 1}`} className="slider-image" />
              ))
            ) : (
              <img src={DefaultImage} alt={facility.name} className="slider-image" />
            )}
          </div>

          <div className="details">
            <div className="detail-section">
              <strong>الوصف:</strong>
              <p>{facility.description || facility.locationDesc}</p>
            </div>

            <div className="detail-section">
              <strong><FaMoneyBillWave /> السعر الشهري:</strong>
              <p>{facility.pricePerMonth ? `${facility.pricePerMonth} د.أ` : "اتصل للاستعلام"}</p>
            </div>

            <div className="detail-section">
              <strong><FaClock /> أوقات العمل:</strong>
              <p>{facility.openTime} - {facility.closeTime}</p>
            </div>

            <div className="detail-section">
              <strong><FaMapMarkerAlt /> الموقع:</strong>
              <p>{facility.locationDesc}</p>
            </div>

            <div className="detail-section">
              <strong><FaPhone /> رقم الهاتف:</strong>
              <p>{facility.phoneNumber}</p>
            </div>

            <div className="rating-summary">
              <StarRating rating={averageRating} />
              <span>
                {reviewCount > 0
                  ? `${averageRating.toFixed(1)} من 5 (${reviewCount} تقييمات)`
                  : "لا توجد تقييمات بعد"}
              </span>
            </div>

            <h3 style={{ marginTop: '2rem' }}>اشترك في النادي</h3>
            <StatusDialog
              open={dialogOpen}
              onClose={handleDialogClose}
              title={dialogError ? "خطأ" : "نجاح"}
              message={dialogMessage}
              isError={dialogError}
            />

            <form className="membership-form" onSubmit={handleMembershipSubmit}>
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

              {selectedPaymentMethod === "Cash" && (
                <button className="subscribe-btn" type="submit" disabled={isSubmitting || !user}>
                  {isSubmitting ? 'جاري المعالجة...' : (user ? `اشترك الآن (${facility.pricePerMonth} د.أ)` : 'يرجى تسجيل الدخول للاشتراك')}
                </button>
              )}

              {selectedPaymentMethod === "Stripe" && !clientSecret && !isSubmitting && (
                <button className="subscribe-btn" type="submit" disabled={!user}>
                  {user ? `المتابعة للدفع (${facility.pricePerMonth} د.أ)` : 'يرجى تسجيل الدخول للاشتراك'}
                </button>
              )}

              {!user && <p style={{ color: 'red', marginTop: '10px' }}>يجب تسجيل الدخول لتتمكن من الاشتراك.</p>}
            </form>

            {selectedPaymentMethod === "Stripe" && clientSecret && (
              <div style={{ marginTop: '2rem' }}>
                <StripeCheckoutForm
                  clientSecret={clientSecret}
                  amountInSmallestUnit={Math.round(facility.pricePerMonth * 100)}
                  currency="JOD"
                  authToken={user.token}
                  onSuccessfulPayment={handleStripePaymentSuccess}
                  onPaymentError={handleStripePaymentError}
                  facilityName={facility.name}
                />
              </div>
            )}

            {selectedPaymentMethod === "Stripe" && isSubmitting && !clientSecret && (
              <div style={{ textAlign: 'center', marginTop: '20px', color: '#555' }}>
                جاري تجهيز بيانات الدفع...
              </div>
            )}
          </div>
        </div>

        <section className="reviews-section" style={{ marginTop: '3rem' }}>
          <div className="reviews-header">
            <h2>تقييمات المرفق</h2>
            {user && (
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="btn btn-primary"
              >
                {showReviewForm ? 'إلغاء' : 'أضف تقييمك'}
              </button>
            )}
          </div>

          {reviewError && <div className="alert alert-danger">{reviewError}</div>}

          {showReviewForm && (
            <ReviewForm
              onSubmit={handleSubmitReview}
              onCancel={() => setShowReviewForm(false)}
            />
          )}

          {reviewLoading ? (
            <div>جاري تحميل التقييمات...</div>
          ) : (
            <ReviewList
              reviews={reviews}
              onLike={handleLikeReview}
              onReply={handleSubmitReply}
              onViewReplies={handleViewReplies}
              viewingReplies={viewingReplies}
              currentUserId={user?.id}
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
            />
          )}
        </section>
      </div>
      {clientSecret && (
        <div className="stripe-checkout-container">
          <h3>إدخال بيانات البطاقة لإتمام الدفع</h3>
          <StripeCheckoutForm
            clientSecret={clientSecret}
            onSuccess={handleStripePaymentSuccess}
            onError={handleStripePaymentError}
          />
        </div>
      )}
    </Elements>
  );
}

export default FacilityDetails;