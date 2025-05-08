import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getField } from "../../Services/fieldService";
import { bookField } from "../../Services/bookingService";
import './FieldDetails.css';
import { useAuth } from '../../Context/AuthContext';


function FieldDetails() {
  const { fieldId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [field, setField] = useState(null);
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

  useEffect(() => {
    const fetchFieldDetails = async () => {
      try {
        const data = await getField(fieldId);
        setField(data);
      } catch (error) {
        setError("فشل في جلب بيانات الملعب.");
      } finally {
        setLoading(false);
      }
    };

    if (fieldId) {
      fetchFieldDetails();
    } else {
      navigate("/");
    }
  }, [fieldId, navigate]);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const parseTime = (timeStr) => {
    const [hour, minute] = timeStr.split(":").map(Number);
    return { hour, minute };
  };
  
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingError(null);
    setBookingSuccess(null);
  
    if (bookingData.startTime >= bookingData.endTime) {
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
  
  

  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div>{error}</div>;
  if (!field) return <div>الملعب غير موجود.</div>;

  return (
    <div dir="rtl" style={{ fontFamily: 'Tajawal, sans-serif', padding: '2rem' }}>
      <header>
        <h1>{field.name}</h1>
      </header>

      <div className="main-container">
        {/* Image Slider */}
        <div className="slider-container">
          <img
            src={field.imageUrl || "/default-field.jpg"}
            alt={field.name}
            className="slider-image"
          />
          {/* Future enhancement: next/prev buttons */}
        </div>

        {/* Field Details + Booking Form */}
        <div className="details">
          <div className="detail-section">
            <strong>الوصف:</strong>
            <p>{field.locationDesc}</p>
          </div>
          <div className="detail-section">
            <strong>السعر لكل ساعة:</strong>
            <p>{field.pricePerHour ? `${field.pricePerHour} د.أ` : "اتصل للاستعلام"}</p>
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
    </div>
  );
}

export default FieldDetails;
