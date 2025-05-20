import React, { useState } from 'react';
import StarRating from './StarRating';

const ReviewForm = ({ onSubmit, onCancel }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0 && comment.trim()) {
      onSubmit({ rating, comment });
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>أضف تقييمك</h3>
      <div className="rating-input">
        <span>التقييم:</span>
        <div className="stars-selector">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= (hoverRating || rating) ? 'selected' : ''}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <div className="form-group">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="اكتب تعليقك..."
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit" disabled={rating === 0 || !comment.trim()}>
          إرسال التقييم
        </button>
        <button type="button" onClick={onCancel}>
          إلغاء
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;