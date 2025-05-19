import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
      // On mobile, we want the sidebar to be closed by default
      if (window.innerWidth < 1200) {
        document.body.classList.add('sidebar-collapsed');
      } else {
        document.body.classList.remove('sidebar-collapsed');
      }
    };

    window.addEventListener('resize', handleResize);
    // Initialize on first render
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    document.body.classList.toggle('sidebar-collapsed');
  };

  return (
    <>
      <aside dir="rtl" id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/admin-dashboard">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#components-nav"
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="components-nav"
          >
            <i className="bi bi-menu-button-wide"></i>
            <span>Moderation</span>
            <i className="bi bi-chevron-down me-auto"></i> {/* Change ms-auto to me-auto */}
          </a>
          <ul
            id="components-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <Link to="/sport-list">
                <i className="bi bi-circle"></i>
                <span>Sports</span>
              </Link>
            </li>
                        <li>
              <Link to="/user-list">
                <i className="bi bi-circle"></i>
                <span>Users</span>
              </Link>
            </li>
                        <li>
              <Link to="/facility-list">
                <i className="bi bi-circle"></i>
                <span>Facilities</span>
              </Link>
            </li>
                        <li>
              <Link to="/field-list">
                <i className="bi bi-circle"></i>
                <span>Fields</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Forms Nav */}
        <li className="nav-item">
          <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
            <i className="bi bi-journal-text"></i>
            <span>Forms</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul id="forms-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
          <li>
              <Link to="/add-field">
                <i className="bi bi-circle"></i>
                <span>add field</span>
              </Link>
            </li>
            <li>
              <Link to="/add-facility">
                <i className="bi bi-circle"></i>
                <span>add facility</span>
              </Link>
            </li>
            <li>
              <Link to="/add-sport">
                <i className="bi bi-circle"></i>
                <span>add sport</span>
              </Link>
            </li>
            <li>
              <Link to="/forms-elements">
                <i className="bi bi-circle"></i>
                <span>Form Elements</span>
              </Link>
            </li>
            <li>
              <Link to="/forms-layouts">
                <i className="bi bi-circle"></i>
                <span>Form Layouts</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Tables Nav */}
        <li className="nav-item">
          <a className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
            <i className="bi bi-layout-text-window-reverse"></i>
            <span>Tables</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul id="tables-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
            <li>
              <Link to="/tables-general">
                <i className="bi bi-circle"></i>
                <span>General Tables</span>
              </Link>
            </li>
            <li>
              <Link to="/tables-data">
                <i className="bi bi-circle"></i>
                <span>Data Tables</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Charts Nav */}
        <li className="nav-item">
          <a className="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse" href="#">
            <i className="bi bi-bar-chart"></i>
            <span>Charts</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul id="charts-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
            <li>
              <Link to="/charts-chartjs">
                <i className="bi bi-circle"></i>
                <span>Chart.js</span>
              </Link>
            </li>
            <li>
              <Link to="/charts-apexcharts">
                <i className="bi bi-circle"></i>
                <span>ApexCharts</span>
              </Link>
            </li>
            <li>
              <Link to="/charts-echarts">
                <i className="bi bi-circle"></i>
                <span>ECharts</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* Pages Heading */}
        <li className="nav-heading">Pages</li>

        {/* Profile Page */}
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/profile">
            <i className="bi bi-person"></i>
            <span>Profile</span>
          </Link>
        </li>

        {/* F.A.Q Page */}
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/pages-faq">
            <i className="bi bi-question-circle"></i>
            <span>F.A.Q</span>
          </Link>
        </li>

        {/* Contact Page */}
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/pages-contact">
            <i className="bi bi-envelope"></i>
            <span>Contact</span>
          </Link>
        </li>

        {/* Error 404 Page */}
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/pages-error-404">
            <i className="bi bi-dash-circle"></i>
            <span>Error 404</span>
          </Link>
        </li>

        {/* Blank Page */}
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/pages-blank">
            <i className="bi bi-file-earmark"></i>
            <span>Blank</span>
          </Link>
        </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;