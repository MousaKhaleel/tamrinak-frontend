import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFieldPhotoList } from "../../Services/fieldService";
import './FieldCard.css';
import DefaultImage from "../../Assets/Defaults/default-featured-image.png";

const FieldCard = ({ field }) => {
  const navigate = useNavigate();
  const [thumbUrl, setThumbUrl] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchThumb = async () => {
      try {
        const photos = await getFieldPhotoList(field.id);
        if (photos.length > 0 && isMounted) {
          setThumbUrl(photos[0].imageData);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchThumb();
    return () => { isMounted = false; };
  }, [field.id]);

  const handleCardClick = () => navigate(`/field-details/${field.id}`);

  return (
    <div className="col-12 col-sm-6 col-md-4" onClick={handleCardClick}>
      <div className="card h-100 shadow-sm">
        <img
          src={thumbUrl || DefaultImage}
          className="card-img-top"
          alt={field.name}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{field.name}</h5>
          <p className="card-text text-muted">{field.locationDesc}</p>
          <p className="card-text">{field.pricePerHour ? `${field.pricePerHour} د.أ` : "call for price."}</p>
        </div>
      </div>
    </div>
  );
};

export default FieldCard;