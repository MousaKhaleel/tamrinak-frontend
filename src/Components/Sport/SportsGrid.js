import React from "react";
import { useNavigate } from "react-router-dom";

const SportsGrid = ({ sports }) => {
  const navigate = useNavigate();

  const handleClick = (SportId) => {
    navigate(`/facilities?sport=${encodeURIComponent(SportId)}`);
  };

  return (
    <div className="container py-4" dir="rtl">
      <h1 className="text-center mb-5">الرياضات</h1>
      <div className="row justify-content-center g-4">
        {sports.map((sport, index) => (
          <div
            key={index}
            className="col-12 col-sm-6 col-md-4 text-center"
            onClick={() => handleClick(sport.SportId)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={sport.icon}
              alt={sport.name}
              className="img-fluid mb-2"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <div className="fw-bold fs-5">{sport.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SportsGrid;
