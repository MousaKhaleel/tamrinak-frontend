import React from "react";
import { Navigate } from "react-router-dom";

const FieldCard = ({ field }) => {

    const handleCardClick = (facility) => {
        localStorage.setItem("selectedField", JSON.stringify(facility));
        Navigate("/field-details");
      };

  return (
    <div className="col-12 col-sm-6 col-md-4">
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
          {/* Optional: location, rating, price, etc. */}
        </div>
      </div>
    </div>
  );
};

export default FieldCard;
