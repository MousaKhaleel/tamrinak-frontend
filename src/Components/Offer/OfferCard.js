import React, { useState } from 'react';
import { removeOffer, updateOffer } from '../../Services/offerService';

function OfferCard({ offer, onOfferUpdated, onOfferRemoved }) {
  const [isEditing, setIsEditing] = useState(false);
  const [duration, setDuration] = useState(offer.durationInMonths);
  const [price, setPrice] = useState(offer.price);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    try {
      await updateOffer(offer.id, duration, price);
      setIsEditing(false);
      onOfferUpdated();
    } catch (err) {
      setError("Failed to update offer. Please try again.");
      console.error("Error updating offer:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    setLoading(true);
    setError(null);
    if (window.confirm("Are you sure you want to remove this offer?")) {
      try {
        await removeOffer(offer.id);
        onOfferRemoved();
      } catch (err) {
        setError("Failed to remove offer. Please try again.");
        console.error("Error removing offer:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px', borderRadius: '8px' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {isEditing ? (
        <div>
          <h3>Editing Offer ID: {offer.id}</h3>
          <div>
            <label>Duration (Months):</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              disabled={loading}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              disabled={loading}
            />
          </div>
          <button onClick={handleUpdate} disabled={loading}>
            {loading ? 'Updating...' : 'Save Changes'}
          </button>
          <button onClick={() => setIsEditing(false)} disabled={loading} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h3>Offer ID: {offer.id}</h3>
          <p>
            **Duration:** {offer.durationInMonths} months
          </p>
          <p>
            **Price:** ${offer.price ? offer.price.toFixed(2) : 'N/A'}
          </p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleRemove} disabled={loading} style={{ marginLeft: '10px' }}>
            {loading ? 'Removing...' : 'Remove'}
          </button>
        </div>
      )}
    </div>
  );
}

export default OfferCard;