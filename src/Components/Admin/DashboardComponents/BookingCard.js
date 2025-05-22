import React from 'react';

const BookingCard = () => {
  return (
    <div dir="rtl" className="col-xxl-4 col-md-6">
      <div className="card info-card sales-card position-relative">
        <div className="filter">
          <div className="dropdown">
            <a
              className="icon"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-three-dots"></i>
            </a>
            <ul className="dropdown-menu dropdown-menu-start dropdown-menu-arrow">
              <li className="dropdown-header text-end">
                <h6>فلتر</h6>
              </li>
              <li><a className="dropdown-item" href="#">اليوم</a></li>
              <li><a className="dropdown-item" href="#">هذا الشهر</a></li>
              <li><a className="dropdown-item" href="#">هذا العام</a></li>
            </ul>
          </div>
        </div>

        <div className="booking-card-body">
          <h5 className="card-title">الحجوزات <span>| اليوم</span></h5>
          <div className="d-flex align-items-center flex-row-reverse">
            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
              <i className="bi bi-cart"></i>
            </div>
            <div className="pe-3">
              <h6>14</h6>
              <span className="text-success small pt-1 fw-bold">12%</span>
              <span className="text-muted small pt-2 pe-1">زيادة</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;