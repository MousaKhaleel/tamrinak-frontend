import React, { useState } from 'react';
import StarRating from './StarRating';

const ReviewList = ({ 
  reviews, 
  onLike, 
  onReply, 
  onViewReplies, 
  viewingReplies, 
  currentUserId,
  replyingTo,
  setReplyingTo
}) => {
  const [replyText, setReplyText] = useState('');

  const handleReplySubmit = (reviewId) => {
    if (replyText.trim()) {
      onReply(reviewId, replyText);
      setReplyText('');
    }
  };

  return (
    <div className="review-list">
      {reviews.length === 0 ? (
        <p>لا توجد تقييمات بعد.</p>
      ) : (
        reviews.map(review => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <StarRating rating={review.rating} />
              <span className="review-author">{review.userName}</span>
              <span className="review-date">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="review-comment">{review.comment}</p>
            
            <div className="review-actions">
              <button 
                onClick={() => onLike(review.id)}
                className="like-btn"
              >
                أعجبني ({review.likesCount})
              </button>
              
              {currentUserId && (
                <button 
                  onClick={() => setReplyingTo(replyingTo === review.id ? null : review.id)}
                  className="reply-btn"
                >
                  رد
                </button>
              )}
              
              {review.repliesCount > 0 && (
                <button 
                  onClick={() => onViewReplies(review.id)}
                  className="view-replies-btn"
                >
                  {viewingReplies === review.id ? 'إخفاء الردود' : `عرض الردود (${review.repliesCount})`}
                </button>
              )}
            </div>
            
            {replyingTo === review.id && (
              <div className="reply-form">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="اكتب ردك..."
                />
                <button onClick={() => handleReplySubmit(review.id)}>إرسال</button>
                <button onClick={() => setReplyingTo(null)}>إلغاء</button>
              </div>
            )}
            
            {viewingReplies === review.id && review.replies && (
              <div className="replies-list">
                {review.replies.map(reply => (
                  <div key={reply.id} className="reply-item">
                    <div className="reply-header">
                      <span className="reply-author">{reply.userName}</span>
                      <span className="reply-date">
                        {new Date(reply.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="reply-comment">{reply.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;