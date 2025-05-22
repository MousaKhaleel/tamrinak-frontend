import { useState, useEffect } from 'react';
import { getUserBookings, cancelBooking } from '../../Services/bookingService';
import { useAuth } from '../../Context/AuthContext';

function History() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const userId = user?.profile?.id;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userBookings = await getUserBookings(userId);
        setBookings(userBookings);
      } catch (err) {
        setError(err.message || 'Failed to load booking history');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      setBookings(
        bookings.map((booking) =>
          booking.bookingId === bookingId
            ? { ...booking, status: 'Cancelled' }
            : booking
        )
      );
    } catch (err) {
      setError(err.message || 'Failed to cancel booking');
    }
  };

  const isFutureBooking = (bookingDate) => {
    const today = new Date();
    const bookingDateObj = new Date(bookingDate);
    return bookingDateObj > today;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status" aria-label="Loading spinner">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-3 fs-5">Loading your booking history...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-5" role="alert">
        Error: {error}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="alert alert-info text-center my-5" role="alert">
        No booking history found.
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Your Booking History</h2>
      <div className="row g-4">
        {bookings.map((booking) => (
          <div key={booking.bookingId} className="col-md-6 col-lg-4">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0">Booking #{booking.bookingId}</h5>
              </div>
              <div className="card-body">
                <p>
                  <strong>Date:</strong>{' '}
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {booking.startTime} - {booking.endTime}
                </p>
                <p>
                  <strong>Duration:</strong> {booking.duration}
                </p>
                <p>
                  <strong>Field ID:</strong> {booking.fieldId}
                </p>
                <p>
                  <strong>Total Cost:</strong> ${booking.totalCost}
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  {booking.status === 'Cancelled' ? (
                    <span className="badge bg-danger">Cancelled</span>
                  ) : booking.status === 1 ? (
                    <span className="badge bg-success">Active</span>
                  ) : booking.isPaid ? (
                    <span className="badge bg-success">Paid</span>
                  ) : (
                    <span className="badge bg-warning text-dark">Unpaid</span>
                  )}
                </p>
                <p>
                  <strong>Participants:</strong> {booking.numberOfPeople}
                </p>
              </div>
              <div className="card-footer bg-transparent d-flex justify-content-end">
                {isFutureBooking(booking.bookingDate) && booking.status !== 'Cancelled' && (
                  <button
                    onClick={() => handleCancelBooking(booking.bookingId)}
                    className="btn btn-outline-danger btn-sm"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
