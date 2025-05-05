import React from "react";
import { useNavigate } from "react-router-dom";

const FieldCard = ({ field }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/field-details/${field.id}`); // Navigate with the fieldId in the URL
  };

  return (
    <div className="col-12 col-sm-6 col-md-4" onClick={handleCardClick}>
      <div className="card h-100 shadow-sm">
        <img
          src={field.imageUrl || "/default-field.jpg"}
          className="card-img-top"
          alt={field.name}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{field.name}</h5>
          <p className="card-text text-muted">{field.locationDesc}</p>
          <p className="card-text">{field.pricePerHour || "call for price."}</p>
        </div>
      </div>
    </div>
  );
};

export default FieldCard;
