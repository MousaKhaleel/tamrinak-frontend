import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFacilityPhotoList } from "../../Services/facilityService";
import DefaultImage from "../../Assets/Defaults/default-featured-image.png";
import { FaMapMarkerAlt } from 'react-icons/fa';

const FacilityCard = ({ facility }) => {
  const navigate = useNavigate();
  const [thumbUrl, setThumbUrl] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchThumb = async () => {
      try {
        const photos = await getFacilityPhotoList(facility.id);
        if (photos.length > 0 && isMounted) {
          setThumbUrl(photos[0].imageData);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchThumb();
    return () => { isMounted = false; };
  }, [facility.id]);

  const handleCardClick = () => navigate(`/facility-details/${facility.id}`);

  return (
    <div className="col-12 col-sm-6 col-md-4" onClick={handleCardClick}>
      <div className="card h-100 shadow-sm">
        <img
          src={thumbUrl || DefaultImage}
          className="card-img-top"
          alt={facility.name}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{facility.name}</h5>
          <p className="card-text text-muted">{facility.description}</p>
          <p className="card-text">
            {/* <FaMapMarkerAlt className="icon" /> TODO */}
            {facility.pricePerMonth ? `${facility.pricePerMonth} د.أ/شهر` : "call for price."}
          </p>
          <p className="card-text small">
            {facility.openTime} - {facility.closeTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FacilityCard;