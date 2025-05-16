import React from 'react';
import Logo from '../../Assets/Logo/1vWOEn-LogoMakr (1).png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './NavigationBar.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

import pic from '../../Assets/Defaults/profile-42914_1280.png';

function NavigationBar() {
  const { user, logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
  };

  const isAdmin = user?.profile?.roles?.includes('Admin') || user?.profile?.roles?.includes('SuperAdmin');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" dir="rtl">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={Logo} width="90px" alt="Tamrinak Logo" />
        </Link>

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
          <div className="navbar-nav ms-auto me-4 mb-2 mb-lg-0">
            <Link className="nav-link" to="/">الرئيسية</Link>
            <Link className="nav-link" to="/sports">الرياضات</Link>
            <Link className="nav-link" to="/facilities">الاندية</Link>
            <Link className="nav-link" to="/aboutUs">حول الموقع</Link>
            {/* <Link className="nav-link" to="/contactUs">تواصل معنا</Link> TODO */}

            {isAdmin && (
              <Link className="nav-link text-warning" style={{ background: "green", borderRadius: "5px" }} to="/admin-dashboard">{/*  //todo */}
                لوحة التحكم
              </Link>
            )}
          </div>

          <div className="d-flex gap-2">
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-primary dropdown-toggle d-flex align-items-center"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.profileImage ? (
                    <img
                      src={`data:image/jpeg;base64,${user.profileImage}`}
                      alt="Avatar"
                      className="rounded-circle m-1 ms-2 me-2"
                      width="30"
                      height="30"
                    />
                  ) : (
                      <img 
                        src={pic} 
                    alt="Avatar"
                    className="rounded-circle m-1 ms-2 me-2"
                    width="30"
                    height="30"
                      />
                  )}
                  <span className="text-light">مرحبا {user?.profile?.name}!</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end text-end" aria-labelledby="userDropdown">
                  <li><Link className="dropdown-item" to="/profile">الملف الشخصي</Link></li>
                  <li><Link className="dropdown-item" to="/settings">تاريخ الحجوزات</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}>تسجيل الخروج</button></li>
                </ul>
              </div>
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
