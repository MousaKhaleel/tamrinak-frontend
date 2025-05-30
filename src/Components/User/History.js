import { useState, useEffect } from 'react';
import { getUserBookings, cancelBooking } from '../../Services/bookingService';
import { useAuth } from '../../Context/AuthContext';

const BOOKING_STATUS = {
  0: { text: 'قيد الانتظار', class: 'bg-warning text-dark' },
  1: { text: 'أُلغيت', class: 'bg-danger' },
  2: { text: 'مكتملة', class: 'bg-success' }
};

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
        setError(err.message || 'فشل في تحميل سجل الحجز');
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
      window.location.reload();
    } catch (err) {
      setError(err.message || 'فشل في إلغاء الحجز');
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
          <span className="visually-hidden">جارٍ التحميل...</span>
        </div>
        <span className="ms-3 fs-5">جارٍ تحميل سجل الحجوزات...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-5" role="alert">
        خطأ: {error}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="alert alert-info text-center my-5" role="alert">
        لا يوجد سجل حجوزات.
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">سجل حجوزاتك</h2>
      <div className="row g-4">
        {bookings.map((booking) => (
          <div key={booking.bookingId} className="col-md-6 col-lg-4">
            <div className="card shadow-sm h-100">
              <div className={`card-header ${BOOKING_STATUS[booking.status]?.class || 'bg-secondary text-white'}`}>
                <h5 className="card-title mb-0">الحجز رقم #{booking.bookingId}</h5>
              </div>
              <div className="card-body">
                <p>
                  <strong>التاريخ:</strong>{' '}
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>الوقت:</strong> {booking.startTime} - {booking.endTime}
                </p>
                <p>
                  <strong>المدة:</strong> {booking.duration}
                </p>
                <p>
                  <strong>رقم الملعب:</strong> {booking.fieldId}
                </p>
                <p>
                  <strong>التكلفة الإجمالية:</strong> ${booking.totalCost}
                </p>
                <p>
                  <strong>الحالة:</strong>{' '}
                  <span className={`badge ${BOOKING_STATUS[booking.status]?.class || 'bg-secondary'}`}>
                    {BOOKING_STATUS[booking.status]?.text || booking.status}
                  </span>
                  {booking.isPaid && booking.status !== 1 && (
                    <span className="badge bg-success ms-2">مدفوع</span>
                  )}
                </p>
                <p>
                  <strong>عدد المشاركين:</strong> {booking.numberOfPeople}
                </p>
              </div>
              <div className="card-footer bg-transparent d-flex justify-content-end">
                {isFutureBooking(booking.bookingDate) &&
                  booking.status !== 1 &&
                  booking.status !== 2 && (
                    <button
                      onClick={() => handleCancelBooking(booking.bookingId)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      إلغاء الحجز
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
