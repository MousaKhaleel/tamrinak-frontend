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
            // Update the bookings list after cancellation
            setBookings(bookings.map(booking => 
                booking.bookingId === bookingId 
                    ? { ...booking, status: 'Cancelled' } 
                    : booking
            ));
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
        return <div className="loading-message">Loading your booking history...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    if (bookings.length === 0) {
        return <div className="no-bookings">No booking history found.</div>;
    }

    return (
        <div className="history-container">
            <h2>Your Booking History</h2>
            <div className="bookings-list">
                {bookings.map((booking) => (
                    <div key={booking.bookingId} className="booking-card">
                        <h3>Booking #{booking.bookingId}</h3>
                        <div className="booking-details">
                            <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {booking.startTime} - {booking.endTime}</p>
                            <p><strong>Duration:</strong> {booking.duration}</p>
                            <p><strong>Field ID:</strong> {booking.fieldId}</p>
                            <p><strong>Total Cost:</strong> ${booking.totalCost}</p>
                            <p><strong>Status:</strong> {booking.status || (booking.isPaid ? 'Paid' : 'Unpaid')}</p>
                            <p><strong>Participants:</strong> {booking.numberOfPeople}</p>
                            
                            {isFutureBooking(booking.bookingDate) && booking.status !== 1 && (
                                <button 
                                    onClick={() => handleCancelBooking(booking.bookingId)}
                                    className="cancel-booking-btn"
                                >
                                    Cancel Booking
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default History;