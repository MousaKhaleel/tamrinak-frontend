import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { useTheme } from '../../Context/ThemeContext';
import { GoHome } from "react-icons/go";
import logo from '../../Assets/Logo/1vWOEn-LogoMakr (1).png';
import pic from '../../Assets/Defaults/profile-42914_1280.png';
import './NavigationBar.css';

const NavigationBar = ({ variant = 'default' }) => {
  const { user, logoutUser } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();

  const handleToggleSidebar = () => {
    document.body.classList.toggle('sidebar-collapsed');
  };

  const handleLogout = () => {
    logoutUser();
  };

  const isAdmin = user?.profile?.roles?.includes('Admin') || user?.profile?.roles?.includes('SuperAdmin');
  const isManager = user?.profile?.roles?.includes('VenueManager');

const getNavbarThemeClasses = () => {
  if (variant === 'admin') return '';

  return theme === 'dark'
    ? 'navbar-dark bg-dark'
    : ''; // Don't override background for light       : 'navbar-light bg-light';
};
  if (variant === 'admin') {
    return (
      <header id="header" className={`header fixed-top d-flex align-items-center ${theme}`} dir="rtl">
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/" className="logo d-flex align-items-center">
            <img width={'90px'} src={logo} alt="" />
          </Link>
          <i className="bi bi-list toggle-sidebar-btn" onClick={handleToggleSidebar}></i>
        </div>

        <div className="search-bar">
          <form className="search-form d-flex align-items-center">
            <input
              type="text"
              name="query"
              placeholder="Search"
              title="Enter search keyword"
              className={theme}
            />
            <button type="submit" title="Search">
              <i className={`bi bi-search ${theme === 'dark' ? 'text-light' : 'text-dark'}`}></i>
            </button>
          </form>
        </div>

        {/* <div className="d-flex align-items-center">
          <button
            onClick={toggleTheme}
            className="btn btn-sm mx-2"
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <div className="backHome icon-wrapper">
            <a href="/"><GoHome className={theme === 'dark' ? 'text-light' : 'text-dark'} /></a>
          </div>
        </div> */}

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle" href="#">
                <i className={`bi bi-search ${theme === 'dark' ? 'text-light' : 'text-dark'}`}></i>
              </a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }

  return (
    <nav className={`navbar navbar-expand-lg ${getNavbarThemeClasses()}`} dir="rtl">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} width="90px" alt="Tamrinak Logo" />
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

        <div className={`collapse navbar-collapse bg-highlight`} id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto me-4 mb-2 mb-lg-0">
            <Link className="nav-link" to="/">الرئيسية</Link>
            <Link className="nav-link" to="/sports">الانشطة</Link>
            {/* <Link className="nav-link" to="/offers">العروض</Link> */}
            <Link className="nav-link" to="/aboutUs">حول الموقع</Link>
            <a className="nav-link" href='#contact'>تواصل معنا</a>

            {isAdmin && (
              <Link className="nav-link text-warning" style={{ background: "green", borderRadius: "5px" }} to="/dashboard">
                لوحة التحكم
              </Link>
            )}
            {isManager && (
              <Link className="nav-link text-warning" style={{ background: "black", borderRadius: "5px" }} to="/dashboard">
                لوحة التحكم
              </Link>
            )}
          </div>

          <div className="d-flex gap-2 align-items-center">
            {/* <button
              onClick={toggleTheme}
              className="btn btn-sm mx-2"
              title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            >
              {isDark ? '☀️' : '🌙'}
            </button> */}

            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-primary dropdown-toggle d-flex align-items-center"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={user.profileImage
                      ? `data:image/jpeg;base64,${user.profileImage}`
                      : pic}
                    alt="Avatar"
                    className="rounded-circle m-1 ms-2 me-2"
                    width="30"
                    height="30"
                  />
                  <span className="text-light">مرحبا {user?.profile?.name}!</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end text-end" aria-labelledby="userDropdown">
                  <li><Link className="dropdown-item" to="/profile">الملف الشخصي</Link></li>
                  <li><Link className="dropdown-item" to="/history">تاريخ الحجوزات</Link></li>
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
};

export default NavigationBar;