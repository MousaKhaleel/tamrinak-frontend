import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaMapMarkerAlt } from 'react-icons/fa';

const FacilityCard = ({ facilities }) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const sportName = params.get("sport");

  const filtered = facilities.filter((f) => f.sport === sportName);

  const handleCardClick = (facility) => {
    localStorage.setItem("selectedFacility", JSON.stringify(facility));
    navigate("/facility-details");
  };

  return (
    <div className="container py-4" dir="rtl">
      <h1 className="text-center mb-5">المرافق لـ: {sportName}</h1>
      <div className="row justify-content-center g-4">
        {filtered.map((facility, index) => (
          <div
            className="col-12 col-sm-6 col-md-4"
            key={index}
            onClick={() => handleCardClick(facility)}
            style={{ cursor: "pointer" }}
          >
            <div className="card shadow-sm rounded-4 h-100">
              {facility.images[0] && (
                <img
                  src={facility.images[0]}
                  alt={facility.name}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title text-primary fw-bold">{facility.name}</h5>
                <p className="card-text text-muted">{facility.locationDesc}</p>
                <p className="card-text small text-secondary"><FaMapMarkerAlt className="icon" /> {facility.pricePerHour}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilityCard;
