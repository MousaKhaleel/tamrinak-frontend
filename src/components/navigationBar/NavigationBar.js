import React from 'react';
import Logo from '../../Assets/Logo/4RrmCG-LogoMakr.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './NavigationBar.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

function NavigationBar() {
  const { user, logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
  };

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
            <a className="nav-link" href="/aboutUs">حول الموقع</a>
            <a className="nav-link" href="/sports">الرياضات</a>
            <a className="nav-link" href="/bookings">الحجوزات</a>
            <a className="nav-link" href="/contactUs">تواصل معنا</a>
          </div>

          {/* Auth Buttons */}
          <div className="d-flex gap-2">
            {user ? (
              <>
                <button onClick={handleLogout} className="btn btn-outline-danger">تسجيل الخروج</button>
                {/* Optional: Show something like the user token or a placeholder name */}
                <span className="text-light d-flex align-items-center">مرحبا!</span>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-light" to="/auth?mode=login">تسجيل الدخول</Link>
                <Link className="btn btn-primary" to="/auth?mode=register">إنشاء حساب</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}


export default NavigationBar;
