import React, { useEffect, useState } from 'react';
import OfferCard from './OfferCard';
import { getOffersByFacilityId, addOffer } from '../../Services/offerService';

function OfferPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newOfferDuration, setNewOfferDuration] = useState('');
  const [newOfferPrice, setNewOfferPrice] = useState('');
  const [selectedFacilityId, setSelectedFacilityId] = useState('');

  const facilityId = 'some-hardcoded-facility-id';

  const fetchOffers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getOffersByFacilityId(facilityId);
      setOffers(data);
    } catch (err) {
      setError("Failed to fetch offers. Please try again later.");
      console.error("Error fetching offers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (facilityId) {
      fetchOffers();
    }
  }, [facilityId]);

  const handleAddOffer = async () => {
    setLoading(true);
    setError(null);
    if (!newOfferDuration || !newOfferPrice) {
      setError("Please enter both duration and price for the new offer.");
      setLoading(false);
      return;
    }
    try {
      await addOffer(facilityId, Number(newOfferDuration), Number(newOfferPrice));
      setNewOfferDuration('');
      setNewOfferPrice('');
      await fetchOffers();
    } catch (err) {
      setError("Failed to add offer. Please ensure inputs are valid.");
      console.error("Error adding offer:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOfferChange = () => {
    fetchOffers();
  };

  if (loading) {
    return <div>Loading offers...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Membership Offers for Facility: {facilityId}</h1>

      <div style={{ marginBottom: '30px', border: '1px dashed #ccc', padding: '15px', borderRadius: '8px' }}>
        <h2>Add New Offer</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label>Duration (Months):</label>
          <input
            type="number"
            value={newOfferDuration}
            onChange={(e) => setNewOfferDuration(e.target.value)}
            placeholder="e.g., 3, 6, 12"
            disabled={loading}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            step="0.01"
            value={newOfferPrice}
            onChange={(e) => setNewOfferPrice(e.target.value)}
            placeholder="e.g., 99.99"
            disabled={loading}
          />
        </div>
        <button onClick={handleAddOffer} disabled={loading} style={{ marginTop: '10px' }}>
          {loading ? 'Adding...' : 'Add Offer'}
        </button>
      </div>

      <h2>Current Offers</h2>
      {offers.length === 0 ? (
        <p>No offers available for this facility yet.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onOfferUpdated={handleOfferChange}
              onOfferRemoved={handleOfferChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default OfferPage;