import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFacility, getFacilityPhotoList } from "../../Services/facilityService";
import { createMembership } from "../../Services/membershipService"; // Changed from bookFacility
import { useAuth } from '../../Context/AuthContext';
import DefaultImage from "../../Assets/Defaults/default-featured-image.png";
import { FaMapMarkerAlt, FaClock, FaPhone, FaMoneyBillWave } from 'react-icons/fa';

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
  const [membershipError, setMembershipError] = useState(null);
  const [membershipSuccess, setMembershipSuccess] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFacility(facilityId);
        setFacility(data);

        const photoList = await getFacilityPhotoList(facilityId);
        const urls = photoList.map(photo => photo.imageData);
        setImages(urls);
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

const handleMembershipSubmit = async (e) => {
  e.preventDefault();
  setMembershipError(null);
  setMembershipSuccess(null);

  try {
    const addMembershipDto = {
      facilityId: facilityId,
      offerId: null,
    };

    const result = await createMembership(addMembershipDto, user.token);
    
    if (result.success) {
      setMembershipSuccess("تم إنشاء الاشتراك بنجاح!");
      // Optional: redirect or refresh user data
    } else {
      setMembershipError(result.message || "فشل في إنشاء الاشتراك");
    }
    
  } catch (error) {
    console.error('Membership creation error:', error);
    setMembershipError(
      error.message || 
      "حدث خطأ غير متوقع أثناء محاولة إنشاء الاشتراك. يرجى المحاولة مرة أخرى لاحقًا"
    );
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

          <h3 style={{ marginTop: '2rem' }}>اشترك في النادي</h3>
          {membershipError && <div style={{ color: "red" }}>{membershipError}</div>}
          {membershipSuccess && <div style={{ color: "green" }}>{membershipSuccess}</div>}

          <form className="membership-form" onSubmit={handleMembershipSubmit}>
            <button className="subscribe-btn" type="submit">اشترك الآن</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FacilityDetails;