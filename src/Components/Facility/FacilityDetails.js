import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFacility, getFacilityPhotoList } from "../../Services/facilityService";
import { createMembership } from "../../Services/membershipService";
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
  
  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogError, setDialogError] = useState(false);

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
    
    try {
      const addMembershipDto = {
        facilityId: facilityId,
        offerId: null,
      };

      const result = await createMembership(addMembershipDto, user.token);
      
      if (result.success) {
        setDialogMessage("تم إنشاء الاشتراك بنجاح!");
        setDialogError(false);
      } else {
        setDialogMessage(result.message || "فشل في إنشاء الاشتراك");
        setDialogError(true);
      }
    } catch (error) {
      console.error('Membership creation error:', error);
      setDialogMessage(
        error.message || 
        "حدث خطأ غير متوقع أثناء محاولة إنشاء الاشتراك. يرجى المحاولة مرة أخرى لاحقًا"
      );
      setDialogError(true);
    } finally {
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };


  // Review handlers
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
      <form className="membership-form" onSubmit={handleMembershipSubmit}>
        <button className="subscribe-btn" type="submit">اشترك الآن</button>
      </form>
        </div>
      </div>

      {/* Reviews Section */}
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
            <StatusDialog 
        open={dialogOpen}
        onClose={handleDialogClose}
        message={dialogMessage}
        isError={dialogError}
      />
    </div>
  );
}

export default FacilityDetails;