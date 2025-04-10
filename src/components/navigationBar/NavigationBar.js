import React, { useState } from 'react';
import Logo from '../../Assets/Logo/3Xpnjp-LogoMakr.png';
import './NavigationBar.css';

function NavigationBar() {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div>
      <header id="header">
        <div className="nav-container">
          <div className="logo">
            <img src={Logo} width="50px" alt="Tamrinak logo" />
          </div>
          <button className="menu-toggle" aria-label="Toggle Menu" onClick={toggleMenu}>
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
          <nav role="navigation">
            <ul id="navbar" className={menuActive ? 'active' : ''}>
              <li><a href="/">الرئيسية</a></li>
              <li><a href="/abousUs">حول الموقع</a></li>
              <li><a href="/services">خدماتنا</a></li>
              <li><a href="/bookings">حجوزات</a></li>
              <li><a href="/contactUs">تواصل معنا</a></li>
            </ul>
          </nav>
          <div className="nav-actions">
            <a href="/login" id="login-btn" aria-label="تسجيل الدخول إلى حسابك">تسجيل الدخول</a>
            <a href="/register" id="create-btn" aria-label="إنشاء حساب جديد">إنشاء حساب</a>
          </div>
        </div>
      </header>
    </div>
  );
}

export default NavigationBar;
