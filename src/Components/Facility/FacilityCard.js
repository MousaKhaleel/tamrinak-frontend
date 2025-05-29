import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultImage from "../../Assets/Defaults/default-featured-image.png";
import { FaMoneyBillWave } from 'react-icons/fa';

const FacilityCard = ({ facility }) => {
  const navigate = useNavigate();
  const [thumbUrl, setThumbUrl] = useState(null);

  useEffect(() => {
    if (facility.images && facility.images.length > 0) {
      setThumbUrl(`data:image/jpeg;base64,${facility.images[0]}`);
    } else {
      setThumbUrl(DefaultImage);
    }
  }, [facility.images]);

  const handleCardClick = () => navigate(`/facility-details/${facility.id}`);

  return (
    <div className="col-12 col-sm-6 col-md-4" onClick={handleCardClick}>
      <div className="card h-100 shadow-sm">
        <img
          src={thumbUrl}
          className="card-img-top"
          alt={facility.name}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{facility.name}</h5>
          <p className="card-text text-muted">{facility.description}</p>
          <p className="card-text"><FaMoneyBillWave />
            {facility.pricePerMonth ? ` ${facility.pricePerMonth} د.أ/شهر` : " اتصل للسعر"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FacilityCard;