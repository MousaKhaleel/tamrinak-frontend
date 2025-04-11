import React from 'react';
import Logo from '../../Assets/Logo/3Xpnjp-LogoMakr.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './NavigationBar.css'; // Optional: only for custom styles
import { Link } from 'react-router-dom';

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
        <div className="collapse navbar-collapse bg-highlight" id="navbarNavAltMarkup">
          <div className="navbar-nav me-auto mb-2 mb-lg-0">
            <a className="nav-link" href="/">الرئيسية</a>
            <a className="nav-link" href="/abousUs">حول الموقع</a>
            <a className="nav-link" href="/services">خدماتنا</a>
            <a className="nav-link" href="/bookings">الحجوزات</a>
            <a className="nav-link" href="/contactUs">تواصل معنا</a>
          </div>
          <div className="d-flex gap-2">
            <Link className="btn btn-outline-light" to="/auth?mode=login">تسجيل الدخول</Link>
            <Link className="btn btn-primary" to="/auth?mode=register">إنشاء حساب</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
