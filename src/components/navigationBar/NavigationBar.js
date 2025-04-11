import React from 'react';
import Logo from '../../Assets/Logo/3Xpnjp-LogoMakr.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './NavigationBar.css'; // Optional: only for custom styles

function NavigationBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" dir="rtl">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src={Logo} width="40" alt="Tamreenak Logo" className="me-2" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="تبديل القائمة"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav me-auto mb-2 mb-lg-0">
            <a className="nav-link" href="/">الرئيسية</a>
            <a className="nav-link" href="/abousUs">حول الموقع</a>
            <a className="nav-link" href="/services">خدماتنا</a>
            <a className="nav-link" href="/bookings">الحجوزات</a>
            <a className="nav-link" href="/contactUs">تواصل معنا</a>
          </div>
          <div className="d-flex gap-2">
            <a href="/login" className="btn btn-outline-light">تسجيل الدخول</a>
            <a href="/register" className="btn btn-primary">إنشاء حساب</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
