import React from 'react';
import PropTypes from 'prop-types';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ImageSlider({ images, defaultImage, altText }) {
  const fallbackAltText = altText || "Image"; 

  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images?.length > 0 ? (
          images.map((url, idx) => (
            <div key={`${url}-${idx}`}>
              <img 
                src={url} 
                alt={`${fallbackAltText} ${idx + 1}`} 
                className="slider-image" 
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = defaultImage;
                }}
              />
            </div>
          ))
        ) : (
          <div>
            <img src={defaultImage} alt={fallbackAltText} className="slider-image" />
          </div>
        )}
      </Slider>
    </div>
  );
}

ImageSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  defaultImage: PropTypes.string.isRequired,
  altText: PropTypes.string
};

ImageSlider.defaultProps = {
  images: [],
  altText: "Image"
};

export default ImageSlider;