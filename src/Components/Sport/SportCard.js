import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultImage from '../../Assets/Defaults/default-featured-image.png';

const SportCard = ({ sports }) => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('fields');

  const handleClick = (sportId) => {
    if (selectedType === 'facilities') {
      navigate(`/facilities?sportId=${sportId}`);
    } else {
      navigate(`/fields?sportId=${sportId}`);
    }
  };

  return (
    <div className="container py-4" dir="rtl">
      <h1 className="text-center mb-5">اختر النشاط الرياضي</h1>
      <div className="text-center mb-4">
      <h5 className="text-center">نوع الخدمة:</h5>
        <div className="btn-group gap-3" role="group">
          <button 
            type="button" 
            className={`btn ${selectedType === 'fields' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setSelectedType('fields')}
          >
            الحجز اليومي
          </button>
          <button 
            type="button" 
            className={`btn ${selectedType === 'facilities' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setSelectedType('facilities')}
          >
            اشتراك شهري
          </button>
        </div>
      </div>
      
      <div className="row justify-content-center g-4">
        {sports && sports.length > 0 ? (
          sports.map((sport) => (
            <div
              key={sport.id}
              className="col-12 col-sm-6 col-md-4 text-center"
              onClick={() => handleClick(sport.id)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={sport.iconUrl ? `data:image/png;base64,${sport.iconUrl}` : defaultImage}
                alt={sport.name}
                className="img-fluid mb-2"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <div className="fw-bold fs-5">{sport.name}</div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <p>لا توجد رياضات متاحة</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SportCard;