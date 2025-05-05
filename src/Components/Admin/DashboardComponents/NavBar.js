import React from 'react';
import './NavBar.css';
import logo from '../../../Assets/Logo/4RrmCG-LogoMakr.png'; // Adjust the path as necessary
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header id="header" className="header fixed-top d-flex align-items-center" dir="rtl">
      <div className="d-flex align-items-center justify-content-between">
        <Link to="/AdminDashboard" className="logo d-flex align-items-center">
          <img width={'30px'} src={logo} alt="" />
          <span className="d-none d-lg-block">Admin</span>
        </Link>
        <i className="bi bi-list toggle-sidebar-btn"></i>
      </div>

      <div className="search-bar">
        <form className="search-form d-flex align-items-center" method="POST" action="#">
          <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
          <button type="submit" title="Search"><i className="bi bi-search"></i></button>
        </form>
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item d-block d-lg-none">
            <a className="nav-link nav-icon search-bar-toggle" href="#">
              <i className="bi bi-search"></i>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
