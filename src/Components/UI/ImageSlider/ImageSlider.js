function ImageSlider({ images, defaultImage, altText }) {
  return (
    <div className="slider-container">
      {images.length > 0 ? (
        images.map((url, idx) => (
          <img key={idx} src={url} alt={`${altText} ${idx + 1}`} className="slider-image" />
        ))
      ) : (
        <img src={defaultImage} alt={altText} className="slider-image" />
      )}
    </div>
  );
}