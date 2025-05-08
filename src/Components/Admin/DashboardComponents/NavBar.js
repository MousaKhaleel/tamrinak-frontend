import React from 'react';
import './NavBar.css';
import { GoHome } from "react-icons/go";
import logo from '../../../Assets/Logo/1vWOEn-LogoMakr (1).png';
import { Link } from 'react-router-dom';

const NavBar = () => {

  const handleToggleSidebar = () => {
    document.body.classList.toggle('sidebar-collapsed');
  };//TODO fix toggle responsiveness

  return (
    <header id="header" className="header fixed-top d-flex align-items-center" dir="rtl">
      <div className="d-flex align-items-center justify-content-between">
        <Link to="/" className="logo d-flex align-items-center">
          <img width={'90px'} src={logo} alt="" />
          {/* <span className="h5 d-none d-lg-block">Admin Dashboard</span> */}
        </Link>
        <i className="bi bi-list toggle-sidebar-btn"  onClick={handleToggleSidebar}></i>
      </div>

      <div className="search-bar">
        <form className="search-form d-flex align-items-center" method="POST" action="#">
          <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
          <button type="submit" title="Search"><i className="bi bi-search"></i></button>
        </form>
      </div>
      <div className="back-home icon-wrapper"><a href="/"><GoHome /></a></div>

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

export default NavBar;