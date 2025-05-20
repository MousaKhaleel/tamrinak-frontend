import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  getField, 
  getFieldPhotoList, 
} from "../../Services/fieldService";
import {
  getFieldReviews,
  createReview,
  likeReview,
  createReviewReply,
  getReviewReplies
} from "../../Services/reviewService";
import { bookField } from "../../Services/bookingService";
import './FieldDetails.css';
import { useAuth } from '../../Context/AuthContext';
import DefaultImage from "../../Assets/Defaults/default-featured-image.png";
import Slider from "react-slick";
import StarRating from "../Review/StarRating";
import ReviewList from "../Review/ReviewList";
import ReviewForm from "../Review/ReviewForm";

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
  const [bookingError, setBookingError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  
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
        const data = await getField(fieldId);
        setField(data);

        const photoList = await getFieldPhotoList(fieldId);
        const urls = photoList.map(photo => photo.imageData);
        setImages(urls);

        // Load reviews
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
    setAverageRating(averageRating || 0); // Ensure it's never undefined
    setReviewCount(reviewCount || 0);
  } catch (err) {
    console.error(err);
    setReviewError("فشل في تحميل التقييمات");
  } finally {
    setReviewLoading(false);
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
    setBookingError(null);
    setBookingSuccess(null);

    const start = 2;
    const end = 3;

    if (start >= end) {
      setBookingError("وقت النهاية يجب أن يكون بعد وقت البداية.");
      return;
    }

    try {
      const transformedData = {
        fieldId: Number(fieldId),
        bookingDate: bookingData.bookingDate,
        startTime: bookingData.startTime + ":00",
        endTime: bookingData.endTime + ":00",
        numberOfPeople: bookingData.numberOfPeople,
      };

      await bookField(transformedData, user.token);
      setBookingSuccess("تم الحجز بنجاح!");
      setBookingData({
        fieldId,
        bookingDate: "",
        startTime: "",
        endTime: "",
        numberOfPeople: 1,
      });
    } catch (error) {
      setBookingError(error.message || "فشل الحجز");
    }
  };

  // Review handlers
const handleSubmitReview = async (reviewData) => {
  try {
    await createReview({
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
  if (!field) return <div>الملعب غير موجود.</div>;

  return (
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

        <div className="details">
          <div className="detail-section">
            <strong>الوصف:</strong>
            <p>{field.locationDesc}</p>
          </div>
          <div className="detail-section">
            <strong>السعر لكل ساعة:</strong>
            <p>{field.pricePerHour ? `${field.pricePerHour} د.أ` : "اتصل للاستعلام"}</p>
          </div>
          
<div className="rating-summary">
  <StarRating rating={averageRating} />
  <span>
    {reviewCount > 0 
      ? `${averageRating.toFixed(1)} من 5 (${reviewCount} تقييمات)`
      : "لا توجد تقييمات بعد"}
  </span>
</div>

          <h3 style={{ marginTop: '2rem' }}>احجز هذا الملعب</h3>
          {bookingError && <div style={{ color: "red" }}>{bookingError}</div>}
          {bookingSuccess && <div style={{ color: "green" }}>{bookingSuccess}</div>}

          <form className="booking-form" onSubmit={handleBookingSubmit}>
            <div className="form-group">
              <label htmlFor="bookingDate">التاريخ:</label>
              <input
                type="date"
                id="bookingDate"
                name="bookingDate"
                value={bookingData.bookingDate}
                onChange={handleBookingChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="startTime">الوقت من:</label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={bookingData.startTime}
                onChange={handleBookingChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endTime">إلى:</label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={bookingData.endTime}
                onChange={handleBookingChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="numberOfPeople">عدد الأشخاص:</label>
              <input
                type="number"
                id="numberOfPeople"
                name="numberOfPeople"
                min="1"
                max="25"
                value={bookingData.numberOfPeople}
                onChange={handleBookingChange}
                required
              />
            </div>

            <button className="reserve-btn" type="submit">احجز الآن</button>
          </form>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="reviews-section" style={{ marginTop: '3rem' }}>
        <div className="reviews-header">
          <h2>تقييمات الملعب</h2>
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
  );
}

export default FieldDetails;