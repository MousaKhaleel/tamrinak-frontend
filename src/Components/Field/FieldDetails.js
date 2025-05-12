import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getField, getFieldPhotoList } from "../../Services/fieldService";
import { bookField } from "../../Services/bookingService";
import './FieldDetails.css';
import { useAuth } from '../../Context/AuthContext';

import DefaultImage from "../../Assets/Defaults/default-featured-image.png";

import Slider from "react-slick";

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
  const [fieldImages, setFieldImages] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getField(fieldId);
        setField(data);

        const photoList = await getFieldPhotoList(fieldId);

        const urls = photoList.map(photo => photo.imageData);
        setImages(urls);
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

        {/* <div className="slider-container">
  <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1}>
    {images.length > 0 ? (
      images.map((url, idx) => (
        <div key={idx}>
          <img src={url} alt={`${field.name} ${idx + 1}`} className="slider-image" />
        </div>
      ))
    ) : (
      <div>
        <img src={DefaultImage} alt={field.name} className="slider-image" />
      </div>
    )}
  </Slider>
</div> */}

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
